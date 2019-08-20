let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);

let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@cluster0-ozsdo.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("vacation");
});

app.use("/", express.static(__dirname + "/build")); // Needed for the HTML and JS files

app.use("/uploads", express.static("uploads"));

app.post("/signup", upload.none(), (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  let fullName = req.body.fullName;
  let email = req.body.email;
  console.log(name, pwd);
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("/signup error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    } else if (user === null) {
      dbo.collection("users").insertOne({
        fullName: fullName,
        email: email,
        username: name,
        password: pwd
      });
      console.log("username and pswd declared");

      let generatedId = () => {
        return "" + Math.floor(Math.random() * 100000000);
      };

      let sessionId = generatedId();
      res.cookie("cookieName", sessionId);
      console.log("cookie created successfully");

      dbo.collection("cookies").insertOne(
        {
          username: name,
          firstName: fullName.split(" ").shift(),
          cookie: sessionId
        },
        (err, user) => {
          if (err) {
            console.log("/cookie error", err);
            res.send(JSON.stringify({ success: false }));
          } else {
            let obj = { success: true, firstName: fullName.split(" ").shift() };
            res.send(JSON.stringify(obj));
          }
        }
      );
    } else {
      console.log("username exists");
      res.send(JSON.stringify({ success: false }));
    }
  });
});

app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === pwd) {
      console.log("cookie exists", req.cookies.cookieName);
      dbo
        .collection("cookies")
        .findOne({ cookie: req.cookies.cookieName }, (err, user) => {
          if (err) {
            console.log("/experiences", err);
            res.send(JSON.stringify({ success: false }));
          } else if (user.firstName) {
            let obj = { success: true, firstName: user.firstName };
            res.send(JSON.stringify(obj));
          }
        });
    } else {
      res.send(JSON.stringify({ success: false }));
    }
  });
});

app.get("/experiences", (req, res) => {
  console.log("request to /experiences");
  dbo
    .collection("vacay")
    .find({})
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("posts", ps);
      res.send(JSON.stringify(ps));
    });
});

app.post("/sellExp", upload.single("img"), (req, res) => {
  console.log("request to /sellExp. body: ", req.body);
  let listingTitle = req.body.listingTitle;
  let destination = req.body.destination;
  let amenities = req.body.amenities;
  let rating = req.body.rating;
  let date = req.body.date;
  let price = req.body.price;
  let img = req.file;
  let frontendPath = "/uploads/" + img.filename;
  dbo.collection("vacay").insertOne({
    listingTitle: listingTitle,
    destination: destination,
    amenities: amenities,
    rating: rating,
    date: date,
    price: price,
    frontendPath: frontendPath
  });
  res.send(JSON.stringify({ success: true }));
});

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});

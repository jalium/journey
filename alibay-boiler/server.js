let express = require("express");
let app = express();
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
  console.log(name, pwd);
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      dbo.collection("users").insertOne({ username: name, password: pwd });
      console.log("username and pswd declared");
      res.send(JSON.stringify({ success: true }));
      return;
    }
    console.log("username exists");
    res.send(JSON.stringify({ success: false }));
    return;
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
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
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

app.post("/new-list", upload.single("img"), (req, res) => {
  console.log("request to /new-list. body: ", req.body);
  let listingTitle = req.body.listingTitle;
  let destination = req.body.destination;
  let amenities = req.body.amenities;
  let rating = req.body.rating;
  let date = req.body.date;
  let price = req.body.price;
  let img = req.file;
  let frontendPath = "/uploads/" + img.filename;
  dbo.collection("posts").insertOne({
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

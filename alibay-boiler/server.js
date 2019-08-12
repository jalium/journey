let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app); 

app.use("/", express.static("build")); // Needed for the HTML and JS files

app.use("/uploads", express.static("uploads"));

let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@cluster0-ozsdo.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("vacation");
});

// Your endpoints go after this line
app.post("/signup", upload.none(), (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").insertOne({ username: name, password: pwd });
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
      //user.password is whats in the database
      //pwd is what the user inputted
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

app.get("/", (req, res) => {
  console.log("request to /");
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
  let description = req.body.description;
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  dbo
    .collection("posts")
    .insertOne({ description: description, frontendPath: frontendPath });
  res.send(JSON.stringify({ success: true }));
});

//   app.post("/update", upload.none(), (req, res) => {
//     console.log("request to /update");
//     let id = req.body.id.toString();
//     let desc = req.body.description;
//     console.log("sent from client", desc, id);
//     dbo
//       .collection("posts")
//       .updateOne({ _id: ObjectID(id) }, { $set: { description: desc } });
//     res.send(JSON.stringify({ success: true }));
//   });

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});

//experiences (all items)
//signup
//login
//each itemID
//list

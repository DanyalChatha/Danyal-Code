//IMPORTING REQUIRED MODULES
const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
 
const dbUrl = "mongodb://localhost:27017/Shoesdb"; 
const client = new MongoClient(dbUrl);


//SETTING UP PORT NUMBER
const app = express();
const port = process.env.PORT || 8888;


var links = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "about"
  },
  {
    name: "Products",
    path: "product"
  }
];

//PAGE ROUTES
app.get("/", (request, response) =>{
  response.render("index", {title: "Home", menu: links});
});

app.get("/about", (request, response)=>{
  response.render("about", {title: "About", menu: links});
});

app.get("/product", async (request, response)=>{ 
  links = await getLinks();
  response.render("product", {title: "Products", menu: links});
});

//SET UP TEMPLATE ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

//SET UP STATIC FILE PATH
app.use(express.static(path.join(__dirname, "public")));

//SET UP SERVER LISTNER
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//MONGO FUNCTIONS
//FUNCTION TO CONNECT TO DB "Shoesdb"
async function connection() {
  await client.connect();
  db = client.db("Shoesdb");
  return db;
}

// FUNCTION TO SELECT ALL DOCUMENTS FROM "Shoes"
async function getLinks() {
  db = await connection();
  var results = db.collection("Shoes").find({});
  res = await results.toArray(); //convert to an array
  return res;
}


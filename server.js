const express = require("express");
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const multiparty = require("multiparty");
require("dotenv").config();
const firebase = require('firebase/app');
const firestore = require("firebase/firestore");
const firebaseAuth = require('firebase/auth');

// instantiate an express app
const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyAV-97heenBVrPhAM3JqISg_Sad6dY1608",
  authDomain: "my-portfolio-3a152.firebaseapp.com",
  projectId: "my-portfolio-3a152",
  storageBucket: "my-portfolio-3a152.appspot.com",
  messagingSenderId: "453034916275",
  appId: "1:453034916275:web:28c5c083269e9758b533c6"
};

const db = firebase.initializeApp(firebaseConfig);


app.use(express.static('/public/'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.static(path.join(__dirname, "views/")));
app.use(express.static(path.join(__dirname, "js")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//port will be 5000 for testing
const PORT = process.env.PORT || 5000;

//make the contact page the the first page on the app
app.route("/").get(function (req, res) {
  let youtubeApiKey = "AIzaSyD7FZfDbRiGK0I8Quw40i8TcBCADjoLJXY";
  res.render("pages/index", {
    youtubeApiKey : youtubeApiKey,
  });
});

app.route("/admin-login").get(function (req, res) {
  res.render("pages/slick-enter-portal");
});

app.get ('/blog/', async (req, res) => {
  try{
    await firebase.firestore()
      .collection("articles")
      .orderBy('published_date', 'desc')
      .get()
      .then(function(docs) {
        results = docs.docs.map(doc => doc.data()),
        res.render("blog/index", {
          posts: results
        });
      } );
  } catch(err) {  
    res.status(500).json("Something went wrong");
  }
});

app.get ('/get-single-post', async (req, res) => {
  const id = req.query.id.toString().trim();
  console.log(id);
  
    const article = await firebase.firestore()
      .collection("articles")
      .doc(id)
      .get();

        if (!article.exists) {console.log("no document");}
        const post = article.data();
        console.log("posts = ", post);
        let  relatedArticles = await firebase.firestore().collection("articles")
        .where("tags", "==", post.tags[0])
        .get();
    res.render("blog/post", {
      post: post
      //relatated: relatedArticles
    });
});


app.post("/send-message", async (req, res) => {
  //1.
  const {senderEmail, senderName, message} = req.body;
  await firebase.firestore()
    .collection("messages")
    .add({
      senderEmail,
      senderName,
      message
    }).then(function(doc) {
      res.render('pages/index');
    });
});

app.post("/send-article", async (req, res) => {
  const{title, description, tags, article_imageurl,  content} = req.body;
  await firebase.firestore()
    .collection("articles")
    .add({
      "title": title,
      "description": description,
      "tags": tags,
      "article_imageurl": article_imageurl,
      "content": content,
      "id": id,
      "published_date": Date.now()
    }).then(function(doc) {
      res.render('pages/index');
    } );
});

app.post("/admin-sign-in", async (req, res) => {
  const {email, password} = req.body;
  await firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(user) {
    res.render('pages/slick-portal');
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
//TTPEWRITER ANIMATION
let i = 0;
let txt = "from a fullstack web developer in the making.";
let speed = 150;

const typewriter = () => {
  if (i < txt.length) {
    document.getElementById("textp").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typewriter, speed);
  }
}

typewriter();

// sticky header
window.onscroll = function() {addStickyHeader()};

const header = document.getElementById("myHeader");
const sticky = header.offsetTop;

const addStickyHeader = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// QUOTES SLIDES
let slide_index = 1;  
let nextSlide = (n) => {displaySlides(slide_index += n); }
let currentSlide = (n) => {displaySlides(slide_index = n);}  

const displaySlides = (n) => {  
  let i;  
  let slides = document.getElementsByClassName("showSlide");  
  if (n > slides.length) { slide_index = 1 }  
  if (n < 1) { slide_index = slides.length }  
  for (i = 0; i < slides.length; i++) {slides[i].style.display = "none";}  
     slides[slide_index - 1].style.display = "block";  
}  

displaySlides(slide_index); 



//Youtube API 

const searchTerms = ["factory%20functions","data%20structures", "array%20functions%20javascript", "composition%20over%20inheritance", "lambda%20functions", "streams%20java", "higher%20order%functions%javascript", "functional%20programming", "c++%20lambda%20functions", "sorting%20algorithms"];
const getSearchTerm = () => searchTerms[Math.floor(Math.random() * (searchTerms.length-1))];
const YOUTUBE_API_KEY = "AIzaSyD7FZfDbRiGK0I8Quw40i8TcBCADjoLJXY";
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${getSearchTerm()}&key=${YOUTUBE_API_KEY}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    document.querySelector(".youtubeVideo").src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
});


  console.log("read");

  //get the form by its id
const form = document.getElementById("contact-form"); 

//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  //2.
  let mail = new FormData(form);

  //3.
  sendMail(mail);
})

const sendMail = (mail) => {
  //1.
  fetch("file:///C:/Users/ONYI/Documents/Tech%20Work/Web/test/index.html/send", {
    method: "post", //2.
    body: mail, //3.

  }).then((response) => {
    return response.json();
  });
};

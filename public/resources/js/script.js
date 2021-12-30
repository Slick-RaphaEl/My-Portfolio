//TTPEWRITER ANIMATION
let index = 0;
let txt = "from a fullstack web developer.";
let speed = 150;

const typewriter = () => {
  if (index < txt.length) {
    document.getElementById("textp").innerHTML += txt.charAt(index);
    index++;
    setTimeout(typewriter, speed);
  }
};

typewriter();

// sticky header
window.onscroll = function() {addStickyHeader();};

const header = document.getElementById("myHeader");

const sticky = header.offsetTop;

const addStickyHeader = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

// QUOTES SLIDES
let slide_index = 1;  
let nextSlide = (n) => {displaySlides(slide_index += n); };
let currentSlide = (n) => {displaySlides(slide_index = n);};

const displaySlides = (n) => {  
  let i;  
  let slides = document.getElementsByClassName("showSlide");  
  if (n > slides.length) { slide_index = 1; }  
  if (n < 1) { slide_index = slides.length; }  
  for (i = 0; i < slides.length; i++) {slides[i].style.display = "none";}  
     slides[slide_index - 1].style.display = "block";  
};  

displaySlides(slide_index); 

const inViewport = (entries, observer) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options

// Attach observer to every [data-inviewport] element:
const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});
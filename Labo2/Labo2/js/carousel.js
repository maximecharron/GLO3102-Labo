var slidePrefix = "slide-";
var slideControlPrefix = "slide-control-";
var highlightClass = "highlight";
var slidesContainerID = "slides";
var slidesControlsID = "slides-controls";
var slideTransStep = 0;
var transitionTimeout = 0;
var currentSlideIndex = 1;
var slidesCollection = [];
var slidesPages = [];
var nextSlideIndex = 0;
var previousSlideIndex = 0;
var numberOfSlides = 0;
var nextSlide;
var currentSlide;
var slideTransitionSteps = 10;

function setUpSlideShow() {

    slidesCollection = document.getElementById(slidesContainerID).children;
    slidesPages = document.getElementById(slidesControlsID).children;

     numberOfSlides = slidesCollection.length;
    for (var i = 0; i < numberOfSlides; i++) {

        slidesCollection[i].id = slidePrefix + (1 + i);
        slidesPages[i].id = slideControlPrefix + (i + 1);

        slidesPages[i].onclick = function () {
            changeSlideByPage(this);
        };
        if (i > 0) {
            slidesCollection[i].style.display = "none";
        } else {
            slidesPages[i].className = highlightClass;

        }
        document.onkeydown = detectChar;
    }
}


function detectChar(keyEvent){
    var charCode = keyEvent.keyCode;
    if (charCode == 39) {
        switchSlide(nextSlideIndex, true);
    }
    if (charCode == 37) {
        switchSlide(previousSlideIndex, true);
    }
}
function showNextSlide(indexOfCurrentSlide){
    switchSlide(indexOfCurrentSlide+1, true);
}

function showPreviousSlide(indexOfCurrentSlide){
    switchSlide(indexOfCurrentSlide-1, true);
}

function changeSlideByPage(control) {
    switchSlide(Number(control.id.substr(control.id.lastIndexOf("-") + 1)), true);
}


function slideTransition() {

    nextSlide.style.display = "block";

    var opacity = slideTransStep / 10;

    currentSlide.style.opacity = "" + (1 - opacity);
    currentSlide.style.filter = "alpha(opacity=" + (100 - opacity * 100) + ")";

    nextSlide.style.opacity = "" + opacity;
    nextSlide.style.filter = "alpha(opacity=" + (opacity * 100) + ")";

    if (++slideTransStep <= slideTransitionSteps) {
        transitionTimeout = setTimeout("slideTransition()", 20);
    } else {
        currentSlide.style.display = "none";
        transitionCompleted();
    }
}

function transitionCompleted() {
    slideTransStep = 0;
    currentSlideIndex = nextSlideIndex;

    switchSlide((currentSlideIndex >= numberOfSlides) ? 1 : currentSlideIndex + 1);

    for (var i = 0; i < slidesPages.length; i++) {
        slidesPages[i].className = "";
    }

    slidesPages[currentSlideIndex - 1].className = highlightClass;

}
function switchSlide(wantedSlideNumber, immediate) {
    if (slideTransStep != 0 || wantedSlideNumber == currentSlideIndex)
        return;

    clearTimeout(transitionTimeout);

    if (wantedSlideNumber <= 0) {
        wantedSlideNumber = numberOfSlides;
    }
    previousSlideIndex = currentSlideIndex - 1;
    nextSlideIndex = wantedSlideNumber;

    currentSlide = document.getElementById(slidePrefix + currentSlideIndex);
    nextSlide = document.getElementById(slidePrefix + nextSlideIndex);
    slideTransStep = 0;

    if (immediate == true) {
        slideTransition();
    } else {
        transitionTimeout = setTimeout("slideTransition()", 3000);
    }
}

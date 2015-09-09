var slidePrefix = "slide-";
var slideControlPrefix = "slide-control-";
var slideHighlightClass = "highlight";
var slidesContainerID = "slides";
var slidesControlsID = "slides-controls";
var slideDelay = 3000;
var slideAnimationInterval = 20;
var slideTransitionSteps = 10;
var slideTransStep = 0;
var transTimeout = 0;
var crtSlideIndex = 1;
var slidesCollection = [];
var slidesPages = [];
var nextSlideIndex = 0;
var previousSlideIndex = 0;
var numberOfSlides = 0;
var nextSlide;
var currentSlide;

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
            slidesPages[i].className = slideHighlightClass;

        }
        document.onkeydown = detectChar;
    }
}


function detectChar(event){
    var charCode = event.keyCode;
    if (charCode == 39) {
        switchSlide(nextSlideIndex, true);
    }
    if (charCode == 37) {
        switchSlide(previousSlideIndex, true);
    }
}

function switchSlide(slideNo, immediate) {
    if (slideTransStep != 0 || slideNo == crtSlideIndex)
        return;

    clearTimeout(transTimeout);

    if (slideNo <= 0) {
        slideNo = numberOfSlides;
    }
    previousSlideIndex = crtSlideIndex - 1;
    nextSlideIndex = slideNo;
    currentSlide = document.getElementById(slidePrefix + crtSlideIndex);
    nextSlide = document.getElementById(slidePrefix + nextSlideIndex);
    slideTransStep = 0;

    // start the transition now upon request or after a delay (default)
    if (immediate == true) {
        slideTransition();
    } else {
        transTimeout = setTimeout("slideTransition()", slideDelay);
    }
}

function changeSlideByPage(control) {
    switchSlide(Number(control.id.substr(control.id.lastIndexOf("-") + 1)), true);
}


function slideTransition() {
    // make sure the next slide is visible (albeit transparent)
    nextSlide.style.display = "block";

    // calculate opacity
    var opacity = slideTransStep / slideTransitionSteps;
    console.log(opacity);

    // fade out the current slide
    currentSlide.style.opacity = "" + (1 - opacity);
    currentSlide.style.filter = "alpha(opacity=" + (100 - opacity * 100) + ")";

    // fade in the next slide
    nextSlide.style.opacity = "" + opacity;
    nextSlide.style.filter = "alpha(opacity=" + (opacity * 100) + ")";

    // if not completed, do this step again after a short delay
    if (++slideTransStep <= slideTransitionSteps) {
        transTimeout = setTimeout("slideTransition()", slideAnimationInterval);
    } else {
        currentSlide.style.display = "none";
        transitionCompleted();
        clearTimeout(transTimeout);
    }
}

function transitionCompleted() {
    slideTransStep = 0;
    crtSlideIndex = nextSlideIndex;

    switchSlide((crtSlideIndex >= numberOfSlides) ? 1 : crtSlideIndex + 1);

    //unhighlight all controls
    for (var i = 0; i < slidesPages.length; i++) {
        slidesPages[i].className = "";
    }

    // highlight the control for the next slide
    slidesPages[crtSlideIndex - 1].className = slideHighlightClass;

}

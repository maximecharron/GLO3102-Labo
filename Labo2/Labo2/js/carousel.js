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
    if(wantedSlideNumber > numberOfSlides){
        wantedSlideNumber = 1;
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
(function (funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function (callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function () {
                callback(context);
            }, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);


window.docReady(setUpSlideShow());

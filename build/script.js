// mobile menu toggle
const mobileButton = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');

const toggleMenu = () => {
  menu.classList.toggle('hidden');
};

mobileButton.addEventListener('click', toggleMenu);

/*CAROUSEL STUFF*/

//grab every element with class slide and store into an array rather than nodelist
const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelectorAll('.slider');
const arrows = document.querySelectorAll('.arrow');
const dotsEl = document.querySelector('.dots');
let timeoutId;

function getNextPrev() {
  const activeSlide = document.querySelector('.slide.active');
  // grab index of slide with active class
  const activeIndex = slides.indexOf(activeSlide);
  let next, prev;
  // if current index is the last slide, make next slide index 0
  if (activeIndex === slides.length - 1) {
    next = slides[0];
  } else {
    // otherwise, next index is current slide + 1
    next = slides[activeIndex + 1];
  }
  // same as above but reversed
  if (activeIndex === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIndex - 1];
  }
  return [next, prev];
}

function getPosition() {
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);
  // destructure next and prev from above function
  const [next, prev] = getNextPrev();

  slides.forEach((slide, index) => {
    // current index will translate on to screen
    if (index === activeIndex) {
      slide.style.transform = 'translateX(0)';
      // if slide is previous index, translate offscreen to left
    } else if (slide === prev) {
      slide.style.transform = 'translateX(-100%)';
      // if next, translate right
    } else if (slide === next) {
      slide.style.transform = 'translateX(100%)';
      // translate slides that are not prev or next right 100%
    } else {
      slide.style.transform = 'translateX(100%)';
    }

    // sets stacking context so non-active slides can translate behind active slide
    slide.addEventListener('transitionend', () => {
      slide.classList.remove('topSlide');
    });
  });
}

// event listener for arrows
arrows.forEach((arrow) => {
  arrow.addEventListener('click', () => {
    if (arrow.classList.contains('next')) getNextSlide();
    else if (arrow.classList.contains('prev')) getPrevSlide();
  });
});

function getNextSlide() {
  clearInterval(timeoutId);
  const current = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();

  // if active slide contains topSlide class, do nuttin' - button mashing defense
  if (current.classList.contains('topSlide')) {
    return;
  }

  current.classList.add('topSlide');
  next.classList.add('topSlide');
  // move current slide outta the way
  current.style.transform = 'translate(-100%)';
  // remove active class from current
  current.classList.remove('active');
  // move next slide into view
  next.style.transform = 'translateX(0)';
  // give it active class
  next.classList.add('active');
  getPosition();
  getActiveDot();
  loopyLoop();
}

function getPrevSlide() {
  clearInterval(timeoutId);
  const current = document.querySelector('.active');
  const [next, prev] = getNextPrev();
  current.classList.add('topSlide');
  prev.classList.add('topSlide');
  current.style.transform = 'translate(100%)';
  current.classList.remove('active');
  prev.style.transform = 'translateX(0)';
  prev.classList.add('active');
  getPosition();
  getActiveDot();
  loopyLoop();
}
getPosition();

// dots will be dynamically generated for each slide
slides.forEach((slide) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dotsEl.appendChild(dot);
});

function getActiveDot() {
  const allDots = document.querySelectorAll('.dots .dot');

  allDots.forEach((dot) => {
    dot.classList.remove('active');
  });

  // set active index of dots to active slide index, add active class to said dot
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);
  allDots[activeIndex].classList.add('active');
}

// make dots clickable
function clickableDots() {
  const allDots = document.querySelectorAll('.dots .dot');
  allDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      getDotSlide(index);
    });
  });
}

// when dot is clicked, grab it's slide with corresponding index
function getDotSlide(index) {
  // reset timeout when slide is clicked
  clearTimeout(timeoutId);
  // remove active class from all slides
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  // only add active class to slide with corresponding dot index
  const current = slides[index];
  current.classList.add('active');
  getPosition();
  getActiveDot();
  loopyLoop();
}

// loop every 4 seconds
function loopyLoop() {
  timeoutId = setTimeout(() => {
    getNextSlide();
  }, 4000);
}

// adds hover functionality
slides.forEach((slide) => {
  slide.addEventListener('mouseover', function () {
    clearTimeout(timeoutId);
  });
  slide.addEventListener('mouseleave', function () {
    loopyLoop();
  });
});

getActiveDot();
clickableDots();
loopyLoop();

// added basic swiper controls
// only on phone not mouse
let touchstartX = 0;
let touchendX = 0;

slides.forEach((slide) => {
  slide.addEventListener(
    'touchstart',
    function (event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    },
    false
  );

  slide.addEventListener(
    'touchend',
    function (event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture();
    },
    false
  );

  function handleGesture() {
    if (touchendX <= touchstartX) {
      getNextSlide();
    }

    if (touchendX >= touchstartX) {
      getPrevSlide();
    }
  }
});

// smoothscroll
const links = document.querySelectorAll('.scroll');

for (const link of links) {
  link.addEventListener('click', clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute('href');

  document.querySelector(href).scrollIntoView({
    behavior: 'smooth',
  });
}

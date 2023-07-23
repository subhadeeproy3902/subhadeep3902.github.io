let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

const circles = document.querySelectorAll(".circle");
circles.forEach((elem) => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor((dots * marked) / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }
  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll(".points");
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add("marked");
  }
});

function updateClock() {
  let now = new Date();
  let dname = now.getDay(),
    month = now.getMonth(),
    dnum = now.getDate(),
    year = now.getFullYear(),
    hour = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    period = "am";

  if (hour > -12) {
    period = "pm";
  }
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour - hour - 12;
  }

  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  };

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let ids = [
    "dayname",
    "month",
    "daynum",
    "year",
    "hour",
    "minutes",
    "seconds",
    "period",
  ];

  let values = [
    week[dname],
    months[month],
    dnum.pad(2),
    year,
    hour.pad(2),
    min.pad(2),
    sec.pad(2),
    period,
  ];

  for (var i = 0; i < ids.length; i++)
    document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function Clock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}

const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".interests-wrapper i");
let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;
const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});
const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;
  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;
  if (carousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // if user is scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};
const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};
const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(form)) return;
  alert("Message sent successfuly");
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxo_nH03IZ7xzim-Rw3XpD6sw-WF1J1-db-DOmhclpC8HaqgJ3VWrvzbtnHtsDMfbRFYQ/exec";
const gform = document.forms["submit-to-google-sheet"];
gform.addEventListener("submit", (ex) => {
  ex.preventDefault();
  if (!validateForm(form)) return;
  fetch(scriptURL, { method: "POST", body: new FormData(gform) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});

const validateForm = (form) => {
  let valid = true;
  let name = form.querySelector(".name");
  let message = form.querySelector(".message");
  let email = form.querySelector(".email");

  if (name.value === "") {
    giveError(name, "Please enter your name");
    valid = false;
  }
  if (message.value === "") {
    giveError(message, "Please enter a message");
    valid = false;
  }
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailValue = email.value;
  if (!emailRegex.test(emailValue)) {
    giveError(email, "Please enter a valid email");
    valid = false;
  }
  if (valid) {
    return true;
  }
};

const giveError = (field, message) => {
  let parentElement = field.parentElement;
  parentElement.classList.add("error");
  let existingError = parentElement.querySelector(".err-msg");
  if (existingError) {
    existingError.remove();
  }
  let error = document.createElement("span");
  error.textContent = message;
  error.classList.add("err-msg");
  parentElement.appendChild(error);
};

const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

let allFields = [...inputs, ...textareas];

allFields.forEach((field) => {
  field.addEventListener("input", () => {
    removeError(field);
  });
});

const removeError = (field) => {
  let parentElement = field.parentElement;
  parentElement.classList.remove("error");
  let error = parentElement.querySelector(".err-msg");
  if (error) {
    error.remove();
  }
};

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll("section");

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  menuLi.forEach((sec) => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 50);
});

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

window.onscroll = () => {
  menuIcon.classList.remove("bx-x");
  navlist.classList.remove("open");
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((e1) => observer.observe(e1));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((e1) => observer.observe(e1));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((e1) => observer.observe(e1));

gsap.fromTo(
  ".loading-page",
  { opacity: 1 },
  {
    opacity: 0,
    duration: 1.5,
    delay: 2,
  }
);

gsap.fromTo(
  ".logo-name",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
    delay: 0.5,
  }
);

gsap.fromTo(
  "section, .clock, .colors",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 3,
    delay: 2.9,
  }
);

gsap.fromTo(
  "header, footer",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 2,
    delay: 2.9,
  }
);

/*TESTIMONIALS--------------------------------------------------------------*/
const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");

const testimonials = [
  {
    name: "hello world",
    position: "jetso",
    photo: "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sem in turpis pellentesque fermentum. Sed quis diam eu nibh iaculis mollis sit amet ut nisl. Duis molestie efficitur nulla ac lobortis. Cras risus nunc, sollicitudin a quam non, aliquam elementum arcu. Maecenas sit amet ex ut enim suscipit consectetur dignissim quis nulla.",
  },
  {
    name: "world hello",
    position: "sugoi",
    photo: "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sem in turpis pellentesque fermentum. Sed quis diam eu nibh iaculis mollis sit amet ut nisl.  sollicitudin a quam non, aliquam elementum arcu. Maecenas sit amet ex ut enim suscipit consectetur dignissim quis nulla.",
  },
  {
    name: "Iida Niskanen",
    position: "Data Entry",
    photo: "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp",
    text: "Lorem ipsum e efficitur nulla ac lobortis. Cras risus nunc, sollicitudin a quam non, aliquam elementum arcu. Maecenas sit amet ex ut enim suscipit consectetur dignissim quis nulla.",
  },
  {
    name: "gonjavis",
    position: "frenchi",
    photo: "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp",
    text: "Lorem ipsum dolor si ac lobortis. Cras risus nunc, sollicitudin a quam non, aliquam elementum arcu. Maecenas sit amet ex ut enim suscipit consectetur dignissim quis nulla.",
  },
  {
    name: "lalalala",
    position: "hulalalla",
    photo: "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sem in turpis pellentesque fermentum. Sed quis diam eu nibh iaculis mollis sit amet ut nisl. Duis molestie efficitur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sem in turpis pellentesque fermentum. Sed quis diam eu nibh iaculis mollis sit amet ut nisl. Duis molestie efficitur nulla ac lobortis. Cras risus nunc, sollicit",
  },
  {
    name: "Hogalallah",
    position: "Himlands",
    photo: "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp",
    text: "Lorem ipsum dolor sit Cras risus nunc, sollicitudin a quam non, aliquam elementum arcu. Maecenas sit amet ex ut enim suscipit consectetur dignissim quis nulla.",
  },
  {
    name: "Subhadeep Roy",
    position: "Wholesome boy :)",
    photo: "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sem in turpis pellentesque fermentum. Sed quis diam eu nibh iaculis mollis sit amet ut nisl. Duis molestie efficitur nulla ac lobortis. Cras risus nunc, sollicitudin a quam non, aliquam elementum arcu. Maecenas sit amet ex ut enim suscipit consectetur dignissim quis nulla.",
  },
];

let idx = 1;

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx];

  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;

  idx++;

  if (idx > testimonials.length - 1) {
    idx = 0;
  }
}

setInterval(updateTestimonial, 4000);

/*Light theme--------------------------------------------------------------*/

const toggleSwitch = document.getElementById("colors");
const heroImage = document.getElementById("hero-image");
const body = document.querySelector("body");
const aboutImage = document.getElementById("about-img");

const cImg1 = document.getElementById("c-img-1");
const cImg2 = document.getElementById("c-img-2");
const cImg3 = document.getElementById("c-img-3");
const cImg4 = document.getElementById("c-img-4");
const cImg5 = document.getElementById("c-img-5");
const cImg6 = document.getElementById("c-img-6");
const cImg7 = document.getElementById("c-img-7");
const cImg8 = document.getElementById("c-img-8");
const cImg9 = document.getElementById("c-img-9");

toggleSwitch.addEventListener("click", function () {
  body.classList.toggle("switch");
  if (body.classList.contains("switch")) {
    heroImage.src = "https://i.postimg.cc/MTVGGbsX/hlabsdfkjhsf-7.webp";
    aboutImage.src = "https://i.postimg.cc/hGSFm8Pf/hlabsdfkjhsf-8.webp";

    cImg1.src = "https://i.postimg.cc/2yLbWcQD/hlabsdfkjhsf-15.webp";
    cImg2.src = "https://i.postimg.cc/yxNqptfM/hlabsdfkjhsf-16.webp";
    cImg3.src = "https://i.postimg.cc/sXYSH0B4/hlabsdfkjhsf-17.webp";
    cImg4.src = "https://i.postimg.cc/VsFZdK7t/hlabsdfkjhsf-20.webp";
    cImg5.src = "https://i.postimg.cc/tCWT3VxF/hlabsdfkjhsf-19.webp";
    cImg6.src = "https://i.postimg.cc/wjn0SZBC/hlabsdfkjhsf-21.webp";
    cImg9.src = "https://i.postimg.cc/Zq3VZHBC/hlabsdfkjhsf-22.webp";
  } else {
    heroImage.src = "https://i.postimg.cc/rm5Sn6qQ/Untitled-design-16.webp";
    aboutImage.src = "https://i.postimg.cc/j2XyTzwf/Untitled-design-17.webp";

    cImg1.src = "https://i.postimg.cc/LXV9j02g/hlabsdfkjhsf-6.webp";
    cImg2.src = "https://i.postimg.cc/6Q0h7ny6/hlabsdfkjhsf-9.webp";
    cImg3.src = "https://i.postimg.cc/3NzrH3DM/hlabsdfkjhsf-10.webp";
    cImg4.src = "https://i.postimg.cc/8kxrGGGP/hlabsdfkjhsf-11.webp";
    cImg5.src = "https://i.postimg.cc/NFtq8LTj/hlabsdfkjhsf-12.webp";
    cImg6.src = "https://i.postimg.cc/85hxCD3Q/hlabsdfkjhsf-13.webp";
    cImg9.src = "https://i.postimg.cc/VL7pvK76/hlabsdfkjhsf-14.webp";
  }
});

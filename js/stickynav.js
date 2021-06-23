// Този файл го взех от проекта от хакатона, ECOspace
// (https://github.com/false-positive/ecospace/blob/master/ecospace/static/js/stickynav.js)
// малко го промених за да работи с този сайт

window.onscroll = function () {
  stickyNav();
};

var navbar = document.querySelector('.navbar');
var sticky = navbar.offsetTop;

function stickyNav() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add('is-stuck');
  } else {
    navbar.classList.remove('is-stuck');
  }
}

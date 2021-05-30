// скрипт, който отваря и затваря хамбургер менюто,
// видимо на малки екрани.

const burger = document.getElementById('navbar-burger');
const menu = document.getElementById('navbar-menu');

if (burger && menu) {
  burger.onclick = function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  };
}

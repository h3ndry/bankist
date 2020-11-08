'use strict';

///////////////////////////////////////
// Modal window

// redefine the docucument.querySelector and addEventListener
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;
NodeList.prototype.on = function(name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn)
  });
}


const openModal = function (e) {
  e.preventDefault();
  $('.modal').classList.remove('hidden');
  $('.overlay').classList.remove('hidden');
};

const closeModal = function () {
  $('.modal').classList.add('hidden');
  $('.overlay').classList.add('hidden');
};

$$('.btn--show-modal').forEach(btn => btn.on('click', openModal));


$('.btn--close-modal').on('click', closeModal);
$('.overlay').on('click', closeModal);

document.on('keydown', function (e) {
  if (e.key === 'Escape' && !$('.modal').classList.contains('hidden')) {
    closeModal();
  }
});

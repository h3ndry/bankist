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
NodeList.prototype.on = function (name, fn) {
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

$('.btn--scroll-to').on('click', function (e) {
  const s1cords = $('#section--1').getBoundingClientRect();
  window.scrollTo({
    left: s1cords.left + window.pageYOffset,
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth'
  })

})

// $$('.nav__link').forEach(function (el) {
//   el.on('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     $(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

$('.nav__links').on('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    $(id).scrollIntoView({behavior: 'smooth'})
  }

})

$('.operations__tab-container').on('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  $$('.operations__tab').forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  $$('.operations__content').forEach(t => t.classList.remove('operations__content--active'))
  $(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

$('.nav').on('mouseover', function(e){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibiling = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')


  sibiling.forEach(el => {
    if (el !== link) el.style.opacity = 0.5;
  })
  logo.style.opacity = 0.5;

  }

})

$('.nav').on('mouseout', function(e){

  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibiling = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')


  sibiling.forEach(el => {
    if (el !== link) el.style.opacity = 1;
  })
  logo.style.opacity = 1;

  }

})

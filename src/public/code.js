const elements = {
  animatingElements: Array.from(
    document.querySelectorAll('.animate-on-scroll')
  ),
  menuIcon: document.querySelector('.nav__icon--menu'),
  backdrop: document.querySelector('.backdrop'),
  navList: document.querySelector('.nav__navigation'),
};
// on screen size change ....
let offSetYArray; // Distance of elements from top of web page
setTimeout(() => {
  offSetYArray = elements.animatingElements.map((el) => {
    el.style.animationName = 'ani';
    return getElementYOffset(el);
  });
}, 500);

const animateOnScroll = () => {
  const scrollTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  const windowHeight = window.innerHeight;
  elements.animatingElements.forEach((element, i) => {
    if (offSetYArray)
      animate(scrollTop, windowHeight, element, offSetYArray[i]);
  });
};
window.addEventListener('scroll', animateOnScroll);

elements.menuIcon.addEventListener('click', () => {
  elements.backdrop.style.display = 'block';
  elements.navList.style.cssText = `
  height: 20vh;
  visibility: visible;
  color: rgb(224, 223, 223);`;
});

elements.backdrop.addEventListener('click', () => {
  elements.backdrop.style.display = 'none';
  elements.navList.style.cssText = `
    height: 0vh;
    color: transparent;
    visibility: hidden;
    `;
});

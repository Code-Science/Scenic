const getElementYOffset = (el) => {
  const scrollValue =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  const rect = el.getBoundingClientRect();
  let distanceFromTop = rect.top;
  console.log(rect.top);
  if (scrollValue !== 0) {
    distanceFromTop = rect.top + scrollValue;
  }

  return distanceFromTop;
};

const animate = (scrollValue, windowHeight, element, yOffset) => {
  if (scrollValue + windowHeight >= yOffset + 80) {
    console.log(scrollValue, windowHeight, yOffset);
    element.style.animationName = 'ani';
  } else if (yOffset + 80 > scrollValue + windowHeight) {
    element.style.animationDuration = '.5s';
    element.style.animationName = 'back';
  }
};

// module.exports = {
//   getElementOffset,
//   animate,
// };

import { Size } from "./constants";

// function that returns the current width of the window
const getWidth = () => window.innerWidth;

// function that returns the current height of the window
const getHeight = () => window.innerHeight;

// function that returns the current width and height of the window
const getSize = () => ({width: getWidth(), height: getHeight()});

//Function that returns the current responsive size of the window
    //sm < 768
    //md  768 < 992
    //lg 992 < 1200
    //xl 1200 < 1400
    //xxl > 1400
export const useResponsive = () => {

  let width = getWidth();

  if (width < 768) {
    return Size.sm;
  } else if (width < 992) {
    return Size.md;
  } else if (width < 1200) {
    return Size.lg;
  } else if (width < 1400) {
    return Size.xl;
  } else {
    return Size.xxl;
  }
};

import { getStyleSheet, getCssClass } from "./utils.js";

const styleSheet = getStyleSheet("local");
const getCss = getCssClass(styleSheet.cssRules);

const returnColourClass = () => {
  const colorClass = getCss(".color");
  return () => {
    return colorClass;
  };
};

const colourClassHof = returnColourClass();

const returnTotals = () => {
  const totals = [...document.querySelectorAll(".color")];
  return () => {
    return totals;
  };
};

const returnTotalsHof = returnTotals();

export const initRange = () => {
  const range = document.getElementById("size");
  const colorClass = colourClassHof();
  range.addEventListener("input", e => {
    const value = parseInt(e.target.value);
    colorClass.style.fontSize = Math.round(4.8 * value * 10) + "px";
  });
};

export const initText = () => {
  const input = document.getElementById("text");
  const totals = returnTotalsHof();
  input.addEventListener("input", e => {
    totals.forEach(total => {
      total.innerText = e.target.value;
    });
  });
};

const colorsModule = () => {
  let dimensions = {};
  const cyan = getCss(".cyan");
  const magenta = getCss(".magenta");
  const yellow = getCss(".yellow");
  const resetDimensions = totals => {
    totals.forEach(total => {
      dimensions[total.dataset.color] = total.getBoundingClientRect();
    });
    return dimensions;
  };
  return {
    cyan,
    magenta,
    yellow,
    dimensions,
    resetDimensions
  };
};

export const initMotion = () => {
  const totals = returnTotalsHof();
  const colours = colorsModule();
  const dimensions = colours.resetDimensions(totals);
  const container = document.querySelector(".container");
  // add event listener for each total
  container.addEventListener("mousemove", e => {
    const colorName = "cyan";
    const x = (
      (e.clientX - dimensions[colorName].left) /
      dimensions[colorName].width
    ).toPrecision(1);
    const y = (
      (e.clientY - dimensions[colorName].top) /
      dimensions[colorName].height
    ).toPrecision(1);
    colours["cyan"].style.transform = `translate(-${48 - x * 4}%, -${y * 4 +
      48}%)`;
    colours["magenta"].style.transform = `translate(-${46 + x * 4}%, -${52 -
      y * 4}%)`;
    colours["yellow"].style.transform = `translate(-${46 + x * 4}%, -${y * 4 +
      48}%)`;
  });
};

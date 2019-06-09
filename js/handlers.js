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
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  input.addEventListener("input", e => {
    totals.forEach(total => {
      total.innerText = e.target.value;
    });
  });
};

const colorsModule = () => {
  const cyan = getCss(".cyan");
  const magenta = getCss(".magenta");
  const yellow = getCss(".yellow");
  return {
    cyan,
    magenta,
    yellow
  };
};

const eventHandler = (containerDimensions, colours) => e => {
  const { clientX, clientY } = e.type === "mousemove" ? e : e.touches.item(0);
  const x = (
    (clientX - containerDimensions.left) /
    containerDimensions.width
  ).toPrecision(3);
  const y = (
    (clientY - containerDimensions.top) /
    containerDimensions.height
  ).toPrecision(3);
  colours["cyan"].style.transform = `translate(-${50 - x * 4}%, -${y * 4 +
    48}%)`;
  colours["magenta"].style.transform = `translate(-${48 + x * 4}%, -${52 -
    y * 4}%)`;
  colours["yellow"].style.transform = `translate(-${46 + x * 4}%, -${48 +
    y * 8}%)`;
};

export const initMotion = () => {
  const totals = returnTotalsHof();
  const colours = colorsModule();
  const container = document.querySelector(".container");
  const containerDimensions = container.getBoundingClientRect();
  const eventHandlerWithProps = eventHandler(containerDimensions, colours);
  // add event listener for each total
  container.addEventListener("mousemove", eventHandlerWithProps);
  container.addEventListener("touchmove", eventHandlerWithProps);
};

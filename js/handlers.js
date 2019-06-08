export const initRange = () => {
  const range = document.getElementById("size");
  const styleSheet = getStyleSheet("local");
  const colorClass = getCssClass(styleSheet.cssRules, ".color");
  const BASE_SIZE = 16;
  range.addEventListener("input", e => {
    const value = parseInt(e.target.value);
    colorClass.style.fontSize = Math.round(4.8 * value * 10) + "px";
  });
};

export const initText = () => {
  const input = document.getElementById("text");
  const totals = [...document.querySelectorAll(".color")];
  input.addEventListener("input", e => {
    totals.forEach(total => {
      total.innerText = e.target.value;
    });
  });
};

function getStyleSheet(unique_title) {
  for (let i = 0; i < document.styleSheets.length; i++) {
    let sheet = document.styleSheets[i];
    if (sheet.title == unique_title) {
      return sheet;
    }
  }
}

function getCssClass(styles, selector) {
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i];
    if (style.selectorText == selector) {
      return style;
    }
  }
}

(function() {
  const initRange = () => {
    const range = document.getElementById("size");
    const styleSheet = getStyleSheet("local");
    const colorClass = getCssClass(styleSheet.cssRules, ".color");
    const BASE_SIZE = 16;
    range.addEventListener("input", e => {
      const value = parseInt(e.target.value);
      colorClass.style.fontSize = Math.round(4.8 * value * 10) + "px";
    });
  };

  initRange();
})();

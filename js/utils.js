export function getStyleSheet(title) {
  for (let i = 0; i < document.styleSheets.length; i++) {
    let sheet = document.styleSheets[i];
    if (sheet.title == title) {
      return sheet;
    }
  }
}

export function getCssClass(styles, selector) {
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i];
    if (style.selectorText == selector) {
      return style;
    }
  }
}

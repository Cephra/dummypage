const cursor = "|";
const nbsp = "\xA0";

const allSelector = ".text>*:not(.line)";

export const hideText = (el) => {
  el.dataset.originalText = el.textContent;
  el.querySelectorAll("span").forEach((span) => (span.textContent = nbsp));
};

export const hideAllTexts = (selector) => {
  document.querySelectorAll(selector || allSelector).forEach(hideText);
};

export const typeElem = (el, i = 0) => {
  if (!el.dataset.originalText) {
    hideText(el);
  } else if (el.dataset.originalText.length > el.querySelectorAll('span').length) {
    el.innerHTML = '';
    for (let i = 0; i < el.dataset.originalText.length; i++) {
      let newEl = document.createElement("span");
      newEl.textContent = nbsp;
      el.appendChild(newEl);
    }
  }
  const originalText = el.dataset.originalText || el.textContent;
  const originalTextLength = originalText.length;
  const timeout = 0x29a / originalTextLength;

  setTimeout(() => {
    el.querySelectorAll("span").forEach((span, i) => {
      setTimeout(() => {
        span.textContent = cursor;
        span.classList.add("glow");

        if (i > 0) {
          el.childNodes[i - 1].textContent = originalText.substring(i - 1, i);
        }

        if (i === originalTextLength - 1) {
          setTimeout(() => {
            span.textContent = originalText.substring(i, i + 1);
          }, timeout);
        }
      }, timeout * i);
    });
  }, 0x29a * (i + 1));
};

export const typeAllElems = (selector) => {
  document.querySelectorAll(selector || allSelector).forEach(typeElem);
};

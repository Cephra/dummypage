const cursor = "|";

document.querySelectorAll(".text>*:not(.line)").forEach((el, i) => {
  const originalText = el.textContent;
  const originalTextLength = originalText.length;
  const timeout = 0x29a / originalTextLength;

  el.querySelectorAll("span").forEach((span) => (span.textContent = "\xA0"));

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
});

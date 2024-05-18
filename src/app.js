const cursor = "|";

document.querySelectorAll(".text>*:not(.line)").forEach((el) => {
  const originalText = el.textContent;
  const originalTextLength = originalText.length;

  el.querySelectorAll("span").forEach((span) => (span.textContent = "\xA0"));

  setTimeout(() => {
    el.querySelectorAll("span").forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('glow');

        if (i > 0) {
          el.childNodes[i-1].textContent = originalText.substring(i-1, i);
        }

        span.textContent = (i < originalTextLength-1) ? cursor : originalText.substring(i, i+1);
      }, (0x29a/originalTextLength)*i)
    });
  }, 0x29a);
});

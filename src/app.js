document.querySelectorAll(".text>*:not(.line)").forEach((el) => {
  const text = el.textContent;
  const originalText = text;
  const originalTextLength = text.length;

  el.textContent = text.replace(/./g, "\xA0");

  setTimeout(() => {
    const blockChar = "|";
    el.textContent = blockChar + el.textContent.substring(1);

    let typedChars = 0;
    const typer = setInterval(() => {
      if (typedChars < originalTextLength - 1) {
        const newText =
          originalText.substring(0, typedChars + 1) +
          blockChar +
          el.textContent.substring(typedChars + 2);

        el.textContent = newText;

        typedChars += 1;
      } else {
        clearInterval(typer);
        el.textContent = originalText;
      }
    }, 0x29a/originalTextLength);
  }, 0x29a);
});
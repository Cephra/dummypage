const CURSOR = "|";
const NBSP = "\xA0";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createTyper = (elem: HTMLElement) => {
  const text = elem.textContent?.trim() ?? "";
  const splittedText = text.split("");
  const timeout = 0x29a / splittedText.length;

  const typer = {
    async hide() {
      const letterElems = splittedText.map(() => {
        const letterElem = document.createElement("span");
        letterElem.textContent = NBSP;

        return letterElem;
      });

      elem.innerHTML = "";
      elem.append(...letterElems);
      elem.dataset.hidden = "true";

      return letterElems;
    },
    async type() {
      let elems: HTMLElement[] = [];
      if (!elem.dataset.hidden) {
        elems = await typer.hide();
      } else {
        elems = Array.from(elem.querySelectorAll("span"));
      }
      let prevLetterElem: HTMLElement | null = null;
      for (const [i, elem] of Array.from(elems.entries())) {
        elem.textContent = CURSOR;
        elem.classList.add("glow");

        if (prevLetterElem) {
          prevLetterElem.textContent = splittedText[i - 1];
        }

        prevLetterElem = elem;

        await sleep(timeout);
      }
      prevLetterElem.textContent = splittedText.at(-1);
    },
    async untype() {
      // TODO reverse typing effect
      console.log("not implemented yet");
    },
  };

  return typer;
};

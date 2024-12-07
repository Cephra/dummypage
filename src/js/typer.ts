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
      let prevElem: HTMLElement | null = null;
      for (const [i, elem] of Array.from(elems.entries())) {
        elem.textContent = CURSOR;
        elem.classList.add("glow");

        if (prevElem) {
          prevElem.textContent = splittedText[i - 1];
        }

        prevElem = elem;

        await sleep(timeout);
      }
      prevElem.textContent = splittedText.at(-1);
    },
    async untype() {
      const elems = Array.from(elem.querySelectorAll("span"));

      let prevElem = null;

      for (const elem of elems.toReversed()) {
        elem.textContent = CURSOR;

        if (prevElem) {
          prevElem.textContent = NBSP;
        }

        prevElem = elem;

        await sleep(timeout);
      }

      prevElem.textContent = NBSP;
    },
  };

  return typer;
};

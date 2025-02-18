const CURSOR = "|";
const NBSP = "\xA0";

import { sleep } from "./util";

export const createTyper = (letterContainer: HTMLElement) => {
  const text = letterContainer.textContent?.trim() ?? "";
  let splittedText = text.split("");
  const timeout = 0x29a / splittedText.length;

  const typer = {
    async changeText(newText: string, wait: number = 0) {
      if ("true" === letterContainer.dataset.hidden) {
        splittedText = newText.split("");
        await typer.hide();
      } else {
        await typer.untype();
        splittedText = newText.split("");
        await typer.hide();
        await sleep(wait);
        await typer.type();
      }
    },
    async hide() {
      const letterElems = splittedText.map(() => {
        const letterElem = document.createElement("span");
        letterElem.textContent = NBSP;

        return letterElem;
      });

      letterContainer.innerHTML = "";
      letterContainer.append(...letterElems);
      letterContainer.dataset.hidden = "true";

      return letterElems;
    },
    async type() {
      let letterElems: HTMLElement[] = [];
      if (!letterContainer.dataset.hidden) {
        letterElems = await typer.hide();
      } else {
        letterElems = Array.from(letterContainer.querySelectorAll("span"));
      }
      let prevElem: HTMLElement | null = null;
      for (const [i, letterElem] of Array.from(letterElems.entries())) {
        letterElem.textContent = CURSOR;
        letterElem.classList.add("glow");

        if (prevElem) {
          prevElem.textContent = splittedText[i - 1];
        }

        prevElem = letterElem;

        await sleep(timeout);
      }
      prevElem.textContent = splittedText.at(-1);
      letterContainer.dataset.hidden = "false";
    },
    async untype() {
      const letterElems = Array.from(letterContainer.querySelectorAll("span"));

      let prevElem = null;

      for (const letterElem of letterElems.toReversed()) {
        letterElem.textContent = CURSOR;

        if (prevElem) {
          prevElem.textContent = NBSP;
        }

        prevElem = letterElem;

        await sleep(timeout);
      }

      prevElem.textContent = NBSP;
      letterContainer.dataset.hidden = "true";
    },
  };

  return typer;
};

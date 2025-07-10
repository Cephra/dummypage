import "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

const texts = [
  "processing your click...",
  "awaiting user command...",
  "clicks are being noted...",
  "nothing thrilling here...",
  "listening on port 80...",
  "compiled with stubs.js...",
  "stage zero deployment...",
  "pinging the cosmic void...",
  "rendering placeholder...",
  "user presence confirmed...",
  "logging extra details...",
  "running diagnostics now...",
  "status: serenely idle...",
  "html in super safe mode",
  "echoing into the ether...",
  "system on standby mode...",
  "request gently denied...",
  "zero errors; zero features",
  "running on pure vibes...",
  "input ignored as designed",
];

let lastIndex = 0;
function getNextText() {
  let index;
  do {
    index = Math.floor(Math.random() * texts.length);
  } while (index === lastIndex);
  
  lastIndex = index;
  
  return texts[index];
}

async function main() {
  const typers = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".textcontainer > *, .subcontainer > *",
    ),
  ).map((el) => createTyper(el));
  typers.forEach(async (typer) => await typer.hide());
  const typerTypers = typers.map((typer) => {
    return typer.type;
  });
  typerTypers.shift()();
  await sleep(0x29a * 2);
  for (const typer of typerTypers) {
    await typer();
  }
  const lastTyper = typers.at(-1);
  while (true) {
    await sleep(0x29a * 3);
    const text = getNextText();
    await lastTyper.changeText(text, 0x29a);
  }
}
document.addEventListener("DOMContentLoaded", main);

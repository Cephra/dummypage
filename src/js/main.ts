import "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

const texts = [
  "except a cool click effect :D",
  "awaiting user input",
  "clicks are silently judged",
  "not much else going on",
  "listening on port 80",
  "compiled with placeholder.js",
  "stage 0 deployment",
  "pinging the void",
  "rendering placeholder protocol",
  "user presence detected",
  "logging unnecessary data",
  "running diagnostics... maybe",
  "status: comfortably idle",
  "html running in safe mode",
  "echoing into the void",
  "system standing by",
  "request: denied",
  "zero errors, zero features",
  "running on pure vibes",
  "input ignored (as expected)",
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
  //TODO implement random sentence generation for the last typer
  const lastTyper = typers.at(-1);
  while (true) {
    await sleep(0x29a * 3);
    const text = getNextText();
    await lastTyper.changeText(text, 0x29a);
  }
}
document.addEventListener("DOMContentLoaded", main);

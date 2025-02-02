import "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

const texts = [
  "just a placeholder o_o",
  "this website is still in beta",
  "stay tuned for... nothing (:",
  "why are you even here?",
  "well... you're here anyway :)",
  "really just a placeholder",
  "except a cool click effect :D",
  "much content... so wow...",
];

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
    const text = texts[Math.floor(Math.random() * texts.length)];
    await lastTyper.changeText(text, 0x29a);
  }
}
document.addEventListener("DOMContentLoaded", main);

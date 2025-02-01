import "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

async function main() {
  const typers = Array.from(
    document.querySelectorAll<HTMLElement>(".textcontainer > *, .subcontainer > *"),
  ).map((el) => createTyper(el));
  typers.forEach(async (typer) => await typer.hide());
  const typerTypers = typers.map((typer) => {
    return typer.type;
  });
  typerTypers.shift()();
  await sleep(0x29a*2);
  for (const typer of typerTypers) {
    await typer();
  }
  //TODO implement random sentence generation for the last typer
  //const lastTyper = typers.at(-1);
  //await lastTyper.untype();
}
document.addEventListener("DOMContentLoaded", main);

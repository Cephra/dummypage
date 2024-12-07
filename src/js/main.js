import "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

async function main() {
  const typers = Array.from(
    document.querySelectorAll(".textcontainer > *, .subcontainer > *"),
  ).map((el) => createTyper(el));
  typers.forEach(async (typer) => await typer.hide());
  await sleep(0x29a);
  const typerTypers = typers.map((typer) => {
    return typer.type;
  });
  for (const typer of typerTypers) {
    await typer();
  }
  await sleep(0x29a);
}
document.addEventListener("DOMContentLoaded", main);

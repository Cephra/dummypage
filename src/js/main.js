import "./rippler";
import { createTyper } from "./typer";

async function main() {
  const typers = Array.from(
    document.querySelectorAll(".textcontainer > *, .subcontainer > *"),
  ).map((el) => createTyper(el));
  typers.forEach(async (typer) => await typer.hide());
  const typerTypers = typers.map((typer) => {
    return typer.type;
  });
  typerTypers.shift()();
  setTimeout(async () => {
    for (const typer of typerTypers) {
      await typer();
    }
  }, 0x29a*2);
}
document.addEventListener("DOMContentLoaded", main);

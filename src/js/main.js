import "./rippler";
import { createTyper } from "./typer";

async function main() {
  const typers = Array.from(
    document.querySelectorAll(".text>*:not(.line)"),
  ).map((el) => createTyper(el));
  typers.forEach(async (typer) => await typer.hide());
  setTimeout(async () => {
    const typerTypers = typers.map((typer) => {
      return typer.type;
    });
    for (const typer of typerTypers) {
      await typer();
    }
  }, 0x29a);
}
document.addEventListener("DOMContentLoaded", main);

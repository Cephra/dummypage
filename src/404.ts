import { globalRippler } from "./common/scripts/rippler";
import { createTyper } from "./common/scripts/typer";
import { sleep } from "./common/scripts/util";

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
}
document.addEventListener("DOMContentLoaded", () => {
  main();
  globalRippler();
});

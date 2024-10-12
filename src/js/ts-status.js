import { rippleCenter } from "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

import axios from "axios";

const retryInterval = 0x29a * 0x69;

const playerList = {}
async function updatePlayerList(playerlist) {

}

let firstFetch = true;
async function updateClientCount() {
  const clients = await axios.get("https://ts.0x29a.me/api/clientlist");
  const filteredClients = clients.data.body.filter(
    (client) => client.client_type === "0",
  );
  const el = document.querySelector(".text > h1");
  const filteredClientsLength = filteredClients.length.toString();

  if (el.textContent !== filteredClientsLength) {
    el.innerHTML = "";
    filteredClientsLength.split().forEach((c) => {
      const clientNumberSpan = document.createElement("span");
      clientNumberSpan.classList.add("fadetext");
      clientNumberSpan.textContent = c;
      el.appendChild(clientNumberSpan);
    });

    if (firstFetch) {
      firstFetch = false;
    } else {
      rippleCenter(el);
    }
  }
  retry();
}

async function retry() {
  await sleep(retryInterval);
  requestAnimationFrame(updateClientCount);
}

async function runner() {
  try {
    updateClientCount();
  } catch (err) {
    retry();
  }

  const typers = [
    createTyper(document.querySelector(".text > p")),
    createTyper(document.querySelector(".hint")),
  ];
  typers.forEach(async (typer) => await typer.hide());

  await sleep(0x29a);
  await typers[0].type();
  await typers[1].type();
}
runner();

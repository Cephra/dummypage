import { rippleCenter } from "./rippler";
import { createTyper } from "./typer";

import axios from "axios";

const retryInterval = 0x29a * 0x69;

let firstFetch = true;
let clientCount = 0;
async function updateClientCount() {
  let clients = await axios.get("https://ts.0x29a.me/api/clientlist");
  const filteredClients = clients.data.body.filter(
    (client) => client.client_type === "0",
  );
  const el = document.querySelector(".textcontainer > h1");
  clientCount = filteredClients.length.toString();

  if (el.textContent !== clientCount) {
    el.innerHTML = "";
    clientCount.split().forEach((c) => {
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
  setTimeout(() => {
    requestAnimationFrame(updateClientCount);
  }, retryInterval);
}

async function runner() {
  try {
    updateClientCount();
  } catch (err) {
    retry();
  }
  
  document.querySelector('#shareButton').addEventListener('click', async () => {
    const shareData = {
      url: `There are currently ${clientCount} clients in teamspeak.`,
    };
    if (navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }
  });
  
  const typers = [
    createTyper(document.querySelector(".subcontainer > p")),
    createTyper(document.querySelector(".hint")),
  ];
  typers.forEach(async (typer) => await typer.hide());
  setTimeout(async () => {
    await typers[0].type();
    await typers[1].type();
  }, 0x29a*2);
}
runner();

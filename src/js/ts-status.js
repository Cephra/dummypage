import { rippleCenter } from "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

import axios from "axios";

const retryInterval = 0x29a * 0x69;

let firstFetch = true;
let clientCount = 0;
let filteredClients = [];
async function updateClientCount(noRetry = false) {
  let clients = await axios.get("https://ts.0x29a.me/api/clientlist");
  filteredClients = clients.data.body.filter(
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
  if (noRetry) return;
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
  
  document.querySelector('#refreshButton')?.addEventListener('click', async () => {
    await updateClientCount(true);
  });
  
  document.querySelector('#copyButton')?.addEventListener('click', async () => {
    const clipboardText = `There are currently ${clientCount} clients in teamspeak.`;
    navigator.clipboard.writeText(clipboardText);
  });
  
  const listButton = document.querySelector('#listButton');
  const modalClose = document.querySelector('#modalClose');
  const modalBackdrop = document.querySelector('#modalBackdrop');
  const modal = document.querySelector('#modalBackdrop .modal');
  const playerListUl = document.querySelector('#modalBackdrop .modal-body > ul');
  listButton?.addEventListener('click', async (e) => {
    e.stopPropagation();
    
    playerListUl.replaceChildren(
      ...filteredClients.map((client) => {
        const clientElem = document.createElement("li");

        clientElem.textContent = client.client_nickname;

        return clientElem;
      }),
    );
    
    modalBackdrop.classList.toggle('active',
      !modalBackdrop.classList.contains('active')
    );
  });
  modal.addEventListener('click', async (e) => {
    e.stopPropagation();
  });
  document.addEventListener('click', async (e) => {
    modal.contains(e.target) || modalBackdrop.classList.remove('active');
  });
  modalClose.addEventListener('click', async () => {
    modalBackdrop.classList.remove('active');
  });
  
  
  const typers = [
    createTyper(document.querySelector(".subcontainer > p")),
    createTyper(document.querySelector(".hint")),
  ];
  typers.forEach(async (typer) => await typer.hide());

  await sleep(0x29a*2);
  await typers[0].type();
  await typers[1].type();
}
runner();

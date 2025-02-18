import { rippleCenter } from "./rippler";
import { createTyper } from "./typer";
import { sleep } from "./util";

import axios from "axios";

const retryInterval = 0x29a * 0x69;

let firstFetch = true;
let clientCount = "0";
let filteredClients = [];
const playerListUl = document.querySelector("#modalBackdrop .modal-body > ul");

async function updatePlayerList() {
  playerListUl.replaceChildren(
    ...filteredClients.map((client) => {
      const clientElem = document.createElement("li");
      const clientIcon = document.createElement("i");
      switch (client.cid) {
        case "14":
          clientIcon.classList.add("fa-solid", "fa-moon");
          break;
        case "28":
          clientIcon.classList.add("fa-solid", "fa-baby");
          break;
        default:
          clientIcon.classList.add("fa-solid", "fa-person");
          break;
      }

      clientElem.textContent = client.client_nickname;
      clientElem.prepend(clientIcon);

      return clientElem;
    }),
  );
}

async function updateClientCount(noRetry = false) {
  let clients = await axios.get("https://ts.0x29a.me/api/clientlist");
  filteredClients = clients.data.body.filter(
    (client) => client.client_type === "0",
  );
  await updatePlayerList();
  const el = document.querySelector(".textcontainer > h1");
  clientCount = filteredClients.length.toString();

  if (el.textContent !== clientCount) {
    el.innerHTML = "";
    clientCount.split("").forEach((c) => {
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
  requestAnimationFrame(async () => {
    await updateClientCount();
  });
}

async function runner() {
  try {
    updateClientCount();
  } catch (err) {
    retry();
  }

  document
    .querySelector("#refreshButton")
    ?.addEventListener("click", async () => {
      await updateClientCount(true);
    });

  document.querySelector("#copyButton")?.addEventListener("click", async () => {
    const clipboardText = `There are currently ${clientCount} clients in teamspeak.`;
    navigator.clipboard.writeText(clipboardText);
  });

  const listButton = document.querySelector("#listButton");
  const modalClose = document.querySelector("#modalClose");
  const modalBackdrop = document.querySelector("#modalBackdrop");
  const modal = document.querySelector("#modalBackdrop .modal");
  listButton?.addEventListener("click", async (e) => {
    e.stopPropagation();

    modalBackdrop.classList.toggle(
      "active",
      !modalBackdrop.classList.contains("active"),
    );
  });
  modal.addEventListener("click", async (e) => {
    e.stopPropagation();
  });
  document.addEventListener("click", async (e) => {
    modal.contains(e.target as Node) ||
      modalBackdrop.classList.remove("active");
  });
  modalClose.addEventListener("click", async () => {
    modalBackdrop.classList.remove("active");
  });

  const typers = [
    createTyper(document.querySelector(".subcontainer > p")),
    createTyper(document.querySelector(".hint")),
  ];
  typers.forEach(async (typer) => await typer.hide());

  await sleep(0x29a * 2);
  await typers[0].type();
  await typers[1].type();
}
runner();

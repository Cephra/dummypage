import { hideAllTexts, typeElem } from "../util";

import axios from "axios";

async function updateClientCount() {
  let clients = await axios.get("https://ts.0x29a.me/api/clientlist");
  const filteredClients = clients.data.body.filter(
    (client) => client.client_type === "0",
  );
  const el = document.querySelector(".text > h1");
  let filteredClientsLength = filteredClients.length.toString();

  if (el.textContent !== filteredClientsLength) {
    el.innerHTML = "";
    filteredClientsLength.split().forEach((c) => {
      const clientNumberSpan = document.createElement("span");
      clientNumberSpan.classList.add("fadetext");
      clientNumberSpan.textContent = c;
      el.appendChild(clientNumberSpan);
    });
  }

  setTimeout(() => {
    requestAnimationFrame(updateClientCount);
  }, 0x29a * 0x3ff);
}

async function runner() {
  try {
    setTimeout(() => {
      updateClientCount();
    }, 0x29a);
  } catch (err) {
    console.log(err);
    // todo retry
  }
}

hideAllTexts();
typeElem(document.querySelector(".text > p"));

runner();

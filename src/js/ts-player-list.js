import { hideAllTexts, typeElem } from "./util";
import { rippleCenter } from "./rippler";

import axios from "axios";

const retryInterval = 0x29a*0x69;

let firstFetch = true;


async function updateClientList() {
    let clients = await axios.get("https://ts.0x29a.me/api/clientlist");
    const filteredClients = clients.data.body.filter(
      (client) => client.client_type === "0",
    );
    const el = document.querySelector(".text > p");
    let clientList = filteredClients.map((obj, index) => {
        return `${obj.client_nickname} <br>`;
    }).join('');
    // .length.toString();
  
    if (el.textContent !== clientList) {
      el.innerHTML = clientList;
    }
    retry();
  }

  async function retry() {
    setTimeout(() => {
      requestAnimationFrame(clientList      );
    }, retryInterval);
  }
  
  async function runner() {
    try {
      setTimeout(() => {
        updateClientList();
      }, 0x29a);
    } catch (err) {
      retry();
    }
  }

  runner();
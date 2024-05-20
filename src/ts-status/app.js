import { hideAllTexts, typeElem } from "../util";

import axios from "axios";

hideAllTexts();
typeElem(document.querySelector(".text > p"));

axios
  .get("https://ts.0x29a.me/api/clientlist")
  .then((res) => {
    const filteredClients = res.data.body.filter(
      (client) => client.client_type === "0",
    );
    `${filteredClients.length}`.split().forEach((c) => {
      const clientNumberSpan = document.createElement("span");
      clientNumberSpan.classList.add("fadetext");
      clientNumberSpan.textContent = c;
      document.querySelector(".text > h1").appendChild(clientNumberSpan);
    });
  })
  .catch((err) => {
    console.log(err);
  });

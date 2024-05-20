import { hideAllTexts, typeElem } from "../util";

import axios from "axios";

hideAllTexts();
typeElem(document.querySelector('.text > p'));

axios
  .get("https://ts.0x29a.me/api/clientlist")
  .then((res) => {
    const filteredClients = res.data.body.filter(
      (client) => client.client_type === "0"
    );
    document.querySelector(".text > h1").dataset.originalText =
      filteredClients.length;
    typeElem(document.querySelector('.text > h1'));
  })
  .catch((err) => {
    console.log(err);
  });

import { rippleCenter } from "../common/scripts/rippler";
import { createTyper } from "../common/scripts/typer";
import { sleep } from "../common/scripts/util";

import axios from "axios";

const retryInterval = 0x29a * 0x69;

let firstFetch = true;
let userCount = "0";
let filteredUsers = [];
const playerListUl = document.querySelector("#modalBackdrop .modal-body > ul");

async function updatePlayerList() {
  if (filteredUsers.length === 0) {
    const noUsersLi = document.createElement("li");
    noUsersLi.textContent = "no users connected";
    playerListUl.replaceChildren(noUsersLi);
    return;
  }
  playerListUl.replaceChildren(
    ...filteredUsers.map((user) => {
      const userElem = document.createElement("li");
      const userIcon = document.createElement("i");
      switch (user.cid) {
        case "14":
          userIcon.classList.add("fa-solid", "fa-moon");
          break;
        case "28":
          userIcon.classList.add("fa-solid", "fa-baby");
          break;
        default:
          userIcon.classList.add("fa-solid", "fa-person");
          break;
      }

      userElem.textContent = user.client_nickname;
      userElem.prepend(userIcon);

      return userElem;
    }),
  );
}

async function updateUserCount(noRetry = false) {
  let users = await axios.get("https://ts.0x29a.me/api/clientlist");
  filteredUsers = users.data.body.filter(
    (user) => user.client_type === "0",
  );
  await updatePlayerList();
  const el = document.querySelector(".textcontainer > h1");
  userCount = filteredUsers.length.toString();

  if (el.textContent !== userCount) {
    el.innerHTML = "";
    userCount.split("").forEach((c) => {
      const userNumberSpan = document.createElement("span");
      userNumberSpan.classList.add("fadetext");
      userNumberSpan.textContent = c;
      el.appendChild(userNumberSpan);
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
    await updateUserCount();
  });
}

async function runner() {
  try {
    updateUserCount();
  } catch (err) {
    retry();
  }

  document
    .querySelector("#refreshButton")
    ?.addEventListener("click", async () => {
      await updateUserCount(true);
    });

  document.querySelector("#copyButton")?.addEventListener("click", async () => {
    const clipboardText = `There are currently ${userCount} users in teamspeak.`;
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
    if (modal.contains(e.target as Node)) return;
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register(new URL('service-worker.ts', import.meta.url))
      .then(reg => console.log('ServiceWorker registered:', reg))
      .catch(err => console.error('ServiceWorker registration failed:', err));
  });
}
export function createRippler(event) {
  const ripple = document.createElement("div");
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
  ripple.classList.add("ripple");

  document.querySelector("body").appendChild(ripple);
  ripple.style.top = `${event.clientY - ripple.clientHeight / 2}px`;
  ripple.style.left = `${event.clientX - ripple.clientWidth / 2}px`;
};

export function rippleCenter(elem) {
  const rect = elem.getBoundingClientRect();
  createRippler({
    clientX: rect.x+rect.width/2,
    clientY: rect.y+rect.height/2,
  })
}

export function globalRippler() {
  document.addEventListener("click", createRippler);
}

document.addEventListener("click", (event) => {
  const ripple = document.createElement("div");
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
  ripple.classList.add("ripple");

  document.querySelector("body").appendChild(ripple);
  ripple.style.top = `${event.clientY - ripple.clientHeight / 2}px`;
  ripple.style.left = `${event.clientX - ripple.clientWidth / 2}px`;
});

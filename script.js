const spaces = document.querySelectorAll(".spaces");

spaces.forEach((space) => {
  space.addEventListener("click", () => {
    let value = space.getAttribute("id");
    document.getElementById(value).textContent = "X";
  });
});

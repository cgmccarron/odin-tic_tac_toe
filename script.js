const game_board = () => {
  let board = new Array(9);
  const get_board = (num) => {
    return board[num];
  };
};

const spaces = document.querySelectorAll(".spaces");

spaces.forEach((space) => {
  space.addEventListener("click", () => {
    let value = space.getAttribute("id");
    document.getElementById(value).textContent = "O";
  });
});

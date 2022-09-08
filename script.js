const game_board = (() => {
  let board = new Array(9);
  const is_space_free = (num) => {
    if (board[num] === "O" || board[num] === "X") {
      return false;
    } else {
      return true;
    }
  };

  const set_space = (num, sign) => {
    board[num] = sign;
  };

  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const check_winner = (sign) => {
    return WINNING_COMBOS.some((combos) => {
      return combos.every((index) => {
        return board[index] === sign;
      });
    });
  };

  const clear_board = () => {
    board = new Array(9);
  };

  return { set_space, is_space_free, check_winner, clear_board };
})();

const player = (player_name, sign, ai, turn) => {
  const take_turn = () => {
    turn = !turn;
  };

  let color = sign === "X" ? "#78290f" : "#ff7d00";
  return { player_name, sign, turn, take_turn, color };
};

const game = (() => {
  const spaces = document.querySelectorAll(".spaces");
  const winning_message = document.querySelector(".winning-message");
  const outcome_message = document.querySelector(".outcome-message");
  const restart_button = document.getElementById("restart-button");
  let x_player = player("PLayer one", "X", false, true);
  let o_player = player("PLayer two", "O", false, false);

  const switch_turns = () => {
    x_player.turn = !x_player.turn;
  };

  const game_winner = (sign) => {
    return sign + " is the winner!";
  };

  const restart_game = () => {
    game_board.clear_board();
    spaces.forEach((space) => {
      space.textContent = "";
    });
    winning_message.classList.add("hidden");
    x_player.turn = true;
  };

  spaces.forEach((space) => {
    space.addEventListener("click", () => {
      let sign = x_player.turn ? x_player.sign : o_player.sign;
      let color = x_player.turn ? x_player.color : o_player.color;
      let index = space.getAttribute("id");
      if (game_board.is_space_free(index)) {
        game_board.set_space(index, sign);
        space.style.color = color;
        space.textContent = sign;
        switch_turns();
        if (game_board.check_winner(sign)) {
          outcome_message.textContent = game_winner(sign);
          winning_message.classList.remove("hidden");
        }
      }
    });
  });

  restart_button.addEventListener("click", () => {
    restart_game();
  });
})();

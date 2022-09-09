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
  return { player_name, sign, turn, take_turn, color, ai };
};

const bot = (() => {
  const pick_spot = () => {
    let random_number = Math.floor(Math.random() * 9);
    if (game_board.is_space_free(random_number)) {
      console.log(random_number);
      return random_number;
    } else {
      return pick_spot();
    }
  };

  return { pick_spot };
})();

const game = (() => {
  const spaces = document.querySelectorAll(".spaces");
  const winning_message = document.querySelector(".winning-message");
  const outcome_message = document.querySelector(".outcome-message");
  const restart_button = document.getElementById("restart-button");
  let turn_counter = 0;
  let x_player = player("PLayer one", "X", false, true);
  let o_player = player("PLayer two", "O", true, false);

  const switch_turns = () => {
    x_player.turn = !x_player.turn;
    turn_counter += 1;
    if (turn_counter === 9) {
      outcome_message.textContent = "It's a draw!";
      winning_message.classList.remove("hidden");
    }
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
    turn_counter = 0;
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
      if (o_player.ai === true) {
        let bot_move = bot.pick_spot();
        console.log(bot_move);
        let bot_space = document.getElementById(bot_move.toString());
        game_board.set_space(bot_move, "O");
        bot_space.textContent = "O";
        switch_turns();
      }
    });
  });

  restart_button.addEventListener("click", () => {
    restart_game();
  });
})();

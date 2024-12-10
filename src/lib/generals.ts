/**
  * @param num 
  * @returns random number 1 to num
  */
export function gr(num: number = 90) {
  return Math.floor(Math.random() * num) + 1;
}

/**
 * creates game boards  
 * by the rule of the game,it selects numbers   
 * between 1 and 90 (including)
 * @param players 
 * @returns boards 
 */
export function CreateGameBoards(players: number = 4) {
  const boards: number[][] = [];
  for (let i = 0; i < players; i++) {
    const board: number[] = [];
    for (let j = 0; j < 15; j++) { // board contains 15 slot
      let n = gr();
      while (board.includes(n)) { // board cant contain same number twice
        n = gr();
      }
      board.push(n);
    }
    boards.push(board);
  }
  return boards;
}
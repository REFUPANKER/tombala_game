/**
  * @param num 
  * @returns random number 1 to num
  */
export function gr(num: number = 99) {
    return Math.floor(Math.random() * num) + 1;
}
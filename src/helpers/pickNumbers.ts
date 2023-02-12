import { PlayerCard } from "../types";

export const pickNumbers = () => {
  // create an array of numbers from 1 to 75
  let numbers = Array.from({ length: 75 }, (_, i) => i + 1);

  // shuffle the array
  for (let i = numbers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
};

const range = (start: number, end: number = 15) =>
  Array.apply(0, Array(end)).map((e, i) => i + start);

const shuffleArray = (array: number[]) => {
  let clone = array.slice(0);
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  }
  return clone;
};

const randomColumn = (start: number): any[] => {
  const array = range(start);
  return shuffleArray(array).slice(0, 5);
};

export const standardBingoCard = (): PlayerCard => {
  const nColumn = randomColumn(31);
  nColumn[2] = "Free";

  return {
    B: randomColumn(1),
    I: randomColumn(16),
    N: nColumn,
    G: randomColumn(46),
    O: randomColumn(61),
  };
};

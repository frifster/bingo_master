export type BingoGame = {
  channelId: string;
  memberId: string;
  players: any[];
  patternName: string;
  patternValue: string;
  id?: string;
};

export type PlayerInfo = {
  playerId: string;
  channelId: string;
};

type FiveArrofNumbers = [number, number, number, number, number];
type ArrOfNumAndFree = [number, number, "Free", number, number];

export type PlayerCard = {
  B: FiveArrofNumbers;
  I: FiveArrofNumbers;
  N: ArrOfNumAndFree;
  G: FiveArrofNumbers;
  O: FiveArrofNumbers;
};

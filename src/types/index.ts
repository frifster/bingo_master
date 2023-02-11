export type PlayerCard = {
  B: FiveArrofNumbers;
  I: FiveArrofNumbers;
  N: ArrOfNumAndFree;
  G: FiveArrofNumbers;
  O: FiveArrofNumbers;
};

export type BingoGame = {
  channelId: string;
  memberId: string;
  players: string[];
  patternName: string;
  patternValue: string;
  playerCards?: {
    [key: string]: PlayerCard;
  };
  id?: string;
};

export type PlayerInfo = {
  playerId: string;
  channelId: string;
};

type FiveArrofNumbers = [number, number, number, number, number];
type ArrOfNumAndFree = [number, number, "Free", number, number];

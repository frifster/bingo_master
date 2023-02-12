import { Client, Collection } from "discord.js";

export type PlayerCard = {
  B: number[];
  I: number[];
  N: (number | string)[];
  G: number[];
  O: number[];
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

export type UpdatePlayerInfo = {
  playerCards: {
    [key: string]: PlayerCard;
  };
  gameId: string;
};

export type ExtendedClient = Client & {
  commands: Collection<any, any>;
};

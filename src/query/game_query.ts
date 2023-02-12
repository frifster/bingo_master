import admin from "firebase-admin";
import { BingoGame, PlayerInfo, UpdatePlayerInfo } from "../types";

export const createGame = async (bingoGame: BingoGame) => {
  const firestore = admin.firestore();
  return firestore.collection("GAMES").add({
    ...bingoGame,
    gameEnded: false,
  });
};

export const checkLiveGame = async (channelId?: string | null) => {
  if (!channelId) {
    return 0;
  }

  const firestore = admin.firestore();
  const docs = await firestore
    .collection("GAMES")
    .where("channelId", "==", channelId)
    .where("gameEnded", "==", false)
    .get();

  if (docs.empty) {
    return 0;
  }

  const liveGame = {
    ...docs.docs[0].data(),
    id: docs.docs[0].id,
  } as BingoGame;

  return liveGame;
};

export const addPlayerToGame = async (playerInfo: PlayerInfo) => {
  const firestore = admin.firestore();

  const liveGame = await checkLiveGame(playerInfo.channelId);

  if (!liveGame) {
    return 0;
  }

  const doc = `GAMES/${liveGame.id}`;

  if (![...liveGame.players].includes(playerInfo.playerId)) {
    return firestore
      .doc(doc)
      .update({ players: [...liveGame.players, playerInfo.playerId] });
  }

  return 1;
};

export const updatePlayerCards = async (playerInfo: UpdatePlayerInfo) => {
  const firestore = admin.firestore();

  const doc = `GAMES/${playerInfo.gameId}`;

  return firestore.doc(doc).update({ playerCards: playerInfo.playerCards });
};

export const endGame = async (gameId: string) => {
  const firestore = admin.firestore();

  return firestore.doc(`GAMES/${gameId}`).update({ gameEnded: true });
};

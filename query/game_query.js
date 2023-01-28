import admin from 'firebase-admin';

export const createGame = async ({
    channelId,
    memberId,
    players,
    patternName,
    patternValue
}) => {
    const firestore = admin.firestore()
    return firestore.collection('GAMES').add({
        channelId,
        memberId,
        players,
        patternName,
        patternValue,
        gameEnded: false
    });
}


export const checkLiveGame = async (channelId) => {
    const firestore = admin.firestore();
    const docs = await firestore.collection('GAMES')
        .where('channelId', '==', channelId)
        .where('gameEnded', '==', false)
        .get()

    if (docs.empty) {
        return 0
    }

    const liveGame = {
        ...docs.docs[0].data(),
        id: docs.docs[0].id
    }

    return liveGame
}

export const addPlayerToGame = async ({ playerId, channelId }) => {
    const firestore = admin.firestore();

    const liveGame = await checkLiveGame(channelId)

    if (!liveGame) {
        return 0
    }

    const doc = `GAMES/${liveGame.id}`;


    if (![...liveGame.players].includes(playerId)) {
        return firestore.doc(doc).update({ players: [...liveGame.players, playerId] })
    }

    return 1
}

export const updatePlayerCards = async ({ playerCards, gameId }) => {
    const firestore = admin.firestore();

    const doc = `GAMES/${gameId}`;

    return firestore.doc(doc).update({ playerCards });
}

export const endGame = async (gameId) => {
    const firestore = admin.firestore();

    return firestore.doc(`GAMES/${gameId}`).update({ gameEnded: true })
}
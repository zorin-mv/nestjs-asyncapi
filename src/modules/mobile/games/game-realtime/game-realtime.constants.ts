export const GAME_REALTIME_EVENTS_TO_CLIENT = {
  userDisconnectedGameSession: 'userDisconnectedGameSession',
  userConnectedGameSession: 'userConnectedGameSession',
  qaGameStarted: 'qaGameStarted',
  gameSessionInterrupted: 'gameSessionInterrupted',
  userIsReady: 'userIsReady',
  userPostedQaGameAnswers: 'userPostedQaGameAnswers',
  qaGameResultsSent: 'qaGameResultsSent',
};

export const GAME_REALTIME_EVENTS_TO_SERVER = {
  joinGameSession: 'joinGameSession',
  leaveGameSession: 'leaveGameSession',
  startQAGame: 'startQAGame',
  postReadyUser: 'postReadyUser',
  postQaGameAnswers: 'postQaGameAnswers',
  getQaGameResults: 'getQaGameResults',
  cancelGameSession: 'cancelGameSession',
};

export interface GameSettings {
    gameStarted: boolean,
    amountOfPlayers: number,
    amountOfTreasures: number,
    maxAmountOfTreasures: number,
    humanOrCpu: boolean[],
    randomStartPositions: boolean,
    difficulty: number
}
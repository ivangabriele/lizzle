import { Chess } from 'chess.js'
import * as R from 'ramda'

import type { ChessInstance, Move, Square } from 'chess.js'
import type { Color, Dests, Key } from 'chessground/types'

const mapMoveSquare = (moves: Move[]): Key[] => R.map(R.prop('to'))(moves)

export enum GameState {
  CAPTURE = 'CAPTURE',
  CHECK = 'CHECK',
  DEFEAT = 'DEFEAT',
  DRAW = 'DRAW',
  MOVE = 'MOVE',
  VICTORY = 'VICTORY',
}

export enum GameColor {
  BLACK = 'black',
  WHITE = 'white',
}

export class Game {
  #chess: ChessInstance
  #initialTurnColor: Color

  constructor(fen: string, isInitialColorReversed: boolean = false) {
    this.#chess = new Chess(fen)
    this.#initialTurnColor = isInitialColorReversed ? this.nextTurnColor : this.currentTurnColor
  }

  get currentTurnColor(): Color {
    return this.#chess.turn() === 'w' ? GameColor.WHITE : GameColor.BLACK
  }

  get fen(): string {
    const fullFen = `${this.#chess.fen()} ${this.#chess.turn()}`

    return fullFen
  }

  get initialTurnColor(): Color {
    return this.#initialTurnColor
  }

  get nextTurnColor(): Color {
    return this.#chess.turn() === 'w' ? GameColor.BLACK : GameColor.WHITE
  }

  get state(): GameState {
    switch (true) {
      case this.#chess.in_checkmate() && this.currentTurnColor !== this.#initialTurnColor:
        return GameState.VICTORY

      case this.#chess.in_checkmate() && this.currentTurnColor === this.#initialTurnColor:
        return GameState.DEFEAT

      case this.#chess.in_draw():
        return GameState.DRAW

      case this.#chess.in_check():
        return GameState.CHECK

      default:
        return GameState.MOVE
    }
  }

  getDestinations(): Dests {
    const board = this.#chess.board()
    const boardSquares = R.flatten(board)
    const occupiedBoardSquares = R.reject(R.isNil)(boardSquares)
    const occupiedSquares = R.map(R.prop('square'))(occupiedBoardSquares)
    const legalMovesPairs = R.map((occupiedSquare: Key): [Key, Key[]] => [
      occupiedSquare,
      mapMoveSquare(this.getMoves(occupiedSquare)),
    ])(occupiedSquares)
    const movableLegalMovesPairs = R.filter<[Key, Key[]]>(([, legalMoves]) => !R.isEmpty(legalMoves))(legalMovesPairs)
    const destinations = new Map(movableLegalMovesPairs)

    return destinations
  }

  getMoves(square: Key): Move[] {
    return this.#chess.moves({
      legal: true,
      square,
      verbose: true,
    })
  }

  move(from: Square, to: Square): void {
    this.#chess.move({
      from,
      to,
    })
  }
}

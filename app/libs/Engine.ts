import { Chess } from 'chess.js'
import * as R from 'ramda'

import type { ChessInstance, Move, Square } from 'chess.js'
import type { Color, Dests, Key } from 'chessground/types'

const mapMoveSquare = (moves: Move[]): Key[] => R.map(R.prop('to'))(moves)

export enum EngineState {
  CAPTURE = 'CAPTURE',
  CHECK = 'CHECK',
  DEFEAT = 'DEFEAT',
  DRAW = 'DRAW',
  MOVE = 'MOVE',
  VICTORY = 'VICTORY',
}

export enum EngineColor {
  BLACK = 'black',
  WHITE = 'white',
}

export class Engine {
  #chess: ChessInstance
  #initialTurnColor: Color

  constructor(fen: string, isInitialColorReversed: boolean = false) {
    this.#chess = new Chess(fen)
    this.#initialTurnColor = isInitialColorReversed ? this.nextTurnColor : this.currentTurnColor
  }

  get currentTurnColor(): Color {
    return this.#chess.turn() === 'w' ? EngineColor.WHITE : EngineColor.BLACK
  }

  get fen(): string {
    return this.#chess.fen()
  }

  get initialTurnColor(): Color {
    return this.#initialTurnColor
  }

  get nextTurnColor(): Color {
    return this.#chess.turn() === 'w' ? EngineColor.BLACK : EngineColor.WHITE
  }

  get state(): EngineState {
    switch (true) {
      case this.#chess.in_checkmate() && this.currentTurnColor !== this.#initialTurnColor:
        return EngineState.VICTORY

      case this.#chess.in_checkmate() && this.currentTurnColor === this.#initialTurnColor:
        return EngineState.DEFEAT

      case this.#chess.in_draw():
        return EngineState.DRAW

      case this.#chess.in_check():
        return EngineState.CHECK

      default:
        return EngineState.MOVE
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

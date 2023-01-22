import PQueue from 'p-queue'

import { GameState } from './Game'

export enum AudioPlayerCustomSound {
  CONFIRMATION = 'CONFIRMATION',
  FAILURE = 'FAILURE',
}

export class AudioPlayer {
  #queue: PQueue = new PQueue({
    concurrency: 1,
  })

  #sound: Record<GameState | AudioPlayerCustomSound, HTMLAudioElement> = {
    [GameState.CAPTURE]: new Audio('/sounds/capture.ogg'),
    [GameState.CHECK]: new Audio('/sounds/silence.ogg'),
    [GameState.DEFEAT]: new Audio('/sounds/defeat.ogg'),
    [GameState.DRAW]: new Audio('/sounds/draw.ogg'),
    [GameState.MOVE]: new Audio('/sounds/move.ogg'),
    [GameState.VICTORY]: new Audio('/sounds/victory.ogg'),
    [AudioPlayerCustomSound.CONFIRMATION]: new Audio('/sounds/confirmation.wav'),
    [AudioPlayerCustomSound.FAILURE]: new Audio('/sounds/failure.ogg'),
  }

  async play(soundKey: GameState | AudioPlayerCustomSound, volumeRatio: number = 1) {
    await this.#queue.add(async () => {
      this.#sound[soundKey].volume = volumeRatio

      await this.#sound[soundKey].play()
    })
  }
}

import { SpotifyService } from 'src/app/services/spotify.service';
import { IMusica } from 'src/app/interfaces/IMusica';
import { Injectable } from '@angular/core';
import { newMusica } from '../common/factories';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000)
  }

  definirMusicaAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }

  async voltarMusica() {
    await this.spotifyService.voltarMusica();
  }

  async proximaMusica() {
    await this.spotifyService.proximaMusica();
  }

}

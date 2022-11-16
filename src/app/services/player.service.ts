import { SpotifyService } from 'src/app/services/spotify.service';
import { IMusica } from 'src/app/interfaces/IMusica';
import { Injectable } from '@angular/core';
import { newMusica } from '../common/factories';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  musicaAtualIsPlaying = new BehaviorSubject<boolean>(false);
  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);
    const musica = await this.spotifyService.obterMusicaAtual();
    if (musica.id) {
      this.definirMusicaAtual(musica);
    }
    
    this.obterStatusMusicaAtual();

    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000);
  }

  private async obterStatusMusicaAtual() {
    this.musicaAtualIsPlaying.next(await this.spotifyService.obterStatusMusicaAtual());
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

  async pausarTocarMusica(pause: boolean) {
    await this.spotifyService.pausarTocarMusica(pause);
  }
}

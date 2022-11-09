import { PlayerService } from './../../services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from 'src/app/interfaces/IMusica';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusica } from 'src/app/common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  subs: Subscription[] = [];
  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.buscarMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async buscarMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map((artista) => artista.nome).join(', ');
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
    });
    this.subs.push(sub);
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.uri);
    this.playerService.definirMusicaAtual(musica);
  }
}

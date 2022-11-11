import { PlayerService } from './../../services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMusica } from 'src/app/interfaces/IMusica';
import { newMusica } from 'src/app/common/factories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  titulo = '';
  bannerImagemUrl = '';
  bannerTexto = '';

  subs: Subscription[] = []
  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  playIcon = faPlay;

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  obterMusicas() {
    const sub = this.activedRoute.paramMap
      .subscribe(async params => {
        const tipo = params.get('tipo');
        const id = params.get('id');
        await this.obterDadosPagina(tipo, id);
      });

    this.subs.push(sub);
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string) {
    if (tipo === 'playlist') {
      await this.obterDadosPlaylist(id);
    } else {
      await this.obterDadosArtista(id);
    }
  }

  async obterDadosPlaylist(playlistId: string) {
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
    this.titulo = 'Músicas Playlist: ' + playlistMusicas.nome;
  }

  async obterDadosArtista(artistaId: string) {
    //TODO
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.uri);
    this.playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map((artista) => artista.nome).join(', ');
  }

  definirDadosPagina(textoBanner: string, imagemBanner: string, musicas: IMusica[]) {
    this.bannerImagemUrl = imagemBanner;
    this.bannerTexto = textoBanner;
    this.musicas = musicas;
  }

}

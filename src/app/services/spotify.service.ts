import { IMusica } from './../interfaces/IMusica';
import { newArtista, newPlaylist } from 'src/app/common/factories';
import { IUsuario } from './../interfaces/IUsuario';
import { SpotifyConfiguration } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import {
  converteSpotifyArtistasParaArtista,
  converteSpotifyPlaylistParaPlaylist,
  converteSpotifyTrackParaMusica,
  converteSpotifyUserParaUsuario,
} from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtista } from '../interfaces/IArtista';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // utilizado "strictNullChecks": false para não obrigar verificar possível valor nulo
  spotifyApi: Spotify.SpotifyWebApiJs;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      this.definirAccessToken(token);
      await this.obterUsuarioSpotify();
      return !!this.usuario;
    } catch (ex) {
      return false;
    }
  }

  async obterUsuarioSpotify() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = converteSpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) {
      //retorna o conteúdo da url após a rota
      return '';
    }
    const params = window.location.href.substring(1).split('&'); //remove a hash # e monta um array quebrando no & pra cada parâmetro
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });
    return playlists.items.map(converteSpotifyPlaylistParaPlaylist);
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify) {
      return newPlaylist();
    }

    const playlist = converteSpotifyPlaylistParaPlaylist(playlistSpotify);
    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.musicas = musicasSpotify.items.map(x => converteSpotifyTrackParaMusica(x.track as SpotifyApi.TrackObjectFull));

    return playlist;
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    if (artistas.items.length) {
      return artistas.items.map(converteSpotifyArtistasParaArtista);
    }
    return this.buscarArtistaTopMusica();
  }

  private async buscarArtistaTopMusica(limit = 10): Promise<IArtista[]> {
    const topMusicas = await this.spotifyApi.getMyTopTracks({ limit }); //deveria ser getMyTopArtists, porém não havia dados pra consumir

    if (topMusicas.items.length) {
      const artistasId = [
        ...new Set(
          topMusicas.items.map((x) => x.artists.shift()).map((x) => x.id)
        ),
      ].slice(0, 5);
      const topArtistas = (await this.spotifyApi.getArtists(artistasId))
        .artists;
      return topArtistas.map(converteSpotifyArtistasParaArtista);
    }
    return [newArtista()];
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map((x) => converteSpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaUri: string) {
    await this.spotifyApi.queue(musicaUri);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return converteSpotifyTrackParaMusica(musicaSpotify.item);
  }

  async voltarMusica() {
    await this.spotifyApi.skipToPrevious();
  }

  async proximaMusica() {
    await this.spotifyApi.skipToNext();
  }

  async pausarTocarMusica(pause: boolean) {
    if (pause) {
      await this.spotifyApi.pause();
    } else {
      await this.spotifyApi.play();
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}

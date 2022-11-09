import { newMusica } from 'src/app/common/factories';
import { IMusica } from './../interfaces/IMusica';
import { IArtista } from './../interfaces/IArtista';
import { IPlaylist } from './../interfaces/IPlaylist';
import { IUsuario } from './../interfaces/IUsuario';
import { addMilliseconds, format } from 'date-fns';

export function converteSpotifyUserParaUsuario(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUsuario {
  return {
    id: user.id,
    nome: user.display_name,
    imagemUrl: user.images.pop().url,
  };
}

export function converteSpotifyPlaylistParaPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    id: playlist.id,
    nome: playlist.name,
    imagemUrl:
      playlist.images.length > 0
        ? playlist.images.pop().url
        : 'https://images.unsplash.com/photo-1613329671121-5d1cf551cc3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
  };
}

export function converteSpotifyArtistasParaArtista(
  spotifyArtista: SpotifyApi.SingleArtistResponse
): IArtista {
  return {
    id: spotifyArtista.id,
    nome: spotifyArtista.name,
    imagemUrl: spotifyArtista.images.sort((a, b) => a.width - b.width).pop()
      .url,
  };
}

export function converteSpotifyTrackParaMusica(
  spotifyTrack: SpotifyApi.TrackObjectFull
): IMusica {

  if (!spotifyTrack) {
    return newMusica();
  }

  const msParaMinutos = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }

  return {
    id: spotifyTrack.id,
    uri: spotifyTrack.uri,
    titulo: spotifyTrack.name,
    album: {
      id: spotifyTrack.album.id,
      imagemUrl: spotifyTrack.album.images.shift().url,
      nome: spotifyTrack.album.name,
    },
    artistas: spotifyTrack.artists.map((artista) => ({
      id: artista.id,
      nome: artista.name,
    })),
    tempo: msParaMinutos(spotifyTrack.duration_ms),
  };
}

import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { IMusica } from '../interfaces/IMusica';
import { IArtista } from './../interfaces/IArtista';

export function newArtista(): IArtista {
  return {
    id: '',
    imagemUrl: '',
    nome: '',
    musicas: []
  };
}

export function newMusica(): IMusica {
  return {
    id: '',
    uri: '',
    titulo: '',
    artistas: [],
    album: {
      id: '',
      nome: '',
      imagemUrl: '',
    },
    tempo: '',
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imagemUrl: '',
    nome: '',
    musicas: [],
  }
};

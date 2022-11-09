import { IMusica } from '../interfaces/IMusica';
import { IArtista } from './../interfaces/IArtista';

export function newArtista(): IArtista {
  return {
    id: '',
    imagemUrl:
      '',
    nome: '',
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

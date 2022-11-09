import { IArtista } from './../../interfaces/IArtista';
import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/common/factories';
import { converteSpotifyArtistasParaArtista } from 'src/app/common/spotifyHelper';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss'],
})
export class TopArtistaComponent implements OnInit {
  topArtista: IArtista = newArtista(); //mock

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista() {
    this.topArtista = (await this.spotifyService.buscarTopArtistas()).pop();
  }
}

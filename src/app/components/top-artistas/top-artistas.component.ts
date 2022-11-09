import { IArtista } from './../../interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  artistas: IArtista[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
  }

}

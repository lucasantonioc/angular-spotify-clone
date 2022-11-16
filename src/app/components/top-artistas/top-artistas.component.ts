import { IArtista } from './../../interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss'],
})
export class TopArtistasComponent implements OnInit {
  artistas: IArtista[] = [];

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
  }

  irParaArtista(artistaId: string) {
    this.router.navigateByUrl(`player/lista/artista/${artistaId}`);
  }
}

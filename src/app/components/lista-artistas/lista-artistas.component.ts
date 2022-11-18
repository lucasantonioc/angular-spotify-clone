import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IMusica } from 'src/app/interfaces/IMusica';
import { IArtista } from 'src/app/interfaces/IArtista';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-artistas',
  templateUrl: './lista-artistas.component.html',
  styleUrls: ['./lista-artistas.component.scss']
})
export class ListaArtistasComponent implements OnInit {

  titulo = 'Meus Top Artistas';
  bannerImagemUrl = '';
  bannerTexto = '';

  subs: Subscription[] = [];
  artistas: IArtista[] = []

  constructor(private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.obterArtistas();
  }

  async obterArtistas() {
    this.artistas = await this.spotifyService.obterArtistas();
  }

  irParaArtista(artistaId: string) {
    this.router.navigateByUrl(`player/lista/musicas/${artistaId}`);
  }
}

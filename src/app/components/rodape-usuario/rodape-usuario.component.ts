import { IUsuario } from './../../interfaces/IUsuario';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {

  signOutIcon = faSignOut;
  usuario: IUsuario = null;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }

  logout() {
    this.spotifyService.logout();
  }

}

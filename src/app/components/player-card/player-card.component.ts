import { SpotifyService } from 'src/app/services/spotify.service';
import { Subscription } from 'rxjs';
import { PlayerService } from './../../services/player.service';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();
  subs: Subscription[] = [];
  anteriorIcon = faStepBackward;
  proximoIcon = faStepForward;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;
    });
    this.subs.push(sub);
  }

  async voltarMusica() {
    await this.playerService.voltarMusica();
  }

  async proximaMusica() {
    await this.playerService.proximaMusica();
  }

}

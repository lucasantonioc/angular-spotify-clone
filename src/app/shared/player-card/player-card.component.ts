import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faPause,
  faStepBackward,
  faStepForward,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  musica: IMusica = newMusica();
  subs: Subscription[] = [];
  pause: boolean = true;

  anteriorIcon = faStepBackward;
  proximoIcon = faStepForward;
  pausarIcon = faPause;
  tocarIcon = faPlay;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.obterMusicaAtual();
    this.obterStatusMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musica = musica;
    });
    this.subs.push(sub);
  }

  obterStatusMusicaAtual() {
    const sub = this.playerService.musicaAtualIsPlaying.subscribe((status) => {
      this.pause = !status;
    });
    this.subs.push(sub);
  }

  async voltarMusica() {
    await this.playerService.voltarMusica();
  }

  async proximaMusica() {
    await this.playerService.proximaMusica();
  }

  async pausarTocarMusica() {
    this.pause = !this.pause;
    await this.playerService.pausarTocarMusica(this.pause);
  }
}

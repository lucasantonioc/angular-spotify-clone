import { ListaArtistasComponent } from './../../../components/lista-artistas/lista-artistas.component';
import { ListaMusicasComponent } from './../../../components/lista-musicas/lista-musicas.component';
import { HomeComponent } from './../../home/home.component';
import { RodapeUsuarioComponent } from './../../../components/rodape-usuario/rodape-usuario.component';
import { PlayerRotas } from '../player.routes';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelEsquerdoComponent } from 'src/app/pages/player/player/components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopArtistaComponent } from 'src/app/components/top-artista/top-artista.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    ListaMusicasComponent,
    ListaArtistasComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ],
})
export class PlayerModule {}

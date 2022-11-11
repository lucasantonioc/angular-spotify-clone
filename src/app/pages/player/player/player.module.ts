import { BannerComponent } from './../../../components/banner/banner.component';
import { ListaMusicasComponent } from './../../../components/lista-musicas/lista-musicas.component';
import { PlayerCardComponent } from './../../../components/player-card/player-card.component';
import { ArtistaItemListComponent } from './../../../components/artista-item-list/artista-item-list.component';
import { TopArtistasComponent } from './../../../components/top-artistas/top-artistas.component';
import { BuscasRecentesComponent } from './../../../components/buscas-recentes/buscas-recentes.component';
import { PainelDireitoComponent } from './../../../components/painel-direito/painel-direito.component';
import { HomeComponent } from './../../home/home.component';
import { RodapeUsuarioComponent } from './../../../components/rodape-usuario/rodape-usuario.component';
import { PlayerRotas } from '../player.routes';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopArtistaComponent } from 'src/app/components/top-artista/top-artista.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemListComponent,
    PlayerCardComponent,
    ListaMusicasComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ],
})
export class PlayerModule {}

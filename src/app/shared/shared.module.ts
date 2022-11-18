import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelDireitoComponent } from '../pages/player/player/components/painel-direito/painel-direito.component';
import { TopArtistasComponent } from './top-artistas/top-artistas.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { BuscasRecentesComponent } from './buscas-recentes/buscas-recentes.component';
import { ArtistaItemListComponent } from './artista-item-list/artista-item-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    BannerComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemListComponent,
    PlayerCardComponent,
    PainelDireitoComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    BannerComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemListComponent,
    PlayerCardComponent,
    PainelDireitoComponent,
  ],
})
export class SharedModule {}

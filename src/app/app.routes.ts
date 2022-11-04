import { Routes } from '@angular/router';
import { AutenticadoGuard } from './guards/autenticado.guard';

export const AppRotas: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full',
  },
  {
    path: 'login', //caso acesse esta rota, carrega o módulo abaixo (lazy-routing)
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule), //subrota é carregada somente quando acessar /logins
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./pages/player/player/player.module').then((m) => m.PlayerModule),
    canLoad: [AutenticadoGuard]
  },
];

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {

  valorCampoPesquisa = '';

  pesquisasRecentes = [
    'Top Brasil',
    'Top Global',
    'Acústico',
    'Indie Folk'
  ]

  constructor() { }

  ngOnInit(): void {
  }

  definirPesquisa(pesquisa: string) {
    this.valorCampoPesquisa = pesquisa;
  }

  buscar() {
    console.log("buscar: ", this.valorCampoPesquisa);
  }

}

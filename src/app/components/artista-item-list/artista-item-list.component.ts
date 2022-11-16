import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-artista-item-list',
  templateUrl: './artista-item-list.component.html',
  styleUrls: ['./artista-item-list.component.scss'],
})
export class ArtistaItemListComponent implements OnInit {
  @Input()
  fotoArtistaSrc = '';

  @Output()
  click = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.click.emit();
  }
}

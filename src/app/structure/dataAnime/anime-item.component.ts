import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAnime } from 'src/app/interfaces/pages-anime';
import { UserAuthenticated } from 'src/app/interfaces/query-variables';
import { AnimesService } from '../../services/animes.service';

@Component({
  selector: 'app-anime-item',
  templateUrl: './anime-item.component.html',
  styleUrls: ['./anime-item.component.css']
})
export class AnimeItemComponent implements OnInit {

  @Input() elemAnime!:IAnime

  @Output() selectAnime = new EventEmitter<object>()
  @Output() animeModalSelect = new EventEmitter<object>()

  Authentificated = localStorage.getItem("accessToken") ? true : false

  constructor(private animeService:AnimesService) { }

  ngOnInit(): void {

    this.elemAnime = this.animeService.fixDescription(this.elemAnime);

  }

  openUpdateAnime = () => {
    this.animeModalSelect.emit(this.elemAnime);
  }

  clickAnime = () => {
    this.selectAnime.emit();
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAnime } from '../../interfaces/i-anime';
import { AnimesService } from '../../services/animes.service';

@Component({
  selector: 'app-anime-item',
  templateUrl: './anime-item.component.html',
  styleUrls: ['./anime-item.component.css']
})
export class AnimeItemComponent implements OnInit {

  @Input() elemAnime:IAnime = {
    id:0,
    status: '',
    episodes:0,
    description:'',
    title: {
      romaji:'',
      userPreferred:'',
    },
    mediaListEntry: {
      id:0,
      status: ''
    },
    coverImage:{
      large:'',
      medium:'',
    }
  }

  @Output() selectAnime = new EventEmitter<object>()
  @Output() animeModalSelect = new EventEmitter<object>()



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

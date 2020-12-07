import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAnime } from '../interfaces/i-anime';
import { AnimeUpdateService } from '../services/anime-update.service';

@Component({
  selector: 'app-update-anime',
  templateUrl: './update-anime.component.html',
  styleUrls: ['./update-anime.component.css']
})
export class UpdateAnimeComponent implements OnInit {

  @Input() dataSelectAnime !: IAnime;

  @Output() finishedModal = new EventEmitter<void>()

  public estado: string[] = ['Airing', 'Finished', 'Not yet Aired', 'Cancelled'];

  constructor(private animeUpdate: AnimeUpdateService) { }

  ngOnInit(): void {
    console.log(this.dataSelectAnime.mediaListEntry)
  }

  eject = (e:Event) =>{
    e.preventDefault

    this.animeUpdate.addAnimeOnUser().subscribe(({data})=>{

      ()=> console.log("Se termino el agregado, compruebalo.");

    })
  }

  closeModal() {
    this.finishedModal.emit();
}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimeDetails } from '../interfaces/anime-details';
import { IAnime } from '../interfaces/i-anime';
import { AnimeUpdateService } from '../services/anime-update.service';

@Component({
  selector: 'app-update-anime',
  templateUrl: './update-anime.component.html',
  styleUrls: ['./update-anime.component.css']
})
export class UpdateAnimeComponent implements OnInit {

  @Input() dataSelectAnime !: IAnime | AnimeDetails;

  @Output() finishedModal = new EventEmitter<void>()

  public estado: string[] = ['Airing', 'Finished', 'Not yet Aired', 'Cancelled'];

  constructor(private animeUpdate: AnimeUpdateService) { }

  idList!: number;
  idListState: boolean = false;

  idMedia!: number;

  ngOnInit(): void {

    let idListData = this.dataSelectAnime.mediaListEntry?.id;

    this.idMedia = this.dataSelectAnime.id;

    if (idListData) {
      this.idListState = true;
      idListData ? this.idList = idListData : this.idList

      this.animeUpdate.getEntryMedia(idListData).subscribe(({ data }) => {
        console.log(data)
      })
    }
  }


  createMedia = (e: Event) => {
    e.preventDefault
    this.animeUpdate.addAnimeOnUser(this.idMedia).subscribe(({ data }) => {

      () => console.log("Se termino el agregado, compruebalo.");

    })
  }

  updateMedia = (e: Event) => {
    e.preventDefault
    this.animeUpdate.updataListId(this.idList, 'CURRENT').subscribe(({ data }) => {

      () => console.log("Se termino el agregado, compruebalo.");

    })
  }

  deleteMedia = (e:Event) => {
    e.preventDefault();
    if(this.idList){
      this.animeUpdate.deleteEntryMedia(this.idList).subscribe(({data})=>{
        console.log(data);

        () => console.log("Se termino el eliminado la lista, compruebalo.");
      });
    }
  }

  closeModal() {
    this.finishedModal.emit();
  }


}

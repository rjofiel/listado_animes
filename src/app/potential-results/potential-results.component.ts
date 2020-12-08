import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAnime } from '../interfaces/i-anime';
import { AnimesService } from '../services/animes.service';

@Component({
  selector: 'app-potential-results',
  templateUrl: './potential-results.component.html',
  styleUrls: ['./potential-results.component.css']
})
export class PotentialResultsComponent implements OnInit {


  @Input() arrayAnimes !: number[]
  imageFound: boolean = false;
  potentialAnime!: IAnime[];

  @Output() finishedModal = new EventEmitter<void>()
  @Output() selected = new EventEmitter<void>();

  constructor(private animeService: AnimesService) { }


  ngOnInit(): void {
    this.getPotentialAnimes();
  }

  getPotentialAnimes = () => {
    this.animeService.searchModal(this.arrayAnimes).subscribe(({data, loading, error})=>{
      this.potentialAnime = data.Page.media as IAnime[]
      console.log(this.potentialAnime);
      console.log(loading);
      console.log(error);

      if(this.potentialAnime){
        this.imageFound = true
      }
    })
  }

  closeModal() {
    this.finishedModal.emit();
  }

  selectedCloseModal() {
    this.selected.emit()
  }

}

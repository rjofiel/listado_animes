import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAnime } from '../interfaces/pages-anime';
import { AnimesService } from '../services/animes.service';

@Component({
  selector: 'app-potential-results',
  templateUrl: './potential-results.component.html',
  styleUrls: ['./potential-results.component.css']
})
export class PotentialResultsComponent implements OnInit {


  constructor(private animeService: AnimesService, public potentialResults: MatDialogRef<PotentialResultsComponent>, @Inject(MAT_DIALOG_DATA) data: number[]) {
    this.arrayAnimes = data;
   }


  @Input() arrayAnimes !: number[]
  imageFound: boolean = false;
  potentialAnime!: IAnime[];

  @Output() finishedModal = new EventEmitter<void>()
  @Output() selected = new EventEmitter<void>();



  ngOnInit(): void {
    this.getPotentialAnimes();
  }

  getPotentialAnimes = () => {
    this.animeService.searchModal(this.arrayAnimes).subscribe(({data, loading, error})=>{
      this.potentialAnime = data.Page.media as IAnime[]
      if(this.potentialAnime){
        this.imageFound = true
      }
    })
  }

  closeModal() {
    this.potentialResults.close();
  }

  selectedCloseModal() {
    this.selected.emit()
  }

}

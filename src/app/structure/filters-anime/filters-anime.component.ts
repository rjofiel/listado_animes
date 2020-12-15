import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Generos } from 'src/app/interfaces/generos';
import { QueryVariables } from 'src/app/interfaces/query-variables';

@Component({
  selector: 'app-filters-anime',
  templateUrl: './filters-anime.component.html',
  styleUrls: ['./filters-anime.component.css']
})
export class FiltersAnimeComponent implements OnInit {

  filterSearch = ''

  @Input() initGenres!: Generos[]
  @Input() loadingLucky !: boolean;

  @Output() filter = new EventEmitter<QueryVariables>();
  @Output() convertImage = new EventEmitter<string>();
  @Output() showPrevousDialog = new EventEmitter<void>();

  genreActive: boolean = false;

  formSearch!: FormGroup
  yearOptions: number[] = []

  loadedImage!: string

  initSeason: string[] = ['Winter', 'Spring', 'Summer', 'Fall'];
  initStatus: string[] = ['Airing', 'Finished', 'Not yet Aired', 'Cancelled'];
  initSource: string[] = ['Original', 'Manga', 'Light Novel', 'Novel', 'Anime', 'Visual Novel', 'Video Game', 'Doujinshi', 'Other'];

  createForm = () => {
    return new FormGroup({
      inputSearch: new FormControl('', Validators.minLength(3)),
      isAdult: new FormControl(false),
      genres: new FormArray([]),
      dateAnime: new FormControl(""),
      season: new FormControl(''),
      status: new FormControl(''),
      sourceAnime: new FormControl(''),
      file: new FormControl(''),
    })
  }

  get inputSearch() { return this.formSearch.get('inputSearch') }
  get isAdult() {    return this.formSearch.get('isAdult')  }
  get genres() {    return this.formSearch.get('genres')  }
  get dateAnime() {    return this.formSearch.get('dateAnime')  }
  get season() {    return this.formSearch.get('season')  }
  get status() {    return this.formSearch.get('status')  }
  get sourceAnime() {    return this.formSearch.get('sourceAnime')  }
  get file() { return this.formSearch.get('file') }

  selectAdult = (e: any) => {

    let mode: boolean;
    if (!e.value) {
      mode = false;
    } else {
      mode = true;
    }
    this.isAdult?.setValue(mode, {
      onlySelf: true
    })
  }

  selectSeason = (e: any) => {
    this.season?.setValue(e.value, {
      onlySelf: true
    })
  }

  selectStatus = (e: any) => {
    this.status?.setValue(e.value, {
      onlySelf: true
    })
  }

  selectDateAnime = (e: any) => {

    console.log(e.value);

    this.dateAnime?.setValue(e.value, {
      onlySelf: true
    })


    console.log(this.formSearch.get('dateAnime') );
  }

  selectsGenres = (e: any) => {
    const checkedGenres: FormArray = this.formSearch.get('genres') as FormArray;

    if (e.checked) {
      checkedGenres.push(new FormControl(e.source.value))
    } else {
      let i = 0;
      checkedGenres.controls.forEach((elem) => {
        if (elem.value === e.source.value) {
          checkedGenres.removeAt(i)
        }
        i++
      })
    }
  }

  selectSource = (e: any) => {
    this.sourceAnime?.setValue(e.value, {
      onlySelf: true
    })
  }

  constructor() {  this.formSearch = this.createForm()  }

  ngOnInit(): void {

    let i: number = new Date().getFullYear()
    for (i; 1940 <= i; i--) {
      this.yearOptions.push(i);
    }

    this.reviseVariables();
  }

  toggleGenres = (e: Event) => {
    e.preventDefault()
    this.genreActive = !this.genreActive
  }

  parseString(s: string) {
    if (s) {
      return s.replace(/[0-9]+:\s/, '')
    } else {
      return '';
    }
  }

  spaceToUnderScore = (s: string) => {
    return s.replace(/\s/, '_')
  }

  reviseVariables = () => {


    console.log(this.formSearch.get('dateAnime') );

    let actualPage = 1;

    let filterAnime: string = this.formSearch.value.inputSearch;
    let stateAdult: boolean = this.formSearch.value.isAdult;
    let arrayGenres: string[] = this.formSearch.value.genres;
    let selectedYear: string = this.parseString((this.formSearch.value.dateAnime).toString());
    let selectSeason: string = this.parseString(this.formSearch.value.season).toUpperCase();
    let selectStatus: string = this.parseString(this.formSearch.value.status)
    let selectSource: string = this.spaceToUnderScore(this.parseString(this.formSearch.value.sourceAnime).toString()).toUpperCase();

    //Centinels

    arrayGenres === undefined ? arrayGenres = [] : arrayGenres;
    selectedYear !== '' ? selectedYear = selectedYear + '%' : selectedYear;

    switch (selectStatus) {
      case 'Airing':
        selectStatus = 'RELEASING'
        break;
      case 'Finished':
        selectStatus = 'FINISHED'
        break;
      case 'Not yet Aired':
        selectStatus = 'NOT_YET_RELEASED'
        break;
      case 'Cancelled':
        selectStatus = 'CANCELLED'
        break;
    }

    let filterData = this.validateVariables(filterAnime, actualPage, selectedYear, stateAdult, arrayGenres, selectSeason, selectStatus, selectSource)

    this.filter.emit(filterData)
  }

  validateVariables = (search?: string, currentPage: number = 1, year?: string, isAdult: boolean = false, genero: string[] = [], season?: string, status?: string, src?: string, id_in: number[] = []) => {
    let variablesGraphQL: QueryVariables = {
      search: search,
      page: currentPage,
      year: year,
      isAdult: isAdult,
      genres: genero,
      season: season,
      status: status,
      source: src,
      type: "ANIME",
      id_in: id_in
    }

    for (let key in variablesGraphQL) {
      if (variablesGraphQL[key]?.toString() === '') {
        delete variablesGraphQL[key];
      }
    }
    return variablesGraphQL;
  }

  loadImage(fileInput: any) {

    if (!fileInput.files || fileInput.files.length === 0) { return; }

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);

    reader.addEventListener('loadend', () => {

      this.loadedImage = reader.result as string;

      setTimeout(() => {
        this.convertImage.emit(this.loadedImage);
      }, 200)
    });
  }

  openPreviousDialog(){
    this.showPrevousDialog.emit()
  }
}

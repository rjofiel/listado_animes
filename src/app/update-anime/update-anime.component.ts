import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimeDetails, fuzzyDate } from '../interfaces/anime-details';
import { MediaListEntry } from '../interfaces/media-list-entry';
import { IAnime } from '../interfaces/pages-anime';
import { AnimeUpdateService } from '../services/anime-update.service';

@Component({
  selector: 'app-update-anime',
  templateUrl: './update-anime.component.html',
  styleUrls: ['./update-anime.component.css']
})
export class UpdateAnimeComponent implements OnInit {

  @Input() dataSelectAnime !: IAnime | AnimeDetails;

  @Output() finishedModal = new EventEmitter<void>()


  formUpdate!: FormGroup

  public statuAnime: string[] = ['Current', 'Planning', 'Completed', 'Dropped', 'Paused', 'Repeating'];

  constructor(private animeUpdate: AnimeUpdateService) {

  }

  idList!: number;
  idListState: boolean = false;

  idMedia!: number;

  SaveMediaListEntry!: MediaListEntry;

  createFormGroup() {
    return new FormGroup({
      statuEntry: new FormControl('', Validators.required),
      progressEpisodes: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.dataSelectAnime.episodes)]),
      notesAnime: new FormControl(''),
      startedAt: new FormControl('', Validators.required),
      completedAt: new FormControl('', Validators.required),
    })
  }

  get statuEntry() {
    return this.formUpdate.get('statuEntry');
  }

  get progressEpisodes() {
    return this.formUpdate.get('progressEpisodes');
  }

  get notesAnime() {
    return this.formUpdate.get('notesAnime');
  }

  get startedAt() {
    return this.formUpdate.get('startedAt');
  }

  get completedAt() {
    return this.formUpdate.get('completedAt');
  }

  changeStartedDate(e: any) {

    this.startedAt?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeStatusAnime(e: any) {

    this.statuEntry?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  ngOnInit(): void {

    let idListEntry = this.dataSelectAnime.mediaListEntry?.id;

    this.idMedia = this.dataSelectAnime.id;


    this.formUpdate = this.createFormGroup();

    this.startedAt?.setValue(new Date().toISOString().slice(0, 10), {
      onlySelf: true
    })
    this.completedAt?.setValue(new Date().toISOString().slice(0, 10), {
      onlySelf: true
    })

    if (idListEntry) {
      this.idList = idListEntry
      this.idListState = true;

      this.animeUpdate.getEntryMedia(idListEntry).subscribe(({ data }) => {
        this.SaveMediaListEntry = data.MediaList as MediaListEntry

        this.fillFieldsModal()

      }).unsubscribe
    }

  }

  fillFieldsModal() {

    let progressEntry = +this.SaveMediaListEntry.progress;
    let noteEntry = this.SaveMediaListEntry.notes

    let completedDate;
    let startedDate;

    this.SaveMediaListEntry.completedAt.year ? completedDate = new Date(this.SaveMediaListEntry.completedAt.year + "-" + this.SaveMediaListEntry.completedAt.month + "-" + this.SaveMediaListEntry.completedAt.day).toISOString().slice(0, 10) : completedDate = new Date().toISOString().slice(0, 10);
    this.SaveMediaListEntry.startedAt.year ? startedDate = new Date(this.SaveMediaListEntry.startedAt.year + "-" + this.SaveMediaListEntry.startedAt.month + "-" + this.SaveMediaListEntry.startedAt.day).toISOString().slice(0, 10) : startedDate = new Date().toISOString().slice(0, 10);

    this.startedAt?.setValue(startedDate, {
      onlySelf: true
    })
    this.completedAt?.setValue(completedDate, {
      onlySelf: true
    })

    this.statuEntry?.setValue(this.SaveMediaListEntry.status, {
      onlySelf: true,
    })

    this.progressEpisodes?.setValue(progressEntry, {
      onlySelf: true,
    })

    this.notesAnime?.setValue(noteEntry, {
      onlySelf: true,
    })
  }

  createEntry = (e: Event) => {
    e.preventDefault
    let status = this.parseString(this.formUpdate.value.statuEntry);

    let startedAnime: fuzzyDate = this.getFuzzyDate(this.formUpdate.value.startedAt.split("-"));

    let finishedAnime: fuzzyDate = this.getFuzzyDate(this.formUpdate.value.completedAt.split("-"));

    this.animeUpdate.addAnimeOnUser(this.idMedia, status, this.formUpdate.value.progressEpisodes, this.formUpdate.value.notesAnime, startedAnime, finishedAnime).subscribe(({ data }) => {

      () => console.log("Se termino el agregado, compruebalo.");

    })
  }

  parseString(s: string) {
    if (s) {
      return s.replace(/[0-9]+:\s/, '')
    } else {
      return '';
    }
  }

  getFuzzyDate(a: string[]): fuzzyDate {
    let fuzzyData: fuzzyDate = {
      day: +a[2],
      month: +a[1],
      year: +a[0],
    }

    return fuzzyData;
  }

  updateEntry = (e: Event) => {
    e.preventDefault()

    let startedAnime: fuzzyDate = this.getFuzzyDate(this.formUpdate.value.startedAt.split("-"));
    let finishedAnime: fuzzyDate = this.getFuzzyDate(this.formUpdate.value.completedAt.split("-"));
    let status = this.parseString(this.formUpdate.value.statuEntry);

    this.animeUpdate.updateListId(this.idList, status, this.formUpdate.value.progressEpisodes, this.formUpdate.value.notesAnime, startedAnime, finishedAnime).subscribe(({ data }) => {

      () => console.log("Se termino actualizando los valores, compruebalo.");

    })
  }

  deleteEntry = (e: Event) => {
    e.preventDefault();
    if (this.idList) {
      this.animeUpdate.deleteEntryMedia(this.idList).subscribe(({ data }) => {

        () => console.log("Se termino el eliminado la lista, compruebalo.");

      });
    }
  }

  closeModal() {
    this.finishedModal.emit();
  }

}


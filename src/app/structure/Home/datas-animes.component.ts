
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UpdateAnimeComponent } from 'src/app/update-anime/update-anime.component';
import { IAnime, ImgAnime, PageInfo, PagesAnime } from '../../interfaces/pages-anime';
import { QueryVariables } from '../../interfaces/query-variables';
import { AnimesService } from '../../services/animes.service';

@Component({
  selector: 'app-datas-animes',
  templateUrl: './datas-animes.component.html',
  styleUrls: ['./datas-animes.component.css']
})
export class DatasAnimesComponent implements OnInit {

  constructor(public updateEntry: MatDialog, private animeServices: AnimesService, private route: ActivatedRoute, private ruta: Router) { }

  @ViewChild('modalAddAnime') modal !: TemplateRef<any>;
  @ViewChild('modalOpened', { read: ViewContainerRef }) opened !: ViewContainerRef;

  pageInfo!: PageInfo;
  imgAnimes!: ImgAnime;
  Animes!: IAnime[]
  ListaPagina!: PagesAnime;

  pageEvent!: PageEvent;
  pageIndex: number = 1;
  Page: number = 0;
  recordCount!: number;

  loading: boolean = true;
  error: any;
  problemData: boolean = false;

  textSearch: string = '';

  modalOpen: boolean = false
  selectAnime !: IAnime;

  backdrop: any

  ngOnInit() { }

  ngAfterViewInit() { this.reloadData(); }

  reloadData() {

    let pagepos = parseInt(this.route.snapshot.params['id']);
    let variableQueries = {
      page: pagepos
    }

    this.animeServices.getFilterAnimeFull(variableQueries).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
        this.Animes = data.Page.media as IAnime[],
        this.pageInfo = data.Page.pageInfo as PageInfo,
        this.loading = loading,
        this.error = error;

      this.recordCount = (this.pageInfo.lastPage) * 20;
      this.pageIndex = this.pageInfo.currentPage - 1;

    },
      error => {
        if (error) {
          this.loading = true
          setTimeout(() => {
            this.problemData = true
          }, 300)
          setTimeout(() => {
            this.problemData = false
            this.loading = false
            this.reloadData()
          }, 45000)
        }
      }).unsubscribe


  }

  onPageChange(e: PageEvent) {

    this.pageEvent = e;
    this.loading = true;

    let pageNow = e.pageIndex + 1

    let variableQueries: QueryVariables = {
      page: pageNow,
      type: "ANIME",
      isAdult: false,
    }

    if (this.textSearch.length > 4) { variableQueries.search = this.textSearch; }

    this.ruta.navigate(['/ListadoAnimes/page/', variableQueries.page])

    this.animeServices.getFilterAnimeFull(variableQueries).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
        this.Animes = data.Page.media as IAnime[],
        this.pageInfo = data.Page.pageInfo as PageInfo,
        this.loading = loading,
        this.error = error;

      this.pageIndex = pageNow - 1;
      this.recordCount = (this.pageInfo.lastPage) * 20;
    },
      error => {
        if (error) {
          this.loading = true
          setTimeout(() => {
            this.problemData = true
          }, 300)
          this.loading = true
          setTimeout(() => {
            this.problemData = false
            this.loading = false
            this.onPageChange(this.pageEvent)
          }, 45000)
        }
      }).unsubscribe
  }

  searchText = (ev?: Event): any => {

    ev?.preventDefault();

    if (this.textSearch.length > 4) {

      let variableQueries = {
        search: this.textSearch,
      }

      this.animeServices.getFilterAnimeFull(variableQueries).subscribe(({ data, loading, error }) => {
        this.ListaPagina = data.Page as PagesAnime,
          this.Animes = data.Page.media as IAnime[],
          this.pageInfo = data.Page.pageInfo as PageInfo,
          this.loading = loading,
          this.error = error;

        this.pageIndex = 0;
        this.recordCount = (this.pageInfo.lastPage) * 20;

        this.ruta.navigate(['/ListadoAnimes/page/', 1])
      },
        error => {
          if (error) {

            this.loading = true
            setTimeout(() => {
              this.problemData = true
            }, 300)
            this.loading = true
            setTimeout(() => {
              this.problemData = false
              this.loading = false
              this.searchText()
            }, 45000)
          }
        }).unsubscribe
    }

    if (this.textSearch.length === 0) {
      this.reloadData()
    }


  }

  showDialog(e:IAnime){
    const dialogRef = this.updateEntry.open(UpdateAnimeComponent, {
      width: '600px',
      data: e,
    })

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

    })
  }


  close = () => {
    this.opened.clear()
    let contenedor = document.getElementById('contenedorAnimes');
    contenedor?.classList.remove('fixed-position')
    document.body.removeChild(this.backdrop);
  }


}



import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
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

  constructor(public updateEntry: MatDialog, private animeServices: AnimesService, private route: ActivatedRoute, private ruta: Router) {



   }

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

  ngOnInit() {

    if (localStorage.getItem('testing') === 'logged') {
      console.log("test");
      localStorage.removeItem('testing')
      setTimeout(() => {
        window.location.reload()
      }, 200)
    }

    this.route.fragment.pipe(map(fragment => new URLSearchParams(fragment)),
      map(params => ({
        access_token: params.get('access_token'),

      }))
    ).subscribe((res) => {
      if (res.access_token) {
        localStorage.setItem('accessToken', res.access_token)

        localStorage.setItem('testing', 'logged')

        this.ruta.navigateByUrl('/EntryAnime/page/1')

      } else {
      localStorage.removeItem('testing')
      }
    })

  }

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

    if (this.textSearch.length > 3) { variableQueries.search = this.textSearch; }

    this.ruta.navigate(['/EntryAnime/page/', variableQueries.page])

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

    if (this.textSearch.length > 3) {

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

        this.ruta.navigate(['/EntryAnime/page/', 1])
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

  showDialog(e: IAnime) {
    const dialogRef = this.updateEntry.open(UpdateAnimeComponent, {
      width: '760px',
      data: e,
    })

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

    })
  }
}


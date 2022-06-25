import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { APIResponse, IGame } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit ,OnDestroy{
  public sort: string = '';
  public games: IGame[] | null = null;
  private gameSub$?: Subscription;
  private routeSub$?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
   this.routeSub$ = this.route.params.subscribe((params: Params) => {
      if (params['game-search']) {
        console.log(params['game-search']);
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string):void {
    this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<IGame>) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(gameId:string){
    this.router.navigate(['details',gameId])
  }

   ngOnDestroy(): void {
    this.routeSub$?.unsubscribe();
    this.gameSub$?.unsubscribe()
  }
}

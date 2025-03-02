import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardPageComponent } from './leaderboard-page/leaderboard-page.component';
import { LeaderboardPageEntryComponent } from './leaderboard-page-entry/leaderboard-page-entry.component';
import { SwiperModule } from 'swiper/angular';
import { BreadcrumbModule } from '@shared/breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [LeaderboardPageComponent, LeaderboardPageEntryComponent],
  imports: [
    CommonModule,
    SwiperModule,
    BreadcrumbModule
  ]
})
export class LeaderboardModule { }

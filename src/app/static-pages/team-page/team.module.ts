import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from '@shared/breadcrumb/breadcrumb.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TeamPageComponent  } from './team-page/team-page.component';
import { TeamMemberComponent  } from './team-member/team-member.component';
import { MemberFilterComponent } from './member-filter/member-filter.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TagIconModule } from '@shared/tag-icon/tag-icon.module';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
    declarations: [
        TeamPageComponent,
        TeamMemberComponent,
        MemberFilterComponent
    ],
    exports: [
        TeamPageComponent,
    ],
    imports: [
      CommonModule,
      MaterialModule,
      BreadcrumbModule,
      RouterModule,
      HttpClientModule,
      TagIconModule,
      NgxMasonryModule
    ]
  })
  export class TeamModule{
  }

import {Component, OnInit} from '@angular/core';
import {Item} from '../../model/item';
import {ItemsService} from '../../services/items/items.service';
import {finalize} from 'rxjs/operators';
import {LoaderService} from '../../../shared/loader/service/loader.service';
import {AuthService} from '../../../shared/auth/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})

export class ListItemsComponent implements OnInit {

  itemsList: Array<Item> = [];

  constructor(
    private router: Router,
    private itemsService: ItemsService,
    private authService: AuthService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit(): void {
    this.loadAllItems();
  }

  home(): void {
    this.router.navigate(['/'])
  }

  private loadAllItems(): void {

    this.loaderService.show();
    this.itemsService.getAllItems().pipe(
      finalize(() => this.loaderService.hide())
    ).subscribe((items: Array<Item>) => {

      for (var item of items) {
        this.itemsList.push(item);
      }

    });
  }

}

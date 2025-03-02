import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ItemsService } from '../../../review-item/services/items/items.service';
import { AuthService } from '@shared/auth/auth-service/auth.service';
import { BreadcrumbLink } from '@shared/breadcrumb/model/breadcrumb-link.interface';
import { ArchiveService } from '../../../archive/services/archive.service';
import { Item } from '../../../model/item';

@Component({
  selector: 'app-submit-success-page',
  templateUrl: './submit-success-page.component.html',
  styleUrls: ['./submit-success-page.component.scss'],
  providers: []
})
export class SubmitSuccessPageComponent {
  breadcrumbLinks: BreadcrumbLink[] = [{label: 'Fall einreichen'}];

  item: Item;

  closedItems$ = this.archiveService.getClosedItems();
  closedItemCount = 10;

  loginFormData = {
    email: null,
    password: null
  };

  authState$ = this.authService.auth$.pipe(
    tap(({ isLoggedIn }) => (this.authenticated = isLoggedIn)),
    tap(({ isLoggedIn }) => isLoggedIn && this.loadOpenItems())
  );

  authenticated = false;
  cases: any[];
  is_open_review: boolean;
  withEmail: boolean;

  constructor(
    private authService: AuthService,
    private itemsService: ItemsService,
    private archiveService: ArchiveService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const state = this.router.getCurrentNavigation().extras?.state;
    if (state) {
      const { item, withEmail } = state;
      this.item = item;
      this.withEmail = withEmail;
    } else {
      this.snackBar.open('Ups, da ist etwas schiefgelaufen!', '', { duration: 5000 });
      this.router.navigate(['submit']);
    }
  }

  private loadOpenItems(): void {
    this.itemsService.getOpenItems().then((openCases) => {
      this.cases = openCases.items;
      this.is_open_review = openCases.is_open_review;
    });
  }
}

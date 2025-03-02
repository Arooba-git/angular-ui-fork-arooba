import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthState } from '@shared/auth/model/auth-state';
import { AuthService } from '@shared/auth/auth-service/auth.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../model/user';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {
  public authState: AuthState;
  public user: User;
  public userLoaded = true;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    private authService: AuthService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.authService.auth$.subscribe((authState: AuthState) => {
      this.authState = authState;
    });

    this.userService.user$.subscribe((user: User) => {
      if (user) {
        this.userLoaded = true;
      } else {
        this.userLoaded = false;
      }

      this.user = user;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  navigate(link: string, fragment?: string): void {
    this.dialogRef.close({ route: true });
    this.dialogRef.afterClosed().subscribe(({ route }) => {
      if (route) {
        this.router.navigate(['/' + link], { fragment });
      }
    });
  }

  logOut(): void {
    if (!this.authState.isLoggedIn) {
      return;
    }

    this.authService
      .signOut()
      .then(() => this.router.navigate(['/dashboard']))
      .catch();
  }
}

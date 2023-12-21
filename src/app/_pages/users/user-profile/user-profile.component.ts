import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  breadcrumbPages: Breadcrumb[];
  user
  mode: Observable<string> = this.userService.userFormSubject

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initBreadcrumb()
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Meu Perfil', route: '/profile', active: true }
    ];
  }

}

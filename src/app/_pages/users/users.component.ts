import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  breadcrumbPages: Breadcrumb[];

  showInputSearch: boolean = false;

  activeForm: string = null;


  constructor() { }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.showUsersTab();
  }

  initBreadcrumb() {
    this.breadcrumbPages = [
      { label: 'Início', route: '/home' },
      { label: 'Gerenciar Perfis', route: '/users', active: true }
    ];
  }

  showUsersTab() {
    this.activeForm = 'users';
  }

  showProfilesTab() {
    this.activeForm = 'profile';
  }

  showPermissionsTab() {
    this.activeForm = 'permissions';
  }

  toggleViewSort() {}
  toggleOrderByTime() {}
  toggleOrderByTitle() {}
}

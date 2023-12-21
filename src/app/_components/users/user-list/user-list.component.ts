import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private ts: ToastService, private router: Router) { }

  users$: Observable<User[]>
  public users = [];

  orderby: string = 'name';
  viewSort: string = 'grid';
  desc: number = 0;
  search: string = '';
  isActive: boolean = true;

  public config: PaginationInstance = {
    id: 'users-pagination',
    itemsPerPage: 10,
    currentPage: 1,
  };

  ngOnInit() {
    this.loadUsersPaginationMetadata()
  }

  getUsers() {
    this.userService.getUsers('', 1, this.config.itemsPerPage, this.config.currentPage, '').subscribe((res) => {
      this.users = res;
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).pipe(
        tap(data => {
          if(data == true) this.ts.success('Ação concluída!', 'Usuário removido com sucesso.')
          this.getUsers()
        }),
        catchError(err => {
          this.ts.error('Ops', 'Houve algum erro ao deletar o usuário')
          console.error(err)
          return throwError(err)
        })
      ).subscribe()
  }

  loadUsersPaginationMetadata() {
    this.userService
    .getUserPaginationMetadata(
      this.config.itemsPerPage,
      ''
      )
    .subscribe((res: any) => {
      this.config.totalItems = res.totalItems;
      this.getUsers()
    });
  }

  changePage(pageNumber: number) {
    this.config.currentPage = pageNumber;
    this.getUsers()
  }

  navigate(path: string, user: User) {
    this.router.navigate(['profile'])
    this.userService.userFormSubject.next(path)
    this.userService.currentSelectedUserSubject.next(user)
  }
}

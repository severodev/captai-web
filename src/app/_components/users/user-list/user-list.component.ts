import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageRequest, UserFilter } from 'src/app/_interfaces';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public filterForm : FormGroup;
  public users = [];
  public cpfInput = true;
  public roles : Array<{id, name, description, level, type}>

  public nameOrder = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.filterForm = this.fb.group({
      name: [null],
      email: [null],
      profile: [null],
      cpfCnpj: [null]
    });
   }

  ngOnInit() {
    this.userService.getRoles().subscribe((roles) => {
      this.roles = roles
    }).add(this.getUsers(null));
  }

  getUsers(userFilter: UserFilter) {
    var params: PageRequest = {
      itemsPerPage : 999
    }
    this.userService.getUsers(userFilter, params).subscribe(res => {
      this.users = res;
    })
  }

  userDetails(userId) {
    this.router.navigate(['/profile-details'], { queryParams: { userId: userId } });
  }

  getFilters() : UserFilter {
    return {
      name: this.filterForm.controls['name'].value,
      email: this.filterForm.controls['email'].value,
      roleId: this.filterForm.controls['profile'].value?.id,
      cpfCnpj: this.filterForm.controls['cpfCnpj'].value
    }
  }

  applyFilter() {
    this.nameOrder = '';
    this.getUsers(this.getFilters());
  }

  orderByName() {
    switch (this.nameOrder) {
      case '' : this.nameOrder = 'ASC'
      break;
      case 'ASC' : this.nameOrder = 'DESC'
      break;
      case 'DESC' : this.nameOrder = ''
      break;
    }
    
    let filter: UserFilter = this.getFilters(); 
    filter.by = 'name';
    filter.order = this.nameOrder != '' ? this.nameOrder : null;

    this.getUsers(filter);
  }

  resetPasswordUser(email: string) {
    this.userService.requestChangePassword(email).subscribe(() => {
        this.toastService.success('Email de reset de senha foi enviado para o email: ', email, 6000);
      }, (err) => {
      console.log(err)
      this.toastService.error('Ocorreu um erro ao enviar email de reset de senha.', err , 6000);
      });
  }

  clearFilters() {
    this.filterForm.reset();
    this.getUsers(null);
  }

  togleCpfCnpj(value: boolean) {
    this.cpfInput = value;
  }

  reduceEmail(email) {
    if (email.length > 30) {
      email =  email.substring(0, 30) + "...";
    }
    return email;
  }
}

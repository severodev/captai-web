import { Component, OnInit } from '@angular/core';
import { PageRequest, UserFilter } from 'src/app/_interfaces';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }

  public users = [];



  ngOnInit() {
/*     let filter: EditalFilter = {
      agency: this.filterForm.controls['agency'].value,
      title:  this.filterForm.controls['title'].value,
      financingValue:  this.filterForm.controls['financingValue'].value
    } */
    this.getUsers(null)
  }

  getUsers(userFilter: UserFilter) {
    var params: PageRequest = {
      itemsPerPage : 999
    }
    this.userService.getUsers(userFilter, params).subscribe(res => {
      this.users = res;
    })
  }

}

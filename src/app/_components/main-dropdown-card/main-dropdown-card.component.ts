import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-main-dropdown-card',
  templateUrl: './main-dropdown-card.component.html',
  styleUrls: ['./main-dropdown-card.component.scss']
})
export class MainDropdownCardComponent implements OnInit {

  @Output()
  logoutEvent = new EventEmitter()
  user: User;
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    private userService: UserService) {
      this.user = this.authService.user;
    }

  ngOnInit(): void {
  }

  navigate(path: string) {
    this.router.navigate(['profile'])
    this.userService.currentSelectedUserSubject.next(JSON.parse(sessionStorage.getItem('user')))
    this.userService.userFormSubject.next(path)
  }

  logout () {
    this.logoutEvent.emit()
  }
}

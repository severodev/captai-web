import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModal } from './_components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public optionIndex = 1;
  accessToken: string;

  constructor(
    private authService: AuthService,
    public user: AuthService,
    public router: Router,
    private modalService: BsModalService,
  ) {
    this.authService.accessToken.subscribe(token => {
      this.accessToken = token;
    });
  }

  setSelectedButton(index: number) {
    this.optionIndex = index;
  } 

  confirmLogout()  {
    const initialState : any = {
      title:  'Fazer logout',
      message: 'Deseja sair da sua conta?'
    };
    let modalRef = this.modalService.show(ConfirmModal, {
      initialState,
      class: 'modal-dialog modal-dialog-centered modal-sm'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
    });
    modalRef.content.accepted.subscribe(() => {
      modalRef.hide();
      this.logout();
    });
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/login']);
  }
}

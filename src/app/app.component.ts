import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModal } from './_components/confirm-modal/confirm-modal.component';
import { Subject, filter } from 'rxjs';
import { environment } from './../environments/environment';
import { InviteService } from './_services/invite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public openSubMenu = false;
  accessToken: string;
  isLandingPage: boolean = false;

  constructor(
    private authService: AuthService,
    public user: AuthService,
    public inviteService: InviteService,
    public router: Router,
    private modalService: BsModalService,
  ) {
    this.authService.accessToken.subscribe(token => {
      this.accessToken = token;
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // Garante que estamos pegando o fim da navegação
      )
      .subscribe((event: any) => {
        if (event.url === '/landing-page')
          this.isLandingPage = true;
        else{ 
          this.isLandingPage = false;
        }
      });
  }

  inviteSend() {
    this.inviteService.initInvite()
  }

  admSubMenu(value) {
    this.openSubMenu = value;
  }

  confirmLogout() {
    const initialState: any = {
      title: 'Fazer logout',
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

  getVersion() {
    return environment.currentVersion ?? '---'
  }

}

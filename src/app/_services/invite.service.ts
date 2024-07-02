import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InviteModalComponent } from '../_components/invite-modal/invite-modal.component';

@Injectable({
  providedIn: 'root'
})

export class InviteService {

  constructor( 
    private modalService: BsModalService,
  ) { }  

  initInvite() {
    let modalRef = this.modalService.show(InviteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg'
    });
    modalRef.content.close.subscribe(() => {
      modalRef.hide();
    });
  }

  
}

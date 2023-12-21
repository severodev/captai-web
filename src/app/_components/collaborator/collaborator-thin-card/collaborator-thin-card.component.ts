import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Collaborator } from 'src/app/_models/collaborator';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-collaborator-thin-card',
  templateUrl: './collaborator-thin-card.component.html',
  styleUrls: ['./collaborator-thin-card.component.scss']
})
export class CollaboratorThinCardComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  constructor(private ts: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  delete() {
    this.ts.info('Ops!', 'Essa funcionalidade ainda está sendo implementada! :D');
  }

  addInProject() {
    this.ts.info('Ops!', 'Essa funcionalidade ainda está sendo implementada! :D');
  }

  loadImage() {
    if (this.collaborator.image === null || this.collaborator.image === undefined) {
      if (this.collaborator.gender === 'M') {
        return '../../../../assets/images/man.png';
      } else {
        return '../../../../assets/images/woman.png';
      }
    } else {
      return this.collaborator.image;
    }
  }

  goToDetails() {
    this.router.navigate(['/collaborator-details', { collaboratorId: this.collaborator.id }]);
  }

}

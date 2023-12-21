import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CollaboratorDto } from 'src/app/_dtos/collaborator-dto';
import { ProjectMember } from 'src/app/_models/project-member';
import { formatDate } from 'src/app/_helpers/utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-collaborator-long-card',
  templateUrl: './collaborator-long-card.component.html',
  styleUrls: ['./collaborator-long-card.component.scss'],
})
export class CollaboratorLongCardComponent implements OnInit {
  @Input() member: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.member.collaborator.payments = this.member.collaborator.payRoll;
  }

  loadImage(member: ProjectMember) {
    if (
      member.collaboratorImage === null ||
      member.collaboratorImage === undefined
    ) {
      return '../../../../assets/images/man.png';
    } else {
      return member.collaboratorImage;
    }
  }

  get dismissal() {
    const date = Date.parse(
      formatDate(this.member.collaborator.payments[0].dismissal)
    );

    if (!isNaN(date)) {
      return this.datePipe.transform(
        this.member.collaborator.payments[0].dismissal,
        'dd/MM/yyyy'
      );
    }

    return 'N/A';
  }
}

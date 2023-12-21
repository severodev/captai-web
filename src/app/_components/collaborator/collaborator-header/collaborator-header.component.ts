import { Component, Input, OnInit } from '@angular/core';

import { Collaborator } from 'src/app/_models/collaborator';

@Component({
  selector: 'app-collaborator-header',
  templateUrl: './collaborator-header.component.html',
  styleUrls: ['./collaborator-header.component.scss']
})
export class CollaboratorHeaderComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  constructor() { }

  ngOnInit(): void {
  }

}

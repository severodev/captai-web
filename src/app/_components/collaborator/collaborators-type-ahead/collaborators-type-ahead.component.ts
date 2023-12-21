import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Collaborator } from 'src/app/_models/collaborator';

@Component({
  selector: 'app-collaborators-type-ahead',
  templateUrl: './collaborators-type-ahead.component.html',
  styleUrls: ['./collaborators-type-ahead.component.scss']
})
export class CollaboratorsTypeAheadComponent implements OnInit {

  @Input()
  public collaboratorsList: Collaborator[] = [];

  @Input()
  public label: string = '';

  @Input()
  public componentId: string = 'collaborator-autocomplete';

  @Input()
  public placeholder: string = '';

  @Input()
  public autoCompleteCollaboratorsLimit: number = 0;

  @Input()
  public enableHideAutoComplete: boolean = false;

  @Output()
  public onSelectCollaborator = new EventEmitter<Collaborator>();

  public autoCompleteCollaboratorsList: Collaborator[];
  public indexCollaboratorSelected: number;
  public showCollaboratorsAutoComplete: boolean;
  public collaboratorNameInput: string;

  constructor() { }

  ngOnInit(): void {
    this.collaboratorNameInput = '';
    this.initialize();
  }

  private initialize() {
    this.showCollaboratorsAutoComplete = false;
    this.indexCollaboratorSelected = -1;
    this.autoCompleteCollaboratorsList = [];
  }

  hasCollaborator(name: string) {
    return (this.collaboratorsList.some((el: Collaborator) => el.name === name));
  }

  filterCollaboratorsByName(inputName: string) {
    let filteredCollaborators = this.collaboratorsList;

    if (!!inputName) {
      filteredCollaborators = filteredCollaborators.filter((c: Collaborator) => c.name.toUpperCase().includes(inputName.toUpperCase()));
    } else if (!!this.collaboratorNameInput) {
      filteredCollaborators = filteredCollaborators.filter((c: Collaborator) => c.name.toUpperCase().includes(this.collaboratorNameInput.toUpperCase()));
    }

    this.autoCompleteCollaboratorsList = (this.autoCompleteCollaboratorsLimit > 0) ? filteredCollaborators.slice(0, this.autoCompleteCollaboratorsLimit) : filteredCollaborators;
    this.showCollaboratorsAutoComplete = (this.autoCompleteCollaboratorsList.length > 0);
    this.indexCollaboratorSelected = -1;
    // this.onFilteringItem.emit();
  }

  onKeyDown(event: KeyboardEvent) {
    const auxLength = this.autoCompleteCollaboratorsList.length - 1;

    switch(event.key) {
      case 'ArrowDown':
        this.indexCollaboratorSelected = this.indexCollaboratorSelected === auxLength ? 0 : this.indexCollaboratorSelected + 1;
      break;
      case 'ArrowUp':
        this.indexCollaboratorSelected = this.indexCollaboratorSelected <= 0 ? auxLength :  this.indexCollaboratorSelected - 1;
      break;
      case 'Enter':
      case 'Tab':
        if (this.indexCollaboratorSelected >= 0) {
          this.collaboratorNameInput = this.autoCompleteCollaboratorsList[this.indexCollaboratorSelected].name;
          this.selectCollaborator(this.autoCompleteCollaboratorsList[this.indexCollaboratorSelected], event.key);
        }
      break;
    }
  }

  selectCollaborator(collaborator: Collaborator, key: string) {
    this.collaboratorNameInput = collaborator.name;
    this.initialize();
    this.onSelectCollaborator.emit(collaborator);
    // this.onSelectItem.emit({id, key})
  }

  hideAutoComplete() {
    if(this.enableHideAutoComplete) {
      setTimeout(() => {
        this.showCollaboratorsAutoComplete = false;
        if(!!this.collaboratorNameInput && this.hasCollaborator(this.collaboratorNameInput)) {
          // this.selectCollaborator(this.collaboratorNameInput, 'Unknow');
        }
      }, 300);
    }
  }

  resetInput() {
    this.collaboratorNameInput = '';
  }

}

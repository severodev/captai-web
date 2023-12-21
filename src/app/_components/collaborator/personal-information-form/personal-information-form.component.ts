import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/_services/location.service';
import { Collaborator } from 'src/app/_models/collaborator';
import { City } from 'src/app/_models/city';
import { State } from 'src/app/_models/state';
import { CollaboratorService } from 'src/app/_services/collaborator.service';
import { ToastService } from 'src/app/_services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss']
})
export class PersonalInformationFormComponent implements OnInit {

  private _collaborator: Collaborator;

  @Input()
  set collaborator(collaborator: Collaborator) {
    this._collaborator = collaborator;
    if(collaborator && collaborator.state)
      this.loadCitiesDropdown(collaborator.state.toString());
  }

  get collaborator(): Collaborator {
    return this._collaborator;
  };

  @Input()
  showDependentForm: boolean = true;

  @Input()
  canEdit: boolean = true;

  statesDropdown: State[];
  citiesDropdown: City[];

  @ViewChild('personalForm') personalForm: any;

  constructor(
    private locationService: LocationService,
    private collaboratorService: CollaboratorService,
    private ts: ToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadStatesDropdown();
  }

  getCollaboratorByCpf(cpf: string) {
    const route = this.route.snapshot.url
    
    if (route[0].path === 'create-collaborator') {
      this.collaboratorService.getCollaboratorByCpf(cpf).subscribe(
        res => {
          if(res) return this.ts.info("Atenção", "Colaborador já cadastrado! Por favor, verifique na lista de colaboradores cadastrados.")
        })
    }
  }

  loadStatesDropdown() {
    this.locationService.getStatesDropdown().subscribe( res => {
      this.statesDropdown = res;
    });
  }

  loadCitiesDropdown(stateId: string) {
    this.locationService.getCitiesDropdown(stateId).subscribe( res => {
      this.citiesDropdown = res;
    });
  }

  toggleChev(attrId) {
    if (document.getElementById(attrId).classList.contains('ic-chev-down')) {
      document.getElementById(attrId).classList.remove('ic-chev-down');
      document.getElementById(attrId).classList.add('ic-chev-up');
    } else {
      document.getElementById(attrId).classList.remove('ic-chev-up');
      document.getElementById(attrId).classList.add('ic-chev-down');
    }
  }

}

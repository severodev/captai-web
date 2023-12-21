import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { WorkplanDto } from '../_dtos/workplan-dto';
import { WorkplanItem } from '../_models/workplan-item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkplanService {

  private workplanDto: WorkplanDto = new WorkplanDto();
  public workplanUpdated: Event

  constructor(
    private http: HttpClient
  ) { }

  workplanPlannedByProject(projectId: number) {
    const url = `${environment.apiUrl}/workplan/planned/project/${projectId}`;
    return this.http.get(url);
  }

  getProjectWorkplan(projectId: number) {
    const url = `${environment.apiUrl}/workplan/project/${projectId}`;
    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.workplanDto.convertResponseToWorkplanItem(d));
    }));
  }

  getValidityList() {
    const url = `${environment.apiUrl}/workplan/validity`;
    return this.http.get(url).pipe(map((data: any) => {
      return data.map(d => this.workplanDto.convertResponseToValidityDropdown(d));
    }));
  }

  addWorkplanItem(workplanItem: WorkplanItem) {
    const url = `${environment.apiUrl}/workplan`;
    workplanItem.value = +(workplanItem.value);
    
    if (workplanItem.wpiTrip.start) {
      workplanItem.wpiTrip.start = this.convertDateInputToDateJSON(workplanItem.wpiTrip.start);
    } else if (workplanItem.wpiTraining.start && workplanItem.wpiTraining.end) {
      workplanItem.wpiTraining.start = this.convertDateInputToDateJSON(workplanItem.wpiTraining.start);
      workplanItem.wpiTraining.end = this.convertDateInputToDateJSON(workplanItem.wpiTraining.end);
    } else if (workplanItem.wpiService.start && workplanItem.wpiService.end) {
      workplanItem.wpiService.start = this.convertDateInputToDateJSON(workplanItem.wpiService.start);
      workplanItem.wpiService.end = this.convertDateInputToDateJSON(workplanItem.wpiService.end);
    }
    return this.http.post(url, workplanItem);
  }

  editWorkplanItem(workplanItem: WorkplanItem) {
    const url = `${environment.apiUrl}/workplan/${workplanItem.id}`;
    workplanItem.value = +(workplanItem.value);

    if (workplanItem.wpiTrip.start) {
      workplanItem.wpiTrip.start = this.convertDateInputToDateJSON(workplanItem.wpiTrip.start);
    } else if (workplanItem.wpiTraining.start && workplanItem.wpiTraining.end) {
      workplanItem.wpiTraining.start = this.convertDateInputToDateJSON(workplanItem.wpiTraining.start);
      workplanItem.wpiTraining.end = this.convertDateInputToDateJSON(workplanItem.wpiTraining.end);
    } else if (workplanItem.wpiService.start && workplanItem.wpiService.end) {
      workplanItem.wpiService.start = this.convertDateInputToDateJSON(workplanItem.wpiService.start);
      workplanItem.wpiService.end = this.convertDateInputToDateJSON(workplanItem.wpiService.end);
    }
    return this.http.put(url, workplanItem);
  }

  deleteWorkplanItem(workplanItem: WorkplanItem) {
    const url = `${environment.apiUrl}/workplan/${workplanItem.id}`;
    return this.http.delete(url);
  }

  convertDateInputToDateJSON(dt: string) {
    let aux = dt.split('/');
    let dtAux = new Date(Number(aux[2]), (Number(aux[1]) - 1), Number(aux[0]));
    let dtJson = dtAux.getFullYear() + '-' + (dtAux.getMonth() + 1) + '-' + dtAux.getDate();
    return dtJson;
  }
}

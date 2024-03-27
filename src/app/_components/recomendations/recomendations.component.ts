import { Component } from '@angular/core';
import { PageRequest } from 'src/app/_interfaces';
import { AuthService } from 'src/app/_services/auth.service';
import { EditalService } from 'src/app/_services/edital.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss'
})
export class RecomendationsComponent {

  public editais = [];

  constructor(
    public user: AuthService,
    private editalService: EditalService) { }

    ngOnInit(): void {
      var params: PageRequest = {
        itemsPerPage : 3
      }
      this.editalService.getEditais(null, params).subscribe(data => {
        this.editais = data.map(edital => {
          let list = edital.areaList.split(";");
          edital.areaList = list.length > 1 ? list.slice(0, 1) : list;

          if (edital.title.length > 20) {
            edital.title =  edital.title.substring(0, 20) + "...";
          }
          return edital;
        });
      }).add(() => console.log(this.editais))
    }
      
}

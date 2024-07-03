import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { RecomendationService } from 'src/app/_services/recomendation.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss'
})
export class RecomendationsComponent {

  public editais = [];

  constructor(
    public user: AuthService,
    private router: Router,
    private toastService: ToastService,
    private recomendation: RecomendationService) { }
    
    ngOnInit(): void {
      if (this.user.recomendations == undefined || this.user.recomendations.length === 0) {
        this.recomendation.getEditalByUserAfinity({
          input_text: this.user.user.segment.name,
          n_recommendations: 3
        }).subscribe(data => {
          this.editais = data.map(edital => {
            let list = edital.ds_areas.split(";");
            edital.ds_areas = list.length > 1 ? list.slice(0, 1) : list;
            return edital;
          });
          this.user.recomendations = this.editais;
        })
      } else {
        this.editais = this.user.recomendations;
      }
  
    }

    reduceTitle(title) {
      if (title.length > 20) {
        title =  title.substring(0, 20) + "...";
      }
      return title;
    }

    seeMore(id : number) {
      this.router.navigate(['/details'], { queryParams: { editalId: id } });
    }
      
}

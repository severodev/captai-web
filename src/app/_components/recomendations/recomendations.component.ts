import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageRequest } from 'src/app/_interfaces';
import { AuthService } from 'src/app/_services/auth.service';
import { EditalService } from 'src/app/_services/edital.service';
import { RecomendationService } from 'src/app/_services/recomendation.service';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss'
})
export class RecomendationsComponent {

  public editais = [];
  public allEditais = [];
  public savedEditaisIds = [];

  constructor(
    public user: AuthService,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private userService: UserService,
    private editalService: EditalService,
    private recomendation: RecomendationService) { }
    
    ngOnInit(): void {
      if (this.user.recomendations == undefined || this.user.recomendations.length === 0) {
        this.collectUserSavedEditalList();
        this.editalService.getEditais( null, { itemsPerPage : 999 }).subscribe(allEditais => {
          this.allEditais = allEditais;
          this.recomendation.getEditalByUserAfinity({
            input_text: this.user.user.segment.name,
            n_recommendations: 3
          }).subscribe(data => {
            this.editais = data.map(edital => {
              const cEdital = this.allEditais.find(e => e.title == edital.ds_titulo);
              if(cEdital){
                edital.id = cEdital.id;
              }
              let list = edital.ds_areas.split(";");
              edital.ds_areas = list.length > 1 ? list.slice(0, 1) : list;
              edital.saved = this.savedEditaisIds.includes(edital.id);
              return edital;
            });
            this.user.recomendations = this.editais;
          })
        });
      } else {
        this.collectUserSavedEditalList();
        setTimeout(() => {
          this.editais = this.user.recomendations;
          this.editais.forEach(e => {
            e.saved = this.savedEditaisIds.includes(e.id);
          });
        }, 300);
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

    collectUserSavedEditalList() {
      this.userService.collectUserSavedEditaisList(this.authService.user.id).subscribe(
        (editaisList: any[]) => {
          this.savedEditaisIds = editaisList.map(e => e.id);
        }
      );
    }

    bookmarkEdital(edital: any) {

      const addToSaved = !this.savedEditaisIds.includes(edital.id);
  
      // Incluir/remover edital na lista de favoritos :: backend
      this.userService.updateUserSavedEditalList(this.authService.user.id , edital.id, !addToSaved).subscribe(
        () => {
          // Marcar item atual como favorito nos resultados atuais
          edital.saved = addToSaved;
      
          // Atualizar lista de favoritos local
          if(addToSaved){
            this.savedEditaisIds.push(edital.id);
          } else {
            this.savedEditaisIds = this.savedEditaisIds.filter(e => e != edital.id);
          }
        }
      );
    }
      
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { AuthService } from 'src/app/_services/auth.service';
import { EditalService } from 'src/app/_services/edital.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  public edital: any;
  public savedEditaisIds = [];

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private editalService: EditalService,
    private userService: UserService,
    private authService: AuthService,
    private spinnerService: LoaderService,
    ) { 
      this.spinnerService.show();
    }

  public breadcrumbPages: Breadcrumb[] = [
    { label: 'Pesquisa de oportunidades', route: '/search' },
    { label: 'Detalhes: Edital centelha', route: '/details', active: true }
  ];

  ngOnInit(): void {
    this.collectUserSavedEditalList();
    let editalId = this.activatedRoute.snapshot.queryParamMap.get('editalId');
    this.editalService.getById(editalId).subscribe(data => {
      this.edital = data;
      this.edital.areaList = data.areaList.split(";")
      this.edital.saved = this.savedEditaisIds.includes(this.edital.id);
    }, 
    error => { 
      this.spinnerService.hide();
      console.log('Ocorreu um erro: ', error)
    }).add(() => this.spinnerService.hide());
  }

  collectUserSavedEditalList() {
    this.userService.collectUserSavedEditaisList(this.authService.user.id).subscribe(
      (editaisList: any[]) => {
        this.savedEditaisIds = editaisList.map(e => e.id);
        if(this.edital) {
          this.edital.saved = this.savedEditaisIds.includes(this.edital.id);
        }
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

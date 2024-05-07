import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { EditalService } from 'src/app/_services/edital.service';
import { LoaderService } from 'src/app/_services/loader.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  public edital: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private editalService: EditalService,
    private spinnerService: LoaderService,
    ) { 
      this.spinnerService.show();
    }

  public breadcrumbPages: Breadcrumb[] = [
    { label: 'Pesquisa de oportunidades', route: '/search' },
    { label: 'Detalhes: Edital centelha', route: '/details', active: true }
  ];

  ngOnInit(): void {
    let editalId = this.activatedRoute.snapshot.queryParamMap.get('editalId');
    this.editalService.getById(editalId).subscribe(data => {
      this.edital = data;
      this.edital.areaList = data.areaList.split(";")
    }, 
    error => { 
      this.spinnerService.hide();
      console.log('Ocorreu um erro: ', error)
    }).add(() => this.spinnerService.hide());
  }
}

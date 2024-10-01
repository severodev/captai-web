import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  itemsPerSlideBeneficios = 2;
  itemsPerSlideParceiros = 4;
  isCollapsed = true;
  activeLink = 'secao1';

  @ViewChild('secao1') secao1: ElementRef;
  @ViewChild('secao2') secao2: ElementRef;
  @ViewChild('secao3') secao3: ElementRef;
  @ViewChild('secao4') secao4: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.calculateSlidesPerPage(window.innerWidth);
  }

  scrollToSecao(secao: string) {
    switch(secao) {
      case 'secao1':
        this.secao1.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.activeLink = 'secao1';
        break;
      case 'secao2':
        this.secao2.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.activeLink = 'secao2';
        break;
      case 'secao3':
        this.secao3.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.activeLink = 'secao3';
        break;
      case 'secao4':
        this.secao4.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.activeLink = 'secao4';
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenResolution = (event.target as Window).innerWidth;
    this.calculateSlidesPerPage(screenResolution);
  }

  calculateSlidesPerPage(screenResolution: number) {
    if (screenResolution > 768) {
      this.itemsPerSlideBeneficios = 2;
      this.itemsPerSlideParceiros = 4;
    } else if(screenResolution > 475) {
      this.itemsPerSlideBeneficios = 1;
      this.itemsPerSlideParceiros = 2;
    } else{
      this.itemsPerSlideBeneficios = 1;
      this.itemsPerSlideParceiros = 1;
    }

    this.cdr.detectChanges();
  }

}

import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ContactService } from 'src/app/_services/contact.service';
import { ToastService } from 'src/app/_services/toast.service';

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

  contactForm: FormGroup;

  @ViewChild('secao1') secao1: ElementRef;
  @ViewChild('secao2') secao2: ElementRef;
  @ViewChild('secao3') secao3: ElementRef;
  @ViewChild('secao4') secao4: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private contactService: ContactService,
    private ts: ToastService,
    private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    // Redirecionamento de já estiver logado e acesso na raiz
    if (this.authService.user?.id) {
      this.router.navigate(['/recomendations']);
      return;
    }

    this.calculateSlidesPerPage(window.innerWidth);
  }

  scrollToSecao(secao: string) {
    switch (secao) {
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
    } else if (screenResolution > 475) {
      this.itemsPerSlideBeneficios = 1;
      this.itemsPerSlideParceiros = 2;
    } else {
      this.itemsPerSlideBeneficios = 1;
      this.itemsPerSlideParceiros = 1;
    }

    this.cdr.detectChanges();
  }

  sendContactForm() {
    if (this.contactForm.valid) {
      this.contactService.sendContactForm(this.contactForm.getRawValue()).subscribe(
        () => {
          this.contactForm.reset();
          this.ts.success('', 'Mensagem enviada com sucesso!');
        },
        () => {
          this.ts.error('Erro', 'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
        });
    } else {
      this.ts.error('Erro', 'Preencha todos os campos corretamente.');
    }
  }

}

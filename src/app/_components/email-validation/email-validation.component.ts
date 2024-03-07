import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrl: './email-validation.component.scss'
})
export class EmailValidationComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    if (token) {
      this.userService.validateEmail(token).subscribe(() => {
        /* this.toastService.success('Sucesso', 'Sua conta foi validada!'); */
      },(err) => {
        this.toastService.error('Erro', err);
      }).add( () => this.router.navigate(['/login']))
    }
  }
}
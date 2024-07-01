import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './_components/details/details.component';
import { EmailValidationComponent } from './_components/email-validation/email-validation.component';
import { PasswordRecoveryComponent } from './_components/password-recovery/password-recovery.component';
import { RecomendationsComponent } from './_components/recomendations/recomendations.component';
import { SearchComponent } from './_components/search/search.component';
import { CreateUserFormComponent } from './_components/users/create-user-form/create-user-form.component';
import { UserListComponent } from './_components/users/user-list/user-list.component';
import { AuthGuard } from './_guards';
import { DeactivateGuard } from './_guards/deactivate.guard';
import { CreateAccountComponent } from './_pages/create-account/create-account.component';
import { FirstAccessComponent } from './_pages/first-access/first-access.component';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { UserProfileComponent } from './_pages/users/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/recomendations', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent},
  { path: 'password-recovery', component: PasswordRecoveryComponent},
  { path: 'password-recovery/:token', component: PasswordRecoveryComponent},
  { path: 'validate-email/:token', component: EmailValidationComponent},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard], data: {role:["ADMIN", "CLIENTE", "CONVIDADO",  "CONVIDADO",  "SISTEMA"]}},
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard], data: {role:["ADMIN", "CLIENTE", "CONVIDADO",  "SISTEMA"]}},
  { path: 'recomendations', component: RecomendationsComponent, canActivate: [AuthGuard], data: {role:["ADMIN", "CLIENTE", "CONVIDADO",  "SISTEMA"]}},
  { path: 'first-access/:token', component: FirstAccessComponent },
  { path: 'list-users', component: UserListComponent, canActivate: [AuthGuard], data: {role:["ADMIN"]}},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {role:["ADMIN", "CLIENTE", "CONVIDADO",  "SISTEMA"]}},
  { path: 'profile-details', component: UserProfileComponent, canActivate: [AuthGuard], data: {role:["ADMIN", "CLIENTE", "CONVIDADO",  "SISTEMA"]}},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {role:["ADMIN", "CLIENTE", "CONVIDADO",  "SISTEMA"]}},
  { path: 'users/new', component: CreateUserFormComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

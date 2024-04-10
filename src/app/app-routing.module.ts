import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { AuthGuard } from './_guards';
import { ProjectsComponent } from './_pages/projects/projects.component';
import { CollaboratorsComponent } from './_pages/collaborators/collaborators.component';
import { CreateProjectComponent } from './_pages/create-project/create-project.component';
import { CreateCollaboratorComponent } from './_pages/create-collaborator/create-collaborator.component';
import { SuppliersComponent } from './_pages/suppliers/suppliers.component';
import { CreateSupplierComponent } from './_pages/create-supplier/create-supplier.component';
import { SupplierDetailsComponent } from './_pages/supplier-details/supplier-details.component';
import { CollaboratorDetailsComponent } from './_pages/collaborator-details/collaborator-details.component';
import { GarbageComponent } from './_pages/garbage/garbage.component';
import { ProjectDetailsComponent } from './_pages/project-details/project-details.component';
import { WorkplanComponent } from './_pages/workplan/workplan.component';
import { SupplierExpenseComponent } from './_pages/supplier-expense/supplier-expense.component';
import { AccountabilityComponent } from './_pages/accountability/accountability.component';
import { ProjectAccountComponent } from './_pages/project-account/project-account.component';
import { FirstAccessComponent } from './_pages/first-access/first-access.component';
import { UsersComponent } from './_pages/users/users.component';
import { UserProfileComponent } from './_pages/users/user-profile/user-profile.component';
import { CreateUserFormComponent } from './_components/users/create-user-form/create-user-form.component';
import { DeactivateGuard } from './_guards/deactivate.guard';
import { CreateAccountComponent } from './_pages/create-account/create-account.component';
import { PasswordRecoveryComponent } from './_components/password-recovery/password-recovery.component';
import { SearchComponent } from './_components/search/search.component';
import { EmailValidationComponent } from './_components/email-validation/email-validation.component';
import { DetailsComponent } from './_components/details/details.component';
import { RecomendationsComponent } from './_components/recomendations/recomendations.component';
import { UserListComponent } from './_components/users/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent},
  { path: 'password-recovery', component: PasswordRecoveryComponent},
  { path: 'password-recovery/:token', component: PasswordRecoveryComponent},
  { path: 'validate-email/:token', component: EmailValidationComponent},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'recomendations', component: RecomendationsComponent, canActivate: [AuthGuard] },
  { path: 'first-access/:token', component: FirstAccessComponent },
  { path: 'list-users', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'project-details', component: ProjectDetailsComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'collaborators', component: CollaboratorsComponent, canActivate: [AuthGuard] },
  { path: 'collaborator-details', component: CollaboratorDetailsComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'create-collaborator', component: CreateCollaboratorComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'accountability', component: AccountabilityComponent, canActivate: [AuthGuard] },
  { path: 'project-account', component: ProjectAccountComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', component: SuppliersComponent, canActivate: [AuthGuard] },
  { path: 'create-supplier', component: CreateSupplierComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'supplier-details', component: SupplierDetailsComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'supplier-expense', component: SupplierExpenseComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'garbage', component: GarbageComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: CreateUserFormComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard]},
  { path: 'workplan', component: WorkplanComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

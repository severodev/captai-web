import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxSliderModule } from 'ngx-slider-v2';
import { NgSelectModule } from '@ng-select/ng-select';

import { CpfFormatPipe } from './pipes/cpf-cnpj-format.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { ProjectsComponent } from './_pages/projects/projects.component';
import { CollaboratorsComponent } from './_pages/collaborators/collaborators.component';
import { ProjectsSmallListComponent } from './_pages/home/projects-small-list/projects-small-list.component';
import { CollaboratorsSmallListComponent } from './_pages/home/collaborators-small-list/collaborators-small-list.component';
import { CreateProjectComponent } from './_pages/create-project/create-project.component';
import { CreateCollaboratorComponent } from './_pages/create-collaborator/create-collaborator.component';
import { InformationsFormComponent } from './_components/project/informations-form/informations-form.component';
import { DocsFormComponent } from './_components/project/docs-form/docs-form.component';
import { PersonalInformationFormComponent } from './_components/collaborator/personal-information-form/personal-information-form.component';
import { AdministrativeInformationFormComponent } from './_components/collaborator/administrative-information-form/administrative-information-form.component';
import { RemunerationFormComponent } from './_components/collaborator/remuneration-form/remuneration-form.component';
import { CollaboratorDocsFormComponent } from './_components/collaborator/collaborator-docs-form/collaborator-docs-form.component';
import { DependentFormComponent } from './_components/collaborator/dependent-form/dependent-form.component';
import { BenefitSelectorComponent } from './_components/collaborator/benefit-selector/benefit-selector.component';

import { CollaboratorCardComponent } from './_components/collaborator/collaborator-card/collaborator-card.component';
import { ProjectCardComponent } from './_components/project/project-card/project-card.component';
import { BreadcrumbComponent } from './_components/breadcrumb/breadcrumb.component';
import { InputFileComponent } from './_components/input-file/input-file.component';
import { PaginationTemplateComponent } from './_components/pagination-template/pagination-template.component';
import { CollaboratorsTypeAheadComponent } from './_components/collaborator/collaborators-type-ahead/collaborators-type-ahead.component';
import { ToastComponent } from './_components/toast/toast.component';
import { CollaboratorThinCardComponent } from './_components/collaborator/collaborator-thin-card/collaborator-thin-card.component';
import { SupplierCardComponent } from './_components/supplier/supplier-card/supplier-card.component';
import { SuppliersComponent } from './_pages/suppliers/suppliers.component';
import { CreateSupplierComponent } from './_pages/create-supplier/create-supplier.component';
import { SupplierFormComponent } from './_components/supplier/supplier-form/supplier-form.component';
import { ConfirmAlertComponent } from './_components/confirm-alert/confirm-alert.component';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoaderInterceptor } from './_interceptors/loader.interceptor';

import { AuthService } from './_services/auth.service';
import { ProjectService } from './_services/project.service';
import { CollaboratorService } from './_services/collaborator.service';
import { InstituteService } from './_services/institute.service';
import { DocumentService } from './_services/document.service';
import { BankService } from './_services/bank.service';
import { ImagekitService } from './_services/Imagekit.service';
import { ContributionService } from './_services/contribution.service';
import { LoanService } from './_services/loan.service';
import { ToastService } from './_services/toast.service';
import { SupplierService } from './_services/supplier.service';
import { LoaderService } from './_services/loader.service';
import { WorkplanService } from './_services/workplan.service';
import { ExpenseService } from './_services/expense.service';
import { FirstAccessService } from './_services/first-access.service';
import { ProfileService } from './_services/profile.service';
import { SegmentService } from './_services/segment.service';
import { PermissionService } from './_services/permission.service';

import { SupplierDetailsComponent } from './_pages/supplier-details/supplier-details.component';
import { SupplierHeaderComponent } from './_components/supplier/supplier-header/supplier-header.component';
import { SupplierInfoComponent } from './_components/supplier/supplier-info/supplier-info.component';
import { CollaboratorDetailsComponent } from './_pages/collaborator-details/collaborator-details.component';
import { CollaboratorHeaderComponent } from './_components/collaborator/collaborator-header/collaborator-header.component';
import { CollaboratorInfoComponent } from './_components/collaborator/collaborator-info/collaborator-info.component';
import { GarbageComponent } from './_pages/garbage/garbage.component';
import { RemovedCollaboratorsComponent } from './_pages/garbage/removed-collaborators/removed-collaborators.component';
import { RemovedProjectsComponent } from './_pages/garbage/removed-projects/removed-projects.component';
import { RemovedSuppliersComponent } from './_pages/garbage/removed-suppliers/removed-suppliers.component';
import { ProjectCardSmallComponent } from './_components/project/project-card-small/project-card-small.component';
import { CustomLoaderComponent } from './_components/custom-loader/custom-loader.component';
import { LoaderComponent } from './_components/loader/loader.component';
import { CollaboratorFilterOptionsComponent } from './_components/collaborator/collaborator-filter-options/collaborator-filter-options.component';
import { ProjectDetailsComponent } from './_pages/project-details/project-details.component';
import { ProjectHeaderComponent } from './_components/project/project-header/project-header.component';
import { ProjectInfoComponent } from './_components/project/project-info/project-info.component';
import { ProjectTeamComponent } from './_components/project/project-team/project-team.component';
import { DirectHrComponent } from './_components/workplan/direct-hr/direct-hr.component';
import { IndirectHrComponent } from './_components/workplan/indirect-hr/indirect-hr.component';
import { TravelComponent } from './_components/workplan/travel/travel.component';
import { TrainingComponent } from './_components/workplan/training/training.component';
import { TechnicalServiceComponent } from './_components/workplan/technical-service/technical-service.component';
import { OtherServiceComponent } from './_components/workplan/other-service/other-service.component';
import { ComputerAccessoryComponent } from './_components/workplan/computer-accessory/computer-accessory.component';
import { OtherAccessoryComponent } from './_components/workplan/other-accessory/other-accessory.component';
import { SoftwareLicenseComponent } from './_components/workplan/software-license/software-license.component';
import { ConsumptionMaterialComponent } from './_components/workplan/consumption-material/consumption-material.component';
import { PrototypeMaterialComponent } from './_components/workplan/prototype-material/prototype-material.component';
import { TechnologicalJournalsComponent } from './_components/workplan/technological-journals/technological-journals.component';
import { CivilWorkComponent } from './_components/workplan/civil-work/civil-work.component';
import { InfraRelatedComponent } from './_components/workplan/infra-related/infra-related.component';
import { OtherRelatedComponent } from './_components/workplan/other-related/other-related.component';
import { IncurredCostsComponent } from './_components/workplan/incurred-costs/incurred-costs.component';
import { WorkplanComponent } from './_pages/workplan/workplan.component';
import { AddCostComponent } from './_components/workplan/add-cost/add-cost.component';
import { AllCostsComponent } from './_components/workplan/all-costs/all-costs.component';
import { AddExpenseComponent } from './_components/expense/add-expense/add-expense.component';
import { AddTripExpenseComponent } from './_components/expense/add-trip-expense/add-trip-expense.component';
import { AllExpensesComponent } from './_components/project/all-expenses/all-expenses.component';
import { ExpensesGridComponent } from './_components/project/expenses-grid/expenses-grid.component';
import { MarginsGridComponent } from './_components/project/margins-grid/margins-grid.component';
import { SupplierExpenseComponent } from './_pages/supplier-expense/supplier-expense.component';
import { UserListComponent } from './_components/users/user-list/user-list.component'

import localePt  from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BenefitsFormComponent } from './_components/collaborator/benefits-form/benefits-form.component';
import { AccountabilityComponent } from './_pages/accountability/accountability.component';
import { AccountabilityCardComponent } from './_components/accountability/accountability-card/accountability-card.component';
import { ProjectAccountComponent } from './_pages/project-account/project-account.component';
import { AccountabilityInfoComponent } from './_components/accountability/accountability-info/accountability-info.component';
import { AccountabilityAccomplishedGridComponent } from './_components/accountability/accountability-accomplished-grid/accountability-accomplished-grid.component';
import { FileCardComponent } from './_components/file-card/file-card.component';
import { AccountabilityDocsComponent } from './_components/accountability/accountability-docs/accountability-docs.component';
import { AccountabilityContributionComponent } from './_components/accountability/accountability-contribution/accountability-contribution.component';
import { AccountabilityContributionGridComponent } from './_components/accountability/contribution/accountability-contribution-grid/accountability-contribution-grid.component';
import { AccountabilityContributionFormComponent } from './_components/accountability/contribution/accountability-contribution-form/accountability-contribution-form.component';
import { AccountabilityContributionCardComponent } from './_components/accountability/contribution/accountability-contribution-card/accountability-contribution-card.component';
import { AccountabilityLoanCardComponent } from './_components/accountability/loan/accountability-loan-card/accountability-loan-card.component';
import { AccountabilityLoanFormComponent } from './_components/accountability/loan/accountability-loan-form/accountability-loan-form.component';
import { AccountabilityLoanGridComponent } from './_components/accountability/loan/accountability-loan-grid/accountability-loan-grid.component';
import { AccountabilityContributionHeaderComponent } from './_components/accountability/contribution/accountability-contribution-header/accountability-contribution-header.component';
import { AccountabilityPlannedGridComponent } from './_components/accountability/accountability-planned-grid/accountability-planned-grid.component';
import { AccountabilityLoanHeaderComponent } from './_components/accountability/loan/accountability-loan-header/accountability-loan-header.component';
import { FundsTableComponent } from './_components/workplan/funds-table/funds-table.component';
import { ExpenseInstallmentsTableComponent } from './_components/expense/expense-installments-table/expense-installments-table.component';

import { CollaboratorShortCardComponent } from './_components/project/project-team/project-collaborators/collaborator-short-card/collaborator-short-card.component';
import { CollaboratorLongCardComponent } from './_components/project/project-team/project-collaborators/collaborator-long-card/collaborator-long-card.component';
import { ProjectCollaboratorsComponent } from './_components/project/project-team/project-collaborators/project-collaborators.component';
import { ProjectSigningsComponent } from './_components/project/project-team/project-signings/project-signings.component';
import { ProjectPaymentsComponent } from './_components/project/project-team/project-payments/project-payments.component';

import { provideEnvironmentNgxCurrency, NgxCurrencyInputMode } from 'ngx-currency';

import { FirstAccessComponent } from './_pages/first-access/first-access.component';
import { UsersComponent } from './_pages/users/users.component';
import { UserService } from './_services/user.service';
import { UserProfileComponent } from './_pages/users/user-profile/user-profile.component';
import { UserProfileFormComponent } from './_components/users/user-profile-form/user-profile-form.component';
import { MainDropdownCardComponent } from './_components/main-dropdown-card/main-dropdown-card.component'
import { CreateUserFormComponent } from "./_components/users/create-user-form/create-user-form.component";
import { NotEmptyDirective } from "src/app/_helpers/not-empty-validator.directive";
import { AccountabilityTransferComponent } from './_components/accountability/accountability-transfer/accountability-transfer.component';
import { ValidBirthdayDirective } from "src/app/_helpers/birthday-validator.directive";
import { DeactivateGuard } from './_guards/deactivate.guard';
import { EquipmentAndSoftwareComponent } from './_components/workplan/equipment-and-software/equipment-and-software.component';
import { UserPermissionsComponent } from './_components/users/user-permissions/user-permissions.component';
import { CreateAccountComponent } from './_pages/create-account/create-account.component';
import { NotificationModalComponent } from './_components/notification-modal/notification-modal.component';
import { ConfirmModal } from './_components/confirm-modal/confirm-modal.component';
import { TermsOfUseModalComponent } from './_components/terms-of-use-modal/terms-of-use-modal.component';
import { SearchComponent } from './_components/search/search.component';
import { PasswordRecoveryComponent } from './_components/password-recovery/password-recovery.component';
import { EmailValidationComponent } from './_components/email-validation/email-validation.component';
import { DetailsComponent }  from './_components/details/details.component';
import { SearchFilterDropdownComponent }  from './_components/search-filter-dropdown/search-filter-dropdown.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core'
import { EditalService } from './_services/edital.service';
import { ActiviteService } from './_services/activite.service';
import { RecomendationsComponent } from './_components/recomendations/recomendations.component';

registerLocaleData(localePt, 'pt');
export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: NgxCurrencyInputMode.Financial
};
@NgModule({
  declarations: [
    CpfFormatPipe,
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProjectsComponent,
    CollaboratorsComponent,
    ProjectsSmallListComponent,
    CollaboratorsSmallListComponent,
    CollaboratorCardComponent,
    ProjectCardComponent,
    BreadcrumbComponent,
    CreateProjectComponent,
    CreateCollaboratorComponent,
    InformationsFormComponent,
    DocsFormComponent,
    InputFileComponent,
    PersonalInformationFormComponent,
    AdministrativeInformationFormComponent,
    RemunerationFormComponent,
    CollaboratorDocsFormComponent,
    DependentFormComponent,
    BenefitSelectorComponent,
    PaginationTemplateComponent,
    CollaboratorsTypeAheadComponent,
    ToastComponent,
    CollaboratorThinCardComponent,
    SupplierCardComponent,
    SuppliersComponent,
    CreateSupplierComponent,
    SupplierFormComponent,
    SupplierDetailsComponent,
    SupplierHeaderComponent,
    SupplierInfoComponent,
    CollaboratorDetailsComponent,
    CollaboratorHeaderComponent,
    CollaboratorInfoComponent,
    GarbageComponent,
    RemovedCollaboratorsComponent,
    RemovedProjectsComponent,
    RemovedSuppliersComponent,
    ProjectCardSmallComponent,
    CustomLoaderComponent,
    LoaderComponent,
    CollaboratorFilterOptionsComponent,
    ProjectDetailsComponent,
    ProjectHeaderComponent,
    ProjectInfoComponent,
    ProjectTeamComponent,
    DirectHrComponent,
    IndirectHrComponent,
    TravelComponent,
    TrainingComponent,
    TechnicalServiceComponent,
    OtherServiceComponent,
    ComputerAccessoryComponent,
    OtherAccessoryComponent,
    SoftwareLicenseComponent,
    ConsumptionMaterialComponent,
    PrototypeMaterialComponent,
    TechnologicalJournalsComponent,
    CivilWorkComponent,
    InfraRelatedComponent,
    OtherRelatedComponent,
    IncurredCostsComponent,
    WorkplanComponent,
    AddCostComponent,
    AllCostsComponent,
    AddExpenseComponent,
    AddTripExpenseComponent,
    AllExpensesComponent,
    ExpensesGridComponent,
    MarginsGridComponent,
    BenefitsFormComponent,
    ConfirmAlertComponent,
    SupplierExpenseComponent,
    AccountabilityComponent,
    AccountabilityCardComponent,
    ProjectAccountComponent,
    ProjectAccountComponent,
    CollaboratorShortCardComponent,
    CollaboratorLongCardComponent,
    ProjectCollaboratorsComponent,
    ProjectSigningsComponent,
    ProjectPaymentsComponent,
    AccountabilityInfoComponent,
    AccountabilityAccomplishedGridComponent,
    FileCardComponent,
    AccountabilityDocsComponent,
    AccountabilityContributionComponent,
    AccountabilityContributionGridComponent,
    AccountabilityContributionFormComponent,
    AccountabilityContributionCardComponent,
    AccountabilityLoanCardComponent,
    AccountabilityLoanFormComponent,
    AccountabilityLoanGridComponent,
    AccountabilityContributionHeaderComponent,
    AccountabilityLoanHeaderComponent,
    AccountabilityPlannedGridComponent,
    AccountabilityLoanHeaderComponent,
    FundsTableComponent,
    ExpenseInstallmentsTableComponent,
    FirstAccessComponent,
    UsersComponent,
    UserListComponent,
    UserProfileComponent,
    UserProfileFormComponent,
    MainDropdownCardComponent,
    CreateUserFormComponent,
    NotEmptyDirective,
    AccountabilityTransferComponent,
    ValidBirthdayDirective,
    EquipmentAndSoftwareComponent,
    UserPermissionsComponent,
    CreateAccountComponent,
    NotificationModalComponent,
    ConfirmModal,
    TermsOfUseModalComponent,
    SearchComponent,
    PasswordRecoveryComponent,
    EmailValidationComponent,
    DetailsComponent,
    SearchFilterDropdownComponent,
    RecomendationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSliderModule,
    NgSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideEnvironmentNgxCurrency(customCurrencyMaskConfig),
    AuthService,
    ProjectService,
    CollaboratorService,
    InstituteService,
    DocumentService,
    EditalService,
    ActiviteService,
    BankService,
    ToastService,
    SupplierService,
    LoaderService,
    WorkplanService,
    ExpenseService,
    DatePipe,
    ContributionService,
    LoanService,
    FirstAccessService,
    UserService,
    FormBuilder,
    DeactivateGuard,
    ProfileService,
    SegmentService,
    ImagekitService,
    PermissionService,
    provideNgxMask(),
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

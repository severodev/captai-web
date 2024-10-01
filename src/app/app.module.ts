import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectModule } from '@ng-select/ng-select';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from 'ngx-slider-v2';

import { CpfFormatPipe } from './pipes/cpf-cnpj-format.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';

import { BreadcrumbComponent } from './_components/breadcrumb/breadcrumb.component';
import { ConfirmAlertComponent } from './_components/confirm-alert/confirm-alert.component';
import { InputFileComponent } from './_components/input-file/input-file.component';
import { PaginationTemplateComponent } from './_components/pagination-template/pagination-template.component';
import { ToastComponent } from './_components/toast/toast.component';

import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoaderInterceptor } from './_interceptors/loader.interceptor';

import { ImagekitService } from './_services/Imagekit.service';
import { RecomendationService } from './_services/recomendation.service';
import { AuthService } from './_services/auth.service';
import { DocumentService } from './_services/document.service';
import { FirstAccessService } from './_services/first-access.service';
import { LoaderService } from './_services/loader.service';
import { PermissionService } from './_services/permission.service';
import { ProfileService } from './_services/profile.service';
import { SegmentService } from './_services/segment.service';
import { ToastService } from './_services/toast.service';

import { CustomLoaderComponent } from './_components/custom-loader/custom-loader.component';
import { LoaderComponent } from './_components/loader/loader.component';
import { UserListComponent } from './_components/users/user-list/user-list.component';
import { FileCardComponent } from './_components/file-card/file-card.component';

import { NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from 'ngx-currency';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidBirthdayDirective } from "src/app/_helpers/birthday-validator.directive";
import { NotEmptyDirective } from "src/app/_helpers/not-empty-validator.directive";
import { InviteModalComponent } from './_components/invite-modal/invite-modal.component';
import { ConfirmModal } from './_components/confirm-modal/confirm-modal.component';
import { DetailsComponent } from './_components/details/details.component';
import { EmailValidationComponent } from './_components/email-validation/email-validation.component';
import { MainDropdownCardComponent } from './_components/main-dropdown-card/main-dropdown-card.component';
import { NotificationModalComponent } from './_components/notification-modal/notification-modal.component';
import { PasswordRecoveryComponent } from './_components/password-recovery/password-recovery.component';
import { RecomendationsComponent } from './_components/recomendations/recomendations.component';
import { SearchFilterDropdownComponent } from './_components/search-filter-dropdown/search-filter-dropdown.component';
import { SearchComponent } from './_components/search/search.component';
import { TermsOfUseModalComponent } from './_components/terms-of-use-modal/terms-of-use-modal.component';
import { CreateUserFormComponent } from "./_components/users/create-user-form/create-user-form.component";
import { UserPermissionsComponent } from './_components/users/user-permissions/user-permissions.component';
import { UserProfileFormComponent } from './_components/users/user-profile-form/user-profile-form.component';
import { DeactivateGuard } from './_guards/deactivate.guard';
import { CreateAccountComponent } from './_pages/create-account/create-account.component';
import { FirstAccessComponent } from './_pages/first-access/first-access.component';
import { UserProfileComponent } from './_pages/users/user-profile/user-profile.component';
import { LandingPageComponent } from './_pages/landing-page/landing-page.component';
import { UsersComponent } from './_pages/users/users.component';
import { ActiviteService } from './_services/activite.service';
import { InviteService } from './_services/invite.service';
import { EditalService } from './_services/edital.service';
import { UserService } from './_services/user.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import localePt  from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BookmarkComponent } from './_components/bookmark/bookmark.component';

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
    LandingPageComponent,
    HomeComponent,
    BreadcrumbComponent,
    InputFileComponent,
    PaginationTemplateComponent,
    ToastComponent,
    CustomLoaderComponent,
    LoaderComponent,
    ConfirmAlertComponent,
    FileCardComponent,
    FirstAccessComponent,
    UsersComponent,
    UserListComponent,
    UserProfileComponent,
    UserProfileFormComponent,
    MainDropdownCardComponent,
    CreateUserFormComponent,
    NotEmptyDirective,
    ValidBirthdayDirective,
    UserPermissionsComponent,
    CreateAccountComponent,
    NotificationModalComponent,
    ConfirmModal,
    InviteModalComponent,
    TermsOfUseModalComponent,
    SearchComponent,
    BookmarkComponent,
    PasswordRecoveryComponent,
    EmailValidationComponent,
    DetailsComponent,
    SearchFilterDropdownComponent,
    RecomendationsComponent,
    
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
    MatFormFieldModule,
    CarouselModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideEnvironmentNgxCurrency(customCurrencyMaskConfig),
    AuthService,
    InviteService,
    DocumentService,
    EditalService,
    ActiviteService,
    ToastService,
    LoaderService,
    FirstAccessService,
    UserService,
    FormBuilder,
    DeactivateGuard,
    ProfileService,
    SegmentService,
    ImagekitService,
    RecomendationService,
    PermissionService,
    provideNgxMask(),
    MatDatepickerModule,
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

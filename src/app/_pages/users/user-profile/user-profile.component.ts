import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createPasswordStrengthValidator, emailValidator } from 'src/app/_helpers/utils';
import { User } from 'src/app/_models/user';
import { ImagekitService } from 'src/app/_services/Imagekit.service';
import { ActiviteService } from 'src/app/_services/activite.service';
import { AuthService } from 'src/app/_services/auth.service';
import { LocationService } from 'src/app/_services/location.service';
import { SegmentService } from 'src/app/_services/segment.service';
import { ToastService } from 'src/app/_services/toast.service';
import { UserService } from 'src/app/_services/user.service';

export enum tabSelection {
  PROFILE = 'PROFILE',
  SERVICE = 'SERVICE'
}

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private profileImageFile: any;

  public passwordConfirmationFieldVisible = false;
  public passwordFieldVisible = false;
  public passwordEdit = false;

  

  public get tabOptions(): typeof tabSelection {
    return tabSelection;
  }

  public currentTab = tabSelection.PROFILE;

  public userForm: FormGroup;
  public passwordForm: FormGroup;

  public mask: string = "000.000.000-00";

  public isAdmVision = false;

  public editMode = false;

  public userProfile;

  public showErrors = false;

  public segments : Array<{id, name}>
  public states : Array<{id, abbreviation, name}> = [];
  public activities : Array<{id, name}>

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public user: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private segmentService: SegmentService,
    private activiteService: ActiviteService,
    private locationService: LocationService,
    private imageService: ImagekitService
  ) { 
    this.userForm = this.formBuilder.group({
      id: [''],
      name: [''],
      lastName: [''],
      email: [null, [Validators.required, emailValidator()]],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      role: [''],
      profileImageId: [null],
      segment: [null, Validators.required],
      activite: [null, Validators.required],
      abrangency: [null, Validators.required],
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, createPasswordStrengthValidator()]],
      passwordConfirm: ['', Validators.required],
    });

    this.userProfile = document.getElementById('usar-image') as HTMLImageElement;
  }

  toglePasswordField() {
    this.passwordFieldVisible = !this.passwordFieldVisible;
  }

  toglePasswordConfirmField() {
    this.passwordConfirmationFieldVisible = !this.passwordConfirmationFieldVisible;
  }

  ngOnInit(): void {
    this.segmentService.getAll({}, { itemsPerPage : 9999 }).subscribe((segments) => {
      this.segments = segments;
    });
    this.activiteService.getAll({}, { itemsPerPage : 9999 }).subscribe((activity) => {
      this.activities = activity;
    });
    this.locationService.getAll({}, { itemsPerPage : 9999 }).subscribe((states) => {
      this.states = states;
      this.states.push({id: 0, abbreviation: null, name: 'Todos'})
      this.states = this.states.reverse();
    });
    const userId = Number(this.activatedRoute.snapshot.queryParamMap.get('userId'));
    if (userId) {
      this.isAdmVision = true;
      this.userService.getUsers({id : userId},{ itemsPerPage : 1 }).subscribe(data => {
       this.setForm(data[0]);
      }).add(() => this.getProfileImageUrl())
    } else {
      this.isAdmVision = false;
      this.setForm(this.user.user)
      this.userProfile = this.user.user.profileImageUrl
    }
  }

  setForm(user : User) {
    this.userForm.patchValue(user)
    if (this.user.user.cpfCnpj && this.user.user.cpfCnpj.length > 11)
      this.mask = '00.000.000/0000-00'

    this.userForm.disable()
  }

  setTab(selected) {
    this.currentTab = selected;
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/login']);
  }

  uploadProfileImage(): void {
    if (!this.isAdmVision) {
      const uploadDOMElement = document.getElementById('profileImagemUpload');
      uploadDOMElement.click();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.profileImageFile = file;
      this.userService.updateUserProfileImage(this.user.user.id, 
        this.profileImageFile, this.profileImageFile.name).subscribe(
          {
            next: (result: any) => {
              if(result){
                this.userProfile = result.newUrl;
                this.user.user.profileImageUrl = result.newUrl;
                this.user.user.profileImageId = result.newId;
                this.user.manualTokenRefresh();
              }
            },
            complete: () => {
              this.toastService.success('Imagem do perfil aterada com sucesso', '', 6000);
            },
            error: (err) => {
              alert('Erro ao atualizar imagem de perfil.');
            }
          }
        );
    }
  }

  getProfileImageUrl() {
    this.imageService.getFileUrl(this.userForm.controls['profileImageId'].value).subscribe(image => {
      this.userProfile = image.url;
    },
    (err) => {
      this.toastService.error('Erro ao atualizar imagem de perfil.', '', 6000);
      console.log('Ocorreu um erro ao atualizar imagem: ' + err);
    })
  }
  
  edit() {
    this.editMode = true;
    this.userForm.controls.email.enable()
    if (!this.isAdmVision) {
      this.userForm.controls.name.enable()
      this.userForm.controls.lastName.enable()
      this.userForm.controls.cpfCnpj.enable()
      this.userForm.controls.segment.enable()
      this.userForm.controls.activite.enable()
      this.userForm.controls.abrangency.enable()
    }
  }

  ededitPassword() {
    this.passwordEdit = true;
    this.passwordForm.enable();
  }

  save() {
    if ((this.userForm.valid && !this.passwordEdit) || 
    (this.userForm.valid && this.passwordEdit && this.passwordForm.valid && this.passwordForm.controls.password?.value == this.passwordForm.controls.passwordConfirm?.value)) {
      let userDTO: any = {
        name: this.userForm.controls.name?.value,
        lastName: this.userForm.controls.lastName?.value,
        email: this.userForm.controls.email?.value,
        cpfCnpj: this.userForm.controls.cpfCnpj?.value,
        segment: this.userForm.controls.segment?.value.id,
        abrangency: this.userForm.controls.abrangency?.value.map((item) => item.id),
        activite: this.userForm.controls.activite?.value.map((item) => item.id)
      }
      if (this.passwordForm.valid) {
        userDTO.password = this.passwordForm.controls.password?.value
      }

      this.userService.editUSer(this.userForm.controls.id.value, userDTO).subscribe(() => {
        this.toastService.success('Alterações salvas com sucesso  ', '', 6000);
        this.user.recomendations = undefined;
        this.editMode = false;
        this.passwordEdit = false;
        this.showErrors = false;
        this.userForm.disable()
        this.passwordForm.reset();
        if (!this.isAdmVision || this.userForm.controls.id.value === this.user.user.id)
          this.user.manualTokenRefresh();
      }, (err) => {
        this.toastService.error('Ocorreu um erro ao atualizar este usuário! ', err , 6000);
      });
    } else {
      this.showErrors = true;
    }
  }

  cancel() {
    this.userForm.disable()
    this.userService.getUsers({ id : this.userForm.controls.id.value },{ itemsPerPage : 1 }).subscribe(data => {
      this.setForm(data[0]);
     });
    this.passwordForm.reset()
    this.showErrors = false;
    this.editMode = false;
    this.passwordEdit = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/_helpers/utils';
import { User } from 'src/app/_models/user';
import { ImagekitService } from 'src/app/_services/Imagekit.service';
import { AuthService } from 'src/app/_services/auth.service';
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

  public get tabOptions(): typeof tabSelection {
    return tabSelection;
  }

  public currentTab = tabSelection.PROFILE;

  public userForm: FormGroup;

  public mask: string = "000.000.000-00";

  public isAdmVision = false;

  public editMode = false;

  public userProfile;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public user: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private imageService: ImagekitService
  ) { 
    this.userForm = this.formBuilder.group({
      id: [''],
      name: [''],
      lastName: [''],
      email: [null, [Validators.required, emailValidator()]],
      cpfCnpj: [''],
      role: [''],
      password: [''],
      passwordConfirm: [''],
      profileImageId: [null],
      segment: [null],
      activities: [null],
      abrangency: [null],
    });

    this.userProfile = document.getElementById('usar-image') as HTMLImageElement;
  }

  ngOnInit(): void {
    this.userForm.disable()
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
    if (this.user.user.cpfCnpj.length > 11)
      this.mask = '00.000.000/0000-00'
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
                this.user.user.profileImageUrl = result.newUrl;
                this.user.user.profileImageId = result.newId;
                this.user.manualTokenRefresh();
                console.log('altualixou')
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
    }
  }

  save() {
    let userDTO: any = {
      name: this.userForm.controls.name?.value,
      lastName: this.userForm.controls.lastName?.value,
      email: this.userForm.controls.email?.value,
      cpfCnpj: this.userForm.controls.cpfCnpj?.value
    }
    this.userService.editUSer(this.userForm.controls.id.value, userDTO).subscribe(() => {
      this.toastService.success('Alterações salvas com sucesso  ', '', 6000);
      this.editMode = false;
      this.userForm.disable()
    }, (err) => {
      this.toastService.error('Ocorreu um erro ao atualizar este usuário! ', err , 6000);
    });
  }
}

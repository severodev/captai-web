import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
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

  constructor(
    private router: Router,
    private userService: UserService,
    public user: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: [''],
      lastName: [''],
      email: [null],
      emailConfirmation: [''],
      cpfCnpj: [''],
      password: [''],
      passwordConfirm: [''],
      segment: [null],
      activities: [null],
      abrangency: [null],
    });
  }

  ngOnInit(): void {
    if (this.user.user.cpfCnpj.length > 11)
      this.mask = '00.000.000/0000-00'
    this.userForm.patchValue(this.user.user)
  }

  setForm() {
    this.userForm.patchValue(this.user.user)
  }

  setTab(selected) {
    this.currentTab = selected;
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/login']);
  }

  uploadProfileImage(): void {
    const uploadDOMElement = document.getElementById('profileImagemUpload');
    uploadDOMElement.click();
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
              }
            },
            error: (err) => {
              alert('Erro ao atualizar imagem de perfil.');
            }
          }
        );;

    }
  }
}

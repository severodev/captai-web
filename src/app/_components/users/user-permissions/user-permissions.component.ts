import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/_services/permission.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {
  listPermissionCollaborator: any;
  listPermissionProject: any;
  listPermissionUser: any;
  listPermissionProvider: any;
  listPermissionTrash: any;
  profiles: any;
  profileDefault: string = "ADMIN";
  activeForm: string = null;
  permissions: any;

  currentProfile: any;

  constructor(
    private profileService: ProfileService,
    private permissionService: PermissionService,
    private readonly ts: ToastService,
  ) { }

  ngOnInit(): void {
    this.getPermissions();
    this.showCollaboratorTab();
  }

  getPermissions() {
    this.permissionService.getPermissions().subscribe((data: any) => {
      this.permissions = data;
      this.getProfile();
    });
  }

  getProfile() {
    this.profileService.getProfiles().subscribe((data: any) => {
      this.profiles = data;
      this.currentProfile = this.profiles.find(p => p.key == this.profileDefault);
      this.setPermissionsByProfile();
    });
  }

  setPermissionsByProfile() {
    this.permissions.forEach(e => {
      e.checked = this.currentProfile.permissions.filter(p => p.key == e.key).length > 0;
    });
  }

  filterPermissionByKey(permissions: any, key: string) {
    return permissions?.filter(p => p.key.indexOf(key) >= 0)
  }

  savePermissions() {
    const permissions = this.permissions.filter(p => p.checked);
    this.profileService.savePermissions(this.currentProfile.id, permissions).subscribe(
      () => {
        this.ts.success('Ação concluída!', 'Permissões atualizadas com sucesso!');
      },
      () => {
        this.ts.error('Ops!', 'Houve algum erro ao salvar as permissões!');
      }
    );
  }

  showCollaboratorTab() {
    this.activeForm = 'collaborator';
  }

  showProfilesTab() {
    this.activeForm = 'projects';
  }

  showProjectTab() {
    this.activeForm = 'suppliers';
  }

  showUsersTab() {
    this.activeForm = 'users';
  }

  showTrash() {
    this.activeForm = 'trash';
  }
}

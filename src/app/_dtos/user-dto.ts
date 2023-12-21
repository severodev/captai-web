import { User } from '../_models/user';

export class UserDto {
    convertResponseToUserModel(data: any): User {
        let user = new User();
        user.id = data.id;
        user.email = data.email;
        user.fullname = data.fullname;
        user.language = data.language;
        user.role = data.role;
        user.username = data.username;
        return user;
      }
}
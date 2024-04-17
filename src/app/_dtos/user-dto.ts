import { User } from '../_models/user';

export class UserDto {
    convertResponseToUserModel(data: any): User {
        let user = new User();
        user.id = data.id;
        user.name = data.email;
        user.lastName = data.fullname;
        user.email = data.language;
        user.cpfCnpj = data.role;
        user.language = data.username;
        return user;
      }
}
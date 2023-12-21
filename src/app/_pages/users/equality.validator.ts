import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordEqualityValidator(): ValidatorFn {
    return(group: AbstractControl) : ValidationErrors | null => {

        let password = group.get('password')?.value
        let confirmPass = group.get('passwordConfirmation')?.value
        if (password && confirmPass) {
            return password === confirmPass ? null : {passwordNotEqual: true}
        }
    }
}

export function emailEqualityValidator(): ValidatorFn {
    return(group: AbstractControl) : ValidationErrors | null => {

        let email = group.get('email')?.value
        let confirmEmail = group.get('emailConfirmation')?.value
        if (email && confirmEmail) {
            return email === confirmEmail ? null : {emailNotEqual: true}
        }
    }
}


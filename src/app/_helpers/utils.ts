import { HttpParams } from "@angular/common/http";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function formatDate(str_date: string) {
    return str_date?.replace(/(\d+[/])(\d+[/])/, '$2$1');
}

export const createParams = (objects: any[]) => {
    let params = new HttpParams();
    objects.forEach(o => {
      if(o) {
        Object.keys(o).forEach(key => {
          if(o[key] || o[key] === false) {
            params = params.append(key, o[key]);
          }
        })
      }
    })
    return params;
  }

export function formatDateMoment(date: Date) {
    return moment(date).format('DD/MM/YYYY');
}

export function formatDateMomentFromStr(date: string, format: string = 'YYYY-MM-DD') {
    return moment(date, format).format('DD/MM/YYYY');
}

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const minLength = value.length >= 8;

        const passwordValid = hasUpperCase && hasNumeric && specialCharacters && minLength;

        return passwordValid ? null : {
            specialCharacters: specialCharacters,
            hasUpperCase: hasUpperCase,
            hasNumeric: hasNumeric,
            minLength: minLength
        };
    }
}

export function emailValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const email = control.value;
        let emailInvalid = false;
        if (email) {
            if (!email.includes('@')) {
                emailInvalid = true;
            } else {
            const atIndex = email.indexOf('@');
            const domain = email.substring(atIndex + 1);
                if (!domain.includes('.com')) {
                    emailInvalid = true;
                }
            }
        }
        
        return !emailInvalid ? null : { emaiValid: false };
    }
}
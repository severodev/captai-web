import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from 'moment'

export function validBirthdayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = moment(control.value, "DD/MM/YYYY")

        if (!value) return null;
        const invalidBirthday = moment().isBefore(value)
        return invalidBirthday ? { invalidBirthday: true } : null;
    }
}
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function notEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value

        if (!value) return null;
        return value.trim() == "" ? { emptyInput: true } : null;
    }
}
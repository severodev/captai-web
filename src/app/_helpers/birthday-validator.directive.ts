import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { validBirthdayValidator } from "./birthday-validator";

@Directive({ selector: '[validBirthday]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ValidBirthdayDirective,
        multi: true
    }]
})
export class ValidBirthdayDirective implements Validator {
    
    validate(control: AbstractControl): ValidationErrors | null {
        return validBirthdayValidator()(control)
    }
}
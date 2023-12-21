import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { notEmptyValidator } from "./not-empty-validator";

@Directive({ selector: '[notEmpty]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: NotEmptyDirective,
        multi: true
    }]
})
export class NotEmptyDirective implements Validator {
    
    validate(control: AbstractControl): ValidationErrors | null {
        return notEmptyValidator()(control)
    }
}
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, take } from 'rxjs';
import { UserService } from './../../../../../src/app/_services/user.service';

export class CpfCnpjAvailabilityValidator {

    public static checkCpfCnpj(userService: UserService) {
        return (formControl: FormControl): Observable<ValidationErrors | null> => {
            return userService.checkAvaliabilityCpfCnpj(formControl.value)
                .pipe(
                    debounceTime(500),
                    distinctUntilChanged(),
                    take(1),
                    map((data: boolean) => {
                        return !data ? { cpf_cnpj_exists: true } : null;
                    })
                );
        }
    }

}
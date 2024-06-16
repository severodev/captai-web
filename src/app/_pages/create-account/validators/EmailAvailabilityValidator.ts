import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, take } from 'rxjs';
import { UserService } from './../../../../../src/app/_services/user.service';

export class EmailAvailabilityValidator {

    public static checkEmail(userService: UserService) {
        return (formControl: FormControl): Observable<ValidationErrors | null> => {
            return userService.checkAvaliabilityEmail(formControl.value)
                .pipe(
                    debounceTime(500),
                    distinctUntilChanged(),
                    take(1),
                    map((data: boolean) => {
                        return !data ? { email_exists: true } : null;
                    })
                );
        }
    }

}
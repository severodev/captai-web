import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SpaceValidatorService {
    noWhitespaceValidator(...input: string[]) {
        let invalid: boolean = false;
        input.forEach(element => {
            if(element == undefined){
                invalid = false;
            }else{
                const isWhitespace = (element || '').trim().length === 0;
                const isValid = !isWhitespace;
                if(invalid == false){
                    isValid ? invalid = false : invalid = true;
                }
            }
        });
        return invalid;
    }
}
import { State } from '../_models/state';
import { City } from '../_models/city';

export class LocationDto {

  convertResponseToStateDropdown(data: any): State {
    let state = new State();

    state.id = data.id;
    state.abbreviation = data.abbreviation;
    state.name = data.name;
    state.country = data.country;

    return state;
  }

  convertResponseToCityDropdown(data: any): City {
    let city = new City();

    city.id = data.id;
    city.name = data.name;
    city.state = data.state;
    city.country = data.country;

    return city;
  }

}
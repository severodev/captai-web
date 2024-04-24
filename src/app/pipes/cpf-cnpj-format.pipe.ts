import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpjFormat'
})
export class CpfFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length < 11)
      return 'CPF ou CNPJ inválido.';
    if (value.length == 11) {
      return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    } else {
      return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
  }
}

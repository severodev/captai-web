

export class BrlMoneyFormatter {

    private static formatter = new Intl.NumberFormat('pt-br', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
    });

    public static format(value: number) : string {
        return this.formatter.format(value);
    }

}
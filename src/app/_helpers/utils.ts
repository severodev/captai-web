import * as moment from "moment";

export function formatDate(str_date: string) {
    return str_date?.replace(/(\d+[/])(\d+[/])/, '$2$1');
}

export function formatDateMoment(date: Date) {
    return moment(date).format('DD/MM/YYYY');
}

export function formatDateMomentFromStr(date: string, format: string = 'YYYY-MM-DD') {
    return moment(date, format).format('DD/MM/YYYY');
}
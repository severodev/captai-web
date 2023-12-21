import { Collaborator } from './collaborator'

export class Signings {
    id: number;
    collaborator: Collaborator;
    date?: string;
    month?: number;
    year?: number;
}
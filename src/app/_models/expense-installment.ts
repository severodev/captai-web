import { Project } from "./project";

export class ExpenseInstallment {
    id: number;
    order: number;
    paymentDate: Date;
    month: number;
    year: number;
    description: string;
    value: number;
    isPaid: boolean;
    projectId: number;
    project?: Project;

    str_date: string; // frontend
    selected: boolean; // frontend
    isEditing: boolean;
}
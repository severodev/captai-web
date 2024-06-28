export interface SubscriptionPlan {
    id: number;
    nome: string;
    valor:number;
    diasGratis: number;
    descricao?: string;
    itensCobertos?: string[];
    itensNaoCobertos?: string[];
    imagem?: string;
    ativo: boolean;
}
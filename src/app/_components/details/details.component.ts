import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  constructor(public router: Router) { }

  public breadcrumbPages: Breadcrumb[] = [
    { label: 'Pesquisa de oportunidades', route: '/search' },
    { label: 'Detalhes: Edital centelha', route: '/details', active: true }
  ];

  public edital = {
    name: 'Edital Centelha',
    number: '02/2022',
    offeredBy: 'FINEP',
    subTitle: 'Programa nacional de apoio à geração de empreendimentos inovadores programa centelha 2 Ceará',
    objective: 'Estimular o empreendedorismo inovador por meio de capacitações para o desenvolvimento de produtos (bens e/ou serviços) ou de processos inovadores e, apoiar por meio da concessão de recursos de subvenção econômica (recursos não reembolsáveis) e Bolsas de Fomento Tecnológico Extensão Inovadora, a geração de empresas de base tecnológicas a partir da transformação de ideias inovadoras em empreendimentos que incorporem novas tecnologias aos setores econômicos estratégicos do estado do Espírito Santo.',
    data: '28/02/2024',
    tematics: ['Tecnologia quantica', 'Big data', 'Biotecnologia', 'Blockchain', 'Eletronica', 'Geoengenharia'],
    valor: 'R$ 17.000.000,00',
    maturity: 'Atividade compreendidas entre os TRLs 3 a 7',
    elegibility: '14.2 O prazo limite para entrega da documentação será divulgado junto às orientações de' +
    'contratação da FAPES, sendo o mínimo de 60 (sessenta) dias, contados da data da publicação' +
    'do resultado final.' +
    '14.3 O não atendimento ao prazo de entrega da documentação resultará na perda do direito à' +
    'contratação e na consequente convocação de proposta(s) suplente(s) oriundos do cadastro de' +
    'reserva, obedecida a ordem de classificação da seleção e respeitado o limite de recursos' +
    'financeiros da Chamada Pública.' +
    '14.4 A ausência de qualquer documento exigido ou a inadimplência da empresa beneficiária' +
    'com a administração pública federal, estadual ou municipal, direta ou indireta, constituirão' +
    'fator impeditivo para a contratação do projeto. Assim, a empresa deverá estar atualizada e' +
    'regularizada, com os cadastros, as Certidões Negativas de Débito e prestações de contas de' +
    'quaisquer órgãos da administração pública.' +
    '14.5 Todos os projetos aprovados estão passíveis de análise orçamentária pela FAPES durante' +
    'o procedimento de contratação. A FAPES poderá solicitar ajustes nos planejamentos de acordo' +
    'com o regramento de aplicação de recursos de subvenção da instituição, e inclusive, indeferir' +
    'o pedido de recursos em rubricas específicas.' +
    '14.6 A concessão dos recursos financeiros da subvenção econômica será efetivada por meio da' +
    'celebração do Termo de Outorga de Concessão da Subvenção Econômica entre as partes' +
    '(Anexo I).'
  };

}

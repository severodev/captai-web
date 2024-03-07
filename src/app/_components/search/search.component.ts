import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  public data = [{
    nome: "Câmera Inteligente",
    Inicio: "2023-07-12",
    Objetivos: "Melhorar a segurança residencial",
    Valor: '5.750.000,00',
    Afinidade: 4,
    area: "Visão Computacional"
    },
    {
    nome: "Robô de Limpeza Autônomo",
    Inicio: "2023-04-28",
    Objetivos: "Automatizar a limpeza doméstica",
    Valor: '7.200.000,00',
    Afinidade: 5,
    area: "Inteligência Artificial"
    },    
    {
    nome: "Sistema de Reconhecimento Facial",
    Inicio: "2023-10-15",
    Objetivos: "Refinar a segurança em espaços públicos",
    Valor: '8.500,00',
    Afinidade: 3,
    area: "Processamento de Imagens"
    },    
    {
    nome: "Software de Gestão de Projetos",
    Inicio: "2023-02-09",
    Objetivos: "Aumentar a eficiência no gerenciamento de equipes",
    Valor: '6.300.000,00',
    Afinidade: 4,
    area: "Engenharia de Software"
    },    
    {
    nome: "Drone de Monitoramento Agrícola",
    Inicio: "2023-06-21",
    Objetivos: "Otimizar o acompanhamento de safras",
    Valor: '9.000,00',
    Afinidade: 4,
    area: "Processamento de Dados Geoespaciais"
    }];
  public selected;

  select(idSelected) {
   this.selected = idSelected;
  }

  toggleDetails(id) {
    var details = document.getElementById('details-' + id);
    var toggle = document.getElementById('toggle-' + id);
    if (details && toggle) {
        if (details.getAttribute('hidden') !== null) {
          toggle.style.transform = 'rotate(180deg)';
          details.removeAttribute('hidden');
        } else {
          toggle.style.transform = 'rotate(0deg)';
          details.setAttribute('hidden', 'true');
        }
    }
  }
}
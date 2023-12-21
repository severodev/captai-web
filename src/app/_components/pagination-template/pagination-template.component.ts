import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { PaginationControlsDirective, PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination-template',
  templateUrl: './pagination-template.component.html',
  styleUrls: ['./pagination-template.component.scss']
})
export class PaginationTemplateComponent implements OnInit {

  public DEFAULT_PAGE_SIZE = 4;

  @ViewChild('p', {static: true}) p: PaginationControlsDirective;
  
  @Input()
  public config: PaginationInstance;
  
  @Output()
  public changePageEvent = new EventEmitter<number>();
  
  constructor() { }
  
  ngOnInit(): void {
  }

  isFirstPage(): boolean {
    return this.config.currentPage === 1;
  }

  isLastPage(): boolean {
    return !( (this.config.totalItems > (this.config.currentPage * this.config.itemsPerPage)));
  }

  changePage(index: any) {
    this.config.currentPage = index;
    this.changePageEvent.emit(index);
  }

}

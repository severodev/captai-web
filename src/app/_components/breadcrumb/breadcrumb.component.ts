import { Component, OnInit, Input } from '@angular/core';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  pages: Breadcrumb[];

  constructor() { }

  ngOnInit(): void {
  }

}

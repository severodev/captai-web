import { Component, Input } from '@angular/core';
import { DocumentFile } from 'src/app/_models/document-file';

@Component({
  selector: 'app-accountability-docs',
  templateUrl: './accountability-docs.component.html',
  styleUrls: ['./accountability-docs.component.scss'],
})
export class AccountabilityDocsComponent {
  @Input() docs: DocumentFile[];

  constructor() {}

  onDocRemove(itemIndex: number): void {
  }
}

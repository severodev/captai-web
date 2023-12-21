import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentFile } from 'src/app/_models/document-file';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent {
  @Input() file: DocumentFile;
  @Output() onRemove: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  downloadDoc(url: string): void {
    if (url) window.open(url, '_blank');
  }

  remove(): void {
    this.onRemove.emit(true);
  }
}

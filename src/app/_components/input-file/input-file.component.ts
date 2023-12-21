import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef<HTMLElement>;

  fileToUpload: File = null;

  @Output()
  fileSelectedEvent = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {}

  triggerInputFileClick() {
    this.inputFile.nativeElement.click();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileSelectedEvent.emit(this.fileToUpload);
  }

  resetFileInput() {
    this.fileToUpload = null;
  }

}

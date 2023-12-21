import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DocumentFile } from 'src/app/_models/document-file';
import { DocType } from 'src/app/_models/doc-type';
import { Project } from 'src/app/_models/project';

import { DocumentService } from 'src/app/_services/document.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-docs-form',
  templateUrl: './docs-form.component.html',
  styleUrls: ['./docs-form.component.scss']
})
export class DocsFormComponent implements OnInit {

  @Input()
  project: Project;

  @Input()
  canEdit: boolean = true;

  submittedDocuments: DocumentFile[];

  documentsType: DocType[];

  selectedDocTypeId: string = '';
  fileToUpload: File = null;

  @ViewChild('inputFile') inputFile: any;

  constructor(
    private documentService: DocumentService,
    private ts: ToastService
  ) { }

  ngOnInit(): void {
    this.submittedDocuments = this.project.documentFiles;
    this.loadDocumentsType();
  }

  loadDocumentsType() {
    this.documentService.getDocumentsTypeDropdown('1').subscribe((res: DocType[]) => {
      this.documentsType = res;
    });
  }

  addDoc() {
    if(this.selectedDocTypeId !== '' && this.fileToUpload) {
      this.documentService.sendProjectDocument(this.fileToUpload, this.selectedDocTypeId)
        .subscribe(
          (res: any) => {
            let auxDoc = new DocumentFile();
            auxDoc.id = res.id;
            auxDoc.filename = res.filename;
            auxDoc.type = res.fileType;
            auxDoc.documentType = res.documentType;
            auxDoc.createdAt = res.created;
            auxDoc.size = res.size;
            auxDoc.url = res.url;
            auxDoc.selected = false;

            // Add in project:
            this.project.documentFiles.push(auxDoc);
            this.project.documents.push(res.id);

            this.selectedDocTypeId = '';
            this.fileToUpload = null;
            this.inputFile.resetFileInput();
          },
          (err: any) => this.ts.error('Falha no upload', 'Houve um erro ao tentar adicionar o arquivo.', 6000)
        );
    }
  }

  setFileToUpload(file: File) {
    this.fileToUpload = file;
  }

  downloadDoc(url: string) {
    window.open(url, '_blank');
  }

  deleteDoc(item, index) {
    this.project.documents.splice(index, 1);
    this.project.documentFiles.splice(index, 1);
  }

}

import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DocumentFile } from 'src/app/_models/document-file';
import { Collaborator } from 'src/app/_models/collaborator';
import { DocType } from 'src/app/_models/doc-type';

import { DocumentService } from 'src/app/_services/document.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-collaborator-docs-form',
  templateUrl: './collaborator-docs-form.component.html',
  styleUrls: ['./collaborator-docs-form.component.scss']
})
export class CollaboratorDocsFormComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  @Input()
  canEdit: boolean = true;

  documentsType: DocType[];
  selectedDocTypeId: string = '';
  submittedDocuments: DocumentFile[];

  fileToUpload: File = null;

  @ViewChild('inputFile') inputFile: any;

  constructor(private documentService: DocumentService, private ts: ToastService) { }

  ngOnInit(): void {
    this.submittedDocuments = [];
    this.loadDocumentsType();
  }

  loadDocumentsType() {
    this.documentService.getDocumentsTypeDropdown('2').subscribe((res: DocType[]) => {
      this.documentsType = res;
    });
  }

  setFileToUpload(file: File) {
    this.fileToUpload = file;
  }

  addDoc() {
    if(this.selectedDocTypeId !== '' && this.fileToUpload) {
      this.documentService.sendCollaboratorDocument(this.fileToUpload, this.selectedDocTypeId).subscribe((res: any) => {
        let auxDoc = new DocumentFile();
        auxDoc.id = res.id;
        auxDoc.filename = res.filename;
        auxDoc.type = res.fileType;
        auxDoc.documentType = res.documentType;
        auxDoc.createdAt = res.created;
        auxDoc.size = res.size;
        auxDoc.url = res.url;
        auxDoc.selected = false;

        // Add in list:
        this.submittedDocuments.push(auxDoc);

        // Add in collaborator:
        this.collaborator.documents.push(auxDoc);

        this.selectedDocTypeId = '';
        this.fileToUpload = null;
        this.inputFile.resetFileInput();
      }, (err) => {
        this.ts.error('Ops!', 'Houve algum erro ao salvar o arquivo. :(');
      });
    }
  }

  downloadDoc(url: string) {
    window.open(url, '_blank');
  }

  deleteDoc(item, index) {
    this.collaborator.documents.splice(index, 1);
    this.submittedDocuments.splice(index, 1);
  }

}

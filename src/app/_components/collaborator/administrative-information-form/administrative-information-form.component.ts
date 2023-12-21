import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DocumentService } from 'src/app/_services/document.service';
import { ToastService } from 'src/app/_services/toast.service';

import { Collaborator } from 'src/app/_models/collaborator';
import { DocType } from 'src/app/_models/doc-type';
import { DocumentFile } from 'src/app/_models/document-file';

@Component({
  selector: 'app-administrative-information-form',
  templateUrl: './administrative-information-form.component.html',
  styleUrls: ['./administrative-information-form.component.scss']
})
export class AdministrativeInformationFormComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  @Input()
  canEdit: boolean = true;

  selectedDocTypeTermId: string = '';
  documentTermTypes: DocType[];
  terms: DocumentFile[];
  fileToUpload: File = null;

  @ViewChild('inputFile') inputFile: any;

  constructor(
    private documentService: DocumentService,
    private ts: ToastService
  ) { }

  ngOnInit(): void {
    this.terms = [];
    this.loadDocumentTermTypes();
  }

  loadDocumentTermTypes() {
    this.documentService.getDocumentsTypeDropdown('4').subscribe((res: DocType[]) => {
      this.documentTermTypes = res;
    });
  }

  setFileToUpload(file: File) {
    this.fileToUpload = file;
  }

  addDoc() {

    if(this.selectedDocTypeTermId !== '' && this.fileToUpload) {
      this.documentService.sendTermDocument(this.fileToUpload, this.selectedDocTypeTermId)
      .subscribe((res: any) => {
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
        this.terms.push(auxDoc);

        // Add in collaborator:
        this.collaborator.terms.push(auxDoc);

        this.selectedDocTypeTermId = '';
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
    this.collaborator.terms.splice(index, 1);
    this.terms.splice(index, 1);
  }

}

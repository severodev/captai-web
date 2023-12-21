import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Dependent } from 'src/app/_models/dependent';
import { Collaborator } from 'src/app/_models/collaborator';
import { DocType } from 'src/app/_models/doc-type';
import { DocumentFile } from 'src/app/_models/document-file';

import { DocumentService } from 'src/app/_services/document.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-dependent-form',
  templateUrl: './dependent-form.component.html',
  styleUrls: ['./dependent-form.component.scss']
})
export class DependentFormComponent implements OnInit {

  @Input()
  collaborator: Collaborator;

  @Input()
  canEdit: boolean = true;

  dependent: Dependent;
  documentsType: DocType[];
  fileToUpload: File = null;

  @ViewChild('inputFile') inputFile: any;

  constructor(private documentService: DocumentService, private ts: ToastService) { }

  ngOnInit(): void {
    this.dependent = new Dependent();
    this.dependent.doctype = '';
    this.loadDocumentsType();
  }

  addDependent() {
    this.dependent.selected = false;
    this.documentService.sendDependentDocument(this.fileToUpload, this.dependent.doctype).subscribe((res: any) => {
      if (this.dependent.name.trim() == '' || this.dependent.parentage.trim() == '') return this.ts.error("Erro", "Preencha todos os campos corretamente!")

      let auxDoc = new DocumentFile();
      auxDoc.id = res.id;
      auxDoc.filename = res.filename;
      auxDoc.type = res.fileType;
      auxDoc.createdAt = res.created;
      auxDoc.size = res.size;
      auxDoc.url = res.url;
      auxDoc.selected = false;

      this.dependent.doc = auxDoc;
      this.dependent.documents = [];
      this.dependent.documents.push(auxDoc);
      this.collaborator.dependents.push(this.dependent);
      this.dependent = new Dependent();

      this.dependent.doctype = '';
      this.fileToUpload = null;
      this.inputFile.resetFileInput();
    }, (err) => {
      this.ts.error('Ops!', 'Houve algum erro em salvar o arquivo. :(');
    });
  }

  loadDocumentsType() {
    this.documentService.getDocumentsTypeDropdown('3').subscribe((res: DocType[]) => {
      this.documentsType = res;
    });
  }

  setFileToUpload(file: File) {
    this.fileToUpload = file;
  }

  removeDependent(index) {
    this.collaborator.dependents.splice(index, 1);
  }

}

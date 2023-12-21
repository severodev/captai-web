import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BudgetCategory } from 'src/app/_models/budget-category';
import { DocType } from 'src/app/_models/doc-type';
import { DocumentFile } from 'src/app/_models/document-file';
import { CostShare, Expense } from 'src/app/_models/expense';
import { Project } from 'src/app/_models/project';
import { Supplier } from 'src/app/_models/supplier';
import { DocumentService } from 'src/app/_services/document.service';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ProjectService } from 'src/app/_services/project.service';
import { SpaceValidatorService } from 'src/app/_services/space-validator.service';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ToastService } from 'src/app/_services/toast.service';
import { InputFileComponent } from '../../input-file/input-file.component';

@Component({
  selector: 'app-add-trip-expense',
  templateUrl: './add-trip-expense.component.html',
  styleUrls: ['./add-trip-expense.component.scss']
})
export class AddTripExpenseComponent implements OnInit {

  @Output()
  finishExpense = new EventEmitter<any>();

  @Input()
  selectedExpense: Expense;

  @Input()
  project: Project;

  @ViewChild('inputFileComponent') inputFileComponent: InputFileComponent;

  @ViewChild("appInstallments") appInstallments: any;

  suppliersDropdown: Supplier[];
  selectedSupplierIndex: any = "";

  budgetCategories: BudgetCategory[];

  projectsDropdown: Project[];

  expense: Expense;

  auxCostShare: CostShare = {
    project: null,
    projectId: null,
    value: null,
  };

  selectedDocTypeId: number;
  documentTypes: DocType[];
  documents: DocumentFile[] = [];
  fileToUpload: File = null;

  invalid : boolean;

  constructor(
    private expenseService: ExpenseService,
    private supplierService: SupplierService,
    private projectService: ProjectService,
    private documentService: DocumentService,
    private spaceValidatorService : SpaceValidatorService,
    private ts: ToastService,
  ) { }

  ngOnInit(): void {
    this.loadSuppliersDropdown();
    this.loadProjectsDropdown();
    this.loadDocumentTypesDropdown();
    this.loadBudgetCategories();
    this.initExpense();
  }

  initExpense() {
    if(this.selectedExpense) {
      this.expense = this.selectedExpense;      
      this.expense.budgetCategoryId = this.expense.budgetCategory?.id;
    } else {
      this.expense = new Expense();
      this.expense.budgetCategoryId = 3; // TRIP id.
      this.expense.costShare = [];
      this.expense.documents = [];
      this.expense.installments = [];
      this.expense.tripDetails = {
        dailyAllowanceValue: null,
        hostingValue: null,
        ticketValue: null,
        passengerCpf: null,
        passengerName: null
      };
    }
  }

  loadSuppliersDropdown() {
    this.supplierService.getSuppliersDropdown().subscribe((res: any) => {
      this.suppliersDropdown = res;
    });
  }

  loadBudgetCategories() {
    this.supplierService.getBudgetCategoriesDropdown().subscribe((res: any) => {
      this.budgetCategories = res;      
    });
  }

  loadProjectsDropdown() {
    this.projectService.getProjectsDropdown().subscribe((res: any) => {
      this.projectsDropdown = res;
      if(this.project && this.project.id){
        this.projectsDropdown.find(p => p.id == this.project.id).name += ' (Projeto atual)'
      }
    });
  }

  loadDocumentTypesDropdown() {
    this.documentService.getExpenseDocumentsTypeDropdown()
    .subscribe((res: DocType[]) => {
      this.documentTypes = res;
    });
  }

  // addCostShare() {
  //   const newCostShare: CostShare = {
  //     projectId: this.auxCostShare.project.id,
  //     project: this.auxCostShare.project,
  //     value: this.auxCostShare.value,
  //     selected: false,
  //   };
  //   this.expense.costShare.push(newCostShare);
  //   this.auxCostShare.projectId = null;
  //   this.auxCostShare.project = null;
  //   this.auxCostShare.value = null;
  // }

  // deleteCostShare(idx: number) {
  //   this.expense.costShare.splice(idx, 1);
  // }

  setFileToUpload(file: File) {
    this.fileToUpload = file;
  }

  addDoc() {
    if (this.selectedDocTypeId && this.fileToUpload) {
      this.documentService.sendExpenseDocument(this.fileToUpload, this.selectedDocTypeId)
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

        this.documents.push(auxDoc);
        this.expense.documents.push(auxDoc.id);

        this.fileToUpload = null;
        this.selectedDocTypeId = undefined;
        this.inputFileComponent.resetFileInput();
      }, (err) => {
        this.ts.error('Ops!', 'Houve algum erro ao salvar o arquivo. :(');
      });
    }
  }

  deleteDoc(index: number) {
    this.expense.documents.splice(index, 1);
    this.documents.splice(index, 1);
  }

  downloadDoc(url: string) {
    window.open(url, '_blank');
  }

  cancel() {
    this.resetPageConfig();
  }

  resetPageConfig() {
    this.initExpense();
    this.inputFileComponent.resetFileInput();
    this.fileToUpload = null;
    this.selectedDocTypeId = undefined;
    this.finishExpense.emit();
  }

  save() {
    if (this.appInstallments.invalidTripTotal) {
      this.ts.error("Ops!", "Parcelas diferentes do valor total (Passagem + Hospedagem + Ajuda de Custo).");
      return;
    } else if (this.spaceValidatorService.noWhitespaceValidator(this.expense.tripDetails.passengerName, this.expense.description)) {
      this.ts.error('Existem campos vazios ou com apenas espaços.', 'Houve uma falha ao adicionar a viagem.')
    } else {
      this.expenseService.saveTripExpense(this.expense).
        subscribe(
          (res) => {
            this.ts.success('Ação concluída!', 'Viagem adicionada com sucesso.');
            this.resetPageConfig();
          },
          () => this.ts.error('Falha ao salvar.', 'Houve uma falha ao adicionar a viagem.')
        );
    }
  }

}

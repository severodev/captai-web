import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { Supplier } from 'src/app/_models/supplier';
import { BudgetCategory } from 'src/app/_models/budget-category';
import { Expense, CostShare } from 'src/app/_models/expense';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ProjectService } from 'src/app/_services/project.service';
import { DocType } from 'src/app/_models/doc-type';
import { DocumentService } from 'src/app/_services/document.service';
import { DocumentFile } from 'src/app/_models/document-file';
import { ToastService } from 'src/app/_services/toast.service';
import { InputFileComponent } from '../../input-file/input-file.component';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ExpenseStatus } from '../../../_enums/expense-status.enum';
import { SpaceValidatorService } from 'src/app/_services/space-validator.service';
import { WorkplanPtCategory } from '../../../_enums/worplan-pt-category.enum';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  @Output()
  finishExpense = new EventEmitter<any>();

  @ViewChild('inputFileComponent') inputFileComponent: InputFileComponent;

  @Input()
  selectedExpense: Expense;

  @Input()
  project: Project;

  @Input()
  selectedSupplierId: any = "";

  suppliersDropdown: Supplier[];

  budgetCategories: BudgetCategory[];

  statusList: string[];

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

  disabledBudgetCategories = ['TRIP', 'RH_DIRECT', 'RH_INDIRECT'];

  @ViewChild("appInstallments") appInstallments: any;

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
    this.loadStatus();
    this.initExpense();
  }

  initExpense() {
    if(this.selectedExpense) {
      this.expense = this.selectedExpense;
      this.selectedSupplierId = this.selectedExpense.supplier?.id;
      this.expense.budgetCategoryId = this.expense.budgetCategory?.id;
    } else {
      this.expense = new Expense();
      this.expense.costShare = [];
      this.expense.documents = [];
      this.expense.installments = [];
    }
  }

  loadSuppliersDropdown() {
    this.supplierService.getSuppliersDropdown().subscribe((res: any) => {
      this.suppliersDropdown = res;

      if(this.selectedSupplierId != '')
        this.setSelectedSupplier();
    });
  }

  loadBudgetCategories() {
    this.supplierService.getBudgetCategoriesDropdown().subscribe((res: any) => {
      this.budgetCategories = res;
      this.budgetCategories = this.budgetCategories.filter(bc => 
        !this.disabledBudgetCategories.includes(bc.code))
        .sort((bc1, bc2) => bc1.name.localeCompare(bc2.name));
    });
  }

  loadStatus() {
    this.statusList = Object.values(ExpenseStatus);
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

  setSelectedSupplier() {
    const supplier = this.suppliersDropdown.find(s => s.id === parseInt(this.selectedSupplierId));
    this.expense.supplierId = supplier.id;
    this.expense.supplierName = supplier.name;
    this.expense.cnpj = supplier.cnpj;
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

  getWorkplanLabel(key: string) {
    return WorkplanPtCategory[key];
  }

  save() {
    if(this.spaceValidatorService.noWhitespaceValidator(this.expense.description)){
      this.ts.error('Existem campos vazios ou com apenas espaços.', 'Houve uma falha ao incluir gasto.')
    }else {
      this.expenseService.saveExpense(this.expense).subscribe((res) => {
        if(!res){
          this.ts.error('Erro!', `Não foi possível ${this.expense.id ? 'atualizar' : 'adicionar'} o gasto.`);
          return;
        }
        this.ts.success('Ação concluída!', `Gasto ${this.expense.id ? 'atualizado' : 'adicionado'} com sucesso.`);
        this.resetPageConfig();
      });
    }
  }

}

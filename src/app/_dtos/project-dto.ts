import { Project } from '../_models/project';
import { Institute } from '../_models/institute';
import { ProjectMember } from '../_models/project-member';
import { DocumentFile } from '../_models/document-file';
import { Expense } from '../_models/expense';
import { formatDateMoment } from '../_helpers/utils';
import * as moment from 'moment';

export class ProjectDto {

  convertResponseToProjectCard(data: any): Project {
    let project = new Project();
    project.id = data.id;
    project.name = data.name;
    project.progress = data.progress;
    project.remainingBudget = data.remainingBudget;
    project.utilizedFundsPercentage = data.utilizedFundsPercentage;
    project.totalExpensives = data.totalExpensives;
    project.workplanComplete = data.workplanComplete;
    project.institute = data.institute

    return project;
  }

  convertResponseToInstituteProjectCards(data: any): Institute {
    let institute = new Institute();
    institute.id = data.institute.id;
    institute.abbreviation = data.institute.abbreviation;
    institute.name = data.institute.name;

    let projects = data.projects.map(d => this.convertResponseToProjectCard(d));
    institute.projects = projects;

    return institute;
  }

  convertResponseToProjectDropdown(data: any): Project {
    let project = new Project();
    project.id = data.id;
    project.name = data.name;
    project.instituteAbbreviation = data.intitute;
    project.start = data.start;
    project.end = data.end;

    return project;
  }

  convertDraftToProject(data: any): Project {
    let project = new Project();
    project.id = data.id;
    project.name = data.name;
    project.description = data.description;
    project.start = data.start;
    project.end = data.end;

    project.bankId = data.bankId;
    project.bankAgency = data.bankAgency;
    project.bankAccount = data.bankAccount;

    project.instituteAbbreviation = data.instituteAbbreviation;
    project.instituteId = data.instituteId;
    project.progress = data.progress
    project.remainingBudget = data.remainingBudget
    project.budget = data.budget;
    project.amendmentTerm = data.amendmentTerm;
    project.notes = data.notes;
    project.projectMembers =  data.projectMembers;
    project.documents = data.documents;
    project.documentFiles = data.documentFiles;

    project.workplanComplete = false;

    return project;
  }

  convertResponseToProject(data: any): Project {
    let project = new Project();

    project.id = data.id;
    project.name = data.name;
    project.headerTotalExpenses = data.headerTotalExpenses;

    project.bankId = data.bank.id;
    project.bankName = data.bank.name;
    project.bankAccount = data.bankAccount;
    project.bankAgency = data.bankAgency;

    project.budget = data.budget;
    project.description = data.description;
    project.start = data.start;
    project.end = data.end;
    project.notes = data.notes;
    project.amendmentTerm = data.amendmentTerm;

    project.paymentOrder = data.paymentOrder;
    project.projectManager = data.projectManager;
    project.projectCoordinator = data.projectCoordinator

    project.institute = {
      id: data.institute.id,
      name: data.institute.name,
      abbreviation: data.institute.abbreviation,
    };
    project.instituteId = data.institute.id;
    project.instituteAbbreviation = data.institute.abbreviation;

    project.documentFiles = data.documents.map((doc):DocumentFile => {
      return {
        id: doc.id,
        filename: doc.filename,
        type: doc.fileType.name,
        fileType: {
          id: doc.fileType.id,
          name: doc.fileType.name,
        },
        documentType: {
          id: doc.documentType.id,
          name: doc.documentType.name,
        },
        createdAt: doc.created,
        size: doc.size,
        url: doc.url,
        selected: false
      };
    });

    project.documents = project.documentFiles.map((df): number => {
      return df.id;
    });

    project.projectMembers = data.projectMembers.map((pm): ProjectMember => {
      return {
        collaboratorId: pm.collaborator.id,
        collaboratorName: pm.collaborator.name,
        collaboratorImage: pm.collaborator.image,
        collaborator: pm.collaborator,
        projectMemberId: pm.id,
        jobTitle: pm.jobTitle,
      };
    });

    project.workplan = data.workplan;
    project.workplanComplete = data.workplanComplete;

    project.expenses = [];
    project.hrExpenses = [];
    for (const e of data.expenses) {
      if(!e.isHrExpense) {
        e.installments = e.installments?.map(ins => { ins.str_date = formatDateMoment(ins.paymentDate); return ins;});
        project.expenses.push(e);
      } else {
        project.hrExpenses.push(e);
      }
    }

    project.hrPayments = data.hrPayments;

    project.expensesGrid = data.expensesGrid;
    project.marginsGrid = data.marginsGrid;

    return project;
  }

  convertProjectToJSON(project: Project) {
    let body = {
      "name": project.name,
      "description": (project.description) ? project.description : '',
      "start": this.prepareDate(project.start),
      "end": this.prepareDate(project.end),
      "institute": project.instituteId,
      "budget": project.budget,
      "amendmentTerm": project.amendmentTerm,
      "bank": project.bankId,
      "bankAgency": project.bankAgency,
      "bankAccount": project.bankAccount,
      "paymentOrder": project.paymentOrder,
      "projectManager": project.projectManager,
      "projectCoordinator": project.projectCoordinator,
      "notes": (project.notes) ? project.notes : '',
      "projectMembers": this.convertProjectMembersToJSON(project.projectMembers),
      "documents": project.documents
    };

    if (project.id) body['id'] = project.id;

    return body;
  }

  convertProjectMembersToJSON(projectMembers: ProjectMember[]) {
    let members = [];

    projectMembers.forEach((m: ProjectMember) => {
      let auxMember = {
        collaborator: m.collaboratorId,
        jobTitle: m.jobTitle
      };

      members.push(auxMember);
    });

    return members;
  }

  prepareDate(date) {
    let aux = date.split('/');
    let dt = new Date(Number(aux[2]), (Number(aux[1]) - 1), Number(aux[0]));
    let res = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    return res;
  }

}

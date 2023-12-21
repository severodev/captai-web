import { Collaborator } from '../_models/collaborator';
import { EmploymentRelationship } from '../_models/employment-relationship';
import { Benefit } from '../_models/benefit';
import { Dependent } from '../_models/dependent';
import { PaymentInformation } from '../_models/payment-information';
import { DocumentFile } from '../_models/document-file';
import { BenefitType } from '../_models/benefit-type';

export class CollaboratorDto {

  convertResponseToCollaboratorCard(data: any): Collaborator {
    let collaborator = new Collaborator();
    collaborator.id = data.id;
    collaborator.name = data.name;
    collaborator.job = data.job;
    collaborator.image = data.image;
    collaborator.gender = data.gender;
    collaborator.employment = data.employment;
    collaborator.dataPercentage = data.dataPercentage;

    return collaborator;
  }

  convertResponseToCollaborator(data: any): Collaborator {
    let collaborator = new Collaborator();
    collaborator.id = data.id;
    collaborator.active = data.active;
    collaborator.name = data.name;
    collaborator.socialName = data.socialName;
    collaborator.cpf = data.cpf;
    collaborator.rg = data.rg;
    collaborator.birthdate = data.birthDate;
    collaborator.city = data.city;
    collaborator.state = data.state;
    collaborator.rgEmitter = data.rgEmitter;
    collaborator.pis = data.pis;
    collaborator.maritalStatus = data.maritalStatus;
    collaborator.nationality = data.nationality;
    collaborator.email = data.email;
    collaborator.personalEmail = data.personalEmail;
    collaborator.phone = data.phone;
    collaborator.motherName = data.motherName;
    collaborator.fatherName = data.fatherName;
    collaborator.address = data.address;
    collaborator.district = data.neighbourhood;
    collaborator.cep = data.postalCode;
    collaborator.emergencyContactName1 = data.emergencyContact1;
    collaborator.emergencyParentage1 = data.emergencyParentage1;
    collaborator.emergencyContactPhone1 = data.emergencyPhone1;
    collaborator.emergencyContactName2 = data.emergencyContact2;
    collaborator.emergencyParentage2 = data.emergencyParentage2;
    collaborator.emergencyContactPhone2 = data.emergencyPhone2;
    collaborator.activities = data.activities;
    collaborator.image = data.image;
    collaborator.gender = data.gender;
    collaborator.documents = data.documents?.filter(d => d.documentType.category.id != 4).map(d => this.convertResponseToDocument(d));
    collaborator.terms = data.documents?.filter(d => d.documentType.category.id == 4).map(d => this.convertResponseToDocument(d));
    collaborator.payments = data.payRoll;
    // collaborator.benefits = data.benefits;
    collaborator.academicDegree = data.academicDegree;
    collaborator.university = data.educationalInstitution;
    collaborator.lattes = data.lattes;
    collaborator.job = data.job;
    collaborator.employment = data.employment;

    collaborator.dependents = data.dependents?.map(d => this.convertResponseToDependent(d));

    return collaborator;
  }

  convertResponseToCollaboratorDropdown(data: any): Collaborator {
    let collaborator = new Collaborator();
    collaborator.id = data.id;
    collaborator.name = data.name;

    return collaborator;
  }

  convertResponseToEmploymentRelationshipDropdown(data: any): EmploymentRelationship {
    let er = new EmploymentRelationship();
    er.id = data.id;
    er.name = data.name;

    return er;
  }
  
  convertResponseToBenefitsDropdown(data: any) {
    let benefit = new Benefit();
    benefit.id = data.id;
    benefit.name = data.name;

    return benefit;
  }

  convertResponseToPaymentBenefit(data: any): Benefit {
    let benefit = new Benefit();
    benefit.id = data.id;
    benefit.description = data.description;
    benefit.amountValue = data.amountValue;
    benefit.amountType = data.amountType;
    benefit.deductionValue = data.deductionValue;
    benefit.deductionType = data.deductionType;
    benefit.comments = data.comments;
    benefit.hint = data.hint;

    benefit.benefitType = <BenefitType>{
      id : data.benefitType.id,
      code : data.benefitType.code,
      name : data.benefitType.name,
      custom : data.benefitType.custom
    };

    return benefit;
  }

  convertResponseToDependent(data: any): Dependent {
    let dependent = new Dependent();
    dependent.id = data.id;
    dependent.birthdate = data.birthDate;
    dependent.name = data.name;
    dependent.parentage = data.relationship;
    dependent.documents = data.documents.map(d => this.convertResponseToDocument(d));
    return dependent;
  }

  convertResponseToDocument(data: any): DocumentFile {
    let docfile = new DocumentFile();
    docfile.id = data.id;
    docfile.filename = data.filename;
    docfile.size = data.size;
    docfile.url = data.url;
    docfile.createdAt = data.created;
    docfile.documentType = data.documentType;
    docfile.fileType = data.fileType;

    return docfile;
  }

  convertCollaboratorToJSON(collaborator: Collaborator) {
    let body = {
      "id": collaborator.id,
      "name": collaborator.name,
      "socialName": collaborator.socialName,
      "cpf": collaborator.cpf,
      "rg": collaborator.rg,
      "pis": collaborator.pis,
      "rgEmitter": collaborator.rgEmitter,
      "maritalStatus": collaborator.maritalStatus,
      "nationality": collaborator.nationality,
      "birthDate": this.convertDateInputToDateJSON(collaborator.birthdate),
      "email": collaborator.email,
      "personalEmail": collaborator.personalEmail,
      "phone": collaborator.phone,
      "fatherName": collaborator.fatherName,
      "motherName": collaborator.motherName,
      "address": collaborator.address,
      "neighbourhood": collaborator.district,
      "postalCode": collaborator.cep,
      "state": collaborator.state,
      "city": collaborator.city,
      "emergencyContact1": collaborator.emergencyContactName1,
      "emergencyParentage1": collaborator.emergencyParentage1,
      "emergencyPhone1": collaborator.emergencyContactPhone1,
      "emergencyContact2": collaborator.emergencyContactName2,
      "emergencyParentage2": collaborator.emergencyParentage2,
      "emergencyPhone2": collaborator.emergencyContactPhone2,
      "activities": collaborator.activities,
      "gender": collaborator.gender,
      "image": collaborator.image,
      "academicDegree": collaborator.academicDegree,
      "educationalInstitution": collaborator.university,
      "lattes": collaborator.lattes,

      "jobTitle": collaborator.jobTitle,
      
      "dependents": this.convertDependentsToJSON(collaborator.dependents),
      "payRoll": this.convertPaymentsToJSON(collaborator.payments),
      "documents": this.convertDocumentsToJSON(collaborator.documents.concat(collaborator.terms))
    };

    return body;
  }

  convertDependentsToJSON(dependents: Dependent[]) {
    let aux = [];

    dependents.forEach(dp => {
      let dpJSON = {
        "id": dp.id,
        "name": dp.name,
        "relationship": dp.parentage,
        "birthDate": this.convertDateInputToDateJSON(dp.birthdate),
        "documents": dp.documents.map(d => d.id)
      };
      aux.push(dpJSON);
    });

    return aux;
  }

  convertPaymentsToJSON(payments: PaymentInformation[]) {
    let aux = [];

    payments.forEach(p => {
      let pjson = {
        "id": p.id,
        "jobTitle": p.jobTitle,
        "admission": p.admission && this.convertDateInputToDateJSON(p.admission), //todo convert date
        "dismissal": p.dismissal && this.convertDateInputToDateJSON(p.dismissal), //todo convert date
        "project": +p.project.id,
        "institute": +p.institute.id,
        "employmentRelationship": +p.employmentRelationship.id,
        "budgetCategory": +p.budgetCategory.id,
        "salary": +p.salary,
        "workload": p.workload && +p.workload,
        "benefits": p.benefits
      };

      aux.push(pjson);
    });

    return aux;
  }

  convertBenefitsToJSON(benefits: Benefit[]) {
    let aux = [];

    benefits.forEach(benefit => {
      let benefitJSON = {
        "id": benefit.id,
        "description": benefit.description,
        "amountValue": benefit.amountValue,
        "amountType": benefit.amountType,
        "deductionValue": benefit.deductionValue,
        "deductionType": benefit.deductionType,
        "comments": benefit.comments,
        "hint": benefit.hint,
        "benefitType": benefit.benefitType
      };
      aux.push(benefitJSON);
    });

    return aux;
  }

  convertDocumentsToJSON(documents: DocumentFile[]) {
    let aux = [];

    documents.forEach(d => {
      aux.push(d.id);
    });

    return aux;
  }

  convertDateInputToDateJSON(dt: string) {
    let aux = dt.split('/');
    let dtAux = new Date(Number(aux[2]), (Number(aux[1]) - 1), Number(aux[0]));
    let dtJson = dtAux.getFullYear() + '-' + (dtAux.getMonth() + 1) + '-' + dtAux.getDate();
    return dtJson;
  }

}

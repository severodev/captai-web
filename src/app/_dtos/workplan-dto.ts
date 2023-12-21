import { WorkplanCategory } from "../_enums/worplan-category.enum";
import { Validity } from "../_models/validity";
import { WorkplanItem } from "../_models/workplan-item";

export class WorkplanDto {
  convertWorkplanItemToJSON(workplanItem: WorkplanItem) {
    return JSON.stringify(workplanItem);
  }

  convertResponseToValidityDropdown(data: any): Validity {
    let validity = new Validity();

    validity.id = data.id;
    validity.name = data.name;

    return validity;
  }

  convertResponseToWorkplanItem(data: any) {
    const workplanItem = new WorkplanItem();

    workplanItem.id = data.id;
    workplanItem.category = data.category;
    workplanItem.idProject = data.idProject;
    workplanItem.projectStage = data.projectStage;
    workplanItem.rationale = data.rationale;
    workplanItem.value = data.value;
    workplanItem.wpiFundPerMonth = data.wpiFundPerMonth;

    switch (workplanItem.category){
      case WorkplanCategory.RH_DIRECT:
      case WorkplanCategory.RH_INDIRECT: {
        workplanItem.categoryLabel = (workplanItem.category == WorkplanCategory.RH_DIRECT)? "RH Direto" : "RH Indireto";
        workplanItem.itemLabel = data.wpiHR.jobTitle;
        workplanItem.wpiHR.educationLevel = data.wpiHR.educationLevel;
        workplanItem.wpiHR.jobTitle = data.wpiHR.jobTitle;
        workplanItem.wpiHR.workingHours = data.wpiHR.workingHours;
        break;
      }
      case WorkplanCategory.TRIP: {
        workplanItem.categoryLabel = "Viagem";
        workplanItem.itemLabel = data.wpiTrip.event;
        workplanItem.wpiTrip.days = data.wpiTrip.days;
        workplanItem.wpiTrip.event = data.wpiTrip.event;
        workplanItem.wpiTrip.itinerary = data.wpiTrip.itinerary;
        workplanItem.wpiTrip.passengerCpf = data.wpiTrip.passengerCpf;
        workplanItem.wpiTrip.passengerName = data.wpiTrip.passengerName;
        workplanItem.wpiTrip.quantity = data.wpiTrip.quantity;
        workplanItem.wpiTrip.start = this.convertDateJSONToDateInput(data.wpiTrip.start);
        break;
      }
      case WorkplanCategory.TRAINING: {
        workplanItem.categoryLabel = "Treinamento";
        workplanItem.itemLabel = data.wpiTraining.instructorName;
        workplanItem.wpiTraining.cnpj = data.wpiTraining.cnpj;
        workplanItem.wpiTraining.instructorName = data.wpiTraining.instructorName;
        workplanItem.wpiTraining.start = this.convertDateJSONToDateInput(data.wpiTraining.start);
        workplanItem.wpiTraining.end = this.convertDateJSONToDateInput(data.wpiTraining.end);
        workplanItem.wpiTraining.title = data.wpiTraining.title;
        break;
      }
      // case WorkplanCategory.SERVICE_OTHER:
      case WorkplanCategory.SERVICE_TECHNOLOGY: {
        workplanItem.categoryLabel = "Serviços técnicos";
        workplanItem.itemLabel = data.wpiService.contractorName;
        workplanItem.wpiService.cpf = data.wpiService.cpf;
        workplanItem.wpiService.cnpj = data.wpiService.cnpj;
        workplanItem.wpiService.contractorName = data.wpiService.contractorName;
        workplanItem.wpiService.description = data.wpiService.description;
        workplanItem.wpiService.start = this.convertDateJSONToDateInput(data.wpiService.start);
        workplanItem.wpiService.end = this.convertDateJSONToDateInput(data.wpiService.end);
        break;
      }
      // case WorkplanCategory.EQUIPMENT_OTHER:
      case WorkplanCategory.EQUIPMENT_TECHNOLOGY: {
        workplanItem.categoryLabel = "Equipamento";
        workplanItem.itemLabel = data.wpiEquipment.equipmentName;
        workplanItem.wpiEquipment.equipmentModel = data.wpiEquipment.equipmentModel;
        workplanItem.wpiEquipment.equipmentName = data.wpiEquipment.equipmentName;
        workplanItem.wpiEquipment.equipmentType = data.wpiEquipment.equipmentType;
        workplanItem.wpiEquipment.quantity = data.wpiEquipment.quantity;
        workplanItem.wpiEquipment.purchaseDate = this.convertDateJSONToDateInput(data.wpiEquipment.purchaseDate, true);
        break;
      }
      case WorkplanCategory.SOFTWARE_LICENSES: {
        workplanItem.categoryLabel = "Software";
        workplanItem.itemLabel = data.wpiSoftwareLicenses.softwareName;
        workplanItem.wpiSoftwareLicenses.validity = data.wpiSoftwareLicenses.validity;
        workplanItem.wpiSoftwareLicenses.quantity = data.wpiSoftwareLicenses.quantity;
        workplanItem.wpiSoftwareLicenses.softwareName = data.wpiSoftwareLicenses.softwareName;
        workplanItem.wpiSoftwareLicenses.purchaseDate = this.convertDateJSONToDateInput(data.wpiSoftwareLicenses.purchaseDate, true);
        break;
      }
      case WorkplanCategory.EQUIPMENT_AND_SOFTWARE: {
        workplanItem.categoryLabel = "Equipamento e Software";
        workplanItem.itemLabel = data.wpiEquipmentAndSoftware.itemName;
        workplanItem.wpiEquipmentAndSoftware.itemName = data.wpiEquipmentAndSoftware.itemName;
        workplanItem.wpiEquipmentAndSoftware.itemType = data.wpiEquipmentAndSoftware.itemType;
        workplanItem.wpiEquipmentAndSoftware.equipmentModel = data.wpiEquipmentAndSoftware.equipmentModel;
        workplanItem.wpiEquipmentAndSoftware.validity = data.wpiEquipmentAndSoftware.validity;
        workplanItem.wpiEquipmentAndSoftware.quantity = data.wpiEquipmentAndSoftware.quantity;
        workplanItem.wpiEquipmentAndSoftware.purchaseDate = this.convertDateJSONToDateInput(data.wpiEquipmentAndSoftware.purchaseDate, true);
        break;
      }
      case WorkplanCategory.SUPPLIES_CONSUMPTION:
      case WorkplanCategory.SUPPLIES_PROTOTYPE: {
        workplanItem.categoryLabel = (workplanItem.category == WorkplanCategory.SUPPLIES_CONSUMPTION) ? "Material (Consumo)" : "Material (Protótipo)";
        workplanItem.itemLabel = data.wpiSupplies.description;
        workplanItem.wpiSupplies.description = data.wpiSupplies.description;
        workplanItem.wpiSupplies.quantity = data.wpiSupplies.quantity;
        workplanItem.wpiSupplies.accountingAppropriation = data.wpiSupplies.accountingAppropriation;
        break;
      }
      case WorkplanCategory.BOOKS_JOURNALS: {
        workplanItem.categoryLabel = "Livros/Periódicos tecnológicos";
        workplanItem.itemLabel = data.wpiBooksJournals.workTitle;
        workplanItem.wpiBooksJournals.workTitle = data.wpiBooksJournals.workTitle;
        workplanItem.wpiBooksJournals.quantity = data.wpiBooksJournals.quantity;
        break;
      }
      case WorkplanCategory.CIVIL_ENGINEERING: {
        workplanItem.categoryLabel = "Obra civil/Contruções";
        workplanItem.itemLabel = data.wpiCivilEngineering.supplierName;
        workplanItem.wpiCivilEngineering.description = data.wpiCivilEngineering.description;
        workplanItem.wpiCivilEngineering.supplierId = data.wpiCivilEngineering.supplierId;
        workplanItem.wpiCivilEngineering.supplierName = data.wpiCivilEngineering.supplierName;
        workplanItem.wpiCivilEngineering.accountingAppropriation = data.wpiCivilEngineering.accountingAppropriation;
        break;
      }
      // case WorkplanCategory.CORRELATED_INFRASTRUCTURE:
      case WorkplanCategory.CORRELATED_OTHER: {
        workplanItem.categoryLabel = "Outros Correlatos";
        workplanItem.itemLabel = data.wpiCorrelated.supplierName;
        workplanItem.wpiCorrelated.description = data.wpiCorrelated.description;
        workplanItem.wpiCorrelated.supplierId = data.wpiCorrelated.supplierId;
        workplanItem.wpiCorrelated.supplierName = data.wpiCorrelated.supplierName;
        workplanItem.wpiCorrelated.accountingAppropriation = data.wpiCorrelated.accountingAppropriation;
        break;
      }
      case WorkplanCategory.INSTITUTE_COST: {
        workplanItem.categoryLabel = "Custos incorridos pela instituiçao";
        workplanItem.itemLabel = data.wpiInstituteCost.description;
        workplanItem.wpiInstituteCost.description = data.wpiInstituteCost.description;
        break;
      }
      default: {
        break;
      }
    }

    return workplanItem;
  }

  convertDateJSONToDateInput(dt: string, onlyMonthYear = false) {
    let dtAux = dt.split('-');

    if(onlyMonthYear) {
      return dtAux[0] + '/' + dtAux[1]
    }

    return dtAux[2] + '/' + dtAux[1] + '/' + dtAux[0];
  }
}

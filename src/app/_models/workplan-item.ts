import { WorkplanCategory } from "../_enums/worplan-category.enum";
import { WpiFundPerMonth } from "./wpi-fund-per-month"

export class WorkplanItem {
  id?: number;
  idProject?: number;
  category?: WorkplanCategory;
  value?: number;
  rationale?: number;
  projectStage?: string;
  wpiFundPerMonth: WpiFundPerMonth[];

  itemLabel?: string; // front-end
  categoryLabel?: string; // front-end

  wpiHR?: {
    jobTitle: string,
    educationLevel: string,
    workingHours: number,
  };

  wpiTrip?: {
    event: string,
    itinerary: string,
    passengerName: string,
    passengerCpf: string,
    start: string,
    days: number,
    quantity: number,
  };

  wpiTraining?: {
    title: string,
    instructorName: string,
    cnpj: string,
    start: string,
    end: string,
  };

  wpiService?: {
    contractorName: string,
    cpf: string,
    cnpj: string,
    description: string,
    start: string,
    end: string,
  };

  wpiEquipment?: {
    equipmentName: string,
    equipmentType: string,
    equipmentModel: string,
    quantity: number,
    purchaseDate: string
  };

  wpiSoftwareLicenses?: {
    softwareName: string,
    validity: number,
    quantity: number,
    purchaseDate: string
  };

  wpiEquipmentAndSoftware?: {
    itemName: string,
    itemType: string,
    equipmentModel: string,
    validity: number,
    quantity: number,
    purchaseDate: string
  };

  wpiSupplies?: {
    description: string,
    quantity: number,
    accountingAppropriation: string
  };

  wpiBooksJournals?: {
    workTitle: string,
    quantity: number,
  };

  wpiCivilEngineering?: {
    supplierId: number,
    supplierName: string,
    description: string,
    accountingAppropriation: string
  };

  wpiCorrelated?: {
    supplierId: number,
    supplierName: string,
    description: string,
    accountingAppropriation: string
  };

  wpiInstituteCost?: {
    description: string,
  };

  constructor() {
    this.wpiHR = {
      jobTitle: null,
      educationLevel: null,
      workingHours: null,
    };

    this.wpiFundPerMonth = [];

    this.wpiTrip = {
      event: null,
      itinerary: null,
      passengerName: null,
      passengerCpf: null,
      start: null,
      days: null,
      quantity: null,
    };

    this.wpiTraining = {
      title: null,
      instructorName: null,
      cnpj: null,
      start: null,
      end: null,
    };

    this.wpiService = {
      contractorName: null,
      cpf: null,
      cnpj: null,
      description: null,
      start: null,
      end: null,
    };

    this.wpiEquipment = {
      equipmentName: null,
      equipmentType: null,
      equipmentModel: null,
      quantity: null,
      purchaseDate: null
    };

    this.wpiSoftwareLicenses = {
      softwareName: null,
      validity: null,
      quantity: null,
      purchaseDate: null
    };

    this.wpiEquipmentAndSoftware = {
      itemName: null,
      itemType: null,
      equipmentModel: null,
      validity: null,
      quantity: null,
      purchaseDate: null
    };

    this.wpiSupplies = {
      description: null,
      quantity: null,
      accountingAppropriation: null
    };

    this.wpiBooksJournals = {
      workTitle: null,
      quantity: null,
    };

    this.wpiCivilEngineering = {
      supplierId: null,
      supplierName: null,
      description: null,
      accountingAppropriation: null
    };

    this.wpiCorrelated = {
      supplierId: null,
      supplierName: null,
      description: null,
      accountingAppropriation: null,
    };

    this.wpiInstituteCost = {
      description: null,
    };
  }
}

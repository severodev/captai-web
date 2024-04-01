export interface PageRequest {
  totalItems?: number;
  itemsPerPage?: number;
  totalPages?: number;    
  currentPage?: number;
}

export interface EditalFilter {
  agency?: string;
  title?: string;
  financingValue?: string;
  created?: number;   
}

export interface UserFilter {
  name?: string;
  email?: string;
  cpfCnpj?: string; 
}
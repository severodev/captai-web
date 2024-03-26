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
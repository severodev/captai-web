export interface PageRequest {
  totalItems?: number;
  itemsPerPage?: number;
  totalPages?: number;    
  currentPage?: number;
}

export interface EditalFilter {
  agency?: string;
  agencyList?: any;
  title?: string;
  financingValueHigh: number;
  financingValueLow: number;
  maturity?: string;
  submission?: string;
  areaList?: [];
  created?: number;
  by?: string;
  order?: string;
}

export interface UserFilter {
  id?: number;
  name?: string;
  email?: string;
  roleId?: number;
  cpfCnpj?: string;
  by?: string;
  order?: string;
}

export interface SegmentFilter {
  name?: string;
  by?: string;
  order?: string;
}

export interface ActiviteFilter {
  ids?: number[];
  name?: string;
  by?: string;
  order?: string;
}



export interface StateFilter {
  id?: number;
  neme?: string;
  abbreviation?: string;
  country?: string;
  by?: string;
  order?: string;
}
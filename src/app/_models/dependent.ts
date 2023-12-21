import { DocumentFile } from './document-file';

export class Dependent {
  id?: number;
  name?: string;
  parentage?: string;
  birthdate?: string;
  doctype?: string;
  docId?: string;
  doc?: DocumentFile;
  selected?: boolean;
  documents?: DocumentFile[];
}

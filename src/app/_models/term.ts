import { DocumentFile } from './document-file';

export class Term {
  id?: number;
  name?: string;
  doctype?: string;
  document?: DocumentFile;
  createdAt?: string;
  size?: string;
  selected?: boolean;
}

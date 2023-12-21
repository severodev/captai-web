import { DocType } from "./doc-type";

export class DocumentFile {
  id?: number;
  filename?: string;
  type?: string;
  documentType: DocType;
  fileType: DocType;
  createdAt?: string;
  size?: string;
  url?: string;
  selected?: boolean;
}

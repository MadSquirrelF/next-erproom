import { INode } from "@/src/entities/Node";

export interface ISchema {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  blocks?: INode[] | [];
}

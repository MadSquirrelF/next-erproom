import { INode } from "@/src/entities/Node";
import { ISchema } from "@/src/entities/Schema";

export interface IAllSchemasData {
  schemes: ISchema[];
}

export interface IAllBlocksSchemasData {
  orgboard_blocks: Omit<INode[], "all_children_blocks">;
}

export interface ISchemaDataById {
  scheme: ISchema;
}

export interface ISchemasResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface ISchemasResponseById extends ISchemasResponse {
  data: ISchemaDataById;
}

export interface IAllSchemasResponse extends ISchemasResponse {
  data: IAllSchemasData;
}

export interface IAllBlocksSchemasResponse extends ISchemasResponse {
  data: IAllBlocksSchemasData;
}

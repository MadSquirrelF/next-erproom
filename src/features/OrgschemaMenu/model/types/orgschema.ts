import { INode } from "@/src/entities/Node";
import { IRoute } from "@/src/entities/Route/model/types/route";
import { ISchema } from "@/src/entities/Schema";

export interface IAllSchemasData {
  schemes: ISchema[];
}

export interface IAllBlocksSchemasData {
  orgboard_blocks: Omit<INode[], "all_children_blocks"> | [];
}

export interface ISchemaDataById {
  scheme: ISchema;
}

export interface IRouteResponseId {
  flow_id: number;
}

export interface IRouteFlowResponse {
  flow: IRoute;
}

export interface IBlockSchemaId {
  orgboard_block_id: number;
}

export interface IRoutesAllData {
  flows: IRoute[];
}

export interface ISchemaId {
  orgboard_id: number;
}

export interface ISchemaIdSecondary {
  scheme_id: number;
}

export interface ISchemasResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface ISchemasResponseById extends ISchemasResponse {
  data: ISchemaDataById;
}

export interface IRouteById extends ISchemasResponse {
  data: IRouteFlowResponse;
}

export interface IAllSchemasResponse extends ISchemasResponse {
  data: IAllSchemasData;
}

export interface IAllBlocksSchemasResponse extends ISchemasResponse {
  data: IAllBlocksSchemasData;
}

export interface ICreateBlockSchemasResponse extends ISchemasResponse {
  data: IBlockSchemaId;
}

export interface ICreateSchemasResponse extends ISchemasResponse {
  data: ISchemaIdSecondary;
}

export interface IAllRoutesResponse extends ISchemasResponse {
  data: IRoutesAllData;
}

export interface IRouteCreateResponse extends ISchemasResponse {
  data: IRouteResponseId;
}

import { INode } from "@/src/entities/Node";
import { INodeShort } from "@/src/entities/Node/model/types/node";
import { IFlowStep, IRoute } from "@/src/entities/Route/model/types/route";
import { ISchema } from "@/src/entities/Schema";

export interface IAllSchemasData {
  schemes: ISchema[];
}

export interface IAllBlocks {
  all_blocks: INodeShort[];
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

export interface IRouteStepsDataArray {
  flow_steps: IFlowStep[];
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

export interface ISchemaResponseWithData<T> extends ISchemasResponse {
  data: T;
}

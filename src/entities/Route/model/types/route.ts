import { INode } from "@/src/entities/Node/model/types/node";

export enum IRouteAction {
  ADD = "ADD",
  UPDATE = "UPDATE",
  NONE = "NONE",
}

export interface IFlowStepSettings {
  id: number;
  orgboard_step_id: number;
  success_step: number;
  success_status: number;
  fail_step: number | null;
  fail_status: number;
}

export interface IFlowStep {
  id: number;
  orgboard_flow_id: number;
  orgboard_block_id: number;
  orgboard_block_end_id: number;
  first_step: boolean;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  setting: IFlowStepSettings;
  before_block: INode;
  after_block: INode;
  all_flow_step_next: IFlowStep[] | [];
}

export interface IFlowStepNoChildren {
  id: number;
  orgboard_flow_id: number;
  orgboard_block_id: number;
  orgboard_block_end_id: number;
  first_step: boolean;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  setting: IFlowStepSettings;
  before_block: INode;
  after_block: INode;
}

export interface IRoute {
  id: number;
  orgboard_flow_type_id: number;
  name: string;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  flowSteps?: IFlowStep[];
}

export interface IFlowStepFormData {
  description: string;
  orgboard_block_id: number;
  orgboard_block_end_id: number;
  success_step: number | null;
  success_status: number;
  fail_step: number | null;
  fail_status: number;
  first_step: boolean;
}

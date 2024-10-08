import { IUser } from "@/src/entities/User/model/types/user";

export interface INodeSetting {
  id: number;
  orgboard_block_id: number;
  color_block: string;
  color_branch: string;
  sort: number;
  is_together: boolean;
}

export interface INodeEmployee {
  id: number;
  orgboard_block_id: number;
  user_id: number;
  user: IUser;
}
export interface INode {
  id: number;
  orgboard_scheme_id: number;
  parent_id: number;
  name: string;
  description: string;
  description_secondary: string;
  cloud: string;
  mail: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  setting: INodeSetting;
  employee: INodeEmployee[];
  all_children_blocks: INode[] | [];
}

export interface INodeShort {
  id: number;
  orgboard_scheme_id: number;
  parent_id: number;
  name: string;
  scheme_name: {
    id: number;
    name: string;
  };
}

export interface INodeNoChildren extends Omit<INode, "all_children_blocks"> {}

export interface INodeData {
  id: number;
  parent_id: number;
  name: string;
  description: string;
  description_secondary: string;
  cloud?: string;
  mail?: string;
  color?: string;
  sort?: number;
  is_together?: number;
  isColorClear?: boolean;
}

import {
  IAllBlocksSchemasResponse,
  IAllSchemasResponse,
  ICreateBlockSchemasResponse,
  ISchemasResponse,
  ISchemasResponseById,
} from "../types/orgschema";

import { INodeData } from "@/src/entities/Node/model/types/node";
import { API_URL, axiosClassic } from "@/src/shared/api/api.config";

export const OrgschemaService = {
  async getAllSchemas() {
    const { data } = await axiosClassic.get<IAllSchemasResponse>(
      API_URL.orgschema(),
    );

    return data.data.schemes;
  },

  async getSchemaById(schemaId?: number) {
    const { data } = await axiosClassic.get<ISchemasResponseById>(
      API_URL.orgschema(`/${schemaId}`),
      {
        params: {
          optional_show: "blocks",
        },
      },
    );

    return data.data.scheme;
  },

  async getAllBlocksSchemeById(schemaId?: number) {
    const { data } = await axiosClassic.get<IAllBlocksSchemasResponse>(
      API_URL.orgschema(`/${schemaId}/blocks`),
    );

    return data.data.orgboard_blocks;
  },

  //data add body
  async createBlock(schemaId?: number, blockData?: Partial<INodeData>) {
    const { data } = await axiosClassic.post<ICreateBlockSchemasResponse>(
      API_URL.orgschema(`/${schemaId}/blocks`),
      {
        name: blockData?.name,
        description: blockData?.description,
        description_secondary: blockData?.description_secondary,
        cloud: blockData?.cloud,
        mail: blockData?.mail,
        sort: blockData?.sort,
        parent_id: blockData?.parent_id,
        is_together: blockData?.is_together,
        color_block: blockData?.color,
      },
    );

    return data.data.orgboard_block_id;
  },

  //data add body
  async updateBlock(schemaId?: number, blockId?: number) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.orgschema(`/${schemaId}/blocks/${blockId}`),
    );

    return data;
  },

  async deleteBlock(schemaId?: number, blockId?: number) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.orgschema(`/${schemaId}/blocks/${blockId}`),
      {
        _method: "DELETE",
      },
    );

    return data;
  },
};

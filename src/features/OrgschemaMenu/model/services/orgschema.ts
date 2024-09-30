import {
  IAllBlocksSchemasResponse,
  IAllSchemasResponse,
  ICreateBlockSchemasResponse,
  ICreateSchemasResponse,
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
        color_block: blockData?.isColorClear ? "#f" : blockData?.color,
      },
    );

    return data.data.orgboard_block_id;
  },

  async createSchema(name?: string) {
    const { data } = await axiosClassic.post<ICreateSchemasResponse>(
      API_URL.orgschema(``),
      {
        name: name,
      },
    );

    console.log(data);

    return data.data.scheme_id;
  },

  async updateSchema(schemaId?: number, name?: string) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.orgschema(`/${schemaId}`),
      {
        name: name,
        _method: "PATCH",
      },
    );

    return data;
  },

  async deleteSchema(schemaId?: number) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.orgschema(`/${schemaId}`),
      {
        _method: "DELETE",
      },
    );

    return data;
  },

  async updateBlock(
    schemaId?: number,
    blockId?: number,
    blockData?: Partial<INodeData>,
  ) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.orgschema(`/${schemaId}/blocks/${blockId}`),
      {
        name: blockData?.name,
        description: blockData?.description,
        description_secondary: blockData?.description_secondary,
        cloud: blockData?.cloud,
        mail: blockData?.mail,
        sort: blockData?.sort,
        parent_id: blockData?.parent_id,
        is_together: blockData?.is_together,
        color_block: blockData?.isColorClear
          ? "#f"
          : blockData?.color
            ? blockData.color
            : "#DA2A2A",
        _method: "PATCH",
      },
    );

    return data;
  },

  async updateUsers(
    schemaId?: number,
    blockId?: number,
    users?: number[],
    name?: string,
  ) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.orgschema(`/${schemaId}/blocks/${blockId}`),
      {
        name: name,
        employee: JSON.stringify(users),
        _method: "PATCH",
      },
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

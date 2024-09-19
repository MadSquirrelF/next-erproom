import {
  IAllBlocksSchemasResponse,
  IAllSchemasResponse,
  ISchemasResponseById,
} from "../types/orgschema";

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
};

import {
  IAllBlocks,
  IAllBlocksSchemasData,
  IAllSchemasData,
  IBlockSchemaId,
  IRouteFlowResponse,
  IRouteResponseId,
  IRoutesAllData,
  IRouteStepsDataArray,
  ISchemaDataById,
  ISchemaIdSecondary,
  ISchemaResponseWithData,
  ISchemasResponse,
} from "../types/orgschema";

import { INodeData } from "@/src/entities/Node/model/types/node";
import { IFlowStepFormData } from "@/src/entities/Route/model/types/route";
import { API_URL, axiosClassic } from "@/src/shared/api/api.config";

export const OrgschemaService = {
  async getAllSchemas() {
    const { data } = await axiosClassic.get<
      ISchemaResponseWithData<IAllSchemasData>
    >(API_URL.orgschema());

    return data.data.schemes;
  },

  async getAllRoutes() {
    const { data } = await axiosClassic.get<
      ISchemaResponseWithData<IRoutesAllData>
    >(API_URL.routes());

    return data.data.flows;
  },

  async getAllBlocks() {
    const { data } = await axiosClassic.get<
      ISchemaResponseWithData<IAllBlocks>
    >(API_URL.blocks());

    return data.data.all_blocks;
  },

  async getAllRouteSteps(routeId?: number) {
    const { data } = await axiosClassic.get<
      ISchemaResponseWithData<IRouteStepsDataArray>
    >(API_URL.routes(`/${routeId}/steps`));

    return data.data.flow_steps;
  },

  async getSchemaById(schemaId?: number) {
    const { data } = await axiosClassic.get<
      ISchemaResponseWithData<ISchemaDataById>
    >(API_URL.orgschema(`/${schemaId}`), {
      params: {
        optional_show: "blocks",
      },
    });

    return data.data.scheme;
  },

  async getAllBlocksSchemeById(schemaId?: number) {
    const { data } = await axiosClassic.get<
      ISchemaResponseWithData<IAllBlocksSchemasData>
    >(API_URL.orgschema(`/${schemaId}/blocks`));

    return data.data.orgboard_blocks;
  },

  //data add body
  async createBlock(schemaId?: number, blockData?: Partial<INodeData>) {
    const { data } = await axiosClassic.post<
      ISchemaResponseWithData<IBlockSchemaId>
    >(API_URL.orgschema(`/${schemaId}/blocks`), {
      name: blockData?.name,
      description: blockData?.description,
      description_secondary: blockData?.description_secondary,
      cloud: blockData?.cloud,
      mail: blockData?.mail,
      sort: blockData?.sort,
      parent_id: blockData?.parent_id,
      is_together:
        blockData?.is_together === 0 || blockData?.is_together === 1
          ? blockData.is_together
          : 0,
      color_block: blockData?.isColorClear
        ? "#f"
        : blockData?.color
          ? blockData.color
          : "#DA2A2A",
    });

    return data.data.orgboard_block_id;
  },

  async createSchema(name?: string) {
    const { data } = await axiosClassic.post<
      ISchemaResponseWithData<ISchemaIdSecondary>
    >(API_URL.orgschema(``), {
      name: name,
    });

    return data.data.scheme_id;
  },

  async getRouteById(routeId?: number) {
    const { data } = await axiosClassic.get<
      ISchemaResponseWithData<IRouteFlowResponse>
    >(API_URL.routes(`/${routeId}`), {
      params: {
        optional_show: "flowSteps",
      },
    });

    return data.data.flow;
  },

  async createRoute(name: string, description: string) {
    const { data } = await axiosClassic.post<
      ISchemaResponseWithData<IRouteResponseId>
    >(API_URL.routes(``), {
      name: name,
      description: description,
      orgboard_flow_type_id: 1,
    });

    return data.data.flow_id;
  },

  async createFlowStep(
    routeId?: number,
    formData?: Partial<IFlowStepFormData>,
  ) {
    const { data } = await axiosClassic.post<
      ISchemaResponseWithData<{
        flow_step_id: number;
      }>
    >(API_URL.routes(`/${routeId}/steps`), {
      description: formData?.description || "",
      orgboard_block_id: formData?.orgboard_block_id,
      orgboard_block_end_id: formData?.orgboard_block_end_id,
      success_step: null,
      success_status: formData?.success_status,
      fail_step: null,
      fail_status: formData?.fail_status,
      first_step: formData?.first_step,
    });

    return data.data.flow_step_id;
  },

  async updateFlowStep(
    routeId?: number,
    stepId?: number,
    formData?: Partial<IFlowStepFormData>,
  ) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.routes(`/${routeId}/steps/${stepId}`),
      {
        description: formData?.description || "",
        orgboard_block_id: formData?.orgboard_block_id,
        orgboard_block_end_id: formData?.orgboard_block_end_id,
        success_step: formData?.success_step,
        success_status: formData?.success_status,
        fail_step: null,
        fail_status: formData?.fail_status,
        _method: "PATCH",
      },
    );

    return data;
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

  async updateRoute(routeId?: number, name?: string, description?: string) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.routes(`/${routeId}`),
      {
        name: name,
        description: description,
        orgboard_flow_type_id: 1,
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

  async deleteFlowStep(routeId?: number, flowStepId?: number) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.routes(`/${routeId}/steps/${flowStepId}`),
      {
        _method: "DELETE",
      },
    );

    return data;
  },

  async deleteRoute(routeId?: number) {
    const { data } = await axiosClassic.post<ISchemasResponse>(
      API_URL.routes(`/${routeId}`),
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

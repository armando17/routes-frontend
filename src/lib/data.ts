"use server";
import { revalidatePath } from "next/cache";
import { axiosDelete, get, patch, post } from "./axiosController";
import { ApiResponse, ParamsInterface } from "./definitions";
import { buildParamsUrl } from "./util";

//ROUTES
export const getRoutes = async (params: ParamsInterface) => {
  const formattedParams = buildParamsUrl(params);
  const response: ApiResponse<Array<any>> = await get(
    `/routes${formattedParams}`,
  );
  return response;
};

export const getRoute = async (id: string) => {
  const response: ApiResponse<any> = await get(`/routes/${id}`);
  return response;
};

export const getRouteExternal = async (id: string) => {
  const response: ApiResponse<any> = await get(`/routes/${id}/external`);
  return response;
};

export const editRoute = async (id: string, data: any) => {
  const response: ApiResponse<any> = await patch(`/routes/${id}`, data);
  revalidatePath("/dashboard/routes");
  return response;
};

export const createRoute = async (data: any) => {
  const response: ApiResponse<any> = await post("/routes", data);
  revalidatePath("/dashboard/routes");
  return response;
};

export const deletRoute = async (id: string) => {
  const response: ApiResponse<any> = await axiosDelete(`/routes/${id}`);
  revalidatePath("/dashboard/routes");
  return response;
};

//DRIVERS
export const getDrivers = async (params: ParamsInterface) => {
  const formattedParams = buildParamsUrl(params);
  const response: ApiResponse<Array<any>> = await get(
    `/drivers${formattedParams}`,
  );
  return response;
};

import { auth } from "@/auth";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { getValidationError } from "./utils";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

const ApiClient = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (request) => {
    let session: any;
    if (typeof window != "undefined") {
      session = await getSession();
    } else {
      session = await auth();
    }
    if (session) {
      request.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      if (!response?.data.data && typeof response?.data != "string") {
        const data = response.data;
        //ajustar la respuesta
        //response.data = {};
        response.data.data = data;
      }
      return response;
    },
    (error) => {
      if (error?.response?.status == 401) {
        if (typeof window != "undefined") {
          signOut();
        } else {
          //Lo ideal sería que redirigiera al url anterior o que hiciera signOut
          redirect("/login");
        }
      }
      return {
        data: {
          errorStatus: error.response?.status,
          errorMessage: getValidationError({
            response: error.response?.data,
          }),
        },
      };
    },
  );

  return instance;
};

const apiClient = ApiClient();

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.get(url, config);
  return response.data;
}

export async function post<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig | any,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.post(url, data, config);
  return response.data;
}

export async function axiosDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.delete(url, config);
  return response.data;
}

export async function patch<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.patch(url, data, config);
  return response.data;
}

export async function put<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.put(url, data, config);
  return response.data;
}

import Axios from 'axios';
import { z } from 'zod';

type TFetchInput<DataType> = {
  url: string;
  schema?: z.ZodType<DataType>;
  options?: RequestInit;
};

export const fetchWrapper = async <DataType>({
  url,
  schema = z.any() as z.ZodType<DataType>,
  options = {},
}: TFetchInput<DataType>): Promise<TFetchOutput<DataType>> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
  });

  const data = await response?.json();

  // VALIDATE RESPONSE WITH ZOD
  try {
    const parsedData = schema.parse(data);
    return {
      response,
      data: parsedData,
    };
  } catch (error) {
    // puede manejar este error como desee
    throw new Error(`Invalid response structure: ${error}`);
  }
};

type TFetchOutput<DataType> = {
  response: Response;
  data: DataType;
};

export const api = {
  get: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: TFetchInput<DataType>) => fetchWrapper({ url, schema, options }),

  post: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: TFetchInput<DataType>) =>
    fetchWrapper({
      url,
      schema,
      options: {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // add access token if needed
          // 'x-access-token':
          //   typeof window !== 'undefined'
          //     ? localStorage.getItem('token') ?? undefined
          //     : undefined,
          // add access token if needed
        } as HeadersInit,
      },
    }),

  put: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: TFetchInput<DataType>) =>
    fetchWrapper({
      url,
      schema,
      options: {
        ...options,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // add access token if needed
          // 'x-access-token':
          //   typeof window !== 'undefined'
          //     ? localStorage.getItem('token') ?? undefined
          //     : undefined,
          // add access token if needed
        } as HeadersInit,
      },
    }),

  delete: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: TFetchInput<DataType>) =>
    fetchWrapper({
      url,
      schema,
      options: {
        ...options,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // add access token if needed
          // 'x-access-token':
          //   typeof window !== 'undefined'
          //     ? localStorage.getItem('token') ?? undefined
          //     : undefined,
        } as HeadersInit,
      },
    }),
};

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token':
      typeof window !== 'undefined' ? localStorage.getItem('token') : undefined,
  },
});

export const axiosS3 = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'x-amz-acl': 'public-read',
  },
});

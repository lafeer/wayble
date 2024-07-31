import axios, { AxiosRequestConfig, Method } from 'axios';

const jobsApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const request = async <T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await jobsApi.request<T>({
    method,
    url,
    data,
    ...config,
  });

  return response.data;
};

export const fetchJobs = async () => request<IJob[]>('GET', '/jobs');

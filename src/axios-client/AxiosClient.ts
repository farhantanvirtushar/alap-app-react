import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BACKEND_API;

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "",
};

axiosClient.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const token: string | null = localStorage.getItem("token");
  var headers: AxiosRequestHeaders = config.headers!;
  headers["Authorization"] = "Bearer " + token;
  config.headers = headers;
  return config;
});
//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

// axiosClient.defaults.withCredentials = true;

export function getRequest<T>(url: string) {
  return axiosClient.get<T>(url).then((response) => response.data);
}

export function postRequest<T>(url: string, payload: any) {
  return axiosClient.post<T>(url, payload).then((response) => response.data);
}

export function patchRequest<T>(url: string, payload: any) {
  return axiosClient.patch<T>(url, payload).then((response) => response.data);
}
export function putRequest<T>(url: string, payload: any) {
  return axiosClient.put<T>(url, payload).then((response) => response.data);
}

export function deleteRequest(url: string) {
  return axiosClient.delete(url).then((response) => response.data);
}

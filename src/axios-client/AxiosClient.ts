import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BACKEND_API;

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

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

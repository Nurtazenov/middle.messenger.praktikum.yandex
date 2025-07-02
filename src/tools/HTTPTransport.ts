import ErrorModal from "../components/Modal/ErrorModal";

interface Options {
  headers?: Record<string, string>;
  data?: any;
  method: keyof typeof METHODS;
  timeout?: number;
}

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const;

type StringKeyObject = {
  [key: string]: string | StringKeyObject;
};

function queryStringify(obj: StringKeyObject): string {
  const queryString = Object.entries(obj).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`;
    } else if (typeof value === "object" && value !== null) {
      return `${encodeURIComponent(key)}=${encodeURIComponent("[object Object]")}`;
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
  });
  return queryString.join("&");
}

class HTTPTransport {
   static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  request<Response>(
    url: string,
    options: Options,
    timeout = 5000
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, url);

      if (options.headers) {
        Object.entries(options.headers).forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          if (xhr.status === 400) {
            reject(xhr.response); 
          } else {
            reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
          }
        }
      };

      xhr.onerror = function () {
        reject(new Error(`Request failed with status ${xhr.status}`));
        ErrorModal(`Request failed with status ${xhr.status}`);
      };

      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.responseType = "json";

      xhr.ontimeout = function () {
        reject(new Error("Request timed out"));
      };

      if (options.method === METHODS.GET) {
        xhr.send();
      } else {
        if (options.data instanceof FormData) {
          xhr.send(options.data);
        } else {
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(options.data));
        }
      }
    });
  }

  get<Response>(url: string, options?: Omit<Options, "method">): Promise<Response> {
    let query = "";
    if (options?.data) {
      query += `?${queryStringify(options.data)}`;
    }
    return this.request<Response>(this.endpoint + `${url}${query}`, {
      ...options,
      method: METHODS.GET,
    });
  }

  put<Response>(path: string = "/", data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      data,
      method: METHODS.PUT,
    });
  }

  post<Response>(path: string = "/", data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      data,
      method: METHODS.POST,
    });
  }

  delete<Response>(path: string = "/", data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      data,
      method: METHODS.DELETE,
    });
  }
}

export { HTTPTransport };



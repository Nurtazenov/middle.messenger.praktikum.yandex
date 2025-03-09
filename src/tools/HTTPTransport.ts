enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
};

function queryStringify(data: Record<string, string | number | boolean>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key:any, index) => `${result}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  get(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  post(url: string, options: Options = { method: METHOD.POST }): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: Options = { method: METHOD.PUT }): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  delete(url: string, options: Options = { method: METHOD.DELETE }): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  private request(url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      if (!method) {
        reject(new Error('No method specified'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        isGet && data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => resolve(xhr);
      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Request failed'));

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error('Request timed out'));

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

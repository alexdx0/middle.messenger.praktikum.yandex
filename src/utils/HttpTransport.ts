enum HttpMethodsEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

interface HttpMethodOptions {
  headers: Record<string, string>;
  method: HttpMethodsEnum;
  data: Record<string, unknown>;
  timeout: number;
}
type HttpMethod = (url: string, options: HttpMethodOptions) => Promise<unknown>;

function queryStringify(data: Record<string, unknown>) {
  return "?" + Object.keys(data).map((key) => key + "=" + data[key]).join("&");
}

export class HTTPTransport {
  get: HttpMethod = (url, options) => {
    return this.request(url, { ...options, method: HttpMethodsEnum.GET }, options.timeout);
  };

  post: HttpMethod = (url, options) => {
    return this.request(url, { ...options, method: HttpMethodsEnum.POST }, options.timeout);
  };

  put: HttpMethod = (url, options) => {
    return this.request(url, { ...options, method: HttpMethodsEnum.PUT }, options.timeout);
  };

  delete: HttpMethod = (url, options) => {
    return this.request(url, { ...options, method: HttpMethodsEnum.DELETE }, options.timeout);
  };

  request = (url: string, options: HttpMethodOptions, timeout = 1000) => {
    const { headers, method, data } = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === HttpMethodsEnum.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      // TODO types
      // if (isGet || !data) {
      //   xhr.send();
      // } else {
      //   xhr.send(data);
      // }
    });
  };
}

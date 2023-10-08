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
type HttpMethod = (url: string, options?: HttpMethodOptions) => Promise<unknown>;

function queryStringify(data: Record<string, unknown>) {
  return "?" + Object.keys(data).map((key) => key + "=" + data[key]).join("&");
}

const defaultHttpOptions: HttpMethodOptions = {
  headers: {},
  data: {},
  method: HttpMethodsEnum.GET,
  timeout: 10000,
};

class HTTPTransport {
  get: HttpMethod = (url: string, options: HttpMethodOptions = defaultHttpOptions) => {
    return this.request(url, { ...options, method: HttpMethodsEnum.GET }, options.timeout);
  };

  post: HttpMethod = (url, options: HttpMethodOptions = defaultHttpOptions) => {
    return this.request(url, { ...options, method: HttpMethodsEnum.POST }, options.timeout);
  };

  put: HttpMethod = (url: string, options: HttpMethodOptions = defaultHttpOptions) => {
    return this.request(url, { ...options, method: HttpMethodsEnum.PUT }, options.timeout);
  };

  delete: HttpMethod = (url: string, options: HttpMethodOptions = defaultHttpOptions) => {
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
      xhr.withCredentials = true;
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

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

const instance = new HTTPTransport();
export default instance;

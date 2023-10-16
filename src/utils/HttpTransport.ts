enum HttpMethodsEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

interface HttpMethodOptions {
  headers?: Record<string, string>;
  method?: HttpMethodsEnum;
  data?: Record<string, unknown>;
  timeout?: number;
}
// type HttpMethod<Tresp> = (url: string, options?: HttpMethodOptions) => Promise<{status: number, response: Tresp}>;
type HttpMethodResp<Tresp> = Promise<{status: number, response: Tresp}>;

function queryStringify(data: Record<string, unknown>) {
  return "?" + Object.keys(data).map((key) => key + "=" + data[key]).join("&");
}

const defaultHttpOptions: HttpMethodOptions = {
  headers: {},
  data: {},
  method: HttpMethodsEnum.GET,
  timeout: 5000,
};

class HTTPTransport {
  get<Tresp>(url: string, options: HttpMethodOptions = defaultHttpOptions): HttpMethodResp<Tresp> {
    return this.request<Tresp>(url, { ...options, method: HttpMethodsEnum.GET }, options.timeout);
  }

  post<Tresp>(url: string, options: HttpMethodOptions = defaultHttpOptions): HttpMethodResp<Tresp> {
    return this.request(url,
      {
        ...Object.assign(defaultHttpOptions, options),
        method: HttpMethodsEnum.POST,
      }, options.timeout);
  }

  put<Tresp>(url: string, options: HttpMethodOptions = defaultHttpOptions): HttpMethodResp<Tresp> {
    return this.request(url, { ...options, method: HttpMethodsEnum.PUT }, options.timeout);
  }

  delete<Tresp>(url: string, options: HttpMethodOptions = defaultHttpOptions): HttpMethodResp<Tresp> {
    return this.request(url, { ...options, method: HttpMethodsEnum.DELETE }, options.timeout);
  }

  request = <Tresp>(url: string, options: HttpMethodOptions, timeout = 1000): HttpMethodResp<Tresp> => {
    const { headers = {}, method, data } = options;

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

      xhr.onload = function(e: ProgressEvent<EventTarget>) {
        const request = e.target as XMLHttpRequest;
        if (request.status !== 200) {
          reject(new Error(
            `Ошибка ${request.status.toString()} : ${JSON.parse(request.response).reason}`));
          return;
        }

        let response;
        try {
          response = JSON.parse(xhr.response);
        } catch {
          response = xhr.response;
        }

        resolve({
          status: xhr.status,
          response,
        });
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      try {
        if (isGet || !data) {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(data));
        }
      } catch (e) {
        reject(e);
      }
    });
  };
}

const instance = new HTTPTransport();
export { instance as HTTP };

import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from "sinon"
import { expect } from "chai"
import { METHODS} from "./HTTPTransport"
export interface Options {
  headers?: Record<string, string>;
  data?: any;
  method?: string;
  timeout?: number;
}
type HTTPMethod = <R = unknown>(url: string, options?: Options) => Promise<R>;


export class HTTPTransport{
    private baseURL:string;

    constructor(baseUrl:string){
        this.baseURL = baseUrl;
    }

    get: HTTPMethod = (url, options = {}) =>(
        this.request(url, {...options,method:METHODS.GET},options.timeout)
    );

    put: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method:METHODS.PUT}, options.timeout)
    ); 

    post:HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method:METHODS.POST}, options.timeout)
    ); 

    delete: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method:METHODS.DELETE}, options.timeout)
    );

    private request<R = unknown>(url: string, options:Options, timeout = 4000):Promise<R> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const fullURL = options.data && options.method === METHODS.GET ? `${this.baseURL}${url}?${new URLSearchParams(options.data).toString()}` : `${this.baseURL}${url}`;

            xhr.open(options.method!, fullURL);
            xhr.timeout = timeout;

            if(options.headers) {
                Object.entries(options.headers).forEach(([key, value]) =>{
                    xhr.setRequestHeader(key,value);
                });
            } else if (!(options.data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type","application/json");
            }

            xhr.onload = () => resolve(xhr.response as R);
            xhr.onerror = () => reject(new Error(`Request to ${url} failed`));
            xhr.ontimeout = () => reject(new Error(`Request to ${url} timed out`));

            const requestData = options.data instanceof FormData ? options.data : JSON.stringify(options.data);
            xhr.send(options.method === METHODS.GET ? null : requestData); 
        });
    }
}

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest() as unknown as SinonFakeXMLHttpRequestStatic;
    global.XMLHttpRequest = xhr as unknown as typeof XMLHttpRequest;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport("https://ya-praktikum.tech/api/v2/auth");
  });

  afterEach(() => {
    requests = [];
    sinon.restore();
  });

  describe("GET", () => {
    it(".get() должен отправить GET-запрос", () => {
      instance.get("/user");
      const [request] = requests;
      expect(request.method).to.eq("GET");
    });

    it(".get() должен сформировать строку запроса из данных", () => {
      const data = { login: "fakeLogin", password: "fakePassword" };
      const expectedUrl = "https://ya-praktikum.tech/api/v2/auth/user?login=fakeLogin&password=fakePassword";
      instance.get("/user", { data });
      const [request] = requests;
      expect(request.url).to.eq(expectedUrl);
    });
  });

  describe("POST", () => {
    it(".post() должен отправить POST-запрос", () => {
      instance.post("/user", {});
      const [request] = requests;
      expect(request.method).to.eq("POST");
    });

    it(".post() должен отправить тело с данными", () => {
      const data = { login: "fakeLogin", password: "fakePassword" };
      instance.post("/signin", { data });
      const [request] = requests;
      expect(request.requestBody).to.eq(JSON.stringify(data));
    });

    it("Заголовок content-type должен быть application/json", () => {
      const data = { login: "fakeLogin", password: "fakePassword" };
      instance.post("/signin", { data });
      const [request] = requests;
      expect(request.requestHeaders["Content-Type"]).to.contain("application/json");
    });

    it("Заголовок content-type для FormData должен быть пустым", () => {
      const data = new FormData();
      data.append("first", "1");
      data.append("second", "2");
      instance.post("/signin", { data });
      const [request] = requests;
      expect(request.requestHeaders["Content-Type"]).to.be.undefined;
    });
  });

  describe("DELETE", () => {
    it(".delete() должен отправить DELETE-запрос", () => {
      instance.delete("/user", {});
      const [request] = requests;
      expect(request.method).to.eq("DELETE");
    });

    it(".delete() должен отправить тело с данными", () => {
      const data = { login: "fakeLogin", password: "fakePassword" };
      instance.delete("/signin", { data });
      const [request] = requests;
      expect(request.requestBody).to.eq(JSON.stringify(data));
    });

    it("Заголовок content-type должен быть application/json", () => {
      instance.delete("/user", {});
      const [request] = requests;
      expect(request.requestHeaders["Content-Type"]).to.contain("application/json");
    });
  });

  describe("PUT", () => {
    it(".put() должен отправить PUT-запрос", () => {
      instance.put("/user", {});
      const [request] = requests;
      expect(request.method).to.eq("PUT");
    });

    it(".put() должен отправить тело с данными", () => {
      const data = { login: "fakeLogin", password: "fakePassword" };
      instance.put("/signin", { data });
      const [request] = requests;
      expect(request.requestBody).to.eq(JSON.stringify(data));
    });

    it("Заголовок content-type должен быть application/json", () => {
      instance.put("/user", {});
      const [request] = requests;
      expect(request.requestHeaders["Content-Type"]).to.contain("application/json");
    });

    it("Заголовок content-type для FormData должен быть пустым", () => {
      const data = new FormData();
      data.append("first", "1");
      data.append("second", "2");
      instance.put("/signin", { data });
      const [request] = requests;
      expect(request.requestHeaders["Content-Type"]).to.be.undefined;
    });
  });
});

import { HTTPTransport, METHODS } from "../tools/HTTPTransport";
import ErrorModal from "../components/Modal/ErrorModal";

jest.mock("../components/Modal/ErrorModal", () => jest.fn());

describe("HTTPTransport", () => {
  let xhrMock: any;
  let _requests: any[] = [];

  beforeEach(() => {
    _requests = [];
    xhrMock = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      withCredentials: false,
      responseType: "",
      status: 200,
      statusText: "OK",
      response: { ok: true },
      onload: jest.fn(),
      onerror: jest.fn(),
      ontimeout: jest.fn(),
      timeout: 0,
    };

    // @ts-ignore
    global.XMLHttpRequest = jest.fn(() => xhrMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve promise on successful GET request", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/endpoint");

    // Симулируем успешный ответ
    xhrMock.onload();

    await expect(promise).resolves.toEqual({ ok: true });
    expect(xhrMock.open).toHaveBeenCalledWith(METHODS.GET, "https://ya-praktikum.tech/api/v2/test/endpoint");
  });

  it("should reject promise on failed request with status != 200", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/fail");

    xhrMock.status = 500;
    xhrMock.statusText = "Internal Server Error";
    xhrMock.onload();

    await expect(promise).rejects.toThrow("Request failed with status 500: Internal Server Error");
  });

  it("should reject promise and call ErrorModal on XHR error", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/error");

    xhrMock.status = 500;
    xhrMock.onerror();

    await expect(promise).rejects.toThrow("Request failed with status 500");
    expect(ErrorModal).toHaveBeenCalledWith("Request failed with status 500");
  });

  it("should reject promise on timeout", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/timeout");

    xhrMock.ontimeout();

    await expect(promise).rejects.toThrow("Request timed out");
  });

  it("should send POST request with JSON data", async () => {
    const transport = new HTTPTransport("/test");
    const data = { name: "John" };
    transport.post("/", data);

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
  });

  it("should send PUT request with JSON data", async () => {
    const transport = new HTTPTransport("/test");
    const data = { id: 1 };
    transport.put("/", data);

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
  });

  it("should send DELETE request with JSON data", async () => {
    const transport = new HTTPTransport("/test");
    const data = { id: 1 };
    transport.delete("/", data);

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
  });
});



/* eslint-disable no-undef */
// /* eslint-disable no-undef */
import { HTTPTransport, METHODS } from "../tools/HTTPTransport.ts";
import  ErrorModal from "../components/Modal/ErrorModal.ts";


jest.mock("../components/Modal/ErrorModal", () => jest.fn());
describe("HTTPTransport", () => {
  let xhrMock;

  beforeEach(() => {
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

  it("resolves promise on successful GET request", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/endpoint");

    xhrMock.onload?.();

    await expect(promise).resolves.toEqual({ ok: true });
    expect(xhrMock.open).toHaveBeenCalledWith(
      METHODS.GET,
      "https://ya-praktikum.tech/api/v2/test/endpoint"
    );
  });

  it("rejects promise on non-200 status", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/fail");

    xhrMock.status = 500;
    xhrMock.statusText = "Internal Server Error";
    xhrMock.onload?.();

    await expect(promise).rejects.toThrow("Request failed with status 500: Internal Server Error");
  });

  it("rejects promise and calls ErrorModal on XHR error", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/error");

    xhrMock.status = 500;
    xhrMock.onerror?.();

    await expect(promise).rejects.toThrow("Request failed with status 500");
    expect(ErrorModal).toHaveBeenCalledWith("Request failed with status 500");
  });

  it("rejects promise on timeout", async () => {
    const transport = new HTTPTransport("/test");
    const promise = transport.get("/timeout");

    xhrMock.ontimeout?.();

    await expect(promise).rejects.toThrow("Request timed out");
  });

  it("sends POST request with JSON data", () => {
    const transport = new HTTPTransport("/test");
    const data = { name: "John" };
    transport.post("/", data);

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
  });

  it("sends PUT request with JSON data", () => {
    const transport = new HTTPTransport("/test");
    const data = { id: 1 };
    transport.put("/", data);

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
  });

  it("sends DELETE request with JSON data", () => {
    const transport = new HTTPTransport("/test");
    const data = { id: 1 };
    transport.delete("/", data);

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
  });
});

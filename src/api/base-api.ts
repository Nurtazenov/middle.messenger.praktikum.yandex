import {HTTPTransport} from "../tools/HTTPTransport";
export abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
  public abstract create?(data: unknown): Promise<unknown>;

  public abstract request?(): Promise<unknown>;

  public abstract update?(data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string | number): Promise<unknown>;
}

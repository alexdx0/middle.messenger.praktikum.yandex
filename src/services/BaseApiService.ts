export abstract class BaseApiService {
  private _baseUrl: string = "https://ya-praktikum.tech/api/v2/";

  restUrl(path: string) {
    return this._baseUrl + path;
  }

  // create() { throw new Error("Not implemented") }

  // request() { throw new Error("Not implemented") }

  // update() { throw new Error("Not implemented") }

  // delete() { throw new Error("Not implemented") }
}

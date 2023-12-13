/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";

import { HTTP } from "./HttpTransport";

describe("Класс HTTPTransport", () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (xhr) => {
      requests.push(xhr);
    };
    requests = [];
  });

  afterEach(() => {
    sinon.restore();
    requests = [];
  });

  it("Метод GET вызывается", async() => {
    const request = sinon.stub(HTTP, "get").resolves();
    await HTTP.get("someUrl");
    expect(request.called).to.be.true;
  });

  it("Метод POST вызывается", async() => {
    const request = sinon.stub(HTTP, "post");
    await HTTP.post("someUrl");
    expect(request.called).to.be.true;
  });

  it("Метод PUT вызывается", async() => {
    const request = sinon.stub(HTTP, "put").resolves();
    await HTTP.put("someUrl");
    expect(request.called).to.be.true;
  });

  it("Метод DELETE вызывается", async() => {
    const request = sinon.stub(HTTP, "delete").resolves();
    await HTTP.delete("someUrl");
    expect(request.called).to.be.true;
  });

  it("GET-запрос преобразовывает объект data со строковыми и числовыми значениями ключей" +
    "в строку запроса с query params", () => {
    const expectedUrl = "someEndpoint?key1=1&key2=val2";

    HTTP.get("someEndpoint", { data: { key1: 1, key2: "val2" } });
    expect(requests[0]?.url).to.equal(expectedUrl);
  });

  it("GET-запрос формирует безопасный URL из строк с пробелами", () => {
    const expectedUrl = "someEndpoint?key1=val1%20val2";

    HTTP.get("someEndpoint", { data: { key1: "val1 val2" } });
    expect(requests[0]?.url).to.equal(expectedUrl);
  });

  it("GET-запрос формирует безопасный URL с кириллическим текстом в query params", () => {
    const expectedUrl = `someEndpoint?key1=${encodeURI("кириллический текст с пробелами")}`;

    HTTP.get("someEndpoint", { data: { key1: "кириллический текст с пробелами" } });
    expect(requests[0]?.url).to.equal(expectedUrl);
  });
});

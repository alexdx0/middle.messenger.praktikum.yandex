/* eslint-disable no-restricted-imports */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";

import { Router } from "./Router";

import { Route } from "../Route";
import { Block } from "../Block";

const basePath = "http://localhost:3000";

describe("Класс Router", () => {
  let GlobalRouter: Router;
  let GlobalComponent: typeof Block;

  before(() => {
    class ComponentClass extends Block {
      // eslint-disable-next-line no-useless-constructor
      constructor() {
        super();
      }

      protected render() {
        return function() {
          return "<div>content</div>";
        };
      }
    }

    GlobalComponent = new ComponentClass() as unknown as typeof Block;
    GlobalRouter = new Router("#root");
  });

  it("Роутер реализует Singleton", () => {
    const newRouter = new Router("#root");
    expect(GlobalRouter).to.equal(newRouter);
  });

  it("Метод getRoute возвращает объект Route при существующем пути", () => {
    GlobalRouter.use("somePath", GlobalComponent);
    const route = GlobalRouter.getRoute("somePath");
    expect(route).to.be.an.instanceof(Route);
  });

  it("Метод getRoute возвращает null при несуществующем пути", () => {
    GlobalRouter.use("somePath", GlobalComponent);
    const route = GlobalRouter.getRoute("anotherPath");
    expect(route).to.be.null;
  });

  it("Метод роутера Use вызывается для назначения компонента определенному маршруту и возвращает обект роутера", () => {
    const spy = sinon.spy(GlobalRouter, "use");
    GlobalRouter.use("somePath", GlobalComponent);
    expect(spy.called).to.be.true;
    expect(spy.returned(GlobalRouter));
  });

  it("Метод роутера start запускает роутер и запускает рендер соответсвующего роута", () => {
    const stub = sinon.stub();
    GlobalRouter._onRoute = stub;
    GlobalRouter.start();
    expect(stub.called).to.be.true;
  });

  it("Метод роутера go изменяет history", () => {
    GlobalRouter.go("somePath");
    expect(window.location.href).to.be.equal(`${basePath}/somePath`);
  });

  it("Метод роутера back вызывает метод history.back", () => {
    const spy = sinon.spy(window.history, "back");
    GlobalRouter.back();
    expect(spy.calledOnce).to.be.true;
  });

  it("Метод роутера forward вызывает метод history.forward", () => {
    const forwardSpy = sinon.spy(window.history, "forward");
    GlobalRouter.forward();
    expect(forwardSpy.calledOnce).to.be.true;
  });
});

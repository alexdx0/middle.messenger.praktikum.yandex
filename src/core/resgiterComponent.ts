/* eslint-disable no-throw-literal */
import Handlebars, { HelperOptions } from "handlebars/runtime";

import { Block } from "@Core";

export function registerComponent(name: string, Component: typeof Block) {
  if (name in Handlebars.helpers) {
    throw `The component ${name} is already registered and will not be registered again`;
  }

  Handlebars.registerHelper(name, function(this: unknown, { hash, data, fn }: HelperOptions) {
    const component = new Component(hash);
    const dataAttribute = `data-id="${component.id}"`;

    if ("ref" in hash) {
      (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
    }

    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) {
          return;
        }

        const componentContent = component.getContent();

        componentContent?.append(...Array.from(stub.childNodes));

        stub.replaceWith(componentContent!);
      },
    });

    const contents = fn ? fn(this) : "";

    return `<div ${dataAttribute}>${contents}</div>`;
  });
}

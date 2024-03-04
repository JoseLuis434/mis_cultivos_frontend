import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, f as renderComponent, g as renderHead, h as renderSlot } from '../astro_d4BX41pa.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                                     */

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/home/joseluis434/Documents/mis_cultivos/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/joseluis434/Documents/mis_cultivos/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const name = convert(id);
  function convert(cadena) {
    cadena = cadena.replace("-", " ");
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${name}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/Dashboard", "client:component-export": "Dashboard" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ControlFarm", null, { "client:only": true, "name": "Plant\xEDo Jitomates", "location": "Luis Quintero, Victor Kuri #33", "days": 30, "stage": "Cotiledones", "type": "Tomate rojo", "date": "01/02/2024", "client:component-hydration": "only", "client:component-path": "/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/ControFarm/ControlFarm", "client:component-export": "ControlFarm" })} ` })} ` })}`;
}, "/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/[id].astro", void 0);

const $$file = "/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/[id].astro";
const $$url = "/dashboard/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _id_ as _ };

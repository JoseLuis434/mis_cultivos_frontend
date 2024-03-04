import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'string-width';
import 'html-escaper';
import 'clsx';
import './chunks/astro_d4BX41pa.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"actualizar-datos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/actualizar-datos","isIndex":false,"type":"page","pattern":"^\\/actualizar-datos\\/?$","segments":[[{"content":"actualizar-datos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/actualizar-datos.astro","pathname":"/actualizar-datos","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/productos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard/productos","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/productos\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"productos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/productos/index.astro","pathname":"/dashboard/productos","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/index.astro","pathname":"/dashboard","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"ingresar-codigo/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ingresar-codigo","isIndex":false,"type":"page","pattern":"^\\/ingresar-codigo\\/?$","segments":[[{"content":"ingresar-codigo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ingresar-codigo.astro","pathname":"/ingresar-codigo","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"ingresar-codigo-registro/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ingresar-codigo-registro","isIndex":false,"type":"page","pattern":"^\\/ingresar-codigo-registro\\/?$","segments":[[{"content":"ingresar-codigo-registro","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ingresar-codigo-registro.astro","pathname":"/ingresar-codigo-registro","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"ingresar-email/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ingresar-email","isIndex":false,"type":"page","pattern":"^\\/ingresar-email\\/?$","segments":[[{"content":"ingresar-email","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ingresar-email.astro","pathname":"/ingresar-email","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DIC1WmG9.js"}],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}*{font-family:Jost,sans-serif;box-sizing:border-box;min-width:0}body{margin:0}\n"},{"type":"external","src":"/_astro/ControlFarm.LCzwfWCl.css"}],"routeData":{"route":"/dashboard/[id]","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/([^/]+?)\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/dashboard/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/joseluis434/Documents/mis_cultivos/src/pages/actualizar-datos.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/[id].astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/index.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/productos/index.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/ingresar-codigo-registro.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/ingresar-codigo.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/ingresar-email.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/home/joseluis434/Documents/mis_cultivos/src/pages/register.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_j5cqQcHC.mjs","\u0000@astrojs-manifest":"manifest_CkklBv0t.mjs","/home/joseluis434/Documents/mis_cultivos/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3wEZly-Z.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_3u8s-DhU.mjs","\u0000@astro-page:src/pages/actualizar-datos@_@astro":"chunks/actualizar-datos__FGx46pO.mjs","\u0000@astro-page:src/pages/dashboard/productos/index@_@astro":"chunks/index__IRJAndM.mjs","\u0000@astro-page:src/pages/dashboard/[id]@_@astro":"chunks/_id__bxDK6AVy.mjs","\u0000@astro-page:src/pages/dashboard/index@_@astro":"chunks/index_9el2sWbK.mjs","\u0000@astro-page:src/pages/ingresar-codigo@_@astro":"chunks/ingresar-codigo_a7Wu3OFJ.mjs","\u0000@astro-page:src/pages/ingresar-codigo-registro@_@astro":"chunks/ingresar-codigo-registro_O8t9UkTe.mjs","\u0000@astro-page:src/pages/ingresar-email@_@astro":"chunks/ingresar-email_SGzOhSp6.mjs","\u0000@astro-page:src/pages/login@_@astro":"chunks/login_eMl8QHOi.mjs","\u0000@astro-page:src/pages/register@_@astro":"chunks/register_5bwO82rZ.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_VY8NP-hE.mjs","/astro/hoisted.js?q=2":"_astro/hoisted.Dgscq7xw.js","/astro/hoisted.js?q=1":"_astro/hoisted.QVVfkop5.js","/astro/hoisted.js?q=4":"_astro/hoisted.6byNS-Zl.js","/astro/hoisted.js?q=5":"_astro/hoisted.aUVsna8W.js","/astro/hoisted.js?q=6":"_astro/hoisted.Tdz5Hsc0.js","/astro/hoisted.js?q=0":"_astro/hoisted.i_pW7hLJ.js","/astro/hoisted.js?q=3":"_astro/hoisted.UezHjfX3.js","/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/Dashboard":"_astro/Dashboard.IJjFfCKF.js","/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/Dashboard.jsx":"_astro/Dashboard.XC862orR.js","/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/Control/Control.jsx":"_astro/Control.a3KCqE4x.js","/astro/hoisted.js?q=7":"_astro/hoisted.DIC1WmG9.js","@astrojs/react/client.js":"_astro/client.mBN5ZAaw.js","/home/joseluis434/Documents/mis_cultivos/src/pages/dashboard/ControFarm/ControlFarm":"_astro/ControlFarm.OnVxcRhw.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/index.Y2_yQtXP.css","/bandeja-de-entrada.png","/caminos.png","/conexion.png","/correo-electronico.png","/cotiledon_etapa.png","/el-planeta-tierra.png","/evaluacion.png","/favicon.svg","/fertilizante.png","/ganancias.png","/img_main.svg","/jardinero.png","/login.svg","/optimizacion.png","/productividad.png","/register.svg","/rompecabezas.png","/semilleros.svg","/smart-farm.png","/tomato.png","/water_pump.svg","/_astro/Control.Y0gbeRDZ.css","/_astro/Control.a3KCqE4x.js","/_astro/ControlFarm.LCzwfWCl.css","/_astro/ControlFarm.OnVxcRhw.js","/_astro/Dashboard.IJjFfCKF.js","/_astro/Dashboard.XC862orR.js","/_astro/DaysSvg.q4u5PA_H.js","/_astro/client.mBN5ZAaw.js","/_astro/hoisted.6byNS-Zl.js","/_astro/hoisted.DIC1WmG9.js","/_astro/hoisted.Dgscq7xw.js","/_astro/hoisted.QVVfkop5.js","/_astro/hoisted.Tdz5Hsc0.js","/_astro/hoisted.UezHjfX3.js","/_astro/hoisted.aUVsna8W.js","/_astro/hoisted.i_pW7hLJ.js","/_astro/index.068npczX.js","/actualizar-datos/index.html","/dashboard/productos/index.html","/dashboard/index.html","/ingresar-codigo/index.html","/ingresar-codigo-registro/index.html","/ingresar-email/index.html","/login/index.html","/register/index.html","/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };

function y(){}function x(t,n){for(const e in n)t[e]=n[e];return t}function w(t){return t()}function D(){return Object.create(null)}function j(t){t.forEach(w)}function E(t){return typeof t=="function"}function F(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function P(t){return Object.keys(t).length===0}function v(t,...n){if(t==null){for(const o of n)o(void 0);return y}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t,n,e){t.$$.on_destroy.push(v(n,e))}function U(t,n,e,o){if(t){const r=m(t,n,e,o);return t[0](r)}}function m(t,n,e,o){return t[1]&&o?x(e.ctx.slice(),t[1](o(n))):e.ctx}function A(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],f=Math.max(n.dirty.length,r.length);for(let u=0;u<f;u+=1)l[u]=n.dirty[u]|r[u];return l}return n.dirty|r}return n.dirty}function B(t,n,e,o,r,l){if(r){const f=m(n,e,o,l);t.p(f,r)}}function C(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function G(t){return t&&E(t.destroy)?t.destroy:y}let i;function d(t){i=t}function b(){if(!i)throw new Error("Function called outside component initialization");return i}function H(t){b().$$.on_mount.push(t)}function I(t){b().$$.after_update.push(t)}function J(t){b().$$.on_destroy.push(t)}const a=[],g=[];let s=[];const _=[],k=Promise.resolve();let p=!1;function O(){p||(p=!0,k.then(z))}function K(){return O(),k}function q(t){s.push(t)}function L(t){_.push(t)}const h=new Set;let c=0;function z(){if(c!==0)return;const t=i;do{try{for(;c<a.length;){const n=a[c];c++,d(n),M(n.$$)}}catch(n){throw a.length=0,c=0,n}for(d(null),a.length=0,c=0;g.length;)g.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];h.has(e)||(h.add(e),e())}s.length=0}while(a.length);for(;_.length;)_.pop()();p=!1,h.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function N(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{A as a,S as b,U as c,I as d,g as e,D as f,C as g,z as h,E as i,P as j,q as k,N as l,i as m,y as n,H as o,d as p,w as q,j as r,F as s,K as t,B as u,a as v,O as w,G as x,L as y,J as z};

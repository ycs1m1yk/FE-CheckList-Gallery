import{k as n,b as c}from"./w3c-keyname.74927781.js";import{a as h}from"./prosemirror-state.34ed6358.js";const d=typeof navigator!="undefined"?/Mac|iP(hone|[oa]d)/.test(navigator.platform):!1;function m(e){let r=e.split(/-(?!$)/),t=r[r.length-1];t=="Space"&&(t=" ");let i,l,o,a;for(let s=0;s<r.length-1;s++){let f=r[s];if(/^(cmd|meta|m)$/i.test(f))a=!0;else if(/^a(lt)?$/i.test(f))i=!0;else if(/^(c|ctrl|control)$/i.test(f))l=!0;else if(/^s(hift)?$/i.test(f))o=!0;else if(/^mod$/i.test(f))d?a=!0:l=!0;else throw new Error("Unrecognized modifier name: "+f)}return i&&(t="Alt-"+t),l&&(t="Ctrl-"+t),a&&(t="Meta-"+t),o&&(t="Shift-"+t),t}function p(e){let r=Object.create(null);for(let t in e)r[m(t)]=e[t];return r}function u(e,r,t){return r.altKey&&(e="Alt-"+e),r.ctrlKey&&(e="Ctrl-"+e),r.metaKey&&(e="Meta-"+e),t!==!1&&r.shiftKey&&(e="Shift-"+e),e}function k(e){return new h({props:{handleKeyDown:y(e)}})}function y(e){let r=p(e);return function(t,i){let l=n(i),o=l.length==1&&l!=" ",a,s=r[u(l,i,!o)];if(s&&s(t.state,t.dispatch,t))return!0;if(o&&(i.shiftKey||i.altKey||i.metaKey||l.charCodeAt(0)>127)&&(a=c[i.keyCode])&&a!=l){let f=r[u(a,i,!0)];if(f&&f(t.state,t.dispatch,t))return!0}else if(o&&i.shiftKey){let f=r[u(l,i,!0)];if(f&&f(t.state,t.dispatch,t))return!0}return!1}}export{k};
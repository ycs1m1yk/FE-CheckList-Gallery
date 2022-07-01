import{f as P,r as v,R,a as D,l as M,c as A}from"./prosemirror-transform.d8dd870a.js";import{a as I,F as S}from"./prosemirror-model.fc7226ba.js";import{N as b,S as B,A as h,T as V}from"./prosemirror-state.34ed6358.js";const F=(e,t)=>e.selection.empty?!1:(t&&t(e.tr.deleteSelection().scrollIntoView()),!0),K=(e,t,r)=>{let{$cursor:n}=e.selection;if(!n||(r?!r.endOfTextblock("backward",e):n.parentOffset>0))return!1;let o=j(n);if(!o){let i=n.blockRange(),f=i&&M(i);return f==null?!1:(t&&t(e.tr.lift(i,f).scrollIntoView()),!0)}let l=o.nodeBefore;if(!l.type.spec.isolating&&N(e,o,t))return!0;if(n.parent.content.size==0&&(w(l,"end")||b.isSelectable(l))){let i=v(e.doc,n.before(),n.after(),I.empty);if(i&&i.slice.size<i.to-i.from){if(t){let f=e.tr.step(i);f.setSelection(w(l,"end")?B.findFrom(f.doc.resolve(f.mapping.map(o.pos,-1)),-1):b.create(f.doc,o.pos-l.nodeSize)),t(f.scrollIntoView())}return!0}}return l.isAtom&&o.depth==n.depth-1?(t&&t(e.tr.delete(o.pos-l.nodeSize,o.pos).scrollIntoView()),!0):!1};function w(e,t,r=!1){for(let n=e;n;n=t=="start"?n.firstChild:n.lastChild){if(n.isTextblock)return!0;if(r&&n.childCount!=1)return!1}return!1}const q=(e,t,r)=>{let{$head:n,empty:o}=e.selection,l=n;if(!o)return!1;if(n.parent.isTextblock){if(r?!r.endOfTextblock("backward",e):n.parentOffset>0)return!1;l=j(n)}let i=l&&l.nodeBefore;return!i||!b.isSelectable(i)?!1:(t&&t(e.tr.setSelection(b.create(e.doc,l.pos-i.nodeSize)).scrollIntoView()),!0)};function j(e){if(!e.parent.type.spec.isolating)for(let t=e.depth-1;t>=0;t--){if(e.index(t)>0)return e.doc.resolve(e.before(t+1));if(e.node(t).type.spec.isolating)break}return null}const H=(e,t,r)=>{let{$cursor:n}=e.selection;if(!n||(r?!r.endOfTextblock("forward",e):n.parentOffset<n.parent.content.size))return!1;let o=E(n);if(!o)return!1;let l=o.nodeAfter;if(N(e,o,t))return!0;if(n.parent.content.size==0&&(w(l,"start")||b.isSelectable(l))){let i=v(e.doc,n.before(),n.after(),I.empty);if(i&&i.slice.size<i.to-i.from){if(t){let f=e.tr.step(i);f.setSelection(w(l,"start")?B.findFrom(f.doc.resolve(f.mapping.map(o.pos)),1):b.create(f.doc,f.mapping.map(o.pos))),t(f.scrollIntoView())}return!0}}return l.isAtom&&o.depth==n.depth-1?(t&&t(e.tr.delete(o.pos,o.pos+l.nodeSize).scrollIntoView()),!0):!1},J=(e,t,r)=>{let{$head:n,empty:o}=e.selection,l=n;if(!o)return!1;if(n.parent.isTextblock){if(r?!r.endOfTextblock("forward",e):n.parentOffset<n.parent.content.size)return!1;l=E(n)}let i=l&&l.nodeAfter;return!i||!b.isSelectable(i)?!1:(t&&t(e.tr.setSelection(b.create(e.doc,l.pos)).scrollIntoView()),!0)};function E(e){if(!e.parent.type.spec.isolating)for(let t=e.depth-1;t>=0;t--){let r=e.node(t);if(e.index(t)+1<r.childCount)return e.doc.resolve(e.after(t+1));if(r.type.spec.isolating)break}return null}const $=(e,t)=>{let{$head:r,$anchor:n}=e.selection;return!r.parent.type.spec.code||!r.sameParent(n)?!1:(t&&t(e.tr.insertText(`
`).scrollIntoView()),!0)};function T(e){for(let t=0;t<e.edgeCount;t++){let{type:r}=e.edge(t);if(r.isTextblock&&!r.hasRequiredAttrs())return r}return null}const G=(e,t)=>{let{$head:r,$anchor:n}=e.selection;if(!r.parent.type.spec.code||!r.sameParent(n))return!1;let o=r.node(-1),l=r.indexAfter(-1),i=T(o.contentMatchAt(l));if(!i||!o.canReplaceWith(l,l,i))return!1;if(t){let f=r.after(),c=e.tr.replaceWith(f,f,i.createAndFill());c.setSelection(B.near(c.doc.resolve(f),1)),t(c.scrollIntoView())}return!0},L=(e,t)=>{let r=e.selection,{$from:n,$to:o}=r;if(r instanceof h||n.parent.inlineContent||o.parent.inlineContent)return!1;let l=T(o.parent.contentMatchAt(o.indexAfter()));if(!l||!l.isTextblock)return!1;if(t){let i=(!n.parentOffset&&o.index()<o.parent.childCount?n:o).pos,f=e.tr.insert(i,l.createAndFill());f.setSelection(V.create(f.doc,i+1)),t(f.scrollIntoView())}return!0},Q=(e,t)=>{let{$cursor:r}=e.selection;if(!r||r.parent.content.size)return!1;if(r.depth>1&&r.after()!=r.end(-1)){let l=r.before();if(A(e.doc,l))return t&&t(e.tr.split(l).scrollIntoView()),!0}let n=r.blockRange(),o=n&&M(n);return o==null?!1:(t&&t(e.tr.lift(n,o).scrollIntoView()),!0)},U=(e,t)=>{let{$from:r,$to:n}=e.selection;if(e.selection instanceof b&&e.selection.node.isBlock)return!r.parentOffset||!A(e.doc,r.pos)?!1:(t&&t(e.tr.split(r.pos).scrollIntoView()),!0);if(!r.parent.isBlock)return!1;if(t){let o=n.parentOffset==n.parent.content.size,l=e.tr;(e.selection instanceof V||e.selection instanceof h)&&l.deleteSelection();let i=r.depth==0?null:T(r.node(-1).contentMatchAt(r.indexAfter(-1))),f=o&&i?[{type:i}]:void 0,c=A(l.doc,l.mapping.map(r.pos),1,f);if(!f&&!c&&A(l.doc,l.mapping.map(r.pos),1,i?[{type:i}]:void 0)&&(i&&(f=[{type:i}]),c=!0),c&&(l.split(l.mapping.map(r.pos),1,f),!o&&!r.parentOffset&&r.parent.type!=i)){let s=l.mapping.map(r.before()),u=l.doc.resolve(s);i&&r.node(-1).canReplaceWith(u.index(),u.index()+1,i)&&l.setNodeMarkup(l.mapping.map(r.before()),i)}t(l.scrollIntoView())}return!0},X=(e,t)=>(t&&t(e.tr.setSelection(new h(e.doc))),!0);function Y(e,t,r){let n=t.nodeBefore,o=t.nodeAfter,l=t.index();return!n||!o||!n.type.compatibleContent(o.type)?!1:!n.content.size&&t.parent.canReplace(l-1,l)?(r&&r(e.tr.delete(t.pos-n.nodeSize,t.pos).scrollIntoView()),!0):!t.parent.canReplace(l,l+1)||!(o.isTextblock||D(e.doc,t.pos))?!1:(r&&r(e.tr.clearIncompatible(t.pos,n.type,n.contentMatchAt(n.childCount)).join(t.pos).scrollIntoView()),!0)}function N(e,t,r){let n=t.nodeBefore,o=t.nodeAfter,l,i;if(n.type.spec.isolating||o.type.spec.isolating)return!1;if(Y(e,t,r))return!0;let f=t.parent.canReplace(t.index(),t.index()+1);if(f&&(l=(i=n.contentMatchAt(n.childCount)).findWrapping(o.type))&&i.matchType(l[0]||o.type).validEnd){if(r){let a=t.pos+o.nodeSize,p=S.empty;for(let m=l.length-1;m>=0;m--)p=S.from(l[m].create(null,p));p=S.from(n.copy(p));let d=e.tr.step(new R(t.pos-1,a,t.pos,a,new I(p,1,0),l.length,!0)),k=a+2*l.length;D(d.doc,k)&&d.join(k),r(d.scrollIntoView())}return!0}let c=B.findFrom(t,1),s=c&&c.$from.blockRange(c.$to),u=s&&M(s);if(u!=null&&u>=t.depth)return r&&r(e.tr.lift(s,u).scrollIntoView()),!0;if(f&&w(o,"start",!0)&&w(n,"end")){let a=n,p=[];for(;p.push(a),!a.isTextblock;)a=a.lastChild;let d=o,k=1;for(;!d.isTextblock;d=d.firstChild)k++;if(a.canReplace(a.childCount,a.childCount,d.content)){if(r){let m=S.empty;for(let x=p.length-1;x>=0;x--)m=S.from(p[x].copy(m));let y=e.tr.step(new R(t.pos-p.length,t.pos+o.nodeSize,t.pos+k,t.pos+o.nodeSize-k,new I(m,p.length,0),0,!0));r(y.scrollIntoView())}return!0}}return!1}function W(e){return function(t,r){let n=t.selection,o=e<0?n.$from:n.$to,l=o.depth;for(;o.node(l).isInline;){if(!l)return!1;l--}return o.node(l).isTextblock?(r&&r(t.tr.setSelection(V.create(t.doc,e<0?o.start(l):o.end(l)))),!0):!1}}const Z=W(-1),ee=W(1);function ie(e,t=null){return function(r,n){let{$from:o,$to:l}=r.selection,i=o.blockRange(l),f=i&&P(i,e,t);return f?(n&&n(r.tr.wrap(i,f).scrollIntoView()),!0):!1}}function fe(e,t=null){return function(r,n){let{from:o,to:l}=r.selection,i=!1;return r.doc.nodesBetween(o,l,(f,c)=>{if(i)return!1;if(!(!f.isTextblock||f.hasMarkup(e,t)))if(f.type==e)i=!0;else{let s=r.doc.resolve(c),u=s.index();i=s.parent.canReplaceWith(u,u+1,e)}}),i?(n&&n(r.tr.setBlockType(o,l,e,t).scrollIntoView()),!0):!1}}function te(e,t,r){for(let n=0;n<t.length;n++){let{$from:o,$to:l}=t[n],i=o.depth==0?e.type.allowsMarkType(r):!1;if(e.nodesBetween(o.pos,l.pos,f=>{if(i)return!1;i=f.inlineContent&&f.type.allowsMarkType(r)}),i)return!0}return!1}function ce(e,t=null){return function(r,n){let{empty:o,$cursor:l,ranges:i}=r.selection;if(o&&!l||!te(r.doc,i,e))return!1;if(n)if(l)e.isInSet(r.storedMarks||l.marks())?n(r.tr.removeStoredMark(e)):n(r.tr.addStoredMark(e.create(t)));else{let f=!1,c=r.tr;for(let s=0;!f&&s<i.length;s++){let{$from:u,$to:a}=i[s];f=r.doc.rangeHasMark(u.pos,a.pos,e)}for(let s=0;s<i.length;s++){let{$from:u,$to:a}=i[s];if(f)c.removeMark(u.pos,a.pos,e);else{let p=u.pos,d=a.pos,k=u.nodeAfter,m=a.nodeBefore,y=k&&k.isText?/^\s*/.exec(k.text)[0].length:0,x=m&&m.isText?/\s*$/.exec(m.text)[0].length:0;p+y<d&&(p+=y,d-=x),c.addMark(p,d,e.create(t))}}n(c.scrollIntoView())}return!0}}function z(...e){return function(t,r,n){for(let o=0;o<e.length;o++)if(e[o](t,r,n))return!0;return!1}}let C=z(F,K,q),O=z(F,H,J);const g={Enter:z($,L,Q,U),"Mod-Enter":G,Backspace:C,"Mod-Backspace":C,"Shift-Backspace":C,Delete:O,"Mod-Delete":O,"Mod-a":X},_={"Ctrl-h":g.Backspace,"Alt-Backspace":g["Mod-Backspace"],"Ctrl-d":g.Delete,"Ctrl-Alt-Backspace":g["Mod-Delete"],"Alt-Delete":g["Mod-Delete"],"Alt-d":g["Mod-Delete"],"Ctrl-a":Z,"Ctrl-e":ee};for(let e in g)_[e]=g[e];const re=typeof navigator!="undefined"?/Mac|iP(hone|[oa]d)/.test(navigator.platform):typeof os!="undefined"&&os.platform?os.platform()=="darwin":!1,ae=re?_:g;export{X as a,ae as b,z as c,F as d,G as e,H as j,$ as n,fe as s,ce as t,ie as w};

(this["webpackJsonpscore-tracker-react-ui"]=this["webpackJsonpscore-tracker-react-ui"]||[]).push([[0],{46:function(e,t,c){},48:function(e,t,c){},58:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),s=c(13),r=c.n(s),i=(c(46),c(3)),o=c(41),j=c(5),l=(c(47),c(48),c(24)),d=c(35),h=c(2);function b(){var e=Object(n.useState)(0),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(1),r=Object(i.a)(s,2),o=r[0],j=r[1],l=0;function d(){fetch("/api/v1/score/all/top").then((function(e){return e.json()})).then((function(e){a(e.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.game}),Object(h.jsx)("td",{children:e.name}),Object(h.jsx)("td",{children:e.score})]})})))})),fetch("/api/v1/score/all").then((function(e){return e.json()})).then((function(e){j(e.map((function(e){return Object(h.jsx)("div",{game:e.game,className:"main {game.game}",children:Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{className:"header-row",children:Object(h.jsx)("th",{colspan:"2",className:"title",children:e.game})}),Object(h.jsxs)("tr",{className:"header-row",children:[Object(h.jsx)("th",{children:"Player"}),Object(h.jsx)("th",{children:"Score"})]}),e.scores.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.name}),Object(h.jsx)("td",{children:e.score})]})}))]})})})))}))}function b(){console.log("Flipping display...");for(var e=document.getElementsByClassName("main"),t=0;t<e.length;t++)t==l?(e[t].style.display="block",e[t].style.backgroundImage="url('http://"+window.location.hostname+":5000/api/v1/image/"+e[t].getAttribute("game")+"')",e[t].style.backgroundSize="cover",e[t].style.backgroundRepeat="no-repeat"):e[t].style.display="none";++l>=e.length&&(d(),l=0),setTimeout(b.bind(),5e3)}return Object(n.useEffect)((function(){d(),setTimeout(b.bind(),5e3)}),["URL"]),Object(h.jsxs)("div",{id:"scoreDisplay",children:[Object(h.jsx)("div",{className:"main all-games",children:Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{className:"header-row",children:Object(h.jsx)("th",{colspan:"3",className:"title",children:"Best of the Best"})}),Object(h.jsxs)("tr",{className:"header-row",children:[Object(h.jsx)("th",{children:"Game"}),Object(h.jsx)("th",{children:"Player"}),Object(h.jsx)("th",{children:"Score"})]}),c]})}),o]})}function u(){var e=Object(n.useState)(0),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(0),r=Object(i.a)(s,2),o=r[0],j=r[1],b=Object(n.useState)(0),u=Object(i.a)(b,2),O=u[0],m=u[1],p=Object(n.useState)(0),f=Object(i.a)(p,2),x=f[0],g=f[1],y=Object(n.useState)(0),w=Object(i.a)(y,2),S=w[0],v=w[1];function N(){fetch("http://"+window.location.hostname+":5000/api/v1/score/all/top").then((function(e){return e.json()})).then((function(e){a(e.map((function(e){return Object(h.jsx)("tr",{style:{fontSize:"1.5em"},className:"highlight-row",children:Object(h.jsx)("td",{colspan:"4",children:Object(h.jsx)("a",{href:"/edit/"+e.game,children:e.game})})})}))),j(e.map((function(e){return e.game})))}))}Object(n.useEffect)((function(){N()}),["URL"]);return Object(h.jsx)("div",{id:"scoreDisplay",children:Object(h.jsx)("div",{className:"main all-games default-bg",children:Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{className:"header-row",children:Object(h.jsx)("th",{colspan:"4",className:"title",children:"Games"})}),c,Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:Object(h.jsx)(l.a,{style:{fontSize:"1em"},onChange:function(e){return m(e)},data:o,placeholder:"Search for a game."})}),Object(h.jsx)("td",{children:Object(h.jsx)(l.a,{style:{fontSize:"1em"},id:"playerNameInput",onChange:function(e){return v(e)},hideCaret:!0,hideEmptyPopup:!0,placeholder:"Player name."})}),Object(h.jsx)("td",{children:Object(h.jsx)(d.a,{id:"scoreInput",onChange:function(e){return g(e)},placeholder:"Player score."})}),Object(h.jsx)("td",{children:Object(h.jsx)("button",{className:"style-button",onClick:function(){fetch("http://"+window.location.hostname+":5000/api/v1/score",{method:"POST",body:JSON.stringify({name:S,score:x,game:O}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){N()}))},children:"Add"})})]})]})})})}function O(){var e=Object(n.useState)(0),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(),r=Object(i.a)(s,2),o=r[0],j=r[1],b=Object(n.useState)(),u=Object(i.a)(b,2),O=u[0],m=u[1],p=Object(n.useState)(),f=Object(i.a)(p,2),x=f[0],g=f[1];Object(n.useEffect)((function(){fetch("http://"+window.location.hostname+":5000/api/v1/score/all/top").then((function(e){return e.json()})).then((function(e){a(e.map((function(e){return e.game})))}))}),[]);return Object(h.jsx)("div",{className:"public default-bg",children:Object(h.jsxs)("div",{className:"public-inner",children:[Object(h.jsx)(l.a,{onChange:function(e){return j(e)},data:c,placeholder:"Search for a game."}),Object(h.jsx)("br",{}),Object(h.jsx)(l.a,{onChange:function(e){return m(e)},hideCaret:!0,hideEmptyPopup:!0,placeholder:"Player name."}),Object(h.jsx)("br",{}),Object(h.jsx)(d.a,{onChange:function(e){return g(e)},placeholder:"Your score."}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{className:"style-button",onClick:function(){fetch("http://"+window.location.hostname+":5000/api/v1/score",{method:"POST",body:JSON.stringify({name:O,score:x,game:o}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){window.location.href="/display"}))},children:"ADD SCORE"})]})})}function m(){var e=Object(j.f)().game,t=Object(n.useState)(0),c=Object(i.a)(t,2),a=c[0],s=c[1],r=Object(n.useState)(),o=Object(i.a)(r,2),b=o[0],u=o[1],O=Object(n.useState)(),m=Object(i.a)(O,2),p=m[0],f=m[1],x=Object(n.useState)(),g=Object(i.a)(x,2),y=g[0],w=g[1];Object(n.useEffect)((function(){fetch("http://"+window.location.hostname+":5000/api/v1/score/"+e+"/top/100").then((function(e){return e.json()})).then((function(t){s(t.map((function(t){return Object(h.jsxs)("tr",{style:{fontSize:"1.5em"},children:[Object(h.jsx)("td",{width:"5%",children:Object(h.jsx)("button",{className:"style-button",game:e,name:t.name,score:t.score,onClick:S,children:"Delete"})}),Object(h.jsx)("td",{style:{width:"10%"},children:t.name}),Object(h.jsx)("td",{children:t.score})]})})))})).catch((function(e){console.error("Error:",e)}))}),[]);var S=function(e){fetch("http://"+window.location.hostname+":5000/api/v1/score/"+e.target.getAttribute("game")+"/delete?name="+e.target.getAttribute("name")+"&score="+e.target.getAttribute("score"),{method:"DELETE"}),window.location.reload()};return Object(h.jsx)("div",{className:"default-bg console-font",children:Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{children:Object(h.jsx)("td",{colspan:"3",children:Object(h.jsx)("a",{href:"/admin",children:"<< Back"})})}),Object(h.jsx)("tr",{className:"header-row",children:Object(h.jsx)("td",{colspan:"3",children:e})}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Background Image"}),Object(h.jsxs)("td",{colspan:"2",children:[Object(h.jsx)("img",{src:"/api/v1/image/"+e,name:"bgImage",width:"400px"}),Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"file",id:"file",name:"file",onChange:function(e){u(e.target.files[0])}}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{onClick:function(){var t=new FormData;t.append("file",b),console.log("Uploading file..."),fetch("http://"+window.location.hostname+":5000/api/v1/image/"+e,{method:"POST",body:t}).then((function(e){console.log("Success:",e),window.location.reload()})).catch((function(e){console.error("Error:",e)}))},children:"Submit"})]})]}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{colspan:"3",children:"Scores"})}),a,Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:Object(h.jsx)("button",{onClick:function(){fetch("http://"+window.location.hostname+":5000/api/v1/score",{method:"POST",body:JSON.stringify({name:p,score:y,game:e}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){window.location.reload()}))},className:"style-button",children:"Add"})}),Object(h.jsx)("td",{children:Object(h.jsx)(l.a,{id:"playerNameInput",onChange:function(e){return f(e)},hideCaret:!0,hideEmptyPopup:!0,placeholder:"Player name."})}),Object(h.jsx)("td",{children:Object(h.jsx)(d.a,{id:"scoreInput",onChange:function(e){return w(e)},placeholder:"Player score."})})]})]})})}var p=function(){return Object(h.jsx)(o.a,{children:Object(h.jsx)("div",{children:Object(h.jsxs)(j.c,{children:[Object(h.jsx)(j.a,{path:"/display",children:Object(h.jsx)(b,{})}),Object(h.jsx)(j.a,{path:"/admin",children:Object(h.jsx)(u,{})}),Object(h.jsx)(j.a,{path:"/edit/:game",children:Object(h.jsx)(m,{})}),Object(h.jsx)(j.a,{path:"/public_post",children:Object(h.jsx)(O,{})})]})})})},f=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,60)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),n(e),a(e),s(e),r(e)}))};r.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(p,{})}),document.getElementById("root")),f()}},[[58,1,2]]]);
//# sourceMappingURL=main.0ee23cce.chunk.js.map
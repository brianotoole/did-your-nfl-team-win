!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(2);n(1)},function(e,t){},function(e,t){let n,o,r=document.getElementById("loading");r.style.display="none",fetch("//www.nfl.com/liveupdate/scorestrip/ss.json").then(function(e){e.ok?e.json().then(function(e){data=e,n=data.gms,init()}):console.log("Request for scores.json failed with response "+e.status+": "+e.statusText)}),init=(()=>{let e=document.getElementById("search"),t=document.getElementById("btn-search"),l=document.getElementById("results");calcScore=(e=>{for(let t=0;t<n.length;t++){let r=n[t].hnn.toLowerCase(),u=n[t].vnn.toLowerCase(),s=n[t].hs,i=n[t].vs;e===r&&s>i?o=`The ${e} won.`:e===u&&i<s?o=`The ${e} lost.`:(e===u&&i===s||e===r&&s==i)&&(o=`The ${e} tied.`),l.innerHTML=o}}),testInput=(()=>{""===e.value?l.innerHTML="Enter an NFL team name.":(r.style.display="block",l.style.display="none",setTimeout(function(){r.style.display="none",l.style.display="block",calcScore(e.value.toLowerCase())},1500))}),t.addEventListener("click",function(){testInput()}),e.addEventListener("keyup",function(e){e.preventDefault(),13===event.keyCode&&(t.click(),testInput())})})}]);
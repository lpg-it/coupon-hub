import{_ as h,u as m,r as n,c as b,o as _,g as y,a as c,w,M as B,b as o,d as t,e as k,v as C,f as i,h as g,n as F,t as M,F as p,i as S,j as A}from"./index-Du2ixtSa.js";const E={class:"bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden"},L={class:"container mx-auto px-4 py-16 relative"},T={class:"max-w-2xl mx-auto"},N={class:"relative"},V={class:"container mx-auto px-4 py-12"},D={class:"flex flex-wrap gap-4 mb-8"},I=["onClick"],$={class:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"},j={key:0,class:"text-center py-12"},q={__name:"Brands",setup(z){const v=m(),l=n(""),r=n("All"),d=n([]),f=["All","Shopping","Fashion","Electronics","Food","Travel","Beauty"],u=b(()=>{let a=d.value;if(r.value!=="All"&&(a=a.filter(e=>e.category===r.value)),l.value){const e=l.value.toLowerCase();a=a.filter(s=>s.name.toLowerCase().includes(e))}return a}),x=()=>{};return _(async()=>{try{const a=await y();d.value=a.map(e=>({...e,category:["Shopping","Fashion","Electronics","Food","Travel","Beauty"][Math.floor(Math.random()*6)]}))}catch(a){v.error("Failed to load brands"),console.error("Error loading brands:",a)}}),(a,e)=>(o(),c(B,null,{default:w(()=>[t("div",E,[e[3]||(e[3]=t("div",{class:"absolute inset-0 bg-grid-white/[0.1] bg-grid-8"},null,-1)),t("div",L,[e[2]||(e[2]=t("h1",{class:"text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in"}," All Brands ",-1)),t("div",T,[t("div",N,[k(t("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>l.value=s),type:"text",placeholder:"Search brands...",class:"w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg",onInput:x},null,544),[[C,l.value]]),e[1]||(e[1]=t("i",{class:"fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"},null,-1))])])])]),t("div",V,[t("div",D,[(o(),i(p,null,g(f,s=>t("button",{key:s,class:F(["px-6 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300",{"bg-blue-50 text-blue-600":r.value===s}]),onClick:Q=>r.value=s},M(s),11,I)),64))]),t("div",$,[(o(!0),i(p,null,g(u.value,s=>(o(),c(S,{key:s.id,brand:s},null,8,["brand"]))),128))]),u.value.length===0?(o(),i("div",j,e[4]||(e[4]=[t("p",{class:"text-gray-500 text-lg"},"No brands found matching your search criteria",-1)]))):A("",!0)])]),_:1}))}},G=h(q,[["__scopeId","data-v-369fad48"]]);export{G as default};

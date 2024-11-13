import{_ as L,u as R,r as f,c as p,o as V,k as N,a as v,w as O,M as z,l as W,b as o,f as i,d as e,t as n,m as r,F as b,h as m,n as w,p as q,T as E,q as H,j as P}from"./index-C4-4PwnD.js";const G={key:0,class:"min-h-screen bg-gray-50"},J={class:"bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden"},K={class:"container mx-auto px-4 py-16 relative"},Q={class:"flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto"},X={class:"w-32 h-32 bg-white rounded-xl p-4 shadow-lg flex-shrink-0"},Y=["src","alt"],Z={class:"flex-1 text-center md:text-left"},ee={class:"text-3xl md:text-4xl font-bold mb-4"},te={class:"flex flex-wrap gap-4 justify-center md:justify-start"},se={class:"bg-white/10 px-4 py-2 rounded-full"},le={class:"font-semibold"},ae={class:"bg-white/10 px-4 py-2 rounded-full"},oe={class:"container mx-auto px-4 py-12"},ne={class:"flex flex-col lg:flex-row gap-8"},re={class:"flex-1"},ie={class:"grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"},ce={class:"text-2xl font-bold text-gray-800 mb-2"},de={class:"text-gray-500"},ue={class:"flex flex-wrap gap-4 mb-8"},fe=["onClick"],pe={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},ge={class:"lg:w-80 flex-shrink-0"},xe={class:"bg-white rounded-xl p-6 shadow-sm sticky top-24"},he={class:"text-xl font-bold text-gray-800 mb-4"},ve={class:"text-gray-600 mb-6"},be={class:"space-y-4"},me=["href"],_e={class:"mt-6 space-y-4"},ye={class:"flex items-center gap-3 text-gray-600"},we={key:1,class:"min-h-screen bg-gray-50 flex items-center justify-center"},ke={class:"text-center"},Ce={class:"text-xl font-bold text-gray-800 mb-4"},Se={class:"bg-gray-50 rounded-lg p-3 mb-6 flex items-center gap-2"},Ue=["value"],De={class:"grid grid-cols-2 gap-4"},$e=["href"],je=["href"],Ie=["href"],Be=["href"],Me={__name:"BrandDetail",setup(Te){const k=W(),u=R(),a=f(null),g=f("all"),C=[{label:"All Offers",value:"all",icon:"fa-tags"},{label:"Coupons",value:"coupons",icon:"fa-ticket-alt"},{label:"Deals",value:"deals",icon:"fa-percent"},{label:"Best Offers",value:"best",icon:"fa-star"}],S=p(()=>{var s;return[{label:"Total Offers",value:((s=a.value)==null?void 0:s.coupons.length)||0},{label:"Avg Discount",value:$()},{label:"Success Rate",value:"98%"},{label:"Total Saved",value:"$1.2M+"}]}),U=p(()=>{if(!a.value)return[];let s=a.value.coupons;switch(g.value){case"coupons":return s.filter(t=>t.type==="Coupon");case"deals":return s.filter(t=>t.type==="Deal");case"best":return s.filter(t=>t.isSpecial);default:return s}}),D=s=>new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),$=()=>{var d;if(!((d=a.value)!=null&&d.coupons.length))return"0%";const s=a.value.coupons.map(l=>parseInt(l.discount)).filter(l=>!isNaN(l));if(!s.length)return"Varies";const t=s.reduce((l,y)=>l+y,0)/s.length;return`${Math.round(t)}%`},x=f(!1),j=f(null),c=p(()=>window.location.href),h=p(()=>{var s;return`Check out these amazing deals from ${(s=a.value)==null?void 0:s.name} on CouponHub!`}),I=()=>{const s=encodeURIComponent(h.value),t=encodeURIComponent(c.value);return`https://twitter.com/intent/tweet?text=${s}&url=${t}`},B=()=>`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(c.value)}`,M=()=>{const s=encodeURIComponent(c.value),t=encodeURIComponent(h.value);return`https://www.linkedin.com/sharing/share-offsite/?url=${s}&title=${t}`},T=()=>`https://wa.me/?text=${encodeURIComponent(`${h.value}
${c.value}`)}`,A=async()=>{try{await navigator.clipboard.writeText(c.value),u.success("Link copied to clipboard!")}catch{u.error("Failed to copy link")}},F=()=>{x.value=!0},_=()=>{x.value=!1};return V(async()=>{try{a.value=await N(k.params.id),a.value||u.error("Brand not found")}catch{u.error("Failed to load brand details")}}),(s,t)=>(o(),v(z,null,{default:O(()=>{var d;return[a.value?(o(),i("div",G,[e("div",J,[t[2]||(t[2]=e("div",{class:"absolute inset-0 bg-grid-white/[0.1] bg-grid-8"},null,-1)),e("div",K,[e("div",Q,[e("div",X,[e("img",{src:a.value.logo,alt:a.value.name,class:"w-full h-full object-contain"},null,8,Y)]),e("div",Z,[e("h1",ee,n(a.value.name)+" Coupons & Promo Codes",1),e("div",te,[e("div",se,[e("span",le,n(a.value.coupons.length),1),t[1]||(t[1]=r(" Active Offers "))]),e("div",ae," Last Updated: "+n(D(new Date)),1)])])])])]),e("div",oe,[e("div",ne,[e("div",re,[e("div",ie,[(o(!0),i(b,null,m(S.value,l=>(o(),i("div",{key:l.label,class:"bg-white rounded-xl p-6 text-center shadow-sm"},[e("div",ce,n(l.value),1),e("div",de,n(l.label),1)]))),128))]),e("div",ue,[(o(),i(b,null,m(C,l=>e("button",{key:l.value,class:w(["px-6 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2",{"bg-blue-50 text-blue-600":g.value===l.value}]),onClick:y=>g.value=l.value},[e("i",{class:w(["fas",l.icon])},null,2),r(" "+n(l.label),1)],10,fe)),64))]),e("div",pe,[(o(!0),i(b,null,m(U.value,l=>(o(),v(q,{key:l.id,coupon:l},null,8,["coupon"]))),128))])]),e("div",ge,[e("div",xe,[e("h2",he,"About "+n(a.value.name),1),e("p",ve,n(a.value.description),1),e("div",be,[e("a",{href:a.value.website,target:"_blank",class:"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full"},t[3]||(t[3]=[e("i",{class:"fas fa-external-link-alt"},null,-1),r(" Visit Store ")]),8,me),e("button",{onClick:F,class:"border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 w-full"},t[4]||(t[4]=[e("i",{class:"fas fa-share-alt"},null,-1),r(" Share ")]))]),e("div",_e,[t[6]||(t[6]=e("div",{class:"flex items-center gap-3 text-gray-600"},[e("i",{class:"fas fa-check-circle text-green-500"}),e("span",null,"Verified Coupons")],-1)),t[7]||(t[7]=e("div",{class:"flex items-center gap-3 text-gray-600"},[e("i",{class:"fas fa-clock text-blue-500"}),e("span",null,"Updated Daily")],-1)),e("div",ye,[t[5]||(t[5]=e("i",{class:"fas fa-users text-purple-500"},null,-1)),e("span",null,n(Math.floor(Math.random()*1e4))+"+ Users Saved",1)])])])])])])])):(o(),i("div",we,t[8]||(t[8]=[e("div",{class:"text-center"},[e("div",{class:"text-6xl text-gray-300 mb-4"},[e("i",{class:"fas fa-spinner fa-spin"})]),e("p",{class:"text-gray-500"},"Loading brand details...")],-1)]))),(o(),v(E,{to:"body"},[x.value?(o(),i("div",{key:0,class:"fixed inset-0 bg-black/50 flex items-center justify-center z-50",onClick:_},[e("div",{class:"bg-white rounded-xl p-8 max-w-md w-full mx-4 transform transition-all",onClick:t[0]||(t[0]=H(()=>{},["stop"]))},[e("div",ke,[e("h3",Ce,"Share "+n((d=a.value)==null?void 0:d.name),1),t[14]||(t[14]=e("p",{class:"text-gray-600 mb-6"},"Share these deals with your friends",-1)),e("div",Se,[e("input",{ref_key:"shareUrlInput",ref:j,type:"text",value:c.value,readonly:"",class:"flex-1 bg-transparent border-none focus:outline-none text-gray-600"},null,8,Ue),e("button",{onClick:A,class:"text-blue-600 hover:text-blue-700 px-3 py-1"},t[9]||(t[9]=[e("i",{class:"fas fa-copy"},null,-1)]))]),e("div",De,[e("a",{href:I(),target:"_blank",class:"flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"},t[10]||(t[10]=[e("i",{class:"fab fa-twitter"},null,-1),r(" Twitter ")]),8,$e),e("a",{href:B(),target:"_blank",class:"flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#4267B2] text-white hover:bg-[#365899] transition-colors"},t[11]||(t[11]=[e("i",{class:"fab fa-facebook"},null,-1),r(" Facebook ")]),8,je),e("a",{href:M(),target:"_blank",class:"flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0077B5] text-white hover:bg-[#006399] transition-colors"},t[12]||(t[12]=[e("i",{class:"fab fa-linkedin"},null,-1),r(" LinkedIn ")]),8,Ie),e("a",{href:T(),target:"_blank",class:"flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"},t[13]||(t[13]=[e("i",{class:"fab fa-whatsapp"},null,-1),r(" WhatsApp ")]),8,Be)]),e("button",{onClick:_,class:"mt-6 text-gray-500 hover:text-gray-700"}," Close ")])])])):P("",!0)]))]}),_:1}))}},Fe=L(Me,[["__scopeId","data-v-db3e6d55"]]);export{Fe as default};
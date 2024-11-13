import{u as f,r as b,c,o as y,D as w,a as k,w as i,M as B,l as S,A as D,b as o,f as n,d as t,B as u,m as r,t as a,F as h,h as m}from"./index-Du2ixtSa.js";const M={key:0,class:"min-h-screen bg-gray-50"},T={class:"bg-gradient-to-r from-blue-500 to-indigo-600 text-white"},A={class:"container mx-auto px-4 py-16"},L={class:"max-w-4xl mx-auto"},N={class:"flex items-center gap-4 mb-6"},F={class:"text-blue-100"},j={class:"text-4xl md:text-5xl font-bold mb-6"},C={class:"flex items-center gap-6 text-blue-100"},H={class:"flex items-center gap-3"},V=["src","alt"],z={class:"font-medium"},E={class:"text-sm"},P={class:"flex items-center gap-4"},R={class:"container mx-auto px-4 py-12"},G={class:"max-w-4xl mx-auto"},O=["src","alt"],U={class:"bg-white rounded-xl p-8 shadow-sm"},$=["innerHTML"],q={class:"mt-12 pt-8 border-t"},I={class:"flex flex-wrap gap-2"},J={class:"bg-white rounded-xl p-8 shadow-sm mt-8"},K={class:"flex items-center gap-6"},Q=["src","alt"],W={class:"text-xl font-bold text-gray-800 mb-2"},X={class:"text-gray-600"},Y={class:"mt-12"},Z={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},tt={class:"relative overflow-hidden"},st=["src","alt"],et={class:"p-6"},at={class:"text-xl font-bold text-gray-800 mb-2"},lt={class:"text-gray-600 line-clamp-2"},ot={key:1,class:"min-h-screen bg-gray-50 flex items-center justify-center"},rt={__name:"BlogDetail",setup(nt){const p=S(),x=f(),s=b(null),g=c(()=>["Shopping Tips","Money Saving","Online Shopping","Deals","Coupons"]),v=c(()=>[{id:2,title:"Amazon Shopping Secrets: Hidden Deals & Tips",excerpt:"Discover lesser-known Amazon shopping hacks, prime benefits, and how to find the best deals.",image:"https://images.unsplash.com/photo-1523240795612-9a054b0db644"},{id:3,title:"Nike: Ultimate Guide to Sneaker Deals",excerpt:"From release dates to exclusive discounts, learn how to get the best deals on Nike sneakers.",image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3"}]);return y(async()=>{try{s.value=await w(p.params.id)}catch{x.error("Failed to load article")}}),(_,e)=>{const d=D("router-link");return o(),k(B,null,{default:i(()=>[s.value?(o(),n("div",M,[t("div",T,[t("div",A,[t("div",L,[t("div",N,[u(d,{to:"/blogs",class:"text-blue-100 hover:text-white transition-colors flex items-center gap-2"},{default:i(()=>e[0]||(e[0]=[t("i",{class:"fas fa-arrow-left"},null,-1),r(" Back to Blog ")])),_:1}),e[1]||(e[1]=t("span",{class:"text-blue-200"},"|",-1)),t("span",F,a(s.value.category),1)]),t("h1",j,a(s.value.title),1),t("div",C,[t("div",H,[t("img",{src:s.value.author.avatar,alt:s.value.author.name,class:"w-10 h-10 rounded-full"},null,8,V),t("div",null,[t("div",z,a(s.value.author.name),1),t("div",E,a(s.value.author.role),1)])]),t("div",P,[t("span",null,[e[2]||(e[2]=t("i",{class:"fas fa-calendar-alt mr-2"},null,-1)),r(a(s.value.date),1)]),t("span",null,[e[3]||(e[3]=t("i",{class:"fas fa-eye mr-2"},null,-1)),r(a(s.value.views)+" views",1)])])])])])]),t("div",R,[t("div",G,[t("img",{src:s.value.image,alt:s.value.title,class:"w-full h-[400px] object-cover rounded-xl mb-12"},null,8,O),t("div",U,[t("div",{class:"prose max-w-none",innerHTML:s.value.content},null,8,$),t("div",q,[t("div",I,[(o(!0),n(h,null,m(g.value,l=>(o(),n("span",{key:l,class:"px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm"}," #"+a(l),1))),128))])]),e[4]||(e[4]=t("div",{class:"mt-8 flex items-center gap-4"},[t("span",{class:"text-gray-600"},"Share this article:"),t("div",{class:"flex gap-4"},[t("button",{class:"text-gray-600 hover:text-blue-600"},[t("i",{class:"fab fa-twitter"})]),t("button",{class:"text-gray-600 hover:text-blue-600"},[t("i",{class:"fab fa-facebook"})]),t("button",{class:"text-gray-600 hover:text-blue-600"},[t("i",{class:"fab fa-linkedin"})]),t("button",{class:"text-gray-600 hover:text-blue-600"},[t("i",{class:"fas fa-link"})])])],-1))]),t("div",J,[t("div",K,[t("img",{src:s.value.author.avatar,alt:s.value.author.name,class:"w-16 h-16 rounded-full"},null,8,Q),t("div",null,[t("h3",W,a(s.value.author.name),1),t("p",X,a(s.value.author.role),1),e[5]||(e[5]=t("p",{class:"text-gray-600 mt-2"}," Expert in finding and verifying the best deals and discounts. Passionate about helping people save money while shopping online. ",-1))])])]),t("div",Y,[e[6]||(e[6]=t("h2",{class:"text-2xl font-bold text-gray-800 mb-6"},"Related Articles",-1)),t("div",Z,[(o(!0),n(h,null,m(v.value,l=>(o(),n("article",{key:l.id,class:"bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all"},[u(d,{to:`/blogs/${l.id}`},{default:i(()=>[t("div",tt,[t("img",{src:l.image,alt:l.title,class:"w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"},null,8,st)]),t("div",et,[t("h3",at,a(l.title),1),t("p",lt,a(l.excerpt),1)])]),_:2},1032,["to"])]))),128))])])])])])):(o(),n("div",ot,e[7]||(e[7]=[t("div",{class:"text-center"},[t("div",{class:"text-6xl text-gray-300 mb-4"},[t("i",{class:"fas fa-spinner fa-spin"})]),t("p",{class:"text-gray-500"},"Loading article...")],-1)])))]),_:1})}}};export{rt as default};

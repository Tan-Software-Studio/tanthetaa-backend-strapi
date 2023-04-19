"use strict";(self.webpackChunkstrapi_backend=self.webpackChunkstrapi_backend||[]).push([[4121],{6784:(R,b,t)=>{t.r(b),t.d(b,{default:()=>ce});var e=t(67294),l=t(81849),g=t(87751),h=t(16550),v=t(86896),O=t(14087),y=t(17034),D=t(185),r=t(53979),T=t(36989),s=t(75515),C=t(29728),A=t(49066),Y=t(41580),Q=t(38939),X=t(49386),J=t(8060),Z=t(79031),c=t(37909),I=t(41451),q=t(63237),_=t(15234),U=t(11047),ee=t(3566),$=t(12028),te=t(89722),x=t(96315),H=t(20022),ne=t(4585),le=t(86031),oe=t(18172),ae=t(36968),se=t.n(ae);const ie={webhooks:[],webhooksToDelete:[],webhookToDelete:null,loadingWebhooks:!0},re=(d,i)=>(0,oe.ZP)(d,a=>{switch(i.type){case"GET_DATA_SUCCEEDED":{a.webhooks=i.data,a.loadingWebhooks=!1;break}case"TOGGLE_LOADING":{a.loadingWebhooks=!d.loadingWebhooks;break}case"SET_WEBHOOK_ENABLED":{se()(a,["webhooks",...i.keys],i.value);break}case"SET_WEBHOOK_TO_DELETE":{a.webhookToDelete=i.id;break}case"SET_WEBHOOKS_TO_DELETE":{i.value?a.webhooksToDelete.push(i.id):a.webhooksToDelete=d.webhooksToDelete.filter(m=>m!==i.id);break}case"SET_ALL_WEBHOOKS_TO_DELETE":{d.webhooksToDelete.length===0?a.webhooksToDelete=d.webhooks.map(m=>m.id):a.webhooksToDelete=[];break}case"WEBHOOKS_DELETED":{a.webhooks=d.webhooks.filter(m=>!d.webhooksToDelete.includes(m.id)),a.webhooksToDelete=[];break}case"WEBHOOK_DELETED":{a.webhooks=d.webhooks.filter((m,M)=>M!==i.index),a.webhookToDelete=null;break}default:return a}}),de=()=>{const{isLoading:d,allowedActions:{canCreate:i,canRead:a,canUpdate:m,canDelete:M}}=(0,l.ss)(g.Z.settings.webhooks),W=(0,l.lm)(),f=(0,e.useRef)(!0),{formatMessage:o}=(0,v.Z)(),[Ee,p]=(0,e.useState)(!1),[{webhooks:k,webhooksToDelete:w,webhookToDelete:S,loadingWebhooks:K},u]=(0,e.useReducer)(re,ie),{notifyStatus:he}=(0,O.G)();(0,l.go)();const{push:me}=(0,h.k6)(),{pathname:G}=(0,h.TH)(),B=k.length,L=w.length,V=n=>k.findIndex(E=>E.id===n);(0,e.useEffect)(()=>(f.current=!0,()=>{f.current=!1}),[]),(0,e.useEffect)(()=>{a&&ue()},[a]);const ue=async()=>{try{const{data:n}=await(0,l.WY)("/admin/webhooks",{method:"GET"});f.current&&(u({type:"GET_DATA_SUCCEEDED",data:n}),he("webhooks have been loaded"))}catch(n){console.log(n),f.current&&(n.code!==20&&W({type:"warning",message:{id:"notification.error"}}),u({type:"TOGGLE_LOADING"}))}},ge=()=>{p(n=>!n)},Te=()=>{S?De():fe()},De=async()=>{try{await(0,l.WY)(`/admin/webhooks/${S}`,{method:"DELETE"}),u({type:"WEBHOOK_DELETED",index:V(S)})}catch(n){n.code!==20&&W({type:"warning",message:{id:"notification.error"}})}p(!1)},fe=async()=>{const n={ids:w};try{await(0,l.WY)("/admin/webhooks/batch-delete",{method:"POST",body:n}),f.current&&u({type:"WEBHOOKS_DELETED"})}catch(E){f.current&&E.code!==20&&W({type:"warning",message:{id:"notification.error"}})}p(!1)},j=n=>{p(!0),n!=="all"&&u({type:"SET_WEBHOOK_TO_DELETE",id:n})},be=async(n,E)=>{const N=V(E),ye=k[N],F=[N,"isEnabled"],z={...ye,isEnabled:n};delete z.id;try{u({type:"SET_WEBHOOK_ENABLED",keys:F,value:n}),await(0,l.WY)(`/admin/webhooks/${E}`,{method:"PUT",body:z})}catch(Le){f.current&&(u({type:"SET_WEBHOOK_ENABLED",keys:F,value:!n}),Le.code!==20&&W({type:"warning",message:{id:"notification.error"}}))}},ve=()=>{u({type:"SET_ALL_WEBHOOKS_TO_DELETE"})},Oe=(n,E)=>{u({type:"SET_WEBHOOKS_TO_DELETE",value:n,id:E})},P=n=>{me(`${G}/${n}`)};return e.createElement(y.A,null,e.createElement(l.SL,{name:"Webhooks"}),e.createElement(D.o,{"aria-busy":d||K},e.createElement(r.T,{title:o({id:"Settings.webhooks.title",defaultMessage:"Webhooks"}),subtitle:o({id:"Settings.webhooks.list.description",defaultMessage:"Get POST changes notifications"}),primaryAction:i&&!K&&e.createElement(l.Qj,{startIcon:e.createElement(x.Z,null),variant:"default",to:`${G}/create`,size:"S"},o({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))}),L>0&&M&&e.createElement(T.Z,{startActions:e.createElement(e.Fragment,null,e.createElement(s.Z,{variant:"epsilon",textColor:"neutral600"},o({id:"Settings.webhooks.to.delete",defaultMessage:"{webhooksToDeleteLength, plural, one {# asset} other {# assets}} selected"},{webhooksToDeleteLength:L})),e.createElement(C.z,{onClick:()=>j("all"),startIcon:e.createElement(H.Z,null),size:"L",variant:"danger-light"},o({id:"global.delete",defaultMessage:"Delete"})))}),e.createElement(A.D,null,d||K?e.createElement(Y.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(l.dO,null)):B>0?e.createElement(Q.i,{colCount:5,rowCount:B+1,footer:e.createElement(X.c,{onClick:()=>i?P("create"):{},icon:e.createElement(x.Z,null)},o({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))},e.createElement(J.h,null,e.createElement(Z.Tr,null,e.createElement(c.Th,null,e.createElement(I.C,{"aria-label":o({id:"global.select-all-entries",defaultMessage:"Select all entries"}),indeterminate:L>0&&L<B,value:L===B,onValueChange:ve})),e.createElement(c.Th,{width:"20%"},e.createElement(s.Z,{variant:"sigma",textColor:"neutral600"},o({id:"global.name",defaultMessage:"Name"}))),e.createElement(c.Th,{width:"60%"},e.createElement(s.Z,{variant:"sigma",textColor:"neutral600"},o({id:"Settings.webhooks.form.url",defaultMessage:"URL"}))),e.createElement(c.Th,{width:"20%"},e.createElement(s.Z,{variant:"sigma",textColor:"neutral600"},o({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"}))),e.createElement(c.Th,null,e.createElement(q.T,null,o({id:"Settings.webhooks.list.th.actions",defaultMessage:"Actions"}))))),e.createElement(_.p,null,k.map(n=>e.createElement(Z.Tr,{key:n.id,...(0,l.X7)({fn:()=>P(n.id),condition:m})},e.createElement(c.Td,{...l.UW},e.createElement(I.C,{"aria-label":`${o({id:"global.select",defaultMessage:"Select"})} ${n.name}`,value:w?.includes(n.id),onValueChange:E=>Oe(E,n.id),id:"select",name:"select"})),e.createElement(c.Td,null,e.createElement(s.Z,{fontWeight:"semiBold",textColor:"neutral800"},n.name)),e.createElement(c.Td,null,e.createElement(s.Z,{textColor:"neutral800"},n.url)),e.createElement(c.Td,null,e.createElement(U.k,{...l.UW},e.createElement(ee.r,{onLabel:o({id:"global.enabled",defaultMessage:"Enabled"}),offLabel:o({id:"global.disabled",defaultMessage:"Disabled"}),label:`${n.name} ${o({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"})}`,selected:n.isEnabled,onChange:()=>be(!n.isEnabled,n.id),visibleLabels:!0}))),e.createElement(c.Td,null,e.createElement(U.k,{gap:1,...l.UW},m&&e.createElement($.h,{onClick:()=>{P(n.id)},label:o({id:"Settings.webhooks.events.update",defaultMessage:"Update"}),icon:e.createElement(ne.Z,null),noBorder:!0}),M&&e.createElement($.h,{onClick:()=>j(n.id),label:o({id:"global.delete",defaultMessage:"Delete"}),icon:e.createElement(H.Z,null),noBorder:!0,id:`delete-${n.id}`}))))))):e.createElement(te.x,{icon:e.createElement(le.Z,{width:"160px"}),content:o({id:"Settings.webhooks.list.empty.description",defaultMessage:"No webhooks found"}),action:e.createElement(C.z,{variant:"secondary",startIcon:e.createElement(x.Z,null),onClick:()=>i?P("create"):{}},o({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))}))),e.createElement(l.QH,{isOpen:Ee,onToggleDialog:ge,onConfirm:Te}))},ce=()=>e.createElement(l.O4,{permissions:g.Z.settings.webhooks.main},e.createElement(de,null))},36989:(R,b,t)=>{t.d(b,{Z:()=>D});var e=t(67294),l=t(45697),g=t(1565),h=t(41580),v=t(11047);const O=(0,g.ZP)(v.k)`
  & > * + * {
    margin-left: ${({theme:r})=>r.spaces[2]};
  }

  margin-left: ${({pullRight:r})=>r?"auto":void 0};
`,y=(0,g.ZP)(O)`
  flex-shrink: 0;
`,D=({startActions:r,endActions:T})=>r||T?e.createElement(h.x,{paddingLeft:10,paddingRight:10},e.createElement(h.x,{paddingBottom:4},e.createElement(v.k,{justifyContent:"space-between",alignItems:"flex-start"},r&&e.createElement(O,{wrap:"wrap"},r),T&&e.createElement(y,{pullRight:!0},T)))):null;D.defaultProps={endActions:void 0,startActions:void 0},D.propTypes={endActions:l.node,startActions:l.node}},49386:(R,b,t)=>{t.d(b,{c:()=>T});var e=t(67294),l=t(45697),g=t(1565),h=t(41580),v=t(70004),O=t(11047),y=t(75515);const D=(0,g.ZP)(h.x)`
  height: ${24/16}rem;
  width: ${24/16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:s})=>s.colors.primary600};
  }
`,r=(0,g.ZP)(h.x)`
  border-radius: 0 0 ${({theme:s})=>s.borderRadius} ${({theme:s})=>s.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,T=({children:s,icon:C,...A})=>e.createElement("div",null,e.createElement(v.i,null),e.createElement(r,{as:"button",background:"primary100",padding:5,...A},e.createElement(O.k,null,e.createElement(D,{"aria-hidden":!0,background:"primary200"},C),e.createElement(h.x,{paddingLeft:3},e.createElement(y.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600"},s)))));T.propTypes={children:l.string.isRequired,icon:l.node.isRequired}}}]);

"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4776],{4776:(m,l,n)=>{n.r(l),n.d(l,{PagosPageModule:()=>d});var u=n(6814),p=n(95),c=n(9004),i=n(3044),a=n(6689),g=n(9862);let P=(()=>{var t;class o{constructor(e){this.http=e,this.apiKey="5737EF2A-C228-4AA7-AAAE-8F69FC86LF19",this.apiSecret="66e3eaf21090fceff589659881baa31bbd05d36a",this.flowBaseUrl="https://sandbox.flow.cl/api"}makePayment(e){return this.http.post(`${this.flowBaseUrl}/payment/create`,e,{headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(`${this.apiKey}:${this.apiSecret}`)}`}})}}return(t=o).\u0275fac=function(e){return new(e||t)(a.LFG(g.eN))},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),o})();const f=[{path:"",component:(()=>{var t;class o{constructor(e){this.flowService=e,this.enlaceDePago="https://www.flow.cl/btn.php?token=27mhkwc"}irAPago(){window.location.href=this.enlaceDePago}}return(t=o).\u0275fac=function(e){return new(e||t)(a.Y36(P))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-pagos"]],decls:7,vars:0,consts:[[1,"boton-pago",3,"click"]],template:function(e,r){1&e&&(a.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),a._uU(3,"pagos"),a.qZA()()(),a.TgZ(4,"ion-content")(5,"button",0),a.NdJ("click",function(){return r.irAPago()}),a._uU(6,"Pagar Ahora"),a.qZA()())},dependencies:[c.W2,c.Gu,c.wd,c.sr]}),o})()}];let h=(()=>{var t;class o{}return(t=o).\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[i.Bz.forChild(f),i.Bz]}),o})(),d=(()=>{var t;class o{}return(t=o).\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[u.ez,p.u5,c.Pc,h]}),o})()}}]);
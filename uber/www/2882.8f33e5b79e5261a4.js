"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2882],{2882:(b,d,t)=>{t.r(d),t.d(d,{AskEmailPageModule:()=>C});var m=t(177),l=t(4341),r=t(849),u=t(8986),o=t(4438),p=t(7036),h=t(6210);const P=[{path:"",component:(()=>{var n;class i{constructor(e,a,g,c){this.location=e,this.valCorr=a,this.db=g,this.router=c,this.mensajes=[],this.correo="Ingrese su Correo"}ngOnInit(){}goBack(){this.location.back()}ingresoCorreo(){this.mensajes=[],this.correo?this.validarFormatoCorreo(this.correo)?this.db.buscarusuarioPorCorreo(this.correo).then(e=>{e?this.router.navigate(["/recuperar",e.usuarioid]):this.mensajes.push("El usuario con el correo ingresado no fue encontrado.")}).catch(e=>{console.error("Error al buscar usuario por correo:",e),this.mensajes.push("Error al buscar usuario por correo.")}):this.mensajes.push("Formato de correo electr\xf3nico no v\xe1lido."):this.mensajes.push("Por favor, proporciona correo electr\xf3nico y contrase\xf1a.")}validarFormatoCorreo(e){return this.valCorr.validaremail(e)}}return(n=i).\u0275fac=function(e){return new(e||n)(o.rXU(m.aZ),o.rXU(p.v),o.rXU(h.J),o.rXU(u.Ix))},n.\u0275cmp=o.VBU({type:n,selectors:[["app-ask-email"]],decls:17,vars:3,consts:[[1,"content",3,"fullscreen"],[1,"background-gradient"],[1,"center-container"],[1,"login-card"],[1,"custom-item-head"],["slot","start"],["fill","clear","color","success",1,"back-button",3,"click"],["name","arrow-back"],[1,"custom-item"],["position","floating","color","primary",3,"ngModelChange","ngModel"],["type","email"],["expand","full","color","success"]],template:function(e,a){1&e&&(o.j41(0,"ion-content",0),o.nrm(1,"div",1),o.j41(2,"div",2)(3,"ion-card",3)(4,"ion-item",4)(5,"ion-buttons",5)(6,"ion-button",6),o.bIt("click",function(){return a.goBack()}),o.nrm(7,"ion-icon",7),o.k0s()(),o.j41(8,"p"),o.EFF(9,"Recuperar contrase\xf1a"),o.k0s()(),o.j41(10,"ion-card-content")(11,"ion-item",8)(12,"ion-label",9),o.mxI("ngModelChange",function(c){return o.DH7(a.correo,c)||(a.correo=c),c}),o.EFF(13),o.k0s(),o.nrm(14,"ion-input",10),o.k0s(),o.j41(15,"ion-button",11),o.EFF(16,"Seguir"),o.k0s()()()()()),2&e&&(o.Y8G("fullscreen",!0),o.R7$(12),o.R50("ngModel",a.correo),o.R7$(),o.JRh(a.correo))},dependencies:[l.BC,l.vS,r.Jm,r.QW,r.b_,r.I9,r.W9,r.iq,r.$w,r.uz,r.he,r.Gw],styles:['@charset "UTF-8";ion-card.login-card[_ngcontent-%COMP%]{width:90%;margin:auto;text-align:center;background-color:rgba(255,255,255,.9);border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,.1)}ion-card.login-card[_ngcontent-%COMP%]   .custom-item[_ngcontent-%COMP%]{width:100%;background-color:rgba(255,255,255,.9);border-radius:10px;box-shadow:0 4px 6px rgba(255,255,255,.1);margin-top:10px}ion-card.login-card[_ngcontent-%COMP%]   .custom-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{font-size:14px}ion-card.login-card[_ngcontent-%COMP%]   .custom-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:14px}.background-gradient[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,#00b894,#0984e3);z-index:-1}.center-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}ion-button[_ngcontent-%COMP%]{margin-top:10px}.recovery-link[_ngcontent-%COMP%]{text-decoration:underline;cursor:pointer}.p[_ngcontent-%COMP%]{opacity:.7}.container[_ngcontent-%COMP%]{width:100%;height:100%}.mensaje-error[_ngcontent-%COMP%]{color:red;margin-top:10px}']}),i})()}];let k=(()=>{var n;class i{}return(n=i).\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.$C({type:n}),n.\u0275inj=o.G2t({imports:[u.iI.forChild(P),u.iI]}),i})(),C=(()=>{var n;class i{}return(n=i).\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.$C({type:n}),n.\u0275inj=o.G2t({imports:[m.MD,l.YN,r.bv,k]}),i})()}}]);
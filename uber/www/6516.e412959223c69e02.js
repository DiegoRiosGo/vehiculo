"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6516],{6516:(x,g,e)=>{e.r(g),e.d(g,{AdminvistaPageModule:()=>b});var u=e(6814),m=e(95),r=e(9004),l=e(3044),P=e(5861),n=e(6689),p=e(4414),h=e(9167);const f=function(){return["/logout"]},M=function(){return["/registroadmin"]},v=function(){return["/adminvehiculo"]},C=[{path:"",component:(()=>{var t;class a{constructor(o,i,s,d){this.router=o,this.alertController=i,this.aroute=s,this.db=d}ngOnInit(){this.aroute.paramMap.subscribe(o=>{var i;const s=null!==(i=o.get("usuarioid"))&&void 0!==i?i:"";this.usuarioid=parseInt(s,10)||0,console.log("Usuarioid en PerfilUsuarioPage:",this.usuarioid),this.usuarioid&&this.db.buscarUsuarioPorId(this.usuarioid).then(d=>{d&&(this.nombreUsuario=d.nombre)}).catch(d=>{})})}logout(){var o=this;return(0,P.Z)(function*(){yield(yield o.alertController.create({header:"Cerrar sesi\xf3n",message:"\xbfEst\xe1s seguro de que quieres cerrar sesi\xf3n?",buttons:[{text:"Cancelar",role:"cancel",cssClass:"secondary",handler:s=>{}},{text:"S\xed",handler:()=>{o.router.navigate(["/home"])}}]})).present()})()}editProfile(){console.log("si toy antes ."),console.log("ID de Usuario P user:",this.usuarioid),console.log("ID de Usuario P user:",this.usuarioid),this.router.navigate(["/moduser",this.usuarioid]),console.log("si toy.")}}return(t=a).\u0275fac=function(o){return new(o||t)(n.Y36(l.F0),n.Y36(p.Br),n.Y36(l.gz),n.Y36(h.A))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-adminvista"]],decls:23,vars:8,consts:[[1,"admin-content",3,"fullscreen"],[1,"background-gradient"],[1,"center-container"],[1,"login-card"],[1,"custom-item"],["name","settings","slot","start","color","primary",1,"settings-icon",3,"click"],[1,"profile-name"],["name","log-out","slot","end","color","primary",1,"logout-icon",3,"routerLink","click"],[1,"welcome-message"],[1,"admin-icons"],[1,"admin-icon"],["name","people","color","secondary",2,"--ion-icon-size","3em",3,"routerLink"],[1,"admin-label"],["name","car-sport","color","success",2,"--ion-icon-size","3em",3,"routerLink"]],template:function(o,i){1&o&&(n.TgZ(0,"ion-content",0)(1,"div",1)(2,"div",2)(3,"ion-card",3)(4,"ion-item",4)(5,"ion-icon",5),n.NdJ("click",function(){return i.editProfile()}),n._uU(6,"Edit Perfil"),n.qZA(),n.TgZ(7,"div",6),n._uU(8),n.qZA(),n.TgZ(9,"ion-icon",7),n.NdJ("click",function(){return i.logout()}),n.qZA()(),n.TgZ(10,"ion-row",8)(11,"ion-col")(12,"h1"),n._uU(13,"Bienvenido admin"),n.qZA()()(),n.TgZ(14,"ion-row",9)(15,"ion-col",10),n._UZ(16,"ion-icon",11),n.TgZ(17,"p",12),n._uU(18,"Registro Clientes"),n.qZA()(),n.TgZ(19,"ion-col",10),n._UZ(20,"ion-icon",13),n.TgZ(21,"p",12),n._uU(22,"Registro Veh\xedculos"),n.qZA()()()()()()()),2&o&&(n.Q6J("fullscreen",!0),n.xp6(8),n.hij(" ",i.nombreUsuario,""),n.xp6(1),n.Q6J("routerLink",n.DdM(5,f)),n.xp6(7),n.Q6J("routerLink",n.DdM(6,M)),n.xp6(4),n.Q6J("routerLink",n.DdM(7,v)))},dependencies:[r.PM,r.wI,r.W2,r.gu,r.Ie,r.Nd,r.YI,l.rH],styles:['@charset "UTF-8";ion-content.admin-content[_ngcontent-%COMP%]   .welcome-message[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{text-align:center;margin-top:20px}ion-content.admin-content[_ngcontent-%COMP%]   .welcome-message[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.9em;color:#3498db}ion-content.admin-content[_ngcontent-%COMP%]   .admin-icons[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;font-size:40px;align-items:center;margin-top:20px}ion-content.admin-content[_ngcontent-%COMP%]   .admin-icons[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .admin-icon[_ngcontent-%COMP%]{color:#2ecc71;margin-bottom:5px}ion-content.admin-content[_ngcontent-%COMP%]   .admin-icons[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .admin-label[_ngcontent-%COMP%]{text-align:center;font-size:.5em;color:#34495e}ion-content.admin-content[_ngcontent-%COMP%]   ion-card.profile-card[_ngcontent-%COMP%]{width:80%;margin:auto;text-align:center;background-color:rgba(255,255,255,.9);border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,.1)}ion-content.admin-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{color:#fff}ion-content.admin-content[_ngcontent-%COMP%]   .profile-image[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;border-radius:50%;background:linear-gradient(to bottom,#00b894,#0984e3);width:100px;height:100px;margin:0 auto 20px}ion-content.admin-content[_ngcontent-%COMP%]   .profile-email[_ngcontent-%COMP%]{color:rgba(0,0,0,.6)}ion-content.admin-content[_ngcontent-%COMP%]   .background-gradient[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,#00b894,#0984e3);z-index:-1}.center-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}ion-card.login-card[_ngcontent-%COMP%]{width:80%;margin:auto;text-align:center;background-color:rgba(255,255,255,.9);border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,.1)}']}),a})()}];let O=(()=>{var t;class a{}return(t=a).\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[l.Bz.forChild(C),l.Bz]}),a})(),b=(()=>{var t;class a{}return(t=a).\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[u.ez,m.u5,r.Pc,O]}),a})()}}]);
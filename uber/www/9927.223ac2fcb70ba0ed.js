"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9927],{9927:(k,d,l)=>{l.r(d),l.d(d,{RegistroadminPageModule:()=>j});var m=l(177),u=l(4341),t=l(849),R=l(8986),c=l(467),i=l(4438),p=l(6210);function _(n,s){if(1&n&&(i.j41(0,"ion-select-option",14),i.EFF(1),i.k0s()),2&n){const r=s.$implicit;i.Y8G("value",r.id),i.R7$(),i.JRh(r.nomrol)}}function h(n,s){if(1&n){const r=i.RV6();i.j41(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),i.EFF(3),i.k0s()(),i.j41(4,"ion-card-content")(5,"p"),i.EFF(6),i.k0s(),i.j41(7,"p"),i.EFF(8),i.k0s(),i.j41(9,"p"),i.EFF(10),i.k0s()(),i.j41(11,"ion-row")(12,"ion-col")(13,"ion-item")(14,"ion-label"),i.EFF(15,"Rol:"),i.k0s(),i.j41(16,"ion-select",8),i.mxI("ngModelChange",function(e){i.eBV(r);const a=i.XpG();return i.DH7(a.nuevoRolId,e)||(a.nuevoRolId=e),i.Njj(e)}),i.DNE(17,_,2,2,"ion-select-option",9),i.k0s()()(),i.j41(18,"ion-col")(19,"ion-button",10),i.bIt("click",function(){const e=i.eBV(r).$implicit,a=i.XpG();return i.Njj(a.actualizarRolUsuario(e.usuarioid,a.nuevoRolId))}),i.nrm(20,"ion-icon",11),i.EFF(21," Actualizar Rol "),i.k0s()(),i.j41(22,"ion-col")(23,"ion-button",12),i.bIt("click",function(){const e=i.eBV(r).$implicit,a=i.XpG();return i.Njj(a.eliminarUsuario(e.usuarioid))}),i.nrm(24,"ion-icon",13),i.EFF(25," Eliminar Usuario "),i.k0s()()()()}if(2&n){const r=s.$implicit,o=i.XpG();i.R7$(3),i.Lme("",r.nombre," ",r.apellido,""),i.R7$(3),i.SpI("Correo: ",r.correo,""),i.R7$(2),i.SpI("Rol: ",r.rolid,""),i.R7$(2),i.SpI("id usuario: ",r.usuarioid,""),i.R7$(6),i.R50("ngModel",o.nuevoRolId),i.R7$(),i.Y8G("ngForOf",o.roles)}}function P(n,s){if(1&n&&(i.j41(0,"ion-item")(1,"ion-label"),i.EFF(2),i.k0s()()),2&n){const r=s.$implicit;i.R7$(2),i.Lme("Numero Rol: ",r.nomrol," Nombre Rol: ",r.nomrol,"")}}function f(n,s){if(1&n){const r=i.RV6();i.j41(0,"ion-item")(1,"ion-label"),i.EFF(2),i.k0s(),i.j41(3,"ion-button",12),i.bIt("click",function(){const e=i.eBV(r).$implicit,a=i.XpG();return i.Njj(a.eliminarPregunta(e.idpreguntas))}),i.nrm(4,"ion-icon",13),i.k0s()()}if(2&n){const r=s.$implicit;i.R7$(2),i.JRh(r.pregunta)}}const F=[{path:"",component:(()=>{var n;class s{constructor(o){this.servicioDB=o,this.usuarios=[],this.pregunta3=[],this.nuevaPregunta="",this.roles=[]}ionViewDidEnter(){this.loadRoles(),this.cargarUsuarios(),this.cargarPreguntas()}loadRoles(){this.servicioDB.obtenerRoles().then(o=>{this.roles=o})}cargarUsuarios(){this.servicioDB.obtenerUsuarios().then(o=>{console.log("Datos de usuarios obtenidos:",o),this.usuarios=o})}cargarPreguntas(){this.servicioDB.obtenerPreguntas().then(o=>{this.pregunta3=o})}eliminarUsuario(o){var e=this;return(0,c.A)(function*(){try{yield e.servicioDB.eliminarUsuario(o),e.cargarUsuarios()}catch(a){console.error("Error al eliminar usuario:",a)}})()}eliminarPregunta(o){var e=this;return(0,c.A)(function*(){try{yield e.servicioDB.eliminarPregunta(o),console.log("Datos de preguntas borrados:"),e.cargarPreguntas()}catch(a){console.error("Error al eliminar pregunta:",a)}})()}agregarPregunta(){var o=this;return(0,c.A)(function*(){try{""!==o.nuevaPregunta.trim()&&(yield o.servicioDB.insertarPregunta(o.nuevaPregunta),o.cargarPreguntas(),o.nuevaPregunta="")}catch(e){console.error("Error al agregar pregunta:",e)}})()}actualizarRolUsuario(o,e){this.servicioDB.actualizarRolUsuario(o,e).then(()=>{console.log("Rol actualizado con \xe9xito."),this.servicioDB.obtenerUsuarios().then(a=>{this.usuarios=a})}).catch(a=>{console.error("Error al actualizar el rol:",a)})}ngOnInit(){}}return(n=s).\u0275fac=function(o){return new(o||n)(i.rXU(p.J))},n.\u0275cmp=i.VBU({type:n,selectors:[["app-registroadmin"]],decls:23,vars:4,consts:[["slot","start"],["defaultHref","/adminvista"],["color","primary"],[4,"ngFor","ngForOf"],["color","primary","sticky",""],["position","floating"],["required","",3,"ngModelChange","ngModel"],["expand","full",3,"click"],[3,"ngModelChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["color","primary","fill","clear",3,"click"],["name","refresh"],["color","danger","fill","clear",3,"click"],["name","trash"],[3,"value"]],template:function(o,e){1&o&&(i.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),i.nrm(3,"ion-back-button",1),i.k0s(),i.j41(4,"ion-title"),i.EFF(5," Lista de Registros "),i.k0s()()(),i.j41(6,"ion-content")(7,"ion-list")(8,"ion-item-divider",2),i.EFF(9," Usuarios "),i.k0s(),i.DNE(10,h,26,7,"ion-card",3),i.j41(11,"ion-item-divider",2),i.EFF(12," Roles "),i.k0s(),i.DNE(13,P,3,2,"ion-item",3),i.j41(14,"ion-item-divider",4),i.EFF(15," Preguntas "),i.k0s(),i.DNE(16,f,5,1,"ion-item",3),i.j41(17,"ion-item")(18,"ion-label",5),i.EFF(19,"Nueva Pregunta"),i.k0s(),i.j41(20,"ion-input",6),i.mxI("ngModelChange",function(g){return i.DH7(e.nuevaPregunta,g)||(e.nuevaPregunta=g),g}),i.k0s()(),i.j41(21,"ion-button",7),i.bIt("click",function(){return e.agregarPregunta()}),i.EFF(22,"Agregar Pregunta"),i.k0s()()()),2&o&&(i.R7$(10),i.Y8G("ngForOf",e.usuarios),i.R7$(3),i.Y8G("ngForOf",e.roles),i.R7$(3),i.Y8G("ngForOf",e.pregunta3),i.R7$(4),i.R50("ngModel",e.nuevaPregunta))},dependencies:[m.Sq,u.BC,u.YS,u.vS,t.Jm,t.QW,t.b_,t.I9,t.ME,t.tN,t.hU,t.W9,t.eU,t.iq,t.$w,t.uz,t.Dg,t.he,t.nf,t.ln,t.Nm,t.Ip,t.BC,t.ai,t.Je,t.Gw,t.el],styles:["ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{display:block;width:100%}ion-item[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{width:auto}"]}),s})()}];let v=(()=>{var n;class s{}return(n=s).\u0275fac=function(o){return new(o||n)},n.\u0275mod=i.$C({type:n}),n.\u0275inj=i.G2t({imports:[R.iI.forChild(F),R.iI]}),s})(),j=(()=>{var n;class s{}return(n=s).\u0275fac=function(o){return new(o||n)},n.\u0275mod=i.$C({type:n}),n.\u0275inj=i.G2t({imports:[m.MD,u.YN,t.bv,v]}),s})()}}]);
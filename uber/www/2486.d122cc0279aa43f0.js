"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2486],{2486:(E,p,a)=>{a.r(p),a.d(p,{DetalleconductorPageModule:()=>C});var u=a(177),f=a(4341),r=a(849),d=a(8986),j=a(467),e=a(4438),P=a(9348),F=a(6210);function v(t,c){if(1&t&&(e.j41(0,"ion-item")(1,"ion-label"),e.EFF(2),e.k0s(),e.j41(3,"ion-label"),e.EFF(4),e.k0s()()),2&t){const l=c.$implicit;e.R7$(2),e.SpI("pasajero id: ",l.userid,""),e.R7$(2),e.SpI("Nombre: ",l.nombre,"")}}const M=[{path:"",component:(()=>{var t;class c{constructor(o,i,s,n,g){this.location=o,this.router=i,this.alertController=s,this.arouter=n,this.db=g,this.prueba=[]}ngOnInit(){this.arouter.paramMap.subscribe(o=>{var i;const s=null!==(i=o.get("idviaje"))&&void 0!==i?i:"";this.idviaje=parseInt(s,10)||0,console.log("si hay viajeid 1 ",this.idviaje),this.idviaje&&(this.db.obtenerDatosViaje(this.idviaje).then(n=>{n&&(this.ppartida=n.ppartida,this.pdestino=n.pdestino,this.valorViaje=n.valorViaje,this.cantAsientos=n.cantAsientos,this.usuarioid=n.usuarioid,console.log("si hay autoid 1 ",n.ppartida),console.log("si hay autoid 2 ",n.usuarioid))}).catch(n=>{}),this.db.obtenerPasajerosalviaje(this.idviaje).then(n=>{console.log("si hay viajesito 1 ",n),console.log("si hay viajesito siempre ",n),this.prueba=n}).catch(n=>{}))})}finalizarViaje(){this.db.finalizarViaje(this.idviaje).then(()=>{this.cobrocliente(),this.pagoconductor(),this.location.back()}).catch(o=>{console.error("Error al finalizar el viaje:",o)})}cobrocliente(){this.prueba.forEach(o=>{this.db.insertarHistorialCliente(o.userid,-this.valorViaje,"cobro de viaje").then(()=>{console.log("Pago registrado para el pasajero:",o.userid)}).catch(i=>{console.error("Error al registrar pago para el pasajero:",o.userid,i)})})}pagoconductor(){var o=this;const i=this.valorViaje*this.prueba.length;this.db.obtenerDatosViaje(this.idviaje).then(function(){var s=(0,j.A)(function*(n){const h=n.ppartida,m=n.pdestino,b=`Pago de viaje de ${h} a ${m}`;console.log("descripci\xf3n:",n.autoid),console.log("descripci\xf3n:",b),o.db.insertarHistorialCliente(o.usuarioid,i,b).then(()=>{console.log("Pago registrado para el conductor:",o.usuarioid),console.log("Partida:",h),console.log("Destino:",m)}).catch(y=>{console.error("Error al registrar pago para el conductor:",o.usuarioid,y)})});return function(n){return s.apply(this,arguments)}}())}}return(t=c).\u0275fac=function(o){return new(o||t)(e.rXU(u.aZ),e.rXU(d.Ix),e.rXU(P.hG),e.rXU(d.nX),e.rXU(F.J))},t.\u0275cmp=e.VBU({type:t,selectors:[["app-detalleconductor"]],decls:36,vars:6,consts:[[1,"content",3,"fullscreen"],[1,"background-gradient"],[1,"center-container"],[1,"profile-card"],[4,"ngFor","ngForOf"],["expand","full",3,"click"]],template:function(o,i){1&o&&(e.j41(0,"ion-content",0),e.nrm(1,"div",1),e.j41(2,"div",2)(3,"ion-card",3)(4,"ion-card-header"),e.EFF(5," Detalles viaje "),e.k0s(),e.j41(6,"ion-card-content")(7,"ion-list")(8,"ion-item")(9,"ion-label"),e.EFF(10,"Direcci\xf3n de Inicio:"),e.k0s(),e.j41(11,"ion-note"),e.EFF(12),e.k0s()(),e.j41(13,"ion-item")(14,"ion-label"),e.EFF(15,"Direcci\xf3n de Destino:"),e.k0s(),e.j41(16,"ion-note"),e.EFF(17),e.k0s()(),e.j41(18,"ion-item")(19,"ion-label"),e.EFF(20,"Valor del Viaje:"),e.k0s(),e.j41(21,"ion-note"),e.EFF(22),e.k0s()(),e.j41(23,"ion-item")(24,"ion-label"),e.EFF(25,"Cantidad de Asientos:"),e.k0s(),e.j41(26,"ion-note"),e.EFF(27),e.k0s()()()(),e.j41(28,"ion-card-header")(29,"ion-card-title"),e.EFF(30,"Pasajeros"),e.k0s()(),e.j41(31,"ion-card-content")(32,"ion-list"),e.DNE(33,v,5,2,"ion-item",4),e.k0s()(),e.j41(34,"ion-button",5),e.bIt("click",function(){return i.finalizarViaje()}),e.EFF(35,"Finalizar Viaje"),e.k0s()()()()),2&o&&(e.Y8G("fullscreen",!0),e.R7$(12),e.JRh(i.ppartida),e.R7$(5),e.JRh(i.pdestino),e.R7$(5),e.JRh(i.valorViaje),e.R7$(5),e.JRh(i.cantAsientos),e.R7$(6),e.Y8G("ngForOf",i.prueba))},dependencies:[u.Sq,r.Jm,r.b_,r.I9,r.ME,r.tN,r.W9,r.uz,r.he,r.nf,r.JI],styles:['@charset "UTF-8";ion-card.profile-card[_ngcontent-%COMP%]{width:90%;height:65%;margin:auto;text-align:center;background-color:rgba(255,255,255,.9);border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,.1)}ion-card.profile-card[_ngcontent-%COMP%]   .profile-image[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;border-radius:50%;background:linear-gradient(to bottom,#00b894,#0984e3);width:100px;height:100px;margin:0 auto 10px}ion-card.profile-card[_ngcontent-%COMP%]   .profile-email[_ngcontent-%COMP%]{color:rgba(0,0,0,.6)}.background-gradient[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,#00b894,#0984e3);z-index:-1}.center-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}ion-button[_ngcontent-%COMP%]{margin-top:10px}ion-list.clima-container[_ngcontent-%COMP%]{display:flex;justify-content:center;width:100%;height:40px;border-radius:10px}ion-item.clima-item[_ngcontent-%COMP%]{display:flex;align-items:center}ion-label[_ngcontent-%COMP%]{display:flex;align-items:center}img.clima-icon[_ngcontent-%COMP%]{width:40px;height:40px;margin-right:10px}.custom-button[_ngcontent-%COMP%]{white-space:normal;text-align:center;font-size:16px;padding:12px;border-radius:10px}.login-buttons[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:10px}.login-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{white-space:normal;width:90%;margin-top:10px;border-radius:10px;font-size:10px}']}),c})()}];let x=(()=>{var t;class c{}return(t=c).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[d.iI.forChild(M),d.iI]}),c})(),C=(()=>{var t;class c{}return(t=c).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[u.MD,f.YN,r.bv,x]}),c})()}}]);
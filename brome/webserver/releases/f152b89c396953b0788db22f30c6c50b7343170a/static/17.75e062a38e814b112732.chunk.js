webpackJsonp([17],{12:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(3),n=u(o),s=r(4),a=u(s),l=r(5),d=u(l),i=r(7),f=u(i),c=r(6),g=u(c),p=r(1),_=u(p),O=r(9),m=r(14),v=u(m),L=function(e){function t(){return(0,a["default"])(this,t),(0,f["default"])(this,(0,n["default"])(t).apply(this,arguments))}return(0,g["default"])(t,e),(0,d["default"])(t,[{key:"render",value:function(){return _["default"].createElement("div",{className:"alert alert-danger "+v["default"]["err-msg"],role:"alert",name:this.props.name},_["default"].createElement(O.FormattedMessage,{id:"errorMsg.Error",defaultMessage:"{error}",values:{error:_["default"].createElement("strong",null,"Error: ")}}),_["default"].createElement(O.FormattedMessage,{id:this.props.msgId,defaultMessage:this.props.msgId}))}}]),t}(p.Component);L.propTypes={msgId:p.PropTypes.string.isRequired,name:p.PropTypes.string},t["default"]=L},14:function(e,t){e.exports={"err-msg":"ErrorMsgStyle__err-msg___WmKe1"}},204:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}function o(e){return function(t){t({type:p}),f["default"].post("/api/logout",{token:e}).then(function(e){m.debug("/api/logout (response)",e),e.data.success?(t(n()),t((0,g.resetSession)()),t(c.routerActions.push("/"))):t(s(e.data.error))})}}function n(){return{type:_}}function s(e){var t="logout"+e;return{type:O,errorMsgId:t}}function a(){var e=arguments.length<=0||void 0===arguments[0]?v:arguments[0],t=arguments[1];switch(t.type){case p:return(0,d["default"])({},v,{loading:!0});case _:return v;case O:return(0,d["default"])({},v,{errorMsgId:t.errorMsgId});default:return e}}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.LOGOUT_ERROR=t.LOGOUT_SUCCESS=t.LOGOUT_LOADING=void 0;var l=r(19),d=u(l);t.doLogout=o,t.logoutSuccess=n,t.logoutError=s,t["default"]=a;var i=r(24),f=u(i),c=r(84),g=r(88),p=t.LOGOUT_LOADING="LOGOUT_LOADING",_=t.LOGOUT_SUCCESS="LOGOUT_SUCCESS",O=t.LOGOUT_ERROR="LOGOUT_ERROR",m=r(25).getLogger("Logout");m.setLevel("error");var v=(t.actions={doLogout:o},{loading:!1,errorMsgId:null})},438:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}var o=r(3),n=u(o),s=r(4),a=u(s),l=r(5),d=u(l),i=r(7),f=u(i),c=r(6),g=u(c),p=r(1),_=u(p),O=r(11),m=u(O),v=r(31),L=u(v),h=r(12),M=u(h),E=function(e){function t(e){(0,a["default"])(this,t);var r=(0,f["default"])(this,(0,n["default"])(t).call(this,e));return r._initLogger(),r.logout(),r}return(0,g["default"])(t,e),(0,d["default"])(t,[{key:"logout",value:function(){this.debug("logout"),this.props.actions.doLogout(this.props.state.session.token)}},{key:"render",value:function(){this.debug("render");var e=this.props.state.logout.errorMsgId;return e?_["default"].createElement(M["default"],{msgId:e}):_["default"].createElement("div",{className:"container-fluid"},_["default"].createElement(L["default"],{style:{left:"50%"}}))}}]),t}(m["default"]);e.exports=E},439:function(e,t,r){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}function o(e){return{state:e}}function n(e){return{actions:(0,a.bindActionCreators)(l.actions,e)}}Object.defineProperty(t,"__esModule",{value:!0});var s=r(17),a=r(21),l=r(204),d=r(438),i=u(d);t["default"]=(0,s.connect)(o,n)(i["default"])}});
//# sourceMappingURL=17.75e062a38e814b112732.chunk.js.map
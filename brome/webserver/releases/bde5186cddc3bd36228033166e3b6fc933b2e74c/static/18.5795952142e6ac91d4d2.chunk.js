webpackJsonp([18],{12:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(3),l=n(r),u=a(4),s=n(u),d=a(5),o=n(d),i=a(7),c=n(i),f=a(6),m=n(f),p=a(1),g=n(p),h=a(9),v=a(14),E=n(v),y=function(e){function t(){return(0,s["default"])(this,t),(0,c["default"])(this,(0,l["default"])(t).apply(this,arguments))}return(0,m["default"])(t,e),(0,o["default"])(t,[{key:"render",value:function(){return g["default"].createElement("div",{className:"alert alert-danger "+E["default"]["err-msg"],role:"alert",name:this.props.name},g["default"].createElement(h.FormattedMessage,{id:"errorMsg.Error",defaultMessage:"{error}",values:{error:g["default"].createElement("strong",null,"Error: ")}}),g["default"].createElement(h.FormattedMessage,{id:this.props.msgId,defaultMessage:this.props.msgId}))}}]),t}(p.Component);y.propTypes={msgId:p.PropTypes.string.isRequired,name:p.PropTypes.string},t["default"]=y},14:function(e,t){e.exports={"err-msg":"ErrorMsgStyle__err-msg___WmKe1"}},22:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(3),l=n(r),u=a(4),s=n(u),d=a(5),o=n(d),i=a(7),c=n(i),f=a(6),m=n(f),p=a(1),g=n(p),h=a(9),v=a(18),E=function(e){function t(){return(0,s["default"])(this,t),(0,c["default"])(this,(0,l["default"])(t).apply(this,arguments))}return(0,m["default"])(t,e),(0,o["default"])(t,[{key:"render",value:function(){var e=this;return g["default"].createElement("div",{className:"row"},g["default"].createElement("div",{className:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},g["default"].createElement("ol",{className:"breadcrumb"},function(){return e.props.routes.map(function(e,t){return e.disable?g["default"].createElement("li",{key:t,className:"active"},g["default"].createElement(h.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})):g["default"].createElement("li",{key:t},g["default"].createElement(v.Link,{to:e.to},g["default"].createElement(h.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})))})}())))}}]),t}(p.Component);E.propTypes={routes:p.PropTypes.array.isRequired},t["default"]=E},454:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var r=a(63),l=n(r),u=a(3),s=n(u),d=a(4),o=n(d),i=a(5),c=n(i),f=a(7),m=n(f),p=a(6),g=n(p),h=a(1),v=n(h),E=a(24),y=n(E),_=a(22),b=n(_),M=a(31),T=n(M),k=a(12),I=n(k),L=a(11),B=n(L),R=function(e){function t(e){(0,o["default"])(this,t);var a=(0,m["default"])(this,(0,s["default"])(t).call(this,e));return a._initLogger(),a._bind("fetchTestBachRunnerLog"),a.state={lines:[],loading:!0,parent:null,error:null,name:null},a}return(0,g["default"])(t,e),(0,c["default"])(t,[{key:"fetchTestBachRunnerLog",value:function(e,t){var a=this,n={model:"testbatch",uid:e,skip:t};y["default"].post("/api/logstreamout",n).then(function(t){a.debug("/api/logstreamout (data) (response)",n,t),t.data.success?(a.setState({lines:a.state.lines.concat(t.data.results),loading:!1,parent:t.data.parent,name:t.data.name}),t.data.parent.terminated||(a._interval=setTimeout(function(){a.fetchTestBachRunnerLog(e,t.data.total)},2e3))):a.setState({loading:!1,error:t.data.error})})}},{key:"componentWillMount",value:function(){var e=this,t=this.props.location.query.testbatchuid;this._interval=setTimeout(function(){e.fetchTestBachRunnerLog(t,0)})}},{key:"componentWillUnmount",value:function(){this.debug("componentWillUnmount"),clearInterval(this._interval)}},{key:"render",value:function(){var e=this;if(this.state.loading)return v["default"].createElement("div",{className:"container-fluid"},v["default"].createElement(T["default"],{style:{left:"50%"}}));if(this.state.error)return v["default"].createElement(I["default"],{msgId:this.state.error,name:"error-runner-log"});var t=function(){var t=e.state.lines,a={border:"2px solid black",padding:"4px",margin:"4px",overflow:"scroll"},n=[{msgId:"TestBatchDetail",to:"/testbatchdetail?testbatchuid="+e.state.parent.uid},{msgId:"TestBatchRunnerLog",disable:!0}];return{v:v["default"].createElement("div",null,v["default"].createElement(b["default"],{routes:n}),v["default"].createElement("h2",null,"Test Batch Log ",v["default"].createElement("small",null,"(",e.state.parent.friendly_name,") (",e.state.parent.uid,")")),v["default"].createElement("span",null,"Log:"," "),v["default"].createElement("b",null,e.state.name),v["default"].createElement("div",{style:a},v["default"].createElement("ol",null,function(){return t.map(function(e,t){return v["default"].createElement("li",{key:t},v["default"].createElement("small",null,v["default"].createElement("i",null,e)))})}())))}}();return"object"===("undefined"==typeof t?"undefined":(0,l["default"])(t))?t.v:void 0}}]),t}(B["default"]);e.exports=R},455:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){return{state:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(17),u=a(454),s=n(u);t["default"]=(0,l.connect)(r)(s["default"])}});
//# sourceMappingURL=18.5795952142e6ac91d4d2.chunk.js.map
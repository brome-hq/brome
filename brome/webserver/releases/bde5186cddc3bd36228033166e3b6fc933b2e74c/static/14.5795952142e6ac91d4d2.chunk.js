webpackJsonp([14],{12:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(3),s=r(n),l=a(4),i=r(l),u=a(5),o=r(u),c=a(7),d=r(c),f=a(6),p=r(f),m=a(1),h=r(m),b=a(9),v=a(14),E=r(v),g=function(e){function t(){return(0,i["default"])(this,t),(0,d["default"])(this,(0,s["default"])(t).apply(this,arguments))}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"render",value:function(){return h["default"].createElement("div",{className:"alert alert-danger "+E["default"]["err-msg"],role:"alert",name:this.props.name},h["default"].createElement(b.FormattedMessage,{id:"errorMsg.Error",defaultMessage:"{error}",values:{error:h["default"].createElement("strong",null,"Error: ")}}),h["default"].createElement(b.FormattedMessage,{id:this.props.msgId,defaultMessage:this.props.msgId}))}}]),t}(m.Component);g.propTypes={msgId:m.PropTypes.string.isRequired,name:m.PropTypes.string},t["default"]=g},14:function(e,t){e.exports={"err-msg":"ErrorMsgStyle__err-msg___WmKe1"}},22:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(3),s=r(n),l=a(4),i=r(l),u=a(5),o=r(u),c=a(7),d=r(c),f=a(6),p=r(f),m=a(1),h=r(m),b=a(9),v=a(18),E=function(e){function t(){return(0,i["default"])(this,t),(0,d["default"])(this,(0,s["default"])(t).apply(this,arguments))}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"render",value:function(){var e=this;return h["default"].createElement("div",{className:"row"},h["default"].createElement("div",{className:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},h["default"].createElement("ol",{className:"breadcrumb"},function(){return e.props.routes.map(function(e,t){return e.disable?h["default"].createElement("li",{key:t,className:"active"},h["default"].createElement(b.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})):h["default"].createElement("li",{key:t},h["default"].createElement(v.Link,{to:e.to},h["default"].createElement(b.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})))})}())))}}]),t}(m.Component);E.propTypes={routes:m.PropTypes.array.isRequired},t["default"]=E},26:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(3),s=r(n),l=a(4),i=r(l),u=a(5),o=r(u),c=a(7),d=r(c),f=a(6),p=r(f),m=a(1),h=r(m);a(40);var b=function(e){function t(){return(0,i["default"])(this,t),(0,d["default"])(this,(0,s["default"])(t).apply(this,arguments))}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"title",value:function(e){return e.charAt(0).toUpperCase()+e.slice(1)}},{key:"render",value:function(){var e=this,t=this.props.browserIcon;return"phantomjs"===this.props.browserName.toLowerCase()?t="snapchat-ghost":"internet explorer"===this.props.browserName.toLowerCase()&&(t="internet-explorer"),h["default"].createElement("span",null," ",function(){return e.props.browserIcon?h["default"].createElement("i",{className:"fa fa-"+t,"aria-hidden":"true"}):null}(),h["default"].createElement("small",null,h["default"].createElement("b",null," ",this.title(this.props.browserName))),function(){return e.props.browserVersion?h["default"].createElement("i",null," ",e.props.browserVersion):null}(),function(){return e.props.platform?h["default"].createElement("small",null," - ",e.props.platform):null}())}}]),t}(m.Component);b.propTypes={browserName:m.PropTypes.string.isRequired,browserVersion:m.PropTypes.string,browserIcon:m.PropTypes.string,platform:m.PropTypes.string},t["default"]=b},47:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(3),s=r(n),l=a(4),i=r(l),u=a(5),o=r(u),c=a(7),d=r(c),f=a(6),p=r(f),m=a(1),h=r(m),b=a(11),v=r(b),E=function(e){function t(e){(0,i["default"])(this,t);var a=(0,d["default"])(this,(0,s["default"])(t).call(this,e));return a._initLogger(),a._bind("onFirstClick","onPreviousClick","onNextClick","onLastClick"),a}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"onFirstClick",value:function(){this.debug("onFirstClick"),this.props.fetchData(0)}},{key:"onPreviousClick",value:function(){this.debug("onPreviousClick");var e=this.props.skippedItem-this.props.itemPerPage;this.props.fetchData(e)}},{key:"onNextClick",value:function(){this.debug("onNextClick");var e=this.props.skippedItem+this.props.itemPerPage;this.props.fetchData(e)}},{key:"onLastClick",value:function(){this.debug("onLastClick");var e=void 0;e=this.props.totalItem%this.props.itemPerPage?this.props.totalItem-this.props.totalItem%this.props.itemPerPage:this.props.totalItem-this.props.itemPerPage,this.props.fetchData(e)}},{key:"render",value:function(){var e=!this.props.skippedItem,t=void 0,a=void 0;e?(t=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},"<<"),a=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},"<")):(t=h["default"].createElement("a",{onClick:this.onFirstClick,className:"btn btn-default btn-link"},"<<"),a=h["default"].createElement("a",{onClick:this.onPreviousClick,className:"btn btn-default btn-link"},"<"));var r=!this.props.totalItem||this.props.totalItem<=this.props.skippedItem+this.props.itemPerPage,n=void 0,s=void 0;return r?(n=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},">"),s=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},">>")):(n=h["default"].createElement("a",{onClick:this.onNextClick,className:"btn btn-default btn-link"},">"),s=h["default"].createElement("a",{onClick:this.onLastClick,className:"btn btn-default btn-link"},">>")),r&&e?null:h["default"].createElement("div",{name:"pager"},t,a,n,s)}}]),t}(v["default"]);E.propTypes={totalItem:m.PropTypes.number.isRequired,skippedItem:m.PropTypes.number.isRequired,fetchData:m.PropTypes.func.isRequired,itemPerPage:m.PropTypes.number.isRequired},t["default"]=E},213:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t,a,r){return function(n){var i={token:e.token,actions:[{action:"read",model:"testinstance",filters:{test_batch_id:t},ascending:"name",limit:r,skip:a},{action:"read",model:"testbatch",uid:t}]};d["default"].post("/api/crud",i).then(function(e){m.debug("/api/crud (data) (response)",i,e),n(e.data.success?s(e.data,a,r):l(e.data.response[0].error))})}}function s(e,t,a){return e.skip=t,e.limit=a,{type:f,data:e}}function l(e){return{type:p,error:e}}function i(){var e=arguments.length<=0||void 0===arguments[0]?h:arguments[0],t=arguments[1];switch(t.type){case f:return(0,o["default"])({},h,{testInstanceList:t.data.results[0].results,totalTestInstance:t.data.results[0].total,testBatch:t.data.results[1].results[0],limit:t.data.limit,skip:t.data.skip});case p:return(0,o["default"])({},h,{error:t.error});default:return e}}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.LOADED_TEST_INSTANCE_LIST_ERROR=t.LOADED_TEST_INSTANCE_LIST_SUCCESS=void 0;var u=a(19),o=r(u);t.doFetchTestInstance=n,t["default"]=i;var c=a(24),d=r(c),f=t.LOADED_TEST_INSTANCE_LIST_SUCCESS="LOADED_TEST_INSTANCE_LIST_SUCCESS",p=t.LOADED_TEST_INSTANCE_LIST_ERROR="LOADED_TEST_INSTANCE_LIST_ERROR",m=a(25).getLogger("TestInstanceList");m.setLevel("error");var h=(t.actions={doFetchTestInstance:n},{error:null,testInstanceList:null,testBatch:null,totalTestInstance:0,skip:0,limit:0})},466:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var n=a(63),s=r(n),l=a(3),i=r(l),u=a(4),o=r(u),c=a(5),d=r(c),f=a(7),p=r(f),m=a(6),h=r(m),b=a(1),v=r(b),E=a(18),g=a(22),_=r(g),k=a(26),T=r(k),I=a(12),y=r(I),N=a(47),P=r(N),C=a(31),L=r(C),S=a(11),w=r(S),M=10,D=function(e){function t(e){(0,o["default"])(this,t);var a=(0,p["default"])(this,(0,i["default"])(t).call(this,e));return a._initLogger(),a._bind("getTestBatch","getPath","getTestBatchUid","fetchTestInstance"),a}return(0,h["default"])(t,e),(0,d["default"])(t,[{key:"componentWillMount",value:function(){this.debug("componentWillUnmount"),this.fetchTestInstance(0)}},{key:"fetchTestInstance",value:function(e){this.props.actions.doFetchTestInstance(this.props.state.session,this.getTestBatchUid(),e,M)}},{key:"getPath",value:function(){return this.props.location.query.path}},{key:"getTestBatchUid",value:function(){return this.props.location.query.testbatchuid}},{key:"getTestBatch",value:function(){return this.props.state.testinstancelist.testBatch}},{key:"render",value:function(){var e=this,t=this.props.state.testinstancelist,a=this.getPath();if(t.error)return v["default"].createElement(y["default"],{msgId:t.error});if(null===t.testInstanceList)return v["default"].createElement("div",{className:"container-fluid"},v["default"].createElement(L["default"],{style:{left:"50%"}}));var r=function(){var r=e.props.state.testinstancelist.testInstanceList,n=e.getTestBatch(),s=[{msgId:"TestBatchDetail",to:"/testbatchdetail?testbatchuid="+n.uid},{msgId:"TestInstanceList",disable:!0}];return{v:v["default"].createElement("div",null,v["default"].createElement(_["default"],{routes:s}),v["default"].createElement("h2",{className:"text-center"},"Test Instance List ",v["default"].createElement("small",null," (",n.friendly_name,") (",n.uid,")")),v["default"].createElement("ul",null,function(){return r.map(function(e,t){return v["default"].createElement("li",{key:t},v["default"].createElement("small",null,v["default"].createElement(E.Link,{className:"btn btn-default btn-link",to:a+"?testinstanceuid="+e.uid},e.name,v["default"].createElement(T["default"],{browserName:e.browser_capabilities.browserName,browserIcon:e.browser_capabilities.browserName,browserVersion:e.browser_capabilities.version,platform:e.browser_capabilities.platform}))))})}()),v["default"].createElement(P["default"],{skippedItem:t.skip,fetchData:e.fetchTestInstance,totalItem:t.totalTestInstance,itemPerPage:M}))}}();return"object"===("undefined"==typeof r?"undefined":(0,s["default"])(r))?r.v:void 0}}]),t}(w["default"]);e.exports=D},467:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e){return{state:e}}function s(e){return{actions:(0,i.bindActionCreators)(u.actions,e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(17),i=a(21),u=a(213),o=a(466),c=r(o);t["default"]=(0,l.connect)(n,s)(c["default"])}});
//# sourceMappingURL=14.5795952142e6ac91d4d2.chunk.js.map
webpackJsonp([14],{13:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(3),s=n(r),l=a(4),i=n(l),u=a(5),o=n(u),c=a(7),d=n(c),f=a(6),p=n(f),m=a(2),h=n(m),b=a(9),v=a(15),_=n(v),g=function(e){function t(){return(0,i["default"])(this,t),(0,d["default"])(this,(0,s["default"])(t).apply(this,arguments))}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"render",value:function(){return h["default"].createElement("div",{className:"alert alert-danger "+_["default"]["err-msg"],role:"alert",name:this.props.name},h["default"].createElement(b.FormattedMessage,{id:"errorMsg.Error",defaultMessage:"{error}",values:{error:h["default"].createElement("strong",null,"Error: ")}}),h["default"].createElement(b.FormattedMessage,{id:this.props.msgId,defaultMessage:this.props.msgId}))}}]),t}(m.Component);g.propTypes={msgId:m.PropTypes.string.isRequired,name:m.PropTypes.string},t["default"]=g},15:function(e,t){e.exports={"err-msg":"ErrorMsgStyle__err-msg___WmKe1"}},25:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(3),s=n(r),l=a(4),i=n(l),u=a(5),o=n(u),c=a(7),d=n(c),f=a(6),p=n(f),m=a(2),h=n(m),b=a(9),v=a(19),_=function(e){function t(){return(0,i["default"])(this,t),(0,d["default"])(this,(0,s["default"])(t).apply(this,arguments))}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"render",value:function(){var e=this;return h["default"].createElement("div",{className:"row"},h["default"].createElement("div",{className:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},h["default"].createElement("ol",{className:"breadcrumb"},function(){return e.props.routes.map(function(e,t){return e.disable?h["default"].createElement("li",{key:t,className:"active"},h["default"].createElement(b.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})):h["default"].createElement("li",{key:t},h["default"].createElement(v.Link,{to:e.to},h["default"].createElement(b.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})))})}())))}}]),t}(m.Component);_.propTypes={routes:m.PropTypes.array.isRequired},t["default"]=_},30:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(3),s=n(r),l=a(4),i=n(l),u=a(5),o=n(u),c=a(7),d=n(c),f=a(6),p=n(f),m=a(2),h=n(m);a(44);var b=function(e){function t(){return(0,i["default"])(this,t),(0,d["default"])(this,(0,s["default"])(t).apply(this,arguments))}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"title",value:function(e){return e.charAt(0).toUpperCase()+e.slice(1)}},{key:"render",value:function(){var e=this,t=this.props.browserIcon;return"phantomjs"===this.props.browserName.toLowerCase()?t="snapchat-ghost":"internet explorer"===this.props.browserName.toLowerCase()&&(t="internet-explorer"),h["default"].createElement("span",null," ",function(){return e.props.browserIcon?h["default"].createElement("i",{className:"fa fa-"+t,"aria-hidden":"true"}):null}(),h["default"].createElement("small",null,h["default"].createElement("b",null," ",this.title(this.props.browserName))),function(){return e.props.browserVersion?h["default"].createElement("i",null," ",e.props.browserVersion):null}(),function(){return e.props.platform?h["default"].createElement("small",null," - ",e.props.platform):null}())}}]),t}(m.Component);b.propTypes={browserName:m.PropTypes.string.isRequired,browserVersion:m.PropTypes.string,browserIcon:m.PropTypes.string,platform:m.PropTypes.string},t["default"]=b},47:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(3),s=n(r),l=a(4),i=n(l),u=a(5),o=n(u),c=a(7),d=n(c),f=a(6),p=n(f),m=a(2),h=n(m),b=a(11),v=n(b),_=function(e){function t(e){(0,i["default"])(this,t);var a=(0,d["default"])(this,(0,s["default"])(t).call(this,e));return a._initLogger(),a._bind("onFirstClick","onPreviousClick","onNextClick","onLastClick"),a}return(0,p["default"])(t,e),(0,o["default"])(t,[{key:"onFirstClick",value:function(){this.debug("onFirstClick"),this.props.fetchData(0)}},{key:"onPreviousClick",value:function(){this.debug("onPreviousClick");var e=this.props.skippedItem-this.props.itemPerPage;this.props.fetchData(e)}},{key:"onNextClick",value:function(){this.debug("onNextClick");var e=this.props.skippedItem+this.props.itemPerPage;this.props.fetchData(e)}},{key:"onLastClick",value:function(){this.debug("onLastClick");var e=void 0;e=this.props.totalItem%this.props.itemPerPage?this.props.totalItem-this.props.totalItem%this.props.itemPerPage:this.props.totalItem-this.props.itemPerPage,this.props.fetchData(e)}},{key:"render",value:function(){var e=!this.props.skippedItem,t=void 0,a=void 0;e?(t=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},"<<"),a=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},"<")):(t=h["default"].createElement("a",{onClick:this.onFirstClick,className:"btn btn-default btn-link"},"<<"),a=h["default"].createElement("a",{onClick:this.onPreviousClick,className:"btn btn-default btn-link"},"<"));var n=!this.props.totalItem||this.props.totalItem<=this.props.skippedItem+this.props.itemPerPage,r=void 0,s=void 0;return n?(r=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},">"),s=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},">>")):(r=h["default"].createElement("a",{onClick:this.onNextClick,className:"btn btn-default btn-link"},">"),s=h["default"].createElement("a",{onClick:this.onLastClick,className:"btn btn-default btn-link"},">>")),n&&e?null:h["default"].createElement("div",{name:"pager"},t,a,r,s)}}]),t}(v["default"]);_.propTypes={totalItem:m.PropTypes.number.isRequired,skippedItem:m.PropTypes.number.isRequired,fetchData:m.PropTypes.func.isRequired,itemPerPage:m.PropTypes.number.isRequired},t["default"]=_},316:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t,a,n){return function(r){var i={token:e.token,actions:[{action:"read",model:"testinstance",filters:{test_batch_id:t},ascending:"name",limit:n,skip:a},{action:"read",model:"testbatch",uid:t}]};d["default"].post("/api/crud",i).then(function(e){m.debug("/api/crud (data) (response)",i,e),r(e.data.success?s(e.data,a,n):l(e.data.response[0].error))})}}function s(e,t,a){return e.skip=t,e.limit=a,{type:f,data:e}}function l(e){return{type:p,error:e}}function i(){var e=arguments.length<=0||void 0===arguments[0]?h:arguments[0],t=arguments[1];switch(t.type){case f:return(0,o["default"])({},h,{testInstanceList:t.data.results[0].results,totalTestInstance:t.data.results[0].total,testBatch:t.data.results[1].results[0],limit:t.data.limit,skip:t.data.skip});case p:return(0,o["default"])({},h,{error:t.error});default:return e}}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.LOADED_TEST_INSTANCE_LIST_ERROR=t.LOADED_TEST_INSTANCE_LIST_SUCCESS=void 0;var u=a(18),o=n(u);t.doFetchTestInstance=r,t["default"]=i;var c=a(22),d=n(c),f=t.LOADED_TEST_INSTANCE_LIST_SUCCESS="LOADED_TEST_INSTANCE_LIST_SUCCESS",p=t.LOADED_TEST_INSTANCE_LIST_ERROR="LOADED_TEST_INSTANCE_LIST_ERROR",m=a(23).getLogger("TestInstanceList");m.setLevel("error");var h=(t.actions={doFetchTestInstance:r},{error:null,testInstanceList:null,testBatch:null,totalTestInstance:0,skip:0,limit:0})},466:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var r=a(79),s=n(r),l=a(3),i=n(l),u=a(4),o=n(u),c=a(5),d=n(c),f=a(7),p=n(f),m=a(6),h=n(m),b=a(2),v=n(b),_=a(19),g=a(25),E=n(g),k=a(30),T=n(k),I=a(13),y=n(I),P=a(47),N=n(P),C=a(34),L=n(C),S=a(11),w=n(S),M=10,D=function(e){function t(e){(0,o["default"])(this,t);var a=(0,p["default"])(this,(0,i["default"])(t).call(this,e));return a._initLogger(),a._bind("getTestBatch","getPath","getTestBatchUid","fetchTestInstance"),a}return(0,h["default"])(t,e),(0,d["default"])(t,[{key:"componentWillMount",value:function(){this.debug("componentWillUnmount"),this.fetchTestInstance(0)}},{key:"componentWillReceiveProps",value:function(){var e=this,t=this.getTestBatch();t&&(t.terminated?this._interval&&(clearInterval(this._interval),this._interval=null):this._interval=setTimeout(function(){e.fetchTestInstance(0)},2e3))}},{key:"componentWillUnmount",value:function(){this.debug("componentWillUnmount"),clearInterval(this._interval)}},{key:"fetchTestInstance",value:function(e){this.props.actions.doFetchTestInstance(this.props.state.session,this.getTestBatchUid(),e,M)}},{key:"getPath",value:function(){return this.props.location.query.path}},{key:"getTestBatchUid",value:function(){return this.props.location.query.testbatchuid}},{key:"getTestBatch",value:function(){return this.props.state.testinstancelist.testBatch}},{key:"render",value:function(){var e=this,t=this.props.state.testinstancelist,a=this.getPath();if(t.error)return v["default"].createElement(y["default"],{msgId:t.error});if(null===t.testInstanceList)return v["default"].createElement("div",{className:"container-fluid"},v["default"].createElement(L["default"],{style:{left:"50%"}}));var n=function(){var n=e.props.state.testinstancelist.testInstanceList,r=e.getTestBatch(),s=[{msgId:"TestBatchDetail",to:"/testbatchdetail?testbatchuid="+r.uid},{msgId:"TestInstanceList",disable:!0}];return{v:v["default"].createElement("div",null,v["default"].createElement(E["default"],{routes:s}),v["default"].createElement("h2",{className:"text-center"},"Test Instance List ",v["default"].createElement("small",null," (",r.friendly_name,") (",r.uid,")")),v["default"].createElement("ul",null,function(){return n.map(function(e,t){return v["default"].createElement("li",{key:t},v["default"].createElement("small",null,v["default"].createElement(_.Link,{className:"btn btn-default btn-link",to:a+"?testinstanceuid="+e.uid},e.name,v["default"].createElement(T["default"],{browserName:e.browser_capabilities.browserName,browserIcon:e.browser_capabilities.browserName,browserVersion:e.browser_capabilities.version,platform:e.browser_capabilities.platform}))))})}()),v["default"].createElement(N["default"],{skippedItem:t.skip,fetchData:e.fetchTestInstance,totalItem:t.totalTestInstance,itemPerPage:M}))}}();return"object"===("undefined"==typeof n?"undefined":(0,s["default"])(n))?n.v:void 0}}]),t}(w["default"]);e.exports=D},467:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){return{state:e}}function s(e){return{actions:(0,i.bindActionCreators)(u.actions,e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(17),i=a(21),u=a(316),o=a(466),c=n(o);t["default"]=(0,l.connect)(r,s)(c["default"])}});
//# sourceMappingURL=14.56ff941c8c9b67d0a440.chunk.js.map
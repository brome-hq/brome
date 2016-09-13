webpackJsonp([5],{12:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=r(i),o=n(4),s=r(o),l=n(5),u=r(l),c=n(7),d=r(c),p=n(6),f=r(p),m=n(1),h=r(m),v=n(9),y=n(14),E=r(y),g=function(e){function t(){return(0,s["default"])(this,t),(0,d["default"])(this,(0,a["default"])(t).apply(this,arguments))}return(0,f["default"])(t,e),(0,u["default"])(t,[{key:"render",value:function(){return h["default"].createElement("div",{className:"alert alert-danger "+E["default"]["err-msg"],role:"alert",name:this.props.name},h["default"].createElement(v.FormattedMessage,{id:"errorMsg.Error",defaultMessage:"{error}",values:{error:h["default"].createElement("strong",null,"Error: ")}}),h["default"].createElement(v.FormattedMessage,{id:this.props.msgId,defaultMessage:this.props.msgId}))}}]),t}(m.Component);g.propTypes={msgId:m.PropTypes.string.isRequired,name:m.PropTypes.string},t["default"]=g},14:function(e,t){e.exports={"err-msg":"ErrorMsgStyle__err-msg___WmKe1"}},22:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=r(i),o=n(4),s=r(o),l=n(5),u=r(l),c=n(7),d=r(c),p=n(6),f=r(p),m=n(1),h=r(m),v=n(9),y=n(18),E=function(e){function t(){return(0,s["default"])(this,t),(0,d["default"])(this,(0,a["default"])(t).apply(this,arguments))}return(0,f["default"])(t,e),(0,u["default"])(t,[{key:"render",value:function(){var e=this;return h["default"].createElement("div",{className:"row"},h["default"].createElement("div",{className:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},h["default"].createElement("ol",{className:"breadcrumb"},function(){return e.props.routes.map(function(e,t){return e.disable?h["default"].createElement("li",{key:t,className:"active"},h["default"].createElement(v.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})):h["default"].createElement("li",{key:t},h["default"].createElement(y.Link,{to:e.to},h["default"].createElement(v.FormattedMessage,{id:"nav."+e.msgId,defaultMessage:e.msgId})))})}())))}}]),t}(m.Component);E.propTypes={routes:m.PropTypes.array.isRequired},t["default"]=E},26:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=r(i),o=n(4),s=r(o),l=n(5),u=r(l),c=n(7),d=r(c),p=n(6),f=r(p),m=n(1),h=r(m);n(33);var v=function(e){function t(){return(0,s["default"])(this,t),(0,d["default"])(this,(0,a["default"])(t).apply(this,arguments))}return(0,f["default"])(t,e),(0,u["default"])(t,[{key:"title",value:function(e){return e.charAt(0).toUpperCase()+e.slice(1)}},{key:"render",value:function(){var e=this,t=this.props.browserIcon;return"phantomjs"===this.props.browserName.toLowerCase()?t="snapchat-ghost":"internet explorer"===this.props.browserName.toLowerCase()&&(t="internet-explorer"),h["default"].createElement("span",null," ",function(){return e.props.browserIcon?h["default"].createElement("i",{className:"fa fa-"+t,"aria-hidden":"true"}):null}(),h["default"].createElement("small",null,h["default"].createElement("b",null," ",this.title(this.props.browserName))),function(){return e.props.browserVersion?h["default"].createElement("i",null," ",e.props.browserVersion):null}(),function(){return e.props.platform?h["default"].createElement("small",null," - ",e.props.platform):null}())}}]),t}(m.Component);v.propTypes={browserName:m.PropTypes.string.isRequired,browserVersion:m.PropTypes.string,browserIcon:m.PropTypes.string,platform:m.PropTypes.string},t["default"]=v},36:function(e,t){e.exports=function(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}},37:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){for(var n=window.getComputedStyle(e),r="",i=0;i<f.length&&!(r=n.getPropertyValue(f[i]+t));i++);return r}function a(e){if(d){var t=parseFloat(i(e,"transition-duration"))||0,n=parseFloat(i(e,"animation-duration"))||0,r=Math.max(t,n);e.rcEndAnimTimeout=setTimeout(function(){e.rcEndAnimTimeout=null,e.rcEndListener&&e.rcEndListener()},1e3*r+200)}}function o(e){e.rcEndAnimTimeout&&(clearTimeout(e.rcEndAnimTimeout),e.rcEndAnimTimeout=null)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(65),l=r(s),u=n(64),c=r(u),d=0!==l["default"].endEvents.length,p=["Webkit","Moz","O","ms"],f=["-webkit-","-moz-","-o-","ms-",""],m=function(e,t,n){var r=t,i=r+"-active",s=n,u=void 0,d=void 0,p=(0,c["default"])(e);return n&&"[object Object]"===Object.prototype.toString.call(n)&&(s=n.end,u=n.start,d=n.active),e.rcEndListener&&e.rcEndListener(),e.rcEndListener=function(t){t&&t.target!==e||(e.rcAnimTimeout&&(clearTimeout(e.rcAnimTimeout),e.rcAnimTimeout=null),o(e),p.remove(r),p.remove(i),l["default"].removeEndEventListener(e,e.rcEndListener),e.rcEndListener=null,s&&s())},l["default"].addEndEventListener(e,e.rcEndListener),u&&u(),p.add(r),e.rcAnimTimeout=setTimeout(function(){e.rcAnimTimeout=null,p.add(i),d&&setTimeout(d,0),a(e)},30),{stop:function(){e.rcEndListener&&e.rcEndListener()}}};m.style=function(e,t,n){e.rcEndListener&&e.rcEndListener(),e.rcEndListener=function(t){t&&t.target!==e||(e.rcAnimTimeout&&(clearTimeout(e.rcAnimTimeout),e.rcAnimTimeout=null),o(e),l["default"].removeEndEventListener(e,e.rcEndListener),e.rcEndListener=null,n&&n())},l["default"].addEndEventListener(e,e.rcEndListener),e.rcAnimTimeout=setTimeout(function(){for(var n in t)t.hasOwnProperty(n)&&(e.style[n]=t[n]);e.rcAnimTimeout=null,a(e)},0)},m.setTransition=function(e,t,n){var r=t,i=n;void 0===n&&(i=r,r=""),r=r||"",p.forEach(function(t){e.style[t+"Transition"+r]=i})},m.isCssAnimationSupported=d,t["default"]=m,e.exports=t["default"]},38:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={isAppearSupported:function(e){return e.transitionName&&e.transitionAppear||e.animation.appear},isEnterSupported:function(e){return e.transitionName&&e.transitionEnter||e.animation.enter},isLeaveSupported:function(e){return e.transitionName&&e.transitionLeave||e.animation.leave},allowAppearCallback:function(e){return e.transitionAppear||e.animation.appear},allowEnterCallback:function(e){return e.transitionEnter||e.animation.enter},allowLeaveCallback:function(e){return e.transitionLeave||e.animation.leave}};t["default"]=n,e.exports=t["default"]},43:function(e,t,n){var r,i;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r))e.push(n.apply(null,r));else if("object"===i)for(var o in r)a.call(r,o)&&r[o]&&e.push(o)}}return e.join(" ")}var a={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=n:(r=[],i=function(){return n}.apply(t,r),!(void 0!==i&&(e.exports=i)))}()},47:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=r(i),o=n(4),s=r(o),l=n(5),u=r(l),c=n(7),d=r(c),p=n(6),f=r(p),m=n(1),h=r(m),v=n(11),y=r(v),E=function(e){function t(e){(0,s["default"])(this,t);var n=(0,d["default"])(this,(0,a["default"])(t).call(this,e));return n._initLogger(),n._bind("onFirstClick","onPreviousClick","onNextClick","onLastClick"),n}return(0,f["default"])(t,e),(0,u["default"])(t,[{key:"onFirstClick",value:function(){this.debug("onFirstClick"),this.props.fetchData(0)}},{key:"onPreviousClick",value:function(){this.debug("onPreviousClick");var e=this.props.skippedItem-this.props.itemPerPage;this.props.fetchData(e)}},{key:"onNextClick",value:function(){this.debug("onNextClick");var e=this.props.skippedItem+this.props.itemPerPage;this.props.fetchData(e)}},{key:"onLastClick",value:function(){this.debug("onLastClick");var e=void 0;e=this.props.totalItem%this.props.itemPerPage?this.props.totalItem-this.props.totalItem%this.props.itemPerPage:this.props.totalItem-this.props.itemPerPage,this.props.fetchData(e)}},{key:"render",value:function(){var e=!this.props.skippedItem,t=void 0,n=void 0;e?(t=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},"<<"),n=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},"<")):(t=h["default"].createElement("a",{onClick:this.onFirstClick,className:"btn btn-default btn-link"},"<<"),n=h["default"].createElement("a",{onClick:this.onPreviousClick,className:"btn btn-default btn-link"},"<"));var r=!this.props.totalItem||this.props.totalItem<=this.props.skippedItem+this.props.itemPerPage,i=void 0,a=void 0;return r?(i=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},">"),a=h["default"].createElement("a",{className:"btn btn-default btn-link",disabled:!0},">>")):(i=h["default"].createElement("a",{onClick:this.onNextClick,className:"btn btn-default btn-link"},">"),a=h["default"].createElement("a",{onClick:this.onLastClick,className:"btn btn-default btn-link"},">>")),r&&e?null:h["default"].createElement("div",{name:"pager"},t,n,i,a)}}]),t}(y["default"]);E.propTypes={totalItem:m.PropTypes.number.isRequired,skippedItem:m.PropTypes.number.isRequired,fetchData:m.PropTypes.func.isRequired,itemPerPage:m.PropTypes.number.isRequired},t["default"]=E},64:function(e,t,n){function r(e){if(!e||!e.nodeType)throw new Error("A DOM element reference is required");this.el=e,this.list=e.classList}try{var i=n(36)}catch(a){var i=n(36)}var o=/\s+/,s=Object.prototype.toString;e.exports=function(e){return new r(e)},r.prototype.add=function(e){if(this.list)return this.list.add(e),this;var t=this.array(),n=i(t,e);return~n||t.push(e),this.el.className=t.join(" "),this},r.prototype.remove=function(e){if("[object RegExp]"==s.call(e))return this.removeMatching(e);if(this.list)return this.list.remove(e),this;var t=this.array(),n=i(t,e);return~n&&t.splice(n,1),this.el.className=t.join(" "),this},r.prototype.removeMatching=function(e){for(var t=this.array(),n=0;n<t.length;n++)e.test(t[n])&&this.remove(t[n]);return this},r.prototype.toggle=function(e,t){return this.list?("undefined"!=typeof t?t!==this.list.toggle(e,t)&&this.list.toggle(e):this.list.toggle(e),this):("undefined"!=typeof t?t?this.add(e):this.remove(e):this.has(e)?this.remove(e):this.add(e),this)},r.prototype.array=function(){var e=this.el.getAttribute("class")||"",t=e.replace(/^\s+|\s+$/g,""),n=t.split(o);return""===n[0]&&n.shift(),n},r.prototype.has=r.prototype.contains=function(e){return this.list?this.list.contains(e):!!~i(this.array(),e)}},65:function(e,t){"use strict";function n(){var e=document.createElement("div"),t=e.style;"AnimationEvent"in window||delete a.animationend.animation,"TransitionEvent"in window||delete a.transitionend.transition;for(var n in a)if(a.hasOwnProperty(n)){var r=a[n];for(var i in r)if(i in t){o.push(r[i]);break}}}function r(e,t,n){e.addEventListener(t,n,!1)}function i(e,t,n){e.removeEventListener(t,n,!1)}Object.defineProperty(t,"__esModule",{value:!0});var a={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},o=[];"undefined"!=typeof window&&"undefined"!=typeof document&&n();var s={addEndEventListener:function(e,t){return 0===o.length?void window.setTimeout(t,0):void o.forEach(function(n){r(e,n,t)})},endEvents:o,removeEndEventListener:function(e,t){0!==o.length&&o.forEach(function(n){i(e,n,t)})}};t["default"]=s,e.exports=t["default"]},66:function(e,t,n){t=e.exports=n(8)(),t.push([e.id,".rc-collapse{background-color:#f4f4f4;border-radius:3px;border:1px solid #d9d9d9}.rc-collapse-anim-active{-webkit-transition:height .2s ease-out;transition:height .2s ease-out}.rc-collapse>.rc-collapse-item{border-top:1px solid #d9d9d9}.rc-collapse>.rc-collapse-item:first-child{border-top:none}.rc-collapse>.rc-collapse-item>.rc-collapse-header{height:38px;line-height:38px;text-indent:16px;color:#666;cursor:pointer}.rc-collapse>.rc-collapse-item>.rc-collapse-header .arrow{display:inline-block;content:' ';width:0;height:0;font-size:0;line-height:0;border-top:3px solid transparent;border-bottom:3px solid transparent;border-left:4px solid #666;vertical-align:middle;margin-right:8px}.rc-collapse-content{overflow:hidden;color:#666;padding:0 16px;background-color:#fff}.rc-collapse-content>.rc-collapse-content-box{margin-top:16px;margin-bottom:16px}.rc-collapse-content-inactive{display:none}.rc-collapse-item:last-child>.rc-collapse-content{border-radius:0 0 3px 3px}.rc-collapse>.rc-collapse-item-active>.rc-collapse-header .arrow{border-left:3px solid transparent;border-right:3px solid transparent;border-top:4px solid #666;margin-right:6px}",""])},67:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){var t=e.children;return l["default"].isValidElement(t)&&!t.key?l["default"].cloneElement(t,{key:m}):t}function o(){}Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),l=r(s),u=n(69),c=n(68),d=r(c),p=n(38),f=r(p),m="rc_animate_"+Date.now(),h=l["default"].createClass({displayName:"Animate",propTypes:{component:l["default"].PropTypes.any,animation:l["default"].PropTypes.object,transitionName:l["default"].PropTypes.oneOfType([l["default"].PropTypes.string,l["default"].PropTypes.object]),transitionEnter:l["default"].PropTypes.bool,transitionAppear:l["default"].PropTypes.bool,exclusive:l["default"].PropTypes.bool,transitionLeave:l["default"].PropTypes.bool,onEnd:l["default"].PropTypes.func,onEnter:l["default"].PropTypes.func,onLeave:l["default"].PropTypes.func,onAppear:l["default"].PropTypes.func,showProp:l["default"].PropTypes.string},getDefaultProps:function(){return{animation:{},component:"span",transitionEnter:!0,transitionLeave:!0,transitionAppear:!1,onEnd:o,onEnter:o,onLeave:o,onAppear:o}},getInitialState:function(){return this.currentlyAnimatingKeys={},this.keysToEnter=[],this.keysToLeave=[],{children:(0,u.toArrayChildren)(a(this.props))}},componentDidMount:function(){var e=this,t=this.props.showProp,n=this.state.children;t&&(n=n.filter(function(e){return!!e.props[t]})),n.forEach(function(t){t&&e.performAppear(t.key)})},componentWillReceiveProps:function(e){var t=this;this.nextProps=e;var n=(0,u.toArrayChildren)(a(e)),r=this.props;r.exclusive&&Object.keys(this.currentlyAnimatingKeys).forEach(function(e){t.stop(e)});var o=r.showProp,s=this.currentlyAnimatingKeys,c=r.exclusive?(0,u.toArrayChildren)(a(r)):this.state.children,d=[];o?(c.forEach(function(e){var t=e&&(0,u.findChildInChildrenByKey)(n,e.key),r=void 0;r=t&&t.props[o]||!e.props[o]?t:l["default"].cloneElement(t||e,i({},o,!0)),r&&d.push(r)}),n.forEach(function(e){e&&(0,u.findChildInChildrenByKey)(c,e.key)||d.push(e)})):d=(0,u.mergeChildren)(c,n),this.setState({children:d}),n.forEach(function(e){var n=e&&e.key;if(!e||!s[n]){var r=e&&(0,u.findChildInChildrenByKey)(c,n);if(o){var i=e.props[o];if(r){var a=(0,u.findShownChildInChildrenByKey)(c,n,o);!a&&i&&t.keysToEnter.push(n)}else i&&t.keysToEnter.push(n)}else r||t.keysToEnter.push(n)}}),c.forEach(function(e){var r=e&&e.key;if(!e||!s[r]){var i=e&&(0,u.findChildInChildrenByKey)(n,r);if(o){var a=e.props[o];if(i){var l=(0,u.findShownChildInChildrenByKey)(n,r,o);!l&&a&&t.keysToLeave.push(r)}else a&&t.keysToLeave.push(r)}else i||t.keysToLeave.push(r)}})},componentDidUpdate:function(){var e=this.keysToEnter;this.keysToEnter=[],e.forEach(this.performEnter);var t=this.keysToLeave;this.keysToLeave=[],t.forEach(this.performLeave)},performEnter:function(e){this.refs[e]&&(this.currentlyAnimatingKeys[e]=!0,this.refs[e].componentWillEnter(this.handleDoneAdding.bind(this,e,"enter")))},performAppear:function(e){this.refs[e]&&(this.currentlyAnimatingKeys[e]=!0,this.refs[e].componentWillAppear(this.handleDoneAdding.bind(this,e,"appear")))},handleDoneAdding:function(e,t){var n=this.props;if(delete this.currentlyAnimatingKeys[e],!n.exclusive||n===this.nextProps){var r=(0,u.toArrayChildren)(a(n));this.isValidChildByKey(r,e)?"appear"===t?f["default"].allowAppearCallback(n)&&(n.onAppear(e),n.onEnd(e,!0)):f["default"].allowEnterCallback(n)&&(n.onEnter(e),n.onEnd(e,!0)):this.performLeave(e)}},performLeave:function(e){this.refs[e]&&(this.currentlyAnimatingKeys[e]=!0,this.refs[e].componentWillLeave(this.handleDoneLeaving.bind(this,e)))},handleDoneLeaving:function(e){var t=this.props;if(delete this.currentlyAnimatingKeys[e],!t.exclusive||t===this.nextProps){var n=(0,u.toArrayChildren)(a(t));if(this.isValidChildByKey(n,e))this.performEnter(e);else{var r=function(){f["default"].allowLeaveCallback(t)&&(t.onLeave(e),t.onEnd(e,!1))};this.isMounted()&&!(0,u.isSameChildren)(this.state.children,n,t.showProp)?this.setState({children:n},r):r()}}},isValidChildByKey:function(e,t){var n=this.props.showProp;return n?(0,u.findShownChildInChildrenByKey)(e,t,n):(0,u.findChildInChildrenByKey)(e,t)},stop:function(e){delete this.currentlyAnimatingKeys[e];var t=this.refs[e];t&&t.stop()},render:function(){var e=this.props;this.nextProps=e;var t=this.state.children,n=null;t&&(n=t.map(function(t){if(null===t||void 0===t)return t;if(!t.key)throw new Error("must set key for <rc-animate> children");return l["default"].createElement(d["default"],{key:t.key,ref:t.key,animation:e.animation,transitionName:e.transitionName,transitionEnter:e.transitionEnter,transitionAppear:e.transitionAppear,transitionLeave:e.transitionLeave},t)}));var r=e.component;if(r){var i=e;return"string"==typeof r&&(i={className:e.className,style:e.style}),l["default"].createElement(r,i,n)}return n[0]||null}});t["default"]=h,e.exports=t["default"]},68:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},a=n(1),o=r(a),s=n(42),l=r(s),u=n(37),c=r(u),d=n(38),p=r(d),f={enter:"transitionEnter",appear:"transitionAppear",leave:"transitionLeave"},m=o["default"].createClass({displayName:"AnimateChild",propTypes:{children:o["default"].PropTypes.any},componentWillUnmount:function(){this.stop()},componentWillEnter:function(e){p["default"].isEnterSupported(this.props)?this.transition("enter",e):e()},componentWillAppear:function(e){p["default"].isAppearSupported(this.props)?this.transition("appear",e):e()},componentWillLeave:function(e){p["default"].isLeaveSupported(this.props)?this.transition("leave",e):e()},transition:function(e,t){var n=this,r=l["default"].findDOMNode(this),a=this.props,o=a.transitionName,s="object"===("undefined"==typeof o?"undefined":i(o));this.stop();var d=function(){n.stopper=null,t()};if((u.isCssAnimationSupported||!a.animation[e])&&o&&a[f[e]]){var p=s?o[e]:o+"-"+e;this.stopper=(0,c["default"])(r,p,d)}else this.stopper=a.animation[e](r,d)},stop:function(){var e=this.stopper;e&&(this.stopper=null,e.stop())},render:function(){return this.props.children}});t["default"]=m,e.exports=t["default"]},69:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){var t=[];return d["default"].Children.forEach(e,function(e){t.push(e)}),t}function a(e,t){var n=null;return e&&e.forEach(function(e){n||e&&e.key===t&&(n=e)}),n}function o(e,t,n){var r=null;return e&&e.forEach(function(e){if(e&&e.key===t&&e.props[n]){if(r)throw new Error("two child with same key for <rc-animate> children");r=e}}),r}function s(e,t,n){var r=0;return e&&e.forEach(function(e){r||(r=e&&e.key===t&&!e.props[n])}),r}function l(e,t,n){var r=e.length===t.length;return r&&e.forEach(function(e,i){var a=t[i];e&&a&&(e&&!a||!e&&a?r=!1:e.key!==a.key?r=!1:n&&e.props[n]!==a.props[n]&&(r=!1))}),r}function u(e,t){var n=[],r={},i=[];return e.forEach(function(e){e&&a(t,e.key)?i.length&&(r[e.key]=i,i=[]):i.push(e)}),t.forEach(function(e){e&&r.hasOwnProperty(e.key)&&(n=n.concat(r[e.key])),n.push(e)}),n=n.concat(i)}Object.defineProperty(t,"__esModule",{value:!0}),t.toArrayChildren=i,t.findChildInChildrenByKey=a,t.findShownChildInChildrenByKey=o,t.findHiddenChildInChildrenByKey=s,t.isSameChildren=l,t.mergeChildren=u;var c=n(1),d=r(c)},70:function(e,t,n){"use strict";e.exports=n(67)},71:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e){var t=e;return Array.isArray(t)||(t=t?[t]:[]),t}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),s=r(o),l=n(72),u=r(l),c=n(75),d=r(c),p=s["default"].createClass({displayName:"Collapse",propTypes:{children:o.PropTypes.any,prefixCls:o.PropTypes.string,activeKey:o.PropTypes.oneOfType([o.PropTypes.string,o.PropTypes.arrayOf(o.PropTypes.string)]),defaultActiveKey:o.PropTypes.oneOfType([o.PropTypes.string,o.PropTypes.arrayOf(o.PropTypes.string)]),openAnimation:o.PropTypes.object,onChange:o.PropTypes.func,accordion:o.PropTypes.bool},statics:{Panel:u["default"]},getDefaultProps:function(){return{prefixCls:"rc-collapse",onChange:function(){},accordion:!1}},getInitialState:function(){var e=this.props,t=e.activeKey,n=e.defaultActiveKey,r=n;return"activeKey"in this.props&&(r=t),{openAnimation:this.props.openAnimation||(0,d["default"])(this.props.prefixCls),activeKey:a(r)}},componentWillReceiveProps:function(e){"activeKey"in e&&this.setState({activeKey:a(e.activeKey)}),"openAnimation"in e&&this.setState({openAnimation:e.openAnimation})},onClickItem:function(e){var t=this;return function(){var n=t.state.activeKey;if(t.props.accordion)n=n[0]===e?[]:[e];else{n=[].concat(i(n));var r=n.indexOf(e),a=r>-1;a?n.splice(r,1):n.push(e)}t.setActiveKey(n)}},getItems:function(){var e=this,t=this.state.activeKey,n=this.props,r=n.prefixCls,i=n.accordion;return o.Children.map(this.props.children,function(n,a){var o=n.key||String(a),l=n.props.header,u=!1;u=i?t[0]===o:t.indexOf(o)>-1;var c={key:o,header:l,isActive:u,prefixCls:r,openAnimation:e.state.openAnimation,children:n.props.children,onItemClick:e.onClickItem(o).bind(e)};return s["default"].cloneElement(n,c)})},setActiveKey:function(e){"activeKey"in this.props||this.setState({activeKey:e}),this.props.onChange(this.props.accordion?e[0]:e)},render:function(){var e=this.props.prefixCls;return s["default"].createElement("div",{className:e},this.getItems())}});t["default"]=p,e.exports=t["default"]},72:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),a=r(i),o=n(73),s=r(o),l=n(70),u=r(l),c=a["default"].createClass({displayName:"CollapsePanel",propTypes:{children:i.PropTypes.any,openAnimation:i.PropTypes.object,prefixCls:i.PropTypes.string,header:i.PropTypes.oneOfType([i.PropTypes.string,i.PropTypes.number,i.PropTypes.node]),isActive:i.PropTypes.bool,onItemClick:i.PropTypes.func},getDefaultProps:function(){return{isActive:!1,onItemClick:function(){}}},handleItemClick:function(){this.props.onItemClick()},render:function(){var e=this.props,t=e.prefixCls,n=e.header,r=e.children,i=e.isActive,o=t+"-header";return a["default"].createElement("div",{className:t+"-item"},a["default"].createElement("div",{className:o,onClick:this.handleItemClick,role:"tab","aria-expanded":i},a["default"].createElement("i",{className:"arrow"}),n),a["default"].createElement(u["default"],{showProp:"isActive",exclusive:!0,component:"",animation:this.props.openAnimation},a["default"].createElement(s["default"],{prefixCls:t,isActive:i},r)))}});t["default"]=c,e.exports=t["default"]},73:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),o=r(a),s=n(43),l=r(s),u=o["default"].createClass({displayName:"PanelContent",propTypes:{prefixCls:a.PropTypes.string,isActive:a.PropTypes.bool,children:a.PropTypes.any},shouldComponentUpdate:function(e){return this.props.isActive||e.isActive},render:function(){var e;if(this._isActived=this._isActived||this.props.isActive,!this._isActived)return null;var t=this.props,n=t.prefixCls,r=t.isActive,a=t.children,s=(0,l["default"])((e={},i(e,n+"-content",!0),i(e,n+"-content-active",r),i(e,n+"-content-inactive",!r),e));return o["default"].createElement("div",{className:s,role:"tabpanel"},o["default"].createElement("div",{className:n+"-content-box"},a))}});t["default"]=u,e.exports=t["default"]},74:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(71),a=r(i);t["default"]=a["default"],e.exports=t["default"]},75:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n,r){var i=void 0;return(0,s["default"])(e,n,{start:function(){t?(i=e.offsetHeight,e.style.height=0):e.style.height=e.offsetHeight+"px"},active:function(){e.style.height=(t?i:0)+"px"},end:function(){e.style.height="",r()}})}function a(e){return{enter:function(t,n){return i(t,!0,e+"-anim",n)},leave:function(t,n){return i(t,!1,e+"-anim",n)}}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(37),s=r(o);t["default"]=a,e.exports=t["default"]},78:function(e,t,n){var r=n(66);"string"==typeof r&&(r=[[e.id,r,""]]);n(23)(r,{});r.locals&&(e.exports=r.locals)},157:function(e,t,n){e.exports={"default":n(158),__esModule:!0}},158:function(e,t,n){n(173),e.exports=n(40).Object.keys},173:function(e,t,n){var r=n(130),i=n(95);n(165)("keys",function(){return function(e){return i(r(e))}})},213:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n,r){return function(i){var s={token:e.token,actions:[{action:"read",model:"testinstance",skip:n,limit:r,ascending:"name",filters:{test_batch_id:t}},{action:"read",model:"testbatch",uid:t}]};d["default"].post("/api/crud",s).then(function(e){m.debug("/api/crud (data) (response)",s,e),i(e.data.success?a(e.data,n,r):o(e.data.results[0].error))})}}function a(e,t,n){return e.skip=t,e.limit=n,{type:p,data:e}}function o(e){return{type:f,error:e}}function s(){var e=arguments.length<=0||void 0===arguments[0]?h:arguments[0],t=arguments[1];switch(t.type){case p:return(0,u["default"])({},h,{testInstanceDetailList:t.data.results[0].results,totalTestInstance:t.data.results[0].total,testBatch:t.data.results[1].results[0],limit:t.data.limit,skip:t.data.skip});case f:return(0,u["default"])({},h,{error:t.error});default:return e}}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.LOADED_TEST_INSTANCE_DETAIL_LIST_ERROR=t.LOADED_TEST_INSTANCE_LIST_DETAIL_SUCCESS=void 0;var l=n(19),u=r(l);t.doFetchTestInstanceDetailList=i,t["default"]=s;var c=n(24),d=r(c),p=t.LOADED_TEST_INSTANCE_LIST_DETAIL_SUCCESS="LOADED_TEST_INSTANCE_LIST_DETAIL_SUCCESS",f=t.LOADED_TEST_INSTANCE_DETAIL_LIST_ERROR="LOADED_TEST_INSTANCE_DETAIL_LIST_ERROR",m=n(25).getLogger("TestInstanceDetailList");m.setLevel("error");var h=(t.actions={doFetchTestInstanceDetailList:i},{testInstanceDetailList:null,error:null,totalTestInstance:0,testBatch:null,skip:0,limit:10})},464:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(63),a=r(i),o=n(157),s=r(o),l=n(3),u=r(l),c=n(4),d=r(c),p=n(5),f=r(p),m=n(7),h=r(m),v=n(6),y=r(v),E=n(1),g=r(E),b=n(9),T=n(2),k=r(T),_=n(74),A=r(_);n(78);var C=n(22),P=r(C),L=n(26),I=r(L),x=n(12),w=r(x),M=n(47),N=r(M),S=n(31),D=r(S),O=n(11),K=r(O),j=10,B=function(e){function t(e){(0,d["default"])(this,t);var n=(0,h["default"])(this,(0,u["default"])(t).call(this,e));return n._initLogger(),n._bind("pad2","getTestBatch","getTestBatchUid","fetchTestInstanceDetailList"),n}return(0,y["default"])(t,e),(0,f["default"])(t,[{key:"componentWillMount",value:function(){this.debug("componentWillUnmount"),this.fetchTestInstanceDetailList(0)}},{key:"fetchTestInstanceDetailList",value:function(e){this.props.actions.doFetchTestInstanceDetailList(this.props.state.session,this.getTestBatchUid(),e,j)}},{key:"getTestBatchUid",value:function(){return this.props.location.query.testbatchuid}},{key:"getTestBatch",value:function(){return this.props.state.testinstancedetaillist.testBatch}},{key:"pad2",value:function(e){return(e<10?"0":"")+e}},{key:"render",value:function(){var e=this,t=this.props.state.testinstancedetaillist;if(t.error)return g["default"].createElement(w["default"],{msgId:t.error});if(null===t.testInstanceDetailList)return g["default"].createElement("div",{className:"container-fluid"},g["default"].createElement(D["default"],{style:{left:"50%"}}));var n=function(){var n=e.props.state.testinstancedetaillist.testInstanceDetailList,r=e.getTestBatch(),i=[{msgId:"TestBatchDetail",to:"/testbatchdetail?testbatchuid="+r.uid},{msgId:"TestInstanceDetailList",disable:!0}];return{v:g["default"].createElement("div",null,g["default"].createElement(P["default"],{routes:i}),g["default"].createElement("h2",{className:"text-center"},"Test Instance List ",g["default"].createElement("small",null," (",r.friendly_name,") (",r.uid,")")),g["default"].createElement("ul",null,function(){return n.map(function(t,n){var r=g["default"].createElement("div",{style:{top:"-40px"},className:"text-ellipsis"},g["default"].createElement("i",{className:"fa fa-sticky-note-o","aria-hidden":"true"})," ",t.name,g["default"].createElement(I["default"],{browserName:t.browser_capabilities.browserName,browserIcon:t.browser_capabilities.browserName,browserVersion:t.browser_capabilities.version,platform:t.browser_capabilities.platform})),i=(0,k["default"])(t.starting_timestamp),a=void 0;a=t.ending_timestamp?(0,k["default"])(t.ending_timestamp):Date.now();var o=k["default"].duration((0,k["default"])(a).diff(i)),l=parseInt(o.asHours()),u=parseInt(o.asMinutes())-60*l,c=parseInt(o.asSeconds())-60*l-60*u,d=e.pad2(l)+":"+e.pad2(u)+":"+e.pad2(c);return g["default"].createElement("div",{key:n},g["default"].createElement(A["default"],{accordion:!0},g["default"].createElement(_.Panel,{header:r,key:n},g["default"].createElement(A["default"],{accordion:!0},g["default"].createElement(_.Panel,{header:"Execution Time"},g["default"].createElement("p",null,g["default"].createElement("small",null,g["default"].createElement("b",null,g["default"].createElement(b.FormattedMessage,{id:"testBatchList.StartedTimestamp",defaultMessage:"Started:"}))," ",g["default"].createElement(b.FormattedDate,{value:i,year:"numeric",month:"long",day:"2-digit"})," ",g["default"].createElement(b.FormattedTime,{value:i}))),function(){return t.ending_timestamp?g["default"].createElement("div",null,g["default"].createElement("p",null,g["default"].createElement("small",null,g["default"].createElement("b",null,g["default"].createElement(b.FormattedMessage,{id:"testBatchList.EndingTimtestamp",defaultMessage:"Ended:"}))," ",g["default"].createElement(b.FormattedDate,{value:a,year:"numeric",month:"long",day:"2-digit"})," ",g["default"].createElement(b.FormattedTime,{value:a}))),g["default"].createElement("p",null,g["default"].createElement("small",null,g["default"].createElement("b",null,g["default"].createElement(b.FormattedMessage,{id:"testBatchList.TotalDuration",defaultMessage:"Total duration:"}))," ",d))):g["default"].createElement("div",null,g["default"].createElement("p",null,g["default"].createElement("small",null,g["default"].createElement("i",null,g["default"].createElement(b.FormattedMessage,{id:"testBatchList.IsRunning",defaultMessage:"is running..."})))),g["default"].createElement("p",null,g["default"].createElement("small",null,g["default"].createElement("b",null,g["default"].createElement(b.FormattedMessage,{id:"testBatchList.TotalDuration",defaultMessage:"Total duration:"}))," ",d)))}()),g["default"].createElement(_.Panel,{header:"Extra Info"},g["default"].createElement("ul",null,function(){return(0,s["default"])(t.extra_data).length?(0,s["default"])(t.extra_data).map(function(e,n){return g["default"].createElement("li",null,e,": ",t.extra_data[e])}):g["default"].createElement("li",null,"No extra info")}()))))))})}()),g["default"].createElement(N["default"],{skippedItem:t.skip,fetchData:e.fetchTestInstanceDetailList,totalItem:t.totalTestInstance,itemPerPage:j}))}}();return"object"===("undefined"==typeof n?"undefined":(0,a["default"])(n))?n.v:void 0}}]),t}(K["default"]);e.exports=B},465:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){return{state:e}}function a(e){return{actions:(0,s.bindActionCreators)(l.actions,e)}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(17),s=n(21),l=n(213),u=n(464),c=r(u);t["default"]=(0,o.connect)(i,a)(c["default"])}});
//# sourceMappingURL=5.8e45a249ce4626fd3f06.chunk.js.map
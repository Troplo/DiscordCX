/**
 * @license
 Modernizr 3.0.0pre (Custom Build) | MIT
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
 The buffer module from node.js, for the browser.

 @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 @license  MIT
 Copyright (c) 2015 Jed Watson.
   Licensed under the MIT License (MIT), see
   http://jedwatson.github.io/classnames
*/
'use strict';
!function(modules) {
  /**
   * @param {number} moduleId
   * @return {?}
   */
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      exports : {},
      id : moduleId,
      loaded : false
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = true, module.exports;
  }
  var installedModules = {};
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "/assets/", __webpack_require__(0);
}([function(canCreateDiscussions, isSlidingUp, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  var _react = __webpack_require__(2);
  var _react2 = _interopRequireDefault(_react);
  var _uid = __webpack_require__(169);
  var _uid2 = _interopRequireDefault(_uid);
  var _htmlParser = __webpack_require__(171);
  var _HTMLParser = _interopRequireDefault(_htmlParser);
  var _classlist = __webpack_require__(176);
  var _larouxAjaxJs2 = _interopRequireDefault(_classlist);
  var self = __webpack_require__(187);
  var _prepareStyleProperties = __webpack_require__(188);
  var _prepareStyleProperties2 = _interopRequireDefault(_prepareStyleProperties);
  var _normalizeDataUri = __webpack_require__(189);
  var _normalizeDataUri2 = _interopRequireDefault(_normalizeDataUri);
  __webpack_require__(1);
  __webpack_require__(191);
  __webpack_require__(192);
  __webpack_require__(193);
  __webpack_require__(194);
  var Data = __webpack_require__(204);
  /** @type {boolean} */
  var isMobile = "iOS" === _normalizeDataUri2["default"].os.family || "Android" === _normalizeDataUri2["default"].os.family || "Windows Phone" === _normalizeDataUri2["default"].os.family;
  _prepareStyleProperties2["default"].attach(document.body);
  var originalEnd = _larouxAjaxJs2["default"].Request.prototype.end;
  /**
   * @return {?}
   */
  _larouxAjaxJs2["default"].Request.prototype.end = function() {
    if ("/" === this.url[0]) {
      /** @type {string} */
      this.url = location.protocol + "/api" + this.url;
    }
    var e = _HTMLParser["default"].getSuperPropertiesBase64();
    if (null != e) {
      this.set("X-Track", e);
    }
    var result = _uid2["default"].get("fingerprint");
    return result && this.set("X-Fingerprint", result), originalEnd.apply(this, arguments);
  };
  if (null == _uid2["default"].get("fingerprint") && null == _uid2["default"].get("token")) {
    _larouxAjaxJs2["default"].post(self.Endpoints.FINGERPRINT).end(function(reqOpts) {
      _uid2["default"].set("fingerprint", reqOpts.body.fingerprint);
      _HTMLParser["default"].track("View Landing", {
        Variant : "a"
      });
    });
  }
  _react2["default"].render(_react2["default"].createElement(Data, {
    isMobile : isMobile,
    isSafari : false,
    isIE : false
  }), document.getElementById("app-mount"));
}, function(mixin, canCreateDiscussions, __webpack_require__) {
  /** @type {string} */
  mixin.exports = __webpack_require__.p + "d7ab13f8ad338a80f1a068333b2cb69c.ico";
}, function(module, canCreateDiscussions, factory) {
  module.exports = factory(3);
}, function(module, canCreateDiscussions, require) {
  var LinkedStateMixin = require(159);
  var React = require(5);
  var ReactComponentWithPureRenderMixin = require(162);
  var ReactCSSTransitionGroup = require(163);
  var ReactFragment = require(12);
  var ReactTransitionGroup = require(4);
  var ReactUpdates = require(28);
  var cx = require(167);
  var cloneWithProps = require(156);
  var undoUpdate = require(168);
  React.addons = {
    CSSTransitionGroup : ReactCSSTransitionGroup,
    LinkedStateMixin : LinkedStateMixin,
    PureRenderMixin : ReactComponentWithPureRenderMixin,
    TransitionGroup : ReactTransitionGroup,
    batchedUpdates : ReactUpdates.batchedUpdates,
    classSet : cx,
    cloneWithProps : cloneWithProps,
    createFragment : ReactFragment.create,
    update : undoUpdate
  };
  module.exports = React;
}, function(module, canCreateDiscussions, require) {
  var React = require(5);
  var _ = require(155);
  var joinClasses = require(17);
  var createElement = require(156);
  var emptyFunction = require(15);
  var storeMixin = React.createClass({
    displayName : "ReactTransitionGroup",
    propTypes : {
      component : React.PropTypes.any,
      childFactory : React.PropTypes.func
    },
    getDefaultProps : function() {
      return {
        component : "span",
        childFactory : emptyFunction.thatReturnsArgument
      };
    },
    getInitialState : function() {
      return {
        children : _.getChildMapping(this.props.children)
      };
    },
    componentWillMount : function() {
      this.currentlyTransitioningKeys = {};
      /** @type {!Array} */
      this.keysToEnter = [];
      /** @type {!Array} */
      this.keysToLeave = [];
    },
    componentDidMount : function() {
      var grandchildren = this.state.children;
      var key;
      for (key in grandchildren) {
        if (grandchildren[key]) {
          this.performAppear(key);
        }
      }
    },
    componentWillReceiveProps : function(nextProps) {
      var nextChildMapping = _.getChildMapping(nextProps.children);
      var prevChildMapping = this.state.children;
      this.setState({
        children : _.mergeChildMappings(prevChildMapping, nextChildMapping)
      });
      var key;
      for (key in nextChildMapping) {
        var envVar = prevChildMapping && prevChildMapping.hasOwnProperty(key);
        if (!(!nextChildMapping[key] || envVar || this.currentlyTransitioningKeys[key])) {
          this.keysToEnter.push(key);
        }
      }
      for (key in prevChildMapping) {
        var envVar = nextChildMapping && nextChildMapping.hasOwnProperty(key);
        if (!(!prevChildMapping[key] || envVar || this.currentlyTransitioningKeys[key])) {
          this.keysToLeave.push(key);
        }
      }
    },
    componentDidUpdate : function() {
      var keysToEnter = this.keysToEnter;
      /** @type {!Array} */
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      var keysToLeave = this.keysToLeave;
      /** @type {!Array} */
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    },
    performAppear : function(key) {
      /** @type {boolean} */
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillAppear) {
        component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
      } else {
        this._handleDoneAppearing(key);
      }
    },
    _handleDoneAppearing : function(key) {
      var component = this.refs[key];
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }
      delete this.currentlyTransitioningKeys[key];
      var prevChildMapping = _.getChildMapping(this.props.children);
      if (!(prevChildMapping && prevChildMapping.hasOwnProperty(key))) {
        this.performLeave(key);
      }
    },
    performEnter : function(key) {
      /** @type {boolean} */
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillEnter) {
        component.componentWillEnter(this._handleDoneEntering.bind(this, key));
      } else {
        this._handleDoneEntering(key);
      }
    },
    _handleDoneEntering : function(key) {
      var component = this.refs[key];
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }
      delete this.currentlyTransitioningKeys[key];
      var prevChildMapping = _.getChildMapping(this.props.children);
      if (!(prevChildMapping && prevChildMapping.hasOwnProperty(key))) {
        this.performLeave(key);
      }
    },
    performLeave : function(key) {
      /** @type {boolean} */
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillLeave) {
        component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
      } else {
        this._handleDoneLeaving(key);
      }
    },
    _handleDoneLeaving : function(key) {
      var component = this.refs[key];
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }
      delete this.currentlyTransitioningKeys[key];
      var prevChildMapping = _.getChildMapping(this.props.children);
      if (prevChildMapping && prevChildMapping.hasOwnProperty(key)) {
        this.performEnter(key);
      } else {
        var text = joinClasses({}, this.state.children);
        delete text[key];
        this.setState({
          children : text
        });
      }
    },
    render : function() {
      /** @type {!Array} */
      var cell = [];
      var id;
      for (id in this.state.children) {
        var node = this.state.children[id];
        if (node) {
          cell.push(createElement(this.props.childFactory(node), {
            ref : id,
            key : id
          }));
        }
      }
      return React.createElement(this.props.component, this.props, cell);
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  var EventPluginUtils = require(6);
  var ReactChildren = require(10);
  var ReactComponent = require(24);
  var ReactClass = require(39);
  var ReactContext = require(16);
  var ReactCurrentOwner = require(19);
  var ReactElement = require(13);
  var vtree$ = (require(34), require(42));
  var ReactDOMTextComponent = require(44);
  var ReactDefaultInjection = require(93);
  var ReactInstanceHandles = require(21);
  var ReactMount = require(69);
  var ReactPerf = require(30);
  var ReactPropTypes = require(124);
  var ReactReconciler = require(31);
  var ReactServerRendering = require(152);
  var assign = require(17);
  var findDOMNode = require(97);
  var onlyChild = require(154);
  ReactDefaultInjection.inject();
  var createElement = ReactElement.createElement;
  var createFactory = ReactElement.createFactory;
  var cloneElement = ReactElement.cloneElement;
  var render = ReactPerf.measure("React", "render", ReactMount.render);
  var React = {
    Children : {
      map : ReactChildren.map,
      forEach : ReactChildren.forEach,
      count : ReactChildren.count,
      only : onlyChild
    },
    Component : ReactComponent,
    DOM : vtree$,
    PropTypes : ReactPropTypes,
    initializeTouchEvents : function(shouldUseTouch) {
      EventPluginUtils.useTouchEvents = shouldUseTouch;
    },
    createClass : ReactClass.createClass,
    createElement : createElement,
    cloneElement : cloneElement,
    createFactory : createFactory,
    createMixin : function(mixin) {
      return mixin;
    },
    constructAndRenderComponent : ReactMount.constructAndRenderComponent,
    constructAndRenderComponentByID : ReactMount.constructAndRenderComponentByID,
    findDOMNode : findDOMNode,
    render : render,
    renderToString : ReactServerRendering.renderToString,
    renderToStaticMarkup : ReactServerRendering.renderToStaticMarkup,
    unmountComponentAtNode : ReactMount.unmountComponentAtNode,
    isValidElement : ReactElement.isValidElement,
    withContext : ReactContext.withContext,
    __spread : assign
  };
  if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject) {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
      CurrentOwner : ReactCurrentOwner,
      InstanceHandles : ReactInstanceHandles,
      Mount : ReactMount,
      Reconciler : ReactReconciler,
      TextComponent : ReactDOMTextComponent
    });
  }
  /** @type {string} */
  React.version = "0.13.3";
  module.exports = React;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} topLevelType
   * @return {?}
   */
  function isEndish(topLevelType) {
    return topLevelType === topLevelTypes.topMouseUp || topLevelType === topLevelTypes.topTouchEnd || topLevelType === topLevelTypes.topTouchCancel;
  }
  /**
   * @param {?} topLevelType
   * @return {?}
   */
  function isMoveish(topLevelType) {
    return topLevelType === topLevelTypes.topMouseMove || topLevelType === topLevelTypes.topTouchMove;
  }
  /**
   * @param {?} topLevelType
   * @return {?}
   */
  function isStartish(topLevelType) {
    return topLevelType === topLevelTypes.topMouseDown || topLevelType === topLevelTypes.topTouchStart;
  }
  /**
   * @param {!Object} event
   * @param {?} cb
   * @return {undefined}
   */
  function forEachEventDispatch(event, cb) {
    var result = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;
    if (Array.isArray(result)) {
      /** @type {number} */
      var i = 0;
      for (; i < result.length && !event.isPropagationStopped(); i++) {
        cb(event, result[i], dispatchIDs[i]);
      }
    } else {
      if (result) {
        cb(event, result, dispatchIDs);
      }
    }
  }
  /**
   * @param {!Event} event
   * @param {?} listener
   * @param {?} domID
   * @return {?}
   */
  function executeDispatch(event, listener, domID) {
    event.currentTarget = injection.Mount.getNode(domID);
    var returnValue = listener(event, domID);
    return event.currentTarget = null, returnValue;
  }
  /**
   * @param {!Object} event
   * @param {?} executeDispatch
   * @return {undefined}
   */
  function executeDispatchesInOrder(event, executeDispatch) {
    forEachEventDispatch(event, executeDispatch);
    /** @type {null} */
    event._dispatchListeners = null;
    /** @type {null} */
    event._dispatchIDs = null;
  }
  /**
   * @param {!Object} event
   * @return {?}
   */
  function executeDispatchesInOrderStopAtTrueImpl(event) {
    var fn = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;
    if (Array.isArray(fn)) {
      /** @type {number} */
      var i = 0;
      for (; i < fn.length && !event.isPropagationStopped(); i++) {
        if (fn[i](event, dispatchIDs[i])) {
          return dispatchIDs[i];
        }
      }
    } else {
      if (fn && fn(event, dispatchIDs)) {
        return dispatchIDs;
      }
    }
    return null;
  }
  /**
   * @param {!Object} event
   * @return {?}
   */
  function executeDispatchesInOrderStopAtTrue(event) {
    var ret = executeDispatchesInOrderStopAtTrueImpl(event);
    return event._dispatchIDs = null, event._dispatchListeners = null, ret;
  }
  /**
   * @param {?} event
   * @return {?}
   */
  function executeDirectDispatch(event) {
    var f = event._dispatchListeners;
    var p = event._dispatchIDs;
    invariant(!Array.isArray(f));
    var patternId = f ? f(event, p) : null;
    return event._dispatchListeners = null, event._dispatchIDs = null, patternId;
  }
  /**
   * @param {?} event
   * @return {?}
   */
  function hasDispatches(event) {
    return !!event._dispatchListeners;
  }
  var EventConstants = require(7);
  var invariant = require(9);
  var injection = {
    Mount : null,
    injectMount : function(InjectedMount) {
      injection.Mount = InjectedMount;
    }
  };
  var topLevelTypes = EventConstants.topLevelTypes;
  var EventPluginUtils = {
    isEndish : isEndish,
    isMoveish : isMoveish,
    isStartish : isStartish,
    executeDirectDispatch : executeDirectDispatch,
    executeDispatch : executeDispatch,
    executeDispatchesInOrder : executeDispatchesInOrder,
    executeDispatchesInOrderStopAtTrue : executeDispatchesInOrderStopAtTrue,
    hasDispatches : hasDispatches,
    injection : injection,
    useTouchEvents : false
  };
  module.exports = EventPluginUtils;
}, function(module, canCreateDiscussions, saveNotifs) {
  var FbmNoise2 = saveNotifs(8);
  var erodeNoise = FbmNoise2({
    bubbled : null,
    captured : null
  });
  var ruggedNoise = FbmNoise2({
    topBlur : null,
    topChange : null,
    topClick : null,
    topCompositionEnd : null,
    topCompositionStart : null,
    topCompositionUpdate : null,
    topContextMenu : null,
    topCopy : null,
    topCut : null,
    topDoubleClick : null,
    topDrag : null,
    topDragEnd : null,
    topDragEnter : null,
    topDragExit : null,
    topDragLeave : null,
    topDragOver : null,
    topDragStart : null,
    topDrop : null,
    topError : null,
    topFocus : null,
    topInput : null,
    topKeyDown : null,
    topKeyPress : null,
    topKeyUp : null,
    topLoad : null,
    topMouseDown : null,
    topMouseMove : null,
    topMouseOut : null,
    topMouseOver : null,
    topMouseUp : null,
    topPaste : null,
    topReset : null,
    topScroll : null,
    topSelectionChange : null,
    topSubmit : null,
    topTextInput : null,
    topTouchCancel : null,
    topTouchEnd : null,
    topTouchMove : null,
    topTouchStart : null,
    topWheel : null
  });
  var BinaryBundle = {
    topLevelTypes : ruggedNoise,
    PropagationPhases : erodeNoise
  };
  module.exports = BinaryBundle;
}, function(mixin, canCreateDiscussions, _$$mdAnimate_) {
  var updateEnv = _$$mdAnimate_(9);
  /**
   * @param {!Object} name
   * @return {?}
   */
  var m = function(name) {
    var n;
    var d = {};
    updateEnv(name instanceof Object && !Array.isArray(name));
    for (n in name) {
      if (name.hasOwnProperty(n)) {
        /** @type {string} */
        d[n] = n;
      }
    }
    return d;
  };
  /** @type {function(!Object): ?} */
  mixin.exports = m;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} str
   * @param {?} expected
   * @param {?} f
   * @param {?} c
   * @param {?} d
   * @param {?} a
   * @param {?} b
   * @param {?} e
   * @return {undefined}
   */
  var invariant = function(str, expected, f, c, d, a, b, e) {
    if (!str) {
      var error;
      if (void 0 === expected) {
        /** @type {!Error} */
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        /** @type {!Array} */
        var array = [f, c, d, a, b, e];
        /** @type {number} */
        var item = 0;
        /** @type {!Error} */
        error = new Error("Invariant Violation: " + expected.replace(/%s/g, function() {
          return array[item++];
        }));
      }
      throw error.framesToPop = 1, error;
    }
  };
  /** @type {function(!Object, ?, ?, ?, ?, ?, ?, ?): undefined} */
  module.exports = invariant;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Function} forEachFunction
   * @param {?} forEachContext
   * @return {undefined}
   */
  function ForEachBookKeeping(forEachFunction, forEachContext) {
    /** @type {!Function} */
    this.forEachFunction = forEachFunction;
    this.forEachContext = forEachContext;
  }
  /**
   * @param {?} traverseContext
   * @param {?} child
   * @param {?} i
   * @param {?} name
   * @return {undefined}
   */
  function forEachSingleChild(traverseContext, child, i, name) {
    var forEachBookKeeping = traverseContext;
    forEachBookKeeping.forEachFunction.call(forEachBookKeeping.forEachContext, child, name);
  }
  /**
   * @param {!Function} children
   * @param {string} forEachFunc
   * @param {?} forEachContext
   * @return {?}
   */
  function forEachChildren(children, forEachFunc, forEachContext) {
    if (null == children) {
      return children;
    }
    var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    ForEachBookKeeping.release(traverseContext);
  }
  /**
   * @param {?} mapResult
   * @param {!Function} mapFunction
   * @param {?} mapContext
   * @return {undefined}
   */
  function MapBookKeeping(mapResult, mapFunction, mapContext) {
    this.mapResult = mapResult;
    /** @type {!Function} */
    this.mapFunction = mapFunction;
    this.mapContext = mapContext;
  }
  /**
   * @param {?} traverseContext
   * @param {?} child
   * @param {?} name
   * @param {?} i
   * @return {undefined}
   */
  function mapSingleChildIntoContext(traverseContext, child, name, i) {
    var mapBookKeeping = traverseContext;
    var mapResult = mapBookKeeping.mapResult;
    /** @type {boolean} */
    var a = !mapResult.hasOwnProperty(name);
    if (a) {
      var mappedChild = mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
      mapResult[name] = mappedChild;
    }
  }
  /**
   * @param {string} children
   * @param {!Function} func
   * @param {?} context
   * @return {?}
   */
  function mapChildren(children, func, context) {
    if (null == children) {
      return children;
    }
    var array = {};
    var traverseContext = MapBookKeeping.getPooled(array, func, context);
    return traverseAllChildren(children, mapSingleChildIntoContext, traverseContext), MapBookKeeping.release(traverseContext), shims.create(array);
  }
  /**
   * @param {?} name
   * @param {?} child
   * @param {?} i
   * @param {?} forceOptional
   * @return {?}
   */
  function forEachSingleChildDummy(name, child, i, forceOptional) {
    return null;
  }
  /**
   * @param {?} children
   * @param {?} context
   * @return {?}
   */
  function countChildren(children, context) {
    return traverseAllChildren(children, forEachSingleChildDummy, null);
  }
  var PooledClass = require(11);
  var shims = require(12);
  var traverseAllChildren = require(20);
  var twoArgumentPooler = (require(14), PooledClass.twoArgumentPooler);
  var fourArgumentPooler = PooledClass.threeArgumentPooler;
  PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
  PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);
  var ReactChildren = {
    forEach : forEachChildren,
    map : mapChildren,
    count : countChildren
  };
  module.exports = ReactChildren;
}, function(module, canCreateDiscussions, __webpack_require__) {
  var invariant = __webpack_require__(9);
  /**
   * @param {string} val
   * @return {?}
   */
  var oneArgumentPooler = function(val) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var name = Klass.instancePool.pop();
      return Klass.call(name, val), name;
    }
    return new Klass(val);
  };
  /**
   * @param {?} a1
   * @param {?} a2
   * @return {?}
   */
  var twoArgumentPooler = function(a1, a2) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var name = Klass.instancePool.pop();
      return Klass.call(name, a1, a2), name;
    }
    return new Klass(a1, a2);
  };
  /**
   * @param {string} a1
   * @param {(!Function|RegExp|string)} a2
   * @param {(!Function|RegExp|string)} a3
   * @return {?}
   */
  var threeArgumentPooler = function(a1, a2, a3) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var name = Klass.instancePool.pop();
      return Klass.call(name, a1, a2, a3), name;
    }
    return new Klass(a1, a2, a3);
  };
  /**
   * @param {number} a1
   * @param {number} a2
   * @param {number} a3
   * @param {number} a4
   * @param {number} a5
   * @return {?}
   */
  var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
    var Klass = this;
    if (Klass.instancePool.length) {
      var name = Klass.instancePool.pop();
      return Klass.call(name, a1, a2, a3, a4, a5), name;
    }
    return new Klass(a1, a2, a3, a4, a5);
  };
  /**
   * @param {!Function} instance
   * @return {undefined}
   */
  var standardReleaser = function(instance) {
    var Klass = this;
    invariant(instance instanceof Klass);
    if (instance.destructor) {
      instance.destructor();
    }
    if (Klass.instancePool.length < Klass.poolSize) {
      Klass.instancePool.push(instance);
    }
  };
  /** @type {number} */
  var DEFAULT_POOL_SIZE = 10;
  /** @type {function(string): ?} */
  var DEFAULT_POOLER = oneArgumentPooler;
  /**
   * @param {!Function} CopyConstructor
   * @param {!Function} pooler
   * @return {?}
   */
  var addPoolingTo = function(CopyConstructor, pooler) {
    /** @type {!Function} */
    var NewKlass = CopyConstructor;
    return NewKlass.instancePool = [], NewKlass.getPooled = pooler || DEFAULT_POOLER, NewKlass.poolSize || (NewKlass.poolSize = DEFAULT_POOL_SIZE), NewKlass.release = standardReleaser, NewKlass;
  };
  var PooledClass = {
    addPoolingTo : addPoolingTo,
    oneArgumentPooler : oneArgumentPooler,
    twoArgumentPooler : twoArgumentPooler,
    threeArgumentPooler : threeArgumentPooler,
    fiveArgumentPooler : fiveArgumentPooler
  };
  module.exports = PooledClass;
}, function(module, canCreateDiscussions, saveNotifs) {
  var storeMixin = (saveNotifs(13), saveNotifs(14), {
    create : function(namespace) {
      return namespace;
    },
    extract : function(fragment) {
      return fragment;
    },
    extractIfFragment : function(fragment) {
      return fragment;
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  var ReactContext = require(16);
  var ReactCurrentOwner = require(19);
  var assign = require(17);
  var sessionBeforeChange = (require(14), {
    key : true,
    ref : true
  });
  /**
   * @param {!Object} type
   * @param {string} key
   * @param {string} ref
   * @param {string} owner
   * @param {!Object} context
   * @param {!Object} props
   * @return {undefined}
   */
  var ReactElement = function(type, key, ref, owner, context, props) {
    /** @type {!Object} */
    this.type = type;
    /** @type {string} */
    this.key = key;
    /** @type {string} */
    this.ref = ref;
    /** @type {string} */
    this._owner = owner;
    /** @type {!Object} */
    this._context = context;
    /** @type {!Object} */
    this.props = props;
  };
  ReactElement.prototype = {
    _isReactElement : true
  };
  /**
   * @param {string} type
   * @param {!Object} data
   * @param {!Object} name
   * @return {?}
   */
  ReactElement.createElement = function(type, data, name) {
    var k;
    var props = {};
    /** @type {null} */
    var key = null;
    /** @type {null} */
    var ref = null;
    if (null != data) {
      ref = void 0 === data.ref ? null : data.ref;
      /** @type {(null|string)} */
      key = void 0 === data.key ? null : "" + data.key;
      for (k in data) {
        if (data.hasOwnProperty(k) && !sessionBeforeChange.hasOwnProperty(k)) {
          props[k] = data[k];
        }
      }
    }
    /** @type {number} */
    var _len = arguments.length - 2;
    if (1 === _len) {
      /** @type {!Object} */
      props.children = name;
    } else {
      if (_len > 1) {
        /** @type {!Array} */
        var data = Array(_len);
        /** @type {number} */
        var _i = 0;
        for (; _len > _i; _i++) {
          data[_i] = arguments[_i + 2];
        }
        /** @type {!Array} */
        props.children = data;
      }
    }
    if (type && type.defaultProps) {
      var defaults = type.defaultProps;
      for (k in defaults) {
        if ("undefined" == typeof props[k]) {
          props[k] = defaults[k];
        }
      }
    }
    return new ReactElement(type, key, ref, ReactCurrentOwner.current, ReactContext.current, props);
  };
  /**
   * @param {string} name
   * @return {?}
   */
  ReactElement.createFactory = function(name) {
    var func = ReactElement.createElement.bind(null, name);
    return func.type = name, func;
  };
  /**
   * @param {!Object} oldElement
   * @param {number} newProps
   * @return {?}
   */
  ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
    var newElement = new ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._owner, oldElement._context, newProps);
    return newElement;
  };
  /**
   * @param {!Object} element
   * @param {!Object} config
   * @param {!Object} children
   * @return {?}
   */
  ReactElement.cloneElement = function(element, config, children) {
    var k;
    var result = assign({}, element.props);
    var key = element.key;
    var ref = element.ref;
    var owner = element._owner;
    if (null != config) {
      if (void 0 !== config.ref) {
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }
      if (void 0 !== config.key) {
        /** @type {string} */
        key = "" + config.key;
      }
      for (k in config) {
        if (config.hasOwnProperty(k) && !sessionBeforeChange.hasOwnProperty(k)) {
          result[k] = config[k];
        }
      }
    }
    /** @type {number} */
    var _len = arguments.length - 2;
    if (1 === _len) {
      /** @type {!Object} */
      result.children = children;
    } else {
      if (_len > 1) {
        /** @type {!Array} */
        var nodes = Array(_len);
        /** @type {number} */
        var _i = 0;
        for (; _len > _i; _i++) {
          nodes[_i] = arguments[_i + 2];
        }
        /** @type {!Array} */
        result.children = nodes;
      }
    }
    return new ReactElement(element.type, key, ref, owner, element._context, result);
  };
  /**
   * @param {!Object} obj
   * @return {?}
   */
  ReactElement.isValidElement = function(obj) {
    /** @type {boolean} */
    var isElement = !(!obj || !obj._isReactElement);
    return isElement;
  };
  /** @type {function(!Object, string, string, string, !Object, !Object): undefined} */
  module.exports = ReactElement;
}, function(mixin, canCreateDiscussions, require) {
  var matrix = require(15);
  var m = matrix;
  mixin.exports = m;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {string} arg
   * @return {?}
   */
  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }
  /**
   * @return {undefined}
   */
  function emptyFunction() {
  }
  /** @type {function(string): ?} */
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  /**
   * @return {?}
   */
  emptyFunction.thatReturnsThis = function() {
    return this;
  };
  /**
   * @param {!Object} arg
   * @return {?}
   */
  emptyFunction.thatReturnsArgument = function(arg) {
    return arg;
  };
  /** @type {function(): undefined} */
  module.exports = emptyFunction;
}, function(module, canCreateDiscussions, require) {
  var assign = require(17);
  var emptyObject = require(18);
  var ReactContext = (require(14), {
    current : emptyObject,
    withContext : function(newContext, scopedCallback) {
      var result;
      var previousContext = ReactContext.current;
      ReactContext.current = assign({}, previousContext, newContext);
      try {
        result = scopedCallback();
      } finally {
        ReactContext.current = previousContext;
      }
      return result;
    }
  });
  module.exports = ReactContext;
}, function(blob, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @param {string} key
   * @return {?}
   */
  function type(obj, key) {
    if (null == obj) {
      throw new TypeError("Object.assign target cannot be null or undefined");
    }
    /** @type {!Object} */
    var t = Object(obj);
    /** @type {function(this:Object, *): boolean} */
    var __hasProp = Object.prototype.hasOwnProperty;
    /** @type {number} */
    var i = 1;
    for (; i < arguments.length; i++) {
      var template = arguments[i];
      if (null != template) {
        /** @type {!Object} */
        var opts = Object(template);
        var k;
        for (k in opts) {
          if (__hasProp.call(opts, k)) {
            t[k] = opts[k];
          }
        }
      }
    }
    return t;
  }
  /** @type {function(!Object, string): ?} */
  blob.exports = type;
}, function(module, canCreateDiscussions, n) {
  var storeMixin = {};
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, n) {
  var ReactCurrentOwner = {
    current : null
  };
  module.exports = ReactCurrentOwner;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} hash
   * @return {?}
   */
  function headingsTemplate(hash) {
    return deletedHashes[hash];
  }
  /**
   * @param {!Object} component
   * @param {number} t
   * @return {?}
   */
  function wrap(component, t) {
    return component && null != component.key ? wrapUserProvidedKey(component.key) : t.toString(36);
  }
  /**
   * @param {string} text
   * @return {?}
   */
  function escapeUserProvidedKey(text) {
    return ("" + text).replace(REGEX_ESCAPE_EXPR, headingsTemplate);
  }
  /**
   * @param {string} key
   * @return {?}
   */
  function wrapUserProvidedKey(key) {
    return "$" + escapeUserProvidedKey(key);
  }
  /**
   * @param {!Object} node
   * @param {string} val
   * @param {number} m
   * @param {string} f
   * @param {?} args
   * @return {?}
   */
  function set(node, val, m, f, args) {
    /** @type {string} */
    var type = typeof node;
    if (("undefined" === type || "boolean" === type) && (node = null), null === node || "string" === type || "number" === type || ReactElement.isValidElement(node)) {
      return f(args, node, "" === val ? SEPARATOR + wrap(node, 0) : val, m), 1;
    }
    var value;
    var length;
    var result;
    /** @type {number} */
    var name = 0;
    if (Array.isArray(node)) {
      /** @type {number} */
      var i = 0;
      for (; i < node.length; i++) {
        value = node[i];
        length = ("" !== val ? val + type : SEPARATOR) + wrap(value, i);
        result = m + name;
        name = name + set(value, length, result, f, args);
      }
    } else {
      var iteratorFn = getIteratorFn(node);
      if (iteratorFn) {
        var _step;
        var w = iteratorFn.call(node);
        if (iteratorFn !== node.entries) {
          /** @type {number} */
          var _ = 0;
          for (; !(_step = w.next()).done;) {
            value = _step.value;
            length = ("" !== val ? val + type : SEPARATOR) + wrap(value, _++);
            result = m + name;
            name = name + set(value, length, result, f, args);
          }
        } else {
          for (; !(_step = w.next()).done;) {
            var entry = _step.value;
            if (entry) {
              value = entry[1];
              /** @type {string} */
              length = ("" !== val ? val + type : SEPARATOR) + wrapUserProvidedKey(entry[0]) + type + wrap(value, 0);
              result = m + name;
              name = name + set(value, length, result, f, args);
            }
          }
        }
      } else {
        if ("object" === type) {
          end(1 !== node.nodeType);
          var nameOrAttrs = ReactFragment.extract(node);
          var key;
          for (key in nameOrAttrs) {
            if (nameOrAttrs.hasOwnProperty(key)) {
              value = nameOrAttrs[key];
              /** @type {string} */
              length = ("" !== val ? val + type : SEPARATOR) + wrapUserProvidedKey(key) + type + wrap(value, 0);
              result = m + name;
              name = name + set(value, length, result, f, args);
            }
          }
        }
      }
    }
    return name;
  }
  /**
   * @param {!Object} key
   * @param {string} f
   * @param {?} args
   * @return {?}
   */
  function l(key, f, args) {
    return null == key ? 0 : set(key, "", 0, f, args);
  }
  var ReactElement = require(13);
  var ReactFragment = require(12);
  var ReactInstanceHandles = require(21);
  var getIteratorFn = require(23);
  var end = require(9);
  var SEPARATOR = (require(14), ReactInstanceHandles.SEPARATOR);
  /** @type {string} */
  var type = ":";
  var deletedHashes = {
    "=" : "=0",
    "." : "=1",
    ":" : "=2"
  };
  /** @type {!RegExp} */
  var REGEX_ESCAPE_EXPR = /[=.:]/g;
  /** @type {function(!Object, string, ?): ?} */
  module.exports = l;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} index
   * @return {?}
   */
  function getReactRootIDString(index) {
    return SEPARATOR + index.toString(36);
  }
  /**
   * @param {string} id
   * @param {number} index
   * @return {?}
   */
  function isBoundary(id, index) {
    return id.charAt(index) === SEPARATOR || index === id.length;
  }
  /**
   * @param {string} id
   * @return {?}
   */
  function isValidID(id) {
    return "" === id || id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR;
  }
  /**
   * @param {string} ancestorID
   * @param {!Object} descendantID
   * @return {?}
   */
  function isAncestorIDOf(ancestorID, descendantID) {
    return 0 === descendantID.indexOf(ancestorID) && isBoundary(descendantID, ancestorID.length);
  }
  /**
   * @param {string} id
   * @return {?}
   */
  function getParentID(id) {
    return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : "";
  }
  /**
   * @param {string} ancestorID
   * @param {string} destinationID
   * @return {?}
   */
  function getNextDescendantID(ancestorID, destinationID) {
    if (invariant(isValidID(ancestorID) && isValidID(destinationID)), invariant(isAncestorIDOf(ancestorID, destinationID)), ancestorID === destinationID) {
      return ancestorID;
    }
    var i;
    var start = ancestorID.length + SEPARATOR_LENGTH;
    i = start;
    for (; i < destinationID.length && !isBoundary(destinationID, i); i++) {
    }
    return destinationID.substr(0, i);
  }
  /**
   * @param {string} oneID
   * @param {string} twoID
   * @return {?}
   */
  function getFirstCommonAncestorID(oneID, twoID) {
    /** @type {number} */
    var swapIndex = Math.min(oneID.length, twoID.length);
    if (0 === swapIndex) {
      return "";
    }
    /** @type {number} */
    var lastCommonMarkerIndex = 0;
    /** @type {number} */
    var i = 0;
    for (; swapIndex >= i; i++) {
      if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
        /** @type {number} */
        lastCommonMarkerIndex = i;
      } else {
        if (oneID.charAt(i) !== twoID.charAt(i)) {
          break;
        }
      }
    }
    var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
    return invariant(isValidID(longestCommonID)), longestCommonID;
  }
  /**
   * @param {!Object} start
   * @param {!Object} stop
   * @param {!Function} cb
   * @param {!Object} arg
   * @param {boolean} data
   * @param {boolean} collection
   * @return {undefined}
   */
  function traverseParentPath(start, stop, cb, arg, data, collection) {
    start = start || "";
    stop = stop || "";
    invariant(start !== stop);
    var traverseUp = isAncestorIDOf(stop, start);
    invariant(traverseUp || isAncestorIDOf(start, stop));
    /** @type {number} */
    var depth = 0;
    /** @type {!Function} */
    var traverse = traverseUp ? getParentID : getNextDescendantID;
    /** @type {!Object} */
    var id = start;
    for (;; id = traverse(id, stop)) {
      var ret;
      if (data && id === start || collection && id === stop || (ret = cb(id, traverseUp, arg)), ret === false || id === stop) {
        break;
      }
      invariant(depth++ < MAX_TREE_DEPTH);
    }
  }
  var ReactRootIndex = require(22);
  var invariant = require(9);
  /** @type {string} */
  var SEPARATOR = ".";
  /** @type {number} */
  var SEPARATOR_LENGTH = SEPARATOR.length;
  /** @type {number} */
  var MAX_TREE_DEPTH = 100;
  var ReactInstanceHandles = {
    createReactRootID : function() {
      return getReactRootIDString(ReactRootIndex.createReactRootIndex());
    },
    createReactID : function(t, name) {
      return t + name;
    },
    getReactRootIDFromNodeID : function(id) {
      if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
        var index = id.indexOf(SEPARATOR, 1);
        return index > -1 ? id.substr(0, index) : id;
      }
      return null;
    },
    traverseEnterLeave : function(leaveID, enterID, cb, upArg, downArg) {
      var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
      if (ancestorID !== leaveID) {
        traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
      }
      if (ancestorID !== enterID) {
        traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
      }
    },
    traverseTwoPhase : function(targetID, cb, arg) {
      if (targetID) {
        traverseParentPath("", targetID, cb, arg, true, false);
        traverseParentPath(targetID, "", cb, arg, false, true);
      }
    },
    traverseAncestors : function(targetID, cb, arg) {
      traverseParentPath("", targetID, cb, arg, true, false);
    },
    _getFirstCommonAncestorID : getFirstCommonAncestorID,
    _getNextDescendantID : getNextDescendantID,
    isAncestorIDOf : isAncestorIDOf,
    SEPARATOR : SEPARATOR
  };
  module.exports = ReactInstanceHandles;
}, function(module, canCreateDiscussions, n) {
  var ReactEmptyComponentInjection = {
    injectCreateReactRootIndex : function(_createReactRootIndex) {
      /** @type {!Function} */
      ReactEmptyComponent.createReactRootIndex = _createReactRootIndex;
    }
  };
  var ReactEmptyComponent = {
    createReactRootIndex : null,
    injection : ReactEmptyComponentInjection
  };
  module.exports = ReactEmptyComponent;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function MovementRules(obj) {
    var rep = obj && (listType && obj[listType] || obj[type]);
    return "function" == typeof rep ? rep : void 0;
  }
  var listType = "function" == typeof Symbol && Symbol.iterator;
  /** @type {string} */
  var type = "@@iterator";
  /** @type {function(!Object): ?} */
  module.exports = MovementRules;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} options
   * @param {string} context
   * @return {undefined}
   */
  function ReactComponent(options, context) {
    /** @type {!Object} */
    this.props = options;
    /** @type {string} */
    this.context = context;
  }
  var ReactUpdateQueue = require(25);
  var invariant = require(9);
  require(14);
  /**
   * @param {string} prop
   * @param {?} callback
   * @return {undefined}
   */
  ReactComponent.prototype.setState = function(prop, callback) {
    invariant("object" == typeof prop || "function" == typeof prop || null == prop);
    ReactUpdateQueue.enqueueSetState(this, prop);
    if (callback) {
      ReactUpdateQueue.enqueueCallback(this, callback);
    }
  };
  /**
   * @param {?} callback
   * @return {undefined}
   */
  ReactComponent.prototype.forceUpdate = function(callback) {
    ReactUpdateQueue.enqueueForceUpdate(this);
    if (callback) {
      ReactUpdateQueue.enqueueCallback(this, callback);
    }
  };
  /** @type {function(!Object, string): undefined} */
  module.exports = ReactComponent;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} internalInstance
   * @return {undefined}
   */
  function enqueueUpdate(internalInstance) {
    if (internalInstance !== ReactLifeCycle.currentlyMountingInstance) {
      ReactUpdates.enqueueUpdate(internalInstance);
    }
  }
  /**
   * @param {string} publicInstance
   * @param {string} callerName
   * @return {?}
   */
  function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
    invariant(null == multiselect.current);
    var internalInstance = ReactInstanceMap.get(publicInstance);
    return internalInstance ? internalInstance === ReactLifeCycle.currentlyUnmountingInstance ? null : internalInstance : null;
  }
  var ReactLifeCycle = require(26);
  var multiselect = require(19);
  var ReactElement = require(13);
  var ReactInstanceMap = require(27);
  var ReactUpdates = require(28);
  var assign = require(17);
  var invariant = require(9);
  var storeMixin = (require(14), {
    enqueueCallback : function(publicInstance, callback) {
      invariant("function" == typeof callback);
      var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);
      return internalInstance && internalInstance !== ReactLifeCycle.currentlyMountingInstance ? (internalInstance._pendingCallbacks ? internalInstance._pendingCallbacks.push(callback) : internalInstance._pendingCallbacks = [callback], void enqueueUpdate(internalInstance)) : null;
    },
    enqueueCallbackInternal : function(internalInstance, callback) {
      invariant("function" == typeof callback);
      if (internalInstance._pendingCallbacks) {
        internalInstance._pendingCallbacks.push(callback);
      } else {
        /** @type {!Array} */
        internalInstance._pendingCallbacks = [callback];
      }
      enqueueUpdate(internalInstance);
    },
    enqueueForceUpdate : function(publicInstance) {
      var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, "forceUpdate");
      if (internalInstance) {
        /** @type {boolean} */
        internalInstance._pendingForceUpdate = true;
        enqueueUpdate(internalInstance);
      }
    },
    enqueueReplaceState : function(publicInstance, completeState) {
      var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, "replaceState");
      if (internalInstance) {
        /** @type {!Array} */
        internalInstance._pendingStateQueue = [completeState];
        /** @type {boolean} */
        internalInstance._pendingReplaceState = true;
        enqueueUpdate(internalInstance);
      }
    },
    enqueueSetState : function(publicInstance, callback) {
      var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, "setState");
      if (internalInstance) {
        var fixedRightWatchers = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
        fixedRightWatchers.push(callback);
        enqueueUpdate(internalInstance);
      }
    },
    enqueueSetProps : function(publicInstance, partialProps) {
      var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, "setProps");
      if (internalInstance) {
        invariant(internalInstance._isTopLevel);
        var element = internalInstance._pendingElement || internalInstance._currentElement;
        var props = assign({}, element.props, partialProps);
        internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(element, props);
        enqueueUpdate(internalInstance);
      }
    },
    enqueueReplaceProps : function(publicInstance, props) {
      var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, "replaceProps");
      if (internalInstance) {
        invariant(internalInstance._isTopLevel);
        var element = internalInstance._pendingElement || internalInstance._currentElement;
        internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(element, props);
        enqueueUpdate(internalInstance);
      }
    },
    enqueueElementInternal : function(internalInstance, nextElement) {
      /** @type {!Object} */
      internalInstance._pendingElement = nextElement;
      enqueueUpdate(internalInstance);
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, n) {
  var ReactLifeCycle = {
    currentlyMountingInstance : null,
    currentlyUnmountingInstance : null
  };
  module.exports = ReactLifeCycle;
}, function(module, canCreateDiscussions, n) {
  var api = {
    remove : function(instance) {
      instance._reactInternalInstance = void 0;
    },
    get : function(key) {
      return key._reactInternalInstance;
    },
    has : function(value) {
      return void 0 !== value._reactInternalInstance;
    },
    set : function(key, value) {
      /** @type {string} */
      key._reactInternalInstance = value;
    }
  };
  module.exports = api;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function ensureInjected() {
    invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy);
  }
  /**
   * @return {undefined}
   */
  function ReactUpdatesFlushTransaction() {
    this.reinitializeTransaction();
    /** @type {null} */
    this.dirtyComponentsLength = null;
    this.callbackQueue = CallbackQueue.getPooled();
    this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled();
  }
  /**
   * @param {!Function} callback
   * @param {!Object} a
   * @param {?} b
   * @param {!Node} c
   * @param {?} d
   * @return {undefined}
   */
  function batchedUpdates(callback, a, b, c, d) {
    ensureInjected();
    batchingStrategy.batchedUpdates(callback, a, b, c, d);
  }
  /**
   * @param {?} c1
   * @param {?} c2
   * @return {?}
   */
  function mountOrderComparator(c1, c2) {
    return c1._mountOrder - c2._mountOrder;
  }
  /**
   * @param {?} transaction
   * @return {undefined}
   */
  function runBatchedUpdates(transaction) {
    var len = transaction.dirtyComponentsLength;
    invariant(len === dirtyComponents.length);
    dirtyComponents.sort(mountOrderComparator);
    /** @type {number} */
    var i = 0;
    for (; len > i; i++) {
      var component = dirtyComponents[i];
      var callbacks = component._pendingCallbacks;
      if (component._pendingCallbacks = null, ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction), callbacks) {
        /** @type {number} */
        var i = 0;
        for (; i < callbacks.length; i++) {
          transaction.callbackQueue.enqueue(callbacks[i], component.getPublicInstance());
        }
      }
    }
  }
  /**
   * @param {!Object} component
   * @return {?}
   */
  function enqueueUpdate(component) {
    return ensureInjected(), batchingStrategy.isBatchingUpdates ? void dirtyComponents.push(component) : void batchingStrategy.batchedUpdates(enqueueUpdate, component);
  }
  /**
   * @param {!Function} value
   * @param {!Object} task
   * @return {undefined}
   */
  function asap(value, task) {
    invariant(batchingStrategy.isBatchingUpdates);
    _this4.enqueue(value, task);
    /** @type {boolean} */
    asapEnqueued = true;
  }
  var CallbackQueue = require(29);
  var PooledClass = require(11);
  var ReactPerf = (require(19), require(30));
  var ReactReconciler = require(31);
  var Transaction = require(38);
  var assign = require(17);
  var invariant = require(9);
  /** @type {!Array} */
  var dirtyComponents = (require(14), []);
  var _this4 = CallbackQueue.getPooled();
  /** @type {boolean} */
  var asapEnqueued = false;
  /** @type {null} */
  var batchingStrategy = null;
  var ON_UMG_READY_QUEUEING = {
    initialize : function() {
      /** @type {number} */
      this.dirtyComponentsLength = dirtyComponents.length;
    },
    close : function() {
      if (this.dirtyComponentsLength !== dirtyComponents.length) {
        dirtyComponents.splice(0, this.dirtyComponentsLength);
        flushBatchedUpdates();
      } else {
        /** @type {number} */
        dirtyComponents.length = 0;
      }
    }
  };
  var UPDATE_QUEUEING = {
    initialize : function() {
      this.callbackQueue.reset();
    },
    close : function() {
      this.callbackQueue.notifyAll();
    }
  };
  /** @type {!Array} */
  var TRANSACTION_WRAPPERS = [ON_UMG_READY_QUEUEING, UPDATE_QUEUEING];
  assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
    getTransactionWrappers : function() {
      return TRANSACTION_WRAPPERS;
    },
    destructor : function() {
      /** @type {null} */
      this.dirtyComponentsLength = null;
      CallbackQueue.release(this.callbackQueue);
      /** @type {null} */
      this.callbackQueue = null;
      ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
      /** @type {null} */
      this.reconcileTransaction = null;
    },
    perform : function(method, a, id) {
      return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, a, id);
    }
  });
  PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
  /**
   * @return {undefined}
   */
  var flushBatchedUpdates = function() {
    for (; dirtyComponents.length || asapEnqueued;) {
      if (dirtyComponents.length) {
        var a = ReactUpdatesFlushTransaction.getPooled();
        a.perform(runBatchedUpdates, null, a);
        ReactUpdatesFlushTransaction.release(a);
      }
      if (asapEnqueued) {
        /** @type {boolean} */
        asapEnqueued = false;
        var that = _this4;
        _this4 = CallbackQueue.getPooled();
        that.notifyAll();
        CallbackQueue.release(that);
      }
    }
  };
  flushBatchedUpdates = ReactPerf.measure("ReactUpdates", "flushBatchedUpdates", flushBatchedUpdates);
  var ReactUpdatesInjection = {
    injectReconcileTransaction : function(ReconcileTransaction) {
      invariant(ReconcileTransaction);
      /** @type {!Function} */
      ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
    },
    injectBatchingStrategy : function(_batchingStrategy) {
      invariant(_batchingStrategy);
      invariant("function" == typeof _batchingStrategy.batchedUpdates);
      invariant("boolean" == typeof _batchingStrategy.isBatchingUpdates);
      /** @type {!Function} */
      batchingStrategy = _batchingStrategy;
    }
  };
  var ReactUpdates = {
    ReactReconcileTransaction : null,
    batchedUpdates : batchedUpdates,
    enqueueUpdate : enqueueUpdate,
    flushBatchedUpdates : flushBatchedUpdates,
    injection : ReactUpdatesInjection,
    asap : asap
  };
  module.exports = ReactUpdates;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function CallbackQueue() {
    /** @type {null} */
    this._callbacks = null;
    /** @type {null} */
    this._contexts = null;
  }
  var PooledClass = require(11);
  var assign = require(17);
  var isString = require(9);
  assign(CallbackQueue.prototype, {
    enqueue : function(data, obj) {
      this._callbacks = this._callbacks || [];
      this._contexts = this._contexts || [];
      this._callbacks.push(data);
      this._contexts.push(obj);
    },
    notifyAll : function() {
      var callbacks = this._callbacks;
      var contexts = this._contexts;
      if (callbacks) {
        isString(callbacks.length === contexts.length);
        /** @type {null} */
        this._callbacks = null;
        /** @type {null} */
        this._contexts = null;
        /** @type {number} */
        var i = 0;
        var l = callbacks.length;
        for (; l > i; i++) {
          callbacks[i].call(contexts[i]);
        }
        /** @type {number} */
        callbacks.length = 0;
        /** @type {number} */
        contexts.length = 0;
      }
    },
    reset : function() {
      /** @type {null} */
      this._callbacks = null;
      /** @type {null} */
      this._contexts = null;
    },
    destructor : function() {
      this.reset();
    }
  });
  PooledClass.addPoolingTo(CallbackQueue);
  /** @type {function(): undefined} */
  module.exports = CallbackQueue;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {?} objName
   * @param {?} fnName
   * @param {?} func
   * @return {?}
   */
  function _noMeasure(objName, fnName, func) {
    return func;
  }
  var ReactPerf = {
    enableMeasure : false,
    storedMeasure : _noMeasure,
    measureMethods : function(callback, object, methodNames) {
    },
    measure : function(state, name, value) {
      return value;
    },
    injection : {
      injectMeasure : function(measure) {
        /** @type {!Function} */
        ReactPerf.storedMeasure = measure;
      }
    }
  };
  module.exports = ReactPerf;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function attachRefs() {
    ReactRef.attachRefs(this, this._currentElement);
  }
  var ReactRef = require(32);
  var storeMixin = (require(34), {
    mountComponent : function(internalInstance, rootID, transaction, context) {
      var mountImage = internalInstance.mountComponent(rootID, transaction, context);
      return transaction.getReactMountReady().enqueue(attachRefs, internalInstance), mountImage;
    },
    unmountComponent : function(internalInstance) {
      ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
      internalInstance.unmountComponent();
    },
    receiveComponent : function(internalInstance, nextElement, transaction, context) {
      var prevElement = internalInstance._currentElement;
      if (nextElement !== prevElement || null == nextElement._owner) {
        var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);
        if (refsChanged) {
          ReactRef.detachRefs(internalInstance, prevElement);
        }
        internalInstance.receiveComponent(nextElement, transaction, context);
        if (refsChanged) {
          transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
        }
      }
    },
    performUpdateIfNecessary : function(internalInstance, transaction) {
      internalInstance.performUpdateIfNecessary(transaction);
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} ref
   * @param {?} component
   * @param {!Object} owner
   * @return {undefined}
   */
  function attachRef(ref, component, owner) {
    if ("function" == typeof ref) {
      ref(component.getPublicInstance());
    } else {
      ReactOwner.addComponentAsRefTo(component, ref, owner);
    }
  }
  /**
   * @param {?} ref
   * @param {!Object} component
   * @param {!Object} owner
   * @return {undefined}
   */
  function detachRef(ref, component, owner) {
    if ("function" == typeof ref) {
      ref(null);
    } else {
      ReactOwner.removeComponentAsRefFrom(component, ref, owner);
    }
  }
  var ReactOwner = require(33);
  var ReactRef = {};
  /**
   * @param {?} instance
   * @param {!Object} element
   * @return {undefined}
   */
  ReactRef.attachRefs = function(instance, element) {
    var ref = element.ref;
    if (null != ref) {
      attachRef(ref, instance, element._owner);
    }
  };
  /**
   * @param {!Object} prevElement
   * @param {!Object} nextElement
   * @return {?}
   */
  ReactRef.shouldUpdateRefs = function(prevElement, nextElement) {
    return nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref;
  };
  /**
   * @param {!Object} instance
   * @param {!Object} element
   * @return {undefined}
   */
  ReactRef.detachRefs = function(instance, element) {
    var ref = element.ref;
    if (null != ref) {
      detachRef(ref, instance, element._owner);
    }
  };
  module.exports = ReactRef;
}, function(module, canCreateDiscussions, __webpack_require__) {
  var invariant = __webpack_require__(9);
  var ReactOwner = {
    isValidOwner : function(object) {
      return !(!object || "function" != typeof object.attachRef || "function" != typeof object.detachRef);
    },
    addComponentAsRefTo : function(component, ref, owner) {
      invariant(ReactOwner.isValidOwner(owner));
      owner.attachRef(ref, component);
    },
    removeComponentAsRefFrom : function(component, ref, owner) {
      invariant(ReactOwner.isValidOwner(owner));
      if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
        owner.detachRef(ref);
      }
    }
  };
  module.exports = ReactOwner;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {?}
   */
  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var e = ReactCurrentOwner.current.getName();
      if (e) {
        return " Check the render method of `" + e + "`.";
      }
    }
    return "";
  }
  /**
   * @param {!Function} instance
   * @return {?}
   */
  function getName(instance) {
    var publicInstance = instance && instance.getPublicInstance();
    if (!publicInstance) {
      return void 0;
    }
    var constructor = publicInstance.constructor;
    return constructor ? constructor.displayName || constructor.name || void 0 : void 0;
  }
  /**
   * @return {?}
   */
  function getCurrentOwnerDisplayName() {
    var current = ReactCurrentOwner.current;
    return current && getName(current) || void 0;
  }
  /**
   * @param {?} element
   * @param {!Object} parentType
   * @return {undefined}
   */
  function validateExplicitKey(element, parentType) {
    if (!(element._store.validated || null != element.key)) {
      /** @type {boolean} */
      element._store.validated = true;
      warnAndMonitorForKeyUse('Each child in an array or iterator should have a unique "key" prop.', element, parentType);
    }
  }
  /**
   * @param {string} c
   * @param {!Object} t
   * @param {!Object} req
   * @return {undefined}
   */
  function next(c, t, req) {
    if (matchLetter.test(c)) {
      warnAndMonitorForKeyUse("Child objects should have non-numeric keys so ordering is preserved.", t, req);
    }
  }
  /**
   * @param {string} component
   * @param {!Object} element
   * @param {!Function} type
   * @return {undefined}
   */
  function warnAndMonitorForKeyUse(component, element, type) {
    var err = getCurrentOwnerDisplayName();
    var info = "string" == typeof type ? type : type.displayName || type.name;
    var msg = err || info;
    var msgmap = hooksByComponent[component] || (hooksByComponent[component] = {});
    if (!msgmap.hasOwnProperty(msg)) {
      /** @type {boolean} */
      msgmap[msg] = true;
      /** @type {string} */
      var th_field = "";
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        var name = getName(element._owner);
        /** @type {string} */
        th_field = " It was passed a child from " + name + ".";
      }
    }
  }
  /**
   * @param {?} node
   * @param {!Object} parentType
   * @return {undefined}
   */
  function validateChildKeys(node, parentType) {
    if (Array.isArray(node)) {
      /** @type {number} */
      var ii = 0;
      for (; ii < node.length; ii++) {
        var child = node[ii];
        if (ReactElement.isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else {
      if (ReactElement.isValidElement(node)) {
        /** @type {boolean} */
        node._store.validated = true;
      } else {
        if (node) {
          var iteratorFn = getIteratorFn(node);
          if (iteratorFn) {
            if (iteratorFn !== node.entries) {
              var step;
              var l = iteratorFn.call(node);
              for (; !(step = l.next()).done;) {
                if (ReactElement.isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          } else {
            if ("object" == typeof node) {
              var list = ReactFragment.extractIfFragment(node);
              var name;
              for (name in list) {
                if (list.hasOwnProperty(name)) {
                  next(name, list[name], parentType);
                }
              }
            }
          }
        }
      }
    }
  }
  /**
   * @param {?} componentName
   * @param {!Object} typeSpecs
   * @param {?} values
   * @param {?} location
   * @return {undefined}
   */
  function checkPropTypes(componentName, typeSpecs, values, location) {
    var typeSpecName;
    for (typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        try {
          assert("function" == typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location);
        } catch (a3) {
          error = a3;
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          /** @type {boolean} */
          loggedTypeFailures[error.message] = true;
          getDeclarationErrorAddendum(this);
        }
      }
    }
  }
  /**
   * @param {string} propName
   * @param {!Object} element
   * @return {undefined}
   */
  function warnForPropsMutation(propName, element) {
    var type = element.type;
    var elementName = "string" == typeof type ? type : type.displayName;
    var size1 = element._owner ? element._owner.getPublicInstance().constructor.displayName : null;
    /** @type {string} */
    var i = propName + "|" + elementName + "|" + size1;
    if (!iteratedSet.hasOwnProperty(i)) {
      /** @type {boolean} */
      iteratedSet[i] = true;
      /** @type {string} */
      var patch3c = "";
      if (elementName) {
        /** @type {string} */
        patch3c = " <" + elementName + " />";
      }
      /** @type {string} */
      var th_field = "";
      if (size1) {
        /** @type {string} */
        th_field = " The element was created by " + size1 + ".";
      }
    }
  }
  /**
   * @param {number} a
   * @param {number} b
   * @return {?}
   */
  function is(a, b) {
    return a !== a ? b !== b : 0 === a && 0 === b ? 1 / a === 1 / b : a === b;
  }
  /**
   * @param {?} element
   * @return {undefined}
   */
  function checkAndWarnForMutatedProps(element) {
    if (element._store) {
      var originalProps = element._store.originalProps;
      var props = element.props;
      var propName;
      for (propName in props) {
        if (props.hasOwnProperty(propName)) {
          if (!(originalProps.hasOwnProperty(propName) && is(originalProps[propName], props[propName]))) {
            warnForPropsMutation(propName, element);
            originalProps[propName] = props[propName];
          }
        }
      }
    }
  }
  /**
   * @param {!Object} element
   * @return {undefined}
   */
  function validatePropTypes(element) {
    if (null != element.type) {
      var componentClass = ReactNativeComponent.getComponentClassForElement(element);
      var componentName = componentClass.displayName || componentClass.name;
      if (componentClass.propTypes) {
        checkPropTypes(componentName, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
      }
      "function" == typeof componentClass.getDefaultProps;
    }
  }
  var ReactElement = require(13);
  var ReactFragment = require(12);
  var ReactPropTypeLocations = require(35);
  var ReactCurrentOwner = (require(36), require(19));
  var ReactNativeComponent = require(37);
  var getIteratorFn = require(23);
  var assert = require(9);
  var hooksByComponent = (require(14), {});
  var loggedTypeFailures = {};
  /** @type {!RegExp} */
  var matchLetter = /^\d+$/;
  var iteratedSet = {};
  var ReactElementValidator = {
    checkAndWarnForMutatedProps : checkAndWarnForMutatedProps,
    createElement : function(type, params, name) {
      var newElement = ReactElement.createElement.apply(this, arguments);
      if (null == newElement) {
        return newElement;
      }
      /** @type {number} */
      var i = 2;
      for (; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
      return validatePropTypes(newElement), newElement;
    },
    createFactory : function(name) {
      var func = ReactElementValidator.createElement.bind(null, name);
      return func.type = name, func;
    },
    cloneElement : function(vnode, props, children) {
      var newElement = ReactElement.cloneElement.apply(this, arguments);
      /** @type {number} */
      var i = 2;
      for (; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      return validatePropTypes(newElement), newElement;
    }
  };
  module.exports = ReactElementValidator;
}, function(module, canCreateDiscussions, saveNotifs) {
  var inspectCallback = saveNotifs(8);
  var storeMixin = inspectCallback({
    prop : null,
    context : null,
    childContext : null
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, n) {
  var storeMixin = {};
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} element
   * @return {?}
   */
  function getComponentClassForElement(element) {
    if ("function" == typeof element.type) {
      return element.type;
    }
    var key = element.type;
    var info = _uievts[key];
    return null == info && (_uievts[key] = info = autoGenerateWrapperClass(key)), info;
  }
  /**
   * @param {!Object} element
   * @return {?}
   */
  function createInternalComponent(element) {
    return invariant(genericComponentClass), new genericComponentClass(element.type, element.props);
  }
  /**
   * @param {!Object} text
   * @return {?}
   */
  function createInstanceForText(text) {
    return new textComponentClass(text);
  }
  /**
   * @param {?} component
   * @return {?}
   */
  function isTextComponent(component) {
    return component instanceof textComponentClass;
  }
  var assign = require(17);
  var invariant = require(9);
  /** @type {null} */
  var autoGenerateWrapperClass = null;
  /** @type {null} */
  var genericComponentClass = null;
  var _uievts = {};
  /** @type {null} */
  var textComponentClass = null;
  var ReactNativeComponentInjection = {
    injectGenericComponentClass : function(componentClass) {
      /** @type {!Object} */
      genericComponentClass = componentClass;
    },
    injectTextComponentClass : function(componentClass) {
      /** @type {!Object} */
      textComponentClass = componentClass;
    },
    injectComponentClasses : function(componentClasses) {
      assign(_uievts, componentClasses);
    },
    injectAutoWrapper : function(wrapperFactory) {
      /** @type {!Function} */
      autoGenerateWrapperClass = wrapperFactory;
    }
  };
  var ReactNativeComponent = {
    getComponentClassForElement : getComponentClassForElement,
    createInternalComponent : createInternalComponent,
    createInstanceForText : createInstanceForText,
    isTextComponent : isTextComponent,
    injection : ReactNativeComponentInjection
  };
  module.exports = ReactNativeComponent;
}, function(module, canCreateDiscussions, __webpack_require__) {
  var invariant = __webpack_require__(9);
  var Mixin = {
    reinitializeTransaction : function() {
      this.transactionWrappers = this.getTransactionWrappers();
      if (this.wrapperInitData) {
        /** @type {number} */
        this.wrapperInitData.length = 0;
      } else {
        /** @type {!Array} */
        this.wrapperInitData = [];
      }
      /** @type {boolean} */
      this._isInTransaction = false;
    },
    _isInTransaction : false,
    getTransactionWrappers : null,
    isInTransaction : function() {
      return !!this._isInTransaction;
    },
    perform : function(method, context, msg, data, c, d, e, f) {
      invariant(!this.isInTransaction());
      var u;
      var ret;
      try {
        /** @type {boolean} */
        this._isInTransaction = true;
        /** @type {boolean} */
        u = true;
        this.initializeAll(0);
        ret = method.call(context, msg, data, c, d, e, f);
        /** @type {boolean} */
        u = false;
      } finally {
        try {
          if (u) {
            try {
              this.closeAll(0);
            } catch (f) {
            }
          } else {
            this.closeAll(0);
          }
        } finally {
          /** @type {boolean} */
          this._isInTransaction = false;
        }
      }
      return ret;
    },
    initializeAll : function(startIndex) {
      var tempLayers = this.transactionWrappers;
      /** @type {number} */
      var i = startIndex;
      for (; i < tempLayers.length; i++) {
        var layer = tempLayers[i];
        try {
          this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
          this.wrapperInitData[i] = layer.initialize ? layer.initialize.call(this) : null;
        } finally {
          if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
            try {
              this.initializeAll(i + 1);
            } catch (o) {
            }
          }
        }
      }
    },
    closeAll : function(index) {
      invariant(this.isInTransaction());
      var transactionWrappers = this.transactionWrappers;
      /** @type {number} */
      var i = index;
      for (; i < transactionWrappers.length; i++) {
        var o;
        var wrapper = transactionWrappers[i];
        var initData = this.wrapperInitData[i];
        try {
          /** @type {boolean} */
          o = true;
          if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
            wrapper.close.call(this, initData);
          }
          /** @type {boolean} */
          o = false;
        } finally {
          if (o) {
            try {
              this.closeAll(i + 1);
            } catch (l) {
            }
          }
        }
      }
      /** @type {number} */
      this.wrapperInitData.length = 0;
    }
  };
  var Transaction = {
    Mixin : Mixin,
    OBSERVED_ERROR : {}
  };
  module.exports = Transaction;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {(Object|string)} proto
   * @param {string} name
   * @return {undefined}
   */
  function validateMethodOverride(proto, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
    if (ReactClassMixin.hasOwnProperty(name)) {
      invariant(specPolicy === SpecPolicy.OVERRIDE_BASE);
    }
    if (proto.hasOwnProperty(name)) {
      invariant(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED);
    }
  }
  /**
   * @param {!Object} Constructor
   * @param {!Object} spec
   * @return {undefined}
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (spec) {
      invariant("function" != typeof spec);
      invariant(!React.isValidElement(spec));
      var proto = Constructor.prototype;
      if (spec.hasOwnProperty(x)) {
        RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
      }
      var name;
      for (name in spec) {
        if (spec.hasOwnProperty(name) && name !== x) {
          var property = spec[name];
          if (validateMethodOverride(proto, name), RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
            RESERVED_SPEC_KEYS[name](Constructor, property);
          } else {
            /** @type {boolean} */
            var err = ReactClassInterface.hasOwnProperty(name);
            var opts = proto.hasOwnProperty(name);
            var markedDontBind = property && property.__reactDontBind;
            /** @type {boolean} */
            var cb = "function" == typeof property;
            /** @type {boolean} */
            var d = cb && !err && !opts && !markedDontBind;
            if (d) {
              if (!proto.__reactAutoBindMap) {
                proto.__reactAutoBindMap = {};
              }
              proto.__reactAutoBindMap[name] = property;
              proto[name] = property;
            } else {
              if (opts) {
                var specPolicy = ReactClassInterface[name];
                invariant(err && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY));
                if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
                  proto[name] = createMergedResultFunction(proto[name], property);
                } else {
                  if (specPolicy === SpecPolicy.DEFINE_MANY) {
                    proto[name] = createChainedFunction(proto[name], property);
                  }
                }
              } else {
                proto[name] = property;
              }
            }
          }
        }
      }
    }
  }
  /**
   * @param {!Object} Constructor
   * @param {!Object} statics
   * @return {undefined}
   */
  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (statics) {
      var name;
      for (name in statics) {
        var value = statics[name];
        if (statics.hasOwnProperty(name)) {
          /** @type {boolean} */
          var isReserved = name in RESERVED_SPEC_KEYS;
          invariant(!isReserved);
          /** @type {boolean} */
          var isInherited = name in Constructor;
          invariant(!isInherited);
          Constructor[name] = value;
        }
      }
    }
  }
  /**
   * @param {string} item
   * @param {string} key
   * @return {?}
   */
  function log(item, key) {
    invariant(item && key && "object" == typeof item && "object" == typeof key);
    var i;
    for (i in key) {
      if (key.hasOwnProperty(i)) {
        invariant(void 0 === item[i]);
        item[i] = key[i];
      }
    }
    return item;
  }
  /**
   * @param {!Function} one
   * @param {!Object} two
   * @return {?}
   */
  function createMergedResultFunction(one, two) {
    return function() {
      var m = one.apply(this, arguments);
      var base = two.apply(this, arguments);
      if (null == m) {
        return base;
      }
      if (null == base) {
        return m;
      }
      var e = {};
      return log(e, m), log(e, base), e;
    };
  }
  /**
   * @param {!Function} two
   * @param {!Function} func
   * @return {?}
   */
  function createChainedFunction(two, func) {
    return function() {
      two.apply(this, arguments);
      func.apply(this, arguments);
    };
  }
  /**
   * @param {!Object} component
   * @param {!Function} method
   * @return {?}
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    return boundMethod;
  }
  /**
   * @param {!Object} component
   * @return {undefined}
   */
  function bindAutoBindMethods(component) {
    var autoBindKey;
    for (autoBindKey in component.__reactAutoBindMap) {
      if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
        var method = component.__reactAutoBindMap[autoBindKey];
        component[autoBindKey] = bindAutoBindMethod(component, ReactErrorUtils.guard(method, component.constructor.displayName + "." + autoBindKey));
      }
    }
  }
  var Constructor = require(24);
  var React = (require(19), require(13));
  var ReactErrorUtils = require(40);
  var h = require(27);
  var ReactLifeCycle = require(26);
  var ReactUpdateQueue = (require(35), require(36), require(25));
  var _assign = require(17);
  var invariant = require(9);
  var keyMirror = require(8);
  var keyOf = require(41);
  var x = (require(14), keyOf({
    mixins : null
  }));
  var SpecPolicy = keyMirror({
    DEFINE_ONCE : null,
    DEFINE_MANY : null,
    OVERRIDE_BASE : null,
    DEFINE_MANY_MERGED : null
  });
  /** @type {!Array} */
  var injectedMixins = [];
  var ReactClassInterface = {
    mixins : SpecPolicy.DEFINE_MANY,
    statics : SpecPolicy.DEFINE_MANY,
    propTypes : SpecPolicy.DEFINE_MANY,
    contextTypes : SpecPolicy.DEFINE_MANY,
    childContextTypes : SpecPolicy.DEFINE_MANY,
    getDefaultProps : SpecPolicy.DEFINE_MANY_MERGED,
    getInitialState : SpecPolicy.DEFINE_MANY_MERGED,
    getChildContext : SpecPolicy.DEFINE_MANY_MERGED,
    render : SpecPolicy.DEFINE_ONCE,
    componentWillMount : SpecPolicy.DEFINE_MANY,
    componentDidMount : SpecPolicy.DEFINE_MANY,
    componentWillReceiveProps : SpecPolicy.DEFINE_MANY,
    shouldComponentUpdate : SpecPolicy.DEFINE_ONCE,
    componentWillUpdate : SpecPolicy.DEFINE_MANY,
    componentDidUpdate : SpecPolicy.DEFINE_MANY,
    componentWillUnmount : SpecPolicy.DEFINE_MANY,
    updateComponent : SpecPolicy.OVERRIDE_BASE
  };
  var RESERVED_SPEC_KEYS = {
    displayName : function(type, name) {
      /** @type {string} */
      type.displayName = name;
    },
    mixins : function(Constructor, mixins) {
      if (mixins) {
        /** @type {number} */
        var i = 0;
        for (; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes : function(Constructor, childContextTypes) {
      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
    },
    contextTypes : function(Constructor, contextTypes) {
      Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
    },
    getDefaultProps : function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
      } else {
        /** @type {(Object|boolean)} */
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes : function(Constructor, propTypes) {
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics : function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    }
  };
  var ReactClassMixin = {
    replaceState : function(completeState, callback) {
      ReactUpdateQueue.enqueueReplaceState(this, completeState);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    },
    isMounted : function() {
      var internalInstance = h.get(this);
      return internalInstance && internalInstance !== ReactLifeCycle.currentlyMountingInstance;
    },
    setProps : function(partialProps, callback) {
      ReactUpdateQueue.enqueueSetProps(this, partialProps);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    },
    replaceProps : function(newProps, callback) {
      ReactUpdateQueue.enqueueReplaceProps(this, newProps);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    }
  };
  /**
   * @return {undefined}
   */
  var ReactClassComponent = function() {
  };
  _assign(ReactClassComponent.prototype, Constructor.prototype, ReactClassMixin);
  var ReactClass = {
    createClass : function(spec) {
      /**
       * @param {!Object} context
       * @param {?} type
       * @return {undefined}
       */
      var Constructor = function(context, type) {
        if (this.__reactAutoBindMap) {
          bindAutoBindMethods(this);
        }
        /** @type {!Object} */
        this.props = context;
        this.context = type;
        /** @type {null} */
        this.state = null;
        var value = this.getInitialState ? this.getInitialState() : null;
        invariant("object" == typeof value && !Array.isArray(value));
        this.state = value;
      };
      Constructor.prototype = new ReactClassComponent;
      /** @type {function(!Object, ?): undefined} */
      Constructor.prototype.constructor = Constructor;
      injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
      mixSpecIntoComponent(Constructor, spec);
      if (Constructor.getDefaultProps) {
        Constructor.defaultProps = Constructor.getDefaultProps();
      }
      invariant(Constructor.prototype.render);
      var methodName;
      for (methodName in ReactClassInterface) {
        if (!Constructor.prototype[methodName]) {
          /** @type {null} */
          Constructor.prototype[methodName] = null;
        }
      }
      return Constructor.type = Constructor, Constructor;
    },
    injection : {
      injectMixin : function(mixin) {
        injectedMixins.push(mixin);
      }
    }
  };
  module.exports = ReactClass;
}, function(module, canCreateDiscussions, n) {
  var storeMixin = {
    guard : function(callback, type) {
      return callback;
    }
  };
  module.exports = storeMixin;
}, function(pkg, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  var index = function(obj) {
    var i;
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        return i;
      }
    }
    return null;
  };
  /** @type {function(!Object): ?} */
  pkg.exports = index;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} tag
   * @return {?}
   */
  function createDOMFactory(tag) {
    return ReactElement.createFactory(tag);
  }
  var ReactElement = require(13);
  var mapObject = (require(34), require(43));
  var ReactDOM = mapObject({
    a : "a",
    abbr : "abbr",
    address : "address",
    area : "area",
    article : "article",
    aside : "aside",
    audio : "audio",
    b : "b",
    base : "base",
    bdi : "bdi",
    bdo : "bdo",
    big : "big",
    blockquote : "blockquote",
    body : "body",
    br : "br",
    button : "button",
    canvas : "canvas",
    caption : "caption",
    cite : "cite",
    code : "code",
    col : "col",
    colgroup : "colgroup",
    data : "data",
    datalist : "datalist",
    dd : "dd",
    del : "del",
    details : "details",
    dfn : "dfn",
    dialog : "dialog",
    div : "div",
    dl : "dl",
    dt : "dt",
    em : "em",
    embed : "embed",
    fieldset : "fieldset",
    figcaption : "figcaption",
    figure : "figure",
    footer : "footer",
    form : "form",
    h1 : "h1",
    h2 : "h2",
    h3 : "h3",
    h4 : "h4",
    h5 : "h5",
    h6 : "h6",
    head : "head",
    header : "header",
    hr : "hr",
    html : "html",
    i : "i",
    iframe : "iframe",
    img : "img",
    input : "input",
    ins : "ins",
    kbd : "kbd",
    keygen : "keygen",
    label : "label",
    legend : "legend",
    li : "li",
    link : "link",
    main : "main",
    map : "map",
    mark : "mark",
    menu : "menu",
    menuitem : "menuitem",
    meta : "meta",
    meter : "meter",
    nav : "nav",
    noscript : "noscript",
    object : "object",
    ol : "ol",
    optgroup : "optgroup",
    option : "option",
    output : "output",
    p : "p",
    param : "param",
    picture : "picture",
    pre : "pre",
    progress : "progress",
    q : "q",
    rp : "rp",
    rt : "rt",
    ruby : "ruby",
    s : "s",
    samp : "samp",
    script : "script",
    section : "section",
    select : "select",
    small : "small",
    source : "source",
    span : "span",
    strong : "strong",
    style : "style",
    sub : "sub",
    summary : "summary",
    sup : "sup",
    table : "table",
    tbody : "tbody",
    td : "td",
    textarea : "textarea",
    tfoot : "tfoot",
    th : "th",
    thead : "thead",
    time : "time",
    title : "title",
    tr : "tr",
    track : "track",
    u : "u",
    ul : "ul",
    "var" : "var",
    video : "video",
    wbr : "wbr",
    circle : "circle",
    clipPath : "clipPath",
    defs : "defs",
    ellipse : "ellipse",
    g : "g",
    line : "line",
    linearGradient : "linearGradient",
    mask : "mask",
    path : "path",
    pattern : "pattern",
    polygon : "polygon",
    polyline : "polyline",
    radialGradient : "radialGradient",
    rect : "rect",
    stop : "stop",
    svg : "svg",
    text : "text",
    tspan : "tspan"
  }, createDOMFactory);
  module.exports = ReactDOM;
}, function(pkg, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @param {!Object} fn
   * @param {?} val
   * @return {?}
   */
  function from(obj, fn, val) {
    if (!obj) {
      return null;
    }
    var res = {};
    var key;
    for (key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        res[key] = fn.call(val, obj[key], key, obj);
      }
    }
    return res;
  }
  /** @type {function(this:Object, *): boolean} */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /** @type {function(!Object, !Object, ?): ?} */
  pkg.exports = from;
}, function(module, canCreateDiscussions, require) {
  var DOMPropertyOperations = require(45);
  var ReactComponentBrowserEnvironment = require(49);
  var ReactComponentEnvironment = require(89);
  var assign = require(17);
  var escapeTextContentForBrowser = require(48);
  /**
   * @param {!Object} obj
   * @return {undefined}
   */
  var Service = function(obj) {
  };
  assign(Service.prototype, {
    construct : function(text) {
      /** @type {!Object} */
      this._currentElement = text;
      /** @type {string} */
      this._stringText = "" + text;
      /** @type {null} */
      this._rootNodeID = null;
      /** @type {number} */
      this._mountIndex = 0;
    },
    mountComponent : function(rootID, transaction, context) {
      /** @type {string} */
      this._rootNodeID = rootID;
      var escapedText = escapeTextContentForBrowser(this._stringText);
      return transaction.renderToStaticMarkup ? escapedText : "<span " + DOMPropertyOperations.createMarkupForID(rootID) + ">" + escapedText + "</span>";
    },
    receiveComponent : function(nextElement, context) {
      if (nextElement !== this._currentElement) {
        /** @type {!Object} */
        this._currentElement = nextElement;
        /** @type {string} */
        var nextStringText = "" + nextElement;
        if (nextStringText !== this._stringText) {
          /** @type {string} */
          this._stringText = nextStringText;
          ReactComponentEnvironment.BackendIDOperations.updateTextContentByID(this._rootNodeID, nextStringText);
        }
      }
    },
    unmountComponent : function() {
      ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
    }
  });
  /** @type {function(!Object): undefined} */
  module.exports = Service;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} name
   * @param {number} value
   * @return {?}
   */
  function shouldIgnoreValue(name, value) {
    return null == value || DOMProperty.hasBooleanValue[name] && !value || DOMProperty.hasNumericValue[name] && isNaN(value) || DOMProperty.hasPositiveNumericValue[name] && 1 > value || DOMProperty.hasOverloadedBooleanValue[name] && value === false;
  }
  var DOMProperty = require(46);
  var quoteAttributeValueForBrowser = require(47);
  var storeMixin = (require(14), {
    createMarkupForID : function(id) {
      return DOMProperty.ID_ATTRIBUTE_NAME + "=" + quoteAttributeValueForBrowser(id);
    },
    createMarkupForProperty : function(name, value) {
      if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
        if (shouldIgnoreValue(name, value)) {
          return "";
        }
        var attributeName = DOMProperty.getAttributeName[name];
        return DOMProperty.hasBooleanValue[name] || DOMProperty.hasOverloadedBooleanValue[name] && value === true ? attributeName : attributeName + "=" + quoteAttributeValueForBrowser(value);
      }
      return DOMProperty.isCustomAttribute(name) ? null == value ? "" : name + "=" + quoteAttributeValueForBrowser(value) : null;
    },
    setValueForProperty : function(node, name, value) {
      if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
        var mutationMethod = DOMProperty.getMutationMethod[name];
        if (mutationMethod) {
          mutationMethod(node, value);
        } else {
          if (shouldIgnoreValue(name, value)) {
            this.deleteValueForProperty(node, name);
          } else {
            if (DOMProperty.mustUseAttribute[name]) {
              node.setAttribute(DOMProperty.getAttributeName[name], "" + value);
            } else {
              var field = DOMProperty.getPropertyName[name];
              if (!(DOMProperty.hasSideEffects[name] && "" + node[field] == "" + value)) {
                node[field] = value;
              }
            }
          }
        }
      } else {
        if (DOMProperty.isCustomAttribute(name)) {
          if (null == value) {
            node.removeAttribute(name);
          } else {
            node.setAttribute(name, "" + value);
          }
        }
      }
    },
    deleteValueForProperty : function(node, name) {
      if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
        var mutationMethod = DOMProperty.getMutationMethod[name];
        if (mutationMethod) {
          mutationMethod(node, void 0);
        } else {
          if (DOMProperty.mustUseAttribute[name]) {
            node.removeAttribute(DOMProperty.getAttributeName[name]);
          } else {
            var propName = DOMProperty.getPropertyName[name];
            var value = DOMProperty.getDefaultValueForProperty(node.nodeName, propName);
            if (!(DOMProperty.hasSideEffects[name] && "" + node[propName] === value)) {
              node[propName] = value;
            }
          }
        }
      } else {
        if (DOMProperty.isCustomAttribute(name)) {
          node.removeAttribute(name);
        }
      }
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, __webpack_require__) {
  /**
   * @param {number} value
   * @param {number} bitmask
   * @return {?}
   */
  function checkMask(value, bitmask) {
    return (value & bitmask) === bitmask;
  }
  var invariant = __webpack_require__(9);
  var DOMPropertyInjection = {
    MUST_USE_ATTRIBUTE : 1,
    MUST_USE_PROPERTY : 2,
    HAS_SIDE_EFFECTS : 4,
    HAS_BOOLEAN_VALUE : 8,
    HAS_NUMERIC_VALUE : 16,
    HAS_POSITIVE_NUMERIC_VALUE : 48,
    HAS_OVERLOADED_BOOLEAN_VALUE : 64,
    injectDOMPropertyConfig : function(domPropertyConfig) {
      var Properties = domPropertyConfig.Properties || {};
      var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
      var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
      var dict = domPropertyConfig.DOMMutationMethods || {};
      if (domPropertyConfig.isCustomAttribute) {
        DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
      }
      var propName;
      for (propName in Properties) {
        invariant(!DOMProperty.isStandardName.hasOwnProperty(propName));
        /** @type {boolean} */
        DOMProperty.isStandardName[propName] = true;
        /** @type {string} */
        var lowerCased = propName.toLowerCase();
        if (DOMProperty.getPossibleStandardName[lowerCased] = propName, DOMAttributeNames.hasOwnProperty(propName)) {
          var attributeName = DOMAttributeNames[propName];
          /** @type {string} */
          DOMProperty.getPossibleStandardName[attributeName] = propName;
          DOMProperty.getAttributeName[propName] = attributeName;
        } else {
          /** @type {string} */
          DOMProperty.getAttributeName[propName] = lowerCased;
        }
        DOMProperty.getPropertyName[propName] = DOMPropertyNames.hasOwnProperty(propName) ? DOMPropertyNames[propName] : propName;
        if (dict.hasOwnProperty(propName)) {
          DOMProperty.getMutationMethod[propName] = dict[propName];
        } else {
          /** @type {null} */
          DOMProperty.getMutationMethod[propName] = null;
        }
        var propConfig = Properties[propName];
        DOMProperty.mustUseAttribute[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_ATTRIBUTE);
        DOMProperty.mustUseProperty[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_PROPERTY);
        DOMProperty.hasSideEffects[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_SIDE_EFFECTS);
        DOMProperty.hasBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_BOOLEAN_VALUE);
        DOMProperty.hasNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_NUMERIC_VALUE);
        DOMProperty.hasPositiveNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE);
        DOMProperty.hasOverloadedBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE);
        invariant(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName]);
        invariant(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName]);
        invariant(!!DOMProperty.hasBooleanValue[propName] + !!DOMProperty.hasNumericValue[propName] + !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1);
      }
    }
  };
  var nodes = {};
  var DOMProperty = {
    ID_ATTRIBUTE_NAME : "data-reactid",
    isStandardName : {},
    getPossibleStandardName : {},
    getAttributeName : {},
    getPropertyName : {},
    getMutationMethod : {},
    mustUseAttribute : {},
    mustUseProperty : {},
    hasSideEffects : {},
    hasBooleanValue : {},
    hasNumericValue : {},
    hasPositiveNumericValue : {},
    hasOverloadedBooleanValue : {},
    _isCustomAttributeFunctions : [],
    isCustomAttribute : function(attributeName) {
      /** @type {number} */
      var i = 0;
      for (; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
        var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
        if (isCustomAttributeFn(attributeName)) {
          return true;
        }
      }
      return false;
    },
    getDefaultValueForProperty : function(nodeName, prop) {
      var element;
      var node = nodes[nodeName];
      return node || (nodes[nodeName] = node = {}), prop in node || (element = document.createElement(nodeName), node[prop] = element[prop]), node[prop];
    },
    injection : DOMPropertyInjection
  };
  module.exports = DOMProperty;
}, function(module, canCreateDiscussions, _$$mdAnimate_) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function sightglass(obj) {
    return '"' + current_object_parser(obj) + '"';
  }
  var current_object_parser = _$$mdAnimate_(48);
  /** @type {function(!Object): ?} */
  module.exports = sightglass;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {?} hash
   * @return {?}
   */
  function headingsTemplate(hash) {
    return deletedHashes[hash];
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function mask(obj) {
    return ("" + obj).replace(REGEX_ESCAPE_EXPR, headingsTemplate);
  }
  var deletedHashes = {
    "&" : "&amp;",
    ">" : "&gt;",
    "<" : "&lt;",
    '"' : "&quot;",
    "'" : "&#x27;"
  };
  /** @type {!RegExp} */
  var REGEX_ESCAPE_EXPR = /[&><"']/g;
  /** @type {function(!Object): ?} */
  module.exports = mask;
}, function(module, canCreateDiscussions, require) {
  var ReactDOMIDOperations = require(50);
  var ReactMount = require(69);
  var ReactComponentBrowserEnvironment = {
    processChildrenUpdates : ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
    replaceNodeWithMarkupByID : ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,
    unmountIDFromEnvironment : function(rootNodeID) {
      ReactMount.purgeID(rootNodeID);
    }
  };
  module.exports = ReactComponentBrowserEnvironment;
}, function(module, canCreateDiscussions, require) {
  var CSSPropertyOperations = require(51);
  var DOMChildrenOperations = require(60);
  var DOMPropertyOperations = require(45);
  var ReactMount = require(69);
  var ReactPerf = require(30);
  var invariant = require(9);
  var setInnerHTML = require(68);
  var INVALID_PROPERTY_ERRORS = {
    dangerouslySetInnerHTML : "`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.",
    style : "`style` must be set using `updateStylesByID()`."
  };
  var ReactDOMIDOperations = {
    updatePropertyByID : function(id, name, value) {
      var node = ReactMount.getNode(id);
      invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name));
      if (null != value) {
        DOMPropertyOperations.setValueForProperty(node, name, value);
      } else {
        DOMPropertyOperations.deleteValueForProperty(node, name);
      }
    },
    deletePropertyByID : function(id, name, value) {
      var node = ReactMount.getNode(id);
      invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name));
      DOMPropertyOperations.deleteValueForProperty(node, name, value);
    },
    updateStylesByID : function(id, styles) {
      var node = ReactMount.getNode(id);
      CSSPropertyOperations.setValueForStyles(node, styles);
    },
    updateInnerHTMLByID : function(id, html) {
      var container = ReactMount.getNode(id);
      setInnerHTML(container, html);
    },
    updateTextContentByID : function(id, content) {
      var node = ReactMount.getNode(id);
      DOMChildrenOperations.updateTextContent(node, content);
    },
    dangerouslyReplaceNodeWithMarkupByID : function(id, markup) {
      var node = ReactMount.getNode(id);
      DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
    },
    dangerouslyProcessChildrenUpdates : function(updates, markup) {
      /** @type {number} */
      var i = 0;
      for (; i < updates.length; i++) {
        updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
      }
      DOMChildrenOperations.processUpdates(updates, markup);
    }
  };
  ReactPerf.measureMethods(ReactDOMIDOperations, "ReactDOMIDOperations", {
    updatePropertyByID : "updatePropertyByID",
    deletePropertyByID : "deletePropertyByID",
    updateStylesByID : "updateStylesByID",
    updateInnerHTMLByID : "updateInnerHTMLByID",
    updateTextContentByID : "updateTextContentByID",
    dangerouslyReplaceNodeWithMarkupByID : "dangerouslyReplaceNodeWithMarkupByID",
    dangerouslyProcessChildrenUpdates : "dangerouslyProcessChildrenUpdates"
  });
  module.exports = ReactDOMIDOperations;
}, function(module, canCreateDiscussions, require) {
  var CSSProperty = require(54);
  var ExecutionEnvironment = require(55);
  var dangerousStyleValue = (require(56), require(58));
  var assertInstanceOf = require(52);
  var whenDOMReady = require(59);
  var warnValidStyle = (require(14), whenDOMReady(function(MediaPlayerImpl) {
    return assertInstanceOf(MediaPlayerImpl);
  }));
  /** @type {string} */
  var styleFloatAccessor = "cssFloat";
  if (ExecutionEnvironment.canUseDOM && void 0 === document.documentElement.style.cssFloat) {
    /** @type {string} */
    styleFloatAccessor = "styleFloat";
  }
  var CSSPropertyOperations = {
    createMarkupForStyles : function(styles) {
      /** @type {string} */
      var pix_color = "";
      var styleName;
      for (styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
          var styleValue = styles[styleName];
          if (null != styleValue) {
            /** @type {string} */
            pix_color = pix_color + (warnValidStyle(styleName) + ":");
            /** @type {string} */
            pix_color = pix_color + (dangerousStyleValue(styleName, styleValue) + ";");
          }
        }
      }
      return pix_color || null;
    },
    setValueForStyles : function(node, styles) {
      var style = node.style;
      var styleName;
      for (styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
          var styleValue = dangerousStyleValue(styleName, styles[styleName]);
          if ("float" === styleName && (styleName = styleFloatAccessor), styleValue) {
            style[styleName] = styleValue;
          } else {
            var value = CSSProperty.shorthandPropertyExpansions[styleName];
            if (value) {
              var name;
              for (name in value) {
                /** @type {string} */
                style[name] = "";
              }
            } else {
              /** @type {string} */
              style[styleName] = "";
            }
          }
        }
      }
    }
  };
  module.exports = CSSPropertyOperations;
}, function(module, canCreateDiscussions, saveNotifs) {
  /**
   * @param {!Object} str
   * @return {?}
   */
  function hyphenateStyleName(str) {
    return hyphenate(str).replace(inputRegExp, "-ms-");
  }
  var hyphenate = saveNotifs(53);
  /** @type {!RegExp} */
  var inputRegExp = /^ms-/;
  /** @type {function(!Object): ?} */
  module.exports = hyphenateStyleName;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} str
   * @return {?}
   */
  function hyphenate(str) {
    return str.replace(STRING_DECAMELIZE_REGEXP, "-$1").toLowerCase();
  }
  /** @type {!RegExp} */
  var STRING_DECAMELIZE_REGEXP = /([A-Z])/g;
  /** @type {function(!Object): ?} */
  module.exports = hyphenate;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {?} t
   * @param {string} event
   * @return {?}
   */
  function handle(t, event) {
    return t + event.charAt(0).toUpperCase() + event.substring(1);
  }
  var defaults = {
    boxFlex : true,
    boxFlexGroup : true,
    columnCount : true,
    flex : true,
    flexGrow : true,
    flexPositive : true,
    flexShrink : true,
    flexNegative : true,
    fontWeight : true,
    lineClamp : true,
    lineHeight : true,
    opacity : true,
    order : true,
    orphans : true,
    widows : true,
    zIndex : true,
    zoom : true,
    fillOpacity : true,
    strokeDashoffset : true,
    strokeOpacity : true,
    strokeWidth : true
  };
  /** @type {!Array} */
  var prefixes = ["Webkit", "ms", "Moz", "O"];
  Object.keys(defaults).forEach(function(prop) {
    prefixes.forEach(function(e) {
      defaults[handle(e, prop)] = defaults[prop];
    });
  });
  var shorthandStyles = {
    background : {
      backgroundImage : true,
      backgroundPosition : true,
      backgroundRepeat : true,
      backgroundColor : true
    },
    border : {
      borderWidth : true,
      borderStyle : true,
      borderColor : true
    },
    borderBottom : {
      borderBottomWidth : true,
      borderBottomStyle : true,
      borderBottomColor : true
    },
    borderLeft : {
      borderLeftWidth : true,
      borderLeftStyle : true,
      borderLeftColor : true
    },
    borderRight : {
      borderRightWidth : true,
      borderRightStyle : true,
      borderRightColor : true
    },
    borderTop : {
      borderTopWidth : true,
      borderTopStyle : true,
      borderTopColor : true
    },
    font : {
      fontStyle : true,
      fontVariant : true,
      fontWeight : true,
      fontSize : true,
      lineHeight : true,
      fontFamily : true
    }
  };
  var storeMixin = {
    isUnitlessNumber : defaults,
    shorthandPropertyExpansions : shorthandStyles
  };
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, n) {
  /** @type {boolean} */
  var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement);
  var ExecutionEnvironment = {
    canUseDOM : canUseDOM,
    canUseWorkers : "undefined" != typeof Worker,
    canUseEventListeners : canUseDOM && !(!window.addEventListener && !window.attachEvent),
    canUseViewport : canUseDOM && !!window.screen,
    isInWorker : !canUseDOM
  };
  module.exports = ExecutionEnvironment;
}, function(exports, canCreateDiscussions, require) {
  /**
   * @param {!Object} name
   * @return {?}
   */
  function camelCase(name) {
    return camelize(name.replace(refRE, "ms-"));
  }
  var camelize = require(57);
  /** @type {!RegExp} */
  var refRE = /^-ms-/;
  /** @type {function(!Object): ?} */
  exports.exports = camelCase;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function uuid(obj) {
    return obj.replace(tokensRegExp, function(canCreateDiscussions, shortMonthName) {
      return shortMonthName.toUpperCase();
    });
  }
  /** @type {!RegExp} */
  var tokensRegExp = /-(.)/g;
  /** @type {function(!Object): ?} */
  module.exports = uuid;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} key
   * @param {string} val
   * @return {?}
   */
  function render(key, val) {
    /** @type {boolean} */
    var n = null == val || "boolean" == typeof val || "" === val;
    if (n) {
      return "";
    }
    /** @type {boolean} */
    var auto = isNaN(val);
    return auto || 0 === val || documentProperties.hasOwnProperty(key) && documentProperties[key] ? "" + val : ("string" == typeof val && (val = val.trim()), val + "px");
  }
  var CSSProperty = require(54);
  var documentProperties = CSSProperty.isUnitlessNumber;
  /** @type {function(!Object, string): ?} */
  module.exports = render;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} str
   * @return {?}
   */
  function self(str) {
    var newObj = {};
    return function(i) {
      return newObj.hasOwnProperty(i) || (newObj[i] = str.call(this, i)), newObj[i];
    };
  }
  /** @type {function(!Object): ?} */
  module.exports = self;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Node} parent
   * @param {?} index
   * @param {?} child
   * @return {undefined}
   */
  function insertChildAt(parent, index, child) {
    parent.insertBefore(index, parent.childNodes[child] || null);
  }
  var Danger = require(61);
  var ReactMultiChildUpdateTypes = require(66);
  var setTextContent = require(67);
  var invariant = require(9);
  var DOMChildrenOperations = {
    dangerouslyReplaceNodeWithMarkup : Danger.dangerouslyReplaceNodeWithMarkup,
    updateTextContent : setTextContent,
    processUpdates : function(updates, markupList) {
      var update;
      /** @type {null} */
      var initialChildren = null;
      /** @type {null} */
      var updatedChildren = null;
      /** @type {number} */
      var iUpdate = 0;
      for (; iUpdate < updates.length; iUpdate++) {
        if (update = updates[iUpdate], update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING || update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
          var updatedIndex = update.fromIndex;
          var updatedChild = update.parentNode.childNodes[updatedIndex];
          var parentID = update.parentID;
          invariant(updatedChild);
          initialChildren = initialChildren || {};
          initialChildren[parentID] = initialChildren[parentID] || [];
          initialChildren[parentID][updatedIndex] = updatedChild;
          /** @type {!Array} */
          updatedChildren = updatedChildren || [];
          updatedChildren.push(updatedChild);
        }
      }
      var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
      if (updatedChildren) {
        /** @type {number} */
        var j = 0;
        for (; j < updatedChildren.length; j++) {
          updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
        }
      }
      /** @type {number} */
      var i = 0;
      for (; i < updates.length; i++) {
        switch(update = updates[i], update.type) {
          case ReactMultiChildUpdateTypes.INSERT_MARKUP:
            insertChildAt(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
            break;
          case ReactMultiChildUpdateTypes.MOVE_EXISTING:
            insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
            break;
          case ReactMultiChildUpdateTypes.TEXT_CONTENT:
            setTextContent(update.parentNode, update.textContent);
            break;
          case ReactMultiChildUpdateTypes.REMOVE_NODE:
        }
      }
    }
  };
  module.exports = DOMChildrenOperations;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} markup
   * @return {?}
   */
  function getNodeName(markup) {
    return markup.substring(1, markup.indexOf(" "));
  }
  var ExecutionEnvironment = require(55);
  var createNodesFromMarkup = require(62);
  var emptyFunction = require(15);
  var getMarkupWrap = require(65);
  var invariant = require(9);
  /** @type {!RegExp} */
  var dir = /^(<[^ \/>]+)/;
  /** @type {string} */
  var name = "data-danger-index";
  var Danger = {
    dangerouslyRenderMarkup : function(markupList) {
      invariant(ExecutionEnvironment.canUseDOM);
      var nodeName;
      var nodes = {};
      /** @type {number} */
      var i = 0;
      for (; i < markupList.length; i++) {
        invariant(markupList[i]);
        nodeName = getNodeName(markupList[i]);
        nodeName = getMarkupWrap(nodeName) ? nodeName : "*";
        nodes[nodeName] = nodes[nodeName] || [];
        nodes[nodeName][i] = markupList[i];
      }
      /** @type {!Array} */
      var resultList = [];
      /** @type {number} */
      var resultListAssignmentCount = 0;
      for (nodeName in nodes) {
        if (nodes.hasOwnProperty(nodeName)) {
          var i;
          var tmp = nodes[nodeName];
          for (i in tmp) {
            if (tmp.hasOwnProperty(i)) {
              var type = tmp[i];
              tmp[i] = type.replace(dir, "$1 " + name + '="' + i + '" ');
            }
          }
          var renderNodes = createNodesFromMarkup(tmp.join(""), emptyFunction);
          /** @type {number} */
          var j = 0;
          for (; j < renderNodes.length; ++j) {
            var renderNode = renderNodes[j];
            if (renderNode.hasAttribute && renderNode.hasAttribute(name)) {
              /** @type {number} */
              i = +renderNode.getAttribute(name);
              renderNode.removeAttribute(name);
              invariant(!resultList.hasOwnProperty(i));
              resultList[i] = renderNode;
              /** @type {number} */
              resultListAssignmentCount = resultListAssignmentCount + 1;
            }
          }
        }
      }
      return invariant(resultListAssignmentCount === resultList.length), invariant(resultList.length === markupList.length), resultList;
    },
    dangerouslyReplaceNodeWithMarkup : function(oldChild, markup) {
      invariant(ExecutionEnvironment.canUseDOM);
      invariant(markup);
      invariant("html" !== oldChild.tagName.toLowerCase());
      var start_elm = createNodesFromMarkup(markup, emptyFunction)[0];
      oldChild.parentNode.replaceChild(start_elm, oldChild);
    }
  };
  module.exports = Danger;
}, function(u, canCreateDiscussions, require) {
  /**
   * @param {!Object} tag
   * @return {?}
   */
  function w(tag) {
    var nameTmpArr = tag.match(spanOpenRegExp);
    return nameTmpArr && nameTmpArr[1].toLowerCase();
  }
  /**
   * @param {!Object} key
   * @param {!Object} value
   * @return {?}
   */
  function get(key, value) {
    /** @type {(Element|null)} */
    var container = p;
    h(!!p);
    var d = w(key);
    var val = d && isFunction(d);
    if (val) {
      container.innerHTML = val[1] + key + val[2];
      var gravitar = val[0];
      for (; gravitar--;) {
        /** @type {(Node|null)} */
        container = container.lastChild;
      }
    } else {
      /** @type {!Object} */
      container.innerHTML = key;
    }
    var result = container.getElementsByTagName("script");
    if (result.length) {
      h(value);
      _(result).forEach(value);
    }
    var ret = _(container.childNodes);
    for (; container.lastChild;) {
      container.removeChild(container.lastChild);
    }
    return ret;
  }
  var ExecutionEnvironment = require(55);
  var _ = require(63);
  var isFunction = require(65);
  var h = require(9);
  /** @type {(Element|null)} */
  var p = ExecutionEnvironment.canUseDOM ? document.createElement("div") : null;
  /** @type {!RegExp} */
  var spanOpenRegExp = /^\s*<(\w+)/;
  /** @type {function(!Object, !Object): ?} */
  u.exports = get;
}, function(u, canCreateDiscussions, __webpack_require__) {
  /**
   * @param {?} obj
   * @return {?}
   */
  function f(obj) {
    return !!obj && ("object" == typeof obj || "function" == typeof obj) && "length" in obj && !("setInterval" in obj) && "number" != typeof obj.nodeType && (Array.isArray(obj) || "callee" in obj || "item" in obj);
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function get(obj) {
    return f(obj) ? Array.isArray(obj) ? obj.slice() : toPromise(obj) : [obj];
  }
  var toPromise = __webpack_require__(64);
  /** @type {function(!Object): ?} */
  u.exports = get;
}, function(task, canCreateDiscussions, saveNotifs) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function r(obj) {
    var length = obj.length;
    if (d3$round(!Array.isArray(obj) && ("object" == typeof obj || "function" == typeof obj)), d3$round("number" == typeof length), d3$round(0 === length || length - 1 in obj), obj.hasOwnProperty) {
      try {
        return Array.prototype.slice.call(obj);
      } catch (n) {
      }
    }
    /** @type {!Array} */
    var key = Array(length);
    /** @type {number} */
    var i = 0;
    for (; length > i; i++) {
      key[i] = obj[i];
    }
    return key;
  }
  var d3$round = saveNotifs(9);
  /** @type {function(!Object): ?} */
  task.exports = r;
}, function(mixin, canCreateDiscussions, require) {
  /**
   * @param {!Object} str
   * @return {?}
   */
  function m(str) {
    return now(!!legendHolder), markupWrap.hasOwnProperty(str) || (str = "*"), shouldWrap.hasOwnProperty(str) || ("*" === str ? legendHolder.innerHTML = "<link />" : legendHolder.innerHTML = "<" + str + "></" + str + ">", shouldWrap[str] = !legendHolder.firstChild), shouldWrap[str] ? markupWrap[str] : null;
  }
  var ExecutionEnvironment = require(55);
  var now = require(9);
  /** @type {(Element|null)} */
  var legendHolder = ExecutionEnvironment.canUseDOM ? document.createElement("div") : null;
  var shouldWrap = {
    circle : true,
    clipPath : true,
    defs : true,
    ellipse : true,
    g : true,
    line : true,
    linearGradient : true,
    path : true,
    polygon : true,
    polyline : true,
    radialGradient : true,
    rect : true,
    stop : true,
    text : true
  };
  /** @type {!Array} */
  var option = [1, '<select multiple="true">', "</select>"];
  /** @type {!Array} */
  var table = [1, "<table>", "</table>"];
  /** @type {!Array} */
  var tableRow = [3, "<table><tbody><tr>", "</tr></tbody></table>"];
  /** @type {!Array} */
  var svgWrap = [1, "<svg>", "</svg>"];
  var markupWrap = {
    "*" : [1, "?<div>", "</div>"],
    area : [1, "<map>", "</map>"],
    col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    legend : [1, "<fieldset>", "</fieldset>"],
    param : [1, "<object>", "</object>"],
    tr : [2, "<table><tbody>", "</tbody></table>"],
    optgroup : option,
    option : option,
    caption : table,
    colgroup : table,
    tbody : table,
    tfoot : table,
    thead : table,
    td : tableRow,
    th : tableRow,
    circle : svgWrap,
    clipPath : svgWrap,
    defs : svgWrap,
    ellipse : svgWrap,
    g : svgWrap,
    line : svgWrap,
    linearGradient : svgWrap,
    path : svgWrap,
    polygon : svgWrap,
    polyline : svgWrap,
    radialGradient : svgWrap,
    rect : svgWrap,
    stop : svgWrap,
    text : svgWrap
  };
  /** @type {function(!Object): ?} */
  mixin.exports = m;
}, function(mixin, canCreateDiscussions, $parse) {
  var mainCheck = $parse(8);
  var m = mainCheck({
    INSERT_MARKUP : null,
    MOVE_EXISTING : null,
    REMOVE_NODE : null,
    TEXT_CONTENT : null
  });
  mixin.exports = m;
}, function(record, canCreateDiscussions, n) {
  var end = n(55);
  var a = n(48);
  var p = n(68);
  /**
   * @param {!Object} obj
   * @param {string} type
   * @return {undefined}
   */
  var next = function(obj, type) {
    /** @type {string} */
    obj.textContent = type;
  };
  if (end.canUseDOM) {
    if (!("textContent" in document.documentElement)) {
      /**
       * @param {!Object} obj
       * @param {string} fn
       * @return {undefined}
       */
      next = function(obj, fn) {
        p(obj, a(fn));
      };
    }
  }
  /** @type {function(!Object, string): undefined} */
  record.exports = next;
}, function(module, canCreateDiscussions, require) {
  var ExecutionEnvironment = require(55);
  /** @type {!RegExp} */
  var trueRE = /^[ \r\n\t\f]/;
  /** @type {!RegExp} */
  var contribRegex = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
  /**
   * @param {!Object} str
   * @param {string} value
   * @return {undefined}
   */
  var setInnerHTML = function(str, value) {
    /** @type {string} */
    str.innerHTML = value;
  };
  if ("undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction && (setInnerHTML = function(str, value) {
    MSApp.execUnsafeLocalFunction(function() {
      /** @type {string} */
      str.innerHTML = value;
    });
  }), ExecutionEnvironment.canUseDOM) {
    /** @type {!Element} */
    var newFile = document.createElement("div");
    /** @type {string} */
    newFile.innerHTML = " ";
    if ("" === newFile.innerHTML) {
      /**
       * @param {!Object} element
       * @param {string} value
       * @return {undefined}
       */
      setInnerHTML = function(element, value) {
        if (element.parentNode && element.parentNode.replaceChild(element, element), trueRE.test(value) || "<" === value[0] && contribRegex.test(value)) {
          /** @type {string} */
          element.innerHTML = "\ufeff" + value;
          var child = element.firstChild;
          if (1 === child.data.length) {
            element.removeChild(child);
          } else {
            child.deleteData(0, 1);
          }
        } else {
          /** @type {string} */
          element.innerHTML = value;
        }
      };
    }
  }
  /** @type {function(!Object, string): undefined} */
  module.exports = setInnerHTML;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} string1
   * @param {string} string2
   * @return {?}
   */
  function firstDifferenceIndex(string1, string2) {
    /** @type {number} */
    var indexOfRequirement = Math.min(string1.length, string2.length);
    /** @type {number} */
    var i = 0;
    for (; indexOfRequirement > i; i++) {
      if (string1.charAt(i) !== string2.charAt(i)) {
        return i;
      }
    }
    return string1.length === string2.length ? -1 : indexOfRequirement;
  }
  /**
   * @param {!Node} container
   * @return {?}
   */
  function getReactRootID(container) {
    var rootElement = getReactRootElementInContainer(container);
    return rootElement && ReactMount.getID(rootElement);
  }
  /**
   * @param {!Object} node
   * @return {?}
   */
  function getID(node) {
    var id = internalGetID(node);
    if (id) {
      if (nodeCache.hasOwnProperty(id)) {
        var cached = nodeCache[id];
        if (cached !== node) {
          invariant(!isValid(cached, id));
          /** @type {!Object} */
          nodeCache[id] = node;
        }
      } else {
        /** @type {!Object} */
        nodeCache[id] = node;
      }
    }
    return id;
  }
  /**
   * @param {!Object} node
   * @return {?}
   */
  function internalGetID(node) {
    return node && node.getAttribute && node.getAttribute(name) || "";
  }
  /**
   * @param {!Object} node
   * @param {?} id
   * @return {undefined}
   */
  function setID(node, id) {
    var oldID = internalGetID(node);
    if (oldID !== id) {
      delete nodeCache[oldID];
    }
    node.setAttribute(name, id);
    /** @type {!Object} */
    nodeCache[id] = node;
  }
  /**
   * @param {?} id
   * @return {?}
   */
  function getNode(id) {
    return nodeCache.hasOwnProperty(id) && isValid(nodeCache[id], id) || (nodeCache[id] = ReactMount.findReactNodeByID(id)), nodeCache[id];
  }
  /**
   * @param {boolean} node
   * @return {?}
   */
  function getNodeFromInstance(node) {
    var id = E.get(node)._rootNodeID;
    return ReactEmptyComponentRegistry.isNullComponentID(id) ? null : (nodeCache.hasOwnProperty(id) && isValid(nodeCache[id], id) || (nodeCache[id] = ReactMount.findReactNodeByID(id)), nodeCache[id]);
  }
  /**
   * @param {!Object} node
   * @param {string} id
   * @return {?}
   */
  function isValid(node, id) {
    if (node) {
      invariant(internalGetID(node) === id);
      var value = ReactMount.findReactContainerForID(id);
      if (value && $(value, node)) {
        return true;
      }
    }
    return false;
  }
  /**
   * @param {?} id
   * @return {undefined}
   */
  function purgeID(id) {
    delete nodeCache[id];
  }
  /**
   * @param {string} ancestorID
   * @return {?}
   */
  function findDeepestCachedAncestorImpl(ancestorID) {
    var ancestor = nodeCache[ancestorID];
    return ancestor && isValid(ancestor, ancestorID) ? void(deepestNodeSoFar = ancestor) : false;
  }
  /**
   * @param {!Object} targetID
   * @return {?}
   */
  function findDeepestCachedAncestor(targetID) {
    /** @type {null} */
    deepestNodeSoFar = null;
    ReactInstanceHandles.traverseAncestors(targetID, findDeepestCachedAncestorImpl);
    /** @type {null} */
    var foundNode = deepestNodeSoFar;
    return deepestNodeSoFar = null, foundNode;
  }
  /**
   * @param {undefined} componentInstance
   * @param {string} rootID
   * @param {!Node} container
   * @param {undefined} transaction
   * @param {?} shouldReuseMarkup
   * @return {undefined}
   */
  function mountComponentIntoNode(componentInstance, rootID, container, transaction, shouldReuseMarkup) {
    var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, emptyObject);
    /** @type {boolean} */
    componentInstance._isTopLevel = true;
    ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup);
  }
  /**
   * @param {!Object} a
   * @param {?} b
   * @param {!Node} c
   * @param {?} e
   * @return {undefined}
   */
  function update(a, b, c, e) {
    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(mountComponentIntoNode, null, a, b, c, transaction, e);
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  }
  var DOMProperty = require(46);
  var ReactBrowserEventEmitter = require(70);
  var ReactElement = (require(19), require(13));
  var ReactEmptyComponentRegistry = (require(34), require(78));
  var ReactInstanceHandles = require(21);
  var E = require(27);
  var ReactMarkupChecksum = require(79);
  var ReactPerf = require(30);
  var ReactReconciler = require(31);
  var ReactUpdateQueue = require(25);
  var ReactUpdates = require(28);
  var emptyObject = require(18);
  var $ = require(81);
  var getReactRootElementInContainer = require(84);
  var instantiateReactComponent = require(85);
  var invariant = require(9);
  var setInnerHTML = require(68);
  var shouldUpdateReactComponent = require(88);
  var key = (require(14), ReactInstanceHandles.SEPARATOR);
  var name = DOMProperty.ID_ATTRIBUTE_NAME;
  var nodeCache = {};
  /** @type {number} */
  var ELEMENT_NODE_TYPE = 1;
  /** @type {number} */
  var DOC_NODE_TYPE = 9;
  var instancesByReactRootID = {};
  var containersByReactRootID = {};
  /** @type {!Array} */
  var template_nodes = [];
  /** @type {null} */
  var deepestNodeSoFar = null;
  var ReactMount = {
    _instancesByReactRootID : instancesByReactRootID,
    scrollMonitor : function(container, renderCallback) {
      renderCallback();
    },
    _updateRootComponent : function(prevComponent, nextElement, container, callback) {
      return ReactMount.scrollMonitor(container, function() {
        ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
        if (callback) {
          ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
        }
      }), prevComponent;
    },
    _registerComponent : function(nextComponent, container) {
      invariant(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE));
      ReactBrowserEventEmitter.ensureScrollValueMonitoring();
      var reactRootID = ReactMount.registerContainer(container);
      return instancesByReactRootID[reactRootID] = nextComponent, reactRootID;
    },
    _renderNewRootComponent : function(nextElement, container, context) {
      var component = instantiateReactComponent(nextElement, null);
      var element = ReactMount._registerComponent(component, container);
      return ReactUpdates.batchedUpdates(update, component, element, container, context), component;
    },
    render : function(nextElement, container, callback) {
      invariant(ReactElement.isValidElement(nextElement));
      var prevComponent = instancesByReactRootID[getReactRootID(container)];
      if (prevComponent) {
        var prevElement = prevComponent._currentElement;
        if (shouldUpdateReactComponent(prevElement, nextElement)) {
          return ReactMount._updateRootComponent(prevComponent, nextElement, container, callback).getPublicInstance();
        }
        ReactMount.unmountComponentAtNode(container);
      }
      var reactRootElement = getReactRootElementInContainer(container);
      var containerHasReactMarkup = reactRootElement && ReactMount.isRenderedByReact(reactRootElement);
      var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;
      var resolve = ReactMount._renderNewRootComponent(nextElement, container, shouldReuseMarkup).getPublicInstance();
      return callback && callback.call(resolve), resolve;
    },
    constructAndRenderComponent : function(constructor, props, container) {
      var element = ReactElement.createElement(constructor, props);
      return ReactMount.render(element, container);
    },
    constructAndRenderComponentByID : function(constructor, props, id) {
      /** @type {(Element|null)} */
      var domNode = document.getElementById(id);
      return invariant(domNode), ReactMount.constructAndRenderComponent(constructor, props, domNode);
    },
    registerContainer : function(container) {
      var id = getReactRootID(container);
      return id && (id = ReactInstanceHandles.getReactRootIDFromNodeID(id)), id || (id = ReactInstanceHandles.createReactRootID()), containersByReactRootID[id] = container, id;
    },
    unmountComponentAtNode : function(container) {
      invariant(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE));
      var reactRootID = getReactRootID(container);
      var component = instancesByReactRootID[reactRootID];
      return component ? (ReactMount.unmountComponentFromNode(component, container), delete instancesByReactRootID[reactRootID], delete containersByReactRootID[reactRootID], true) : false;
    },
    unmountComponentFromNode : function(instance, container) {
      ReactReconciler.unmountComponent(instance);
      if (container.nodeType === DOC_NODE_TYPE) {
        container = container.documentElement;
      }
      for (; container.lastChild;) {
        container.removeChild(container.lastChild);
      }
    },
    findReactContainerForID : function(id) {
      var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
      var container = containersByReactRootID[reactRootID];
      return container;
    },
    findReactNodeByID : function(id) {
      var reactRoot = ReactMount.findReactContainerForID(id);
      return ReactMount.findComponentRoot(reactRoot, id);
    },
    isRenderedByReact : function(node) {
      if (1 !== node.nodeType) {
        return false;
      }
      var ident = ReactMount.getID(node);
      return ident ? ident.charAt(0) === key : false;
    },
    getFirstReactDOM : function(node) {
      var current = node;
      for (; current && current.parentNode !== current;) {
        if (ReactMount.isRenderedByReact(current)) {
          return current;
        }
        current = current.parentNode;
      }
      return null;
    },
    findComponentRoot : function(ancestorNode, targetID) {
      /** @type {!Array} */
      var nodes = template_nodes;
      /** @type {number} */
      var i = 0;
      var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;
      nodes[0] = deepestAncestor.firstChild;
      /** @type {number} */
      nodes.length = 1;
      for (; i < nodes.length;) {
        var lastCaptionNode;
        var child = nodes[i++];
        for (; child;) {
          var childID = ReactMount.getID(child);
          if (childID) {
            if (targetID === childID) {
              lastCaptionNode = child;
            } else {
              if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
                /** @type {number} */
                nodes.length = i = 0;
                nodes.push(child.firstChild);
              }
            }
          } else {
            nodes.push(child.firstChild);
          }
          child = child.nextSibling;
        }
        if (lastCaptionNode) {
          return nodes.length = 0, lastCaptionNode;
        }
      }
      /** @type {number} */
      nodes.length = 0;
      invariant(false);
    },
    _mountImageIntoNode : function(markup, container, shouldReuseMarkup) {
      if (invariant(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)), shouldReuseMarkup) {
        var rootElement = getReactRootElementInContainer(container);
        if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
          return;
        }
        var i = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
        var rootMarkup = rootElement.outerHTML;
        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, i);
        var diffIndex = firstDifferenceIndex(markup, rootMarkup);
        " (client) " + markup.substring(diffIndex - 20, diffIndex + 20) + "\n (server) " + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
        invariant(container.nodeType !== DOC_NODE_TYPE);
      }
      invariant(container.nodeType !== DOC_NODE_TYPE);
      setInnerHTML(container, markup);
    },
    getReactRootID : getReactRootID,
    getID : getID,
    setID : setID,
    getNode : getNode,
    getNodeFromInstance : getNodeFromInstance,
    purgeID : purgeID
  };
  ReactPerf.measureMethods(ReactMount, "ReactMount", {
    _renderNewRootComponent : "_renderNewRootComponent",
    _mountImageIntoNode : "_mountImageIntoNode"
  });
  module.exports = ReactMount;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} mountAt
   * @return {?}
   */
  function getListeningForDocument(mountAt) {
    return Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey) || (mountAt[topListenersIDKey] = reactTopListenersCounter++, alreadyListeningTo[mountAt[topListenersIDKey]] = {}), alreadyListeningTo[mountAt[topListenersIDKey]];
  }
  var EventConstants = require(7);
  var EventPluginHub = require(71);
  var EventPluginRegistry = require(72);
  var ReactEventEmitterMixin = require(75);
  var ViewportMetrics = require(76);
  var assign = require(17);
  var isEventSupported = require(77);
  var alreadyListeningTo = {};
  /** @type {boolean} */
  var p = false;
  /** @type {number} */
  var reactTopListenersCounter = 0;
  var topEventMapping = {
    topBlur : "blur",
    topChange : "change",
    topClick : "click",
    topCompositionEnd : "compositionend",
    topCompositionStart : "compositionstart",
    topCompositionUpdate : "compositionupdate",
    topContextMenu : "contextmenu",
    topCopy : "copy",
    topCut : "cut",
    topDoubleClick : "dblclick",
    topDrag : "drag",
    topDragEnd : "dragend",
    topDragEnter : "dragenter",
    topDragExit : "dragexit",
    topDragLeave : "dragleave",
    topDragOver : "dragover",
    topDragStart : "dragstart",
    topDrop : "drop",
    topFocus : "focus",
    topInput : "input",
    topKeyDown : "keydown",
    topKeyPress : "keypress",
    topKeyUp : "keyup",
    topMouseDown : "mousedown",
    topMouseMove : "mousemove",
    topMouseOut : "mouseout",
    topMouseOver : "mouseover",
    topMouseUp : "mouseup",
    topPaste : "paste",
    topScroll : "scroll",
    topSelectionChange : "selectionchange",
    topTextInput : "textInput",
    topTouchCancel : "touchcancel",
    topTouchEnd : "touchend",
    topTouchMove : "touchmove",
    topTouchStart : "touchstart",
    topWheel : "wheel"
  };
  /** @type {string} */
  var topListenersIDKey = "_reactListenersID" + String(Math.random()).slice(2);
  var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
    ReactEventListener : null,
    injection : {
      injectReactEventListener : function(ReactEventListener) {
        ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
        /** @type {!Object} */
        ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
      }
    },
    setEnabled : function(enable) {
      if (ReactBrowserEventEmitter.ReactEventListener) {
        ReactBrowserEventEmitter.ReactEventListener.setEnabled(enable);
      }
    },
    isEnabled : function() {
      return !(!ReactBrowserEventEmitter.ReactEventListener || !ReactBrowserEventEmitter.ReactEventListener.isEnabled());
    },
    listenTo : function(registrationName, contentDocument) {
      var mountAt = contentDocument;
      var isListening = getListeningForDocument(mountAt);
      var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
      var topLevelTypes = EventConstants.topLevelTypes;
      /** @type {number} */
      var i = 0;
      var l = dependencies.length;
      for (; l > i; i++) {
        var dependency = dependencies[i];
        if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
          if (dependency === topLevelTypes.topWheel) {
            if (isEventSupported("wheel")) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, "wheel", mountAt);
            } else {
              if (isEventSupported("mousewheel")) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, "mousewheel", mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, "DOMMouseScroll", mountAt);
              }
            }
          } else {
            if (dependency === topLevelTypes.topScroll) {
              if (isEventSupported("scroll", true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, "scroll", mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, "scroll", ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
              }
            } else {
              if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {
                if (isEventSupported("focus", true)) {
                  ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, "focus", mountAt);
                  ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, "blur", mountAt);
                } else {
                  if (isEventSupported("focusin")) {
                    ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, "focusin", mountAt);
                    ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, "focusout", mountAt);
                  }
                }
                /** @type {boolean} */
                isListening[topLevelTypes.topBlur] = true;
                /** @type {boolean} */
                isListening[topLevelTypes.topFocus] = true;
              } else {
                if (topEventMapping.hasOwnProperty(dependency)) {
                  ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
                }
              }
            }
          }
          /** @type {boolean} */
          isListening[dependency] = true;
        }
      }
    },
    trapBubbledEvent : function(topLevelType, type, handle) {
      return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, type, handle);
    },
    trapCapturedEvent : function(topLevelType, handlerBaseName, handle) {
      return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
    },
    ensureScrollValueMonitoring : function() {
      if (!p) {
        var refresh = ViewportMetrics.refreshScrollValues;
        ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
        /** @type {boolean} */
        p = true;
      }
    },
    eventNameDispatchConfigs : EventPluginHub.eventNameDispatchConfigs,
    registrationNameModules : EventPluginHub.registrationNameModules,
    putListener : EventPluginHub.putListener,
    getListener : EventPluginHub.getListener,
    deleteListener : EventPluginHub.deleteListener,
    deleteAllListeners : EventPluginHub.deleteAllListeners
  });
  module.exports = ReactBrowserEventEmitter;
}, function(module, canCreateDiscussions, require) {
  var EventPluginRegistry = require(72);
  var EventPluginUtils = require(6);
  var accumulateInto = require(73);
  var forEachAccumulated = require(74);
  var invariant = require(9);
  var listenerBank = {};
  /** @type {null} */
  var eventQueue = null;
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  var executeDispatchesAndRelease = function(event) {
    if (event) {
      var executeDispatch = EventPluginUtils.executeDispatch;
      var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
      if (PluginModule && PluginModule.executeDispatch) {
        executeDispatch = PluginModule.executeDispatch;
      }
      EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);
      if (!event.isPersistent()) {
        event.constructor.release(event);
      }
    }
  };
  /** @type {null} */
  var InstanceHandle = null;
  var EventPluginHub = {
    injection : {
      injectMount : EventPluginUtils.injection.injectMount,
      injectInstanceHandle : function(InjectedInstanceHandle) {
        /** @type {!Object} */
        InstanceHandle = InjectedInstanceHandle;
      },
      getInstanceHandle : function() {
        return InstanceHandle;
      },
      injectEventPluginOrder : EventPluginRegistry.injectEventPluginOrder,
      injectEventPluginsByName : EventPluginRegistry.injectEventPluginsByName
    },
    eventNameDispatchConfigs : EventPluginRegistry.eventNameDispatchConfigs,
    registrationNameModules : EventPluginRegistry.registrationNameModules,
    putListener : function(id, registrationName, handler) {
      invariant(!handler || "function" == typeof handler);
      var handlersById = listenerBank[registrationName] || (listenerBank[registrationName] = {});
      handlersById[id] = handler;
    },
    getListener : function(id, registrationName) {
      var bankForRegistrationName = listenerBank[registrationName];
      return bankForRegistrationName && bankForRegistrationName[id];
    },
    deleteListener : function(id, registrationName) {
      var bankForRegistrationName = listenerBank[registrationName];
      if (bankForRegistrationName) {
        delete bankForRegistrationName[id];
      }
    },
    deleteAllListeners : function(id) {
      var registrationName;
      for (registrationName in listenerBank) {
        delete listenerBank[registrationName][id];
      }
    },
    extractEvents : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var events;
      var plugins = EventPluginRegistry.plugins;
      /** @type {number} */
      var i = 0;
      var length = plugins.length;
      for (; length > i; i++) {
        var possiblePlugin = plugins[i];
        if (possiblePlugin) {
          var extractedEvents = possiblePlugin.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent);
          if (extractedEvents) {
            events = accumulateInto(events, extractedEvents);
          }
        }
      }
      return events;
    },
    enqueueEvents : function(events) {
      if (events) {
        eventQueue = accumulateInto(eventQueue, events);
      }
    },
    processEventQueue : function() {
      var processingEventQueue = eventQueue;
      /** @type {null} */
      eventQueue = null;
      forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
      invariant(!eventQueue);
    },
    __purge : function() {
      listenerBank = {};
    },
    __getListenerBank : function() {
      return listenerBank;
    }
  };
  module.exports = EventPluginHub;
}, function(module, canCreateDiscussions, __webpack_require__) {
  /**
   * @return {undefined}
   */
  function recomputePluginOrdering() {
    if (EventPluginOrder) {
      var pluginName;
      for (pluginName in namesToPlugins) {
        var PluginModule = namesToPlugins[pluginName];
        var pluginIndex = EventPluginOrder.indexOf(pluginName);
        if (invariant(pluginIndex > -1), !EventPluginRegistry.plugins[pluginIndex]) {
          invariant(PluginModule.extractEvents);
          EventPluginRegistry.plugins[pluginIndex] = PluginModule;
          var publishedEvents = PluginModule.eventTypes;
          var eventName;
          for (eventName in publishedEvents) {
            invariant(publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName));
          }
        }
      }
    }
  }
  /**
   * @param {!Object} dispatchConfig
   * @param {!Object} PluginModule
   * @param {string} eventName
   * @return {?}
   */
  function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
    invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName));
    /** @type {!Object} */
    EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
    var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
    if (phasedRegistrationNames) {
      var phaseName;
      for (phaseName in phasedRegistrationNames) {
        if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
          var phasedRegistrationName = phasedRegistrationNames[phaseName];
          publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
        }
      }
      return true;
    }
    return dispatchConfig.registrationName ? (publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName), true) : false;
  }
  /**
   * @param {?} registrationName
   * @param {!Object} PluginModule
   * @param {string} eventName
   * @return {undefined}
   */
  function publishRegistrationName(registrationName, PluginModule, eventName) {
    invariant(!EventPluginRegistry.registrationNameModules[registrationName]);
    /** @type {!Object} */
    EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
    EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
  }
  var invariant = __webpack_require__(9);
  /** @type {null} */
  var EventPluginOrder = null;
  var namesToPlugins = {};
  var EventPluginRegistry = {
    plugins : [],
    eventNameDispatchConfigs : {},
    registrationNameModules : {},
    registrationNameDependencies : {},
    injectEventPluginOrder : function(InjectedEventPluginOrder) {
      invariant(!EventPluginOrder);
      /** @type {!Array<?>} */
      EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
      recomputePluginOrdering();
    },
    injectEventPluginsByName : function(injectedNamesToPlugins) {
      /** @type {boolean} */
      var t = false;
      var pluginName;
      for (pluginName in injectedNamesToPlugins) {
        if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
          var PluginModule = injectedNamesToPlugins[pluginName];
          if (!(namesToPlugins.hasOwnProperty(pluginName) && namesToPlugins[pluginName] === PluginModule)) {
            invariant(!namesToPlugins[pluginName]);
            namesToPlugins[pluginName] = PluginModule;
            /** @type {boolean} */
            t = true;
          }
        }
      }
      if (t) {
        recomputePluginOrdering();
      }
    },
    getPluginModuleForEvent : function(event) {
      var dispatchConfig = event.dispatchConfig;
      if (dispatchConfig.registrationName) {
        return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
      }
      var phase;
      for (phase in dispatchConfig.phasedRegistrationNames) {
        if (dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
          var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
          if (PluginModule) {
            return PluginModule;
          }
        }
      }
      return null;
    },
    _resetEventPlugins : function() {
      /** @type {null} */
      EventPluginOrder = null;
      var pluginName;
      for (pluginName in namesToPlugins) {
        if (namesToPlugins.hasOwnProperty(pluginName)) {
          delete namesToPlugins[pluginName];
        }
      }
      /** @type {number} */
      EventPluginRegistry.plugins.length = 0;
      var d = EventPluginRegistry.eventNameDispatchConfigs;
      var n;
      for (n in d) {
        if (d.hasOwnProperty(n)) {
          delete d[n];
        }
      }
      var entityMapData = EventPluginRegistry.registrationNameModules;
      var y;
      for (y in entityMapData) {
        if (entityMapData.hasOwnProperty(y)) {
          delete entityMapData[y];
        }
      }
    }
  };
  module.exports = EventPluginRegistry;
}, function(task, canCreateDiscussions, saveNotifs) {
  /**
   * @param {!Object} obj
   * @param {!Object} key
   * @return {?}
   */
  function r(obj, key) {
    if (d3$round(null != key), null == obj) {
      return key;
    }
    /** @type {boolean} */
    var x = Array.isArray(obj);
    /** @type {boolean} */
    var y = Array.isArray(key);
    return x && y ? (obj.push.apply(obj, key), obj) : x ? (obj.push(key), obj) : y ? [obj].concat(key) : [obj, key];
  }
  var d3$round = saveNotifs(9);
  /** @type {function(!Object, !Object): ?} */
  task.exports = r;
}, function(pkg, canCreateDiscussions, n) {
  /**
   * @param {!Object} fn
   * @param {!Object} data
   * @param {string} event
   * @return {undefined}
   */
  var from = function(fn, data, event) {
    if (Array.isArray(fn)) {
      fn.forEach(data, event);
    } else {
      if (fn) {
        data.call(event, fn);
      }
    }
  };
  /** @type {function(!Object, !Object, string): undefined} */
  pkg.exports = from;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} event
   * @return {undefined}
   */
  function runEventInBatch(event) {
    EventPluginHub.enqueueEvents(event);
    EventPluginHub.processEventQueue();
  }
  var EventPluginHub = require(71);
  var storeMixin = {
    handleTopLevel : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent);
      runEventInBatch(events);
    }
  };
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, n) {
  var self = {
    currentScrollLeft : 0,
    currentScrollTop : 0,
    refreshScrollValues : function(scrollPosition) {
      self.currentScrollLeft = scrollPosition.x;
      self.currentScrollTop = scrollPosition.y;
    }
  };
  module.exports = self;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} name
   * @param {string} type
   * @return {boolean}
   */
  function isEventSupported(name, type) {
    if (!ExecutionEnvironment.canUseDOM || type && !("addEventListener" in document)) {
      return false;
    }
    /** @type {string} */
    var eventName = "on" + name;
    /** @type {boolean} */
    var isSupported = eventName in document;
    if (!isSupported) {
      /** @type {!Element} */
      var element = document.createElement("div");
      element.setAttribute(eventName, "return;");
      /** @type {boolean} */
      isSupported = "function" == typeof element[eventName];
    }
    return !isSupported && useHasFeature && "wheel" === name && (isSupported = document.implementation.hasFeature("Events.wheel", "3.0")), isSupported;
  }
  var useHasFeature;
  var ExecutionEnvironment = require(55);
  if (ExecutionEnvironment.canUseDOM) {
    /** @type {(boolean|null)} */
    useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== true;
  }
  /** @type {function(!Object, string): boolean} */
  module.exports = isEventSupported;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} id
   * @return {undefined}
   */
  function registerNullComponentID(id) {
    /** @type {boolean} */
    default_titles[id] = true;
  }
  /**
   * @param {?} id
   * @return {undefined}
   */
  function deregisterNullComponentID(id) {
    delete default_titles[id];
  }
  /**
   * @param {?} id
   * @return {?}
   */
  function isNullComponentID(id) {
    return !!default_titles[id];
  }
  var style;
  var React = require(13);
  var m = require(27);
  var createElement = require(9);
  var default_titles = {};
  var ReactEmptyComponentInjection = {
    injectEmptyComponent : function(tag) {
      style = React.createFactory(tag);
    }
  };
  /**
   * @return {undefined}
   */
  var Table = function() {
  };
  /**
   * @return {undefined}
   */
  Table.prototype.componentDidMount = function() {
    var internalInstance = m.get(this);
    if (internalInstance) {
      registerNullComponentID(internalInstance._rootNodeID);
    }
  };
  /**
   * @return {undefined}
   */
  Table.prototype.componentWillUnmount = function() {
    var internalInstance = m.get(this);
    if (internalInstance) {
      deregisterNullComponentID(internalInstance._rootNodeID);
    }
  };
  /**
   * @return {?}
   */
  Table.prototype.render = function() {
    return createElement(style), style();
  };
  var emptyElement = React.createElement(Table);
  var ReactEmptyComponent = {
    emptyElement : emptyElement,
    injection : ReactEmptyComponentInjection,
    isNullComponentID : isNullComponentID
  };
  module.exports = ReactEmptyComponent;
}, function(mixin, canCreateDiscussions, require) {
  var $ = require(80);
  var event = {
    CHECKSUM_ATTR_NAME : "data-react-checksum",
    addChecksumToMarkup : function(markup) {
      var $fixture = $(markup);
      return markup.replace(">", " " + event.CHECKSUM_ATTR_NAME + '="' + $fixture + '">');
    },
    canReuseMarkup : function(markup, element) {
      var existingChecksum = element.getAttribute(event.CHECKSUM_ATTR_NAME);
      existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
      var $fixture = $(markup);
      return $fixture === existingChecksum;
    }
  };
  mixin.exports = event;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} options
   * @return {?}
   */
  function ScrollNavBar(options) {
    /** @type {number} */
    var picture = 1;
    /** @type {number} */
    var cSelectedIndex = 0;
    /** @type {number} */
    var i = 0;
    for (; i < options.length; i++) {
      /** @type {number} */
      picture = (picture + options.charCodeAt(i)) % optLen;
      /** @type {number} */
      cSelectedIndex = (cSelectedIndex + picture) % optLen;
    }
    return picture | cSelectedIndex << 16;
  }
  /** @type {number} */
  var optLen = 65521;
  /** @type {function(!Object): ?} */
  module.exports = ScrollNavBar;
}, function(global, canCreateDiscussions, require) {
  /**
   * @param {!Object} name
   * @param {!Object} value
   * @return {?}
   */
  function contains(name, value) {
    return name && value ? name === value ? true : is(name) ? false : is(value) ? contains(name, value.parentNode) : name.contains ? name.contains(value) : name.compareDocumentPosition ? !!(16 & name.compareDocumentPosition(value)) : false : false;
  }
  var is = require(82);
  /** @type {function(!Object, !Object): ?} */
  global.exports = contains;
}, function(module, canCreateDiscussions, factory) {
  /**
   * @param {!Object} options
   * @return {?}
   */
  function ProjectionGraph(options) {
    return init(options) && 3 == options.nodeType;
  }
  var init = factory(83);
  /** @type {function(!Object): ?} */
  module.exports = ProjectionGraph;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function render(obj) {
    return !(!obj || !("function" == typeof Node ? obj instanceof Node : "object" == typeof obj && "number" == typeof obj.nodeType && "string" == typeof obj.nodeName));
  }
  /** @type {function(!Object): ?} */
  module.exports = render;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} o
   * @return {?}
   */
  function on(o) {
    return o ? o.nodeType === undefined ? o.documentElement : o.firstChild : null;
  }
  /** @type {number} */
  var undefined = 9;
  /** @type {function(!Object): ?} */
  module.exports = on;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Function} type
   * @return {?}
   */
  function isInternalComponentType(type) {
    return "function" == typeof type && "undefined" != typeof type.prototype && "function" == typeof type.prototype.mountComponent && "function" == typeof type.prototype.receiveComponent;
  }
  /**
   * @param {!Object} target
   * @param {string} value
   * @return {?}
   */
  function instantiateReactComponent(target, value) {
    var instance;
    if ((null === target || target === false) && (target = dom.emptyElement), "object" == typeof target) {
      /** @type {!Object} */
      var element = target;
      instance = value === element.type && "string" == typeof element.type ? ReactNativeComponent.createInternalComponent(element) : isInternalComponentType(element.type) ? new element.type(element) : new ReactCompositeComponentWrapper;
    } else {
      if ("string" == typeof target || "number" == typeof target) {
        instance = ReactNativeComponent.createInstanceForText(target);
      } else {
        warning(false);
      }
    }
    return instance.construct(target), instance._mountIndex = 0, instance._mountImage = null, instance;
  }
  var ReactDOMComponent = require(86);
  var dom = require(78);
  var ReactNativeComponent = require(37);
  var assign = require(17);
  var warning = require(9);
  /** @type {function(): undefined} */
  var ReactCompositeComponentWrapper = (require(14), function() {
  });
  assign(ReactCompositeComponentWrapper.prototype, ReactDOMComponent.Mixin, {
    _instantiateReactComponent : instantiateReactComponent
  });
  /** @type {function(!Object, string): ?} */
  module.exports = instantiateReactComponent;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} component
   * @return {?}
   */
  function getDeclarationErrorAddendum(component) {
    var draggingPanel = component._currentElement._owner || null;
    if (draggingPanel) {
      var n = draggingPanel.getName();
      if (n) {
        return " Check the render method of `" + n + "`.";
      }
    }
    return "";
  }
  var ReactComponentEnvironment = require(87);
  var ReactContext = require(16);
  var multiselect = require(19);
  var ReactElement = require(13);
  var h = (require(34), require(27));
  var ReactLifeCycle = require(26);
  var ReactNativeComponent = require(37);
  var ReactPerf = require(30);
  var ReactPropTypeLocations = require(35);
  var ReactReconciler = (require(36), require(31));
  var ReactUpdates = require(28);
  var assign = require(17);
  var emptyObject = require(18);
  var invariant = require(9);
  var shouldUpdateReactComponent = require(88);
  /** @type {number} */
  var nextMountID = (require(14), 1);
  var ReactCompositeComponentMixin = {
    construct : function(element) {
      /** @type {!Object} */
      this._currentElement = element;
      /** @type {null} */
      this._rootNodeID = null;
      /** @type {null} */
      this._instance = null;
      /** @type {null} */
      this._pendingElement = null;
      /** @type {null} */
      this._pendingStateQueue = null;
      /** @type {boolean} */
      this._pendingReplaceState = false;
      /** @type {boolean} */
      this._pendingForceUpdate = false;
      /** @type {null} */
      this._renderedComponent = null;
      /** @type {null} */
      this._context = null;
      /** @type {number} */
      this._mountOrder = 0;
      /** @type {boolean} */
      this._isTopLevel = false;
      /** @type {null} */
      this._pendingCallbacks = null;
    },
    mountComponent : function(rootID, transaction, context) {
      /** @type {!Object} */
      this._context = context;
      /** @type {number} */
      this._mountOrder = nextMountID++;
      /** @type {string} */
      this._rootNodeID = rootID;
      var publicProps = this._processProps(this._currentElement.props);
      var publicContext = this._processContext(this._currentElement._context);
      var Component = ReactNativeComponent.getComponentClassForElement(this._currentElement);
      var inst = new Component(publicProps, publicContext);
      inst.props = publicProps;
      inst.context = publicContext;
      inst.refs = emptyObject;
      this._instance = inst;
      h.set(inst, this);
      var options = inst.state;
      if (void 0 === options) {
        /** @type {null} */
        inst.state = options = null;
      }
      invariant("object" == typeof options && !Array.isArray(options));
      /** @type {null} */
      this._pendingStateQueue = null;
      /** @type {boolean} */
      this._pendingReplaceState = false;
      /** @type {boolean} */
      this._pendingForceUpdate = false;
      var childContext;
      var p;
      var previouslyMounting = ReactLifeCycle.currentlyMountingInstance;
      ReactLifeCycle.currentlyMountingInstance = this;
      try {
        if (inst.componentWillMount) {
          inst.componentWillMount();
          if (this._pendingStateQueue) {
            inst.state = this._processPendingState(inst.props, inst.context);
          }
        }
        childContext = this._getValidatedChildContext(context);
        p = this._renderValidatedComponent(childContext);
      } finally {
        ReactLifeCycle.currentlyMountingInstance = previouslyMounting;
      }
      this._renderedComponent = this._instantiateReactComponent(p, this._currentElement.type);
      var markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._mergeChildContext(context, childContext));
      return inst.componentDidMount && transaction.getReactMountReady().enqueue(inst.componentDidMount, inst), markup;
    },
    unmountComponent : function() {
      var inst = this._instance;
      if (inst.componentWillUnmount) {
        var previouslyUnmounting = ReactLifeCycle.currentlyUnmountingInstance;
        ReactLifeCycle.currentlyUnmountingInstance = this;
        try {
          inst.componentWillUnmount();
        } finally {
          ReactLifeCycle.currentlyUnmountingInstance = previouslyUnmounting;
        }
      }
      ReactReconciler.unmountComponent(this._renderedComponent);
      /** @type {null} */
      this._renderedComponent = null;
      /** @type {null} */
      this._pendingStateQueue = null;
      /** @type {boolean} */
      this._pendingReplaceState = false;
      /** @type {boolean} */
      this._pendingForceUpdate = false;
      /** @type {null} */
      this._pendingCallbacks = null;
      /** @type {null} */
      this._pendingElement = null;
      /** @type {null} */
      this._context = null;
      /** @type {null} */
      this._rootNodeID = null;
      h.remove(inst);
    },
    _setPropsInternal : function(partialProps, callback) {
      var element = this._pendingElement || this._currentElement;
      this._pendingElement = ReactElement.cloneAndReplaceProps(element, assign({}, element.props, partialProps));
      ReactUpdates.enqueueUpdate(this, callback);
    },
    _maskContext : function(context) {
      /** @type {null} */
      var maskedContext = null;
      if ("string" == typeof this._currentElement.type) {
        return emptyObject;
      }
      var contextTypes = this._currentElement.type.contextTypes;
      if (!contextTypes) {
        return emptyObject;
      }
      maskedContext = {};
      var contextName;
      for (contextName in contextTypes) {
        maskedContext[contextName] = context[contextName];
      }
      return maskedContext;
    },
    _processContext : function(context) {
      var maskedContext = this._maskContext(context);
      return maskedContext;
    },
    _getValidatedChildContext : function(currentContext) {
      var inst = this._instance;
      var childContext = inst.getChildContext && inst.getChildContext();
      if (childContext) {
        invariant("object" == typeof inst.constructor.childContextTypes);
        var name;
        for (name in childContext) {
          invariant(name in inst.constructor.childContextTypes);
        }
        return childContext;
      }
      return null;
    },
    _mergeChildContext : function(currentContext, childContext) {
      return childContext ? assign({}, currentContext, childContext) : currentContext;
    },
    _processProps : function(newProps) {
      return newProps;
    },
    _checkPropTypes : function(propTypes, props, location) {
      var componentName = this.getName();
      var propName;
      for (propName in propTypes) {
        if (propTypes.hasOwnProperty(propName)) {
          var error;
          try {
            invariant("function" == typeof propTypes[propName]);
            error = propTypes[propName](props, propName, componentName, location);
          } catch (a3) {
            error = a3;
          }
          if (error instanceof Error) {
            getDeclarationErrorAddendum(this);
            location === ReactPropTypeLocations.prop;
          }
        }
      }
    },
    receiveComponent : function(nextElement, transaction, nextContext) {
      var prevElement = this._currentElement;
      var prevContext = this._context;
      /** @type {null} */
      this._pendingElement = null;
      this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
    },
    performUpdateIfNecessary : function(transaction) {
      if (null != this._pendingElement) {
        ReactReconciler.receiveComponent(this, this._pendingElement || this._currentElement, transaction, this._context);
      }
      if (null !== this._pendingStateQueue || this._pendingForceUpdate) {
        this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
      }
    },
    _warnIfContextsDiffer : function(ownerBasedContext, parentBasedContext) {
      ownerBasedContext = this._maskContext(ownerBasedContext);
      parentBasedContext = this._maskContext(parentBasedContext);
      /** @type {!Array<string>} */
      var crossfilterable_layers = Object.keys(parentBasedContext).sort();
      /** @type {number} */
      var layer_i = (this.getName() || "ReactCompositeComponent", 0);
      for (; layer_i < crossfilterable_layers.length; layer_i++) {
        crossfilterable_layers[layer_i];
      }
    },
    updateComponent : function(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
      var inst = this._instance;
      var nextContext = inst.context;
      var nextProps = inst.props;
      if (prevParentElement !== nextParentElement) {
        nextContext = this._processContext(nextParentElement._context);
        nextProps = this._processProps(nextParentElement.props);
        if (inst.componentWillReceiveProps) {
          inst.componentWillReceiveProps(nextProps, nextContext);
        }
      }
      var nextState = this._processPendingState(nextProps, nextContext);
      var u = this._pendingForceUpdate || !inst.shouldComponentUpdate || inst.shouldComponentUpdate(nextProps, nextState, nextContext);
      if (u) {
        /** @type {boolean} */
        this._pendingForceUpdate = false;
        this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
      } else {
        /** @type {!Object} */
        this._currentElement = nextParentElement;
        /** @type {!Object} */
        this._context = nextUnmaskedContext;
        inst.props = nextProps;
        inst.state = nextState;
        inst.context = nextContext;
      }
    },
    _processPendingState : function(props, context) {
      var inst = this._instance;
      var queue = this._pendingStateQueue;
      var replace = this._pendingReplaceState;
      if (this._pendingReplaceState = false, this._pendingStateQueue = null, !queue) {
        return inst.state;
      }
      if (replace && 1 === queue.length) {
        return queue[0];
      }
      var nextState = assign({}, replace ? queue[0] : inst.state);
      /** @type {number} */
      var i = replace ? 1 : 0;
      for (; i < queue.length; i++) {
        var partial = queue[i];
        assign(nextState, "function" == typeof partial ? partial.call(inst, nextState, props, context) : partial);
      }
      return nextState;
    },
    _performComponentUpdate : function(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
      var inst = this._instance;
      var prevProps = inst.props;
      var prevState = inst.state;
      var prevContext = inst.context;
      if (inst.componentWillUpdate) {
        inst.componentWillUpdate(nextProps, nextState, nextContext);
      }
      /** @type {!Object} */
      this._currentElement = nextElement;
      /** @type {!Object} */
      this._context = unmaskedContext;
      /** @type {!Object} */
      inst.props = nextProps;
      /** @type {!Object} */
      inst.state = nextState;
      /** @type {!Object} */
      inst.context = nextContext;
      this._updateRenderedComponent(transaction, unmaskedContext);
      if (inst.componentDidUpdate) {
        transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
      }
    },
    _updateRenderedComponent : function(transaction, context) {
      var prevComponentInstance = this._renderedComponent;
      var prevRenderedElement = prevComponentInstance._currentElement;
      var childContext = this._getValidatedChildContext();
      var element = this._renderValidatedComponent(childContext);
      if (shouldUpdateReactComponent(prevRenderedElement, element)) {
        ReactReconciler.receiveComponent(prevComponentInstance, element, transaction, this._mergeChildContext(context, childContext));
      } else {
        var thisID = this._rootNodeID;
        var prevComponentID = prevComponentInstance._rootNodeID;
        ReactReconciler.unmountComponent(prevComponentInstance);
        this._renderedComponent = this._instantiateReactComponent(element, this._currentElement.type);
        var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, thisID, transaction, this._mergeChildContext(context, childContext));
        this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
      }
    },
    _replaceNodeWithMarkupByID : function(prevComponentID, nextMarkup) {
      ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
    },
    _renderValidatedComponentWithoutOwnerOrContext : function() {
      var inst = this._instance;
      var renderedComponent = inst.render();
      return renderedComponent;
    },
    _renderValidatedComponent : function(childContext) {
      var renderedComponent;
      var previousContext = ReactContext.current;
      ReactContext.current = this._mergeChildContext(this._currentElement._context, childContext);
      multiselect.current = this;
      try {
        renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
      } finally {
        ReactContext.current = previousContext;
        /** @type {null} */
        multiselect.current = null;
      }
      return invariant(null === renderedComponent || renderedComponent === false || ReactElement.isValidElement(renderedComponent)), renderedComponent;
    },
    attachRef : function(ref, component) {
      var inst = this.getPublicInstance();
      var widgetDescriptors = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
      widgetDescriptors[ref] = component.getPublicInstance();
    },
    detachRef : function(ref) {
      var refs = this.getPublicInstance().refs;
      delete refs[ref];
    },
    getName : function() {
      var type = this._currentElement.type;
      var constructor = this._instance && this._instance.constructor;
      return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
    },
    getPublicInstance : function() {
      return this._instance;
    },
    _instantiateReactComponent : null
  };
  ReactPerf.measureMethods(ReactCompositeComponentMixin, "ReactCompositeComponent", {
    mountComponent : "mountComponent",
    updateComponent : "updateComponent",
    _renderValidatedComponent : "_renderValidatedComponent"
  });
  var LinkedValueUtils = {
    Mixin : ReactCompositeComponentMixin
  };
  module.exports = LinkedValueUtils;
}, function(module, canCreateDiscussions, __webpack_require__) {
  var invariant = __webpack_require__(9);
  /** @type {boolean} */
  var isReserved = false;
  var ReactComponentEnvironment = {
    unmountIDFromEnvironment : null,
    replaceNodeWithMarkupByID : null,
    processChildrenUpdates : null,
    injection : {
      injectEnvironment : function(environment) {
        invariant(!isReserved);
        ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
        ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
        ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
        /** @type {boolean} */
        isReserved = true;
      }
    }
  };
  module.exports = ReactComponentEnvironment;
}, function(candidate, canCreateDiscussions, saveNotifs) {
  /**
   * @param {!Object} element
   * @param {!Object} value
   * @return {?}
   */
  function set(element, value) {
    if (null != element && null != value) {
      /** @type {string} */
      var argType = typeof element;
      /** @type {string} */
      var type = typeof value;
      if ("string" === argType || "number" === argType) {
        return "string" === type || "number" === type;
      }
      if ("object" === type && element.type === value.type && element.key === value.key) {
        /** @type {boolean} */
        var name = element._owner === value._owner;
        return name;
      }
    }
    return false;
  }
  saveNotifs(14);
  /** @type {function(!Object, !Object): ?} */
  candidate.exports = set;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} props
   * @return {undefined}
   */
  function assertValidProps(props) {
    if (props) {
      if (null != props.dangerouslySetInnerHTML) {
        invariant(null == props.children);
        invariant("object" == typeof props.dangerouslySetInnerHTML && "__html" in props.dangerouslySetInnerHTML);
      }
      invariant(null == props.style || "object" == typeof props.style);
    }
  }
  /**
   * @param {string} id
   * @param {string} registrationName
   * @param {!Object} listener
   * @param {string} transaction
   * @return {undefined}
   */
  function putListener(id, registrationName, listener, transaction) {
    var container = ReactMount.findReactContainerForID(id);
    if (container) {
      var doc = container.nodeType === ELEMENT_NODE_TYPE ? container.ownerDocument : container;
      listenTo(registrationName, doc);
    }
    transaction.getPutListenerQueue().enqueuePutListener(id, registrationName, listener);
  }
  /**
   * @param {!Object} tag
   * @return {undefined}
   */
  function validateDangerousTag(tag) {
    if (!hasOwnProperty.call(result, tag)) {
      invariant(catchClass.test(tag));
      /** @type {boolean} */
      result[tag] = true;
    }
  }
  /**
   * @param {!Object} val
   * @return {undefined}
   */
  function ReactDOMComponent(val) {
    validateDangerousTag(val);
    /** @type {!Object} */
    this._tag = val;
    /** @type {null} */
    this._renderedChildren = null;
    /** @type {null} */
    this._previousStyleCopy = null;
    /** @type {null} */
    this._rootNodeID = null;
  }
  var CSSPropertyOperations = require(51);
  var DOMProperty = require(46);
  var DOMPropertyOperations = require(45);
  var ReactBrowserEventEmitter = require(70);
  var ReactComponentBrowserEnvironment = require(49);
  var ReactMount = require(69);
  var ReactMultiChild = require(90);
  var ReactPerf = require(30);
  var assign = require(17);
  var escapeTextContentForBrowser = require(48);
  var invariant = require(9);
  var keyOf = (require(77), require(41));
  var enqueuePutListener = (require(14), ReactBrowserEventEmitter.deleteListener);
  var listenTo = ReactBrowserEventEmitter.listenTo;
  var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;
  var CONTENT_TYPES = {
    string : true,
    number : true
  };
  var STYLE = keyOf({
    style : null
  });
  /** @type {number} */
  var ELEMENT_NODE_TYPE = 1;
  /** @type {null} */
  var BackendIDOperations = null;
  var omittedCloseTags = {
    area : true,
    base : true,
    br : true,
    col : true,
    embed : true,
    hr : true,
    img : true,
    input : true,
    keygen : true,
    link : true,
    meta : true,
    param : true,
    source : true,
    track : true,
    wbr : true
  };
  /** @type {!RegExp} */
  var catchClass = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
  var result = {};
  /** @type {function(this:Object, *): boolean} */
  var hasOwnProperty = {}.hasOwnProperty;
  /** @type {string} */
  ReactDOMComponent.displayName = "ReactDOMComponent";
  ReactDOMComponent.Mixin = {
    construct : function(element) {
      /** @type {!Object} */
      this._currentElement = element;
    },
    mountComponent : function(rootID, transaction, context) {
      /** @type {string} */
      this._rootNodeID = rootID;
      assertValidProps(this._currentElement.props);
      /** @type {string} */
      var variable_encoded = omittedCloseTags[this._tag] ? "" : "</" + this._tag + ">";
      return this._createOpenTagMarkupAndPutListeners(transaction) + this._createContentMarkup(transaction, context) + variable_encoded;
    },
    _createOpenTagMarkupAndPutListeners : function(transaction) {
      var props = this._currentElement.props;
      /** @type {string} */
      var ret = "<" + this._tag;
      var propKey;
      for (propKey in props) {
        if (props.hasOwnProperty(propKey)) {
          var propValue = props[propKey];
          if (null != propValue) {
            if (registrationNameModules.hasOwnProperty(propKey)) {
              putListener(this._rootNodeID, propKey, propValue, transaction);
            } else {
              if (propKey === STYLE) {
                if (propValue) {
                  propValue = this._previousStyleCopy = assign({}, props.style);
                }
                propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
              }
              var markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
              if (markup) {
                /** @type {string} */
                ret = ret + (" " + markup);
              }
            }
          }
        }
      }
      if (transaction.renderToStaticMarkup) {
        return ret + ">";
      }
      var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
      return ret + " " + markupForID + ">";
    },
    _createContentMarkup : function(transaction, context) {
      /** @type {string} */
      var prefix = "";
      if ("listing" === this._tag || "pre" === this._tag || "textarea" === this._tag) {
        /** @type {string} */
        prefix = "\n";
      }
      var props = this._currentElement.props;
      var innerHTML = props.dangerouslySetInnerHTML;
      if (null != innerHTML) {
        if (null != innerHTML.__html) {
          return prefix + innerHTML.__html;
        }
      } else {
        var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
        var childrenToUse = null != contentToUse ? null : props.children;
        if (null != contentToUse) {
          return prefix + escapeTextContentForBrowser(contentToUse);
        }
        if (null != childrenToUse) {
          var mountImages = this.mountChildren(childrenToUse, transaction, context);
          return prefix + mountImages.join("");
        }
      }
      return prefix;
    },
    receiveComponent : function(nextElement, transaction, context) {
      var prevElement = this._currentElement;
      /** @type {!Object} */
      this._currentElement = nextElement;
      this.updateComponent(transaction, prevElement, nextElement, context);
    },
    updateComponent : function(transaction, prevElement, nextElement, context) {
      assertValidProps(this._currentElement.props);
      this._updateDOMProperties(prevElement.props, transaction);
      this._updateDOMChildren(prevElement.props, transaction, context);
    },
    _updateDOMProperties : function(lastProps, transaction) {
      var propKey;
      var styleName;
      var styleUpdates;
      var nextProps = this._currentElement.props;
      for (propKey in lastProps) {
        if (!nextProps.hasOwnProperty(propKey) && lastProps.hasOwnProperty(propKey)) {
          if (propKey === STYLE) {
            var lastStyle = this._previousStyleCopy;
            for (styleName in lastStyle) {
              if (lastStyle.hasOwnProperty(styleName)) {
                styleUpdates = styleUpdates || {};
                /** @type {string} */
                styleUpdates[styleName] = "";
              }
            }
            /** @type {null} */
            this._previousStyleCopy = null;
          } else {
            if (registrationNameModules.hasOwnProperty(propKey)) {
              enqueuePutListener(this._rootNodeID, propKey);
            } else {
              if (DOMProperty.isStandardName[propKey] || DOMProperty.isCustomAttribute(propKey)) {
                BackendIDOperations.deletePropertyByID(this._rootNodeID, propKey);
              }
            }
          }
        }
      }
      for (propKey in nextProps) {
        var nextProp = nextProps[propKey];
        var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps[propKey];
        if (nextProps.hasOwnProperty(propKey) && nextProp !== lastProp) {
          if (propKey === STYLE) {
            if (nextProp ? nextProp = this._previousStyleCopy = assign({}, nextProp) : this._previousStyleCopy = null, lastProp) {
              for (styleName in lastProp) {
                if (!(!lastProp.hasOwnProperty(styleName) || nextProp && nextProp.hasOwnProperty(styleName))) {
                  styleUpdates = styleUpdates || {};
                  /** @type {string} */
                  styleUpdates[styleName] = "";
                }
              }
              for (styleName in nextProp) {
                if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = nextProp[styleName];
                }
              }
            } else {
              styleUpdates = nextProp;
            }
          } else {
            if (registrationNameModules.hasOwnProperty(propKey)) {
              putListener(this._rootNodeID, propKey, nextProp, transaction);
            } else {
              if (DOMProperty.isStandardName[propKey] || DOMProperty.isCustomAttribute(propKey)) {
                BackendIDOperations.updatePropertyByID(this._rootNodeID, propKey, nextProp);
              }
            }
          }
        }
      }
      if (styleUpdates) {
        BackendIDOperations.updateStylesByID(this._rootNodeID, styleUpdates);
      }
    },
    _updateDOMChildren : function(lastProps, transaction, context) {
      var nextProps = this._currentElement.props;
      var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
      var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
      var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
      var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;
      var nav_target_parent = null != lastContent ? null : lastProps.children;
      var prevChildren = null != nextContent ? null : nextProps.children;
      /** @type {boolean} */
      var selfCompletionActive = null != lastContent || null != lastHtml;
      /** @type {boolean} */
      var alreadyMarked = null != nextContent || null != nextHtml;
      if (null != nav_target_parent && null == prevChildren) {
        this.updateChildren(null, transaction, context);
      } else {
        if (selfCompletionActive && !alreadyMarked) {
          this.updateTextContent("");
        }
      }
      if (null != nextContent) {
        if (lastContent !== nextContent) {
          this.updateTextContent("" + nextContent);
        }
      } else {
        if (null != nextHtml) {
          if (lastHtml !== nextHtml) {
            BackendIDOperations.updateInnerHTMLByID(this._rootNodeID, nextHtml);
          }
        } else {
          if (null != prevChildren) {
            this.updateChildren(prevChildren, transaction, context);
          }
        }
      }
    },
    unmountComponent : function() {
      this.unmountChildren();
      ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
      ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
      /** @type {null} */
      this._rootNodeID = null;
    }
  };
  ReactPerf.measureMethods(ReactDOMComponent, "ReactDOMComponent", {
    mountComponent : "mountComponent",
    updateComponent : "updateComponent"
  });
  assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
  ReactDOMComponent.injection = {
    injectIDOperations : function(IDOperations) {
      ReactDOMComponent.BackendIDOperations = BackendIDOperations = IDOperations;
    }
  };
  /** @type {function(!Object): undefined} */
  module.exports = ReactDOMComponent;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} parentID
   * @param {?} markup
   * @param {number} toIndex
   * @return {undefined}
   */
  function enqueueInsertMarkup(parentID, markup, toIndex) {
    updateQueue.push({
      parentID : parentID,
      parentNode : null,
      type : ReactMultiChildUpdateTypes.INSERT_MARKUP,
      markupIndex : markupQueue.push(markup) - 1,
      textContent : null,
      fromIndex : null,
      toIndex : toIndex
    });
  }
  /**
   * @param {string} parentID
   * @param {number} fromIndex
   * @param {number} toIndex
   * @return {undefined}
   */
  function enqueueMove(parentID, fromIndex, toIndex) {
    updateQueue.push({
      parentID : parentID,
      parentNode : null,
      type : ReactMultiChildUpdateTypes.MOVE_EXISTING,
      markupIndex : null,
      textContent : null,
      fromIndex : fromIndex,
      toIndex : toIndex
    });
  }
  /**
   * @param {string} parentID
   * @param {number} fromIndex
   * @return {undefined}
   */
  function enqueueRemove(parentID, fromIndex) {
    updateQueue.push({
      parentID : parentID,
      parentNode : null,
      type : ReactMultiChildUpdateTypes.REMOVE_NODE,
      markupIndex : null,
      textContent : null,
      fromIndex : fromIndex,
      toIndex : null
    });
  }
  /**
   * @param {string} parentID
   * @param {string} textContent
   * @return {undefined}
   */
  function enqueueTextContent(parentID, textContent) {
    updateQueue.push({
      parentID : parentID,
      parentNode : null,
      type : ReactMultiChildUpdateTypes.TEXT_CONTENT,
      markupIndex : null,
      textContent : textContent,
      fromIndex : null,
      toIndex : null
    });
  }
  /**
   * @return {undefined}
   */
  function processQueue() {
    if (updateQueue.length) {
      ReactComponentEnvironment.processChildrenUpdates(updateQueue, markupQueue);
      clearQueue();
    }
  }
  /**
   * @return {undefined}
   */
  function clearQueue() {
    /** @type {number} */
    updateQueue.length = 0;
    /** @type {number} */
    markupQueue.length = 0;
  }
  var ReactComponentEnvironment = require(87);
  var ReactMultiChildUpdateTypes = require(66);
  var ReactReconciler = require(31);
  var ReactChildReconciler = require(91);
  /** @type {number} */
  var d = 0;
  /** @type {!Array} */
  var updateQueue = [];
  /** @type {!Array} */
  var markupQueue = [];
  var LinkedValueUtils = {
    Mixin : {
      mountChildren : function(nestedChildren, transaction, context) {
        var children = ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
        this._renderedChildren = children;
        /** @type {!Array} */
        var mountImages = [];
        /** @type {number} */
        var index = 0;
        var name;
        for (name in children) {
          if (children.hasOwnProperty(name)) {
            var child = children[name];
            /** @type {string} */
            var rootID = this._rootNodeID + name;
            var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
            /** @type {number} */
            child._mountIndex = index;
            mountImages.push(mountImage);
            index++;
          }
        }
        return mountImages;
      },
      updateTextContent : function(text) {
        d++;
        /** @type {boolean} */
        var t = true;
        try {
          var prevChildren = this._renderedChildren;
          ReactChildReconciler.unmountChildren(prevChildren);
          var name;
          for (name in prevChildren) {
            if (prevChildren.hasOwnProperty(name)) {
              this._unmountChildByName(prevChildren[name], name);
            }
          }
          this.setTextContent(text);
          /** @type {boolean} */
          t = false;
        } finally {
          d--;
          if (!d) {
            if (t) {
              clearQueue();
            } else {
              processQueue();
            }
          }
        }
      },
      updateChildren : function(nextNestedChildren, transaction, context) {
        d++;
        /** @type {boolean} */
        var r = true;
        try {
          this._updateChildren(nextNestedChildren, transaction, context);
          /** @type {boolean} */
          r = false;
        } finally {
          d--;
          if (!d) {
            if (r) {
              clearQueue();
            } else {
              processQueue();
            }
          }
        }
      },
      _updateChildren : function(nextNestedChildren, transaction, context) {
        var prevChildren = this._renderedChildren;
        var nextChildren = ReactChildReconciler.updateChildren(prevChildren, nextNestedChildren, transaction, context);
        if (this._renderedChildren = nextChildren, nextChildren || prevChildren) {
          var name;
          /** @type {number} */
          var lastIndex = 0;
          /** @type {number} */
          var nextIndex = 0;
          for (name in nextChildren) {
            if (nextChildren.hasOwnProperty(name)) {
              var prevChild = prevChildren && prevChildren[name];
              var nextChild = nextChildren[name];
              if (prevChild === nextChild) {
                this.moveChild(prevChild, nextIndex, lastIndex);
                /** @type {number} */
                lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                /** @type {number} */
                prevChild._mountIndex = nextIndex;
              } else {
                if (prevChild) {
                  /** @type {number} */
                  lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                  this._unmountChildByName(prevChild, name);
                }
                this._mountChildByNameAtIndex(nextChild, name, nextIndex, transaction, context);
              }
              nextIndex++;
            }
          }
          for (name in prevChildren) {
            if (!(!prevChildren.hasOwnProperty(name) || nextChildren && nextChildren.hasOwnProperty(name))) {
              this._unmountChildByName(prevChildren[name], name);
            }
          }
        }
      },
      unmountChildren : function() {
        var renderedChildren = this._renderedChildren;
        ReactChildReconciler.unmountChildren(renderedChildren);
        /** @type {null} */
        this._renderedChildren = null;
      },
      moveChild : function(child, toIndex, lastIndex) {
        if (child._mountIndex < lastIndex) {
          enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
        }
      },
      createChild : function(child, mountImage) {
        enqueueInsertMarkup(this._rootNodeID, mountImage, child._mountIndex);
      },
      removeChild : function(child) {
        enqueueRemove(this._rootNodeID, child._mountIndex);
      },
      setTextContent : function(textContent) {
        enqueueTextContent(this._rootNodeID, textContent);
      },
      _mountChildByNameAtIndex : function(child, name, index, transaction, context) {
        var rootID = this._rootNodeID + name;
        var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
        /** @type {number} */
        child._mountIndex = index;
        this.createChild(child, mountImage);
      },
      _unmountChildByName : function(child, name) {
        this.removeChild(child);
        /** @type {null} */
        child._mountIndex = null;
      }
    }
  };
  module.exports = LinkedValueUtils;
}, function(module, canCreateDiscussions, require) {
  var ReactReconciler = require(31);
  var flattenChildren = require(92);
  var instantiateReactComponent = require(85);
  var shouldUpdateReactComponent = require(88);
  var ReactChildReconciler = {
    instantiateChildren : function(nestedChildNodes, transaction, context) {
      var children = flattenChildren(nestedChildNodes);
      var name;
      for (name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          var childInstance = instantiateReactComponent(child, null);
          children[name] = childInstance;
        }
      }
      return children;
    },
    updateChildren : function(prevChildren, nextNestedChildren, transaction, context) {
      var nextChildren = flattenChildren(nextNestedChildren);
      if (!nextChildren && !prevChildren) {
        return null;
      }
      var name;
      for (name in nextChildren) {
        if (nextChildren.hasOwnProperty(name)) {
          var prevChild = prevChildren && prevChildren[name];
          var prevElement = prevChild && prevChild._currentElement;
          var nextElement = nextChildren[name];
          if (shouldUpdateReactComponent(prevElement, nextElement)) {
            ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
            nextChildren[name] = prevChild;
          } else {
            if (prevChild) {
              ReactReconciler.unmountComponent(prevChild, name);
            }
            var nextChildInstance = instantiateReactComponent(nextElement, null);
            nextChildren[name] = nextChildInstance;
          }
        }
      }
      for (name in prevChildren) {
        if (!(!prevChildren.hasOwnProperty(name) || nextChildren && nextChildren.hasOwnProperty(name))) {
          ReactReconciler.unmountComponent(prevChildren[name]);
        }
      }
      return nextChildren;
    },
    unmountChildren : function(renderedChildren) {
      var name;
      for (name in renderedChildren) {
        var renderedChild = renderedChildren[name];
        ReactReconciler.unmountComponent(renderedChild);
      }
    }
  };
  module.exports = ReactChildReconciler;
}, function(module, canCreateDiscussions, __webpack_require__) {
  /**
   * @param {boolean} name
   * @param {?} item
   * @param {?} n
   * @return {undefined}
   */
  function length(name, item, n) {
    /** @type {boolean} */
    var r = name;
    /** @type {boolean} */
    var current = !r.hasOwnProperty(n);
    if (current && null != item) {
      r[n] = item;
    }
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function array(obj) {
    if (null == obj) {
      return obj;
    }
    var value = {};
    return defineProperty(obj, length, value), value;
  }
  var defineProperty = __webpack_require__(20);
  __webpack_require__(14);
  /** @type {function(!Object): ?} */
  module.exports = array;
}, function($, canCreateDiscussions, require) {
  /**
   * @param {string} type
   * @return {?}
   */
  function autoGenerateWrapperClass(type) {
    return ReactClass.createClass({
      tagName : type.toUpperCase(),
      render : function() {
        return new ReactElement(type, null, null, null, null, this.props);
      }
    });
  }
  /**
   * @return {undefined}
   */
  function inject() {
    ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
    ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
    ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
    ReactInjection.EventPluginHub.injectMount(ReactMount);
    ReactInjection.EventPluginHub.injectEventPluginsByName({
      SimpleEventPlugin : SimpleEventPlugin,
      EnterLeaveEventPlugin : EnterLeaveEventPlugin,
      ChangeEventPlugin : ChangeEventPlugin,
      MobileSafariClickEventPlugin : MobileSafariClickEventPlugin,
      SelectEventPlugin : SelectEventPlugin,
      BeforeInputEventPlugin : BeforeInputEventPlugin
    });
    ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);
    ReactInjection.NativeComponent.injectTextComponentClass(ReactDOMTextComponent);
    ReactInjection.NativeComponent.injectAutoWrapper(autoGenerateWrapperClass);
    ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);
    ReactInjection.NativeComponent.injectComponentClasses({
      button : ReactDOMButton,
      form : docs,
      iframe : ReactDOMIframe,
      img : ReactDOMImg,
      input : rest,
      option : ReactDOMOption,
      select : ReactDOMSelect,
      textarea : ReactDOMTextarea,
      html : createFullPageComponent("html"),
      head : createFullPageComponent("head"),
      body : createFullPageComponent("body")
    });
    ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
    ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
    ReactInjection.EmptyComponent.injectEmptyComponent("noscript");
    ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
    ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex);
    ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
    ReactInjection.DOMComponent.injectIDOperations(ReactDOMIDOperations);
  }
  var BeforeInputEventPlugin = require(98);
  var ChangeEventPlugin = require(106);
  var ClientReactRootIndex = require(108);
  var DefaultEventPluginOrder = require(109);
  var EnterLeaveEventPlugin = require(110);
  var ExecutionEnvironment = require(55);
  var HTMLDOMPropertyConfig = require(114);
  var MobileSafariClickEventPlugin = require(115);
  var ReactBrowserComponentMixin = require(96);
  var ReactClass = require(39);
  var ReactComponentBrowserEnvironment = require(49);
  var ReactDefaultBatchingStrategy = require(116);
  var ReactDOMComponent = require(89);
  var ReactDOMButton = require(117);
  var docs = require(120);
  var ReactDOMImg = require(121);
  var ReactDOMIDOperations = require(50);
  var ReactDOMIframe = require(94);
  var rest = require(122);
  var ReactDOMOption = require(125);
  var ReactDOMSelect = require(126);
  var ReactDOMTextarea = require(127);
  var ReactDOMTextComponent = require(44);
  var ReactElement = require(13);
  var ReactEventListener = require(128);
  var ReactInjection = require(131);
  var ReactInstanceHandles = require(21);
  var ReactMount = require(69);
  var ReactReconcileTransaction = require(132);
  var SelectEventPlugin = require(138);
  var ServerReactRootIndex = require(140);
  var SimpleEventPlugin = require(141);
  var SVGDOMPropertyConfig = require(150);
  var createFullPageComponent = require(151);
  $.exports = {
    inject : inject
  };
}, function(module, canCreateDiscussions, require) {
  var EventConstants = require(7);
  var FieldProxyMixin = require(95);
  var KeybindMixin = require(96);
  var React = require(39);
  var rangy = require(13);
  var elementFactory = rangy.createFactory("iframe");
  var storeMixin = React.createClass({
    displayName : "ReactDOMIframe",
    tagName : "IFRAME",
    mixins : [KeybindMixin, FieldProxyMixin],
    render : function() {
      return elementFactory(this.props);
    },
    componentDidMount : function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, "load");
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!FileEntry} vacationRequest
   * @return {undefined}
   */
  function remove(vacationRequest) {
    vacationRequest.remove();
  }
  var ReactBrowserEventEmitter = require(70);
  var accumulateInto = require(73);
  var forEachAccumulated = require(74);
  var invariant = require(9);
  var LocalEventTrapMixin = {
    trapBubbledEvent : function(topLevelType, type) {
      invariant(this.isMounted());
      var node = this.getDOMNode();
      invariant(node);
      var listener = ReactBrowserEventEmitter.trapBubbledEvent(topLevelType, type, node);
      this._localEventListeners = accumulateInto(this._localEventListeners, listener);
    },
    componentWillUnmount : function() {
      if (this._localEventListeners) {
        forEachAccumulated(this._localEventListeners, remove);
      }
    }
  };
  module.exports = LocalEventTrapMixin;
}, function(module, canCreateDiscussions, require) {
  var findDOMNode = require(97);
  var ReactBrowserComponentMixin = {
    getDOMNode : function() {
      return findDOMNode(this);
    }
  };
  module.exports = ReactBrowserComponentMixin;
}, function(task, canCreateDiscussions, __webpack_require__) {
  /**
   * @param {!Object} type
   * @return {?}
   */
  function r(type) {
    return null == type ? null : isArray(type) ? type : cachedDisplayNames.has(type) ? Injected.getNodeFromInstance(type) : (_queue(null == type.render || "function" != typeof type.render), void _queue(false));
  }
  var cachedDisplayNames = (__webpack_require__(19), __webpack_require__(27));
  var Injected = __webpack_require__(69);
  var _queue = __webpack_require__(9);
  var isArray = __webpack_require__(83);
  __webpack_require__(14);
  /** @type {function(!Object): ?} */
  task.exports = r;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {?}
   */
  function parse() {
    var opera = window.opera;
    return "object" == typeof opera && "function" == typeof opera.version && parseInt(opera.version(), 10) <= 12;
  }
  /**
   * @param {!Event} event
   * @return {?}
   */
  function updatePressedMods(event) {
    return (event.ctrlKey || event.altKey || event.metaKey) && !(event.ctrlKey && event.altKey);
  }
  /**
   * @param {?} topLevelType
   * @return {?}
   */
  function isMoveish(topLevelType) {
    switch(topLevelType) {
      case topLevelTypes.topCompositionStart:
        return eventTypes.compositionStart;
      case topLevelTypes.topCompositionEnd:
        return eventTypes.compositionEnd;
      case topLevelTypes.topCompositionUpdate:
        return eventTypes.compositionUpdate;
    }
  }
  /**
   * @param {?} topLevelType
   * @param {!Event} event
   * @return {?}
   */
  function isStartish(topLevelType, event) {
    return topLevelType === topLevelTypes.topKeyDown && event.keyCode === keyCode;
  }
  /**
   * @param {?} e
   * @param {!Event} event
   * @return {?}
   */
  function update(e, event) {
    switch(e) {
      case topLevelTypes.topKeyUp:
        return -1 !== skillHotKey.indexOf(event.keyCode);
      case topLevelTypes.topKeyDown:
        return event.keyCode !== keyCode;
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topBlur:
        return true;
      default:
        return false;
    }
  }
  /**
   * @param {!Object} event
   * @return {?}
   */
  function callback(event) {
    var data = event.detail;
    return "object" == typeof data && "data" in data ? data.data : null;
  }
  /**
   * @param {?} topLevelType
   * @param {boolean} target
   * @param {!Object} topLevelTargetID
   * @param {!Event} nativeEvent
   * @return {?}
   */
  function setResponderAndExtractTransfer(topLevelType, target, topLevelTargetID, nativeEvent) {
    var eventType;
    var inEvents;
    if (w ? eventType = isMoveish(topLevelType) : e ? update(topLevelType, nativeEvent) && (eventType = eventTypes.compositionEnd) : isStartish(topLevelType, nativeEvent) && (eventType = eventTypes.compositionStart), !eventType) {
      return null;
    }
    if (ml) {
      if (e || eventType !== eventTypes.compositionStart) {
        if (eventType === eventTypes.compositionEnd && e) {
          inEvents = e.getData();
        }
      } else {
        e = g.getPooled(target);
      }
    }
    var event = EventConstructor.getPooled(eventType, topLevelTargetID, nativeEvent);
    if (inEvents) {
      event.data = inEvents;
    } else {
      var customData = callback(nativeEvent);
      if (null !== customData) {
        event.data = customData;
      }
    }
    return EventPropagators.accumulateTwoPhaseDispatches(event), event;
  }
  /**
   * @param {?} name
   * @param {!Object} event
   * @return {?}
   */
  function fire(name, event) {
    switch(name) {
      case topLevelTypes.topCompositionEnd:
        return callback(event);
      case topLevelTypes.topKeyPress:
        var key = event.which;
        return key !== i ? null : (needGMT = true, c);
      case topLevelTypes.topTextInput:
        var d = event.data;
        return d === c && needGMT ? null : d;
      default:
        return null;
    }
  }
  /**
   * @param {?} name
   * @param {!Event} event
   * @return {?}
   */
  function f(name, event) {
    if (e) {
      if (name === topLevelTypes.topCompositionEnd || update(name, event)) {
        var n = e.getData();
        return g.release(e), e = null, n;
      }
      return null;
    }
    switch(name) {
      case topLevelTypes.topPaste:
        return null;
      case topLevelTypes.topKeyPress:
        return event.which && !updatePressedMods(event) ? String.fromCharCode(event.which) : null;
      case topLevelTypes.topCompositionEnd:
        return ml ? null : event.data;
      default:
        return null;
    }
  }
  /**
   * @param {?} date
   * @param {!Object} elem
   * @param {!Object} topLevelTargetID
   * @param {!Event} nativeEvent
   * @return {?}
   */
  function render(date, elem, topLevelTargetID, nativeEvent) {
    var inEvents;
    if (inEvents = isLocal ? fire(date, nativeEvent) : f(date, nativeEvent), !inEvents) {
      return null;
    }
    var event = SyntheticEvent.getPooled(eventTypes.beforeInput, topLevelTargetID, nativeEvent);
    return event.data = inEvents, EventPropagators.accumulateTwoPhaseDispatches(event), event;
  }
  var EventConstants = require(7);
  var EventPropagators = require(99);
  var options = require(55);
  var g = require(100);
  var EventConstructor = require(102);
  var SyntheticEvent = require(105);
  var keyOf = require(41);
  /** @type {!Array} */
  var skillHotKey = [9, 13, 27, 32];
  /** @type {number} */
  var keyCode = 229;
  var w = options.canUseDOM && "CompositionEvent" in window;
  /** @type {null} */
  var ie = null;
  if (options.canUseDOM && "documentMode" in document) {
    ie = document.documentMode;
  }
  var isLocal = options.canUseDOM && "TextEvent" in window && !ie && !parse();
  var ml = options.canUseDOM && (!w || ie && ie > 8 && 11 >= ie);
  /** @type {number} */
  var i = 32;
  /** @type {string} */
  var c = String.fromCharCode(i);
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {
    beforeInput : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onBeforeInput : null
        }),
        captured : keyOf({
          onBeforeInputCapture : null
        })
      },
      dependencies : [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
    },
    compositionEnd : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onCompositionEnd : null
        }),
        captured : keyOf({
          onCompositionEndCapture : null
        })
      },
      dependencies : [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionStart : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onCompositionStart : null
        }),
        captured : keyOf({
          onCompositionStartCapture : null
        })
      },
      dependencies : [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionUpdate : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onCompositionUpdate : null
        }),
        captured : keyOf({
          onCompositionUpdateCapture : null
        })
      },
      dependencies : [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    }
  };
  /** @type {boolean} */
  var needGMT = false;
  /** @type {null} */
  var e = null;
  var SimpleEventPlugin = {
    eventTypes : eventTypes,
    extractEvents : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      return [setResponderAndExtractTransfer(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent), render(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent)];
    }
  };
  module.exports = SimpleEventPlugin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} id
   * @param {!Object} event
   * @param {?} propagationPhase
   * @return {?}
   */
  function listenerAtPhase(id, event, propagationPhase) {
    var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
    return getListener(id, registrationName);
  }
  /**
   * @param {?} domID
   * @param {?} upwards
   * @param {!Object} event
   * @return {undefined}
   */
  function accumulateDirectionalDispatches(domID, upwards, event) {
    var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
    var listener = listenerAtPhase(domID, event, phase);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
    }
  }
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  function accumulateTwoPhaseDispatchesSingle(event) {
    if (event && event.dispatchConfig.phasedRegistrationNames) {
      EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, accumulateDirectionalDispatches, event);
    }
  }
  /**
   * @param {?} id
   * @param {!Object} ignoredDirection
   * @param {!Object} event
   * @return {undefined}
   */
  function accumulateDispatches(id, ignoredDirection, event) {
    if (event && event.dispatchConfig.registrationName) {
      var registrationName = event.dispatchConfig.registrationName;
      var listener = getListener(id, registrationName);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
      }
    }
  }
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  function accumulateDirectDispatchesSingle(event) {
    if (event && event.dispatchConfig.registrationName) {
      accumulateDispatches(event.dispatchMarker, null, event);
    }
  }
  /**
   * @param {?} events
   * @return {undefined}
   */
  function accumulateTwoPhaseDispatches(events) {
    forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
  }
  /**
   * @param {!Object} leave
   * @param {!Object} enter
   * @param {string} fromID
   * @param {string} toID
   * @return {undefined}
   */
  function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
    EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter);
  }
  /**
   * @param {?} events
   * @return {undefined}
   */
  function accumulateDirectDispatches(events) {
    forEachAccumulated(events, accumulateDirectDispatchesSingle);
  }
  var EventConstants = require(7);
  var EventPluginHub = require(71);
  var accumulateInto = require(73);
  var forEachAccumulated = require(74);
  var PropagationPhases = EventConstants.PropagationPhases;
  var getListener = EventPluginHub.getListener;
  var EventPropagators = {
    accumulateTwoPhaseDispatches : accumulateTwoPhaseDispatches,
    accumulateDirectDispatches : accumulateDirectDispatches,
    accumulateEnterLeaveDispatches : accumulateEnterLeaveDispatches
  };
  module.exports = EventPropagators;
}, function(globalContext, canCreateDiscussions, require) {
  /**
   * @param {string} path
   * @return {undefined}
   */
  function Class(path) {
    /** @type {string} */
    this._root = path;
    this._startText = this.getText();
    /** @type {null} */
    this._fallbackText = null;
  }
  var PooledClass = require(11);
  var extend = require(17);
  var readText = require(101);
  extend(Class.prototype, {
    getText : function() {
      return "value" in this._root ? this._root.value : this._root[readText()];
    },
    getData : function() {
      if (this._fallbackText) {
        return this._fallbackText;
      }
      var start;
      var end;
      var startValue = this._startText;
      var startLength = startValue.length;
      var endValue = this.getText();
      var endLength = endValue.length;
      /** @type {number} */
      start = 0;
      for (; startLength > start && startValue[start] === endValue[start]; start++) {
      }
      /** @type {number} */
      var now = startLength - start;
      /** @type {number} */
      end = 1;
      for (; now >= end && startValue[startLength - end] === endValue[endLength - end]; end++) {
      }
      /** @type {(number|undefined)} */
      var sliceTail = end > 1 ? 1 - end : void 0;
      return this._fallbackText = endValue.slice(start, sliceTail), this._fallbackText;
    }
  });
  PooledClass.addPoolingTo(Class);
  /** @type {function(string): undefined} */
  globalContext.exports = Class;
}, function(exports, canCreateDiscussions, getIndex) {
  /**
   * @return {?}
   */
  function setText() {
    return !text && to.canUseDOM && (text = "textContent" in document.documentElement ? "textContent" : "innerText"), text;
  }
  var to = getIndex(55);
  /** @type {null} */
  var text = null;
  /** @type {function(): ?} */
  exports.exports = setText;
}, function(pkg, canCreateDiscussions, promiseSupplier) {
  /**
   * @param {!Object} str
   * @param {string} name
   * @param {?} data
   * @return {undefined}
   */
  function index(str, name, data) {
    s.call(this, str, name, data);
  }
  var s = promiseSupplier(103);
  var i = {
    data : null
  };
  s.augmentClass(index, i);
  /** @type {function(!Object, string, ?): undefined} */
  pkg.exports = index;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} type
   * @param {string} o
   * @param {!Object} nativeEvent
   * @return {undefined}
   */
  function SyntheticEvent(type, o, nativeEvent) {
    /** @type {!Object} */
    this.dispatchConfig = type;
    /** @type {string} */
    this.dispatchMarker = o;
    /** @type {!Object} */
    this.nativeEvent = nativeEvent;
    var nested = this.constructor.Interface;
    var key;
    for (key in nested) {
      if (nested.hasOwnProperty(key)) {
        var val = nested[key];
        if (val) {
          this[key] = val(nativeEvent);
        } else {
          this[key] = nativeEvent[key];
        }
      }
    }
    var s = null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
    if (s) {
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    } else {
      this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
    }
    this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  }
  var PooledClass = require(11);
  var assign = require(17);
  var emptyFunction = require(15);
  var AFTSurvivalRegression = require(104);
  var EventInterface = {
    type : null,
    target : AFTSurvivalRegression,
    currentTarget : emptyFunction.thatReturnsNull,
    eventPhase : null,
    bubbles : null,
    cancelable : null,
    timeStamp : function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented : null,
    isTrusted : null
  };
  assign(SyntheticEvent.prototype, {
    preventDefault : function() {
      /** @type {boolean} */
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        /** @type {boolean} */
        event.returnValue = false;
      }
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    },
    stopPropagation : function() {
      var event = this.nativeEvent;
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        /** @type {boolean} */
        event.cancelBubble = true;
      }
      this.isPropagationStopped = emptyFunction.thatReturnsTrue;
    },
    persist : function() {
      this.isPersistent = emptyFunction.thatReturnsTrue;
    },
    isPersistent : emptyFunction.thatReturnsFalse,
    destructor : function() {
      var Interface = this.constructor.Interface;
      var propName;
      for (propName in Interface) {
        /** @type {null} */
        this[propName] = null;
      }
      /** @type {null} */
      this.dispatchConfig = null;
      /** @type {null} */
      this.dispatchMarker = null;
      /** @type {null} */
      this.nativeEvent = null;
    }
  });
  SyntheticEvent.Interface = EventInterface;
  /**
   * @param {!Function} self
   * @param {?} data
   * @return {undefined}
   */
  SyntheticEvent.augmentClass = function(self, data) {
    var Super = this;
    /** @type {!Object} */
    var parser = Object.create(Super.prototype);
    assign(parser, self.prototype);
    /** @type {!Object} */
    self.prototype = parser;
    /** @type {!Function} */
    self.prototype.constructor = self;
    self.Interface = assign({}, Super.Interface, data);
    self.augmentClass = Super.augmentClass;
    PooledClass.addPoolingTo(self, PooledClass.threeArgumentPooler);
  };
  PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);
  /** @type {function(!Object, string, !Object): undefined} */
  module.exports = SyntheticEvent;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function render(obj) {
    var _scope = obj.target || obj.srcElement || window;
    return 3 === _scope.nodeType ? _scope.parentNode : _scope;
  }
  /** @type {function(!Object): ?} */
  module.exports = render;
}, function(pkg, canCreateDiscussions, require) {
  /**
   * @param {!Object} obj
   * @param {string} data
   * @param {?} name
   * @return {undefined}
   */
  function index(obj, data, name) {
    log.call(this, obj, data, name);
  }
  var log = require(103);
  var i = {
    data : null
  };
  log.augmentClass(index, i);
  /** @type {function(!Object, string, ?): undefined} */
  pkg.exports = index;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} elem
   * @return {?}
   */
  function shouldUseChangeEvent(elem) {
    return "SELECT" === elem.nodeName || "INPUT" === elem.nodeName && "file" === elem.type;
  }
  /**
   * @param {!Event} nativeEvent
   * @return {undefined}
   */
  function manualDispatchChangeEvent(nativeEvent) {
    var event = SyntheticEvent.getPooled(eventTypes.change, activeElementID, nativeEvent);
    EventPropagators.accumulateTwoPhaseDispatches(event);
    ReactUpdates.batchedUpdates(runEventInBatch, event);
  }
  /**
   * @param {?} event
   * @return {undefined}
   */
  function runEventInBatch(event) {
    EventPluginHub.enqueueEvents(event);
    EventPluginHub.processEventQueue();
  }
  /**
   * @param {!Object} target
   * @param {!Object} targetID
   * @return {undefined}
   */
  function startWatchingForChangeEventIE8(target, targetID) {
    /** @type {!Object} */
    activeElement = target;
    /** @type {!Object} */
    activeElementID = targetID;
    activeElement.attachEvent("onchange", manualDispatchChangeEvent);
  }
  /**
   * @return {undefined}
   */
  function stopWatchingForChangeEventIE8() {
    if (activeElement) {
      activeElement.detachEvent("onchange", manualDispatchChangeEvent);
      /** @type {null} */
      activeElement = null;
      /** @type {null} */
      activeElementID = null;
    }
  }
  /**
   * @param {?} topLevelType
   * @param {boolean} topLevelTarget
   * @param {!Object} topLevelTargetID
   * @return {?}
   */
  function getTargetIDForChangeEvent(topLevelType, topLevelTarget, topLevelTargetID) {
    return topLevelType === topLevelTypes.topChange ? topLevelTargetID : void 0;
  }
  /**
   * @param {?} topLevelType
   * @param {string} topLevelTarget
   * @param {!Object} topLevelTargetID
   * @return {undefined}
   */
  function handleEventsForChangeEventIE8(topLevelType, topLevelTarget, topLevelTargetID) {
    if (topLevelType === topLevelTypes.topFocus) {
      stopWatchingForChangeEventIE8();
      startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
    } else {
      if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForChangeEventIE8();
      }
    }
  }
  /**
   * @param {!Object} target
   * @param {!Object} targetID
   * @return {undefined}
   */
  function startWatchingForValueChange(target, targetID) {
    /** @type {!Object} */
    activeElement = target;
    /** @type {!Object} */
    activeElementID = targetID;
    value = target.value;
    /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
    activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, "value");
    Object.defineProperty(activeElement, "value", propdef);
    activeElement.attachEvent("onpropertychange", handlePropertyChange);
  }
  /**
   * @return {undefined}
   */
  function stopWatchingForValueChange() {
    if (activeElement) {
      delete activeElement.value;
      activeElement.detachEvent("onpropertychange", handlePropertyChange);
      /** @type {null} */
      activeElement = null;
      /** @type {null} */
      activeElementID = null;
      /** @type {null} */
      value = null;
      /** @type {null} */
      activeElementValueProp = null;
    }
  }
  /**
   * @param {!Event} nativeEvent
   * @return {undefined}
   */
  function handlePropertyChange(nativeEvent) {
    if ("value" === nativeEvent.propertyName) {
      var prev = nativeEvent.srcElement.value;
      if (prev !== value) {
        value = prev;
        manualDispatchChangeEvent(nativeEvent);
      }
    }
  }
  /**
   * @param {?} topLevelType
   * @param {boolean} topLevelTarget
   * @param {!Object} topLevelTargetID
   * @return {?}
   */
  function getTargetIDForInputEvent(topLevelType, topLevelTarget, topLevelTargetID) {
    return topLevelType === topLevelTypes.topInput ? topLevelTargetID : void 0;
  }
  /**
   * @param {?} topLevelType
   * @param {string} topLevelTarget
   * @param {!Object} topLevelTargetID
   * @return {undefined}
   */
  function handleEventsForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
    if (topLevelType === topLevelTypes.topFocus) {
      stopWatchingForValueChange();
      startWatchingForValueChange(topLevelTarget, topLevelTargetID);
    } else {
      if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForValueChange();
      }
    }
  }
  /**
   * @param {?} topLevelType
   * @param {boolean} topLevelTarget
   * @param {!Object} topLevelTargetID
   * @return {?}
   */
  function getTargetIDForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
    return topLevelType !== topLevelTypes.topSelectionChange && topLevelType !== topLevelTypes.topKeyUp && topLevelType !== topLevelTypes.topKeyDown || !activeElement || activeElement.value === value ? void 0 : (value = activeElement.value, activeElementID);
  }
  /**
   * @param {?} elem
   * @return {?}
   */
  function shouldUseClickEvent(elem) {
    return "INPUT" === elem.nodeName && ("checkbox" === elem.type || "radio" === elem.type);
  }
  /**
   * @param {?} topLevelType
   * @param {boolean} topLevelTarget
   * @param {!Object} topLevelTargetID
   * @return {?}
   */
  function getTargetIDForClickEvent(topLevelType, topLevelTarget, topLevelTargetID) {
    return topLevelType === topLevelTypes.topClick ? topLevelTargetID : void 0;
  }
  var EventConstants = require(7);
  var EventPluginHub = require(71);
  var EventPropagators = require(99);
  var ExecutionEnvironment = require(55);
  var ReactUpdates = require(28);
  var SyntheticEvent = require(103);
  var isEventSupported = require(77);
  var isTextInputElement = require(107);
  var keyOf = require(41);
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {
    change : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onChange : null
        }),
        captured : keyOf({
          onChangeCapture : null
        })
      },
      dependencies : [topLevelTypes.topBlur, topLevelTypes.topChange, topLevelTypes.topClick, topLevelTypes.topFocus, topLevelTypes.topInput, topLevelTypes.topKeyDown, topLevelTypes.topKeyUp, topLevelTypes.topSelectionChange]
    }
  };
  /** @type {null} */
  var activeElement = null;
  /** @type {null} */
  var activeElementID = null;
  /** @type {null} */
  var value = null;
  /** @type {null} */
  var activeElementValueProp = null;
  /** @type {boolean} */
  var M = false;
  if (ExecutionEnvironment.canUseDOM) {
    M = isEventSupported("change") && (!("documentMode" in document) || document.documentMode > 8);
  }
  /** @type {boolean} */
  var $isFrozen = false;
  if (ExecutionEnvironment.canUseDOM) {
    $isFrozen = isEventSupported("input") && (!("documentMode" in document) || document.documentMode > 9);
  }
  var propdef = {
    get : function() {
      return activeElementValueProp.get.call(this);
    },
    set : function(type) {
      /** @type {string} */
      value = "" + type;
      activeElementValueProp.set.call(this, type);
    }
  };
  var SimpleEventPlugin = {
    eventTypes : eventTypes,
    extractEvents : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var getTargetIDFunc;
      var handleEventFunc;
      if (shouldUseChangeEvent(topLevelTarget) ? M ? getTargetIDFunc = getTargetIDForChangeEvent : handleEventFunc = handleEventsForChangeEventIE8 : isTextInputElement(topLevelTarget) ? $isFrozen ? getTargetIDFunc = getTargetIDForInputEvent : (getTargetIDFunc = getTargetIDForInputEventIE, handleEventFunc = handleEventsForInputEventIE) : shouldUseClickEvent(topLevelTarget) && (getTargetIDFunc = getTargetIDForClickEvent), getTargetIDFunc) {
        var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
        if (targetID) {
          var event = SyntheticEvent.getPooled(eventTypes.change, targetID, nativeEvent);
          return EventPropagators.accumulateTwoPhaseDispatches(event), event;
        }
      }
      if (handleEventFunc) {
        handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
      }
    }
  };
  module.exports = SimpleEventPlugin;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} target
   * @return {?}
   */
  function self(target) {
    return target && ("INPUT" === target.nodeName && $inputTypes[target.type] || "TEXTAREA" === target.nodeName);
  }
  var $inputTypes = {
    color : true,
    date : true,
    datetime : true,
    "datetime-local" : true,
    email : true,
    month : true,
    number : true,
    password : true,
    range : true,
    search : true,
    tel : true,
    text : true,
    time : true,
    url : true,
    week : true
  };
  /** @type {function(!Object): ?} */
  module.exports = self;
}, function(module, canCreateDiscussions, n) {
  /** @type {number} */
  var r = 0;
  var storeMixin = {
    createReactRootIndex : function() {
      return r++;
    }
  };
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, FbmNoise2) {
  var ruggedNoise = FbmNoise2(41);
  /** @type {!Array} */
  var storeMixin = [ruggedNoise({
    ResponderEventPlugin : null
  }), ruggedNoise({
    SimpleEventPlugin : null
  }), ruggedNoise({
    TapEventPlugin : null
  }), ruggedNoise({
    EnterLeaveEventPlugin : null
  }), ruggedNoise({
    ChangeEventPlugin : null
  }), ruggedNoise({
    SelectEventPlugin : null
  }), ruggedNoise({
    BeforeInputEventPlugin : null
  }), ruggedNoise({
    AnalyticsEventPlugin : null
  }), ruggedNoise({
    MobileSafariClickEventPlugin : null
  })];
  /** @type {!Array} */
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  var EventConstants = require(7);
  var EventPropagators = require(99);
  var SyntheticMouseEvent = require(111);
  var ReactMount = require(69);
  var keyOf = require(41);
  var topLevelTypes = EventConstants.topLevelTypes;
  var handleEventFunc = ReactMount.getFirstReactDOM;
  var api = {
    mouseEnter : {
      registrationName : keyOf({
        onMouseEnter : null
      }),
      dependencies : [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    },
    mouseLeave : {
      registrationName : keyOf({
        onMouseLeave : null
      }),
      dependencies : [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    }
  };
  /** @type {!Array} */
  var extractedEvents = [null, null];
  var SimpleEventPlugin = {
    eventTypes : api,
    extractEvents : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      if (topLevelType === topLevelTypes.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
        return null;
      }
      if (topLevelType !== topLevelTypes.topMouseOut && topLevelType !== topLevelTypes.topMouseOver) {
        return null;
      }
      var win;
      if (topLevelTarget.window === topLevelTarget) {
        /** @type {!Object} */
        win = topLevelTarget;
      } else {
        var doc = topLevelTarget.ownerDocument;
        win = doc ? doc.defaultView || doc.parentWindow : window;
      }
      var from;
      var to;
      if (topLevelType === topLevelTypes.topMouseOut ? (from = topLevelTarget, to = handleEventFunc(nativeEvent.relatedTarget || nativeEvent.toElement) || win) : (from = win, to = topLevelTarget), from === to) {
        return null;
      }
      var fromID = from ? ReactMount.getID(from) : "";
      var toID = to ? ReactMount.getID(to) : "";
      var leave = SyntheticMouseEvent.getPooled(api.mouseLeave, fromID, nativeEvent);
      /** @type {string} */
      leave.type = "mouseleave";
      leave.target = from;
      leave.relatedTarget = to;
      var enter = SyntheticMouseEvent.getPooled(api.mouseEnter, toID, nativeEvent);
      return enter.type = "mouseenter", enter.target = to, enter.relatedTarget = from, EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID), extractedEvents[0] = leave, extractedEvents[1] = enter, extractedEvents;
    }
  };
  module.exports = SimpleEventPlugin;
}, function(pkg, canCreateDiscussions, $) {
  /**
   * @param {!Object} obj
   * @param {string} x
   * @param {?} name
   * @return {undefined}
   */
  function index(obj, x, name) {
    log.call(this, obj, x, name);
  }
  var log = $(112);
  var doc = $(76);
  var tf_menu = $(113);
  var event = {
    screenX : null,
    screenY : null,
    clientX : null,
    clientY : null,
    ctrlKey : null,
    shiftKey : null,
    altKey : null,
    metaKey : null,
    getModifierState : tf_menu,
    button : function(event) {
      var button = event.button;
      return "which" in event ? button : 2 === button ? 2 : 4 === button ? 1 : 0;
    },
    buttons : null,
    relatedTarget : function(event) {
      return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
    },
    pageX : function(event) {
      return "pageX" in event ? event.pageX : event.clientX + doc.currentScrollLeft;
    },
    pageY : function(event) {
      return "pageY" in event ? event.pageY : event.clientY + doc.currentScrollTop;
    }
  };
  log.augmentClass(index, event);
  /** @type {function(!Object, string, ?): undefined} */
  pkg.exports = index;
}, function(task, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @param {string} a
   * @param {?} b
   * @return {undefined}
   */
  function r(obj, a, b) {
    l.call(this, obj, a, b);
  }
  var l = n(103);
  var h = n(104);
  var data = {
    view : function(e) {
      if (e.view) {
        return e.view;
      }
      var target = h(e);
      if (null != target && target.window === target) {
        return target;
      }
      var node = target.ownerDocument;
      return node ? node.defaultView || node.parentWindow : window;
    },
    detail : function(event) {
      return event.detail || 0;
    }
  };
  l.augmentClass(r, data);
  /** @type {function(!Object, string, ?): undefined} */
  task.exports = r;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {?} keyArg
   * @return {?}
   */
  function onLayout(keyArg) {
    var syntheticEvent = this;
    var nativeEvent = syntheticEvent.nativeEvent;
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyArg);
    }
    var keyProp = keymap[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function sightglass(obj) {
    return onLayout;
  }
  var keymap = {
    Alt : "altKey",
    Control : "ctrlKey",
    Meta : "metaKey",
    Shift : "shiftKey"
  };
  /** @type {function(!Object): ?} */
  module.exports = sightglass;
}, function(module, canCreateDiscussions, require) {
  var value;
  var DOMProperty = require(46);
  var ExecutionEnvironment = require(55);
  var TRUE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
  var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
  var u = DOMProperty.injection.HAS_SIDE_EFFECTS;
  var countStart = DOMProperty.injection.HAS_NUMERIC_VALUE;
  var size = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
  var filename = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
  if (ExecutionEnvironment.canUseDOM) {
    /** @type {(DOMImplementation|null)} */
    var implementation = document.implementation;
    /** @type {(boolean|null)} */
    value = implementation && implementation.hasFeature && implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
  }
  var BinaryBundle = {
    isCustomAttribute : RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
    Properties : {
      accept : null,
      acceptCharset : null,
      accessKey : null,
      action : null,
      allowFullScreen : TRUE | HAS_BOOLEAN_VALUE,
      allowTransparency : TRUE,
      alt : null,
      async : HAS_BOOLEAN_VALUE,
      autoComplete : null,
      autoPlay : HAS_BOOLEAN_VALUE,
      cellPadding : null,
      cellSpacing : null,
      charSet : TRUE,
      checked : MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      classID : TRUE,
      className : value ? TRUE : MUST_USE_PROPERTY,
      cols : TRUE | size,
      colSpan : null,
      content : null,
      contentEditable : null,
      contextMenu : TRUE,
      controls : MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      coords : null,
      crossOrigin : null,
      data : null,
      dateTime : TRUE,
      defer : HAS_BOOLEAN_VALUE,
      dir : null,
      disabled : TRUE | HAS_BOOLEAN_VALUE,
      download : filename,
      draggable : null,
      encType : null,
      form : TRUE,
      formAction : TRUE,
      formEncType : TRUE,
      formMethod : TRUE,
      formNoValidate : HAS_BOOLEAN_VALUE,
      formTarget : TRUE,
      frameBorder : TRUE,
      headers : null,
      height : TRUE,
      hidden : TRUE | HAS_BOOLEAN_VALUE,
      high : null,
      href : null,
      hrefLang : null,
      htmlFor : null,
      httpEquiv : null,
      icon : null,
      id : MUST_USE_PROPERTY,
      label : null,
      lang : null,
      list : TRUE,
      loop : MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      low : null,
      manifest : TRUE,
      marginHeight : null,
      marginWidth : null,
      max : null,
      maxLength : TRUE,
      media : TRUE,
      mediaGroup : null,
      method : null,
      min : null,
      multiple : MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      muted : MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      name : null,
      noValidate : HAS_BOOLEAN_VALUE,
      open : HAS_BOOLEAN_VALUE,
      optimum : null,
      pattern : null,
      placeholder : null,
      poster : null,
      preload : null,
      radioGroup : null,
      readOnly : MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      rel : null,
      required : HAS_BOOLEAN_VALUE,
      role : TRUE,
      rows : TRUE | size,
      rowSpan : null,
      sandbox : null,
      scope : null,
      scoped : HAS_BOOLEAN_VALUE,
      scrolling : null,
      seamless : TRUE | HAS_BOOLEAN_VALUE,
      selected : MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      shape : null,
      size : TRUE | size,
      sizes : TRUE,
      span : size,
      spellCheck : null,
      src : null,
      srcDoc : MUST_USE_PROPERTY,
      srcSet : TRUE,
      start : countStart,
      step : null,
      style : null,
      tabIndex : null,
      target : null,
      title : null,
      type : null,
      useMap : null,
      value : MUST_USE_PROPERTY | u,
      width : TRUE,
      wmode : TRUE,
      autoCapitalize : null,
      autoCorrect : null,
      itemProp : TRUE,
      itemScope : TRUE | HAS_BOOLEAN_VALUE,
      itemType : TRUE,
      itemID : TRUE,
      itemRef : TRUE,
      property : null,
      unselectable : TRUE
    },
    DOMAttributeNames : {
      acceptCharset : "accept-charset",
      className : "class",
      htmlFor : "for",
      httpEquiv : "http-equiv"
    },
    DOMPropertyNames : {
      autoCapitalize : "autocapitalize",
      autoComplete : "autocomplete",
      autoCorrect : "autocorrect",
      autoFocus : "autofocus",
      autoPlay : "autoplay",
      encType : "encoding",
      hrefLang : "hreflang",
      radioGroup : "radiogroup",
      spellCheck : "spellcheck",
      srcDoc : "srcdoc",
      srcSet : "srcset"
    }
  };
  module.exports = BinaryBundle;
}, function(module, canCreateDiscussions, require) {
  var EventConstants = require(7);
  var ZmPeopleSearchText_hover = require(15);
  var topLevelTypes = EventConstants.topLevelTypes;
  var SimpleEventPlugin = {
    eventTypes : null,
    extractEvents : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      if (topLevelType === topLevelTypes.topTouchStart) {
        var target = nativeEvent.target;
        if (target && !target.onclick) {
          target.onclick = ZmPeopleSearchText_hover;
        }
      }
    }
  };
  module.exports = SimpleEventPlugin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function TestTransaction() {
    this.reinitializeTransaction();
  }
  var modal = require(28);
  var ReactDOMComponent = require(38);
  var assign = require(17);
  var loadScript = require(15);
  var UPDATE_QUEUEING = {
    initialize : loadScript,
    close : function() {
      /** @type {boolean} */
      ReactUpdates.isBatchingUpdates = false;
    }
  };
  var ON_UMG_READY_QUEUEING = {
    initialize : loadScript,
    close : modal.flushBatchedUpdates.bind(modal)
  };
  /** @type {!Array} */
  var TRANSACTION_WRAPPERS = [ON_UMG_READY_QUEUEING, UPDATE_QUEUEING];
  assign(TestTransaction.prototype, ReactDOMComponent.Mixin, {
    getTransactionWrappers : function() {
      return TRANSACTION_WRAPPERS;
    }
  });
  var transaction = new TestTransaction;
  var ReactUpdates = {
    isBatchingUpdates : false,
    batchedUpdates : function(callback, a, b, c, d) {
      /** @type {boolean} */
      var alreadyBatchingUpdates = ReactUpdates.isBatchingUpdates;
      /** @type {boolean} */
      ReactUpdates.isBatchingUpdates = true;
      if (alreadyBatchingUpdates) {
        callback(a, b, c, d);
      } else {
        transaction.perform(callback, null, a, b, c, d);
      }
    }
  };
  module.exports = ReactUpdates;
}, function(module, canCreateDiscussions, require) {
  var KeybindMixin = require(118);
  var FieldProxyMixin = require(96);
  var ReactClass = require(39);
  var React = require(13);
  var createSlider = require(8);
  var Component = React.createFactory("button");
  var slider = createSlider({
    onClick : true,
    onDoubleClick : true,
    onMouseDown : true,
    onMouseMove : true,
    onMouseUp : true,
    onClickCapture : true,
    onDoubleClickCapture : true,
    onMouseDownCapture : true,
    onMouseMoveCapture : true,
    onMouseUpCapture : true
  });
  var storeMixin = ReactClass.createClass({
    displayName : "ReactDOMButton",
    tagName : "BUTTON",
    mixins : [KeybindMixin, FieldProxyMixin],
    render : function() {
      var props = {};
      var key;
      for (key in this.props) {
        if (!(!this.props.hasOwnProperty(key) || this.props.disabled && slider[key])) {
          props[key] = this.props[key];
        }
      }
      return Component(props, this.props.children);
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, saveNotifs) {
  var findScrollParent = saveNotifs(119);
  var mixins = {
    componentDidMount : function() {
      if (this.props.autoFocus) {
        findScrollParent(this.getDOMNode());
      }
    }
  };
  module.exports = mixins;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {undefined}
   */
  function sightglass(obj) {
    try {
      obj.focus();
    } catch (t) {
    }
  }
  /** @type {function(!Object): undefined} */
  module.exports = sightglass;
}, function(module, canCreateDiscussions, require) {
  var EventConstants = require(7);
  var FieldProxyMixin = require(95);
  var KeybindMixin = require(96);
  var React = require(39);
  var vkey = require(13);
  var label = vkey.createFactory("form");
  var storeMixin = React.createClass({
    displayName : "ReactDOMForm",
    tagName : "FORM",
    mixins : [KeybindMixin, FieldProxyMixin],
    render : function() {
      return label(this.props);
    },
    componentDidMount : function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topReset, "reset");
      this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, "submit");
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  var EventConstants = require(7);
  var FieldProxyMixin = require(95);
  var KeybindMixin = require(96);
  var React = require(39);
  var engine = require(13);
  var elementFactory = engine.createFactory("img");
  var storeMixin = React.createClass({
    displayName : "ReactDOMImg",
    tagName : "IMG",
    mixins : [KeybindMixin, FieldProxyMixin],
    render : function() {
      return elementFactory(this.props);
    },
    componentDidMount : function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, "load");
      this.trapBubbledEvent(EventConstants.topLevelTypes.topError, "error");
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function forceUpdateIfMounted() {
    if (this.isMounted()) {
      this.forceUpdate();
    }
  }
  var KeybindMixin = require(118);
  var DOMPropertyOperations = require(45);
  var LinkedValueUtils = require(123);
  var ReactBrowserComponentMixin = require(96);
  var ReactClass = require(39);
  var React = require(13);
  var ReactMount = require(69);
  var ReactUpdates = require(28);
  var extend = require(17);
  var invariant = require(9);
  var input = React.createFactory("input");
  var instancesByReactID = {};
  var storeMixin = ReactClass.createClass({
    displayName : "ReactDOMInput",
    tagName : "INPUT",
    mixins : [KeybindMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
    getInitialState : function() {
      var defaultValue = this.props.defaultValue;
      return {
        initialChecked : this.props.defaultChecked || false,
        initialValue : null != defaultValue ? defaultValue : null
      };
    },
    render : function() {
      var props = extend({}, this.props);
      /** @type {null} */
      props.defaultChecked = null;
      /** @type {null} */
      props.defaultValue = null;
      var value = LinkedValueUtils.getValue(this);
      props.value = null != value ? value : this.state.initialValue;
      var checked = LinkedValueUtils.getChecked(this);
      return props.checked = null != checked ? checked : this.state.initialChecked, props.onChange = this._handleChange, input(props, this.props.children);
    },
    componentDidMount : function() {
      var id = ReactMount.getID(this.getDOMNode());
      instancesByReactID[id] = this;
    },
    componentWillUnmount : function() {
      var rootNode = this.getDOMNode();
      var id = ReactMount.getID(rootNode);
      delete instancesByReactID[id];
    },
    componentDidUpdate : function(nextProps, state, prevState) {
      var rootNode = this.getDOMNode();
      if (null != this.props.checked) {
        DOMPropertyOperations.setValueForProperty(rootNode, "checked", this.props.checked || false);
      }
      var value = LinkedValueUtils.getValue(this);
      if (null != value) {
        DOMPropertyOperations.setValueForProperty(rootNode, "value", "" + value);
      }
    },
    _handleChange : function(e) {
      var returnValue;
      var onBodyKeyup = LinkedValueUtils.getOnChange(this);
      if (onBodyKeyup) {
        returnValue = onBodyKeyup.call(this, e);
      }
      ReactUpdates.asap(forceUpdateIfMounted, this);
      var name = this.props.name;
      if ("radio" === this.props.type && null != name) {
        var element = this.getDOMNode();
        var elem = element;
        for (; elem.parentNode;) {
          elem = elem.parentNode;
        }
        var result = elem.querySelectorAll("input[name=" + JSON.stringify("" + name) + '][type="radio"]');
        /** @type {number} */
        var rootNodeName = 0;
        var trlen = result.length;
        for (; trlen > rootNodeName; rootNodeName++) {
          var rootNode = result[rootNodeName];
          if (rootNode !== element && rootNode.form === element.form) {
            var otherID = ReactMount.getID(rootNode);
            invariant(otherID);
            var otherInstance = instancesByReactID[otherID];
            invariant(otherInstance);
            ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
          }
        }
      }
      return returnValue;
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} input
   * @return {undefined}
   */
  function _assertSingleLink(input) {
    invariant(null == input.props.checkedLink || null == input.props.valueLink);
  }
  /**
   * @param {!Object} input
   * @return {undefined}
   */
  function _assertValueLink(input) {
    _assertSingleLink(input);
    invariant(null == input.props.value && null == input.props.onChange);
  }
  /**
   * @param {!Object} input
   * @return {undefined}
   */
  function _assertCheckedLink(input) {
    _assertSingleLink(input);
    invariant(null == input.props.checked && null == input.props.onChange);
  }
  /**
   * @param {!Event} e
   * @return {undefined}
   */
  function _handleLinkedValueChange(e) {
    this.props.valueLink.requestChange(e.target.value);
  }
  /**
   * @param {!Event} e
   * @return {undefined}
   */
  function _handleLinkedCheckChange(e) {
    this.props.checkedLink.requestChange(e.target.checked);
  }
  var ReactPropTypes = require(124);
  var invariant = require(9);
  var hasReadOnlyValue = {
    button : true,
    checkbox : true,
    image : true,
    hidden : true,
    radio : true,
    reset : true,
    submit : true
  };
  var LinkedValueUtils = {
    Mixin : {
      propTypes : {
        value : function(obj, id, n) {
          return !obj[id] || hasReadOnlyValue[obj.type] || obj.onChange || obj.readOnly || obj.disabled ? null : new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
        },
        checked : function(option, val, index) {
          return !option[val] || option.onChange || option.readOnly || option.disabled ? null : new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
        },
        onChange : ReactPropTypes.func
      }
    },
    getValue : function(input) {
      return input.props.valueLink ? (_assertValueLink(input), input.props.valueLink.value) : input.props.value;
    },
    getChecked : function(input) {
      return input.props.checkedLink ? (_assertCheckedLink(input), input.props.checkedLink.value) : input.props.checked;
    },
    getOnChange : function(input) {
      return input.props.valueLink ? (_assertValueLink(input), _handleLinkedValueChange) : input.props.checkedLink ? (_assertCheckedLink(input), _handleLinkedCheckChange) : input.props.onChange;
    }
  };
  module.exports = LinkedValueUtils;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Function} cb
   * @return {?}
   */
  function createChainableTypeChecker(cb) {
    /**
     * @param {string} b
     * @param {!Object} n
     * @param {string} o
     * @param {!Object} level
     * @param {?} i
     * @return {?}
     */
    function f(b, n, o, level, i) {
      if (level = level || error, null == n[o]) {
        var pair = hash[i];
        return b ? new Error("Required " + pair + " `" + o + "` was not specified in " + ("`" + level + "`.")) : null;
      }
      return cb(n, o, level, i);
    }
    var explicitNull = f.bind(null, false);
    return explicitNull.isRequired = f.bind(null, true), explicitNull;
  }
  /**
   * @param {string} expectedType
   * @return {?}
   */
  function createPrimitiveTypeChecker(expectedType) {
    /**
     * @param {!Object} t
     * @param {string} i
     * @param {string} name
     * @param {?} o
     * @return {?}
     */
    function validate(t, i, name, o) {
      var value = t[i];
      var type = $(value);
      if (type !== expectedType) {
        var same = hash[o];
        var type = getPreciseType(value);
        return new Error("Invalid " + same + " `" + i + "` of type `" + type + "` " + ("supplied to `" + name + "`, expected `" + expectedType + "`."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @return {?}
   */
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }
  /**
   * @param {?} test
   * @return {?}
   */
  function createArrayOfTypeChecker(test) {
    /**
     * @param {!Object} t
     * @param {string} n
     * @param {string} e
     * @param {?} name
     * @return {?}
     */
    function validate(t, n, e, name) {
      var i = t[n];
      if (!Array.isArray(i)) {
        var arr = hash[name];
        var slideDom = $(i);
        return new Error("Invalid " + arr + " `" + n + "` of type " + ("`" + slideDom + "` supplied to `" + e + "`, expected an array."));
      }
      /** @type {number} */
      var h = 0;
      for (; h < i.length; h++) {
        var r = test(i, h, e, name);
        if (r instanceof Error) {
          return r;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @return {?}
   */
  function createElementTypeChecker() {
    /**
     * @param {!Object} routes
     * @param {string} i
     * @param {string} options
     * @param {?} prop
     * @return {?}
     */
    function validate(routes, i, options, prop) {
      if (!React.isValidElement(routes[i])) {
        var val = hash[prop];
        return new Error("Invalid " + val + " `" + i + "` supplied to " + ("`" + options + "`, expected a ReactElement."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @param {!Object} expectedClass
   * @return {?}
   */
  function createInstanceTypeChecker(expectedClass) {
    /**
     * @param {!Object} props
     * @param {string} propName
     * @param {string} val
     * @param {?} o
     * @return {?}
     */
    function validate(props, propName, val, o) {
      if (!(props[propName] instanceof expectedClass)) {
        var same = hash[o];
        var message = expectedClass.name || error;
        return new Error("Invalid " + same + " `" + propName + "` supplied to " + ("`" + val + "`, expected instance of `" + message + "`."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @param {string} ua
   * @return {?}
   */
  function createEnumTypeChecker(ua) {
    /**
     * @param {!Object} fields
     * @param {string} k
     * @param {string} t
     * @param {?} o
     * @return {?}
     */
    function validate(fields, k, t, o) {
      var y = fields[k];
      /** @type {number} */
      var i = 0;
      for (; i < ua.length; i++) {
        if (y === ua[i]) {
          return null;
        }
      }
      var same = hash[o];
      /** @type {string} */
      var isDangkr = JSON.stringify(ua);
      return new Error("Invalid " + same + " `" + k + "` of value `" + y + "` " + ("supplied to `" + t + "`, expected one of " + isDangkr + "."));
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @param {?} format
   * @return {?}
   */
  function createObjectOfTypeChecker(format) {
    /**
     * @param {!Object} next
     * @param {string} direction
     * @param {string} name
     * @param {?} o
     * @return {?}
     */
    function validate(next, direction, name, o) {
      var i = next[direction];
      var marker = $(i);
      if ("object" !== marker) {
        var same = hash[o];
        return new Error("Invalid " + same + " `" + direction + "` of type " + ("`" + marker + "` supplied to `" + name + "`, expected an object."));
      }
      var j;
      for (j in i) {
        if (i.hasOwnProperty(j)) {
          var result = format(i, j, name, o);
          if (result instanceof Error) {
            return result;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @param {!NodeList} arrayOfTypeCheckers
   * @return {?}
   */
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    /**
     * @param {?} name
     * @param {string} event
     * @param {string} source
     * @param {?} o
     * @return {?}
     */
    function validate(name, event, source, o) {
      /** @type {number} */
      var i = 0;
      for (; i < arrayOfTypeCheckers.length; i++) {
        var format = arrayOfTypeCheckers[i];
        if (null == format(name, event, source, o)) {
          return null;
        }
      }
      var same = hash[o];
      return new Error("Invalid " + same + " `" + event + "` supplied to " + ("`" + source + "`."));
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @return {?}
   */
  function createNodeChecker() {
    /**
     * @param {!Object} model
     * @param {string} field
     * @param {string} all
     * @param {?} key
     * @return {?}
     */
    function validate(model, field, all, key) {
      if (!validate(model[field])) {
        var len = hash[key];
        return new Error("Invalid " + len + " `" + field + "` supplied to " + ("`" + all + "`, expected a ReactNode."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @param {!Object} array
   * @return {?}
   */
  function createShapeTypeChecker(array) {
    /**
     * @param {!Object} c
     * @param {string} n
     * @param {string} v
     * @param {?} d
     * @return {?}
     */
    function validate(c, n, v, d) {
      var node = c[n];
      var marker = $(node);
      if ("object" !== marker) {
        var len = hash[d];
        return new Error("Invalid " + len + " `" + n + "` of type `" + marker + "` " + ("supplied to `" + v + "`, expected `object`."));
      }
      var a;
      for (a in array) {
        var o = array[a];
        if (o) {
          var r = o(node, a, v, d);
          if (r) {
            return r;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function validate(obj) {
    switch(typeof obj) {
      case "number":
      case "string":
      case "undefined":
        return true;
      case "boolean":
        return !obj;
      case "object":
        if (Array.isArray(obj)) {
          return obj.every(validate);
        }
        if (null === obj || React.isValidElement(obj)) {
          return true;
        }
        obj = ReactFragment.extractIfFragment(obj);
        var prop;
        for (prop in obj) {
          if (!validate(obj[prop])) {
            return false;
          }
        }
        return true;
      default:
        return false;
    }
  }
  /**
   * @param {!Object} v
   * @return {?}
   */
  function $(v) {
    /** @type {string} */
    var value = typeof v;
    return Array.isArray(v) ? "array" : v instanceof RegExp ? "object" : value;
  }
  /**
   * @param {!Object} propValue
   * @return {?}
   */
  function getPreciseType(propValue) {
    var propType = $(propValue);
    if ("object" === propType) {
      if (propValue instanceof Date) {
        return "date";
      }
      if (propValue instanceof RegExp) {
        return "regexp";
      }
    }
    return propType;
  }
  var React = require(13);
  var ReactFragment = require(12);
  var hash = require(36);
  var emptyFunction = require(15);
  /** @type {string} */
  var error = "<<anonymous>>";
  var this_area = createElementTypeChecker();
  var setStateUsage = createNodeChecker();
  var PropTypes = {
    array : createPrimitiveTypeChecker("array"),
    bool : createPrimitiveTypeChecker("boolean"),
    func : createPrimitiveTypeChecker("function"),
    number : createPrimitiveTypeChecker("number"),
    object : createPrimitiveTypeChecker("object"),
    string : createPrimitiveTypeChecker("string"),
    any : createAnyTypeChecker(),
    arrayOf : createArrayOfTypeChecker,
    element : this_area,
    instanceOf : createInstanceTypeChecker,
    node : setStateUsage,
    objectOf : createObjectOfTypeChecker,
    oneOf : createEnumTypeChecker,
    oneOfType : createUnionTypeChecker,
    shape : createShapeTypeChecker
  };
  module.exports = PropTypes;
}, function(module, canCreateDiscussions, require) {
  var KeybindMixin = require(96);
  var ReactClass = require(39);
  var React = require(13);
  var option = (require(14), React.createFactory("option"));
  var storeMixin = ReactClass.createClass({
    displayName : "ReactDOMOption",
    tagName : "OPTION",
    mixins : [KeybindMixin],
    componentWillMount : function() {
    },
    render : function() {
      return option(this.props, this.props.children);
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function value() {
    if (this._pendingUpdate) {
      /** @type {boolean} */
      this._pendingUpdate = false;
      var currentPageFirstWord = LinkedValueUtils.getValue(this);
      if (null != currentPageFirstWord && this.isMounted()) {
        set(this, currentPageFirstWord);
      }
    }
  }
  /**
   * @param {!Object} obj
   * @param {number} key
   * @param {number} bit
   * @return {?}
   */
  function v(obj, key, bit) {
    if (null == obj[key]) {
      return null;
    }
    if (obj.multiple) {
      if (!Array.isArray(obj[key])) {
        return new Error("The `" + key + "` prop supplied to <select> must be an array if `multiple` is true.");
      }
    } else {
      if (Array.isArray(obj[key])) {
        return new Error("The `" + key + "` prop supplied to <select> must be a scalar value if `multiple` is false.");
      }
    }
  }
  /**
   * @param {!Object} a
   * @param {?} v
   * @return {?}
   */
  function set(a, v) {
    var result;
    var i;
    var l;
    var options = a.getDOMNode().options;
    if (a.props.multiple) {
      result = {};
      /** @type {number} */
      i = 0;
      l = v.length;
      for (; l > i; i++) {
        /** @type {boolean} */
        result["" + v[i]] = true;
      }
      /** @type {number} */
      i = 0;
      l = options.length;
      for (; l > i; i++) {
        /** @type {boolean} */
        var selected = result.hasOwnProperty(options[i].value);
        if (options[i].selected !== selected) {
          /** @type {boolean} */
          options[i].selected = selected;
        }
      }
    } else {
      /** @type {string} */
      result = "" + v;
      /** @type {number} */
      i = 0;
      l = options.length;
      for (; l > i; i++) {
        if (options[i].value === result) {
          return void(options[i].selected = true);
        }
      }
      if (options.length) {
        /** @type {boolean} */
        options[0].selected = true;
      }
    }
  }
  var KeybindMixin = require(118);
  var LinkedValueUtils = require(123);
  var ReactBrowserComponentMixin = require(96);
  var React = require(39);
  var filter = require(13);
  var $ = require(28);
  var extend = require(17);
  var input = filter.createFactory("select");
  var storeMixin = React.createClass({
    displayName : "ReactDOMSelect",
    tagName : "SELECT",
    mixins : [KeybindMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
    propTypes : {
      defaultValue : v,
      value : v
    },
    render : function() {
      var props = extend({}, this.props);
      return props.onChange = this._handleChange, props.value = null, input(props, this.props.children);
    },
    componentWillMount : function() {
      /** @type {boolean} */
      this._pendingUpdate = false;
    },
    componentDidMount : function() {
      var currentPageFirstWord = LinkedValueUtils.getValue(this);
      if (null != currentPageFirstWord) {
        set(this, currentPageFirstWord);
      } else {
        if (null != this.props.defaultValue) {
          set(this, this.props.defaultValue);
        }
      }
    },
    componentDidUpdate : function(nextProps) {
      var currentPageFirstWord = LinkedValueUtils.getValue(this);
      if (null != currentPageFirstWord) {
        /** @type {boolean} */
        this._pendingUpdate = false;
        set(this, currentPageFirstWord);
      } else {
        if (!nextProps.multiple != !this.props.multiple) {
          if (null != this.props.defaultValue) {
            set(this, this.props.defaultValue);
          } else {
            set(this, this.props.multiple ? [] : "");
          }
        }
      }
    },
    _handleChange : function(event) {
      var ch;
      var node = LinkedValueUtils.getOnChange(this);
      return node && (ch = node.call(this, event)), this._pendingUpdate = true, $.asap(value, this), ch;
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function forceUpdateIfMounted() {
    if (this.isMounted()) {
      this.forceUpdate();
    }
  }
  var KeybindMixin = require(118);
  var DOMPropertyOperations = require(45);
  var LinkedValueUtils = require(123);
  var ReactBrowserComponentMixin = require(96);
  var ReactClass = require(39);
  var React = require(13);
  var ReactUpdates = require(28);
  var extend = require(17);
  var mapObject = require(9);
  var textarea = (require(14), React.createFactory("textarea"));
  var storeMixin = ReactClass.createClass({
    displayName : "ReactDOMTextarea",
    tagName : "TEXTAREA",
    mixins : [KeybindMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
    getInitialState : function() {
      var value = this.props.defaultValue;
      var content = this.props.children;
      if (null != content) {
        mapObject(null == value);
        if (Array.isArray(content)) {
          mapObject(content.length <= 1);
          content = content[0];
        }
        /** @type {string} */
        value = "" + content;
      }
      if (null == value) {
        /** @type {string} */
        value = "";
      }
      var name = LinkedValueUtils.getValue(this);
      return {
        initialValue : "" + (null != name ? name : value)
      };
    },
    render : function() {
      var props = extend({}, this.props);
      return mapObject(null == props.dangerouslySetInnerHTML), props.defaultValue = null, props.value = null, props.onChange = this._handleChange, textarea(props, this.state.initialValue);
    },
    componentDidUpdate : function(nextProps, state, prevState) {
      var value = LinkedValueUtils.getValue(this);
      if (null != value) {
        var rootNode = this.getDOMNode();
        DOMPropertyOperations.setValueForProperty(rootNode, "value", "" + value);
      }
    },
    _handleChange : function(event) {
      var ch;
      var node = LinkedValueUtils.getOnChange(this);
      return node && (ch = node.call(this, event)), ReactUpdates.asap(forceUpdateIfMounted, this), ch;
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} node
   * @return {?}
   */
  function findParent(node) {
    var nodeID = ReactMount.getID(node);
    var id = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
    var container = ReactMount.findReactContainerForID(id);
    var parent = ReactMount.getFirstReactDOM(container);
    return parent;
  }
  /**
   * @param {!AudioNode} topLevelType
   * @param {!Object} nativeEvent
   * @return {undefined}
   */
  function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
    /** @type {!AudioNode} */
    this.topLevelType = topLevelType;
    /** @type {!Object} */
    this.nativeEvent = nativeEvent;
    /** @type {!Array} */
    this.ancestors = [];
  }
  /**
   * @param {!Object} bookKeeping
   * @return {undefined}
   */
  function handleTopLevelImpl(bookKeeping) {
    var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;
    var ancestor = topLevelTarget;
    for (; ancestor;) {
      bookKeeping.ancestors.push(ancestor);
      ancestor = findParent(ancestor);
    }
    /** @type {number} */
    var i = 0;
    var length = bookKeeping.ancestors.length;
    for (; length > i; i++) {
      topLevelTarget = bookKeeping.ancestors[i];
      var topLevelTargetID = ReactMount.getID(topLevelTarget) || "";
      ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent);
    }
  }
  /**
   * @param {?} cb
   * @return {undefined}
   */
  function scrollValueMonitor(cb) {
    var scrollPosition = getUnboundedScrollPosition(window);
    cb(scrollPosition);
  }
  var EventListener = require(129);
  var ExecutionEnvironment = require(55);
  var PooledClass = require(11);
  var ReactInstanceHandles = require(21);
  var ReactMount = require(69);
  var ReactUpdates = require(28);
  var assign = require(17);
  var getEventTarget = require(104);
  var getUnboundedScrollPosition = require(130);
  assign(TopLevelCallbackBookKeeping.prototype, {
    destructor : function() {
      /** @type {null} */
      this.topLevelType = null;
      /** @type {null} */
      this.nativeEvent = null;
      /** @type {number} */
      this.ancestors.length = 0;
    }
  });
  PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);
  var ReactEventListener = {
    _enabled : true,
    _handleTopLevel : null,
    WINDOW_HANDLE : ExecutionEnvironment.canUseDOM ? window : null,
    setHandleTopLevel : function(handleTopLevel) {
      ReactEventListener._handleTopLevel = handleTopLevel;
    },
    setEnabled : function(enable) {
      /** @type {boolean} */
      ReactEventListener._enabled = !!enable;
    },
    isEnabled : function() {
      return ReactEventListener._enabled;
    },
    trapBubbledEvent : function(topLevelType, type, handle) {
      var element = handle;
      return element ? EventListener.listen(element, type, ReactEventListener.dispatchEvent.bind(null, topLevelType)) : null;
    },
    trapCapturedEvent : function(topLevelType, handlerBaseName, handle) {
      var element = handle;
      return element ? EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType)) : null;
    },
    monitorScrollValue : function(refresh) {
      var callback = scrollValueMonitor.bind(null, refresh);
      EventListener.listen(window, "scroll", callback);
    },
    dispatchEvent : function(type, nativeEvent) {
      if (ReactEventListener._enabled) {
        var event = TopLevelCallbackBookKeeping.getPooled(type, nativeEvent);
        try {
          ReactUpdates.batchedUpdates(handleTopLevelImpl, event);
        } finally {
          TopLevelCallbackBookKeeping.release(event);
        }
      }
    }
  };
  module.exports = ReactEventListener;
}, function(module, canCreateDiscussions, getFilename) {
  var label = getFilename(15);
  var EventListener = {
    listen : function(target, type, fn) {
      return target.addEventListener ? (target.addEventListener(type, fn, false), {
        remove : function() {
          target.removeEventListener(type, fn, false);
        }
      }) : target.attachEvent ? (target.attachEvent("on" + type, fn), {
        remove : function() {
          target.detachEvent("on" + type, fn);
        }
      }) : void 0;
    },
    capture : function(e, item, val) {
      return e.addEventListener ? (e.addEventListener(item, val, true), {
        remove : function() {
          e.removeEventListener(item, val, true);
        }
      }) : {
        remove : label
      };
    },
    registerDefault : function() {
    }
  };
  module.exports = EventListener;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function on(obj) {
    return obj === window ? {
      x : window.pageXOffset || document.documentElement.scrollLeft,
      y : window.pageYOffset || document.documentElement.scrollTop
    } : {
      x : obj.scrollLeft,
      y : obj.scrollTop
    };
  }
  /** @type {function(!Object): ?} */
  module.exports = on;
}, function(module, canCreateDiscussions, require) {
  var app = require(46);
  var ReactUpdates = require(71);
  var options = require(87);
  var message = require(39);
  var registry = require(78);
  var DOMProperty = require(70);
  var config = require(37);
  var computed = require(89);
  var ReactDOMComponent = require(30);
  var EventPluginUtils = require(22);
  var EventPluginHub = require(28);
  var mock = {
    Component : options.injection,
    Class : message.injection,
    DOMComponent : computed.injection,
    DOMProperty : app.injection,
    EmptyComponent : registry.injection,
    EventPluginHub : ReactUpdates.injection,
    EventEmitter : DOMProperty.injection,
    NativeComponent : config.injection,
    Perf : ReactDOMComponent.injection,
    RootIndex : EventPluginUtils.injection,
    Updates : EventPluginHub.injection
  };
  module.exports = mock;
}, function(mixin, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function ReactUMGReconcileTransaction() {
    this.reinitializeTransaction();
    /** @type {boolean} */
    this.renderToStaticMarkup = false;
    this.reactMountReady = ReactServerRenderingTransaction.getPooled(null);
    this.putListenerQueue = CallbackQueue.getPooled();
  }
  var ReactServerRenderingTransaction = require(29);
  var PooledClass = require(11);
  var AddonManager = require(70);
  var that = require(133);
  var CallbackQueue = require(137);
  var ReactDOMComponent = require(38);
  var assign = require(17);
  var UPDATE_QUEUEING = {
    initialize : that.getSelectionInformation,
    close : that.restoreSelection
  };
  var api = {
    initialize : function() {
      var e = AddonManager.isEnabled();
      return AddonManager.setEnabled(false), e;
    },
    close : function(id) {
      AddonManager.setEnabled(id);
    }
  };
  var ON_HARDWARE_READY_QUEUEING = {
    initialize : function() {
      this.reactMountReady.reset();
    },
    close : function() {
      this.reactMountReady.notifyAll();
    }
  };
  var ON_UMG_READY_QUEUEING = {
    initialize : function() {
      this.putListenerQueue.reset();
    },
    close : function() {
      this.putListenerQueue.putListeners();
    }
  };
  /** @type {!Array} */
  var TRANSACTION_WRAPPERS = [ON_UMG_READY_QUEUEING, UPDATE_QUEUEING, api, ON_HARDWARE_READY_QUEUEING];
  var capitalizedOpts = {
    getTransactionWrappers : function() {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady : function() {
      return this.reactMountReady;
    },
    getPutListenerQueue : function() {
      return this.putListenerQueue;
    },
    destructor : function() {
      ReactServerRenderingTransaction.release(this.reactMountReady);
      /** @type {null} */
      this.reactMountReady = null;
      CallbackQueue.release(this.putListenerQueue);
      /** @type {null} */
      this.putListenerQueue = null;
    }
  };
  assign(ReactUMGReconcileTransaction.prototype, ReactDOMComponent.Mixin, capitalizedOpts);
  PooledClass.addPoolingTo(ReactUMGReconcileTransaction);
  /** @type {function(): undefined} */
  mixin.exports = ReactUMGReconcileTransaction;
}, function(mixin, canCreateDiscussions, require) {
  /**
   * @param {?} node
   * @return {?}
   */
  function isInDocument(node) {
    return containsNode(document.documentElement, node);
  }
  var self = require(134);
  var containsNode = require(81);
  var focusNode = require(119);
  var getActiveElement = require(136);
  var ReactInputSelection = {
    hasSelectionCapabilities : function(elem) {
      return elem && ("INPUT" === elem.nodeName && "text" === elem.type || "TEXTAREA" === elem.nodeName || "true" === elem.contentEditable);
    },
    getSelectionInformation : function() {
      var focusedElem = getActiveElement();
      return {
        focusedElem : focusedElem,
        selectionRange : ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
      };
    },
    restoreSelection : function(priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
        if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
          ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
        }
        focusNode(priorFocusedElem);
      }
    },
    getSelection : function(input) {
      var selection;
      if ("selectionStart" in input) {
        selection = {
          start : input.selectionStart,
          end : input.selectionEnd
        };
      } else {
        if (document.selection && "INPUT" === input.nodeName) {
          /** @type {(ControlRange|TextRange|null)} */
          var ieRange = document.selection.createRange();
          if (ieRange.parentElement() === input) {
            selection = {
              start : -ieRange.moveStart("character", -input.value.length),
              end : -ieRange.moveEnd("character", -input.value.length)
            };
          }
        } else {
          selection = self.getOffsets(input);
        }
      }
      return selection || {
        start : 0,
        end : 0
      };
    },
    setSelection : function(input, offsets) {
      var start = offsets.start;
      var end = offsets.end;
      if ("undefined" == typeof end && (end = start), "selectionStart" in input) {
        input.selectionStart = start;
        /** @type {number} */
        input.selectionEnd = Math.min(end, input.value.length);
      } else {
        if (document.selection && "INPUT" === input.nodeName) {
          var range = input.createTextRange();
          range.collapse(true);
          range.moveStart("character", start);
          range.moveEnd("character", end - start);
          range.select();
        } else {
          self.setOffsets(input, offsets);
        }
      }
    }
  };
  mixin.exports = ReactInputSelection;
}, function(module, canCreateDiscussions, __webpack_require__) {
  /**
   * @param {!Node} startNode
   * @param {number} startOffset
   * @param {!Node} endNode
   * @param {number} endOffset
   * @return {?}
   */
  function getNodeRangeClientRect(startNode, startOffset, endNode, endOffset) {
    return startNode === endNode && startOffset === endOffset;
  }
  /**
   * @param {!HTMLElement} field
   * @return {?}
   */
  function getCaret(field) {
    /** @type {(Selection|null)} */
    var sel = document.selection;
    /** @type {(ControlRange|TextRange|null)} */
    var range = sel.createRange();
    /** @type {number} */
    var i = range.text.length;
    var testRange = range.duplicate();
    testRange.moveToElementText(field);
    testRange.setEndPoint("EndToStart", range);
    var index = testRange.text.length;
    var a = index + i;
    return {
      start : index,
      end : a
    };
  }
  /**
   * @param {!HTMLElement} child
   * @return {?}
   */
  function position(child) {
    /** @type {(Selection|null)} */
    var selection = window.getSelection && window.getSelection();
    if (!selection || 0 === selection.rangeCount) {
      return null;
    }
    /** @type {(Node|null)} */
    var anchorNode = selection.anchorNode;
    /** @type {number} */
    var anchorOffset = selection.anchorOffset;
    /** @type {(Node|null)} */
    var focusNode = selection.focusNode;
    /** @type {number} */
    var focusOffset = selection.focusOffset;
    /** @type {(Range|null)} */
    var me = selection.getRangeAt(0);
    var wordRounded = getNodeRangeClientRect(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
    /** @type {number} */
    var matchLen = wordRounded ? 0 : me.toString().length;
    /** @type {(Range|null)} */
    var range = me.cloneRange();
    range.selectNodeContents(child);
    range.setEnd(me.startContainer, me.startOffset);
    var isTempRangeCollapsed = getNodeRangeClientRect(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
    /** @type {number} */
    var start = isTempRangeCollapsed ? 0 : range.toString().length;
    /** @type {number} */
    var end = start + matchLen;
    /** @type {(Range|null)} */
    var detectionRange = document.createRange();
    detectionRange.setStart(anchorNode, anchorOffset);
    detectionRange.setEnd(focusNode, focusOffset);
    /** @type {boolean} */
    var isBackward = detectionRange.collapsed;
    return {
      start : isBackward ? end : start,
      end : isBackward ? start : end
    };
  }
  /**
   * @param {!Object} elem
   * @param {!Object} options
   * @return {undefined}
   */
  function getSelection(elem, options) {
    var start;
    var end;
    var range = document.selection.createRange().duplicate();
    if ("undefined" == typeof options.end) {
      start = options.start;
      end = start;
    } else {
      if (options.start > options.end) {
        start = options.end;
        end = options.start;
      } else {
        start = options.start;
        end = options.end;
      }
    }
    range.moveToElementText(elem);
    range.moveStart("character", start);
    range.setEndPoint("EndToStart", range);
    range.moveEnd("character", end - start);
    range.select();
  }
  /**
   * @param {!Object} data
   * @param {!Object} offsets
   * @return {undefined}
   */
  function setSelection(data, offsets) {
    if (window.getSelection) {
      /** @type {(Selection|null)} */
      var selection = window.getSelection();
      var i = data[get()].length;
      /** @type {number} */
      var j = Math.min(offsets.start, i);
      /** @type {number} */
      var k = "undefined" == typeof offsets.end ? j : Math.min(offsets.end, i);
      if (!selection.extend && j > k) {
        /** @type {number} */
        var a = k;
        /** @type {number} */
        k = j;
        /** @type {number} */
        j = a;
      }
      var s = $(data, j);
      var e = $(data, k);
      if (s && e) {
        /** @type {(Range|null)} */
        var range = document.createRange();
        range.setStart(s.node, s.offset);
        selection.removeAllRanges();
        if (j > k) {
          selection.addRange(range);
          selection.extend(e.node, e.offset);
        } else {
          range.setEnd(e.node, e.offset);
          selection.addRange(range);
        }
      }
    }
  }
  var ExecutionEnvironment = __webpack_require__(55);
  var $ = __webpack_require__(135);
  var get = __webpack_require__(101);
  var user = ExecutionEnvironment.canUseDOM && "selection" in document && !("getSelection" in window);
  var BinaryBundle = {
    getOffsets : user ? getCaret : position,
    setOffsets : user ? getSelection : setSelection
  };
  module.exports = BinaryBundle;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!HTMLElement} child
   * @return {?}
   */
  function resolve(child) {
    for (; child && child.firstChild;) {
      child = child.firstChild;
    }
    return child;
  }
  /**
   * @param {!Object} elem
   * @return {?}
   */
  function next(elem) {
    for (; elem;) {
      if (elem.nextSibling) {
        return elem.nextSibling;
      }
      elem = elem.parentNode;
    }
  }
  /**
   * @param {!Object} obj
   * @param {number} index
   * @return {?}
   */
  function render(obj, index) {
    var value = resolve(obj);
    /** @type {number} */
    var start = 0;
    /** @type {number} */
    var offset = 0;
    for (; value;) {
      if (3 === value.nodeType) {
        if (offset = start + value.textContent.length, index >= start && offset >= index) {
          return {
            node : value,
            offset : index - start
          };
        }
        start = offset;
      }
      value = resolve(next(value));
    }
  }
  /** @type {function(!Object, number): ?} */
  module.exports = render;
}, function(mixin, canCreateDiscussions, n) {
  /**
   * @return {?}
   */
  function getActiveElement() {
    try {
      return document.activeElement || document.body;
    } catch (e) {
      return document.body;
    }
  }
  /** @type {function(): ?} */
  mixin.exports = getActiveElement;
}, function(globalContext, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function Class() {
    /** @type {!Array} */
    this.listenersToPut = [];
  }
  var PooledClass = require(11);
  var EventPluginHub = require(70);
  var extend = require(17);
  extend(Class.prototype, {
    enqueuePutListener : function(rootNodeID, propKey, propValue) {
      this.listenersToPut.push({
        rootNodeID : rootNodeID,
        propKey : propKey,
        propValue : propValue
      });
    },
    putListeners : function() {
      /** @type {number} */
      var i = 0;
      for (; i < this.listenersToPut.length; i++) {
        var listenerToPut = this.listenersToPut[i];
        EventPluginHub.putListener(listenerToPut.rootNodeID, listenerToPut.propKey, listenerToPut.propValue);
      }
    },
    reset : function() {
      /** @type {number} */
      this.listenersToPut.length = 0;
    },
    destructor : function() {
      this.reset();
    }
  });
  PooledClass.addPoolingTo(Class);
  /** @type {function(): undefined} */
  globalContext.exports = Class;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} node
   * @return {?}
   */
  function getSelection(node) {
    if ("selectionStart" in node && ReactInputSelection.hasSelectionCapabilities(node)) {
      return {
        start : node.selectionStart,
        end : node.selectionEnd
      };
    }
    if (window.getSelection) {
      /** @type {(Selection|null)} */
      var selection = window.getSelection();
      return {
        anchorNode : selection.anchorNode,
        anchorOffset : selection.anchorOffset,
        focusNode : selection.focusNode,
        focusOffset : selection.focusOffset
      };
    }
    if (document.selection) {
      /** @type {(ControlRange|TextRange|null)} */
      var range = document.selection.createRange();
      return {
        parentElement : range.parentElement(),
        text : range.text,
        top : range.boundingTop,
        left : range.boundingLeft
      };
    }
  }
  /**
   * @param {!Event} nativeEvent
   * @return {?}
   */
  function render(nativeEvent) {
    if (_returnTypeIsObject || null == activeElement || activeElement !== mapFragmentAndProps()) {
      return null;
    }
    var currentSelection = getSelection(activeElement);
    if (!TreeRoot || !traverse(TreeRoot, currentSelection)) {
      TreeRoot = currentSelection;
      var event = SyntheticEvent.getPooled(eventTypes.select, activeElementID, nativeEvent);
      return event.type = "select", event.target = activeElement, EventPropagators.accumulateTwoPhaseDispatches(event), event;
    }
  }
  var EventConstants = require(7);
  var EventPropagators = require(99);
  var ReactInputSelection = require(133);
  var SyntheticEvent = require(103);
  var mapFragmentAndProps = require(136);
  var isTextInputElement = require(107);
  var keyOf = require(41);
  var traverse = require(139);
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {
    select : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onSelect : null
        }),
        captured : keyOf({
          onSelectCapture : null
        })
      },
      dependencies : [topLevelTypes.topBlur, topLevelTypes.topContextMenu, topLevelTypes.topFocus, topLevelTypes.topKeyDown, topLevelTypes.topMouseDown, topLevelTypes.topMouseUp, topLevelTypes.topSelectionChange]
    }
  };
  /** @type {null} */
  var activeElement = null;
  /** @type {null} */
  var activeElementID = null;
  /** @type {null} */
  var TreeRoot = null;
  /** @type {boolean} */
  var _returnTypeIsObject = false;
  var SimpleEventPlugin = {
    eventTypes : eventTypes,
    extractEvents : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      switch(topLevelType) {
        case topLevelTypes.topFocus:
          if (isTextInputElement(topLevelTarget) || "true" === topLevelTarget.contentEditable) {
            /** @type {!Object} */
            activeElement = topLevelTarget;
            /** @type {!Object} */
            activeElementID = topLevelTargetID;
            /** @type {null} */
            TreeRoot = null;
          }
          break;
        case topLevelTypes.topBlur:
          /** @type {null} */
          activeElement = null;
          /** @type {null} */
          activeElementID = null;
          /** @type {null} */
          TreeRoot = null;
          break;
        case topLevelTypes.topMouseDown:
          /** @type {boolean} */
          _returnTypeIsObject = true;
          break;
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topMouseUp:
          return _returnTypeIsObject = false, render(nativeEvent);
        case topLevelTypes.topSelectionChange:
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          return render(nativeEvent);
      }
    }
  };
  module.exports = SimpleEventPlugin;
}, function(pkg, canCreateDiscussions, n) {
  /**
   * @param {!Object} str
   * @param {!Object} test
   * @return {?}
   */
  function index(str, test) {
    if (str === test) {
      return true;
    }
    var i;
    for (i in str) {
      if (str.hasOwnProperty(i) && (!test.hasOwnProperty(i) || str[i] !== test[i])) {
        return false;
      }
    }
    for (i in test) {
      if (test.hasOwnProperty(i) && !str.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }
  /** @type {function(!Object, !Object): ?} */
  pkg.exports = index;
}, function(module, canCreateDiscussions, n) {
  /** @type {number} */
  var maxPeaks = Math.pow(2, 53);
  var storeMixin = {
    createReactRootIndex : function() {
      return Math.ceil(Math.random() * maxPeaks);
    }
  };
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  var EventConstants = require(7);
  var EventPluginUtils = require(6);
  var EventPropagators = require(99);
  var SyntheticClipboardEvent = require(142);
  var SyntheticFocusEvent = require(103);
  var SyntheticDragEvent = require(143);
  var SyntheticTouchEvent = require(144);
  var SyntheticEvent = require(111);
  var SyntheticMouseEvent = require(147);
  var SyntheticWheelEvent = require(148);
  var SyntheticKeyboardEvent = require(112);
  var SyntheticUIEvent = require(149);
  var getEventCharCode = require(145);
  var invariant = require(9);
  var keyOf = require(41);
  var topLevelTypes = (require(14), EventConstants.topLevelTypes);
  var eventTypes = {
    blur : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onBlur : true
        }),
        captured : keyOf({
          onBlurCapture : true
        })
      }
    },
    click : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onClick : true
        }),
        captured : keyOf({
          onClickCapture : true
        })
      }
    },
    contextMenu : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onContextMenu : true
        }),
        captured : keyOf({
          onContextMenuCapture : true
        })
      }
    },
    copy : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onCopy : true
        }),
        captured : keyOf({
          onCopyCapture : true
        })
      }
    },
    cut : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onCut : true
        }),
        captured : keyOf({
          onCutCapture : true
        })
      }
    },
    doubleClick : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDoubleClick : true
        }),
        captured : keyOf({
          onDoubleClickCapture : true
        })
      }
    },
    drag : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDrag : true
        }),
        captured : keyOf({
          onDragCapture : true
        })
      }
    },
    dragEnd : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDragEnd : true
        }),
        captured : keyOf({
          onDragEndCapture : true
        })
      }
    },
    dragEnter : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDragEnter : true
        }),
        captured : keyOf({
          onDragEnterCapture : true
        })
      }
    },
    dragExit : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDragExit : true
        }),
        captured : keyOf({
          onDragExitCapture : true
        })
      }
    },
    dragLeave : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDragLeave : true
        }),
        captured : keyOf({
          onDragLeaveCapture : true
        })
      }
    },
    dragOver : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDragOver : true
        }),
        captured : keyOf({
          onDragOverCapture : true
        })
      }
    },
    dragStart : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDragStart : true
        }),
        captured : keyOf({
          onDragStartCapture : true
        })
      }
    },
    drop : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onDrop : true
        }),
        captured : keyOf({
          onDropCapture : true
        })
      }
    },
    focus : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onFocus : true
        }),
        captured : keyOf({
          onFocusCapture : true
        })
      }
    },
    input : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onInput : true
        }),
        captured : keyOf({
          onInputCapture : true
        })
      }
    },
    keyDown : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onKeyDown : true
        }),
        captured : keyOf({
          onKeyDownCapture : true
        })
      }
    },
    keyPress : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onKeyPress : true
        }),
        captured : keyOf({
          onKeyPressCapture : true
        })
      }
    },
    keyUp : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onKeyUp : true
        }),
        captured : keyOf({
          onKeyUpCapture : true
        })
      }
    },
    load : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onLoad : true
        }),
        captured : keyOf({
          onLoadCapture : true
        })
      }
    },
    error : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onError : true
        }),
        captured : keyOf({
          onErrorCapture : true
        })
      }
    },
    mouseDown : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onMouseDown : true
        }),
        captured : keyOf({
          onMouseDownCapture : true
        })
      }
    },
    mouseMove : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onMouseMove : true
        }),
        captured : keyOf({
          onMouseMoveCapture : true
        })
      }
    },
    mouseOut : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onMouseOut : true
        }),
        captured : keyOf({
          onMouseOutCapture : true
        })
      }
    },
    mouseOver : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onMouseOver : true
        }),
        captured : keyOf({
          onMouseOverCapture : true
        })
      }
    },
    mouseUp : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onMouseUp : true
        }),
        captured : keyOf({
          onMouseUpCapture : true
        })
      }
    },
    paste : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onPaste : true
        }),
        captured : keyOf({
          onPasteCapture : true
        })
      }
    },
    reset : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onReset : true
        }),
        captured : keyOf({
          onResetCapture : true
        })
      }
    },
    scroll : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onScroll : true
        }),
        captured : keyOf({
          onScrollCapture : true
        })
      }
    },
    submit : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onSubmit : true
        }),
        captured : keyOf({
          onSubmitCapture : true
        })
      }
    },
    touchCancel : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onTouchCancel : true
        }),
        captured : keyOf({
          onTouchCancelCapture : true
        })
      }
    },
    touchEnd : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onTouchEnd : true
        }),
        captured : keyOf({
          onTouchEndCapture : true
        })
      }
    },
    touchMove : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onTouchMove : true
        }),
        captured : keyOf({
          onTouchMoveCapture : true
        })
      }
    },
    touchStart : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onTouchStart : true
        }),
        captured : keyOf({
          onTouchStartCapture : true
        })
      }
    },
    wheel : {
      phasedRegistrationNames : {
        bubbled : keyOf({
          onWheel : true
        }),
        captured : keyOf({
          onWheelCapture : true
        })
      }
    }
  };
  var topLevelEventsToDispatchConfig = {
    topBlur : eventTypes.blur,
    topClick : eventTypes.click,
    topContextMenu : eventTypes.contextMenu,
    topCopy : eventTypes.copy,
    topCut : eventTypes.cut,
    topDoubleClick : eventTypes.doubleClick,
    topDrag : eventTypes.drag,
    topDragEnd : eventTypes.dragEnd,
    topDragEnter : eventTypes.dragEnter,
    topDragExit : eventTypes.dragExit,
    topDragLeave : eventTypes.dragLeave,
    topDragOver : eventTypes.dragOver,
    topDragStart : eventTypes.dragStart,
    topDrop : eventTypes.drop,
    topError : eventTypes.error,
    topFocus : eventTypes.focus,
    topInput : eventTypes.input,
    topKeyDown : eventTypes.keyDown,
    topKeyPress : eventTypes.keyPress,
    topKeyUp : eventTypes.keyUp,
    topLoad : eventTypes.load,
    topMouseDown : eventTypes.mouseDown,
    topMouseMove : eventTypes.mouseMove,
    topMouseOut : eventTypes.mouseOut,
    topMouseOver : eventTypes.mouseOver,
    topMouseUp : eventTypes.mouseUp,
    topPaste : eventTypes.paste,
    topReset : eventTypes.reset,
    topScroll : eventTypes.scroll,
    topSubmit : eventTypes.submit,
    topTouchCancel : eventTypes.touchCancel,
    topTouchEnd : eventTypes.touchEnd,
    topTouchMove : eventTypes.touchMove,
    topTouchStart : eventTypes.touchStart,
    topWheel : eventTypes.wheel
  };
  var type;
  for (type in topLevelEventsToDispatchConfig) {
    /** @type {!Array} */
    topLevelEventsToDispatchConfig[type].dependencies = [type];
  }
  var SimpleEventPlugin = {
    eventTypes : eventTypes,
    executeDispatch : function(event, listener, domID) {
      var returnValue = EventPluginUtils.executeDispatch(event, listener, domID);
      if (returnValue === false) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    extractEvents : function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
      if (!dispatchConfig) {
        return null;
      }
      var EventConstructor;
      switch(topLevelType) {
        case topLevelTypes.topInput:
        case topLevelTypes.topLoad:
        case topLevelTypes.topError:
        case topLevelTypes.topReset:
        case topLevelTypes.topSubmit:
          EventConstructor = SyntheticFocusEvent;
          break;
        case topLevelTypes.topKeyPress:
          if (0 === getEventCharCode(nativeEvent)) {
            return null;
          }
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          EventConstructor = SyntheticTouchEvent;
          break;
        case topLevelTypes.topBlur:
        case topLevelTypes.topFocus:
          EventConstructor = SyntheticDragEvent;
          break;
        case topLevelTypes.topClick:
          if (2 === nativeEvent.button) {
            return null;
          }
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topDoubleClick:
        case topLevelTypes.topMouseDown:
        case topLevelTypes.topMouseMove:
        case topLevelTypes.topMouseOut:
        case topLevelTypes.topMouseOver:
        case topLevelTypes.topMouseUp:
          EventConstructor = SyntheticEvent;
          break;
        case topLevelTypes.topDrag:
        case topLevelTypes.topDragEnd:
        case topLevelTypes.topDragEnter:
        case topLevelTypes.topDragExit:
        case topLevelTypes.topDragLeave:
        case topLevelTypes.topDragOver:
        case topLevelTypes.topDragStart:
        case topLevelTypes.topDrop:
          EventConstructor = SyntheticMouseEvent;
          break;
        case topLevelTypes.topTouchCancel:
        case topLevelTypes.topTouchEnd:
        case topLevelTypes.topTouchMove:
        case topLevelTypes.topTouchStart:
          EventConstructor = SyntheticWheelEvent;
          break;
        case topLevelTypes.topScroll:
          EventConstructor = SyntheticKeyboardEvent;
          break;
        case topLevelTypes.topWheel:
          EventConstructor = SyntheticUIEvent;
          break;
        case topLevelTypes.topCopy:
        case topLevelTypes.topCut:
        case topLevelTypes.topPaste:
          EventConstructor = SyntheticClipboardEvent;
      }
      invariant(EventConstructor);
      var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent);
      return EventPropagators.accumulateTwoPhaseDispatches(event), event;
    }
  };
  module.exports = SimpleEventPlugin;
}, function(task, canCreateDiscussions, keyGen) {
  /**
   * @param {!Object} obj
   * @param {string} key
   * @param {?} opt
   * @return {undefined}
   */
  function r(obj, key, opt) {
    o.call(this, obj, key, opt);
  }
  var o = keyGen(103);
  var cell_data = {
    clipboardData : function(event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData;
    }
  };
  o.augmentClass(r, cell_data);
  /** @type {function(!Object, string, ?): undefined} */
  task.exports = r;
}, function(task, canCreateDiscussions, keyGen) {
  /**
   * @param {!Object} obj
   * @param {string} key
   * @param {?} opt
   * @return {undefined}
   */
  function r(obj, key, opt) {
    o.call(this, obj, key, opt);
  }
  var o = keyGen(112);
  var cell_data = {
    relatedTarget : null
  };
  o.augmentClass(r, cell_data);
  /** @type {function(!Object, string, ?): undefined} */
  task.exports = r;
}, function(pkg, canCreateDiscussions, require) {
  /**
   * @param {!Object} str
   * @param {string} type
   * @param {?} i
   * @return {undefined}
   */
  function index(str, type, i) {
    util.call(this, str, type, i);
  }
  var util = require(112);
  var exec = require(145);
  var a = require(146);
  var TagHourlyStat = require(113);
  var options = {
    key : a,
    location : null,
    ctrlKey : null,
    shiftKey : null,
    altKey : null,
    metaKey : null,
    repeat : null,
    locale : null,
    getModifierState : TagHourlyStat,
    charCode : function(event) {
      return "keypress" === event.type ? exec(event) : 0;
    },
    keyCode : function(e) {
      return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    },
    which : function(e) {
      return "keypress" === e.type ? exec(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    }
  };
  util.augmentClass(index, options);
  /** @type {function(!Object, string, ?): undefined} */
  pkg.exports = index;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} o
   * @return {?}
   */
  function KeyEvent(o) {
    var key;
    var value = o.keyCode;
    return "charCode" in o ? (key = o.charCode, 0 === key && 13 === value && (key = 13)) : key = value, key >= 32 || 13 === key ? key : 0;
  }
  /** @type {function(!Object): ?} */
  module.exports = KeyEvent;
}, function(exports, canCreateDiscussions, keysFunc) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function getKey(obj) {
    if (obj.key) {
      var Delete = keyFixTable[obj.key] || obj.key;
      if ("Unidentified" !== Delete) {
        return Delete;
      }
    }
    if ("keypress" === obj.type) {
      var key = keys(obj);
      return 13 === key ? "Enter" : String.fromCharCode(key);
    }
    return "keydown" === obj.type || "keyup" === obj.type ? map[obj.keyCode] || "Unidentified" : "";
  }
  var keys = keysFunc(145);
  var keyFixTable = {
    Esc : "Escape",
    Spacebar : " ",
    Left : "ArrowLeft",
    Up : "ArrowUp",
    Right : "ArrowRight",
    Down : "ArrowDown",
    Del : "Delete",
    Win : "OS",
    Menu : "ContextMenu",
    Apps : "ContextMenu",
    Scroll : "ScrollLock",
    MozPrintableKey : "Unidentified"
  };
  var map = {
    8 : "Backspace",
    9 : "Tab",
    12 : "Clear",
    13 : "Enter",
    16 : "Shift",
    17 : "Control",
    18 : "Alt",
    19 : "Pause",
    20 : "CapsLock",
    27 : "Escape",
    32 : " ",
    33 : "PageUp",
    34 : "PageDown",
    35 : "End",
    36 : "Home",
    37 : "ArrowLeft",
    38 : "ArrowUp",
    39 : "ArrowRight",
    40 : "ArrowDown",
    45 : "Insert",
    46 : "Delete",
    112 : "F1",
    113 : "F2",
    114 : "F3",
    115 : "F4",
    116 : "F5",
    117 : "F6",
    118 : "F7",
    119 : "F8",
    120 : "F9",
    121 : "F10",
    122 : "F11",
    123 : "F12",
    144 : "NumLock",
    145 : "ScrollLock",
    224 : "Meta"
  };
  /** @type {function(!Object): ?} */
  exports.exports = getKey;
}, function(pkg, canCreateDiscussions, require) {
  /**
   * @param {!Object} obj
   * @param {string} data
   * @param {?} name
   * @return {undefined}
   */
  function index(obj, data, name) {
    log.call(this, obj, data, name);
  }
  var log = require(111);
  var res = {
    dataTransfer : null
  };
  log.augmentClass(index, res);
  /** @type {function(!Object, string, ?): undefined} */
  pkg.exports = index;
}, function(task, canCreateDiscussions, clamp) {
  /**
   * @param {!Object} obj
   * @param {string} a
   * @param {?} b
   * @return {undefined}
   */
  function r(obj, a, b) {
    l.call(this, obj, a, b);
  }
  var l = clamp(112);
  var a = clamp(113);
  var event = {
    touches : null,
    targetTouches : null,
    changedTouches : null,
    altKey : null,
    metaKey : null,
    ctrlKey : null,
    shiftKey : null,
    getModifierState : a
  };
  l.augmentClass(r, event);
  /** @type {function(!Object, string, ?): undefined} */
  task.exports = r;
}, function(pkg, canCreateDiscussions, require) {
  /**
   * @param {!Object} obj
   * @param {string} x
   * @param {?} name
   * @return {undefined}
   */
  function index(obj, x, name) {
    log.call(this, obj, x, name);
  }
  var log = require(111);
  var extra = {
    deltaX : function(event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    },
    deltaY : function(event) {
      return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
    },
    deltaZ : null,
    deltaMode : null
  };
  log.augmentClass(index, extra);
  /** @type {function(!Object, string, ?): undefined} */
  pkg.exports = index;
}, function(module, canCreateDiscussions, require) {
  var EventPluginUtils = require(46);
  var TRUE = EventPluginUtils.injection.MUST_USE_ATTRIBUTE;
  var storeMixin = {
    Properties : {
      clipPath : TRUE,
      cx : TRUE,
      cy : TRUE,
      d : TRUE,
      dx : TRUE,
      dy : TRUE,
      fill : TRUE,
      fillOpacity : TRUE,
      fontFamily : TRUE,
      fontSize : TRUE,
      fx : TRUE,
      fy : TRUE,
      gradientTransform : TRUE,
      gradientUnits : TRUE,
      markerEnd : TRUE,
      markerMid : TRUE,
      markerStart : TRUE,
      offset : TRUE,
      opacity : TRUE,
      patternContentUnits : TRUE,
      patternUnits : TRUE,
      points : TRUE,
      preserveAspectRatio : TRUE,
      r : TRUE,
      rx : TRUE,
      ry : TRUE,
      spreadMethod : TRUE,
      stopColor : TRUE,
      stopOpacity : TRUE,
      stroke : TRUE,
      strokeDasharray : TRUE,
      strokeLinecap : TRUE,
      strokeOpacity : TRUE,
      strokeWidth : TRUE,
      textAnchor : TRUE,
      transform : TRUE,
      version : TRUE,
      viewBox : TRUE,
      x1 : TRUE,
      x2 : TRUE,
      x : TRUE,
      y1 : TRUE,
      y2 : TRUE,
      y : TRUE
    },
    DOMAttributeNames : {
      clipPath : "clip-path",
      fillOpacity : "fill-opacity",
      fontFamily : "font-family",
      fontSize : "font-size",
      gradientTransform : "gradientTransform",
      gradientUnits : "gradientUnits",
      markerEnd : "marker-end",
      markerMid : "marker-mid",
      markerStart : "marker-start",
      patternContentUnits : "patternContentUnits",
      patternUnits : "patternUnits",
      preserveAspectRatio : "preserveAspectRatio",
      spreadMethod : "spreadMethod",
      stopColor : "stop-color",
      stopOpacity : "stop-opacity",
      strokeDasharray : "stroke-dasharray",
      strokeLinecap : "stroke-linecap",
      strokeOpacity : "stroke-opacity",
      strokeWidth : "stroke-width",
      textAnchor : "text-anchor",
      viewBox : "viewBox"
    }
  };
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} type
   * @return {?}
   */
  function createFullPageComponent(type) {
    var label = React.createFactory(type);
    var FullPageComponent = ReactClass.createClass({
      tagName : type.toUpperCase(),
      displayName : "ReactFullPageComponent" + type,
      componentWillUnmount : function() {
        forEachAccumulated(false);
      },
      render : function() {
        return label(this.props);
      }
    });
    return FullPageComponent;
  }
  var ReactClass = require(39);
  var React = require(13);
  var forEachAccumulated = require(9);
  /** @type {function(string): ?} */
  module.exports = createFullPageComponent;
}, function(mixin, canCreateDiscussions, require) {
  /**
   * @param {!Object} element
   * @return {?}
   */
  function renderToString(element) {
    invariant(ReactElement.isValidElement(element));
    var transaction;
    try {
      var rootID = ReactInstanceHandles.createReactRootID();
      return transaction = ReactServerRenderingTransaction.getPooled(false), transaction.perform(function() {
        var instance = instantiateReactComponent(element, null);
        var markup = instance.mountComponent(rootID, transaction, context);
        return ReactMarkupChecksum.addChecksumToMarkup(markup);
      }, null);
    } finally {
      ReactServerRenderingTransaction.release(transaction);
    }
  }
  /**
   * @param {!Object} element
   * @return {?}
   */
  function renderToStaticMarkup(element) {
    invariant(ReactElement.isValidElement(element));
    var transaction;
    try {
      var rootID = ReactInstanceHandles.createReactRootID();
      return transaction = ReactServerRenderingTransaction.getPooled(true), transaction.perform(function() {
        var instance = instantiateReactComponent(element, null);
        return instance.mountComponent(rootID, transaction, context);
      }, null);
    } finally {
      ReactServerRenderingTransaction.release(transaction);
    }
  }
  var ReactElement = require(13);
  var ReactInstanceHandles = require(21);
  var ReactMarkupChecksum = require(79);
  var ReactServerRenderingTransaction = require(153);
  var context = require(18);
  var instantiateReactComponent = require(85);
  var invariant = require(9);
  mixin.exports = {
    renderToString : renderToString,
    renderToStaticMarkup : renderToStaticMarkup
  };
}, function(mixin, canCreateDiscussions, require) {
  /**
   * @param {boolean} obj
   * @return {undefined}
   */
  function ReactUMGReconcileTransaction(obj) {
    this.reinitializeTransaction();
    /** @type {boolean} */
    this.renderToStaticMarkup = obj;
    this.reactMountReady = ReactServerRenderingTransaction.getPooled(null);
    this.putListenerQueue = CallbackQueue.getPooled();
  }
  var PooledClass = require(11);
  var ReactServerRenderingTransaction = require(29);
  var CallbackQueue = require(137);
  var ReactDOMComponent = require(38);
  var assign = require(17);
  var cleanup = require(15);
  var UPDATE_QUEUEING = {
    initialize : function() {
      this.reactMountReady.reset();
    },
    close : cleanup
  };
  var ON_UMG_READY_QUEUEING = {
    initialize : function() {
      this.putListenerQueue.reset();
    },
    close : cleanup
  };
  /** @type {!Array} */
  var TRANSACTION_WRAPPERS = [ON_UMG_READY_QUEUEING, UPDATE_QUEUEING];
  var capitalizedOpts = {
    getTransactionWrappers : function() {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady : function() {
      return this.reactMountReady;
    },
    getPutListenerQueue : function() {
      return this.putListenerQueue;
    },
    destructor : function() {
      ReactServerRenderingTransaction.release(this.reactMountReady);
      /** @type {null} */
      this.reactMountReady = null;
      CallbackQueue.release(this.putListenerQueue);
      /** @type {null} */
      this.putListenerQueue = null;
    }
  };
  assign(ReactUMGReconcileTransaction.prototype, ReactDOMComponent.Mixin, capitalizedOpts);
  PooledClass.addPoolingTo(ReactUMGReconcileTransaction);
  /** @type {function(boolean): undefined} */
  mixin.exports = ReactUMGReconcileTransaction;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function trigger(obj) {
    return extend(React.isValidElement(obj)), obj;
  }
  var React = require(13);
  var extend = require(9);
  /** @type {function(!Object): ?} */
  module.exports = trigger;
}, function(module, canCreateDiscussions, require) {
  var ValidComponentChildren = require(10);
  var ReactFragment = require(12);
  var BinaryBundle = {
    getChildMapping : function(children) {
      return children ? ReactFragment.extract(ValidComponentChildren.map(children, function(child) {
        return child;
      })) : children;
    },
    mergeChildMappings : function(prev, next) {
      /**
       * @param {string} key
       * @return {?}
       */
      function getValueForKey(key) {
        return next.hasOwnProperty(key) ? next[key] : prev[key];
      }
      prev = prev || {};
      next = next || {};
      var nextKeysPending = {};
      /** @type {!Array} */
      var pendingKeys = [];
      var prevKey;
      for (prevKey in prev) {
        if (next.hasOwnProperty(prevKey)) {
          if (pendingKeys.length) {
            /** @type {!Array} */
            nextKeysPending[prevKey] = pendingKeys;
            /** @type {!Array} */
            pendingKeys = [];
          }
        } else {
          pendingKeys.push(prevKey);
        }
      }
      var i;
      var childMapping = {};
      var nextKey;
      for (nextKey in next) {
        if (nextKeysPending.hasOwnProperty(nextKey)) {
          /** @type {number} */
          i = 0;
          for (; i < nextKeysPending[nextKey].length; i++) {
            var pendingNextKey = nextKeysPending[nextKey][i];
            childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
          }
        }
        childMapping[nextKey] = getValueForKey(nextKey);
      }
      /** @type {number} */
      i = 0;
      for (; i < pendingKeys.length; i++) {
        childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
      }
      return childMapping;
    }
  };
  module.exports = BinaryBundle;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} obj
   * @param {string} props
   * @return {?}
   */
  function render(obj, props) {
    var item = utils.mergeProps(props, obj.props);
    return !item.hasOwnProperty(s) && obj.props.hasOwnProperty(s) && (item.children = obj.props.children), React.createElement(obj.type, item);
  }
  var React = require(13);
  var utils = require(157);
  var traverse = require(41);
  var s = (require(14), traverse({
    children : null
  }));
  /** @type {function(!Object, string): ?} */
  module.exports = render;
}, function(module, canCreateDiscussions, unescape) {
  /**
   * @param {!Function} $
   * @return {?}
   */
  function plugin($) {
    return function(filters, i, filter) {
      if (filters.hasOwnProperty(i)) {
        filters[i] = $(filters[i], filter);
      } else {
        filters[i] = filter;
      }
    };
  }
  /**
   * @param {!Object} acc
   * @param {!Object} obj
   * @return {?}
   */
  function reduce(acc, obj) {
    var i;
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        var f = data[i];
        if (f && data.hasOwnProperty(i)) {
          f(acc, i, obj[i]);
        } else {
          if (!acc.hasOwnProperty(i)) {
            acc[i] = obj[i];
          }
        }
      }
    }
    return acc;
  }
  var get = unescape(17);
  var json = unescape(15);
  var name = unescape(158);
  var p = plugin(function(skipCaching, falseKey) {
    return get({}, falseKey, skipCaching);
  });
  var data = {
    children : json,
    className : plugin(name),
    style : p
  };
  var ReactPropTransferer = {
    mergeProps : function(source, target) {
      return reduce(get({}, source), target);
    }
  };
  module.exports = ReactPropTransferer;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} str
   * @return {?}
   */
  function self(str) {
    if (!str) {
      /** @type {string} */
      str = "";
    }
    var val;
    /** @type {number} */
    var length = arguments.length;
    if (length > 1) {
      /** @type {number} */
      var i = 1;
      for (; length > i; i++) {
        val = arguments[i];
        if (val) {
          /** @type {string} */
          str = (str ? str + " " : "") + val;
        }
      }
    }
    return str;
  }
  /** @type {function(!Object): ?} */
  module.exports = self;
}, function(module, canCreateDiscussions, getBaseUri) {
  var ReactLink = getBaseUri(160);
  var path = getBaseUri(161);
  var storeMixin = {
    linkState : function(key) {
      return new ReactLink(this.state[key], path.createStateKeySetter(this, key));
    }
  };
  module.exports = storeMixin;
}, function(build, canCreateDiscussions, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @param {!Function} type
   * @return {undefined}
   */
  function error(obj, type) {
    /** @type {!Object} */
    this.value = obj;
    /** @type {!Function} */
    this.requestChange = type;
  }
  /**
   * @param {!Object} options
   * @return {?}
   */
  function bind(options) {
    var shapes = {
      value : "undefined" == typeof options ? _react.PropTypes.any.isRequired : options.isRequired,
      requestChange : _react.PropTypes.func.isRequired
    };
    return _react.PropTypes.shape(shapes);
  }
  var _react = __webpack_require__(5);
  error.PropTypes = {
    link : bind
  };
  /** @type {function(!Object, !Function): undefined} */
  build.exports = error;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {!Object} config
   * @param {?} index
   * @return {?}
   */
  function render(config, index) {
    var servers = {};
    return function(v) {
      servers[index] = v;
      config.setState(servers);
    };
  }
  var exports = {
    createStateSetter : function(component, funcReturningState) {
      return function(a, b, c, d, e, f) {
        var partialState = funcReturningState.call(component, a, b, c, d, e, f);
        if (partialState) {
          component.setState(partialState);
        }
      };
    },
    createStateKeySetter : function(component, key) {
      var data = component.__keySetters || (component.__keySetters = {});
      return data[key] || (data[key] = render(component, key));
    }
  };
  exports.Mixin = {
    createStateSetter : function(funcReturningState) {
      return exports.createStateSetter(this, funcReturningState);
    },
    createStateKeySetter : function(key) {
      return exports.createStateKeySetter(this, key);
    }
  };
  module.exports = exports;
}, function(module, canCreateDiscussions, require) {
  var shallowEqual = require(139);
  var ReactComponentWithPureRenderMixin = {
    shouldComponentUpdate : function(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
  };
  module.exports = ReactComponentWithPureRenderMixin;
}, function(module, canCreateDiscussions, __webpack_require__) {
  var React = __webpack_require__(5);
  var _extends = __webpack_require__(17);
  var children = React.createFactory(__webpack_require__(4));
  var extend = React.createFactory(__webpack_require__(164));
  var storeMixin = React.createClass({
    displayName : "ReactCSSTransitionGroup",
    propTypes : {
      transitionName : React.PropTypes.string.isRequired,
      transitionAppear : React.PropTypes.bool,
      transitionEnter : React.PropTypes.bool,
      transitionLeave : React.PropTypes.bool
    },
    getDefaultProps : function() {
      return {
        transitionAppear : false,
        transitionEnter : true,
        transitionLeave : true
      };
    },
    _wrapChild : function(ref) {
      return extend({
        name : this.props.transitionName,
        appear : this.props.transitionAppear,
        enter : this.props.transitionEnter,
        leave : this.props.transitionLeave
      }, ref);
    },
    render : function() {
      return children(_extends({}, this.props, {
        childFactory : this._wrapChild
      }));
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, require) {
  var React = require(5);
  var CSSCore = require(165);
  var ReactTransitionEvents = require(166);
  var onlyChild = require(154);
  /** @type {number} */
  var delayMs = (require(14), 17);
  var storeMixin = React.createClass({
    displayName : "ReactCSSTransitionGroupChild",
    transition : function(animationType, finishCallback) {
      var node = this.getDOMNode();
      /** @type {string} */
      var className = this.props.name + "-" + animationType;
      /** @type {string} */
      var activeClassName = className + "-active";
      /**
       * @param {!Object} e
       * @return {undefined}
       */
      var endListener = function(e) {
        if (!(e && e.target !== node)) {
          CSSCore.removeClass(node, className);
          CSSCore.removeClass(node, activeClassName);
          ReactTransitionEvents.removeEndEventListener(node, endListener);
          if (finishCallback) {
            finishCallback();
          }
        }
      };
      ReactTransitionEvents.addEndEventListener(node, endListener);
      CSSCore.addClass(node, className);
      this.queueClass(activeClassName);
    },
    queueClass : function(className) {
      this.classNameQueue.push(className);
      if (!this.timeout) {
        /** @type {number} */
        this.timeout = setTimeout(this.flushClassNameQueue, delayMs);
      }
    },
    flushClassNameQueue : function() {
      if (this.isMounted()) {
        this.classNameQueue.forEach(CSSCore.addClass.bind(CSSCore, this.getDOMNode()));
      }
      /** @type {number} */
      this.classNameQueue.length = 0;
      /** @type {null} */
      this.timeout = null;
    },
    componentWillMount : function() {
      /** @type {!Array} */
      this.classNameQueue = [];
    },
    componentWillUnmount : function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    },
    componentWillAppear : function(done) {
      if (this.props.appear) {
        this.transition("appear", done);
      } else {
        done();
      }
    },
    componentWillEnter : function(done) {
      if (this.props.enter) {
        this.transition("enter", done);
      } else {
        done();
      }
    },
    componentWillLeave : function(done) {
      if (this.props.leave) {
        this.transition("leave", done);
      } else {
        done();
      }
    },
    render : function() {
      return onlyChild(this.props.children);
    }
  });
  module.exports = storeMixin;
}, function(module, canCreateDiscussions, saveNotifs) {
  var _classRegExp = saveNotifs(9);
  var CSSCore = {
    addClass : function(element, className) {
      return _classRegExp(!/\s/.test(className)), className && (element.classList ? element.classList.add(className) : CSSCore.hasClass(element, className) || (element.className = element.className + " " + className)), element;
    },
    removeClass : function(element, className) {
      return _classRegExp(!/\s/.test(className)), className && (element.classList ? element.classList.remove(className) : CSSCore.hasClass(element, className) && (element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, ""))), element;
    },
    conditionClass : function(element, className, bool) {
      return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
    },
    hasClass : function(element, className) {
      return _classRegExp(!/\s/.test(className)), element.classList ? !!className && element.classList.contains(className) : (" " + element.className + " ").indexOf(" " + className + " ") > -1;
    }
  };
  module.exports = CSSCore;
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function detectEvents() {
    /** @type {!Element} */
    var domScroll = document.createElement("div");
    /** @type {!CSSStyleDeclaration} */
    var style = domScroll.style;
    if (!("AnimationEvent" in window)) {
      delete EVENT_NAME_MAP.animationend.animation;
    }
    if (!("TransitionEvent" in window)) {
      delete EVENT_NAME_MAP.transitionend.transition;
    }
    var baseEventName;
    for (baseEventName in EVENT_NAME_MAP) {
      var set = EVENT_NAME_MAP[baseEventName];
      var prop;
      for (prop in set) {
        if (prop in style) {
          l.push(set[prop]);
          break;
        }
      }
    }
  }
  /**
   * @param {!HTMLElement} element
   * @param {string} name
   * @param {!Function} listener
   * @return {undefined}
   */
  function addEventListener(element, name, listener) {
    element.addEventListener(name, listener, false);
  }
  /**
   * @param {!Node} event
   * @param {string} el
   * @param {!Function} listener
   * @return {undefined}
   */
  function removeEventListener(event, el, listener) {
    event.removeEventListener(el, listener, false);
  }
  var ExecutionEnvironment = require(55);
  var EVENT_NAME_MAP = {
    transitionend : {
      transition : "transitionend",
      WebkitTransition : "webkitTransitionEnd",
      MozTransition : "mozTransitionEnd",
      OTransition : "oTransitionEnd",
      msTransition : "MSTransitionEnd"
    },
    animationend : {
      animation : "animationend",
      WebkitAnimation : "webkitAnimationEnd",
      MozAnimation : "mozAnimationEnd",
      OAnimation : "oAnimationEnd",
      msAnimation : "MSAnimationEnd"
    }
  };
  /** @type {!Array} */
  var l = [];
  if (ExecutionEnvironment.canUseDOM) {
    detectEvents();
  }
  var ReactTransitionEvents = {
    addEndEventListener : function(node, eventListener) {
      return 0 === l.length ? void window.setTimeout(eventListener, 0) : void l.forEach(function(eventHandler) {
        addEventListener(node, eventHandler, eventListener);
      });
    },
    removeEndEventListener : function(node, eventListener) {
      if (0 !== l.length) {
        l.forEach(function(f) {
          removeEventListener(node, f, eventListener);
        });
      }
    }
  };
  module.exports = ReactTransitionEvents;
}, function(module, canCreateDiscussions, saveNotifs) {
  /**
   * @param {!Object} val
   * @return {?}
   */
  function render(val) {
    return "object" == typeof val ? Object.keys(val).filter(function(attrPropertyName) {
      return val[attrPropertyName];
    }).join(" ") : Array.prototype.join.call(arguments, " ");
  }
  saveNotifs(14);
  /** @type {function(!Object): ?} */
  module.exports = render;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} value
   * @return {?}
   */
  function filter(value) {
    return Array.isArray(value) ? value.concat() : value && "object" == typeof value ? $(new value.constructor, value) : value;
  }
  /**
   * @param {!Object} value
   * @param {string} msg
   * @param {string} t
   * @return {undefined}
   */
  function test(value, msg, t) {
    assert(Array.isArray(value));
    var b = msg[t];
    assert(Array.isArray(b));
  }
  /**
   * @param {!Object} obj
   * @param {string} data
   * @return {?}
   */
  function parse(obj, data) {
    if (assert("object" == typeof data), hasOwnProperty.call(data, w)) {
      return assert(1 === Object.keys(data).length), data[w];
    }
    var value = filter(obj);
    if (hasOwnProperty.call(data, name)) {
      var a = data[name];
      assert(a && "object" == typeof a);
      assert(value && "object" == typeof value);
      $(value, data[name]);
    }
    if (hasOwnProperty.call(data, result)) {
      test(obj, data, result);
      data[result].forEach(function(fce) {
        value.push(fce);
      });
    }
    if (hasOwnProperty.call(data, x)) {
      test(obj, data, x);
      data[x].forEach(function(e) {
        value.unshift(e);
      });
    }
    if (hasOwnProperty.call(data, i)) {
      assert(Array.isArray(obj));
      assert(Array.isArray(data[i]));
      data[i].forEach(function(e) {
        assert(Array.isArray(e));
        value.splice.apply(value, e);
      });
    }
    if (hasOwnProperty.call(data, f)) {
      assert("function" == typeof data[f]);
      value = data[f](value);
    }
    var key;
    for (key in data) {
      if (!(documentProperties.hasOwnProperty(key) && documentProperties[key])) {
        value[key] = parse(obj[key], data[key]);
      }
    }
    return value;
  }
  var $ = require(17);
  var keyOf = require(41);
  var assert = require(9);
  /** @type {function(this:Object, *): boolean} */
  var hasOwnProperty = {}.hasOwnProperty;
  var result = keyOf({
    $push : null
  });
  var x = keyOf({
    $unshift : null
  });
  var i = keyOf({
    $splice : null
  });
  var w = keyOf({
    $set : null
  });
  var name = keyOf({
    $merge : null
  });
  var f = keyOf({
    $apply : null
  });
  /** @type {!Array} */
  var args = [result, x, i, w, name, f];
  var documentProperties = {};
  args.forEach(function(key) {
    /** @type {boolean} */
    documentProperties[key] = true;
  });
  /** @type {function(!Object, string): ?} */
  module.exports = parse;
}, function(module, exports, saveNotifs) {
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var LinkCreate = void 0;
  LinkCreate = saveNotifs(170);
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(module, exports, n) {
  /**
   * @param {!AudioNode} object
   * @param {!Function} end
   * @return {undefined}
   */
  function debug(object, end) {
    if (!(object instanceof end)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * @return {?}
   */
  function checkLocalStorageSupport() {
    /** @type {string} */
    var i = "test";
    try {
      return localStorage.setItem(i, i), localStorage.removeItem(i), true;
    } catch (t) {
      return false;
    }
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var installNativeEvent$2 = function() {
    /**
     * @param {!Function} d
     * @param {string} props
     * @return {undefined}
     */
    function t(d, props) {
      /** @type {number} */
      var i = 0;
      for (; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        /** @type {boolean} */
        descriptor.configurable = true;
        if ("value" in descriptor) {
          /** @type {boolean} */
          descriptor.writable = true;
        }
        Object.defineProperty(d, descriptor.key, descriptor);
      }
    }
    return function(p, n, a) {
      return n && t(p.prototype, n), a && t(p, a), p;
    };
  }();
  var VPAIDIntegrator = function() {
    /**
     * @return {undefined}
     */
    function n() {
      debug(this, n);
    }
    return installNativeEvent$2(n, [{
      key : "get",
      value : function(o) {
        var data = localStorage.getItem(o);
        try {
          /** @type {*} */
          data = JSON.parse(data);
        } catch (n) {
        }
        return data;
      }
    }, {
      key : "set",
      value : function(str, obj) {
        localStorage.setItem(str, JSON.stringify(obj));
      }
    }, {
      key : "remove",
      value : function(str) {
        localStorage.removeItem(str);
      }
    }, {
      key : "clear",
      value : function() {
        localStorage.clear();
      }
    }]), n;
  }();
  var VASTIntegrator = function() {
    /**
     * @return {undefined}
     */
    function n() {
      debug(this, n);
      this.storage = {};
    }
    return installNativeEvent$2(n, [{
      key : "get",
      value : function(id) {
        return this.storage[id];
      }
    }, {
      key : "set",
      value : function(id, obj) {
        /** @type {number} */
        this.storage[id] = obj;
      }
    }, {
      key : "remove",
      value : function(id) {
        delete this.storage[id];
      }
    }, {
      key : "clear",
      value : function() {
        this.storage = {};
      }
    }]), n;
  }();
  exports["default"] = checkLocalStorageSupport() ? new VPAIDIntegrator : new VASTIntegrator;
  module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _class = __webpack_require__(172);
  var _class2 = _interopRequireDefault(_class);
  exports["default"] = _class2["default"];
  module.exports = exports["default"];
}, function(module, exports, $) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  /**
   * @param {string} s
   * @param {string} color
   * @return {?}
   */
  function callback(s, color) {
    color = color.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    /** @type {!RegExp} */
    var is_jsonp_re = new RegExp("[\\?&]" + color + "=([^&#]*)");
    /** @type {(Array<string>|null)} */
    var matches = is_jsonp_re.exec(s);
    return null === matches || matches && "string" != typeof matches[1] && matches[1].length ? "" : decodeURIComponent(matches[1]).replace(/\+/g, " ");
  }
  /**
   * @return {?}
   */
  function filter() {
    var oldSortOrder = void 0 === arguments[0] ? {} : arguments[0];
    return pipelets.forEach(function(b) {
      var i = callback(document.URL, b);
      if (i.length) {
        oldSortOrder[b] = i;
      }
    }), oldSortOrder;
  }
  /**
   * @return {?}
   */
  function updateSearchEngineIcon() {
    /** @type {string} */
    var parentUrl = document.referrer;
    return 0 === parentUrl.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === parentUrl.search("https?://(.*)bing.com") ? "bing" : 0 === parentUrl.search("https?://(.*)yahoo.com") ? "yahoo" : 0 === parentUrl.search("https?://(.*)duckduckgo.com") ? "duckduckgo" : null;
  }
  /**
   * @return {?}
   */
  function render() {
    var ret = void 0 === arguments[0] ? {} : arguments[0];
    /** @type {string} */
    var i = document.referrer;
    var undefined = updateSearchEngineIcon(i);
    /** @type {string} */
    var index = "yahoo" !== undefined ? "q" : "p";
    if (null != undefined) {
      ret.$search_engine = undefined;
      var value = callback(i, index);
      if (value.length) {
        ret.mp_keyword = value;
      }
    }
    return ret;
  }
  /**
   * @return {?}
   */
  function parse() {
    /** @type {string} */
    var userAgent = navigator.userAgent;
    /** @type {string} */
    var t = navigator.vendor || "";
    var opera = window.opera;
    return null != window.__require ? "ChatX Client" : opera ? /Mini/.test(userAgent) ? "Opera Mini" : "Opera" : /(BlackBerry|PlayBook|BB10)/i.test(userAgent) ? "BlackBerry" : /FBIOS/.test(userAgent) ? "Facebook Mobile" : /Chrome/.test(userAgent) ? "Chrome" : /CriOS/.test(userAgent) ? "Chrome iOS" : /Apple/.test(t) ? /Mobile/.test(userAgent) ? "Mobile Safari" : "Safari" : /Android/.test(userAgent) ? "Android Mobile" : /Konqueror/.test(userAgent) ? "Konqueror" : /Firefox/.test(userAgent) ? "Firefox" :
    /MSIE|Trident\//.test(userAgent) ? "Internet Explorer" : /Gecko/.test(userAgent) ? "Mozilla" : "";
  }
  /**
   * @return {?}
   */
  function _initSys() {
    /** @type {string} */
    var agent = navigator.userAgent;
    return /Windows/i.test(agent) ? /Phone/.test(agent) ? "Windows Mobile" : "Windows" : /(iPhone|iPad|iPod)/.test(agent) ? "iOS" : /Android/.test(agent) ? "Android" : /(BlackBerry|PlayBook|BB10)/i.test(agent) ? "BlackBerry" : /Mac/i.test(agent) ? "Mac OS X" : /Linux/.test(agent) ? "Linux" : "";
  }
  /**
   * @return {?}
   */
  function detect() {
    /** @type {string} */
    var agent = navigator.userAgent;
    return /iPad/.test(agent) ? "iPad" : /iPod/.test(agent) ? "iPod Touch" : /iPhone/.test(agent) ? "iPhone" : /(BlackBerry|PlayBook|BB10)/i.test(agent) ? "BlackBerry" : /Windows Phone/i.test(agent) ? "Windows Phone" : /Android/.test(agent) ? "Android" : "";
  }
  /**
   * @return {?}
   */
  function run() {
    /** @type {!Array<string>} */
    var sepor = document.referrer.split("/");
    return sepor.length >= 3 ? sepor[2] : "";
  }
  /**
   * @return {?}
   */
  function minify() {
    var a = void 0 === arguments[0] ? {} : arguments[0];
    return a.$os = _initSys(), a.$browser = parse(), a.$device = detect(), a.$referrer = document.referrer, a.$referring_domain = run(), filter(a), render(a), a;
  }
  /**
   * @param {string} name
   * @return {undefined}
   */
  function query(name) {
    var languageProperties = void 0 === arguments[1] ? {} : arguments[1];
    var count = void 0 === arguments[2] ? 0 : arguments[2];
    if (count > 0) {
      if (_downloads[name] && _downloads[name] > Date.now()) {
        return;
      }
      _downloads[name] = Date.now() + count;
    }
    _DocumentFragment["default"].post(self.Endpoints.TRACK).send({
      event : name,
      properties : languageProperties
    }).end();
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var self = $(173);
  var _documentDocumentFragment = $(176);
  var _DocumentFragment = _interopRequireDefault(_documentDocumentFragment);
  var buffer = $(179);
  var _downloads = {};
  /** @type {!Array<string>} */
  var pipelets = "utm_source utm_medium utm_campaign utm_content utm_term".split(" ");
  var data = void 0;
  try {
    data = minify();
  } catch (E) {
    data = {};
  }
  var limitUserToken = void 0;
  try {
    limitUserToken = (new buffer.Buffer(JSON.stringify(data))).toString("base64");
  } catch (E) {
  }
  exports["default"] = {
    track : query,
    getSuperProperties : function() {
      return data;
    },
    getSuperPropertiesBase64 : function() {
      return limitUserToken;
    }
  };
  module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  /** @type {function(!Object, ...(Object|null)): !Object} */
  var _extends = Object.assign || function(result) {
    /** @type {number} */
    var i = 1;
    for (; i < arguments.length; i++) {
      var value = arguments[i];
      var name;
      for (name in value) {
        if (Object.prototype.hasOwnProperty.call(value, name)) {
          result[name] = value[name];
        }
      }
    }
    return result;
  };
  var _normalizeDataUri = __webpack_require__(174);
  var _DocumentFragment = _interopRequireDefault(_normalizeDataUri);
  var _base = __webpack_require__(175);
  var _base2 = _interopRequireDefault(_base);
  /** @type {!Object} */
  exports["default"] = _extends({
    ActionTypes : _DocumentFragment["default"]({
      USER_UPDATE : null,
      LOAD_REGIONS : null,
      LOAD_MESSAGES : null,
      LOAD_MESSAGES_SUCCESS : null,
      MESSAGE_CREATE : null,
      MESSAGE_UPDATE : null,
      MESSAGE_DELETE : null,
      MESSAGE_ACK : null,
      GUILD_CREATE : null,
      GUILD_UPDATE : null,
      GUILD_DELETE : null,
      GUILD_SELECT : null,
      CHANGE_LOG_SHOW : null,
      CHANNEL_CREATE : null,
      CHANNEL_UPDATE : null,
      CHANNEL_DELETE : null,
      CHANNEL_SELECT : null,
      CHANNEL_COLLAPSE : null,
      VOICE_CHANNEL_SELECT : null,
      TYPING_START : null,
      TYPING_STOP : null,
      NEW_USER_FLOW_SET_STEP : null,
      NEW_USER_FLOW_GUILD_CREATED : null,
      NEW_USER_FLOW_GUILD_SUBMITTED : null,
      NEW_USER_FLOW_GUILD_FAILURE : null,
      START_SESSION : null,
      LOGIN : null,
      LOGIN_SUCCESS : null,
      LOGIN_FAILURE : null,
      REGISTER : null,
      REGISTER_SUCCESS : null,
      REGISTER_FAILURE : null,
      VERIFY_FAILURE : null,
      FORGOT_PASSWORD_SENT : null,
      LOGOUT : null,
      UPDATE_TOKEN : null,
      CHANNEL_FORM_OPEN : null,
      CHANNEL_FORM_CLOSE : null,
      CHANNEL_FORM_SUBMIT : null,
      CHANNEL_FORM_SUBMIT_FAILURE : null,
      CHANNEL_SETTINGS_OPEN : null,
      CHANNEL_SETTINGS_CLOSE : null,
      CHANNEL_SETTINGS_UPDATE : null,
      CHANNEL_SETTINGS_SUBMIT : null,
      CHANNEL_SETTINGS_SUBMIT_FAILURE : null,
      CHANNEL_SETTINGS_SET_SECTION : null,
      CHANNEL_SETTINGS_OVERWRITE_SELECT : null,
      CHANNEL_SETTINGS_LOADED_INVITES : null,
      MODAL_PUSH : null,
      MODAL_POP : null,
      POPOUT_OPEN : null,
      POPOUT_CLOSE : null,
      TOOLTIP_SHOW : null,
      TOOLTIP_HIDE : null,
      TUTORIAL_INDICATORS_READY : null,
      TUTORIAL_INDICATOR_SHOW : null,
      TUTORIAL_INDICATOR_HIDE : null,
      TUTORIAL_INDICATOR_DISMISS : null,
      TUTORIAL_INDICATOR_SUPPRESS_ALL : null,
      UPLOAD_START : null,
      UPLOAD_PROGRESS : null,
      UPLOAD_COMPLETE : null,
      UPLOAD_FAIL : null,
      UPDATE_DIMENSIONS : null,
      CONNECTION_OPEN : null,
      CONNECTION_CLOSED : null,
      WINDOW_FOCUS : null,
      WINDOW_RESIZED : null,
      PRESENCE_UPDATE : null,
      VOICE_STATE_UPDATE : null,
      VOICE_SERVER_UPDATE : null,
      SPEAKING : null,
      AUDIO_TOGGLE_SELF_MUTE : null,
      AUDIO_TOGGLE_SELF_DEAF : null,
      AUDIO_TOGGLE_LOCAL_MUTE : null,
      AUDIO_TOGGLE_MUTE : null,
      AUDIO_TOGGLE_DEAF : null,
      AUDIO_ENABLE : null,
      AUDIO_SET_MODE : null,
      AUDIO_SET_INPUT_VOLUME : null,
      AUDIO_SET_OUTPUT_VOLUME : null,
      AUDIO_SET_LOCAL_VOLUME : null,
      AUDIO_SET_INPUT_DEVICE : null,
      AUDIO_SET_OUTPUT_DEVICE : null,
      AUDIO_SET_ECHO_CANCELLATION : null,
      AUDIO_SET_NOISE_SUPPRESSION : null,
      AUDIO_SET_AUTOMATIC_GAIN_CONTROL : null,
      AUDIO_SET_ATTENUATION : null,
      AUDIO_INPUT_DEVICES : null,
      AUDIO_OUTPUT_DEVICES : null,
      VOICE_ENGINE_STATE : null,
      USER_SETTINGS_OPEN : null,
      USER_SETTINGS_CLOSE : null,
      USER_SETTINGS_SUBMIT : null,
      USER_SETTINGS_SUBMIT_FAILURE : null,
      USER_SETTINGS_SET_SECTION : null,
      USER_SETTINGS_UPDATE_SETTINGS : null,
      GUILD_FORM_OPEN : null,
      GUILD_FORM_CLOSE : null,
      GUILD_FORM_SUBMIT : null,
      GUILD_FORM_SUBMIT_FAILURE : null,
      GUILD_SETTINGS_OPEN : null,
      GUILD_SETTINGS_CLOSE : null,
      GUILD_SETTINGS_UPDATE : null,
      GUILD_SETTINGS_SUBMIT : null,
      GUILD_SETTINGS_SUBMIT_FAILURE : null,
      GUILD_SETTINGS_SET_SECTION : null,
      GUILD_SETTINGS_LOADED_BANS : null,
      GUILD_SETTINGS_LOADED_INVITES : null,
      GUILD_SETTINGS_ROLE_SELECT : null,
      GUILD_SETTINGS_SET_EMBED : null,
      NOTIFICATIONS_SET_DESKTOP_TYPE : null,
      NOTIFICATIONS_SET_TTS_TYPE : null,
      NOTIFICATIONS_SET_DISABLED_SOUNDS : null,
      IMAGE_LOAD_SUCCESS : null,
      IMAGE_LOAD_FAILURE : null,
      NOTICE_SHOW : null,
      NOTICE_DISMISS : null,
      VOICE_FREEZE : null,
      VOICE_UNFREEZE : null,
      VOICE_CONNECTION_STATE : null,
      VOICE_CONNECTION_SPEAKING : null,
      VOICE_CONNECTION_SDP : null,
      INVITE_RESOLVE : null,
      INVITE_RESOLVE_SUCCESS : null,
      INVITE_RESOLVE_FAILURE : null,
      INVITE_ACCEPT : null,
      INVITE_ACCEPT_SUCCESS : null,
      INVITE_ACCEPT_FAILURE : null,
      INVITE_APP_OPENING : null,
      INVITE_APP_OPENED : null,
      INVITE_APP_NOT_OPENED : null,
      GUILD_BAN_ADD : null,
      GUILD_BAN_REMOVE : null,
      GUILD_MEMBER_ADD : null,
      GUILD_MEMBER_UPDATE : null,
      GUILD_MEMBER_REMOVE : null,
      GUILD_ROLE_CREATE : null,
      GUILD_ROLE_UPDATE : null,
      GUILD_ROLE_DELETE : null,
      CHECKING_FOR_UPDATES : null,
      UPDATE_NOT_AVAILABLE : null,
      UPDATE_AVAILABLE : null,
      UPDATE_ERROR : null,
      UPDATE_DOWNLOADED : null,
      RUNNING_GAMES_CHANGE : null,
      IDLE : null,
      PERMISSION_CLEAR_VAD_WARNING : null,
      PERMISSION_CLEAR_SUPPRESS_WARNING : null,
      INSTANT_INVITE_CREATE : null,
      INSTANT_INVITE_CREATE_SUCCESS : null,
      INSTANT_INVITE_CREATE_FAILURE : null,
      INSTANT_INVITE_REVOKE_SUCCESS : null,
      INTEGRATION_QUERY : null,
      INTEGRATION_QUERY_SUCCESS : null,
      INTEGRATION_QUERY_FAILURE : null,
      ALERT_OPEN : null,
      ALERT_CLOSE : null,
      DRAWER_OPEN : null,
      DRAWER_CLOSE : null,
      MODAL_OPEN : null,
      MODAL_CLOSE : null,
      KEYBOARD_SHOW : null,
      KEYBOARD_HIDE : null,
      APP_STATE_UPDATE : null
    }),
    FormStates : _DocumentFragment["default"]({
      OPEN : null,
      SUBMITTING : null,
      CLOSED : null
    }),
    UserSettingsSections : _DocumentFragment["default"]({
      ACCOUNT : null,
      VOICE : null,
      VOICE_BASIC : null,
      VOICE_ADVANCED : null,
      NOTIFICATIONS : null
    }),
    GuildSettingsSections : _DocumentFragment["default"]({
      OVERVIEW : null,
      MEMBERS : null,
      ROLES : null,
      BANS : null,
      INSTANT_INVITES : null,
      EMBED : null
    }),
    ChannelSettingsSections : _DocumentFragment["default"]({
      OVERVIEW : null,
      PERMISSIONS : null,
      INSTANT_INVITES : null
    }),
    DesktopNotificationTypes : _DocumentFragment["default"]({
      NEVER : null,
      MENTIONS : null,
      ALL : null
    }),
    TTSNotificationTypes : _DocumentFragment["default"]({
      NEVER : null,
      INGAME : null,
      ALWAYS : null
    }),
    InputModes : _DocumentFragment["default"]({
      PUSH_TO_TALK : null,
      VOICE_ACTIVITY : null
    }),
    ChannelTypes : {
      TEXT : "text",
      VOICE : "voice"
    },
    NoticeTypes : _DocumentFragment["default"]({
      GENERIC : null,
      UNCLAIMED_ACCOUNT : null,
      DOWNLOAD_NAG : null,
      VOICE_DISABLED : null
    }),
    InviteStates : _DocumentFragment["default"]({
      RESOLVING : null,
      RESOLVED : null,
      EXPIRED : null,
      ACCEPTING : null,
      ACCEPTED : null,
      APP_OPENING : null,
      APP_OPENED : null,
      APP_NOT_OPENED : null
    }),
    VoiceConnectionStates : _DocumentFragment["default"]({
      DISCONNECTED : null,
      AWAITING_ENDPOINT : null,
      AUTHENTICATING : null,
      CONNECTING : null,
      CONNECTED : null
    }),
    VoiceEngineStates : _DocumentFragment["default"]({
      DISCONNECTED : null,
      CONNECTING : null,
      CONNECTED : null,
      NO_ROUTE : null,
      ICE_CHECKING : null
    }),
    Endpoints : {
      USER_CHANNELS : function(userID) {
        return "/users/" + userID + "/channels";
      },
      GUILD_CHANNELS : function(guildId) {
        return "/guilds/" + guildId + "/channels";
      },
      GUILD_MEMBERS : function(poolId) {
        return "/guilds/" + poolId + "/members";
      },
      GUILD_BANS : function(guildId) {
        return "/guilds/" + guildId + "/bans";
      },
      GUILD_ROLES : function(userId) {
        return "/guilds/" + userId + "/roles";
      },
      GUILD_INSTANT_INVITES : function(board_id) {
        return "/guilds/" + board_id + "/invites";
      },
      GUILD_EMBED : function(mediaId) {
        return "/guilds/" + mediaId + "/embed";
      },
      GUILDS : "/guilds",
      CHANNELS : "/channels",
      AVATAR : function(data, linkedEntities) {
        return "/users/" + data + "/avatars/" + linkedEntities + ".jpg";
      },
      MESSAGES : function(channelName) {
        return "/channels/" + channelName + "/messages";
      },
      INSTANT_INVITES : function(channelId) {
        return "/channels/" + channelId + "/invites";
      },
      TYPING : function(channelId) {
        return "/channels/" + channelId + "/typing";
      },
      CHANNEL_PERMISSIONS : function(id) {
        return "/channels/" + id + "/permissions";
      },
      TUTORIAL : "/tutorial",
      TUTORIAL_INDICATORS : "/tutorial/indicators",
      USERS : "/users",
      ME : "/users/@me",
      DEVICES : "/users/@me/devices",
      LOGIN : "/auth/login",
      LOGOUT : "/auth/logout",
      REGISTER : "/auth/register",
      INVITE : "/invite",
      TRACK : "/track",
      ZENDESK : "/zendesk",
      VERIFY : "/auth/verify",
      VERIFY_RESEND : "/auth/verify/resend",
      FORGOT_PASSWORD : "/auth/forgot",
      RESET_PASSWORD : "/auth/reset",
      REGIONS : "/voice/regions",
      ICE : "/voice/ice",
      REPORT : "/report",
      INTEGRATIONS : "/integrations"
    },
    Permissions : {
      CREATE_INSTANT_INVITE : 1,
      KICK_MEMBERS : 2,
      BAN_MEMBERS : 4,
      MANAGE_ROLES : 8,
      MANAGE_CHANNELS : 16,
      MANAGE_GUILD : 32,
      READ_MESSAGES : 1024,
      SEND_MESSAGES : 2048,
      SEND_TSS_MESSAGES : 4096,
      MANAGE_MESSAGES : 8192,
      EMBED_LINKS : 16384,
      ATTACH_FILES : 32768,
      READ_MESSAGE_HISTORY : 65536,
      MENTION_EVERYONE : 1 << 17,
      CONNECT : 1 << 20,
      SPEAK : 1 << 21,
      MUTE_MEMBERS : 1 << 22,
      DEAFEN_MEMBERS : 1 << 23,
      MOVE_MEMBERS : 1 << 24,
      USE_VAD : 1 << 25
    },
    ME : "@me",
    MAX_MESSAGES_PER_CHANNEL : 50,
    MAX_MESSAGE_LENGTH : 2E3,
    IDLE_DURATION : 6E4,
    TYPING_TIMEOUT : 1E4,
    ChannelStreamTypes : _DocumentFragment["default"]({
      MESSAGE_GROUP : null,
      DIVIDER_TIME_STAMP : null,
      DIVIDER_NEW_MESSAGES : null
    }),
    DEFAULT_INVITE_BUTTON_ID : "DEFAULT_INVITE_BUTTON_ID"
  }, _base2["default"]);
  module.exports = exports["default"];
}, function(pkg, canCreateDiscussions, n) {
  /**
   * @param {!Object} path
   * @return {?}
   */
  var index = function(path) {
    var i;
    var keys = {};
    if (!(path instanceof Object) || Array.isArray(path)) {
      throw new Error("keyMirror(...): Argument must be an object.");
    }
    for (i in path) {
      if (path.hasOwnProperty(i)) {
        /** @type {string} */
        keys[i] = i;
      }
    }
    return keys;
  };
  /** @type {function(!Object): ?} */
  pkg.exports = index;
}, function(canCreateDiscussions, isSlidingUp, n) {
}, function(module, canCreateDiscussions, require) {
  /**
   * @return {undefined}
   */
  function noop() {
  }
  /**
   * @param {?} value
   * @return {?}
   */
  function validateBaseArgs(value) {
    /** @type {string} */
    var minyMin = {}.toString.call(value);
    switch(minyMin) {
      case "[object File]":
      case "[object Blob]":
      case "[object FormData]":
        return true;
      default:
        return false;
    }
  }
  /**
   * @return {?}
   */
  function getXHR() {
    if (global.XMLHttpRequest && ("file:" != global.location.protocol || !global.ActiveXObject)) {
      return new XMLHttpRequest;
    }
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    }
    return false;
  }
  /**
   * @param {string} obj
   * @return {?}
   */
  function isObject(obj) {
    return obj === Object(obj);
  }
  /**
   * @param {string} obj
   * @return {?}
   */
  function serialize(obj) {
    if (!isObject(obj)) {
      return obj;
    }
    /** @type {!Array} */
    var drilldownLevelLabels = [];
    var key;
    for (key in obj) {
      if (null != obj[key]) {
        drilldownLevelLabels.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
      }
    }
    return drilldownLevelLabels.join("&");
  }
  /**
   * @param {string} s
   * @return {?}
   */
  function parseString(s) {
    var parsedQR;
    var firstepisode;
    var obj = {};
    var attempts = s.split("&");
    /** @type {number} */
    var i = 0;
    var attemptsLength = attempts.length;
    for (; attemptsLength > i; ++i) {
      firstepisode = attempts[i];
      parsedQR = firstepisode.split("=");
      /** @type {string} */
      obj[decodeURIComponent(parsedQR[0])] = decodeURIComponent(parsedQR[1]);
    }
    return obj;
  }
  /**
   * @param {string} headerStr
   * @return {?}
   */
  function parseHeader(headerStr) {
    var index;
    var s;
    var backend;
    var name;
    var ds = headerStr.split(/\r?\n/);
    var params = {};
    ds.pop();
    /** @type {number} */
    var j = 0;
    var length = ds.length;
    for (; length > j; ++j) {
      s = ds[j];
      index = s.indexOf(":");
      backend = s.slice(0, index).toLowerCase();
      name = trim(s.slice(index + 1));
      params[backend] = name;
    }
    return params;
  }
  /**
   * @param {string} val
   * @return {?}
   */
  function type(val) {
    return val.split(/ *; */).shift();
  }
  /**
   * @param {string} str
   * @return {?}
   */
  function params(str) {
    return reduce(str.split(/ *; */), function(outArray, clusterShardData) {
      var _sizeAnimateTimeStamps = clusterShardData.split(/ *= */);
      var i = _sizeAnimateTimeStamps.shift();
      var g = _sizeAnimateTimeStamps.shift();
      return i && g && (outArray[i] = g), outArray;
    }, {});
  }
  /**
   * @param {!Object} xhr
   * @param {number} url
   * @return {undefined}
   */
  function Response(xhr, url) {
    url = url || {};
    /** @type {!Object} */
    this.req = xhr;
    this.xhr = this.req.xhr;
    this.text = "HEAD" != this.req.method ? this.xhr.responseText : null;
    this.setStatusProperties(this.xhr.status);
    this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
    this.header["content-type"] = this.xhr.getResponseHeader("content-type");
    this.setHeaderProperties(this.header);
    this.body = "HEAD" != this.req.method ? this.parseBody(this.text) : null;
  }
  /**
   * @param {string} method
   * @param {string} url
   * @return {undefined}
   */
  function Request(method, url) {
    var data = this;
    Emitter.call(this);
    this._query = this._query || [];
    /** @type {string} */
    this.method = method;
    /** @type {string} */
    this.url = url;
    this.header = {};
    this._header = {};
    this.on("end", function() {
      /** @type {null} */
      var error = null;
      /** @type {null} */
      var output = null;
      try {
        output = new Response(data);
      } catch (str) {
        /** @type {!Error} */
        error = new Error("Parser is unable to parse the response");
        /** @type {boolean} */
        error.parse = true;
        error.original = str;
      }
      data.callback(error, output);
    });
  }
  /**
   * @param {string} method
   * @param {!Object} callback
   * @return {?}
   */
  function request(method, callback) {
    return "function" == typeof callback ? (new Request("GET", method)).end(callback) : 1 == arguments.length ? new Request("GET", method) : new Request(method, callback);
  }
  var Emitter = require(177);
  var reduce = require(178);
  var global = "undefined" == typeof window ? this : window;
  /** @type {function(!Object): ?} */
  var trim = "".trim ? function(commentToCheck) {
    return commentToCheck.trim();
  } : function(aShortcut) {
    return aShortcut.replace(/(^\s*|\s*$)/g, "");
  };
  /** @type {function(string): ?} */
  request.serializeObject = serialize;
  /** @type {function(string): ?} */
  request.parseString = parseString;
  request.types = {
    html : "text/html",
    json : "application/json",
    xml : "application/xml",
    urlencoded : "application/x-www-form-urlencoded",
    form : "application/x-www-form-urlencoded",
    "form-data" : "application/x-www-form-urlencoded"
  };
  request.serialize = {
    "application/x-www-form-urlencoded" : serialize,
    "application/json" : JSON.stringify
  };
  request.parse = {
    "application/x-www-form-urlencoded" : parseString,
    "application/json" : JSON.parse
  };
  /**
   * @param {string} query
   * @return {?}
   */
  Response.prototype.get = function(query) {
    return this.header[query.toLowerCase()];
  };
  /**
   * @param {?} header
   * @return {undefined}
   */
  Response.prototype.setHeaderProperties = function(header) {
    var ct = this.header["content-type"] || "";
    this.type = type(ct);
    var obj = params(ct);
    var prop;
    for (prop in obj) {
      this[prop] = obj[prop];
    }
  };
  /**
   * @param {!Object} str
   * @return {?}
   */
  Response.prototype.parseBody = function(str) {
    var parse = request.parse[this.type];
    return parse && str && str.length ? parse(str) : null;
  };
  /**
   * @param {number} status
   * @return {undefined}
   */
  Response.prototype.setStatusProperties = function(status) {
    /** @type {number} */
    var type = status / 100 | 0;
    /** @type {number} */
    this.status = status;
    /** @type {number} */
    this.statusType = type;
    /** @type {boolean} */
    this.info = 1 == type;
    /** @type {boolean} */
    this.ok = 2 == type;
    /** @type {boolean} */
    this.clientError = 4 == type;
    /** @type {boolean} */
    this.serverError = 5 == type;
    this.error = 4 == type || 5 == type ? this.toError() : false;
    /** @type {boolean} */
    this.accepted = 202 == status;
    /** @type {boolean} */
    this.noContent = 204 == status || 1223 == status;
    /** @type {boolean} */
    this.badRequest = 400 == status;
    /** @type {boolean} */
    this.unauthorized = 401 == status;
    /** @type {boolean} */
    this.notAcceptable = 406 == status;
    /** @type {boolean} */
    this.notFound = 404 == status;
    /** @type {boolean} */
    this.forbidden = 403 == status;
  };
  /**
   * @return {?}
   */
  Response.prototype.toError = function() {
    var req = this.req;
    var method = req.method;
    var url = req.url;
    /** @type {string} */
    var errMsg = "cannot " + method + " " + url + " (" + this.status + ")";
    /** @type {!Error} */
    var err = new Error(errMsg);
    return err.status = this.status, err.method = method, err.url = url, err;
  };
  /** @type {function(!Object, number): undefined} */
  request.Response = Response;
  Emitter(Request.prototype);
  /**
   * @param {?} create_content
   * @return {?}
   */
  Request.prototype.use = function(create_content) {
    return create_content(this), this;
  };
  /**
   * @param {number} ms
   * @return {?}
   */
  Request.prototype.timeout = function(ms) {
    return this._timeout = ms, this;
  };
  /**
   * @return {?}
   */
  Request.prototype.clearTimeout = function() {
    return this._timeout = 0, clearTimeout(this._timer), this;
  };
  /**
   * @return {?}
   */
  Request.prototype.abort = function() {
    return this.aborted ? void 0 : (this.aborted = true, this.xhr.abort(), this.clearTimeout(), this.emit("abort"), this);
  };
  /**
   * @param {string} key
   * @param {string} value
   * @return {?}
   */
  Request.prototype.set = function(key, value) {
    if (isObject(key)) {
      var attr;
      for (attr in key) {
        this.set(attr, key[attr]);
      }
      return this;
    }
    return this._header[key.toLowerCase()] = value, this.header[key] = value, this;
  };
  /**
   * @param {string} field
   * @return {?}
   */
  Request.prototype.unset = function(field) {
    return delete this._header[field.toLowerCase()], delete this.header[field], this;
  };
  /**
   * @param {string} name
   * @return {?}
   */
  Request.prototype.getHeader = function(name) {
    return this._header[name.toLowerCase()];
  };
  /**
   * @param {string} type
   * @return {?}
   */
  Request.prototype.type = function(type) {
    return this.set("Content-Type", request.types[type] || type), this;
  };
  /**
   * @param {?} type
   * @return {?}
   */
  Request.prototype.accept = function(type) {
    return this.set("Accept", request.types[type] || type), this;
  };
  /**
   * @param {string} user
   * @param {string} pass
   * @return {?}
   */
  Request.prototype.auth = function(user, pass) {
    /** @type {string} */
    var str = btoa(user + ":" + pass);
    return this.set("Authorization", "Basic " + str), this;
  };
  /**
   * @param {string} val
   * @return {?}
   */
  Request.prototype.query = function(val) {
    return "string" != typeof val && (val = serialize(val)), val && this._query.push(val), this;
  };
  /**
   * @param {?} name
   * @param {?} value
   * @return {?}
   */
  Request.prototype.field = function(name, value) {
    return this._formData || (this._formData = new FormData), this._formData.append(name, value), this;
  };
  /**
   * @param {!Object} name
   * @param {?} file
   * @param {?} filename
   * @return {?}
   */
  Request.prototype.attach = function(name, file, filename) {
    return this._formData || (this._formData = new FormData), this._formData.append(name, file, filename), this;
  };
  /**
   * @param {string} data
   * @return {?}
   */
  Request.prototype.send = function(data) {
    var obj = isObject(data);
    var type = this.getHeader("Content-Type");
    if (obj && isObject(this._data)) {
      var i;
      for (i in data) {
        this._data[i] = data[i];
      }
    } else {
      if ("string" == typeof data) {
        if (!type) {
          this.type("form");
        }
        type = this.getHeader("Content-Type");
        if ("application/x-www-form-urlencoded" == type) {
          /** @type {string} */
          this._data = this._data ? this._data + "&" + data : data;
        } else {
          /** @type {string} */
          this._data = (this._data || "") + data;
        }
      } else {
        /** @type {string} */
        this._data = data;
      }
    }
    return obj ? (type || this.type("json"), this) : this;
  };
  /**
   * @param {string} err
   * @param {!Object} data
   * @return {?}
   */
  Request.prototype.callback = function(err, data) {
    var c = this._callback;
    return this.clearTimeout(), 2 == c.length ? c(err, data) : err ? this.emit("error", err) : void c(data);
  };
  /**
   * @return {undefined}
   */
  Request.prototype.crossDomainError = function() {
    /** @type {!Error} */
    var err = new Error("Origin is not allowed by Access-Control-Allow-Origin");
    /** @type {boolean} */
    err.crossDomain = true;
    this.callback(err);
  };
  /**
   * @return {undefined}
   */
  Request.prototype.timeoutError = function() {
    var timeout = this._timeout;
    /** @type {!Error} */
    var err = new Error("timeout of " + timeout + "ms exceeded");
    err.timeout = timeout;
    this.callback(err);
  };
  /**
   * @return {?}
   */
  Request.prototype.withCredentials = function() {
    return this._withCredentials = true, this;
  };
  /**
   * @param {!Function} fn
   * @return {?}
   */
  Request.prototype.end = function(fn) {
    var self = this;
    var xhr = this.xhr = getXHR();
    var query = this._query.join("&");
    var timeout = this._timeout;
    var data = this._formData || this._data;
    if (this._callback = fn || noop, xhr.onreadystatechange = function() {
      return 4 == xhr.readyState ? 0 == xhr.status ? self.aborted ? self.timeoutError() : self.crossDomainError() : void self.emit("end") : void 0;
    }, xhr.upload && (xhr.upload.onprogress = function(e) {
      /** @type {number} */
      e.percent = e.loaded / e.total * 100;
      self.emit("progress", e);
    }), timeout && !this._timer && (this._timer = setTimeout(function() {
      self.abort();
    }, timeout)), query && (query = request.serializeObject(query), this.url += ~this.url.indexOf("?") ? "&" + query : "?" + query), xhr.open(this.method, this.url, true), this._withCredentials && (xhr.withCredentials = true), "GET" != this.method && "HEAD" != this.method && "string" != typeof data && !validateBaseArgs(data)) {
      var unescape_html = request.serialize[this.getHeader("Content-Type")];
      if (unescape_html) {
        data = unescape_html(data);
      }
    }
    var i;
    for (i in this.header) {
      if (null != this.header[i]) {
        xhr.setRequestHeader(i, this.header[i]);
      }
    }
    return this.emit("request", this), xhr.send(data), this;
  };
  /** @type {function(string, string): undefined} */
  request.Request = Request;
  /**
   * @param {string} type
   * @param {string} n
   * @param {string} t
   * @return {?}
   */
  request.get = function(type, n, t) {
    var result = request("GET", type);
    return "function" == typeof n && (t = n, n = null), n && result.query(n), t && result.end(t), result;
  };
  /**
   * @param {undefined} options
   * @param {string} n
   * @param {string} t
   * @return {?}
   */
  request.head = function(options, n, t) {
    var res = request("HEAD", options);
    return "function" == typeof n && (t = n, n = null), n && res.send(n), t && res.end(t), res;
  };
  /**
   * @param {undefined} url
   * @param {!Function} callback
   * @return {?}
   */
  request.del = function(url, callback) {
    var req = request("DELETE", url);
    return callback && req.end(callback), req;
  };
  /**
   * @param {undefined} url
   * @param {string} n
   * @param {string} t
   * @return {?}
   */
  request.patch = function(url, n, t) {
    var req = request("PATCH", url);
    return "function" == typeof n && (t = n, n = null), n && req.send(n), t && req.end(t), req;
  };
  /**
   * @param {undefined} data
   * @param {string} n
   * @param {string} e
   * @return {?}
   */
  request.post = function(data, n, e) {
    var req = request("POST", data);
    return "function" == typeof n && (e = n, n = null), n && req.send(n), e && req.end(e), req;
  };
  /**
   * @param {undefined} url
   * @param {string} t
   * @param {string} i
   * @return {?}
   */
  request.put = function(url, t, i) {
    var res = request("PUT", url);
    return "function" == typeof t && (i = t, t = null), t && res.send(t), i && res.end(i), res;
  };
  /** @type {function(string, !Object): ?} */
  module.exports = request;
}, function(module, canCreateDiscussions, n) {
  /**
   * @param {string} obj
   * @return {?}
   */
  function Emitter(obj) {
    return obj ? clone(obj) : void 0;
  }
  /**
   * @param {string} object
   * @return {?}
   */
  function clone(object) {
    var key;
    for (key in Emitter.prototype) {
      object[key] = Emitter.prototype[key];
    }
    return object;
  }
  /** @type {function(string): ?} */
  module.exports = Emitter;
  /** @type {function(string, !Function): ?} */
  Emitter.prototype.on = Emitter.prototype.addEventListener = function(type, e) {
    return this._callbacks = this._callbacks || {}, (this._callbacks[type] = this._callbacks[type] || []).push(e), this;
  };
  /**
   * @param {string} event
   * @param {!Function} fn
   * @return {?}
   */
  Emitter.prototype.once = function(event, fn) {
    /**
     * @return {undefined}
     */
    function on() {
      $animate.off(event, on);
      fn.apply(this, arguments);
    }
    var $animate = this;
    return this._callbacks = this._callbacks || {}, on.fn = fn, this.on(event, on), this;
  };
  /** @type {function(string, !Function): ?} */
  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(type, fn) {
    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) {
      return this._callbacks = {}, this;
    }
    var callbacks = this._callbacks[type];
    if (!callbacks) {
      return this;
    }
    if (1 == arguments.length) {
      return delete this._callbacks[type], this;
    }
    var cb;
    /** @type {number} */
    var i = 0;
    for (; i < callbacks.length; i++) {
      if (cb = callbacks[i], cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };
  /**
   * @param {string} event
   * @return {?}
   */
  Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    /** @type {!Array<?>} */
    var cmd_args = [].slice.call(arguments, 1);
    var callbacks = this._callbacks[event];
    if (callbacks) {
      callbacks = callbacks.slice(0);
      /** @type {number} */
      var l = 0;
      var i = callbacks.length;
      for (; i > l; ++l) {
        callbacks[l].apply(this, cmd_args);
      }
    }
    return this;
  };
  /**
   * @param {?} type
   * @return {?}
   */
  Emitter.prototype.listeners = function(type) {
    return this._callbacks = this._callbacks || {}, this._callbacks[type] || [];
  };
  /**
   * @param {?} event
   * @return {?}
   */
  Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };
}, function(mixin, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @param {!Object} fn
   * @param {(Element|!Function)} initial
   * @return {?}
   */
  mixin.exports = function(obj, fn, initial) {
    /** @type {number} */
    var i = 0;
    var length = obj.length;
    var curr = 3 == arguments.length ? initial : obj[i++];
    for (; length > i;) {
      curr = fn.call(null, curr, obj[i], ++i, obj);
    }
    return curr;
  };
}, function(canCreateDiscussions, exports, require) {
  (function(Buffer) {
    /**
     * @param {string} arg
     * @return {?}
     */
    function Buffer(arg) {
      return this instanceof Buffer ? (this.length = 0, this.parent = void 0, "number" == typeof arg ? fromNumber(this, arg) : "string" == typeof arg ? fromString(this, arg, arguments.length > 1 ? arguments[1] : "utf8") : write(this, arg)) : arguments.length > 1 ? new Buffer(arg, arguments[1]) : new Buffer(arg);
    }
    /**
     * @param {!Array} that
     * @param {number} length
     * @return {?}
     */
    function fromNumber(that, length) {
      if (that = allocate(that, 0 > length ? 0 : 0 | assert(length)), !Buffer.TYPED_ARRAY_SUPPORT) {
        /** @type {number} */
        var i = 0;
        for (; length > i; i++) {
          /** @type {number} */
          that[i] = 0;
        }
      }
      return that;
    }
    /**
     * @param {!Object} that
     * @param {string} string
     * @param {string} encoding
     * @return {?}
     */
    function fromString(that, string, encoding) {
      if ("string" != typeof encoding || "" === encoding) {
        /** @type {string} */
        encoding = "utf8";
      }
      /** @type {number} */
      var length = 0 | byteLength(string, encoding);
      return that = allocate(that, length), that.write(string, encoding), that;
    }
    /**
     * @param {string} value
     * @param {!Object} options
     * @return {?}
     */
    function write(value, options) {
      if (Buffer.isBuffer(options)) {
        return install(value, options);
      }
      if (isArray(options)) {
        return update(value, options);
      }
      if (null == options) {
        throw new TypeError("must start with number, buffer, array or string");
      }
      return "undefined" != typeof ArrayBuffer && options.buffer instanceof ArrayBuffer ? set(value, options) : options.length ? add(value, options) : fn(value, options);
    }
    /**
     * @param {string} e
     * @param {!Object} options
     * @return {?}
     */
    function install(e, options) {
      /** @type {number} */
      var end = 0 | assert(options.length);
      return e = allocate(e, end), options.copy(e, 0, 0, end), e;
    }
    /**
     * @param {string} that
     * @param {!Object} data
     * @return {?}
     */
    function update(that, data) {
      /** @type {number} */
      var length = 0 | assert(data.length);
      that = allocate(that, length);
      /** @type {number} */
      var i = 0;
      for (; length > i; i = i + 1) {
        /** @type {number} */
        that[i] = 255 & data[i];
      }
      return that;
    }
    /**
     * @param {string} h
     * @param {!Object} c
     * @return {?}
     */
    function set(h, c) {
      /** @type {number} */
      var a = 0 | assert(c.length);
      h = allocate(h, a);
      /** @type {number} */
      var b = 0;
      for (; a > b; b = b + 1) {
        /** @type {number} */
        h[b] = 255 & c[b];
      }
      return h;
    }
    /**
     * @param {string} that
     * @param {!Object} data
     * @return {?}
     */
    function add(that, data) {
      /** @type {number} */
      var length = 0 | assert(data.length);
      that = allocate(that, length);
      /** @type {number} */
      var i = 0;
      for (; length > i; i = i + 1) {
        /** @type {number} */
        that[i] = 255 & data[i];
      }
      return that;
    }
    /**
     * @param {string} b
     * @param {!Object} options
     * @return {?}
     */
    function fn(b, options) {
      var props;
      /** @type {number} */
      var length = 0;
      if ("Buffer" === options.type && isArray(options.data)) {
        props = options.data;
        /** @type {number} */
        length = 0 | assert(props.length);
      }
      b = allocate(b, length);
      /** @type {number} */
      var i = 0;
      for (; length > i; i = i + 1) {
        /** @type {number} */
        b[i] = 255 & props[i];
      }
      return b;
    }
    /**
     * @param {?} data
     * @param {number} length
     * @return {?}
     */
    function allocate(data, length) {
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        data = Buffer._augment(new Uint8Array(length));
      } else {
        /** @type {number} */
        data.length = length;
        /** @type {boolean} */
        data._isBuffer = true;
      }
      /** @type {boolean} */
      var prev = 0 !== length && length <= Buffer.poolSize >>> 1;
      return prev && (data.parent = self), data;
    }
    /**
     * @param {number} y
     * @return {?}
     */
    function assert(y) {
      if (y >= top) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + top.toString(16) + " bytes");
      }
      return 0 | y;
    }
    /**
     * @param {?} size
     * @param {boolean} encoding
     * @return {?}
     */
    function SlowBuffer(size, encoding) {
      if (!(this instanceof SlowBuffer)) {
        return new SlowBuffer(size, encoding);
      }
      var buf = new Buffer(size, encoding);
      return delete buf.parent, buf;
    }
    /**
     * @param {string} string
     * @param {string} encoding
     * @return {?}
     */
    function byteLength(string, encoding) {
      if ("string" != typeof string && (string = String(string)), 0 === string.length) {
        return 0;
      }
      switch(encoding || "utf8") {
        case "ascii":
        case "binary":
        case "raw":
          return string.length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * string.length;
        case "hex":
          return string.length >>> 1;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "base64":
          return base64ToBytes(string).length;
        default:
          return string.length;
      }
    }
    /**
     * @param {!Object} array
     * @param {string} html
     * @param {number} offset
     * @param {number} x
     * @return {?}
     */
    function callback(array, html, offset, x) {
      /** @type {number} */
      offset = Number(offset) || 0;
      /** @type {number} */
      var x0 = array.length - offset;
      if (x) {
        /** @type {number} */
        x = Number(x);
        if (x > x0) {
          /** @type {number} */
          x = x0;
        }
      } else {
        /** @type {number} */
        x = x0;
      }
      var w = html.length;
      if (w % 2 !== 0) {
        throw new Error("Invalid hex string");
      }
      if (x > w / 2) {
        /** @type {number} */
        x = w / 2;
      }
      /** @type {number} */
      var length = 0;
      for (; x > length; length++) {
        /** @type {number} */
        var last = parseInt(html.substr(2 * length, 2), 16);
        if (isNaN(last)) {
          throw new Error("Invalid hex string");
        }
        /** @type {number} */
        array[offset + length] = last;
      }
      return length;
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    /**
     * @param {(Node|NodeList|string)} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function binaryWrite(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    /**
     * @param {!Object} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function base64Slice(buf, start, end) {
      return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
    }
    /**
     * @param {!Array} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function utf8Slice(buf, start, end) {
      /** @type {string} */
      var result = "";
      /** @type {string} */
      var value = "";
      /** @type {number} */
      end = Math.min(buf.length, end);
      /** @type {number} */
      var i = start;
      for (; end > i; i++) {
        if (buf[i] <= 127) {
          /** @type {string} */
          result = result + (d(value) + String.fromCharCode(buf[i]));
          /** @type {string} */
          value = "";
        } else {
          /** @type {string} */
          value = value + ("%" + buf[i].toString(16));
        }
      }
      return result + d(value);
    }
    /**
     * @param {!Array} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function asciiSlice(buf, start, end) {
      /** @type {string} */
      var ret = "";
      /** @type {number} */
      end = Math.min(buf.length, end);
      /** @type {number} */
      var offset = start;
      for (; end > offset; offset++) {
        /** @type {string} */
        ret = ret + String.fromCharCode(127 & buf[offset]);
      }
      return ret;
    }
    /**
     * @param {!Array} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function binarySlice(buf, start, end) {
      /** @type {string} */
      var ret = "";
      /** @type {number} */
      end = Math.min(buf.length, end);
      /** @type {number} */
      var i = start;
      for (; end > i; i++) {
        /** @type {string} */
        ret = ret + String.fromCharCode(buf[i]);
      }
      return ret;
    }
    /**
     * @param {!Array} text
     * @param {number} index
     * @param {number} b
     * @return {?}
     */
    function render(text, index, b) {
      var t = text.length;
      if (!index || 0 > index) {
        /** @type {number} */
        index = 0;
      }
      if (!b || 0 > b || b > t) {
        b = t;
      }
      /** @type {string} */
      var source = "";
      /** @type {number} */
      var i = index;
      for (; b > i; i++) {
        /** @type {string} */
        source = source + substitute(text[i]);
      }
      return source;
    }
    /**
     * @param {string} array
     * @param {number} offset
     * @param {number} value
     * @return {?}
     */
    function toString(array, offset, value) {
      var r = array.slice(offset, value);
      /** @type {string} */
      var finalTable = "";
      /** @type {number} */
      var i = 0;
      for (; i < r.length; i = i + 2) {
        /** @type {string} */
        finalTable = finalTable + String.fromCharCode(r[i] + 256 * r[i + 1]);
      }
      return finalTable;
    }
    /**
     * @param {number} offset
     * @param {number} ext
     * @param {?} length
     * @return {undefined}
     */
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || 0 > offset) {
        throw new RangeError("offset is not uint");
      }
      if (offset + ext > length) {
        throw new RangeError("Trying to access beyond buffer length");
      }
    }
    /**
     * @param {!Array} buffer
     * @param {number} value
     * @param {number} offset
     * @param {number} ext
     * @param {number} max
     * @param {number} min
     * @return {undefined}
     */
    function checkInt(buffer, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buffer)) {
        throw new TypeError("buffer must be a Buffer instance");
      }
      if (value > max || min > value) {
        throw new RangeError("value is out of bounds");
      }
      if (offset + ext > buffer.length) {
        throw new RangeError("index out of range");
      }
    }
    /**
     * @param {!NodeList} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @return {undefined}
     */
    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (0 > value) {
        value = 65535 + value + 1;
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var indexOfRequirement = Math.min(buf.length - offset, 2);
      for (; indexOfRequirement > i; i++) {
        /** @type {number} */
        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
    }
    /**
     * @param {!NodeList} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @return {undefined}
     */
    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (0 > value) {
        value = 4294967295 + value + 1;
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var indexOfRequirement = Math.min(buf.length - offset, 4);
      for (; indexOfRequirement > i; i++) {
        /** @type {number} */
        buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
    }
    /**
     * @param {string} buf
     * @param {!Object} value
     * @param {number} offset
     * @param {number} ext
     * @param {!Object} max
     * @param {!Object} min
     * @return {undefined}
     */
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (value > max || min > value) {
        throw new RangeError("value is out of bounds");
      }
      if (offset + ext > buf.length) {
        throw new RangeError("index out of range");
      }
      if (0 > offset) {
        throw new RangeError("index out of range");
      }
    }
    /**
     * @param {string} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @param {string} noAssert
     * @return {?}
     */
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      return noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886E38, -3.4028234663852886E38), ieee754.write(buf, value, offset, littleEndian, 23, 4), offset + 4;
    }
    /**
     * @param {string} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @param {string} noAssert
     * @return {?}
     */
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      return noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157E308, -1.7976931348623157E308), ieee754.write(buf, value, offset, littleEndian, 52, 8), offset + 8;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function base64clean(str) {
      if (str = trim(str).replace(ampRe, ""), str.length < 2) {
        return "";
      }
      for (; str.length % 4 !== 0;) {
        /** @type {string} */
        str = str + "=";
      }
      return str;
    }
    /**
     * @param {string} s
     * @return {?}
     */
    function trim(s) {
      return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, "");
    }
    /**
     * @param {number} dict
     * @return {?}
     */
    function substitute(dict) {
      return 16 > dict ? "0" + dict.toString(16) : dict.toString(16);
    }
    /**
     * @param {string} string
     * @param {number} units
     * @return {?}
     */
    function utf8ToBytes(string, units) {
      units = units || 1 / 0;
      var n;
      var length = string.length;
      /** @type {null} */
      var _PAGE_currentSubPage = null;
      /** @type {!Array} */
      var bytes = [];
      /** @type {number} */
      var i = 0;
      for (; length > i; i++) {
        if (n = string.charCodeAt(i), n > 55295 && 57344 > n) {
          if (!_PAGE_currentSubPage) {
            if (n > 56319) {
              if ((units = units - 3) > -1) {
                bytes.push(239, 191, 189);
              }
              continue;
            }
            if (i + 1 === length) {
              if ((units = units - 3) > -1) {
                bytes.push(239, 191, 189);
              }
              continue;
            }
            _PAGE_currentSubPage = n;
            continue;
          }
          if (56320 > n) {
            if ((units = units - 3) > -1) {
              bytes.push(239, 191, 189);
            }
            _PAGE_currentSubPage = n;
            continue;
          }
          /** @type {number} */
          n = _PAGE_currentSubPage - 55296 << 10 | n - 56320 | 65536;
          /** @type {null} */
          _PAGE_currentSubPage = null;
        } else {
          if (_PAGE_currentSubPage) {
            if ((units = units - 3) > -1) {
              bytes.push(239, 191, 189);
            }
            /** @type {null} */
            _PAGE_currentSubPage = null;
          }
        }
        if (128 > n) {
          if ((units = units - 1) < 0) {
            break;
          }
          bytes.push(n);
        } else {
          if (2048 > n) {
            if ((units = units - 2) < 0) {
              break;
            }
            bytes.push(n >> 6 | 192, 63 & n | 128);
          } else {
            if (65536 > n) {
              if ((units = units - 3) < 0) {
                break;
              }
              bytes.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
            } else {
              if (!(2097152 > n)) {
                throw new Error("Invalid code point");
              }
              if ((units = units - 4) < 0) {
                break;
              }
              bytes.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
            }
          }
        }
      }
      return bytes;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function asciiToBytes(str) {
      /** @type {!Array} */
      var byteArray = [];
      /** @type {number} */
      var i = 0;
      for (; i < str.length; i++) {
        byteArray.push(255 & str.charCodeAt(i));
      }
      return byteArray;
    }
    /**
     * @param {string} str
     * @param {number} units
     * @return {?}
     */
    function utf16leToBytes(str, units) {
      var docsToSelect;
      var lo;
      var hi;
      /** @type {!Array} */
      var byteArray = [];
      /** @type {number} */
      var endIndex = 0;
      for (; endIndex < str.length && !((units = units - 2) < 0); endIndex++) {
        docsToSelect = str.charCodeAt(endIndex);
        /** @type {number} */
        lo = docsToSelect >> 8;
        /** @type {number} */
        hi = docsToSelect % 256;
        byteArray.push(hi);
        byteArray.push(lo);
      }
      return byteArray;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    /**
     * @param {!NodeList} src
     * @param {(Array|NodeList)} dst
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function blitBuffer(src, dst, offset, length) {
      /** @type {number} */
      var i = 0;
      for (; length > i && !(i + offset >= dst.length || i >= src.length); i++) {
        dst[i + offset] = src[i];
      }
      return i;
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function d(value) {
      try {
        return decodeURIComponent(value);
      } catch (t) {
        return String.fromCharCode(65533);
      }
    }
    var base64 = require(184);
    var ieee754 = require(185);
    var isArray = require(186);
    /** @type {!Object} */
    exports.Buffer = Buffer;
    /** @type {function(?, boolean): ?} */
    exports.SlowBuffer = SlowBuffer;
    /** @type {number} */
    exports.INSPECT_MAX_BYTES = 50;
    /** @type {number} */
    Buffer.poolSize = 8192;
    /** @type {number} */
    var top = 1073741823;
    var self = {};
    Buffer.TYPED_ARRAY_SUPPORT = function() {
      try {
        /** @type {!ArrayBuffer} */
        var buffer = new ArrayBuffer(0);
        /** @type {!Uint8Array} */
        var message = new Uint8Array(buffer);
        return message.foo = function() {
          return 42;
        }, 42 === message.foo() && "function" == typeof message.subarray && 0 === (new Uint8Array(1)).subarray(1, 1).byteLength;
      } catch (n) {
        return false;
      }
    }();
    /**
     * @param {?} obj
     * @return {?}
     */
    Buffer.isBuffer = function(obj) {
      return !(null == obj || !obj._isBuffer);
    };
    /**
     * @param {!Array} value
     * @param {!Array} obj
     * @return {?}
     */
    Buffer.compare = function(value, obj) {
      if (!Buffer.isBuffer(value) || !Buffer.isBuffer(obj)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (value === obj) {
        return 0;
      }
      var y = value.length;
      var x = obj.length;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var r = Math.min(y, x);
      for (; r > i && value[i] === obj[i];) {
        ++i;
      }
      return i !== r && (y = value[i], x = obj[i]), x > y ? -1 : y > x ? 1 : 0;
    };
    /**
     * @param {?} encoding
     * @return {?}
     */
    Buffer.isEncoding = function(encoding) {
      switch(String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "raw":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    /**
     * @param {!Object} a
     * @param {number} t
     * @return {?}
     */
    Buffer.concat = function(a, t) {
      if (!isArray(a)) {
        throw new TypeError("list argument must be an Array of Buffers.");
      }
      if (0 === a.length) {
        return new Buffer(0);
      }
      if (1 === a.length) {
        return a[0];
      }
      var i;
      if (void 0 === t) {
        /** @type {number} */
        t = 0;
        /** @type {number} */
        i = 0;
        for (; i < a.length; i++) {
          t = t + a[i].length;
        }
      }
      var text = new Buffer(t);
      /** @type {number} */
      var b = 0;
      /** @type {number} */
      i = 0;
      for (; i < a.length; i++) {
        var p = a[i];
        p.copy(text, b);
        b = b + p.length;
      }
      return text;
    };
    /** @type {function(string, string): ?} */
    Buffer.byteLength = byteLength;
    Buffer.prototype.length = void 0;
    Buffer.prototype.parent = void 0;
    /**
     * @param {string} encoding
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.toString = function(encoding, start, end) {
      /** @type {boolean} */
      var r = false;
      if (start = 0 | start, end = void 0 === end || end === 1 / 0 ? this.length : 0 | end, encoding || (encoding = "utf8"), 0 > start && (start = 0), end > this.length && (end = this.length), start >= end) {
        return "";
      }
      for (;;) {
        switch(encoding) {
          case "hex":
            return render(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "binary":
            return binarySlice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return toString(this, start, end);
          default:
            if (r) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            /** @type {string} */
            encoding = (encoding + "").toLowerCase();
            /** @type {boolean} */
            r = true;
        }
      }
    };
    /**
     * @param {?} b
     * @return {?}
     */
    Buffer.prototype.equals = function(b) {
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("Argument must be a Buffer");
      }
      return this === b ? true : 0 === Buffer.compare(this, b);
    };
    /**
     * @return {?}
     */
    Buffer.prototype.inspect = function() {
      /** @type {string} */
      var pix_color = "";
      var max = exports.INSPECT_MAX_BYTES;
      return this.length > 0 && (pix_color = this.toString("hex", 0, max).match(/.{2}/g).join(" "), this.length > max && (pix_color = pix_color + " ... ")), "<Buffer " + pix_color + ">";
    };
    /**
     * @param {?} b
     * @return {?}
     */
    Buffer.prototype.compare = function(b) {
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("Argument must be a Buffer");
      }
      return this === b ? 0 : Buffer.compare(this, b);
    };
    /**
     * @param {string} value
     * @param {number} i
     * @return {?}
     */
    Buffer.prototype.indexOf = function(value, i) {
      /**
       * @param {!NodeList} arr
       * @param {!Object} val
       * @param {number} i
       * @return {?}
       */
      function indexOf(arr, val, i) {
        /** @type {number} */
        var i0 = -1;
        /** @type {number} */
        var j = 0;
        for (; i + j < arr.length; j++) {
          if (arr[i + j] === val[-1 === i0 ? 0 : j - i0]) {
            if (-1 === i0 && (i0 = j), j - i0 + 1 === val.length) {
              return i + i0;
            }
          } else {
            /** @type {number} */
            i0 = -1;
          }
        }
        return -1;
      }
      if (i > 2147483647 ? i = 2147483647 : -2147483648 > i && (i = -2147483648), i = i >> 0, 0 === this.length) {
        return -1;
      }
      if (i >= this.length) {
        return -1;
      }
      if (0 > i && (i = Math.max(this.length + i, 0)), "string" == typeof value) {
        return 0 === value.length ? -1 : String.prototype.indexOf.call(this, value, i);
      }
      if (Buffer.isBuffer(value)) {
        return indexOf(this, value, i);
      }
      if ("number" == typeof value) {
        return Buffer.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, value, i) : indexOf(this, [value], i);
      }
      throw new TypeError("val must be string, number or Buffer");
    };
    /**
     * @param {string} o
     * @return {?}
     */
    Buffer.prototype.get = function(o) {
      return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(o);
    };
    /**
     * @param {string} type
     * @param {?} offset
     * @return {?}
     */
    Buffer.prototype.set = function(type, offset) {
      return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(type, offset);
    };
    /**
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @param {number} encoding
     * @return {?}
     */
    Buffer.prototype.write = function(string, offset, length, encoding) {
      if (void 0 === offset) {
        /** @type {string} */
        encoding = "utf8";
        length = this.length;
        /** @type {number} */
        offset = 0;
      } else {
        if (void 0 === length && "string" == typeof offset) {
          /** @type {number} */
          encoding = offset;
          length = this.length;
          /** @type {number} */
          offset = 0;
        } else {
          if (isFinite(offset)) {
            /** @type {number} */
            offset = 0 | offset;
            if (isFinite(length)) {
              /** @type {number} */
              length = 0 | length;
              if (void 0 === encoding) {
                /** @type {string} */
                encoding = "utf8";
              }
            } else {
              /** @type {number} */
              encoding = length;
              length = void 0;
            }
          } else {
            /** @type {number} */
            var swap = encoding;
            /** @type {number} */
            encoding = offset;
            /** @type {number} */
            offset = 0 | length;
            length = swap;
          }
        }
      }
      /** @type {number} */
      var remaining = this.length - offset;
      if ((void 0 === length || length > remaining) && (length = remaining), string.length > 0 && (0 > length || 0 > offset) || offset > this.length) {
        throw new RangeError("attempt to write outside buffer bounds");
      }
      if (!encoding) {
        /** @type {string} */
        encoding = "utf8";
      }
      /** @type {boolean} */
      var a = false;
      for (;;) {
        switch(encoding) {
          case "hex":
            return callback(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "binary":
            return binaryWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (a) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            /** @type {string} */
            encoding = ("" + encoding).toLowerCase();
            /** @type {boolean} */
            a = true;
        }
      }
    };
    /**
     * @return {?}
     */
    Buffer.prototype.toJSON = function() {
      return {
        type : "Buffer",
        data : Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    /**
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.slice = function(start, end) {
      var len = this.length;
      /** @type {number} */
      start = ~~start;
      end = void 0 === end ? len : ~~end;
      if (0 > start) {
        start = start + len;
        if (0 > start) {
          /** @type {number} */
          start = 0;
        }
      } else {
        if (start > len) {
          start = len;
        }
      }
      if (0 > end) {
        end = end + len;
        if (0 > end) {
          /** @type {number} */
          end = 0;
        }
      } else {
        if (end > len) {
          end = len;
        }
      }
      if (start > end) {
        /** @type {number} */
        end = start;
      }
      var newBuf;
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = Buffer._augment(this.subarray(start, end));
      } else {
        /** @type {number} */
        var sliceLen = end - start;
        newBuf = new Buffer(sliceLen, void 0);
        /** @type {number} */
        var i = 0;
        for (; sliceLen > i; i++) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf.length && (newBuf.parent = this.parent || this), newBuf;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readUIntLE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset];
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      for (; ++i < byteLength && (mul = mul * 256);) {
        val = val + this[offset + i] * mul;
      }
      return val;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readUIntBE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset + --byteLength];
      /** @type {number} */
      var mul = 1;
      for (; byteLength > 0 && (mul = mul * 256);) {
        val = val + this[offset + --byteLength] * mul;
      }
      return val;
    };
    /**
     * @param {?} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt8 = function(offset, limit) {
      return limit || checkOffset(offset, 1, this.length), this[offset];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt16LE = function(offset, limit) {
      return limit || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt16BE = function(offset, limit) {
      return limit || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt32LE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt32BE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readIntLE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset];
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      for (; ++i < byteLength && (mul = mul * 256);) {
        val = val + this[offset + i] * mul;
      }
      return mul = mul * 128, val >= mul && (val = val - Math.pow(2, 8 * byteLength)), val;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readIntBE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      /** @type {number} */
      var i = byteLength;
      /** @type {number} */
      var length = 1;
      var index = this[offset + --i];
      for (; i > 0 && (length = length * 256);) {
        index = index + this[offset + --i] * length;
      }
      return length = length * 128, index >= length && (index = index - Math.pow(2, 8 * byteLength)), index;
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt8 = function(offset, limit) {
      return limit || checkOffset(offset, 1, this.length), 128 & this[offset] ? -1 * (255 - this[offset] + 1) : this[offset];
    };
    /**
     * @param {number} offset
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readInt16LE = function(offset, noAssert) {
      if (!noAssert) {
        checkOffset(offset, 2, this.length);
      }
      /** @type {number} */
      var n = this[offset] | this[offset + 1] << 8;
      return 32768 & n ? 4294901760 | n : n;
    };
    /**
     * @param {number} offset
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readInt16BE = function(offset, noAssert) {
      if (!noAssert) {
        checkOffset(offset, 2, this.length);
      }
      /** @type {number} */
      var n = this[offset + 1] | this[offset] << 8;
      return 32768 & n ? 4294901760 | n : n;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt32LE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt32BE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readFloatLE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), ieee754.read(this, offset, true, 23, 4);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readFloatBE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), ieee754.read(this, offset, false, 23, 4);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readDoubleLE = function(offset, limit) {
      return limit || checkOffset(offset, 8, this.length), ieee754.read(this, offset, true, 52, 8);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readDoubleBE = function(offset, limit) {
      return limit || checkOffset(offset, 8, this.length), ieee754.read(this, offset, false, 52, 8);
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUIntLE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
      }
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      this[offset] = 255 & value;
      for (; ++i < byteLength && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUIntBE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
      }
      /** @type {number} */
      var i = byteLength - 1;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      this[offset + i] = 255 & value;
      for (; --i >= 0 && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {?} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = value, offset + 1;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, true), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value) : objectWriteUInt16(this, value, offset, false), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, this[offset + 1] = value >>> 8, this[offset] = value) : objectWriteUInt32(this, value, offset, true), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value) : objectWriteUInt32(this, value, offset, false), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeIntLE = function(value, offset, byteLength, noAssert) {
      if (value = +value, offset = 0 | offset, !noAssert) {
        /** @type {number} */
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var s = 0 > value ? 1 : 0;
      /** @type {number} */
      this[offset] = 255 & value;
      for (; ++i < byteLength && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = (value / mul >> 0) - s & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeIntBE = function(value, offset, byteLength, noAssert) {
      if (value = +value, offset = 0 | offset, !noAssert) {
        /** @type {number} */
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }
      /** @type {number} */
      var i = byteLength - 1;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var s = 0 > value ? 1 : 0;
      /** @type {number} */
      this[offset + i] = 255 & value;
      for (; --i >= 0 && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = (value / mul >> 0) - s & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), 0 > value && (value = 255 + value + 1), this[offset] = value, offset + 1;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, true), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value) : objectWriteUInt16(this, value, offset, false), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value, this[offset + 1] = value >>> 8, this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, true), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 0 > value && (value = 4294967295 + value + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value) : objectWriteUInt32(this, value, offset, false), offset + 4;
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    /**
     * @param {!Object} target
     * @param {number} targetStart
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.copy = function(target, targetStart, start, end) {
      if (start || (start = 0), end || 0 === end || (end = this.length), targetStart >= target.length && (targetStart = target.length), targetStart || (targetStart = 0), end > 0 && start > end && (end = start), end === start) {
        return 0;
      }
      if (0 === target.length || 0 === this.length) {
        return 0;
      }
      if (0 > targetStart) {
        throw new RangeError("targetStart out of bounds");
      }
      if (0 > start || start >= this.length) {
        throw new RangeError("sourceStart out of bounds");
      }
      if (0 > end) {
        throw new RangeError("sourceEnd out of bounds");
      }
      if (end > this.length) {
        end = this.length;
      }
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      /** @type {number} */
      var len = end - start;
      if (1E3 > len || !Buffer.TYPED_ARRAY_SUPPORT) {
        /** @type {number} */
        var i = 0;
        for (; len > i; i++) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        target._set(this.subarray(start, start + len), targetStart);
      }
      return len;
    };
    /**
     * @param {string} s
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.fill = function(s, start, end) {
      if (s || (s = 0), start || (start = 0), end || (end = this.length), start > end) {
        throw new RangeError("end < start");
      }
      if (end !== start && 0 !== this.length) {
        if (0 > start || start >= this.length) {
          throw new RangeError("start out of bounds");
        }
        if (0 > end || end > this.length) {
          throw new RangeError("end out of bounds");
        }
        var i;
        if ("number" == typeof s) {
          /** @type {number} */
          i = start;
          for (; end > i; i++) {
            /** @type {string} */
            this[i] = s;
          }
        } else {
          var bytes = utf8ToBytes(s.toString());
          var len = bytes.length;
          /** @type {number} */
          i = start;
          for (; end > i; i++) {
            this[i] = bytes[i % len];
          }
        }
        return this;
      }
    };
    /**
     * @return {?}
     */
    Buffer.prototype.toArrayBuffer = function() {
      if ("undefined" != typeof Uint8Array) {
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          return (new Buffer(this)).buffer;
        }
        /** @type {!Uint8Array} */
        var buf = new Uint8Array(this.length);
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = buf.length;
        for (; l > i; i = i + 1) {
          buf[i] = this[i];
        }
        return buf.buffer;
      }
      throw new TypeError("Buffer.toArrayBuffer not supported in this browser");
    };
    var BP = Buffer.prototype;
    /**
     * @param {!Object} arr
     * @return {?}
     */
    Buffer._augment = function(arr) {
      return arr.constructor = Buffer, arr._isBuffer = true, arr._set = arr.set, arr.get = BP.get, arr.set = BP.set, arr.write = BP.write, arr.toString = BP.toString, arr.toLocaleString = BP.toString, arr.toJSON = BP.toJSON, arr.equals = BP.equals, arr.compare = BP.compare, arr.indexOf = BP.indexOf, arr.copy = BP.copy, arr.slice = BP.slice, arr.readUIntLE = BP.readUIntLE, arr.readUIntBE = BP.readUIntBE, arr.readUInt8 = BP.readUInt8, arr.readUInt16LE = BP.readUInt16LE, arr.readUInt16BE = BP.readUInt16BE,
      arr.readUInt32LE = BP.readUInt32LE, arr.readUInt32BE = BP.readUInt32BE, arr.readIntLE = BP.readIntLE, arr.readIntBE = BP.readIntBE, arr.readInt8 = BP.readInt8, arr.readInt16LE = BP.readInt16LE, arr.readInt16BE = BP.readInt16BE, arr.readInt32LE = BP.readInt32LE, arr.readInt32BE = BP.readInt32BE, arr.readFloatLE = BP.readFloatLE, arr.readFloatBE = BP.readFloatBE, arr.readDoubleLE = BP.readDoubleLE, arr.readDoubleBE = BP.readDoubleBE, arr.writeUInt8 = BP.writeUInt8, arr.writeUIntLE = BP.writeUIntLE,
      arr.writeUIntBE = BP.writeUIntBE, arr.writeUInt16LE = BP.writeUInt16LE, arr.writeUInt16BE = BP.writeUInt16BE, arr.writeUInt32LE = BP.writeUInt32LE, arr.writeUInt32BE = BP.writeUInt32BE, arr.writeIntLE = BP.writeIntLE, arr.writeIntBE = BP.writeIntBE, arr.writeInt8 = BP.writeInt8, arr.writeInt16LE = BP.writeInt16LE, arr.writeInt16BE = BP.writeInt16BE, arr.writeInt32LE = BP.writeInt32LE, arr.writeInt32BE = BP.writeInt32BE, arr.writeFloatLE = BP.writeFloatLE, arr.writeFloatBE = BP.writeFloatBE,
      arr.writeDoubleLE = BP.writeDoubleLE, arr.writeDoubleBE = BP.writeDoubleBE, arr.fill = BP.fill, arr.inspect = BP.inspect, arr.toArrayBuffer = BP.toArrayBuffer, arr;
    };
    /** @type {!RegExp} */
    var ampRe = /[^+\/0-9A-z\-]/g;
  }).call(exports, require(180).Buffer);
}, function(canCreateDiscussions, exports, require) {
  (function(Buffer) {
    /**
     * @param {string} arg
     * @return {?}
     */
    function Buffer(arg) {
      return this instanceof Buffer ? (this.length = 0, this.parent = void 0, "number" == typeof arg ? fromNumber(this, arg) : "string" == typeof arg ? fromString(this, arg, arguments.length > 1 ? arguments[1] : "utf8") : write(this, arg)) : arguments.length > 1 ? new Buffer(arg, arguments[1]) : new Buffer(arg);
    }
    /**
     * @param {!Array} that
     * @param {number} length
     * @return {?}
     */
    function fromNumber(that, length) {
      if (that = allocate(that, 0 > length ? 0 : 0 | assert(length)), !Buffer.TYPED_ARRAY_SUPPORT) {
        /** @type {number} */
        var i = 0;
        for (; length > i; i++) {
          /** @type {number} */
          that[i] = 0;
        }
      }
      return that;
    }
    /**
     * @param {!Object} that
     * @param {string} string
     * @param {string} encoding
     * @return {?}
     */
    function fromString(that, string, encoding) {
      if ("string" != typeof encoding || "" === encoding) {
        /** @type {string} */
        encoding = "utf8";
      }
      /** @type {number} */
      var length = 0 | byteLength(string, encoding);
      return that = allocate(that, length), that.write(string, encoding), that;
    }
    /**
     * @param {string} value
     * @param {!Object} options
     * @return {?}
     */
    function write(value, options) {
      if (Buffer.isBuffer(options)) {
        return install(value, options);
      }
      if (isArray(options)) {
        return update(value, options);
      }
      if (null == options) {
        throw new TypeError("must start with number, buffer, array or string");
      }
      return "undefined" != typeof ArrayBuffer && options.buffer instanceof ArrayBuffer ? set(value, options) : options.length ? add(value, options) : fn(value, options);
    }
    /**
     * @param {string} e
     * @param {!Object} options
     * @return {?}
     */
    function install(e, options) {
      /** @type {number} */
      var end = 0 | assert(options.length);
      return e = allocate(e, end), options.copy(e, 0, 0, end), e;
    }
    /**
     * @param {string} that
     * @param {!Object} data
     * @return {?}
     */
    function update(that, data) {
      /** @type {number} */
      var length = 0 | assert(data.length);
      that = allocate(that, length);
      /** @type {number} */
      var i = 0;
      for (; length > i; i = i + 1) {
        /** @type {number} */
        that[i] = 255 & data[i];
      }
      return that;
    }
    /**
     * @param {string} h
     * @param {!Object} c
     * @return {?}
     */
    function set(h, c) {
      /** @type {number} */
      var a = 0 | assert(c.length);
      h = allocate(h, a);
      /** @type {number} */
      var b = 0;
      for (; a > b; b = b + 1) {
        /** @type {number} */
        h[b] = 255 & c[b];
      }
      return h;
    }
    /**
     * @param {string} that
     * @param {!Object} data
     * @return {?}
     */
    function add(that, data) {
      /** @type {number} */
      var length = 0 | assert(data.length);
      that = allocate(that, length);
      /** @type {number} */
      var i = 0;
      for (; length > i; i = i + 1) {
        /** @type {number} */
        that[i] = 255 & data[i];
      }
      return that;
    }
    /**
     * @param {string} b
     * @param {!Object} options
     * @return {?}
     */
    function fn(b, options) {
      var props;
      /** @type {number} */
      var length = 0;
      if ("Buffer" === options.type && isArray(options.data)) {
        props = options.data;
        /** @type {number} */
        length = 0 | assert(props.length);
      }
      b = allocate(b, length);
      /** @type {number} */
      var i = 0;
      for (; length > i; i = i + 1) {
        /** @type {number} */
        b[i] = 255 & props[i];
      }
      return b;
    }
    /**
     * @param {?} data
     * @param {number} length
     * @return {?}
     */
    function allocate(data, length) {
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        data = Buffer._augment(new Uint8Array(length));
      } else {
        /** @type {number} */
        data.length = length;
        /** @type {boolean} */
        data._isBuffer = true;
      }
      /** @type {boolean} */
      var prev = 0 !== length && length <= Buffer.poolSize >>> 1;
      return prev && (data.parent = self), data;
    }
    /**
     * @param {number} y
     * @return {?}
     */
    function assert(y) {
      if (y >= top) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + top.toString(16) + " bytes");
      }
      return 0 | y;
    }
    /**
     * @param {?} size
     * @param {boolean} encoding
     * @return {?}
     */
    function SlowBuffer(size, encoding) {
      if (!(this instanceof SlowBuffer)) {
        return new SlowBuffer(size, encoding);
      }
      var buf = new Buffer(size, encoding);
      return delete buf.parent, buf;
    }
    /**
     * @param {string} string
     * @param {number} encoding
     * @return {?}
     */
    function byteLength(string, encoding) {
      if ("string" != typeof string && (string = String(string)), 0 === string.length) {
        return 0;
      }
      switch(encoding || "utf8") {
        case "ascii":
        case "binary":
        case "raw":
          return string.length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * string.length;
        case "hex":
          return string.length >>> 1;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "base64":
          return base64ToBytes(string).length;
        default:
          return string.length;
      }
    }
    /**
     * @param {!Object} array
     * @param {string} html
     * @param {number} offset
     * @param {number} x
     * @return {?}
     */
    function callback(array, html, offset, x) {
      /** @type {number} */
      offset = Number(offset) || 0;
      /** @type {number} */
      var x0 = array.length - offset;
      if (x) {
        /** @type {number} */
        x = Number(x);
        if (x > x0) {
          /** @type {number} */
          x = x0;
        }
      } else {
        /** @type {number} */
        x = x0;
      }
      var w = html.length;
      if (w % 2 !== 0) {
        throw new Error("Invalid hex string");
      }
      if (x > w / 2) {
        /** @type {number} */
        x = w / 2;
      }
      /** @type {number} */
      var length = 0;
      for (; x > length; length++) {
        /** @type {number} */
        var last = parseInt(html.substr(2 * length, 2), 16);
        if (isNaN(last)) {
          throw new Error("Invalid hex string");
        }
        /** @type {number} */
        array[offset + length] = last;
      }
      return length;
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    /**
     * @param {(Node|NodeList|string)} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function binaryWrite(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    /**
     * @param {!NodeList} buf
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    /**
     * @param {!Object} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function base64Slice(buf, start, end) {
      return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
    }
    /**
     * @param {!Array} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function utf8Slice(buf, start, end) {
      /** @type {string} */
      var result = "";
      /** @type {string} */
      var value = "";
      /** @type {number} */
      end = Math.min(buf.length, end);
      /** @type {number} */
      var i = start;
      for (; end > i; i++) {
        if (buf[i] <= 127) {
          /** @type {string} */
          result = result + (d(value) + String.fromCharCode(buf[i]));
          /** @type {string} */
          value = "";
        } else {
          /** @type {string} */
          value = value + ("%" + buf[i].toString(16));
        }
      }
      return result + d(value);
    }
    /**
     * @param {!Array} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function asciiSlice(buf, start, end) {
      /** @type {string} */
      var ret = "";
      /** @type {number} */
      end = Math.min(buf.length, end);
      /** @type {number} */
      var offset = start;
      for (; end > offset; offset++) {
        /** @type {string} */
        ret = ret + String.fromCharCode(127 & buf[offset]);
      }
      return ret;
    }
    /**
     * @param {!Array} buf
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    function binarySlice(buf, start, end) {
      /** @type {string} */
      var ret = "";
      /** @type {number} */
      end = Math.min(buf.length, end);
      /** @type {number} */
      var i = start;
      for (; end > i; i++) {
        /** @type {string} */
        ret = ret + String.fromCharCode(buf[i]);
      }
      return ret;
    }
    /**
     * @param {!Array} p
     * @param {number} x
     * @param {number} len
     * @return {?}
     */
    function f(p, x, len) {
      var size = p.length;
      if (!x || 0 > x) {
        /** @type {number} */
        x = 0;
      }
      if (!len || 0 > len || len > size) {
        len = size;
      }
      /** @type {string} */
      var s = "";
      /** @type {number} */
      var j = x;
      for (; len > j; j++) {
        /** @type {string} */
        s = s + format(p[j]);
      }
      return s;
    }
    /**
     * @param {string} array
     * @param {number} offset
     * @param {number} value
     * @return {?}
     */
    function toString(array, offset, value) {
      var r = array.slice(offset, value);
      /** @type {string} */
      var finalTable = "";
      /** @type {number} */
      var i = 0;
      for (; i < r.length; i = i + 2) {
        /** @type {string} */
        finalTable = finalTable + String.fromCharCode(r[i] + 256 * r[i + 1]);
      }
      return finalTable;
    }
    /**
     * @param {number} offset
     * @param {number} ext
     * @param {?} length
     * @return {undefined}
     */
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || 0 > offset) {
        throw new RangeError("offset is not uint");
      }
      if (offset + ext > length) {
        throw new RangeError("Trying to access beyond buffer length");
      }
    }
    /**
     * @param {!Array} buffer
     * @param {number} value
     * @param {number} offset
     * @param {number} ext
     * @param {number} max
     * @param {number} min
     * @return {undefined}
     */
    function checkInt(buffer, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buffer)) {
        throw new TypeError("buffer must be a Buffer instance");
      }
      if (value > max || min > value) {
        throw new RangeError("value is out of bounds");
      }
      if (offset + ext > buffer.length) {
        throw new RangeError("index out of range");
      }
    }
    /**
     * @param {!NodeList} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @return {undefined}
     */
    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (0 > value) {
        value = 65535 + value + 1;
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var indexOfRequirement = Math.min(buf.length - offset, 2);
      for (; indexOfRequirement > i; i++) {
        /** @type {number} */
        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
    }
    /**
     * @param {!NodeList} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @return {undefined}
     */
    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (0 > value) {
        value = 4294967295 + value + 1;
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var indexOfRequirement = Math.min(buf.length - offset, 4);
      for (; indexOfRequirement > i; i++) {
        /** @type {number} */
        buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
    }
    /**
     * @param {string} buf
     * @param {!Object} value
     * @param {number} offset
     * @param {number} ext
     * @param {!Object} max
     * @param {!Object} min
     * @return {undefined}
     */
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (value > max || min > value) {
        throw new RangeError("value is out of bounds");
      }
      if (offset + ext > buf.length) {
        throw new RangeError("index out of range");
      }
      if (0 > offset) {
        throw new RangeError("index out of range");
      }
    }
    /**
     * @param {string} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @param {string} noAssert
     * @return {?}
     */
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      return noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886E38, -3.4028234663852886E38), ieee754.write(buf, value, offset, littleEndian, 23, 4), offset + 4;
    }
    /**
     * @param {string} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @param {string} noAssert
     * @return {?}
     */
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      return noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157E308, -1.7976931348623157E308), ieee754.write(buf, value, offset, littleEndian, 52, 8), offset + 8;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function base64clean(str) {
      if (str = trim(str).replace(ampRe, ""), str.length < 2) {
        return "";
      }
      for (; str.length % 4 !== 0;) {
        /** @type {string} */
        str = str + "=";
      }
      return str;
    }
    /**
     * @param {string} s
     * @return {?}
     */
    function trim(s) {
      return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, "");
    }
    /**
     * @param {number} tmpl
     * @return {?}
     */
    function format(tmpl) {
      return 16 > tmpl ? "0" + tmpl.toString(16) : tmpl.toString(16);
    }
    /**
     * @param {string} string
     * @param {number} units
     * @return {?}
     */
    function utf8ToBytes(string, units) {
      units = units || 1 / 0;
      var n;
      var length = string.length;
      /** @type {null} */
      var _PAGE_currentSubPage = null;
      /** @type {!Array} */
      var bytes = [];
      /** @type {number} */
      var i = 0;
      for (; length > i; i++) {
        if (n = string.charCodeAt(i), n > 55295 && 57344 > n) {
          if (!_PAGE_currentSubPage) {
            if (n > 56319) {
              if ((units = units - 3) > -1) {
                bytes.push(239, 191, 189);
              }
              continue;
            }
            if (i + 1 === length) {
              if ((units = units - 3) > -1) {
                bytes.push(239, 191, 189);
              }
              continue;
            }
            _PAGE_currentSubPage = n;
            continue;
          }
          if (56320 > n) {
            if ((units = units - 3) > -1) {
              bytes.push(239, 191, 189);
            }
            _PAGE_currentSubPage = n;
            continue;
          }
          /** @type {number} */
          n = _PAGE_currentSubPage - 55296 << 10 | n - 56320 | 65536;
          /** @type {null} */
          _PAGE_currentSubPage = null;
        } else {
          if (_PAGE_currentSubPage) {
            if ((units = units - 3) > -1) {
              bytes.push(239, 191, 189);
            }
            /** @type {null} */
            _PAGE_currentSubPage = null;
          }
        }
        if (128 > n) {
          if ((units = units - 1) < 0) {
            break;
          }
          bytes.push(n);
        } else {
          if (2048 > n) {
            if ((units = units - 2) < 0) {
              break;
            }
            bytes.push(n >> 6 | 192, 63 & n | 128);
          } else {
            if (65536 > n) {
              if ((units = units - 3) < 0) {
                break;
              }
              bytes.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
            } else {
              if (!(2097152 > n)) {
                throw new Error("Invalid code point");
              }
              if ((units = units - 4) < 0) {
                break;
              }
              bytes.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
            }
          }
        }
      }
      return bytes;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function asciiToBytes(str) {
      /** @type {!Array} */
      var byteArray = [];
      /** @type {number} */
      var i = 0;
      for (; i < str.length; i++) {
        byteArray.push(255 & str.charCodeAt(i));
      }
      return byteArray;
    }
    /**
     * @param {string} str
     * @param {number} units
     * @return {?}
     */
    function utf16leToBytes(str, units) {
      var docsToSelect;
      var lo;
      var hi;
      /** @type {!Array} */
      var byteArray = [];
      /** @type {number} */
      var endIndex = 0;
      for (; endIndex < str.length && !((units = units - 2) < 0); endIndex++) {
        docsToSelect = str.charCodeAt(endIndex);
        /** @type {number} */
        lo = docsToSelect >> 8;
        /** @type {number} */
        hi = docsToSelect % 256;
        byteArray.push(hi);
        byteArray.push(lo);
      }
      return byteArray;
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    /**
     * @param {!NodeList} src
     * @param {(Array|NodeList)} dst
     * @param {number} offset
     * @param {number} length
     * @return {?}
     */
    function blitBuffer(src, dst, offset, length) {
      /** @type {number} */
      var i = 0;
      for (; length > i && !(i + offset >= dst.length || i >= src.length); i++) {
        dst[i + offset] = src[i];
      }
      return i;
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function d(value) {
      try {
        return decodeURIComponent(value);
      } catch (t) {
        return String.fromCharCode(65533);
      }
    }
    var base64 = require(181);
    var ieee754 = require(182);
    var isArray = require(183);
    /** @type {!Object} */
    exports.Buffer = Buffer;
    /** @type {function(?, boolean): ?} */
    exports.SlowBuffer = SlowBuffer;
    /** @type {number} */
    exports.INSPECT_MAX_BYTES = 50;
    /** @type {number} */
    Buffer.poolSize = 8192;
    /** @type {number} */
    var top = 1073741823;
    var self = {};
    Buffer.TYPED_ARRAY_SUPPORT = function() {
      try {
        /** @type {!ArrayBuffer} */
        var buffer = new ArrayBuffer(0);
        /** @type {!Uint8Array} */
        var message = new Uint8Array(buffer);
        return message.foo = function() {
          return 42;
        }, 42 === message.foo() && "function" == typeof message.subarray && 0 === (new Uint8Array(1)).subarray(1, 1).byteLength;
      } catch (n) {
        return false;
      }
    }();
    /**
     * @param {?} obj
     * @return {?}
     */
    Buffer.isBuffer = function(obj) {
      return !(null == obj || !obj._isBuffer);
    };
    /**
     * @param {!Array} value
     * @param {!Array} obj
     * @return {?}
     */
    Buffer.compare = function(value, obj) {
      if (!Buffer.isBuffer(value) || !Buffer.isBuffer(obj)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (value === obj) {
        return 0;
      }
      var result = value.length;
      var val = obj.length;
      /** @type {number} */
      var key = 0;
      /** @type {number} */
      var id = Math.min(result, val);
      for (; id > key && value[key] === obj[key];) {
        ++key;
      }
      return key !== id && (result = value[key], val = obj[key]), val > result ? -1 : result > val ? 1 : 0;
    };
    /**
     * @param {?} encoding
     * @return {?}
     */
    Buffer.isEncoding = function(encoding) {
      switch(String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "raw":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    /**
     * @param {!Object} a
     * @param {number} t
     * @return {?}
     */
    Buffer.concat = function(a, t) {
      if (!isArray(a)) {
        throw new TypeError("list argument must be an Array of Buffers.");
      }
      if (0 === a.length) {
        return new Buffer(0);
      }
      if (1 === a.length) {
        return a[0];
      }
      var i;
      if (void 0 === t) {
        /** @type {number} */
        t = 0;
        /** @type {number} */
        i = 0;
        for (; i < a.length; i++) {
          t = t + a[i].length;
        }
      }
      var text = new Buffer(t);
      /** @type {number} */
      var b = 0;
      /** @type {number} */
      i = 0;
      for (; i < a.length; i++) {
        var p = a[i];
        p.copy(text, b);
        b = b + p.length;
      }
      return text;
    };
    /** @type {function(string, number): ?} */
    Buffer.byteLength = byteLength;
    Buffer.prototype.length = void 0;
    Buffer.prototype.parent = void 0;
    /**
     * @param {string} encoding
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.toString = function(encoding, start, end) {
      /** @type {boolean} */
      var r = false;
      if (start = 0 | start, end = void 0 === end || end === 1 / 0 ? this.length : 0 | end, encoding || (encoding = "utf8"), 0 > start && (start = 0), end > this.length && (end = this.length), start >= end) {
        return "";
      }
      for (;;) {
        switch(encoding) {
          case "hex":
            return f(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "binary":
            return binarySlice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return toString(this, start, end);
          default:
            if (r) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            /** @type {string} */
            encoding = (encoding + "").toLowerCase();
            /** @type {boolean} */
            r = true;
        }
      }
    };
    /**
     * @param {?} b
     * @return {?}
     */
    Buffer.prototype.equals = function(b) {
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("Argument must be a Buffer");
      }
      return this === b ? true : 0 === Buffer.compare(this, b);
    };
    /**
     * @return {?}
     */
    Buffer.prototype.inspect = function() {
      /** @type {string} */
      var pix_color = "";
      var max = exports.INSPECT_MAX_BYTES;
      return this.length > 0 && (pix_color = this.toString("hex", 0, max).match(/.{2}/g).join(" "), this.length > max && (pix_color = pix_color + " ... ")), "<Buffer " + pix_color + ">";
    };
    /**
     * @param {?} b
     * @return {?}
     */
    Buffer.prototype.compare = function(b) {
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("Argument must be a Buffer");
      }
      return this === b ? 0 : Buffer.compare(this, b);
    };
    /**
     * @param {string} value
     * @param {number} i
     * @return {?}
     */
    Buffer.prototype.indexOf = function(value, i) {
      /**
       * @param {!NodeList} arr
       * @param {!Object} val
       * @param {number} i
       * @return {?}
       */
      function indexOf(arr, val, i) {
        /** @type {number} */
        var i0 = -1;
        /** @type {number} */
        var j = 0;
        for (; i + j < arr.length; j++) {
          if (arr[i + j] === val[-1 === i0 ? 0 : j - i0]) {
            if (-1 === i0 && (i0 = j), j - i0 + 1 === val.length) {
              return i + i0;
            }
          } else {
            /** @type {number} */
            i0 = -1;
          }
        }
        return -1;
      }
      if (i > 2147483647 ? i = 2147483647 : -2147483648 > i && (i = -2147483648), i = i >> 0, 0 === this.length) {
        return -1;
      }
      if (i >= this.length) {
        return -1;
      }
      if (0 > i && (i = Math.max(this.length + i, 0)), "string" == typeof value) {
        return 0 === value.length ? -1 : String.prototype.indexOf.call(this, value, i);
      }
      if (Buffer.isBuffer(value)) {
        return indexOf(this, value, i);
      }
      if ("number" == typeof value) {
        return Buffer.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, value, i) : indexOf(this, [value], i);
      }
      throw new TypeError("val must be string, number or Buffer");
    };
    /**
     * @param {string} o
     * @return {?}
     */
    Buffer.prototype.get = function(o) {
      return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(o);
    };
    /**
     * @param {string} type
     * @param {?} offset
     * @return {?}
     */
    Buffer.prototype.set = function(type, offset) {
      return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(type, offset);
    };
    /**
     * @param {string} string
     * @param {number} offset
     * @param {number} length
     * @param {number} encoding
     * @return {?}
     */
    Buffer.prototype.write = function(string, offset, length, encoding) {
      if (void 0 === offset) {
        /** @type {string} */
        encoding = "utf8";
        length = this.length;
        /** @type {number} */
        offset = 0;
      } else {
        if (void 0 === length && "string" == typeof offset) {
          /** @type {number} */
          encoding = offset;
          length = this.length;
          /** @type {number} */
          offset = 0;
        } else {
          if (isFinite(offset)) {
            /** @type {number} */
            offset = 0 | offset;
            if (isFinite(length)) {
              /** @type {number} */
              length = 0 | length;
              if (void 0 === encoding) {
                /** @type {string} */
                encoding = "utf8";
              }
            } else {
              /** @type {number} */
              encoding = length;
              length = void 0;
            }
          } else {
            /** @type {number} */
            var swap = encoding;
            /** @type {number} */
            encoding = offset;
            /** @type {number} */
            offset = 0 | length;
            length = swap;
          }
        }
      }
      /** @type {number} */
      var remaining = this.length - offset;
      if ((void 0 === length || length > remaining) && (length = remaining), string.length > 0 && (0 > length || 0 > offset) || offset > this.length) {
        throw new RangeError("attempt to write outside buffer bounds");
      }
      if (!encoding) {
        /** @type {string} */
        encoding = "utf8";
      }
      /** @type {boolean} */
      var a = false;
      for (;;) {
        switch(encoding) {
          case "hex":
            return callback(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "binary":
            return binaryWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (a) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            /** @type {string} */
            encoding = ("" + encoding).toLowerCase();
            /** @type {boolean} */
            a = true;
        }
      }
    };
    /**
     * @return {?}
     */
    Buffer.prototype.toJSON = function() {
      return {
        type : "Buffer",
        data : Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    /**
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.slice = function(start, end) {
      var len = this.length;
      /** @type {number} */
      start = ~~start;
      end = void 0 === end ? len : ~~end;
      if (0 > start) {
        start = start + len;
        if (0 > start) {
          /** @type {number} */
          start = 0;
        }
      } else {
        if (start > len) {
          start = len;
        }
      }
      if (0 > end) {
        end = end + len;
        if (0 > end) {
          /** @type {number} */
          end = 0;
        }
      } else {
        if (end > len) {
          end = len;
        }
      }
      if (start > end) {
        /** @type {number} */
        end = start;
      }
      var newBuf;
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = Buffer._augment(this.subarray(start, end));
      } else {
        /** @type {number} */
        var sliceLen = end - start;
        newBuf = new Buffer(sliceLen, void 0);
        /** @type {number} */
        var i = 0;
        for (; sliceLen > i; i++) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf.length && (newBuf.parent = this.parent || this), newBuf;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readUIntLE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset];
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      for (; ++i < byteLength && (mul = mul * 256);) {
        val = val + this[offset + i] * mul;
      }
      return val;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readUIntBE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset + --byteLength];
      /** @type {number} */
      var mul = 1;
      for (; byteLength > 0 && (mul = mul * 256);) {
        val = val + this[offset + --byteLength] * mul;
      }
      return val;
    };
    /**
     * @param {?} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt8 = function(offset, limit) {
      return limit || checkOffset(offset, 1, this.length), this[offset];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt16LE = function(offset, limit) {
      return limit || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt16BE = function(offset, limit) {
      return limit || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt32LE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt32BE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readIntLE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset];
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      for (; ++i < byteLength && (mul = mul * 256);) {
        val = val + this[offset + i] * mul;
      }
      return mul = mul * 128, val >= mul && (val = val - Math.pow(2, 8 * byteLength)), val;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readIntBE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      /** @type {number} */
      var i = byteLength;
      /** @type {number} */
      var length = 1;
      var index = this[offset + --i];
      for (; i > 0 && (length = length * 256);) {
        index = index + this[offset + --i] * length;
      }
      return length = length * 128, index >= length && (index = index - Math.pow(2, 8 * byteLength)), index;
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt8 = function(offset, limit) {
      return limit || checkOffset(offset, 1, this.length), 128 & this[offset] ? -1 * (255 - this[offset] + 1) : this[offset];
    };
    /**
     * @param {number} offset
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readInt16LE = function(offset, noAssert) {
      if (!noAssert) {
        checkOffset(offset, 2, this.length);
      }
      /** @type {number} */
      var n = this[offset] | this[offset + 1] << 8;
      return 32768 & n ? 4294901760 | n : n;
    };
    /**
     * @param {number} offset
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readInt16BE = function(offset, noAssert) {
      if (!noAssert) {
        checkOffset(offset, 2, this.length);
      }
      /** @type {number} */
      var n = this[offset + 1] | this[offset] << 8;
      return 32768 & n ? 4294901760 | n : n;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt32LE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt32BE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readFloatLE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), ieee754.read(this, offset, true, 23, 4);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readFloatBE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), ieee754.read(this, offset, false, 23, 4);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readDoubleLE = function(offset, limit) {
      return limit || checkOffset(offset, 8, this.length), ieee754.read(this, offset, true, 52, 8);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readDoubleBE = function(offset, limit) {
      return limit || checkOffset(offset, 8, this.length), ieee754.read(this, offset, false, 52, 8);
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUIntLE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
      }
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      this[offset] = 255 & value;
      for (; ++i < byteLength && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUIntBE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = 0 | offset;
      /** @type {number} */
      byteLength = 0 | byteLength;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
      }
      /** @type {number} */
      var i = byteLength - 1;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      this[offset + i] = 255 & value;
      for (; --i >= 0 && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {?} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = value, offset + 1;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, true), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value) : objectWriteUInt16(this, value, offset, false), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, this[offset + 1] = value >>> 8, this[offset] = value) : objectWriteUInt32(this, value, offset, true), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value) : objectWriteUInt32(this, value, offset, false), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeIntLE = function(value, offset, byteLength, noAssert) {
      if (value = +value, offset = 0 | offset, !noAssert) {
        /** @type {number} */
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var s = 0 > value ? 1 : 0;
      /** @type {number} */
      this[offset] = 255 & value;
      for (; ++i < byteLength && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = (value / mul >> 0) - s & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeIntBE = function(value, offset, byteLength, noAssert) {
      if (value = +value, offset = 0 | offset, !noAssert) {
        /** @type {number} */
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }
      /** @type {number} */
      var i = byteLength - 1;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var s = 0 > value ? 1 : 0;
      /** @type {number} */
      this[offset + i] = 255 & value;
      for (; --i >= 0 && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = (value / mul >> 0) - s & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), 0 > value && (value = 255 + value + 1), this[offset] = value, offset + 1;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, true), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value) : objectWriteUInt16(this, value, offset, false), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value, this[offset + 1] = value >>> 8, this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, true), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = 0 | offset, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 0 > value && (value = 4294967295 + value + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value) : objectWriteUInt32(this, value, offset, false), offset + 4;
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    /**
     * @param {!Object} target
     * @param {number} targetStart
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.copy = function(target, targetStart, start, end) {
      if (start || (start = 0), end || 0 === end || (end = this.length), targetStart >= target.length && (targetStart = target.length), targetStart || (targetStart = 0), end > 0 && start > end && (end = start), end === start) {
        return 0;
      }
      if (0 === target.length || 0 === this.length) {
        return 0;
      }
      if (0 > targetStart) {
        throw new RangeError("targetStart out of bounds");
      }
      if (0 > start || start >= this.length) {
        throw new RangeError("sourceStart out of bounds");
      }
      if (0 > end) {
        throw new RangeError("sourceEnd out of bounds");
      }
      if (end > this.length) {
        end = this.length;
      }
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      /** @type {number} */
      var len = end - start;
      if (1E3 > len || !Buffer.TYPED_ARRAY_SUPPORT) {
        /** @type {number} */
        var i = 0;
        for (; len > i; i++) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        target._set(this.subarray(start, start + len), targetStart);
      }
      return len;
    };
    /**
     * @param {string} s
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.fill = function(s, start, end) {
      if (s || (s = 0), start || (start = 0), end || (end = this.length), start > end) {
        throw new RangeError("end < start");
      }
      if (end !== start && 0 !== this.length) {
        if (0 > start || start >= this.length) {
          throw new RangeError("start out of bounds");
        }
        if (0 > end || end > this.length) {
          throw new RangeError("end out of bounds");
        }
        var i;
        if ("number" == typeof s) {
          /** @type {number} */
          i = start;
          for (; end > i; i++) {
            /** @type {string} */
            this[i] = s;
          }
        } else {
          var bytes = utf8ToBytes(s.toString());
          var len = bytes.length;
          /** @type {number} */
          i = start;
          for (; end > i; i++) {
            this[i] = bytes[i % len];
          }
        }
        return this;
      }
    };
    /**
     * @return {?}
     */
    Buffer.prototype.toArrayBuffer = function() {
      if ("undefined" != typeof Uint8Array) {
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          return (new Buffer(this)).buffer;
        }
        /** @type {!Uint8Array} */
        var buf = new Uint8Array(this.length);
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = buf.length;
        for (; l > i; i = i + 1) {
          buf[i] = this[i];
        }
        return buf.buffer;
      }
      throw new TypeError("Buffer.toArrayBuffer not supported in this browser");
    };
    var BP = Buffer.prototype;
    /**
     * @param {!Object} arr
     * @return {?}
     */
    Buffer._augment = function(arr) {
      return arr.constructor = Buffer, arr._isBuffer = true, arr._set = arr.set, arr.get = BP.get, arr.set = BP.set, arr.write = BP.write, arr.toString = BP.toString, arr.toLocaleString = BP.toString, arr.toJSON = BP.toJSON, arr.equals = BP.equals, arr.compare = BP.compare, arr.indexOf = BP.indexOf, arr.copy = BP.copy, arr.slice = BP.slice, arr.readUIntLE = BP.readUIntLE, arr.readUIntBE = BP.readUIntBE, arr.readUInt8 = BP.readUInt8, arr.readUInt16LE = BP.readUInt16LE, arr.readUInt16BE = BP.readUInt16BE,
      arr.readUInt32LE = BP.readUInt32LE, arr.readUInt32BE = BP.readUInt32BE, arr.readIntLE = BP.readIntLE, arr.readIntBE = BP.readIntBE, arr.readInt8 = BP.readInt8, arr.readInt16LE = BP.readInt16LE, arr.readInt16BE = BP.readInt16BE, arr.readInt32LE = BP.readInt32LE, arr.readInt32BE = BP.readInt32BE, arr.readFloatLE = BP.readFloatLE, arr.readFloatBE = BP.readFloatBE, arr.readDoubleLE = BP.readDoubleLE, arr.readDoubleBE = BP.readDoubleBE, arr.writeUInt8 = BP.writeUInt8, arr.writeUIntLE = BP.writeUIntLE,
      arr.writeUIntBE = BP.writeUIntBE, arr.writeUInt16LE = BP.writeUInt16LE, arr.writeUInt16BE = BP.writeUInt16BE, arr.writeUInt32LE = BP.writeUInt32LE, arr.writeUInt32BE = BP.writeUInt32BE, arr.writeIntLE = BP.writeIntLE, arr.writeIntBE = BP.writeIntBE, arr.writeInt8 = BP.writeInt8, arr.writeInt16LE = BP.writeInt16LE, arr.writeInt16BE = BP.writeInt16BE, arr.writeInt32LE = BP.writeInt32LE, arr.writeInt32BE = BP.writeInt32BE, arr.writeFloatLE = BP.writeFloatLE, arr.writeFloatBE = BP.writeFloatBE,
      arr.writeDoubleLE = BP.writeDoubleLE, arr.writeDoubleBE = BP.writeDoubleBE, arr.fill = BP.fill, arr.inspect = BP.inspect, arr.toArrayBuffer = BP.toArrayBuffer, arr;
    };
    /** @type {!RegExp} */
    var ampRe = /[^+\/0-9A-z\-]/g;
  }).call(exports, require(180).Buffer);
}, function(canCreateDiscussions, a, n) {
  /** @type {string} */
  var value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  !function(exports) {
    /**
     * @param {string} a
     * @return {?}
     */
    function decode(a) {
      var w = a.charCodeAt(0);
      return w === TO_ISO_STRING || w === TO_UTC_STRING ? 62 : w === TO_TIME_STRING || w === TO_STRING ? 63 : x > w ? -1 : x + 10 > w ? w - x + 26 + 26 : half_xgap + 26 > w ? w - half_xgap : mid_char_w + 26 > w ? w - mid_char_w + 26 : void 0;
    }
    /**
     * @param {string} b64
     * @return {?}
     */
    function b64ToByteArray(b64) {
      /**
       * @param {number} value
       * @return {undefined}
       */
      function push(value) {
        /** @type {number} */
        arr[L++] = value;
      }
      var i;
      var bytesUsed;
      var indexOfRequirement;
      var listeners;
      var placeHolders;
      var arr;
      if (b64.length % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var len = b64.length;
      /** @type {number} */
      placeHolders = "=" === b64.charAt(len - 2) ? 2 : "=" === b64.charAt(len - 1) ? 1 : 0;
      arr = new Arr(3 * b64.length / 4 - placeHolders);
      indexOfRequirement = placeHolders > 0 ? b64.length - 4 : b64.length;
      /** @type {number} */
      var L = 0;
      /** @type {number} */
      i = 0;
      /** @type {number} */
      bytesUsed = 0;
      for (; indexOfRequirement > i; i = i + 4, bytesUsed = bytesUsed + 3) {
        /** @type {number} */
        listeners = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
        push((16711680 & listeners) >> 16);
        push((65280 & listeners) >> 8);
        push(255 & listeners);
      }
      return 2 === placeHolders ? (listeners = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4, push(255 & listeners)) : 1 === placeHolders && (listeners = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2, push(listeners >> 8 & 255), push(255 & listeners)), arr;
    }
    /**
     * @param {!Object} uint8
     * @return {?}
     */
    function uint8ToBase64(uint8) {
      /**
       * @param {number} column
       * @return {?}
       */
      function encode(column) {
        return value.charAt(column);
      }
      /**
       * @param {number} num
       * @return {?}
       */
      function tripletToBase64(num) {
        return encode(num >> 18 & 63) + encode(num >> 12 & 63) + encode(num >> 6 & 63) + encode(63 & num);
      }
      var i;
      var temp;
      var length;
      /** @type {number} */
      var extraBytes = uint8.length % 3;
      /** @type {string} */
      var output = "";
      /** @type {number} */
      i = 0;
      /** @type {number} */
      length = uint8.length - extraBytes;
      for (; length > i; i = i + 3) {
        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
        /** @type {string} */
        output = output + tripletToBase64(temp);
      }
      switch(extraBytes) {
        case 1:
          temp = uint8[uint8.length - 1];
          /** @type {string} */
          output = output + encode(temp >> 2);
          /** @type {string} */
          output = output + encode(temp << 4 & 63);
          /** @type {string} */
          output = output + "==";
          break;
        case 2:
          temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
          /** @type {string} */
          output = output + encode(temp >> 10);
          /** @type {string} */
          output = output + encode(temp >> 4 & 63);
          /** @type {string} */
          output = output + encode(temp << 2 & 63);
          /** @type {string} */
          output = output + "=";
      }
      return output;
    }
    /** @type {!Function} */
    var Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array;
    /** @type {number} */
    var TO_ISO_STRING = "+".charCodeAt(0);
    /** @type {number} */
    var TO_TIME_STRING = "/".charCodeAt(0);
    /** @type {number} */
    var x = "0".charCodeAt(0);
    /** @type {number} */
    var mid_char_w = "a".charCodeAt(0);
    /** @type {number} */
    var half_xgap = "A".charCodeAt(0);
    /** @type {number} */
    var TO_UTC_STRING = "-".charCodeAt(0);
    /** @type {number} */
    var TO_STRING = "_".charCodeAt(0);
    /** @type {function(string): ?} */
    exports.toByteArray = b64ToByteArray;
    /** @type {function(!Object): ?} */
    exports.fromByteArray = uint8ToBase64;
  }(a);
}, function(canCreateDiscussions, asyncFile, n) {
  /**
   * @param {?} index
   * @param {number} offset
   * @param {boolean} mode
   * @param {number} length
   * @param {number} done
   * @return {?}
   */
  asyncFile.read = function(index, offset, mode, length, done) {
    var i;
    var j;
    /** @type {number} */
    var saltLen = 8 * done - length - 1;
    /** @type {number} */
    var ms_controller = (1 << saltLen) - 1;
    /** @type {number} */
    var TIMEOUT_POLL_DECREMENT = ms_controller >> 1;
    /** @type {number} */
    var c = -7;
    /** @type {number} */
    var k = mode ? done - 1 : 0;
    /** @type {number} */
    var m = mode ? -1 : 1;
    var g = index[offset + k];
    /** @type {number} */
    k = k + m;
    /** @type {number} */
    i = g & (1 << -c) - 1;
    /** @type {number} */
    g = g >> -c;
    /** @type {number} */
    c = c + saltLen;
    for (; c > 0; i = 256 * i + index[offset + k], k = k + m, c = c - 8) {
    }
    /** @type {number} */
    j = i & (1 << -c) - 1;
    /** @type {number} */
    i = i >> -c;
    c = c + length;
    for (; c > 0; j = 256 * j + index[offset + k], k = k + m, c = c - 8) {
    }
    if (0 === i) {
      /** @type {number} */
      i = 1 - TIMEOUT_POLL_DECREMENT;
    } else {
      if (i === ms_controller) {
        return j ? NaN : (g ? -1 : 1) * (1 / 0);
      }
      j = j + Math.pow(2, length);
      /** @type {number} */
      i = i - TIMEOUT_POLL_DECREMENT;
    }
    return (g ? -1 : 1) * j * Math.pow(2, i - length);
  };
  /**
   * @param {string} buffer
   * @param {number} value
   * @param {number} offset
   * @param {boolean} isLE
   * @param {number} mLen
   * @param {number} nBytes
   * @return {undefined}
   */
  asyncFile.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var x;
    var m;
    var c;
    /** @type {number} */
    var eLen = 8 * nBytes - mLen - 1;
    /** @type {number} */
    var j = (1 << eLen) - 1;
    /** @type {number} */
    var level = j >> 1;
    /** @type {number} */
    var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    /** @type {number} */
    var i = isLE ? 0 : nBytes - 1;
    /** @type {number} */
    var d = isLE ? 1 : -1;
    /** @type {number} */
    var x2 = 0 > value || 0 === value && 0 > 1 / value ? 1 : 0;
    /** @type {number} */
    value = Math.abs(value);
    if (isNaN(value) || value === 1 / 0) {
      /** @type {number} */
      m = isNaN(value) ? 1 : 0;
      /** @type {number} */
      x = j;
    } else {
      /** @type {number} */
      x = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -x)) < 1) {
        x--;
        /** @type {number} */
        c = c * 2;
      }
      /** @type {number} */
      value = value + (x + level >= 1 ? rt / c : rt * Math.pow(2, 1 - level));
      if (value * c >= 2) {
        x++;
        /** @type {number} */
        c = c / 2;
      }
      if (x + level >= j) {
        /** @type {number} */
        m = 0;
        /** @type {number} */
        x = j;
      } else {
        if (x + level >= 1) {
          /** @type {number} */
          m = (value * c - 1) * Math.pow(2, mLen);
          /** @type {number} */
          x = x + level;
        } else {
          /** @type {number} */
          m = value * Math.pow(2, level - 1) * Math.pow(2, mLen);
          /** @type {number} */
          x = 0;
        }
      }
    }
    for (; mLen >= 8; buffer[offset + i] = 255 & m, i = i + d, m = m / 256, mLen = mLen - 8) {
    }
    /** @type {number} */
    x = x << mLen | m;
    eLen = eLen + mLen;
    for (; eLen > 0; buffer[offset + i] = 255 & x, i = i + d, x = x / 256, eLen = eLen - 8) {
    }
    buffer[offset + i - d] |= 128 * x2;
  };
}, function(module, canCreateDiscussions, n) {
  /** @type {function(*): boolean} */
  var nativeIsArray = Array.isArray;
  /** @type {function(this:*): string} */
  var fnToStr = Object.prototype.toString;
  /** @type {function(*): boolean} */
  module.exports = nativeIsArray || function(method) {
    return !!method && "[object Array]" == fnToStr.call(method);
  };
}, function(canCreateDiscussions, a, n) {
  /** @type {string} */
  var value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  !function(exports) {
    /**
     * @param {string} a
     * @return {?}
     */
    function decode(a) {
      var w = a.charCodeAt(0);
      return w === TO_ISO_STRING || w === TO_UTC_STRING ? 62 : w === TO_TIME_STRING || w === TO_STRING ? 63 : x > w ? -1 : x + 10 > w ? w - x + 26 + 26 : half_xgap + 26 > w ? w - half_xgap : mid_char_w + 26 > w ? w - mid_char_w + 26 : void 0;
    }
    /**
     * @param {string} b64
     * @return {?}
     */
    function b64ToByteArray(b64) {
      /**
       * @param {number} value
       * @return {undefined}
       */
      function push(value) {
        /** @type {number} */
        arr[L++] = value;
      }
      var i;
      var bytesUsed;
      var indexOfRequirement;
      var listeners;
      var placeHolders;
      var arr;
      if (b64.length % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var len = b64.length;
      /** @type {number} */
      placeHolders = "=" === b64.charAt(len - 2) ? 2 : "=" === b64.charAt(len - 1) ? 1 : 0;
      arr = new Arr(3 * b64.length / 4 - placeHolders);
      indexOfRequirement = placeHolders > 0 ? b64.length - 4 : b64.length;
      /** @type {number} */
      var L = 0;
      /** @type {number} */
      i = 0;
      /** @type {number} */
      bytesUsed = 0;
      for (; indexOfRequirement > i; i = i + 4, bytesUsed = bytesUsed + 3) {
        /** @type {number} */
        listeners = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
        push((16711680 & listeners) >> 16);
        push((65280 & listeners) >> 8);
        push(255 & listeners);
      }
      return 2 === placeHolders ? (listeners = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4, push(255 & listeners)) : 1 === placeHolders && (listeners = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2, push(listeners >> 8 & 255), push(255 & listeners)), arr;
    }
    /**
     * @param {!Object} uint8
     * @return {?}
     */
    function uint8ToBase64(uint8) {
      /**
       * @param {number} column
       * @return {?}
       */
      function encode(column) {
        return value.charAt(column);
      }
      /**
       * @param {number} num
       * @return {?}
       */
      function tripletToBase64(num) {
        return encode(num >> 18 & 63) + encode(num >> 12 & 63) + encode(num >> 6 & 63) + encode(63 & num);
      }
      var i;
      var temp;
      var length;
      /** @type {number} */
      var extraBytes = uint8.length % 3;
      /** @type {string} */
      var output = "";
      /** @type {number} */
      i = 0;
      /** @type {number} */
      length = uint8.length - extraBytes;
      for (; length > i; i = i + 3) {
        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
        /** @type {string} */
        output = output + tripletToBase64(temp);
      }
      switch(extraBytes) {
        case 1:
          temp = uint8[uint8.length - 1];
          /** @type {string} */
          output = output + encode(temp >> 2);
          /** @type {string} */
          output = output + encode(temp << 4 & 63);
          /** @type {string} */
          output = output + "==";
          break;
        case 2:
          temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
          /** @type {string} */
          output = output + encode(temp >> 10);
          /** @type {string} */
          output = output + encode(temp >> 4 & 63);
          /** @type {string} */
          output = output + encode(temp << 2 & 63);
          /** @type {string} */
          output = output + "=";
      }
      return output;
    }
    /** @type {!Function} */
    var Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array;
    /** @type {number} */
    var TO_ISO_STRING = "+".charCodeAt(0);
    /** @type {number} */
    var TO_TIME_STRING = "/".charCodeAt(0);
    /** @type {number} */
    var x = "0".charCodeAt(0);
    /** @type {number} */
    var mid_char_w = "a".charCodeAt(0);
    /** @type {number} */
    var half_xgap = "A".charCodeAt(0);
    /** @type {number} */
    var TO_UTC_STRING = "-".charCodeAt(0);
    /** @type {number} */
    var TO_STRING = "_".charCodeAt(0);
    /** @type {function(string): ?} */
    exports.toByteArray = b64ToByteArray;
    /** @type {function(!Object): ?} */
    exports.fromByteArray = uint8ToBase64;
  }(a);
}, function(canCreateDiscussions, asyncFile, n) {
  /**
   * @param {?} index
   * @param {number} offset
   * @param {boolean} mode
   * @param {number} length
   * @param {number} done
   * @return {?}
   */
  asyncFile.read = function(index, offset, mode, length, done) {
    var i;
    var j;
    /** @type {number} */
    var saltLen = 8 * done - length - 1;
    /** @type {number} */
    var ms_controller = (1 << saltLen) - 1;
    /** @type {number} */
    var TIMEOUT_POLL_DECREMENT = ms_controller >> 1;
    /** @type {number} */
    var c = -7;
    /** @type {number} */
    var k = mode ? done - 1 : 0;
    /** @type {number} */
    var m = mode ? -1 : 1;
    var g = index[offset + k];
    /** @type {number} */
    k = k + m;
    /** @type {number} */
    i = g & (1 << -c) - 1;
    /** @type {number} */
    g = g >> -c;
    /** @type {number} */
    c = c + saltLen;
    for (; c > 0; i = 256 * i + index[offset + k], k = k + m, c = c - 8) {
    }
    /** @type {number} */
    j = i & (1 << -c) - 1;
    /** @type {number} */
    i = i >> -c;
    c = c + length;
    for (; c > 0; j = 256 * j + index[offset + k], k = k + m, c = c - 8) {
    }
    if (0 === i) {
      /** @type {number} */
      i = 1 - TIMEOUT_POLL_DECREMENT;
    } else {
      if (i === ms_controller) {
        return j ? NaN : (g ? -1 : 1) * (1 / 0);
      }
      j = j + Math.pow(2, length);
      /** @type {number} */
      i = i - TIMEOUT_POLL_DECREMENT;
    }
    return (g ? -1 : 1) * j * Math.pow(2, i - length);
  };
  /**
   * @param {string} buffer
   * @param {number} value
   * @param {number} offset
   * @param {boolean} isLE
   * @param {number} mLen
   * @param {number} nBytes
   * @return {undefined}
   */
  asyncFile.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var x;
    var m;
    var c;
    /** @type {number} */
    var eLen = 8 * nBytes - mLen - 1;
    /** @type {number} */
    var j = (1 << eLen) - 1;
    /** @type {number} */
    var level = j >> 1;
    /** @type {number} */
    var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    /** @type {number} */
    var i = isLE ? 0 : nBytes - 1;
    /** @type {number} */
    var d = isLE ? 1 : -1;
    /** @type {number} */
    var x2 = 0 > value || 0 === value && 0 > 1 / value ? 1 : 0;
    /** @type {number} */
    value = Math.abs(value);
    if (isNaN(value) || value === 1 / 0) {
      /** @type {number} */
      m = isNaN(value) ? 1 : 0;
      /** @type {number} */
      x = j;
    } else {
      /** @type {number} */
      x = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -x)) < 1) {
        x--;
        /** @type {number} */
        c = c * 2;
      }
      /** @type {number} */
      value = value + (x + level >= 1 ? rt / c : rt * Math.pow(2, 1 - level));
      if (value * c >= 2) {
        x++;
        /** @type {number} */
        c = c / 2;
      }
      if (x + level >= j) {
        /** @type {number} */
        m = 0;
        /** @type {number} */
        x = j;
      } else {
        if (x + level >= 1) {
          /** @type {number} */
          m = (value * c - 1) * Math.pow(2, mLen);
          /** @type {number} */
          x = x + level;
        } else {
          /** @type {number} */
          m = value * Math.pow(2, level - 1) * Math.pow(2, mLen);
          /** @type {number} */
          x = 0;
        }
      }
    }
    for (; mLen >= 8; buffer[offset + i] = 255 & m, i = i + d, m = m / 256, mLen = mLen - 8) {
    }
    /** @type {number} */
    x = x << mLen | m;
    eLen = eLen + mLen;
    for (; eLen > 0; buffer[offset + i] = 255 & x, i = i + d, x = x / 256, eLen = eLen - 8) {
    }
    buffer[offset + i - d] |= 128 * x2;
  };
}, function(module, canCreateDiscussions, n) {
  /** @type {function(*): boolean} */
  var nativeIsArray = Array.isArray;
  /** @type {function(this:*): string} */
  var fnToStr = Object.prototype.toString;
  /** @type {function(*): boolean} */
  module.exports = nativeIsArray || function(method) {
    return !!method && "[object Array]" == fnToStr.call(method);
  };
}, function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _prepareStyleProperties = __webpack_require__(174);
  _interopRequireDefault(_prepareStyleProperties);
  exports["default"] = {
    Endpoints : {
      FINGERPRINT : "/auth/fingerprint",
      REGISTER : "/auth/register"
    }
  };
  module.exports = exports["default"];
}, function(record, t, aFunctionName) {
  var result;
  !function() {
    /**
     * @param {!Element} layer
     * @param {!Object} options
     * @return {undefined}
     */
    function FastClick(layer, options) {
      /**
       * @param {!Function} fn
       * @param {?} opt_context
       * @return {?}
       */
      function bind(fn, opt_context) {
        return function() {
          return fn.apply(opt_context, arguments);
        };
      }
      var oldOnClick;
      if (options = options || {}, this.trackingClick = false, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = options.touchBoundary || 10, this.layer = layer, this.tapDelay = options.tapDelay || 200, this.tapTimeout = options.tapTimeout || 700, !FastClick.notNeeded(layer)) {
        /** @type {!Array} */
        var methods = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
        var context = this;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = methods.length;
        for (; l > i; i++) {
          context[methods[i]] = bind(context[methods[i]], context);
        }
        if (doc) {
          layer.addEventListener("mouseover", this.onMouse, true);
          layer.addEventListener("mousedown", this.onMouse, true);
          layer.addEventListener("mouseup", this.onMouse, true);
        }
        layer.addEventListener("click", this.onClick, true);
        layer.addEventListener("touchstart", this.onTouchStart, false);
        layer.addEventListener("touchmove", this.onTouchMove, false);
        layer.addEventListener("touchend", this.onTouchEnd, false);
        layer.addEventListener("touchcancel", this.onTouchCancel, false);
        if (!Event.prototype.stopImmediatePropagation) {
          /**
           * @param {string} type
           * @param {!Function} callback
           * @param {boolean} capture
           * @return {undefined}
           */
          layer.removeEventListener = function(type, callback, capture) {
            /** @type {function(this:Node, string, (EventListener|function(!Event): (boolean|undefined)|null), (EventListenerOptions|boolean)=): undefined} */
            var rmv = Node.prototype.removeEventListener;
            if ("click" === type) {
              rmv.call(layer, type, callback.hijacked || callback, capture);
            } else {
              rmv.call(layer, type, callback, capture);
            }
          };
          /**
           * @param {string} type
           * @param {!Function} callback
           * @param {boolean} capture
           * @return {undefined}
           */
          layer.addEventListener = function(type, callback, capture) {
            /** @type {function(this:Node, string, (EventListener|function(!Event): (boolean|undefined)|null), (AddEventListenerOptions|boolean)=): undefined} */
            var adv = Node.prototype.addEventListener;
            if ("click" === type) {
              adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                if (!event.propagationStopped) {
                  callback(event);
                }
              }), capture);
            } else {
              adv.call(layer, type, callback, capture);
            }
          };
        }
        if ("function" == typeof layer.onclick) {
          /** @type {!Function} */
          oldOnClick = layer.onclick;
          layer.addEventListener("click", function(event) {
            oldOnClick(event);
          }, false);
          /** @type {null} */
          layer.onclick = null;
        }
      }
    }
    /** @type {boolean} */
    var i = navigator.userAgent.indexOf("Windows Phone") >= 0;
    /** @type {boolean} */
    var doc = navigator.userAgent.indexOf("Android") > 0 && !i;
    /** @type {boolean} */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !i;
    /** @type {boolean} */
    var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
    /** @type {boolean} */
    var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);
    /** @type {boolean} */
    var c = navigator.userAgent.indexOf("BB10") > 0;
    /**
     * @param {!Element} target
     * @return {?}
     */
    FastClick.prototype.needsClick = function(target) {
      switch(target.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
          if (target.disabled) {
            return true;
          }
          break;
        case "input":
          if (deviceIsIOS && "file" === target.type || target.disabled) {
            return true;
          }
          break;
        case "label":
        case "iframe":
        case "video":
          return true;
      }
      return /\bneedsclick\b/.test(target.className);
    };
    /**
     * @param {!EventTarget} target
     * @return {?}
     */
    FastClick.prototype.needsFocus = function(target) {
      switch(target.nodeName.toLowerCase()) {
        case "textarea":
          return true;
        case "select":
          return !doc;
        case "input":
          switch(target.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
              return false;
          }return !target.disabled && !target.readOnly;
        default:
          return /\bneedsfocus\b/.test(target.className);
      }
    };
    /**
     * @param {!HTMLElement} targetElement
     * @param {!Event} event
     * @return {undefined}
     */
    FastClick.prototype.sendClick = function(targetElement, event) {
      var clickEvent;
      var touch;
      if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur();
      }
      touch = event.changedTouches[0];
      /** @type {(Event|null)} */
      clickEvent = document.createEvent("MouseEvents");
      clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
      /** @type {boolean} */
      clickEvent.forwardedTouchEvent = true;
      targetElement.dispatchEvent(clickEvent);
    };
    /**
     * @param {!HTMLElement} targetElement
     * @return {?}
     */
    FastClick.prototype.determineEventType = function(targetElement) {
      return doc && "select" === targetElement.tagName.toLowerCase() ? "mousedown" : "click";
    };
    /**
     * @param {!Object} targetElement
     * @return {undefined}
     */
    FastClick.prototype.focus = function(targetElement) {
      var length;
      if (deviceIsIOS && targetElement.setSelectionRange && 0 !== targetElement.type.indexOf("date") && "time" !== targetElement.type && "month" !== targetElement.type) {
        length = targetElement.value.length;
        targetElement.setSelectionRange(length, length);
      } else {
        targetElement.focus();
      }
    };
    /**
     * @param {!EventTarget} targetElement
     * @return {undefined}
     */
    FastClick.prototype.updateScrollParent = function(targetElement) {
      var scrollParent;
      var parentElement;
      if (scrollParent = targetElement.fastClickScrollParent, !scrollParent || !scrollParent.contains(targetElement)) {
        /** @type {!EventTarget} */
        parentElement = targetElement;
        do {
          if (parentElement.scrollHeight > parentElement.offsetHeight) {
            scrollParent = parentElement;
            targetElement.fastClickScrollParent = parentElement;
            break;
          }
          parentElement = parentElement.parentElement;
        } while (parentElement);
      }
      if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
      }
    };
    /**
     * @param {!Object} eventTarget
     * @return {?}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
      return eventTarget.nodeType === Node.TEXT_NODE ? eventTarget.parentNode : eventTarget;
    };
    /**
     * @param {!Event} event
     * @return {?}
     */
    FastClick.prototype.onTouchStart = function(event) {
      var targetElement;
      var touch;
      var selection;
      if (event.targetTouches.length > 1) {
        return true;
      }
      if (targetElement = this.getTargetElementFromEventTarget(event.target), touch = event.targetTouches[0], deviceIsIOS) {
        if (selection = window.getSelection(), selection.rangeCount && !selection.isCollapsed) {
          return true;
        }
        if (!deviceIsIOS4) {
          if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
            return event.preventDefault(), false;
          }
          this.lastTouchIdentifier = touch.identifier;
          this.updateScrollParent(targetElement);
        }
      }
      return this.trackingClick = true, this.trackingClickStart = event.timeStamp, this.targetElement = targetElement, this.touchStartX = touch.pageX, this.touchStartY = touch.pageY, event.timeStamp - this.lastClickTime < this.tapDelay && event.preventDefault(), true;
    };
    /**
     * @param {!Event} event
     * @return {?}
     */
    FastClick.prototype.touchHasMoved = function(event) {
      var touch = event.changedTouches[0];
      var boundary = this.touchBoundary;
      return Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary ? true : false;
    };
    /**
     * @param {!Event} event
     * @return {?}
     */
    FastClick.prototype.onTouchMove = function(event) {
      return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) && (this.trackingClick = false, this.targetElement = null), true) : true;
    };
    /**
     * @param {!EventTarget} labelElement
     * @return {?}
     */
    FastClick.prototype.findControl = function(labelElement) {
      return void 0 !== labelElement.control ? labelElement.control : labelElement.htmlFor ? document.getElementById(labelElement.htmlFor) : labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
    };
    /**
     * @param {!Event} event
     * @return {?}
     */
    FastClick.prototype.onTouchEnd = function(event) {
      var forElement;
      var trackingClickStart;
      var undefined;
      var scrollParent;
      var touch;
      var targetElement = this.targetElement;
      if (!this.trackingClick) {
        return true;
      }
      if (event.timeStamp - this.lastClickTime < this.tapDelay) {
        return this.cancelNextClick = true, true;
      }
      if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
        return true;
      }
      if (this.cancelNextClick = false, this.lastClickTime = event.timeStamp, trackingClickStart = this.trackingClickStart, this.trackingClick = false, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (touch = event.changedTouches[0], targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement, targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent), undefined = targetElement.tagName.toLowerCase(),
      "label" === undefined) {
        if (forElement = this.findControl(targetElement)) {
          if (this.focus(targetElement), doc) {
            return false;
          }
          targetElement = forElement;
        }
      } else {
        if (this.needsFocus(targetElement)) {
          return event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && "input" === undefined ? (this.targetElement = null, false) : (this.focus(targetElement), this.sendClick(targetElement, event), deviceIsIOS && "select" === undefined || (this.targetElement = null, event.preventDefault()), false);
        }
      }
      return deviceIsIOS && !deviceIsIOS4 && (scrollParent = targetElement.fastClickScrollParent, scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) ? true : (this.needsClick(targetElement) || (event.preventDefault(), this.sendClick(targetElement, event)), false);
    };
    /**
     * @return {undefined}
     */
    FastClick.prototype.onTouchCancel = function() {
      /** @type {boolean} */
      this.trackingClick = false;
      /** @type {null} */
      this.targetElement = null;
    };
    /**
     * @param {!Event} event
     * @return {?}
     */
    FastClick.prototype.onMouse = function(event) {
      return this.targetElement ? event.forwardedTouchEvent ? true : event.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (event.stopImmediatePropagation ? event.stopImmediatePropagation() : event.propagationStopped = true, event.stopPropagation(), event.preventDefault(), false) : true : true;
    };
    /**
     * @param {!Event} event
     * @return {?}
     */
    FastClick.prototype.onClick = function(event) {
      var permitted;
      return this.trackingClick ? (this.targetElement = null, this.trackingClick = false, true) : "submit" === event.target.type && 0 === event.detail ? true : (permitted = this.onMouse(event), permitted || (this.targetElement = null), permitted);
    };
    /**
     * @return {undefined}
     */
    FastClick.prototype.destroy = function() {
      var layer = this.layer;
      if (doc) {
        layer.removeEventListener("mouseover", this.onMouse, true);
        layer.removeEventListener("mousedown", this.onMouse, true);
        layer.removeEventListener("mouseup", this.onMouse, true);
      }
      layer.removeEventListener("click", this.onClick, true);
      layer.removeEventListener("touchstart", this.onTouchStart, false);
      layer.removeEventListener("touchmove", this.onTouchMove, false);
      layer.removeEventListener("touchend", this.onTouchEnd, false);
      layer.removeEventListener("touchcancel", this.onTouchCancel, false);
    };
    /**
     * @param {!Element} layer
     * @return {?}
     */
    FastClick.notNeeded = function(layer) {
      var n;
      var t;
      var r;
      var o;
      if ("undefined" == typeof window.ontouchstart) {
        return true;
      }
      if (t = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
        if (!doc) {
          return true;
        }
        if (n = document.querySelector("meta[name=viewport]")) {
          if (-1 !== n.content.indexOf("user-scalable=no")) {
            return true;
          }
          if (t > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
          }
        }
      }
      if (c && (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), r[1] >= 10 && r[2] >= 3 && (n = document.querySelector("meta[name=viewport]")))) {
        if (-1 !== n.content.indexOf("user-scalable=no")) {
          return true;
        }
        if (document.documentElement.scrollWidth <= window.outerWidth) {
          return true;
        }
      }
      return "none" === layer.style.msTouchAction || "manipulation" === layer.style.touchAction ? true : (o = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], o >= 27 && (n = document.querySelector("meta[name=viewport]"), n && (-1 !== n.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? true : "none" === layer.style.touchAction || "manipulation" === layer.style.touchAction ? true : false);
    };
    /**
     * @param {!Object} layer
     * @param {string} options
     * @return {?}
     */
    FastClick.attach = function(layer, options) {
      return new FastClick(layer, options);
    };
    result = function() {
      return FastClick;
    }.call(t, aFunctionName, t, record);
    !(void 0 !== result && (record.exports = result));
  }();
}, function(e, exports, cb) {
  var __WEBPACK_AMD_DEFINE_RESULT__;
  (function(module, val) {
    (function() {
      /**
       * @param {string} string
       * @return {?}
       */
      function capitalize(string) {
        return string = String(string), string.charAt(0).toUpperCase() + string.slice(1);
      }
      /**
       * @param {string} os
       * @param {string} pattern
       * @param {string} label
       * @return {?}
       */
      function cleanupOS(os, pattern, label) {
        var data = {
          "6.4" : "10",
          "6.3" : "8.1",
          "6.2" : "8",
          "6.1" : "Server 2008 R2 / 7",
          "6.0" : "Server 2008 / Vista",
          "5.2" : "Server 2003 / XP 64-bit",
          "5.1" : "XP",
          "5.01" : "2000 SP1",
          "5.0" : "2000",
          "4.0" : "NT",
          "4.90" : "ME"
        };
        return pattern && label && /^Win/i.test(os) && (data = data[/[\d.]+$/.exec(os)]) && (os = "Windows " + data), os = String(os), pattern && label && (os = os.replace(RegExp(pattern, "i"), label)), os = format(os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi,
        "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").split(" on ")[0]);
      }
      /**
       * @param {!Array} data
       * @param {!Function} f
       * @return {undefined}
       */
      function done(data, f) {
        /** @type {number} */
        var i = -1;
        var length = data ? data.length : 0;
        if ("number" == typeof length && length > -1 && _endIndex >= length) {
          for (; ++i < length;) {
            f(data[i], i, data);
          }
        } else {
          message(data, f);
        }
      }
      /**
       * @param {string} string
       * @return {?}
       */
      function format(string) {
        return string = trim(string), /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
      }
      /**
       * @param {!Object} data
       * @param {!Function} callback
       * @return {undefined}
       */
      function message(data, callback) {
        var type;
        for (type in data) {
          if (hasOwnProperty.call(data, type)) {
            callback(data[type], type, data);
          }
        }
      }
      /**
       * @param {string} value
       * @return {?}
       */
      function getClassOf(value) {
        return null == value ? capitalize(value) : toString.call(value).slice(8, -1);
      }
      /**
       * @param {!Object} object
       * @param {string} property
       * @return {?}
       */
      function isHostType(object, property) {
        /** @type {string} */
        var type = null != object ? typeof object[property] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(type) && ("object" == type ? !!object[property] : true);
      }
      /**
       * @param {!Object} string
       * @return {?}
       */
      function qualify(string) {
        return String(string).replace(/([ -])(?!$)/g, "$1?");
      }
      /**
       * @param {!Array} value
       * @param {!Function} callback
       * @return {?}
       */
      function reduce(value, callback) {
        /** @type {null} */
        var result = null;
        return done(value, function(installId, key) {
          result = callback(result, installId, key, value);
        }), result;
      }
      /**
       * @param {string} string
       * @return {?}
       */
      function trim(string) {
        return String(string).replace(/^ +| +$/g, "");
      }
      /**
       * @param {string} ua
       * @return {?}
       */
      function parse(ua) {
        /**
         * @param {!Array} count
         * @return {?}
         */
        function getLayout(count) {
          return reduce(count, function(canCreateDiscussions, guess) {
            return canCreateDiscussions || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        /**
         * @param {!Array} callback
         * @return {?}
         */
        function getManufacturer(callback) {
          return reduce(callback, function(result, value, key) {
            return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
          });
        }
        /**
         * @param {!Array} target
         * @return {?}
         */
        function getName(target) {
          return reduce(target, function(canCreateDiscussions, guess) {
            return canCreateDiscussions || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        /**
         * @param {!Array} guesses
         * @return {?}
         */
        function getOS(guesses) {
          return reduce(guesses, function(result, guess) {
            var pattern = guess.pattern || qualify(guess);
            return !result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua)) && (result = cleanupOS(result, pattern, guess.label || guess)), result;
          });
        }
        /**
         * @param {!Array} callback
         * @return {?}
         */
        function getProduct(callback) {
          return reduce(callback, function(val, guess) {
            var url = guess.pattern || qualify(guess);
            return !val && (val = RegExp("\\b" + url + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + url + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua)) && ((val = String(guess.label && !RegExp(url, "i").test(guess.label) ? guess.label : val).split("/"))[1] && !/[\d.]+/.test(val[0]) && (val[0] += " " + val[1]), guess = guess.label || guess, val = format(val[0].replace(RegExp(url, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)",
            "i"), "$1 $2"))), val;
          });
        }
        /**
         * @param {!Array} callback
         * @return {?}
         */
        function getVersion(callback) {
          return reduce(callback, function(canCreateDiscussions, data) {
            return canCreateDiscussions || (RegExp(data + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
          });
        }
        /**
         * @return {?}
         */
        function toStringPlatform() {
          return this.description || "";
        }
        var context = root;
        var isCustomContext = ua && "object" == typeof ua && "String" != getClassOf(ua);
        if (isCustomContext) {
          /** @type {string} */
          context = ua;
          /** @type {null} */
          ua = null;
        }
        var nav = context.navigator || {};
        var userAgent = nav.userAgent || "";
        if (!ua) {
          ua = userAgent;
        }
        var data;
        var isSpecialCasedOS;
        var isModuleScope = isCustomContext || thisBinding == oldRoot;
        /** @type {boolean} */
        var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
        /** @type {string} */
        var objectClass = "Object";
        /** @type {string} */
        var airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject";
        /** @type {string} */
        var enviroClass = isCustomContext ? objectClass : "Environment";
        var javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java);
        /** @type {string} */
        var phantomClass = isCustomContext ? objectClass : "RuntimeObject";
        var java = /\bJava/.test(javaClass) && context.java;
        var rhino = java && getClassOf(context.environment) == enviroClass;
        /** @type {string} */
        var alpha = java ? "a" : "\u03b1";
        /** @type {string} */
        var beta = java ? "b" : "\u03b2";
        var document = context.document || {};
        var opera = context.operamini || context.opera;
        var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
        /** @type {string} */
        var arch = ua;
        /** @type {!Array} */
        var description = [];
        /** @type {null} */
        var prerelease = null;
        /** @type {boolean} */
        var useFeatures = ua == userAgent;
        var version = useFeatures && opera && "function" == typeof opera.version && opera.version();
        var layout = getLayout(["Trident", {
          label : "WebKit",
          pattern : "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]);
        var name = getName(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", {
          label : "SRWare Iron",
          pattern : "Iron"
        }, "K-Meleon", "Konqueror", "Lunascape", "Maxthon", "Midori", "Nook Browser", "PhantomJS", "Raven", "Rekonq", "RockMelt", "SeaMonkey", {
          label : "Silk",
          pattern : "(?:Cloud9|Silk-Accelerated)"
        }, "Sleipnir", "SlimBrowser", "Sunrise", "Swiftfox", "WebPositive", "Opera Mini", {
          label : "Opera Mini",
          pattern : "OPiOS"
        }, "Opera", {
          label : "Opera",
          pattern : "OPR"
        }, "Chrome", {
          label : "Chrome Mobile",
          pattern : "(?:CriOS|CrMo)"
        }, {
          label : "Firefox",
          pattern : "(?:Firefox|Minefield|Waterfox)"
        }, {
          label : "IE",
          pattern : "IEMobile"
        }, {
          label : "IE",
          pattern : "MSIE"
        }, "Safari"]);
        var product = getProduct([{
          label : "BlackBerry",
          pattern : "BB10"
        }, "BlackBerry", {
          label : "Galaxy S",
          pattern : "GT-I9000"
        }, {
          label : "Galaxy S2",
          pattern : "GT-I9100"
        }, {
          label : "Galaxy S3",
          pattern : "GT-I9300"
        }, {
          label : "Galaxy S4",
          pattern : "GT-I9500"
        }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
          label : "Kindle Fire",
          pattern : "(?:Cloud9|Silk-Accelerated)"
        }, "Nook", "PlayBook", "PlayStation 4", "PlayStation 3", "PlayStation Vita", "TouchPad", "Transformer", {
          label : "Wii U",
          pattern : "WiiU"
        }, "Wii", "Xbox One", {
          label : "Xbox 360",
          pattern : "Xbox"
        }, "Xoom"]);
        var manufacturer = getManufacturer({
          Apple : {
            iPad : 1,
            iPhone : 1,
            iPod : 1
          },
          Amazon : {
            Kindle : 1,
            "Kindle Fire" : 1
          },
          Asus : {
            Transformer : 1
          },
          "Barnes & Noble" : {
            Nook : 1
          },
          BlackBerry : {
            PlayBook : 1
          },
          Google : {
            "Google TV" : 1
          },
          HP : {
            TouchPad : 1
          },
          HTC : {},
          LG : {},
          Microsoft : {
            Xbox : 1,
            "Xbox One" : 1
          },
          Motorola : {
            Xoom : 1
          },
          Nintendo : {
            "Wii U" : 1,
            Wii : 1
          },
          Nokia : {
            Lumia : 1
          },
          Samsung : {
            "Galaxy S" : 1,
            "Galaxy S2" : 1,
            "Galaxy S3" : 1,
            "Galaxy S4" : 1
          },
          Sony : {
            "PlayStation 4" : 1,
            "PlayStation 3" : 1,
            "PlayStation Vita" : 1
          }
        });
        var os = getOS(["Windows Phone ", "Android", "CentOS", "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        if (layout && (layout = [layout]), manufacturer && !product && (product = getProduct([manufacturer])), (data = /\bGoogle TV\b/.exec(product)) && (product = data[0]), /\bSimulator\b/i.test(ua) && (product = (product ? product + " " : "") + "Simulator"), "Opera Mini" == name && /\bOPiOS\b/.test(ua) && description.push("running in Turbo/Uncompressed mode"), /^iP/.test(product) ? (name || (name = "Safari"), os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "")) :
        "Konqueror" != name || /buntu/i.test(os) ? manufacturer && "Google" != manufacturer && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) ? (name = "Android Browser", os = /\bAndroid\b/.test(os) ? os : "Android") : (!name || (data = !/\b(Minefield|Waterfox)\b|\(Android;/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) && (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8)) && (name = null), (data = product || manufacturer ||
        os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os)) && (name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser")) : os = "Kubuntu", (data = /\((Mobile|Tablet).*?Firefox\b/i.exec(ua)) && data[1] && (os = "Firefox OS", product || (product = data[1])), version || (version = getVersion(["(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))", "Version", qualify(name), "(?:Firefox|Minefield|Waterfox|NetFront)"])),
        "iCab" == layout && parseFloat(version) > 3 ? layout = ["WebKit"] : "Trident" != layout && (data = /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && ("Mac OS" == os ? "Tasman" : "Trident")) ? layout = [data] : /\bPlayStation\b(?! Vita\b)/i.test(name) && "WebKit" == layout && (layout = ["NetFront"]), "IE" == name && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1]) ? (name =
        name + " Mobile", os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x"), description.unshift("desktop mode")) : /\bWPDesktop\b/i.test(ua) ? (name = "IE Mobile", os = "Windows Phone 8+", description.unshift("desktop mode"), version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1])) : "IE" != name && "Trident" == layout && (data = /\brv:([\d.]+)/.exec(ua)) ? (/\bWPDesktop\b/i.test(ua) || (name && description.push("identifying as " + name + (version ? " " + version : "")), name = "IE"),
        version = data[1]) : "Chrome" != name && "IE" == name || !(data = /\bEdge\/([\d.]+)/.exec(ua)) || (name = "IE", version = data[1], layout = ["Trident"], description.unshift("platform preview")), useFeatures) {
          if (isHostType(context, "global")) {
            if (java && (data = java.lang.System, arch = data.getProperty("os.arch"), os = os || data.getProperty("os.name") + " " + data.getProperty("os.version")), isModuleScope && isHostType(context, "system") && (data = [context.system])[0]) {
              if (!os) {
                os = data[0].os || null;
              }
              try {
                data[1] = context.require("ringo/engine").version;
                version = data[1].join(".");
                /** @type {string} */
                name = "RingoJS";
              } catch (J) {
                if (data[0].global.system == context.system) {
                  /** @type {string} */
                  name = "Narwhal";
                }
              }
            } else {
              if ("object" == typeof context.process && (data = context.process)) {
                /** @type {string} */
                name = "Node.js";
                arch = data.arch;
                os = data.platform;
                /** @type {string} */
                version = /[\d.]+/.exec(data.version)[0];
              } else {
                if (rhino) {
                  /** @type {string} */
                  name = "Rhino";
                }
              }
            }
          } else {
            if (getClassOf(data = context.runtime) == airRuntimeClass) {
              /** @type {string} */
              name = "Adobe AIR";
              os = data.flash.system.Capabilities.os;
            } else {
              if (getClassOf(data = context.phantom) == phantomClass) {
                /** @type {string} */
                name = "PhantomJS";
                version = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
              } else {
                if ("number" == typeof document.documentMode && (data = /\bTrident\/(\d+)/i.exec(ua))) {
                  /** @type {!Array} */
                  version = [version, document.documentMode];
                  if ((data = +data[1] + 4) != version[1]) {
                    description.push("IE " + version[1] + " mode");
                    if (layout) {
                      /** @type {string} */
                      layout[1] = "";
                    }
                    /** @type {number} */
                    version[1] = data;
                  }
                  version = "IE" == name ? String(version[1].toFixed(1)) : version[0];
                }
              }
            }
          }
          os = os && format(os);
        }
        if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
          /** @type {string} */
          prerelease = /b/i.test(data) ? "beta" : "alpha";
          /** @type {string} */
          version = version.replace(RegExp(data + "\\+?$"), "") + ("beta" == prerelease ? beta : alpha) + (/\d+\+?/.exec(data) || "");
        }
        if ("Fennec" == name || "Firefox" == name && /\b(?:Android|Firefox OS)\b/.test(os)) {
          /** @type {string} */
          name = "Firefox Mobile";
        } else {
          if ("Maxthon" == name && version) {
            version = version.replace(/\.[\d.]+/, ".x");
          } else {
            if ("Silk" == name) {
              if (!/\bMobi/i.test(ua)) {
                /** @type {string} */
                os = "Android";
                description.unshift("desktop mode");
              }
              if (/Accelerated *= *true/i.test(ua)) {
                description.unshift("accelerated");
              }
            } else {
              if (/\bXbox\b/i.test(product)) {
                /** @type {null} */
                os = null;
                if ("Xbox 360" == product && /\bIEMobile\b/.test(ua)) {
                  description.unshift("mobile mode");
                }
              } else {
                if (!/^(?:Chrome|IE|Opera)$/.test(name) && (!name || product || /Browser|Mobi/.test(name)) || "Windows CE" != os && !/Mobi/i.test(ua)) {
                  if ("IE" == name && useFeatures && null === context.external) {
                    description.unshift("platform preview");
                  } else {
                    if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version)) {
                      /** @type {!Array} */
                      data = [data, /BB10/.test(ua)];
                      /** @type {string} */
                      os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
                      /** @type {null} */
                      version = null;
                    } else {
                      if (this != message && "Wii" != product && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || "Firefox" == name && /\bOS X (?:\d+\.){2,}/.test(os) || "IE" == name && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || 8 == version && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(message, ua.replace(reOpera, "") + ";")) && data.name) {
                        /** @type {string} */
                        data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
                        if (reOpera.test(name)) {
                          if (/\bIE\b/.test(data) && "Mac OS" == os) {
                            /** @type {null} */
                            os = null;
                          }
                          /** @type {string} */
                          data = "identify" + data;
                        } else {
                          /** @type {string} */
                          data = "mask" + data;
                          name = operaClass ? format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera";
                          if (/\bIE\b/.test(data)) {
                            /** @type {null} */
                            os = null;
                          }
                          if (!useFeatures) {
                            /** @type {null} */
                            version = null;
                          }
                        }
                        /** @type {!Array} */
                        layout = ["Presto"];
                        description.push(data);
                      }
                    }
                  }
                } else {
                  /** @type {string} */
                  name = name + " Mobile";
                }
              }
            }
          }
        }
        if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
          /** @type {!Array} */
          data = [parseFloat(data.replace(/\.(\d)$/, ".0$1")), data];
          if ("Safari" == name && "+" == data[1].slice(-1)) {
            /** @type {string} */
            name = "WebKit Nightly";
            /** @type {string} */
            prerelease = "alpha";
            version = data[1].slice(0, -1);
          } else {
            if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
              /** @type {null} */
              version = null;
            }
          }
          data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
          if (537.36 == data[0] && 537.36 == data[2] && parseFloat(data[1]) >= 28 && "IE" != name) {
            /** @type {!Array} */
            layout = ["Blink"];
          }
          if (useFeatures && (likeChrome || data[1])) {
            if (layout) {
              /** @type {string} */
              layout[1] = "like Chrome";
            }
            data = data[1] || (data = data[0], 530 > data ? 1 : 532 > data ? 2 : 532.05 > data ? 3 : 533 > data ? 4 : 534.03 > data ? 5 : 534.07 > data ? 6 : 534.1 > data ? 7 : 534.13 > data ? 8 : 534.16 > data ? 9 : 534.24 > data ? 10 : 534.3 > data ? 11 : 535.01 > data ? 12 : 535.02 > data ? "13+" : 535.07 > data ? 15 : 535.11 > data ? 16 : 535.19 > data ? 17 : 536.05 > data ? 18 : 536.1 > data ? 19 : 537.01 > data ? 20 : 537.11 > data ? "21+" : 537.13 > data ? 23 : 537.18 > data ? 24 : 537.24 >
            data ? 25 : 537.36 > data ? 26 : "Blink" != layout ? "27" : "28");
          } else {
            if (layout) {
              /** @type {string} */
              layout[1] = "like Safari";
            }
            data = data[0];
            /** @type {(number|string)} */
            data = 400 > data ? 1 : 500 > data ? 2 : 526 > data ? 3 : 533 > data ? 4 : 534 > data ? "4+" : 535 > data ? 5 : 537 > data ? 6 : 538 > data ? 7 : 601 > data ? 8 : "8";
          }
          if (layout) {
            layout[1] += " " + (data = data + ("number" == typeof data ? ".x" : /[.+]/.test(data) ? "" : "+"));
          }
          if ("Safari" == name && (!version || parseInt(version) > 45)) {
            /** @type {(Array|string)} */
            version = data;
          }
        }
        if ("Opera" == name && (data = /\bzbov|zvav$/.exec(os))) {
          /** @type {string} */
          name = name + " ";
          description.unshift("desktop mode");
          if ("zvav" == data) {
            /** @type {string} */
            name = name + "Mini";
            /** @type {null} */
            version = null;
          } else {
            /** @type {string} */
            name = name + "Mobile";
          }
          os = os.replace(RegExp(" *" + data + "$"), "");
        } else {
          if ("Safari" == name && /\bChrome\b/.exec(layout && layout[1])) {
            description.unshift("desktop mode");
            /** @type {string} */
            name = "Chrome Mobile";
            /** @type {null} */
            version = null;
            if (/\bOS X\b/.test(os)) {
              /** @type {string} */
              manufacturer = "Apple";
              /** @type {string} */
              os = "iOS 4.3+";
            } else {
              /** @type {null} */
              os = null;
            }
          }
        }
        if (version && 0 == version.indexOf(data = /[\d.]+$/.exec(os)) && ua.indexOf("/" + data + "-") > -1) {
          os = trim(os.replace(data, ""));
        }
        if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(name) && layout[1]) && (data = layout[layout.length - 1])) {
          description.push(data);
        }
        if (description.length) {
          /** @type {!Array} */
          description = ["(" + description.join("; ") + ")"];
        }
        if (manufacturer && product && product.indexOf(manufacturer) < 0) {
          description.push("on " + manufacturer);
        }
        if (product) {
          description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
        }
        if (os) {
          /** @type {(Array<string>|null)} */
          data = / ([\d.+]+)$/.exec(os);
          /** @type {(boolean|null)} */
          isSpecialCasedOS = data && "/" == os.charAt(os.length - data[0].length - 1);
          os = {
            architecture : 32,
            family : data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
            version : data ? data[1] : null,
            toString : function() {
              var version = this.version;
              return this.family + (version && !isSpecialCasedOS ? " " + version : "") + (64 == this.architecture ? " 64-bit" : "");
            }
          };
        }
        if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
          if (os) {
            /** @type {number} */
            os.architecture = 64;
            os.family = os.family.replace(RegExp(" *" + data), "");
          }
          if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
            description.unshift("32-bit");
          }
        }
        if (!ua) {
          /** @type {null} */
          ua = null;
        }
        var platform = {};
        return platform.description = ua, platform.layout = layout && layout[0], platform.manufacturer = manufacturer, platform.name = name, platform.prerelease = prerelease, platform.product = product, platform.ua = ua, platform.version = name && version, platform.os = os || {
          architecture : null,
          family : null,
          version : null,
          toString : function() {
            return "null";
          }
        }, platform.parse = parse, platform.toString = toStringPlatform, platform.version && description.unshift(version), platform.name && description.unshift(name), os && name && (os != String(os).split(" ")[0] || os != name.split(" ")[0] && !product) && description.push(product ? "(" + os + ")" : "on " + os), description.length && (platform.description = description.join(" ")), platform;
      }
      var objectTypes = {
        "function" : true,
        object : true
      };
      var root = objectTypes[typeof window] && window || this;
      var oldRoot = root;
      var protocols = objectTypes[typeof exports] && exports;
      var exception = objectTypes[typeof module] && module && !module.nodeType && module;
      var self = protocols && exception && "object" == typeof val && val;
      if (!(!self || self.global !== self && self.window !== self && self.self !== self)) {
        root = self;
      }
      /** @type {number} */
      var _endIndex = Math.pow(2, 53) - 1;
      /** @type {!RegExp} */
      var reOpera = /\bOpera/;
      var thisBinding = this;
      var ObjProto = Object.prototype;
      /** @type {function(this:Object, *): boolean} */
      var hasOwnProperty = ObjProto.hasOwnProperty;
      /** @type {function(this:*): string} */
      var toString = ObjProto.toString;
      __WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return parse();
      }.call(exports, cb, exports, module);
      !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }).call(this);
  }).call(exports, cb(190)(e), function() {
    return this;
  }());
}, function(mixin, canCreateDiscussions, n) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  mixin.exports = function(obj) {
    return obj.webpackPolyfill || (obj.deprecate = function() {
    }, obj.paths = [], obj.children = [], obj.webpackPolyfill = 1), obj;
  };
}, function(mixin, canCreateDiscussions, __webpack_require__) {
  /** @type {string} */
  mixin.exports = __webpack_require__.p + "0801753d3de927a5b71656d122d37481.png";
}, function(mixin, canCreateDiscussions, __webpack_require__) {
  /** @type {string} */
  mixin.exports = __webpack_require__.p + "df21d1b0c082d8a3cce1c43b290614f9.png";
}, function(mixin, canCreateDiscussions, __webpack_require__) {
  /** @type {string} */
  mixin.exports = __webpack_require__.p + "ac97117b54df3c5e4e74faa23be43bbf.png";
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , , , , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _reactAddons = __webpack_require__(2);
  var _reactAddons2 = _interopRequireDefault(_reactAddons);
  var _PercentageSymbol = __webpack_require__(213);
  var _PercentageSymbol2 = _interopRequireDefault(_PercentageSymbol);
  var _link_list = __webpack_require__(217);
  var _link_list2 = _interopRequireDefault(_link_list);
  var _TrayPortal = __webpack_require__(233);
  var _TrayPortal2 = _interopRequireDefault(_TrayPortal);
  var _classlist = __webpack_require__(244);
  var _DateTimePickerHours2 = _interopRequireDefault(_classlist);
  var _htmlParser = __webpack_require__(248);
  var _HTMLParser = _interopRequireDefault(_htmlParser);
  var _AsTag = __webpack_require__(256);
  var _AsTag2 = _interopRequireDefault(_AsTag);
  var _omi = __webpack_require__(265);
  var _omi2 = _interopRequireDefault(_omi);
  var _AppDownload = __webpack_require__(205);
  var _DateTimePickerJs2 = _interopRequireDefault(_AppDownload);
  var _Bar = __webpack_require__(269);
  var _Bar2 = _interopRequireDefault(_Bar);
  var _toHyphenCase = __webpack_require__(274);
  var _partialsNav2 = _interopRequireDefault(_toHyphenCase);
  var _SearchUtility = __webpack_require__(279);
  var _OptionGroup2 = _interopRequireDefault(_SearchUtility);
  var _LiLink = __webpack_require__(283);
  var _LiLink2 = _interopRequireDefault(_LiLink);
  var _componentsAppRoot = __webpack_require__(292);
  var _componentsAppRoot2 = _interopRequireDefault(_componentsAppRoot);
  var _blLayerLoader = __webpack_require__(296);
  var _blLayerLoader2 = _interopRequireDefault(_blLayerLoader);
  var _normalizeDataUri = __webpack_require__(214);
  var _DocumentFragment = _interopRequireDefault(_normalizeDataUri);
  var LinkCreate = _reactAddons2["default"].createClass({
    displayName : "App",
    mixins : [_reactAddons2["default"].addons.PureRenderMixin],
    propTypes : {
      isMobile : _reactAddons2["default"].PropTypes.bool,
      isSafari : _reactAddons2["default"].PropTypes.bool,
      isIE : _reactAddons2["default"].PropTypes.bool
    },
    getDefaultProps : function() {
      return {
        isMobile : false,
        isSafari : false,
        isIE : false
      };
    },
    getInitialState : function() {
      return {
        modalOpen : null,
        loaded : false
      };
    },
    componentDidMount : function() {
      var self = this;
      _blLayerLoader2["default"].loadImages(_blLayerLoader2["default"].getDocumentBackgroundImageUrls(), function() {
        self.setState({
          loaded : true
        });
      });
      setTimeout(function() {
        self.setState({
          loaded : true
        });
      }, 1E3);
    },
    handleMobile : function(event) {
      event.preventDefault();
      this.setState({
        modalOpen : this.props.isMobile ? "mobile" : this.props.isSafari ? "safari" : this.props.isIE ? "ie" : null
      });
    },
    render : function() {
      var e = this.props.isMobile || this.props.isSafari || this.props.isIE ? this.handleMobile : null;
      return _reactAddons2["default"].createElement("div", {
        id : "wrap",
        className : _DocumentFragment["default"]({
          loaded : this.state.loaded,
          modal : this.state.modalOpen
        })
      }, _reactAddons2["default"].createElement(_HTMLParser["default"], {
        onMobile : e
      }), _reactAddons2["default"].createElement(_AsTag2["default"], null), _reactAddons2["default"].createElement(_DateTimePickerHours2["default"], null), _reactAddons2["default"].createElement(_partialsNav2["default"], null), _reactAddons2["default"].createElement(_DateTimePickerJs2["default"], null), _reactAddons2["default"].createElement(_omi2["default"], null), _reactAddons2["default"].createElement(_OptionGroup2["default"], null), _reactAddons2["default"].createElement(_LiLink2["default"],
      null), _reactAddons2["default"].createElement(_componentsAppRoot2["default"], null), _reactAddons2["default"].createElement(_Bar2["default"], null), _reactAddons2["default"].createElement(_TrayPortal2["default"], null), _reactAddons2["default"].createElement(_link_list2["default"], {
        onMobile : e
      }), _reactAddons2["default"].createElement(_PercentageSymbol2["default"], {
        modalOpen : this.state.modalOpen,
        onClose : this.setState.bind(this, {
          modalOpen : null
        })
      }));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(207);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionNoDownload",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "mobile",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "Always be connected to your friends"), _react2["default"].createElement("p", null, "Download the free mobile app to chat while on the go or summon your AFK friends by sending a push notification with an @mention."), _react2["default"].createElement("div", {
        className : "mobile"
      }, _react2["default"].createElement("div", {
        className : "icon android"
      }), _react2["default"].createElement("div", {
        className : "icon ios"
      })))), _react2["default"].createElement("div", {
        className : "image"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(module, canCreateDiscussions, factory) {
  module.exports = factory(5);
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _reactAddons = __webpack_require__(2);
  var _reactAddons2 = _interopRequireDefault(_reactAddons);
  var _blLayerLoader = __webpack_require__(214);
  var _blLayerLoader2 = _interopRequireDefault(_blLayerLoader);
  __webpack_require__(215);
  var LinkCreate = _reactAddons2["default"].createClass({
    displayName : "AppModal",
    mixins : [_reactAddons2["default"].addons.PureRenderMixin],
    getInitialState : function() {
      return {
        modalOpen : false,
        modalKey : null
      };
    },
    componentWillReceiveProps : function(nextProps) {
      this.setState({
        modalOpen : nextProps.modalOpen ? true : false,
        modalKey : nextProps.modalOpen ? nextProps.modalOpen : this.state.modalKey
      });
    },
    handleClick : function() {
      this.setState({
        modalOpen : false
      });
      if (this.props.onClose) {
        this.props.onClose();
      }
    },
    render : function() {
      var inner = void 0;
      var label = void 0;
      switch(this.state.modalKey) {
        case "mobile":
          inner = _reactAddons2["default"].createElement("span", null, "Mobile registration", _reactAddons2["default"].createElement("br", null), "coming soon!");
          /** @type {string} */
          label = "\n          We\u2019re putting the finishing touches on the ChatX iOS and Android apps.\n          In the meantime, go to your PC to start using ChatX right now!\n        ";
          break;
        case "safari":
          inner = _reactAddons2["default"].createElement("span", null, "Safari does not", _reactAddons2["default"].createElement("br", null), "support voice");
          label = _reactAddons2["default"].createElement("span", null, "You want to be able to talk to your team, right? Switch to Chrome, Firefox, Opera or ", _reactAddons2["default"].createElement("a", {
            href : "/apps"
          }, "download the ChatX Client"), "to start talking right now!");
          break;
        case "ie":
          inner = _reactAddons2["default"].createElement("span", null, "Internet Explorer does not", _reactAddons2["default"].createElement("br", null), "support voice");
          label = _reactAddons2["default"].createElement("span", null, "You want to be able to talk to your team, right? Switch to Chrome, Firefox, Opera or ", _reactAddons2["default"].createElement("a", {
            href : "/apps"
          }, "download the ChatX Client"), "to start talking right now!");
      }
      return _reactAddons2["default"].createElement("div", {
        id : "app-modal",
        className : _blLayerLoader2["default"]({
          open : this.state.modalOpen
        })
      }, _reactAddons2["default"].createElement("div", {
        className : "content"
      }, _reactAddons2["default"].createElement("div", {
        className : "header"
      }, inner), _reactAddons2["default"].createElement("p", null, label), _reactAddons2["default"].createElement("button", {
        onClick : this.handleClick
      }, "Got it!")));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(module, nextBuilder, n) {
  /**
   * @return {?}
   */
  function logger() {
    var data;
    /** @type {string} */
    var url = "";
    /** @type {number} */
    var i = 0;
    for (; i < arguments.length; i++) {
      if (data = arguments[i]) {
        if ("string" == typeof data || "number" == typeof data) {
          /** @type {string} */
          url = url + (" " + data);
        } else {
          if ("[object Array]" === Object.prototype.toString.call(data)) {
            /** @type {string} */
            url = url + (" " + logger.apply(null, data));
          } else {
            if ("object" == typeof data) {
              var i;
              for (i in data) {
                if (data.hasOwnProperty(i) && data[i]) {
                  /** @type {string} */
                  url = url + (" " + i);
                }
              }
            }
          }
        }
      }
    }
    return url.substr(1);
  }
  var searchPipeline;
  var CreditCardList;
  if ("undefined" != typeof module && module.exports) {
    /** @type {function(): ?} */
    module.exports = logger;
  }
  /** @type {!Array} */
  searchPipeline = [];
  CreditCardList = function() {
    return logger;
  }.apply(nextBuilder, searchPipeline);
  !(void 0 !== CreditCardList && (module.exports = CreditCardList));
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  var _PercentageSymbol = __webpack_require__(218);
  var _PercentageSymbol2 = _interopRequireDefault(_PercentageSymbol);
  __webpack_require__(226);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionEnd",
    render : function() {
      return _react2["default"].createElement("footer", {
        id : "end",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h3", null, "ChatX, available everywhere you are"), _react2["default"].createElement(_PercentageSymbol2["default"], {
        flavorText : _react2["default"].createElement("span", null, "still, just", _react2["default"].createElement("br", null), "a username!"),
        onMobile : this.props.onMobile
      }), _react2["default"].createElement("div", {
        className : "apps"
      })), _react2["default"].createElement("nav", {
        className : "nav"
      }, _react2["default"].createElement("a", {
        className : "branding",
        href : "#"
      }, "ChatX \u00a9 2015 All Rights Reserved"), _react2["default"].createElement("div", {
        className : "spacer"
      }), _react2["default"].createElement("ul", {
        className : "links"
      }, _react2["default"].createElement("li", {
        className : "item"
      }, _react2["default"].createElement("a", {
        href : "https://support.ChatXapp.com",
        target : "_blank"
      }, "Help")), _react2["default"].createElement("li", {
        className : "item"
      }, _react2["default"].createElement("a", {
        href : "http://blog.ChatXapp.com/",
        target : "_blank"
      }, "Blog")), _react2["default"].createElement("li", {
        className : "item"
      }, _react2["default"].createElement("a", {
        href : "https://ChatXapp.com/download",
        target : "_blank"
      }, "Download")), _react2["default"].createElement("li", {
        className : "item"
      }, _react2["default"].createElement("a", {
        href : "https://ChatXapp.com/privacy/",
        target : "_blank"
      }, "Privacy")), _react2["default"].createElement("li", {
        className : "item"
      }, _react2["default"].createElement("a", {
        href : "https://ChatXapp.com/tos",
        target : "_blank"
      }, "Terms Of Service")), _react2["default"].createElement("li", {
        className : "network twitter"
      }, _react2["default"].createElement("a", {
        href : "https://twitter.com/bads_tm",
        target : "_blank"
      }, "bads.tm twitter")), _react2["default"].createElement("li", {
        className : "network twitter"
      }, _react2["default"].createElement("a", {
        href : "http://twitter.com/ChatXapp",
        target : "_blank"
      }, "ChatX twitter"))))));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
  (function(Utils) {
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default" : obj
      };
    }
    /**
     * @return {undefined}
     */
    function search() {
      /** @type {string} */
      window.location = location.protocol + "/channels/@me";
    }
    Object.defineProperty(exports, "__esModule", {
      value : true
    });
    var _reactAddons = __webpack_require__(2);
    var _reactAddons2 = _interopRequireDefault(_reactAddons);
    var _uid = __webpack_require__(169);
    var _uid2 = _interopRequireDefault(_uid);
    var _PercentageSymbol = __webpack_require__(220);
    var _PercentageSymbol2 = _interopRequireDefault(_PercentageSymbol);
    var _UiIcon = __webpack_require__(171);
    var _UiIcon2 = _interopRequireDefault(_UiIcon);
    var _prepareStyleProperties = __webpack_require__(214);
    var _documentAnchorElement = (_interopRequireDefault(_prepareStyleProperties), __webpack_require__(176));
    var _AnchorElement = _interopRequireDefault(_documentAnchorElement);
    var self = __webpack_require__(187);
    var closeExpr = _uid2["default"].get("token");
    var LinkCreate = _reactAddons2["default"].createClass({
      displayName : "FieldButtonApp",
      mixins : [_reactAddons2["default"].addons.PureRenderMixin],
      propTypes : {
        flavorText : _reactAddons2["default"].PropTypes.object,
        onMobile : _reactAddons2["default"].PropTypes.func
      },
      getInitialState : function() {
        return {
          registerOpen : false,
          registering : false,
          registrationErrors : {}
        };
      },
      handleSubmit : function(event) {
        var e = event.e;
        var id = event.value;
        return (this.props.onMobile || !this.state.registerOpen) && _UiIcon2["default"].track("Click Landing CTA", {
          Variant : "a"
        }), this.props.onMobile ? void this.props.onMobile(e) : closeExpr ? void search() : void(this.state.registerOpen ? (this.register(id), this.setState({
          registering : true
        })) : this.setState({
          registerOpen : true
        }));
      },
      render : function() {
        var symbols = this.state.registrationErrors;
        /**
         * @param {string} n
         * @return {?}
         */
        var isUndefined = function(n) {
          return null != symbols[n];
        };
        /**
         * @param {string} n
         * @return {?}
         */
        var get = function(n) {
          return isUndefined(n) ? symbols[n] : null;
        };
        /** @type {string} */
        var buttonText = closeExpr ? "Open ChatX" : "Try ChatX now, it's free";
        var closingExpr = closeExpr ? null : isUndefined("username") ? get("username") : this.props.flavorText;
        var result = {
          errors : get("username"),
          open : this.state.registerOpen,
          loading : this.state.registering
        };
        return _reactAddons2["default"].createElement(_PercentageSymbol2["default"], {
          buttonText : buttonText,
          flavorText : closingExpr,
          state : result,
          onSubmit : this.handleSubmit
        });
      },
      register : function(identity) {
        var boilerStateMachine = this;
        try {
          if (window.goog_report_conversion) {
            goog_report_conversion();
          }
          twttr.conversion.trackPid("l6b76", {
            tw_sale_amount : 0,
            tw_order_quantity : 0
          });
        } catch (logValues) {
          console.error(logValues);
        }
        _AnchorElement["default"].post(self.Endpoints.REGISTER).send({
          fingerprint : _uid2["default"].get("fingerprint"),
          username : identity
        }).end(function(result) {
          if (result.ok) {
            _uid2["default"].set("token", result.body.token);
            Utils.nextTick(search);
          } else {
            boilerStateMachine.setState({
              registering : false,
              registrationErrors : result.body
            });
          }
        });
      }
    });
    exports["default"] = LinkCreate;
    module.exports = exports["default"];
  }).call(exports, __webpack_require__(219));
}, function(mixin, canCreateDiscussions, n) {
  /**
   * @return {undefined}
   */
  function r() {
    /** @type {boolean} */
    c = false;
    if (result.length) {
      items = result.concat(items);
    } else {
      /** @type {number} */
      i = -1;
    }
    if (items.length) {
      remove();
    }
  }
  /**
   * @return {undefined}
   */
  function remove() {
    if (!c) {
      /** @type {number} */
      var autoResumeTimer = setTimeout(r);
      /** @type {boolean} */
      c = true;
      var l = items.length;
      for (; l;) {
        result = items;
        /** @type {!Array} */
        items = [];
        for (; ++i < l;) {
          result[i].run();
        }
        /** @type {number} */
        i = -1;
        /** @type {number} */
        l = items.length;
      }
      /** @type {null} */
      result = null;
      /** @type {boolean} */
      c = false;
      clearTimeout(autoResumeTimer);
    }
  }
  /**
   * @param {(Object|string)} fun
   * @param {!Array} array
   * @return {undefined}
   */
  function Item(fun, array) {
    /** @type {(Object|string)} */
    this.fun = fun;
    /** @type {!Array} */
    this.array = array;
  }
  /**
   * @return {undefined}
   */
  function noop() {
  }
  var result;
  var process = mixin.exports = {};
  /** @type {!Array} */
  var items = [];
  /** @type {boolean} */
  var c = false;
  /** @type {number} */
  var i = -1;
  /**
   * @param {!Function} opts
   * @return {undefined}
   */
  process.nextTick = function(opts) {
    /** @type {!Array} */
    var value = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      /** @type {number} */
      var i = 1;
      for (; i < arguments.length; i++) {
        value[i - 1] = arguments[i];
      }
    }
    items.push(new Item(opts, value));
    if (!(1 !== items.length || c)) {
      setTimeout(remove, 0);
    }
  };
  /**
   * @return {undefined}
   */
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  /** @type {string} */
  process.title = "browser";
  /** @type {boolean} */
  process.browser = true;
  process.env = {};
  /** @type {!Array} */
  process.argv = [];
  /** @type {string} */
  process.version = "";
  process.versions = {};
  /** @type {function(): undefined} */
  process.on = noop;
  /** @type {function(): undefined} */
  process.addListener = noop;
  /** @type {function(): undefined} */
  process.once = noop;
  /** @type {function(): undefined} */
  process.off = noop;
  /** @type {function(): undefined} */
  process.removeListener = noop;
  /** @type {function(): undefined} */
  process.removeAllListeners = noop;
  /** @type {function(): undefined} */
  process.emit = noop;
  /**
   * @param {?} name
   * @return {?}
   */
  process.binding = function(name) {
    throw new Error("process.binding is not supported");
  };
  /**
   * @return {?}
   */
  process.cwd = function() {
    return "/";
  };
  /**
   * @param {?} dir
   * @return {?}
   */
  process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
  };
  /**
   * @return {?}
   */
  process.umask = function() {
    return 0;
  };
}, function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _reactAddons = __webpack_require__(2);
  var _reactAddons2 = _interopRequireDefault(_reactAddons);
  var _prepareStyleProperties = __webpack_require__(214);
  var _prepareStyleProperties2 = _interopRequireDefault(_prepareStyleProperties);
  __webpack_require__(221);
  var LinkCreate = _reactAddons2["default"].createClass({
    displayName : "FieldButton",
    mixins : [_reactAddons2["default"].addons.PureRenderMixin],
    handleSubmit : function(event) {
      event.preventDefault();
      var t = this.refs.username.getDOMNode();
      if (this.props.onSubmit) {
        this.props.onSubmit({
          e : event,
          value : t.value
        });
      }
      window.requestAnimationFrame(function() {
        return t.focus();
      });
    },
    render : function() {
      /** @type {null} */
      var errorNode = null;
      return this.props.flavorText && (errorNode = _reactAddons2["default"].createElement("span", {
        className : _prepareStyleProperties2["default"]("arrow", {
          errors : this.props.state.errors
        })
      }, this.props.state.errors ? this.props.state.errors : this.props.flavorText)), _reactAddons2["default"].createElement("form", {
        className : _prepareStyleProperties2["default"]("field-button", {
          open : this.props.state.open
        }),
        onSubmit : this.handleSubmit
      }, _reactAddons2["default"].createElement("input", {
        ref : "username",
        type : "text",
        className : "field",
        placeholder : "enter a username",
        autofocus : true
      }), _reactAddons2["default"].createElement("button", {
        className : _prepareStyleProperties2["default"]("button", {
          registering : this.props.state.loading
        })
      }, _reactAddons2["default"].createElement("div", {
        className : "loader"
      }), _reactAddons2["default"].createElement("span", {
        className : "wrap"
      }, this.props.buttonText)), errorNode);
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(234);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionFeatures",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "features",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("h2", null, "Much More Coming Soon"), _react2["default"].createElement("p", null, "We're a bunch of gamers who are sick and tired of using creaky old software to keep in touch with our gaming friends.  So, we've set out on a mission to bring these antiquated apps into the 21st century.  ChatX is brand new - and there's so much more to come."), _react2["default"].createElement("p", {
        className : "bold"
      }, "Check out some of the cool features we have planned for ChatX in the coming months:"), _react2["default"].createElement("ul", null, _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon overlays"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "In-Game Overlays")), _react2["default"].createElement("div", {
        className : "description"
      }, "See who's talking, adjust voice controls, receive and respond to ChatX text messages; all without leaving the game.")), _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon integrations"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "Game Integrations")), _react2["default"].createElement("div", {
        className : "description"
      }, "Connect your game account to ChatX, sync your guild roster, etc.")), _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon api"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "ChatX API")), _react2["default"].createElement("div", {
        className : "description"
      }, "Truly make ChatX your own.  Create your own plug-ins for ChatX using our API.")), _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon bots"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "Bots")), _react2["default"].createElement("div", {
        className : "description"
      }, "Set up bots to auto-post content in channels from Twitter, database sites, etc.")), _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon commands"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "Slash Commands")), _react2["default"].createElement("div", {
        className : "description"
      }, "Easily post game results, dps meters, and more in your text channels with simple commands.")), _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon two-factor-auth"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "Two Factor Auth")), _react2["default"].createElement("div", {
        className : "description"
      }, "An optional added layout of account security that requires authentication on your phone.")), _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon voice-calls"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "1:1 Voice Calls")), _react2["default"].createElement("div", {
        className : "description"
      }, "Directly call other ChatX users without setting up or joining a channel.")), _react2["default"].createElement("li", {
        className : "feature"
      }, _react2["default"].createElement("div", {
        className : "header"
      }, _react2["default"].createElement("div", {
        className : "icon theme-packs"
      }), _react2["default"].createElement("div", {
        className : "text"
      }, "Premium Theme Packs")), _react2["default"].createElement("div", {
        className : "description"
      }, "Customize ChatX with premium bling like skins, sticker packs, and sound packs.")))));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , , , , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(245);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionGroups",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "groups",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "Never pay for voice chat again"), _react2["default"].createElement("p", null, "ChatX is always completely free to use with no gotchas. This means you can make as many servers as you want with no slot limitations."), _react2["default"].createElement("p", null, "Wondering how we\u2019ll make money? In the future there will be optional cosmetics like themes, sticker packs, and sound packs available for purchase. We\u2019ll never charge for ChatX\u2019s core functionality."))),
      _react2["default"].createElement("div", {
        className : "image"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  var _uid = __webpack_require__(169);
  var _uid2 = _interopRequireDefault(_uid);
  var _PercentageSymbol = __webpack_require__(218);
  var _PercentageSymbol2 = _interopRequireDefault(_PercentageSymbol);
  var _normalizeDataUri = __webpack_require__(214);
  var _normalizeDataUri2 = _interopRequireDefault(_normalizeDataUri);
  __webpack_require__(249);
  /** @type {boolean} */
  var isAurora = null != _uid2["default"].get("token");
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionHero",
    render : function() {
      return _react2["default"].createElement("header", {
        id : "hero",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "copy"
      }, _react2["default"].createElement("nav", {
        className : "nav"
      }, _react2["default"].createElement("a", {
        className : "branding",
        href : "#"
      }), _react2["default"].createElement("div", {
        className : "spacer"
      }), _react2["default"].createElement("ul", {
        className : "social"
      }, _react2["default"].createElement("li", {
        className : _normalizeDataUri2["default"]("login", {
          hidden : isAurora
        })
      }, _react2["default"].createElement("a", {
        href : "/login",
        onClick : this.props.onMobile
      }, "Login")), _react2["default"].createElement("li", {
        className : "network twitter"
      }, _react2["default"].createElement("a", {
        href : "http://twitter.com/bads_tm",
        target : "_blank"
      }, "bads.tm twitter")), _react2["default"].createElement("li", {
        className : "network twitter"
      }, _react2["default"].createElement("a", {
        href : "http://twitter.com/ChatXapp",
        target : "_blank"
      }, "ChatX Twitter")))), _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h1", null, "Looking to chat online? ChatX is for you!"), _react2["default"].createElement("p", null, "Experience ChatX as it was in 2015, 2016, 2017... Everything goes to ChatX, we don't intercept any sort of data, we only host some stuff copied from web archive"), _react2["default"].createElement("p", null, "This is a Litecord instance hosted and owned by Troplo"), _react2["default"].createElement("p", null, "The All-in-one voice and text chat for gamers that\u2019s free, secure, and works on both your desktop and phone. Stop paying for TeamSpeak servers and hassling with Skype. Simplify your life."), _react2["default"].createElement("p", null, "You'll never go back."), _react2["default"].createElement(_PercentageSymbol2["default"], {
        flavorText : _react2["default"].createElement("span", null, "no download", _react2["default"].createElement("br", null), "required"),
        onMobile : this.props.onMobile
      }))), _react2["default"].createElement("div", {
        className : "art"
      }, _react2["default"].createElement("div", {
        className : "item desktop"
      }), _react2["default"].createElement("div", {
        className : "item phone-ios"
      }), _react2["default"].createElement("div", {
        className : "item phone-android"
      }))));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(257);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionComparisons",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "comparisons",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("h2", null, "See How ChatX Stacks Up"), _react2["default"].createElement("div", {
        className : "grid"
      }, _react2["default"].createElement("div", {
        className : "grid-col labels"
      }, _react2["default"].createElement("div", {
        className : "grid-row product"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "100% Free Communication"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "IP Protection"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "DDoS Protection"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Browser Support"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Mobile App"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "In-game Overlay"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Codec"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Low Latency"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Minimal CPU Usage"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Custom Hot Keys"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Push Notifications"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Permissions"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Multiple Channels"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Rich Text Chat"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Individual Volume Control"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Direct Messaging")), _react2["default"].createElement("div", {
        className : "grid-col active"
      }, _react2["default"].createElement("div", {
        className : "grid-row product ChatX"
      }, "ChatX"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "100% Free Communication"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "IP Protection"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "DDoS Protection"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Browser Support"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Mobile App"), _react2["default"].createElement("div", {
        className : "text"
      }, "Free")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "In-game Overlay"), _react2["default"].createElement("div", {
        className : "text"
      }, "Coming Really Soon!")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Codec"), _react2["default"].createElement("div", {
        className : "text"
      }, "Opus")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Low Latency"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Minimal CPU Usage"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Custom Hot Keys"), _react2["default"].createElement("div", {
        className : "text"
      }, "Coming Really Soon!")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Push Notifications"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Permissions"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Multiple Channels"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Rich Text Chat"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Individual Volume Control"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "mobile"
      }, "Direct Messaging"), _react2["default"].createElement("div", {
        className : "has true"
      }, "\u2713"))), _react2["default"].createElement("div", {
        className : "grid-col curse"
      }, _react2["default"].createElement("div", {
        className : "grid-row product curse"
      }, "Curse Voice"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Opus"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713"))), _react2["default"].createElement("div", {
        className : "grid-col teamspeak"
      }, _react2["default"].createElement("div", {
        className : "grid-row product teamspeak"
      }, "Teamspeak"), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Paid"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "CELT, Speex, Opus"), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713"))), _react2["default"].createElement("div", {
        className : "grid-col skype"
      }, _react2["default"].createElement("div", {
        className : "grid-row product skype"
      }, "Skype"), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "Free"), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, "SILK"), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713")), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }), _react2["default"].createElement("div", {
        className : "grid-row"
      }, _react2["default"].createElement("div", {
        className : "has false"
      }, "\u2713"))))));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(266);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionInvitations",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "chat",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "Text chat designed for the 21st century"), _react2["default"].createElement("p", null, "Easily share images, videos, and links from your desktop or phone.  ChatX embeds most types of media directly in the chat."), _react2["default"].createElement("p", null, "GIFs only play when you mouse over them, so your CPU is spared.  Post those GIFs.  Oh yeah!"))), _react2["default"].createElement("div", {
        className : "image"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(270);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionVoice",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "voice",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "Voice quality so clear you can hear a pin drop"), _react2["default"].createElement("p", null, "ChatX is built with the latest tech using a modern jitter buffer, automatic gain control, noise suppression, echo cancellation, system attenuation on Windows and more."), _react2["default"].createElement("p", null, "You'll love it and it works everywhere: desktop apps, browser apps, and soon phones."))), _react2["default"].createElement("div", {
        className : "image bot"
      }), _react2["default"].createElement("div", {
        className : "image channels"
      }), _react2["default"].createElement("div", {
        className : "image overlay"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(275);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionInvitations",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "secure",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "Play online with peace of mind"), _react2["default"].createElement("p", null, "Encrypted server to client communication keeps your IP address safe.  Stop getting ganked because you're logged into Skype."), _react2["default"].createElement("p", null, "Our resilient Erlang backend running on the cloud has built in DDoS protection with automatic server failover."))), _react2["default"].createElement("div", {
        className : "chips"
      }), _react2["default"].createElement("div", {
        className : "image"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(280);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionGroups",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "performance",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "Voice chat that doesn't slow down your game"), _react2["default"].createElement("p", null, "Designed for use while gaming, ChatX has minimal impact on your CPU.  Your game's performance won't be affected in the slightest.  Seriously.  It's time to ditch CPU hogs like Skype."))), _react2["default"].createElement("div", {
        className : "image"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(284);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionInvitations",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "setup",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "The easiest setup you've ever seen"), _react2["default"].createElement("p", null, "It takes just 10 seconds and doesn\u2019t require any drivers or weird setting configuration. ChatX can even run in the browser which is great for PUGs you invite to your voice channel or those stubborn friends of yours."), _react2["default"].createElement("p", null, "You can download the Windows or OSX app for maximum performance."), _react2["default"].createElement("div",
      {
        className : "mobile"
      }, _react2["default"].createElement("div", {
        className : "icon windows"
      }), _react2["default"].createElement("div", {
        className : "icon osx"
      }), _react2["default"].createElement("div", {
        className : "icon firefox"
      }), _react2["default"].createElement("div", {
        className : "icon chrome"
      }), _react2["default"].createElement("div", {
        className : "icon opera"
      })))), _react2["default"].createElement("div", {
        className : "image"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , , , , , , function(module, exports, __webpack_require__) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _react = __webpack_require__(206);
  var _react2 = _interopRequireDefault(_react);
  __webpack_require__(293);
  var LinkCreate = _react2["default"].createClass({
    displayName : "SectionGroups",
    render : function() {
      return _react2["default"].createElement("section", {
        id : "permissions",
        className : "section"
      }, _react2["default"].createElement("div", {
        className : "content"
      }, _react2["default"].createElement("div", {
        className : "hook-wrap"
      }, _react2["default"].createElement("div", {
        className : "hook"
      }, _react2["default"].createElement("h2", null, "Managing your server is easy, but powerful"), _react2["default"].createElement("p", null, "Robust permissions and multiple channels, all within an easy-to-use UI, make ChatX perfect for both small groups or large guilds."), _react2["default"].createElement("p", null, "Finally, the power you\u2019ve come to expect from TeamSpeak, Vent, and Mumble in a package that isn\u2019t ridiculously complicated."))), _react2["default"].createElement("div",
      {
        className : "image"
      })));
    }
  });
  exports["default"] = LinkCreate;
  module.exports = exports["default"];
}, function(canCreateDiscussions, isSlidingUp, n) {
}, , , function(module, exports, saveNotifs) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default" : obj
    };
  }
  /**
   * @param {string} x
   * @param {!Function} cb
   * @return {undefined}
   */
  function loadImage(x, cb) {
    /** @type {!Image} */
    var n = new Image;
    /**
     * @return {?}
     */
    n.onload = function() {
      return cb(true, x);
    };
    /**
     * @return {?}
     */
    n.onerror = function() {
      return cb(false, x);
    };
    /** @type {string} */
    n.src = x;
  }
  /**
   * @param {!Array} selector
   * @param {!Function} callback
   * @return {undefined}
   */
  function remove(selector, callback) {
    var _this = this;
    /** @type {!Array} */
    var r = [];
    selector.forEach(function(i) {
      return r.push(new _DocumentFragment["default"](function(saveNotifs) {
        _this.loadImage(i, function(notifications) {
          return saveNotifs(notifications);
        });
      }));
    });
    _DocumentFragment["default"].all(r).then(function() {
      return callback();
    });
  }
  /**
   * @return {?}
   */
  function a() {
    /**
     * @param {!Node} elem
     * @param {string} property
     * @return {?}
     */
    document.deepCss = function(elem, property) {
      if (!elem || !elem.style) {
        return "";
      }
      var name = property.replace(/\-([a-z])/g, function(canCreateDiscussions, shortMonthName) {
        return shortMonthName.toUpperCase();
      });
      if (elem.currentStyle) {
        return elem.style[name] || elem.currentStyle[name] || "";
      }
      /** @type {!Window} */
      var defaultView = document.defaultView || window;
      return elem.style[name] || defaultView.getComputedStyle(elem, "").getPropertyValue(property) || "";
    };
    /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
    Array.prototype.indexOf = Array.prototype.indexOf || function(name, x) {
      /** @type {number} */
      x = x || 0;
      for (; x < this.length;) {
        if (this[x] === name) {
          return x;
        }
        ++x;
      }
      return -1;
    };
    var s = void 0;
    /** @type {!Array} */
    var a = [];
    /** @type {!NodeList<Element>} */
    var value = document.getElementsByTagName("*");
    /** @type {!Array<?>} */
    value = a.slice.call(value, 0, value.length);
    for (; value.length;) {
      s = document.deepCss(value.shift(), "background-image");
      if (s) {
        /** @type {!Array} */
        s = /url\(['"]?([^")]+)/.exec(s) || [];
      }
      s = s[1];
      if (s && -1 == a.indexOf(s)) {
        a[a.length] = s;
      }
    }
    return a;
  }
  Object.defineProperty(exports, "__esModule", {
    value : true
  });
  var _documentDocumentFragment = saveNotifs(297);
  var _DocumentFragment = _interopRequireDefault(_documentDocumentFragment);
  exports["default"] = {
    loadImage : loadImage,
    loadImages : remove,
    getDocumentBackgroundImageUrls : a
  };
  module.exports = exports["default"];
}, function(module, canCreateDiscussions, factory) {
  module.exports = factory(298);
  factory(301);
  factory(302);
  factory(303);
}, function(module, canCreateDiscussions, rangeFinder) {
  /**
   * @param {!Object} o
   * @return {undefined}
   */
  function test(o) {
    /**
     * @param {?} deferred
     * @return {?}
     */
    function handle(deferred) {
      return null === state ? void deferreds.push(deferred) : void end(function() {
        var cb = state ? deferred.onFulfilled : deferred.onRejected;
        if (null === cb) {
          return void(state ? deferred.resolve : deferred.reject)(value);
        }
        var ret;
        try {
          ret = cb(value);
        } catch (counter) {
          return void deferred.reject(counter);
        }
        deferred.resolve(ret);
      });
    }
    /**
     * @param {!Object} c
     * @return {?}
     */
    function q(c) {
      try {
        if (c === f) {
          throw new TypeError("A promise cannot be resolved with itself.");
        }
        if (c && ("object" == typeof c || "function" == typeof c)) {
          var h = c.then;
          if ("function" == typeof h) {
            return void i(h.bind(c), q, d);
          }
        }
        /** @type {boolean} */
        state = true;
        /** @type {!Object} */
        value = c;
        isArray();
      } catch (drums) {
        d(drums);
      }
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    function d(name) {
      /** @type {boolean} */
      state = false;
      /** @type {string} */
      value = name;
      isArray();
    }
    /**
     * @return {undefined}
     */
    function isArray() {
      /** @type {number} */
      var i = 0;
      var len = deferreds.length;
      for (; len > i; i++) {
        handle(deferreds[i]);
      }
      /** @type {null} */
      deferreds = null;
    }
    if ("object" != typeof this) {
      throw new TypeError("Promises must be constructed via new");
    }
    if ("function" != typeof o) {
      throw new TypeError("not a function");
    }
    /** @type {null} */
    var state = null;
    /** @type {null} */
    var value = null;
    /** @type {!Array} */
    var deferreds = [];
    var f = this;
    /**
     * @param {!Function} onFulfilled
     * @param {!Function} onRejected
     * @return {?}
     */
    this.then = function(onFulfilled, onRejected) {
      return new f.constructor(function(resolve, reject) {
        handle(new Handler(onFulfilled, onRejected, resolve, reject));
      });
    };
    i(o, q, d);
  }
  /**
   * @param {!Function} a
   * @param {!Function} fn
   * @param {!Function} resolve
   * @param {!Function} reject
   * @return {undefined}
   */
  function Handler(a, fn, resolve, reject) {
    /** @type {(!Function|null)} */
    this.onFulfilled = "function" == typeof a ? a : null;
    /** @type {(!Function|null)} */
    this.onRejected = "function" == typeof fn ? fn : null;
    /** @type {!Function} */
    this.resolve = resolve;
    /** @type {!Function} */
    this.reject = reject;
  }
  /**
   * @param {!Object} a
   * @param {!Function} b
   * @param {!Function} n
   * @return {undefined}
   */
  function i(a, b, n) {
    /** @type {boolean} */
    var r = false;
    try {
      a(function(applyBackgroundUpdates) {
        if (!r) {
          /** @type {boolean} */
          r = true;
          b(applyBackgroundUpdates);
        }
      }, function(appid) {
        if (!r) {
          /** @type {boolean} */
          r = true;
          n(appid);
        }
      });
    } catch (ERR_INVALID_AUTH) {
      if (r) {
        return;
      }
      /** @type {boolean} */
      r = true;
      n(ERR_INVALID_AUTH);
    }
  }
  var end = rangeFinder(299);
  /** @type {function(!Object): undefined} */
  module.exports = test;
}, function(module, gen34_options, __webpack_require__) {
  (function(process, setImmediate) {
    /**
     * @return {undefined}
     */
    function flush() {
      for (; head.next;) {
        head = head.next;
        var task = head.task;
        head.task = void 0;
        var domain = head.domain;
        if (domain) {
          head.domain = void 0;
          domain.enter();
        }
        try {
          task();
        } catch (n) {
          if (isNodeJS) {
            throw domain && domain.exit(), setTimeout(flush, 0), domain && domain.enter(), n;
          }
          setTimeout(function() {
            throw n;
          }, 0);
        }
        if (domain) {
          domain.exit();
        }
      }
      /** @type {boolean} */
      s = false;
    }
    /**
     * @param {!Object} fn
     * @return {undefined}
     */
    function asap(fn) {
      tail = tail.next = {
        task : fn,
        domain : isNodeJS && process.domain,
        next : null
      };
      if (!s) {
        /** @type {boolean} */
        s = true;
        requestFlush();
      }
    }
    var head = {
      task : void 0,
      next : null
    };
    var tail = head;
    /** @type {boolean} */
    var s = false;
    var requestFlush = void 0;
    /** @type {boolean} */
    var isNodeJS = false;
    if ("undefined" != typeof process && process.nextTick) {
      /** @type {boolean} */
      isNodeJS = true;
      /**
       * @return {undefined}
       */
      requestFlush = function() {
        process.nextTick(flush);
      };
    } else {
      if ("function" == typeof setImmediate) {
        /** @type {!Function} */
        requestFlush = "undefined" != typeof window ? setImmediate.bind(window, flush) : function() {
          setImmediate(flush);
        };
      } else {
        if ("undefined" != typeof MessageChannel) {
          /** @type {!MessageChannel} */
          var channel = new MessageChannel;
          /** @type {function(): undefined} */
          channel.port1.onmessage = flush;
          /**
           * @return {undefined}
           */
          requestFlush = function() {
            channel.port2.postMessage(0);
          };
        } else {
          /**
           * @return {undefined}
           */
          requestFlush = function() {
            setTimeout(flush, 0);
          };
        }
      }
    }
    /** @type {function(!Object): undefined} */
    module.exports = asap;
  }).call(gen34_options, __webpack_require__(219), __webpack_require__(300).setImmediate);
}, function(canCreateDiscussions, exports, __webpack_require__) {
  (function(setImmediate, fn) {
    /**
     * @param {string} id
     * @param {!Function} clearFn
     * @return {undefined}
     */
    function Timeout(id, clearFn) {
      /** @type {string} */
      this._id = id;
      /** @type {!Function} */
      this._clearFn = clearFn;
    }
    var nextTick = __webpack_require__(219).nextTick;
    /** @type {function(this:!Function, ...*): *} */
    var apply = Function.prototype.apply;
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = Array.prototype.slice;
    var default_titles = {};
    /** @type {number} */
    var nextCallbackId = 0;
    /**
     * @return {?}
     */
    exports.setTimeout = function() {
      return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
    };
    /**
     * @return {?}
     */
    exports.setInterval = function() {
      return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
    };
    /** @type {function(!Object): undefined} */
    exports.clearTimeout = exports.clearInterval = function(n) {
      n.close();
    };
    /** @type {function(): undefined} */
    Timeout.prototype.unref = Timeout.prototype.ref = function() {
    };
    /**
     * @return {undefined}
     */
    Timeout.prototype.close = function() {
      this._clearFn.call(window, this._id);
    };
    /**
     * @param {?} item
     * @param {number} msecs
     * @return {undefined}
     */
    exports.enroll = function(item, msecs) {
      clearTimeout(item._idleTimeoutId);
      /** @type {number} */
      item._idleTimeout = msecs;
    };
    /**
     * @param {?} item
     * @return {undefined}
     */
    exports.unenroll = function(item) {
      clearTimeout(item._idleTimeoutId);
      /** @type {number} */
      item._idleTimeout = -1;
    };
    /** @type {function(!Object): undefined} */
    exports._unrefActive = exports.active = function(item) {
      clearTimeout(item._idleTimeoutId);
      var msecs = item._idleTimeout;
      if (msecs >= 0) {
        /** @type {number} */
        item._idleTimeoutId = setTimeout(function() {
          if (item._onTimeout) {
            item._onTimeout();
          }
        }, msecs);
      }
    };
    /** @type {!Function} */
    exports.setImmediate = "function" == typeof setImmediate ? setImmediate : function(_makeTestFunc) {
      /** @type {number} */
      var id = nextCallbackId++;
      /** @type {(Array<?>|boolean)} */
      var _test = arguments.length < 2 ? false : slice.call(arguments, 1);
      return default_titles[id] = true, nextTick(function() {
        if (default_titles[id]) {
          if (_test) {
            _makeTestFunc.apply(null, _test);
          } else {
            _makeTestFunc.call(null);
          }
          exports.clearImmediate(id);
        }
      }), id;
    };
    /** @type {!Function} */
    exports.clearImmediate = "function" == typeof fn ? fn : function(id) {
      delete default_titles[id];
    };
  }).call(exports, __webpack_require__(300).setImmediate, __webpack_require__(300).clearImmediate);
}, function(mixin, canCreateDiscussions, n) {
  var m = n(298);
  var end = n(299);
  mixin.exports = m;
  /**
   * @param {?} versions
   * @param {?} currentVersionBeforeTransaction
   * @return {undefined}
   */
  m.prototype.done = function(versions, currentVersionBeforeTransaction) {
    var loadPropPromise = arguments.length ? this.then.apply(this, arguments) : this;
    loadPropPromise.then(null, function(canCreateDiscussions) {
      end(function() {
        throw canCreateDiscussions;
      });
    });
  };
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {?} value
   * @return {undefined}
   */
  function ValuePromise(value) {
    /**
     * @param {!Function} callback
     * @return {?}
     */
    this.then = function(callback) {
      return "function" != typeof callback ? this : new Promise(function(ref, saveNotifs) {
        asap(function() {
          try {
            ref(callback(value));
          } catch (notifications) {
            saveNotifs(notifications);
          }
        });
      });
    };
  }
  var Promise = require(298);
  var asap = require(299);
  module.exports = Promise;
  ValuePromise.prototype = Promise.prototype;
  var ZERO = new ValuePromise(true);
  var FALSE = new ValuePromise(false);
  var UNDEFINED = new ValuePromise(null);
  var NULL = new ValuePromise(void 0);
  var TRUE = new ValuePromise(0);
  var EMPTYSTRING = new ValuePromise("");
  /**
   * @param {?} value
   * @return {?}
   */
  Promise.resolve = function(value) {
    if (value instanceof Promise) {
      return value;
    }
    if (null === value) {
      return UNDEFINED;
    }
    if (void 0 === value) {
      return NULL;
    }
    if (value === true) {
      return ZERO;
    }
    if (value === false) {
      return FALSE;
    }
    if (0 === value) {
      return TRUE;
    }
    if ("" === value) {
      return EMPTYSTRING;
    }
    if ("object" == typeof value || "function" == typeof value) {
      try {
        var then = value.then;
        if ("function" == typeof then) {
          return new Promise(then.bind(value));
        }
      } catch (formatedList) {
        return new Promise(function(canCreateDiscussions, resolve) {
          resolve(formatedList);
        });
      }
    }
    return new ValuePromise(value);
  };
  /**
   * @param {!Array} body
   * @return {?}
   */
  Promise.all = function(body) {
    /** @type {!Array<?>} */
    var args = Array.prototype.slice.call(body);
    return new Promise(function(resolve, reject) {
      /**
       * @param {number} i
       * @param {!Object} val
       * @return {?}
       */
      function res(i, val) {
        try {
          if (val && ("object" == typeof val || "function" == typeof val)) {
            var then = val.then;
            if ("function" == typeof then) {
              return void then.call(val, function(args) {
                res(i, args);
              }, reject);
            }
          }
          /** @type {!Object} */
          args[i] = val;
          if (0 === --arg_count) {
            resolve(args);
          }
        } catch (ABORTING) {
          reject(ABORTING);
        }
      }
      if (0 === args.length) {
        return resolve([]);
      }
      /** @type {number} */
      var arg_count = args.length;
      /** @type {number} */
      var i = 0;
      for (; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };
  /**
   * @param {!Object} reason
   * @return {?}
   */
  Promise.reject = function(reason) {
    return new Promise(function(canCreateDiscussions, reject$2) {
      reject$2(reason);
    });
  };
  /**
   * @param {!Array} answerPs
   * @return {?}
   */
  Promise.race = function(answerPs) {
    return new Promise(function(proceed, throwException) {
      answerPs.forEach(function(initialValue) {
        Promise.resolve(initialValue).then(proceed, throwException);
      });
    });
  };
  /**
   * @param {!Function} onSettled
   * @return {?}
   */
  Promise.prototype["catch"] = function(onSettled) {
    return this.then(null, onSettled);
  };
}, function(module, canCreateDiscussions, require) {
  var Promise = require(298);
  var asap = require(299);
  module.exports = Promise;
  /**
   * @param {!Function} fn
   * @param {number} argumentCount
   * @return {?}
   */
  Promise.denodeify = function(fn, argumentCount) {
    return argumentCount = argumentCount || 1 / 0, function() {
      var n = this;
      /** @type {!Array<?>} */
      var args = Array.prototype.slice.call(arguments);
      return new Promise(function(isArray, saveNotifs) {
        for (; args.length && args.length > argumentCount;) {
          args.pop();
        }
        args.push(function(notifications, propsOrStateManager) {
          if (notifications) {
            saveNotifs(notifications);
          } else {
            isArray(propsOrStateManager);
          }
        });
        var a = fn.apply(n, args);
        if (!(!a || "object" != typeof a && "function" != typeof a || "function" != typeof a.then)) {
          isArray(a);
        }
      });
    };
  };
  /**
   * @param {!Function} fn
   * @return {?}
   */
  Promise.nodeify = function(fn) {
    return function() {
      /** @type {!Array<?>} */
      var argsCopy = Array.prototype.slice.call(arguments);
      var callback = "function" == typeof argsCopy[argsCopy.length - 1] ? argsCopy.pop() : null;
      var ctx = this;
      try {
        return fn.apply(this, arguments).nodeify(callback, ctx);
      } catch (routeArray) {
        if (null === callback || "undefined" == typeof callback) {
          return new Promise(function(canCreateDiscussions, addRoute) {
            addRoute(routeArray);
          });
        }
        asap(function() {
          callback.call(ctx, routeArray);
        });
      }
    };
  };
  /**
   * @param {!Function} callback
   * @param {?} ctx
   * @return {?}
   */
  Promise.prototype.nodeify = function(callback, ctx) {
    return "function" != typeof callback ? this : void this.then(function(num_relations) {
      asap(function() {
        callback.call(ctx, null, num_relations);
      });
    }, function(localMediaStream) {
      asap(function() {
        callback.call(ctx, localMediaStream);
      });
    });
  };
}]);

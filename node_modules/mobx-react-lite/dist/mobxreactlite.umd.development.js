(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx'), require('react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['exports', 'mobx', 'react', 'react-dom'], factory) :
    (global = global || self, factory(global.mobxReactLite = {}, global.mobx, global.React, global.ReactDOM));
}(this, (function (exports, mobx, React, reactDom) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;

    if (!React.useState) {
      throw new Error("mobx-react-lite requires React with Hooks support");
    }

    if (!mobx.spy) {
      throw new Error("mobx-react-lite requires mobx at least version 4 to be available");
    }

    function useForceUpdate() {
      var _useState = React.useState(0),
          setTick = _useState[1];

      var update = React.useCallback(function () {
        setTick(function (tick) {
          return tick + 1;
        });
      }, []);
      return update;
    }
    function isPlainObject(value) {
      if (!value || typeof value !== "object") {
        return false;
      }

      var proto = Object.getPrototypeOf(value);
      return !proto || proto === Object.prototype;
    }
    function getSymbol(name) {
      if (typeof Symbol === "function") {
        return Symbol.for(name);
      }

      return "__$mobx-react " + name + "__";
    }
    var mockGlobal = {};
    function getGlobal() {
      if (typeof window !== "undefined") {
        return window;
      }

      if (typeof global !== "undefined") {
        return global;
      }

      if (typeof self !== "undefined") {
        return self;
      }

      return mockGlobal;
    }

    var observerBatchingConfiguredSymbol =
    /*#__PURE__*/
    getSymbol("observerBatching");
    function defaultNoopBatch(callback) {
      callback();
    }
    function observerBatching(reactionScheduler) {
      if (!reactionScheduler) {
        reactionScheduler = defaultNoopBatch;

        {
          console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
        }
      }

      mobx.configure({
        reactionScheduler: reactionScheduler
      });
      getGlobal()[observerBatchingConfiguredSymbol] = true;
    }
    var isObserverBatched = function isObserverBatched() {
      return !!getGlobal()[observerBatchingConfiguredSymbol];
    };

    var globalIsUsingStaticRendering = false;
    function useStaticRendering(enable) {
      globalIsUsingStaticRendering = enable;
    }
    function isUsingStaticRendering() {
      return globalIsUsingStaticRendering;
    }

    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function printDebugValue(v) {
      return mobx.getDependencyTree(v);
    }

    function createTrackingData(reaction) {
      var trackingData = {
        cleanAt: Date.now() + CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS,
        reaction: reaction
      };
      return trackingData;
    }
    /**
     * The minimum time before we'll clean up a Reaction created in a render
     * for a component that hasn't managed to run its effects. This needs to
     * be big enough to ensure that a component won't turn up and have its
     * effects run without being re-rendered.
     */

    var CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS = 10000;
    /**
     * The frequency with which we'll check for leaked reactions.
     */

    var CLEANUP_TIMER_LOOP_MILLIS = 10000;
    /**
     * Reactions created by components that have yet to be fully mounted.
     */

    var uncommittedReactionRefs =
    /*#__PURE__*/
    new Set();
    /**
     * Latest 'uncommitted reactions' cleanup timer handle.
     */

    var reactionCleanupHandle;

    function ensureCleanupTimerRunning() {
      if (reactionCleanupHandle === undefined) {
        reactionCleanupHandle = setTimeout(cleanUncommittedReactions, CLEANUP_TIMER_LOOP_MILLIS);
      }
    }

    function scheduleCleanupOfReactionIfLeaked(ref) {
      uncommittedReactionRefs.add(ref);
      ensureCleanupTimerRunning();
    }
    function recordReactionAsCommitted(reactionRef) {
      uncommittedReactionRefs.delete(reactionRef);
    }
    /**
     * Run by the cleanup timer to dispose any outstanding reactions
     */

    function cleanUncommittedReactions() {
      reactionCleanupHandle = undefined; // Loop through all the candidate leaked reactions; those older
      // than CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS get tidied.

      var now = Date.now();
      uncommittedReactionRefs.forEach(function (ref) {
        var tracking = ref.current;

        if (tracking) {
          if (now >= tracking.cleanAt) {
            // It's time to tidy up this leaked reaction.
            tracking.reaction.dispose();
            ref.current = null;
            uncommittedReactionRefs.delete(ref);
          }
        }
      });

      if (uncommittedReactionRefs.size > 0) {
        // We've just finished a round of cleanups but there are still
        // some leak candidates outstanding.
        ensureCleanupTimerRunning();
      }
    }

    var insideRender = false;
    var forceUpdateQueue = [];
    function useQueuedForceUpdate(forceUpdate) {
      return function () {
        if (insideRender) {
          forceUpdateQueue.push(forceUpdate);
        } else {
          forceUpdate();
        }
      };
    }
    function useQueuedForceUpdateBlock(callback) {
      // start intercepting force-update calls
      insideRender = true;
      forceUpdateQueue = [];

      try {
        var result = callback(); // stop intercepting force-update

        insideRender = false; // store queue or nothing if it was empty to execute useLayoutEffect only when necessary

        var queue = forceUpdateQueue.length > 0 ? forceUpdateQueue : undefined; // run force-update queue in useLayoutEffect

        React__default.useLayoutEffect(function () {
          if (queue) {
            queue.forEach(function (x) {
              return x();
            });
          }
        }, [queue]);
        return result;
      } finally {
        insideRender = false;
      }
    }

    var EMPTY_OBJECT = {};

    function observerComponentNameFor(baseComponentName) {
      return "observer" + baseComponentName;
    }

    function useObserver(fn, baseComponentName, options) {
      if (baseComponentName === void 0) {
        baseComponentName = "observed";
      }

      if (options === void 0) {
        options = EMPTY_OBJECT;
      }

      if (isUsingStaticRendering()) {
        return fn();
      }

      var wantedForceUpdateHook = options.useForceUpdate || useForceUpdate;
      var forceUpdate = wantedForceUpdateHook();
      var queuedForceUpdate = useQueuedForceUpdate(forceUpdate); // StrictMode/ConcurrentMode/Suspense may mean that our component is
      // rendered and abandoned multiple times, so we need to track leaked
      // Reactions.

      var reactionTrackingRef = React__default.useRef(null);

      if (!reactionTrackingRef.current) {
        // First render for this component (or first time since a previous
        // reaction from an abandoned render was disposed).
        var newReaction = new mobx.Reaction(observerComponentNameFor(baseComponentName), function () {
          // Observable has changed, meaning we want to re-render
          // BUT if we're a component that hasn't yet got to the useEffect()
          // stage, we might be a component that _started_ to render, but
          // got dropped, and we don't want to make state changes then.
          // (It triggers warnings in StrictMode, for a start.)
          if (trackingData.mounted) {
            // We have reached useEffect(), so we're mounted, and can trigger an update
            queuedForceUpdate();
          } else {
            // We haven't yet reached useEffect(), so we'll need to trigger a re-render
            // when (and if) useEffect() arrives.  The easiest way to do that is just to
            // drop our current reaction and allow useEffect() to recreate it.
            newReaction.dispose();
            reactionTrackingRef.current = null;
          }
        });
        var trackingData = createTrackingData(newReaction);
        reactionTrackingRef.current = trackingData;
        scheduleCleanupOfReactionIfLeaked(reactionTrackingRef);
      }

      var reaction = reactionTrackingRef.current.reaction;
      React__default.useDebugValue(reaction, printDebugValue);
      React__default.useEffect(function () {
        // Called on first mount only
        recordReactionAsCommitted(reactionTrackingRef);

        if (reactionTrackingRef.current) {
          // Great. We've already got our reaction from our render;
          // all we need to do is to record that it's now mounted,
          // to allow future observable changes to trigger re-renders
          reactionTrackingRef.current.mounted = true;
        } else {
          // The reaction we set up in our render has been disposed.
          // This is either due to bad timings of renderings, e.g. our
          // component was paused for a _very_ long time, and our
          // reaction got cleaned up, or we got a observable change
          // between render and useEffect
          // Re-create the reaction
          reactionTrackingRef.current = {
            reaction: new mobx.Reaction(observerComponentNameFor(baseComponentName), function () {
              // We've definitely already been mounted at this point
              queuedForceUpdate();
            }),
            cleanAt: Infinity
          };
          queuedForceUpdate();
        }

        return function () {
          reactionTrackingRef.current.reaction.dispose();
          reactionTrackingRef.current = null;
        };
      }, []); // delay all force-update calls after rendering of this component

      return useQueuedForceUpdateBlock(function () {
        // render the original component, but have the
        // reaction track the observables, so that rendering
        // can be invalidated (see above) once a dependency changes
        var rendering;
        var exception;
        reaction.track(function () {
          try {
            rendering = fn();
          } catch (e) {
            exception = e;
          }
        });

        if (exception) {
          throw exception; // re-throw any exceptions caught during rendering
        }

        return rendering;
      });
    }

    function observer(baseComponent, options) {
      // The working of observer is explained step by step in this talk: https://www.youtube.com/watch?v=cPF4iBedoF0&feature=youtu.be&t=1307
      if (isUsingStaticRendering()) {
        return baseComponent;
      }

      var realOptions = _extends({
        forwardRef: false
      }, options);

      var baseComponentName = baseComponent.displayName || baseComponent.name;

      var wrappedComponent = function wrappedComponent(props, ref) {
        return useObserver(function () {
          return baseComponent(props, ref);
        }, baseComponentName);
      };

      wrappedComponent.displayName = baseComponentName; // memo; we are not interested in deep updates
      // in props; we assume that if deep objects are changed,
      // this is in observables, which would have been tracked anyway

      var memoComponent;

      if (realOptions.forwardRef) {
        // we have to use forwardRef here because:
        // 1. it cannot go before memo, only after it
        // 2. forwardRef converts the function into an actual component, so we can't let the baseComponent do it
        //    since it wouldn't be a callable function anymore
        memoComponent = React.memo(React.forwardRef(wrappedComponent));
      } else {
        memoComponent = React.memo(wrappedComponent);
      }

      copyStaticProperties(baseComponent, memoComponent);
      memoComponent.displayName = baseComponentName;
      return memoComponent;
    } // based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js

    var hoistBlackList = {
      $$typeof: true,
      render: true,
      compare: true,
      type: true
    };

    function copyStaticProperties(base, target) {
      Object.keys(base).forEach(function (key) {
        if (!hoistBlackList[key]) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
        }
      });
    }

    function ObserverComponent(_ref) {
      var children = _ref.children,
          render = _ref.render;
      var component = children || render;

      if (typeof component !== "function") {
        return null;
      }

      return useObserver(component);
    }

    ObserverComponent.propTypes = {
      children: ObserverPropsCheck,
      render: ObserverPropsCheck
    };
    ObserverComponent.displayName = "Observer";

    function ObserverPropsCheck(props, key, componentName, location, propFullName) {
      var extraKey = key === "children" ? "render" : "children";
      var hasProp = typeof props[key] === "function";
      var hasExtraProp = typeof props[extraKey] === "function";

      if (hasProp && hasExtraProp) {
        return new Error("MobX Observer: Do not use children and render in the same time in`" + componentName);
      }

      if (hasProp || hasExtraProp) {
        return null;
      }

      return new Error("Invalid prop `" + propFullName + "` of type `" + typeof props[key] + "` supplied to" + " `" + componentName + "`, expected `function`.");
    }

    function useAsObservableSourceInternal(current, usedByLocalStore) {
      var culprit = usedByLocalStore ? "useLocalStore" : "useAsObservableSource";

      if ( usedByLocalStore) {
        var _React$useState = React__default.useState(current),
            initialSource = _React$useState[0];

        if (initialSource !== undefined && current === undefined || initialSource === undefined && current !== undefined) {
          throw new Error("make sure you never pass `undefined` to " + culprit);
        }
      }

      if (usedByLocalStore && current === undefined) {
        return undefined;
      }

      if ( !isPlainObject(current)) {
        throw new Error(culprit + " expects a plain object as " + (usedByLocalStore ? "second" : "first") + " argument");
      }

      var _React$useState2 = React__default.useState(function () {
        return mobx.observable(current, {}, {
          deep: false
        });
      }),
          res = _React$useState2[0];

      if ( Object.keys(res).length !== Object.keys(current).length) {
        throw new Error("the shape of objects passed to " + culprit + " should be stable");
      }

      mobx.runInAction(function () {
        Object.assign(res, current);
      });
      return res;
    }
    function useAsObservableSource(current) {
      return useAsObservableSourceInternal(current, false);
    }

    function useLocalStore(initializer, current) {
      var source = useAsObservableSourceInternal(current, true);
      return React__default.useState(function () {
        var local = mobx.observable(initializer(source));

        if (isPlainObject(local)) {
          mobx.runInAction(function () {
            Object.keys(local).forEach(function (key) {
              var value = local[key];

              if (typeof value === "function") {
                // @ts-ignore No idea why ts2536 is popping out here
                local[key] = wrapInTransaction(value, local);
              }
            });
          });
        }

        return local;
      })[0];
    } // tslint:disable-next-line: ban-types

    function wrapInTransaction(fn, context) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return mobx.transaction(function () {
          return fn.apply(context, args);
        });
      };
    }

    observerBatching(reactDom.unstable_batchedUpdates);

    exports.Observer = ObserverComponent;
    exports.isObserverBatched = isObserverBatched;
    exports.isUsingStaticRendering = isUsingStaticRendering;
    exports.observer = observer;
    exports.observerBatching = observerBatching;
    exports.useAsObservableSource = useAsObservableSource;
    exports.useForceUpdate = useForceUpdate;
    exports.useLocalStore = useLocalStore;
    exports.useObserver = useObserver;
    exports.useQueuedForceUpdate = useQueuedForceUpdate;
    exports.useQueuedForceUpdateBlock = useQueuedForceUpdateBlock;
    exports.useStaticRendering = useStaticRendering;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mobxreactlite.umd.development.js.map

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { _startAction, _endAction } from "mobx";
import { invariant } from "./utils";
import { decorateMethodOrField } from "./decorator-utils";
import { fail } from "./utils";
var runId = 0;
var unfinishedIds = new Set();
var currentlyActiveIds = new Set();
var inOrderExecution;
{
    var taskOrderPromise_1 = Promise.resolve();
    var queueMicrotaskPolyfill_1;
    if (typeof queueMicrotask !== "undefined") {
        // use real implementation if possible in modern browsers/node
        queueMicrotaskPolyfill_1 = queueMicrotask;
    }
    else if (typeof process !== "undefined" && process.nextTick) {
        // fallback to node's process.nextTick in node <= 10
        queueMicrotaskPolyfill_1 = function (cb) {
            process.nextTick(cb);
        };
    }
    else {
        // use setTimeout for old browsers
        queueMicrotaskPolyfill_1 = function (cb) {
            setTimeout(cb, 0);
        };
    }
    var idle_1 = function () {
        return new Promise(function (r) {
            queueMicrotaskPolyfill_1(r);
        });
    };
    // we use this trick to force a proper order of execution
    // even for immediately resolved promises
    inOrderExecution = function () {
        taskOrderPromise_1 = taskOrderPromise_1.then(idle_1);
        return taskOrderPromise_1;
    };
}
var actionAsyncContextStack = [];
export function task(value) {
    return __awaiter(this, void 0, void 0, function () {
        var ctx, runId, actionName, args, scope, actionRunInfo, step, nextStep, ret, err_1, actionRunInfo_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx = actionAsyncContextStack[actionAsyncContextStack.length - 1];
                    if (!ctx) {
                        fail("'actionAsync' context not present when running 'task'. did you await inside an 'actionAsync' without using 'task(promise)'? did you forget to await the task?");
                    }
                    runId = ctx.runId, actionName = ctx.actionName, args = ctx.args, scope = ctx.scope, actionRunInfo = ctx.actionRunInfo, step = ctx.step;
                    nextStep = step + 1;
                    actionAsyncContextStack.pop();
                    _endAction(actionRunInfo);
                    currentlyActiveIds.delete(runId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 6, 7]);
                    return [4 /*yield*/, value];
                case 2:
                    ret = _a.sent();
                    return [4 /*yield*/, inOrderExecution()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, ret];
                case 4:
                    err_1 = _a.sent();
                    return [4 /*yield*/, inOrderExecution()];
                case 5:
                    _a.sent();
                    throw err_1;
                case 6:
                    // only restart if it not a dangling promise (the action is not yet finished)
                    if (unfinishedIds.has(runId)) {
                        actionRunInfo_1 = _startAction(getActionAsyncName(actionName, runId, nextStep), this, args);
                        actionAsyncContextStack.push({
                            runId: runId,
                            step: nextStep,
                            actionRunInfo: actionRunInfo_1,
                            actionName: actionName,
                            args: args,
                            scope: scope,
                        });
                        currentlyActiveIds.add(runId);
                    }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// base
/**
 * Alternative syntax for async actions, similar to `flow` but more compatible with
 * Typescript typings. Not to be confused with `asyncAction`, which is deprecated.
 *
 * `actionAsync` can be used either as a decorator or as a function.
 * It takes an async function that internally must use `await task(promise)` rather than
 * the standard `await promise`.
 *
 * When using the mobx devTools, an asyncAction will emit `action` events with names like:
 * * `"fetchUsers - runid 6 - step 0"`
 * * `"fetchUsers - runid 6 - step 1"`
 * * `"fetchUsers - runid 6 - step 2"`
 *
 * The `runId` represents the action instance. In other words, if `fetchUsers` is invoked
 * multiple times concurrently, the events with the same `runid` belong together.
 * The `step` number indicates the code block that is now being executed.
 *
 * @example
 * import {actionAsync, task} from "mobx-utils"
 *
 * let users = []
 *
 * const fetchUsers = actionAsync("fetchUsers", async (url) => {
 *   const start = Date.now()
 *   // note the use of task when awaiting!
 *   const data = await task(window.fetch(url))
 *   users = await task(data.json())
 *   return start - Date.now()
 * })
 *
 * const time = await fetchUsers("http://users.com")
 * console.log("Got users", users, "in ", time, "ms")
 *
 * @example
 * import {actionAsync, task} from "mobx-utils"
 *
 * mobx.configure({ enforceActions: "observed" }) // don't allow state modifications outside actions
 *
 * class Store {
 *   \@observable githubProjects = []
 *   \@observable = "pending" // "pending" / "done" / "error"
 *
 *   \@actionAsync
 *   async fetchProjects() {
 *     this.githubProjects = []
 *     this.state = "pending"
 *     try {
 *       // note the use of task when awaiting!
 *       const projects = await task(fetchGithubProjectsSomehow())
 *       const filteredProjects = somePreprocessing(projects)
 *       // the asynchronous blocks will automatically be wrapped actions
 *       this.state = "done"
 *       this.githubProjects = filteredProjects
 *     } catch (error) {
 *        this.state = "error"
 *     }
 *   }
 * }
 */
export function actionAsync(arg1, arg2, arg3) {
    // decorator
    if (typeof arguments[1] === "string") {
        return decorateMethodOrField("@actionAsync", function (prop, v) {
            return actionAsyncFn(prop, v);
        }, arg1, arg2, arg3);
    }
    // direct invocation
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    return actionAsyncFn(actionName, fn);
}
function actionAsyncFn(actionName, fn) {
    if (!_startAction || !_endAction) {
        fail("'actionAsync' requires mobx >=5.13.1 or >=4.13.1");
    }
    invariant(typeof fn === "function", "'asyncAction' expects a function");
    if (typeof actionName !== "string" || !actionName)
        fail("actions should have valid names, got: '" + actionName + "'");
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var nextRunId, actionRunInfo, finish, promise, ret, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nextRunId = runId++;
                        unfinishedIds.add(nextRunId);
                        actionRunInfo = _startAction(getActionAsyncName(actionName, nextRunId, 0), this, args);
                        actionAsyncContextStack.push({
                            runId: nextRunId,
                            step: 0,
                            actionRunInfo: actionRunInfo,
                            actionName: actionName,
                            args: args,
                            scope: this,
                        });
                        currentlyActiveIds.add(nextRunId);
                        finish = function (err) {
                            unfinishedIds.delete(nextRunId);
                            var ctx = actionAsyncContextStack.pop();
                            if (!ctx || ctx.runId !== nextRunId) {
                                // push it back if invalid
                                if (ctx) {
                                    actionAsyncContextStack.push(ctx);
                                }
                                var msg = "invalid 'actionAsync' context when finishing action '" + actionName + "'.";
                                if (!ctx) {
                                    msg += " no action context could be found instead.";
                                }
                                else {
                                    msg += " an action context for '" + ctx.actionName + "' was found instead.";
                                }
                                msg +=
                                    " did you await inside an 'actionAsync' without using 'task(promise)'? did you forget to await the task?";
                                fail(msg);
                            }
                            ctx.actionRunInfo.error = err;
                            _endAction(ctx.actionRunInfo);
                            currentlyActiveIds.delete(nextRunId);
                            if (err) {
                                throw err;
                            }
                        };
                        try {
                            promise = fn.apply(this, args);
                        }
                        catch (err) {
                            finish(err);
                        }
                        // are we done sync? (no task run)
                        if (currentlyActiveIds.has(nextRunId)) {
                            finish(undefined);
                            return [2 /*return*/, promise];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, promise];
                    case 2:
                        ret = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        finish(err_2);
                        return [3 /*break*/, 4];
                    case 4:
                        finish(undefined);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
}
function getActionAsyncName(actionName, runId, step) {
    return actionName + " - runid " + runId + " - step " + step;
}

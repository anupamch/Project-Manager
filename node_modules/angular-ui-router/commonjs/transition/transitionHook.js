"use strict";
var common_1 = require("../common/common");
var strings_1 = require("../common/strings");
var predicates_1 = require("../common/predicates");
var hof_1 = require("../common/hof");
var trace_1 = require("../common/trace");
var coreservices_1 = require("../common/coreservices");
var rejectFactory_1 = require("./rejectFactory");
var targetState_1 = require("../state/targetState");
var defaultOptions = {
    async: true,
    rejectIfSuperseded: true,
    current: common_1.noop,
    transition: null,
    traceData: {},
    bind: null
};
/** @hidden */
var TransitionHook = (function () {
    function TransitionHook(transition, stateContext, eventHook, options) {
        var _this = this;
        this.transition = transition;
        this.stateContext = stateContext;
        this.eventHook = eventHook;
        this.options = options;
        this.isSuperseded = function () { return _this.options.current() !== _this.options.transition; };
        this.options = common_1.defaults(options, defaultOptions);
    }
    TransitionHook.prototype.invokeHook = function () {
        var _a = this, options = _a.options, eventHook = _a.eventHook;
        trace_1.trace.traceHookInvocation(this, options);
        if (options.rejectIfSuperseded && this.isSuperseded()) {
            return rejectFactory_1.Rejection.superseded(options.current()).toPromise();
        }
        var hookResult = !eventHook._deregistered
            ? eventHook.callback.call(options.bind, this.transition, this.stateContext)
            : undefined;
        return this.handleHookResult(hookResult);
    };
    /**
     * This method handles the return value of a Transition Hook.
     *
     * A hook can return false, a redirect (TargetState), or a promise (which may resolve to false or a redirect)
     */
    TransitionHook.prototype.handleHookResult = function (hookResult) {
        var _this = this;
        if (!predicates_1.isDefined(hookResult))
            return undefined;
        /**
         * Handles transition superseded, transition aborted and transition redirect.
         */
        var mapHookResult = hof_1.pattern([
            // Transition is no longer current
            [this.isSuperseded, function () { return rejectFactory_1.Rejection.superseded(_this.options.current()).toPromise(); }],
            // If the hook returns false, abort the current Transition
            [hof_1.eq(false), function () { return rejectFactory_1.Rejection.aborted("Hook aborted transition").toPromise(); }],
            // If the hook returns a Transition, halt the current Transition and redirect to that Transition.
            [hof_1.is(targetState_1.TargetState), function (target) { return rejectFactory_1.Rejection.redirected(target).toPromise(); }],
            // A promise was returned, wait for the promise and then chain another hookHandler
            [predicates_1.isPromise, function (promise) { return promise.then(_this.handleHookResult.bind(_this)); }]
        ]);
        var transitionResult = mapHookResult(hookResult);
        if (transitionResult)
            trace_1.trace.traceHookResult(hookResult, transitionResult, this.options);
        return transitionResult;
    };
    TransitionHook.prototype.toString = function () {
        var _a = this, options = _a.options, eventHook = _a.eventHook;
        var event = hof_1.parse("traceData.hookType")(options) || "internal", context = hof_1.parse("traceData.context.state.name")(options) || hof_1.parse("traceData.context")(options) || "unknown", name = strings_1.fnToString(eventHook.callback);
        return event + " context: " + context + ", " + strings_1.maxLength(200, name);
    };
    /**
     * Given an array of TransitionHooks, runs each one synchronously and sequentially.
     *
     * Returns a promise chain composed of any promises returned from each hook.invokeStep() call
     */
    TransitionHook.runSynchronousHooks = function (hooks, swallowExceptions) {
        if (swallowExceptions === void 0) { swallowExceptions = false; }
        var results = [];
        for (var i = 0; i < hooks.length; i++) {
            var hook = hooks[i];
            try {
                results.push(hook.invokeHook());
            }
            catch (exception) {
                if (!swallowExceptions) {
                    return rejectFactory_1.Rejection.errored(exception).toPromise();
                }
                var errorHandler = hook.transition.router.stateService.defaultErrorHandler();
                errorHandler(exception);
            }
        }
        var rejections = results.filter(rejectFactory_1.Rejection.isTransitionRejectionPromise);
        if (rejections.length)
            return rejections[0];
        return results
            .filter(predicates_1.isPromise)
            .reduce(function (chain, promise) { return chain.then(hof_1.val(promise)); }, coreservices_1.services.$q.when());
    };
    return TransitionHook;
}());
exports.TransitionHook = TransitionHook;
//# sourceMappingURL=transitionHook.js.map
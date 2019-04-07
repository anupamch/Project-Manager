import { $InjectorLike } from "../common/coreservices";
import { IInjectable } from "../common/common";
import { TypedMap } from "../common/common";
import { ResolveContext } from "../resolve/resolveContext";
import IScope = angular.IScope;
/**
 * Annotates a controller expression (may be a controller function(), a "controllername",
 * or "controllername as name")
 *
 * - Temporarily decorates $injector.instantiate.
 * - Invokes $controller() service
 *   - Calls $injector.instantiate with controller constructor
 * - Annotate constructor
 * - Undecorate $injector
 *
 * returns an array of strings, which are the arguments of the controller expression
 */
export declare function annotateController(controllerExpression: (IInjectable | string)): string[];
export declare function watchDigests($rootScope: IScope): void;
export declare const getLocals: (ctx: ResolveContext) => TypedMap<any>;
/** Adds the angular 1 `$injector` to the `UIInjector` interface */
declare module "../common/interface" {
    /**
     * This enhances the [[common.UIInjector]] interface by adding the `$injector` service as the [[native]] injector.
     */
    interface UIInjector {
        /**
         * The native Angular 1 `$injector` service
         *
         * When you have access to a `UIInjector`, this property will contain the native `$injector` Angular 1 service.
         *
         * @example:
         * ```js
         *
         * $transition.onStart({}, function(transition) {
         *   var uiInjector = transition.injector();
         *   var $injector = uiInjector.native;
         *   var val = $injector.invoke(someFunction);
         * });
         */
        native: $InjectorLike;
    }
}

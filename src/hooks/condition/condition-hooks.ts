import { RuleEngineContext } from '../../engine/context/rule-engine-context';

export type ConditionHooks = {
    onBefore?: (ctx: RuleEngineContext) => Promise<void> | void;
    onSuccess?: (ctx: RuleEngineContext) => Promise<void> | void;
    onFail?: (ctx: RuleEngineContext) => Promise<void> | void;
    onAfter?: (ctx: RuleEngineContext) => Promise<void> | void;
}
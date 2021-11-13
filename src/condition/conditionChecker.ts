import { RuleEngineContext } from '../engine/context/rule-engine-context';

type ConditionFunc = (ctx: RuleEngineContext) => boolean;

export class ConditionChecker {
    check(context: RuleEngineContext, condition: ConditionFunc): boolean {
        return condition(context);
    }
}
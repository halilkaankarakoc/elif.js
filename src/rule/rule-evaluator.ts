import { RuleEngineContext } from '../engine/context/rule-engine-context';
import { ConditionChecker } from '../condition/conditionChecker';
import { ConditionHooksExecutor } from '../condition/conditionHooksExecutor';
import { Rule } from './rule';
import { RuleHooksExecutor } from './rule-hooks-executor';

export class RuleEvaluator {

    private ruleHooksExecutor: RuleHooksExecutor;

    constructor() {
        this.ruleHooksExecutor = new RuleHooksExecutor(new ConditionHooksExecutor(new ConditionChecker()));
    }

    evaluate(context: RuleEngineContext, rules: Rule[]) {
        this.ruleHooksExecutor.executeHooks(context, rules)
    }
}
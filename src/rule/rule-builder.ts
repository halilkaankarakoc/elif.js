import { RuleEngineContext } from '../engine/context/rule-engine-context';
import { ConditionHooks } from '../hooks/condition/condition-hooks';
import { RuleHooks } from '../hooks/rule/rule-hooks';
import { Rule } from '../rule/rule';
import { RuleSpec } from '../rule/rule-spec';

export class RuleBuilder {

    private ruleName: string;

    private ruleDescription: string;

    private rulePriority: number;

    private ruleSpecs: RuleSpec[] = [];

    private ruleHooks: RuleHooks = {};

    name(ruleName: string): RuleBuilder {
        this.ruleName = ruleName;
        return this;
    }

    description(ruleDescription: string): RuleBuilder {
        this.ruleDescription = ruleDescription;
        return this;
    }

    priority(rulePriority: number) {
        this.rulePriority = rulePriority;
        return this;
    }

    when(params: {id: string, description?: string, condition: (ctx: RuleEngineContext) => boolean, hooks?: ConditionHooks}): RuleBuilder {
        this.ruleSpecs.push({
            id: params.id, 
            description: params.description, 
            condition: params.condition, 
            hooks: params.hooks
        });
        return this;
    }

    beforeAll(ruleHookAction: (ctx: RuleEngineContext) => void) {
        this.ruleHooks.beforeAll = ruleHookAction;
        return this;
    }

    afterAll(ruleHookAction: (ctx: RuleEngineContext) => void) {
        this.ruleHooks.afterAll = ruleHookAction;
        return this;
    }

    build(): Rule {
        return new Rule(this.ruleName, this.ruleDescription, this.rulePriority, this.ruleSpecs, this.ruleHooks);
    }
}


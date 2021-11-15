import { ConditionHooksExecutor } from '../condition/conditionHooksExecutor';
import { RuleEngineContext } from '../engine/context/rule-engine-context';
import { RuleHooks } from '../hooks/rule/rule-hooks';
import { BeforeAllState, OnBeforeState, AfterAllState } from '../managers/state-manager';
import { Rule } from './rule';

export class RuleHooksExecutor {
    constructor(private conditionHooksExecutor: ConditionHooksExecutor) { }

    private async executeBeforeAllHook(context: RuleEngineContext, ruleHooks: RuleHooks) {
        if (ruleHooks && ruleHooks.beforeAll) {
            context.stateManager.setState(new BeforeAllState(context.stateManager));
            try {
                await ruleHooks.beforeAll(context);
            } catch (error) {
                throw error;
            }
        }
    }

    private async executeAfterAllHook(context: RuleEngineContext, ruleHooks: RuleHooks) {
        if (ruleHooks && ruleHooks.afterAll) {
            try {
                await ruleHooks.afterAll(context);
            } catch (error) {
                throw error;
            }
            context.stateManager.setState(new AfterAllState(context.stateManager));
        }
    }

    async executeHooks(context: RuleEngineContext, rules: Rule[]) {
        for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
            context.stateManager.reset();

            const eachRule = rules[ruleIndex];
            const eachSpec = eachRule.specs;
            const ruleHooks = eachRule.ruleHooks;

            await this.executeBeforeAllHook(context, ruleHooks);

            for (let specIndex = 0; specIndex < eachSpec.length; specIndex++) {
                const condition = eachSpec[specIndex].condition;
                const hooks = eachSpec[specIndex].hooks;

                await this.conditionHooksExecutor.executeHooks(context, condition, hooks);

                const actionResult = context.actionManager.getAction();

                if (['NEXT', 'JUMP_TO'].includes(actionResult.name)) {
                    context.stateManager.reset();
                }

                if (actionResult.name === 'NEXT') {
                    continue;
                }

                if (actionResult.name === 'STOP') {
                    break;
                }

                if (actionResult.name === 'JUMP_TO') {
                    const jumpIndex = eachSpec.findIndex(spec => spec.id === actionResult.data!.to);
                    if (jumpIndex >= 0) {
                        specIndex = jumpIndex - 1;
                        continue;
                    }
                }
            }
            await this.executeAfterAllHook(context, ruleHooks);
        }
    }
}
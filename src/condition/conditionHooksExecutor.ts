import { ConditionHooks } from '../hooks/condition/condition-hooks';
import { ConditionChecker } from './conditionChecker';
import { RuleEngineContext } from '../engine/context/rule-engine-context';
import { OnBeforeState, OnSuccessState, OnFailState, OnAfterState, } from '../managers/state-manager';

export type ContextAction = {
    action: string;
    data?: { [key: string]: string; }
};

export class ConditionHooksExecutor {
    constructor(private conditionChecker: ConditionChecker) {}

    private async executeOnBeforeHook(context: RuleEngineContext, hooks?: ConditionHooks) {
        if (hooks && hooks.onBefore) {
            context.stateManager.setState(new OnBeforeState(context.stateManager));
            try {
                await hooks.onBefore(context);
            } catch (error) {
                throw error;
            }
        }
    }

    private async executeOnSuccessHook(context: RuleEngineContext, hooks?: ConditionHooks) {
        if (hooks && hooks.onSuccess) {
            context.stateManager.setState(new OnSuccessState(context.stateManager));
            try {
                await hooks.onSuccess(context);
            } catch (error) {
                throw error;
            }
        }
    }

    private async executeOnFailHook(context: RuleEngineContext, hooks?: ConditionHooks) {
        if (hooks && hooks.onFail) {
            context.stateManager.setState(new OnFailState(context.stateManager));
            context.actionManager.setAction({name: 'STOP'});
            try {
                await hooks.onFail(context);
            } catch (error) {
                throw error;
            }
        }
    }

    private async executeOnAfterHook(context: RuleEngineContext, hooks?: ConditionHooks) {
        if (hooks && hooks.onAfter) {
            context.stateManager.setState(new OnAfterState(context.stateManager));
            try {
                await hooks.onAfter(context);
            } catch (error) {
                throw error;
            }
        }
    }

    async executeHooks(context: RuleEngineContext,condition: (ctx: RuleEngineContext) => boolean,  hooks?: ConditionHooks, ) {
        await this.executeOnBeforeHook(context, hooks);

        const isConditionPassed = this.conditionChecker.check(context, condition);
        
        if (isConditionPassed) {
            await this.executeOnSuccessHook(context, hooks);
        } else {
            await this.executeOnFailHook(context, hooks);
        }
        
        await this.executeOnAfterHook(context, hooks);
    }   
}
import { RuleEngineContext } from '../engine/context/rule-engine-context';
import { ConditionHooks } from '../hooks/condition/condition-hooks';

export interface RuleSpec {
    id: string;
    description?: string;
    condition: (ctx: RuleEngineContext) => boolean;
    hooks?: ConditionHooks;
}

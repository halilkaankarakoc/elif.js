import { RuleHooks } from '../hooks/rule/rule-hooks';
import { RuleSpec } from './rule-spec';

export class Rule {
    constructor(
        private ruleName: string,
        private ruleDescription: string, 
        private _priority: number,
        private _specs: RuleSpec[],
        private _ruleHooks: RuleHooks,
    ) {}

    get ruleHooks() {
        return this._ruleHooks;
    }

    get priority() {
        return this._priority;
    }

    get specs() {
        return this._specs;
    }
}
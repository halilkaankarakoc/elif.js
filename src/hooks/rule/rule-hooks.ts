import { RuleEngineContext } from '../../engine/context/rule-engine-context';

export type RuleHooks = {
    beforeAll?: (ctx: RuleEngineContext) => Promise<void> | void,
    afterAll?: (ctx: RuleEngineContext) => Promise<void> | void,
}
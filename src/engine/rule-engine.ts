import { Facts } from '../facts/facts';
import { RuleEngineContext } from './context/rule-engine-context';
import { Rule } from '../rule/rule';
import { RuleEvaluator } from '../rule/rule-evaluator';
import { OnBeforeState } from '../managers/state-manager';

export class RuleEngine {
    private context: RuleEngineContext;
    private ruleEvaluator: RuleEvaluator;

    constructor() {
        this.context = new RuleEngineContext();
        this.ruleEvaluator = new RuleEvaluator();
    }

    private mergeFacts(facts: Facts[] | {[key: string]: any}[]) {
        const factsInstances = facts.filter(eachFact => {
            if (eachFact instanceof Facts) {
                return eachFact.facts;
            }
        });

        const factsObjects = facts.filter(eachFact => {
            if (!(eachFact instanceof Facts)) {
                return eachFact;
            }
        })
        .reduce((prev, current) =>  ({...prev, ...current}), {});

        const merged = factsInstances
            .map(eachFact => eachFact.facts)
            .reduce((prev, current) =>  ({...prev, ...current}), {});
        const mergedFacts = new Facts();

        Object.keys(merged).forEach((key) => mergedFacts.add(key, merged[key]));
        Object.keys(factsObjects).forEach((key) => mergedFacts.add(key, factsObjects[key]))
        return mergedFacts;
    }

    run(data: {rules: Rule[], facts: Facts[] | {[key: string]: any}[]}[]) {
        data.forEach(({rules, facts}) => {
            const mergedFacts = this.mergeFacts(facts);
            this.context.setFacts(mergedFacts);
            this.ruleEvaluator.evaluate(this.context, rules);
    
            this.context.stateManager.reset();
        });

        return {
            data: this.context.data,
            facts: this.context.facts.toObject(),
        };
    }
}
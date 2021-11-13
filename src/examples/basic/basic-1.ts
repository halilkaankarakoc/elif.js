import { RuleBuilder, RuleEngine, Facts } from '../../index';

const ruleBuilder = new RuleBuilder();

const rule = ruleBuilder
                    .name('basic rule')
                    .description('basic rule description')
                    .beforeAll(() => console.log('it runs first'))
                    .afterAll((ctx) => console.log('it runs last'))
                    .when({
                        id: 'cond#1',
                        description: 'Age must be greater than or equal to 18', 
                        condition: (ctx) => ctx.facts.get('age') >= 18, 
                        hooks: {
                            onBefore: () => console.log('it runs before every condition check'),
                            onSuccess: () => console.log('cond#1 passed!'),
                            onFail: (ctx) =>  console.log(`cond#1 failed because age is ${ctx.facts.get('age')}`),
                            onAfter: () => console.log('it runs after onSuccess or onFail worked')
                        }
                    })
                    .build();

const facts = new Facts();

facts.add('age', 18);

const ruleEngine = new RuleEngine();

ruleEngine.run([
    {
        rules: [rule],
        facts: [facts]
    }
]);
import { RuleBuilder, RuleEngine, Facts } from '../../src/index';

const ruleBuilder = new RuleBuilder();

const rule = ruleBuilder
                    .name('basic rule')
                    .description('basic rule description')
                    .beforeAll(() => console.log('beforeAll'))
                    .afterAll(() => console.log('afterAll'))
                    .when({
                        id: 'cond#1', 
                        description: 'Condition#1', 
                        condition: (ctx) => ctx.facts.get('age') >= 18, 
                        hooks: {
                            onBefore: () => console.log('Condition#1 onBefore'),
                            onSuccess: () => console.log('Condition#1 passed!'),
                            onFail: (ctx) =>  {
                                console.log(`Condition#1 failed because age is ${ctx.facts.get('age')}`);
                                ctx.next();
                                console.log('next() triggered');
                            },
                            onAfter: () => console.log('Condition#1 onAfter')
                        }
                        })
                    .when({
                        id: 'cond#2', 
                        description: 'Condition#2', 
                        condition: (ctx) => ctx.facts.get('gender') === 'M', 
                        hooks:{
                            onBefore: () => console.log('Condition#2 onBefore'),
                            onSuccess: () => console.log('Condition#2 passed!'),
                            onFail: (ctx) =>  console.log(`Condition#2 failed because gender is ${ctx.facts.get('M')}`),
                            onAfter: () => console.log('Condition#2 onAfter')
                        }
                    })
                    .build();

const facts = new Facts();

facts.add('age', 17);
facts.add('gender', 'M');


const ruleEngine = new RuleEngine();

ruleEngine.run([
    {
        rules: [rule],
        facts: [facts]
    }
]);
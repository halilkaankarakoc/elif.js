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
                        condition: (ctx) => ctx.facts.get('age') >= 25, 
                        hooks: {
                            onBefore: () => console.log('Condition#1 onBefore'),
                            onSuccess: (ctx) => {
                                console.log('Condition#1 passed!');
                                ctx.jumpTo('cond#3');
                                console.log('jump triggered to Condition#3');
                            },
                            onFail: (ctx) =>  {
                                console.log(`Condition#1 failed because age is ${ctx.facts.get('age')}`);
                                ctx.next();
                            },
                            onAfter: () => console.log('Condition#1 onAfter')
                    }
                    })
                    .when({
                        id: 'cond#2', 
                        description: 'Condition#2', 
                        condition: (ctx) => ctx.facts.get('gender') === 'M', 
                        hooks: {
                            onBefore: () => console.log('Condition#2 onBefore'),
                            onSuccess: () => console.log('Condition#2 passed!'),
                            onFail: (ctx) =>  console.log(`Condition#2 failed because gender is ${ctx.facts.get('M')}`),
                            onAfter: () => console.log('Condition#2 onAfter')
                    }
                    })
                    .when({
                        id: 'cond#3', 
                        description: 'Condition#3',
                        condition: (ctx) => ctx.facts.get('name') === 'Kaan', 
                        hooks: {
                            onBefore: () => console.log('Condition#3 onBefore'),
                            onSuccess: () => console.log('Condition#3 passed!'),
                            onFail: (ctx) =>  console.log(`Condition#3 failed because gender is ${ctx.facts.get('M')}`),
                            onAfter: () => console.log('Condition#3 onAfter')
                    }
                    })
                    .build();

const facts = new Facts();

facts.add('name', 'Kaan');
facts.add('age', 25);
facts.add('gender', 'M');


const ruleEngine = new RuleEngine();

ruleEngine.run([
    {
        rules: [rule],
        facts: [facts]
    }
]);
import { RuleBuilder, RuleEngine, Facts } from '../../src/index';

const ruleBuilder = new RuleBuilder();

const loopContinueRule = ruleBuilder
                    .name('loop rule')
                    .description('loop rule description')
                    .beforeAll((ctx) => {
                        ctx.setData('lowerBound', 0);
                        ctx.setData('upperBound', 5);
                        ctx.setData('increment', 1);
                    })
                    .when({
                        id: 'cond#1', 
                        description: 'step#1', 
                        condition: (ctx) => ctx.getData('lowerBound') < ctx.getData('upperBound'), 
                        hooks: {
                            onSuccess: (ctx) => {
                                ctx.setData('lowerBound', ctx.getData('lowerBound') + ctx.getData('increment'));
                                ctx.jumpTo('cond#2');
                            },
                            onFail: (ctx) => {
                                ctx.stop();
                            }
                        }
                    })
                    .when({
                        id: 'cond#2', 
                        description: 'step#2', 
                        condition: (ctx) => ctx.getData('lowerBound') === 3, 
                        hooks: {
                            onSuccess: (ctx) => {
                            ctx.setData('lowerBound', ctx.getData('lowerBound') + ctx.getData('increment'));
                            ctx.jumpTo('cond#1');
                            },
                            onFail: (ctx) => {
                                ctx.jumpTo('cond#1');
                            },
                        }
                    })
                    .afterAll((ctx) => console.log(`lowerBound is ${ctx.getData('lowerBound')}`))
                    .build();

const ruleEngine = new RuleEngine();

ruleEngine.run([
    {
        rules: [loopContinueRule],
        facts: []
    }
]);

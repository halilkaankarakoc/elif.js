import { RuleBuilder, RuleEngine, Facts } from '../../index';

const ruleBuilder = new RuleBuilder();

const loopRule = ruleBuilder
                    .name('loop rule')
                    .description('loop rule description')
                    .beforeAll((ctx) => {
                        ctx.setData('lowerBound', 0);
                        ctx.setData('upperBound', 5);
                        ctx.setData('increment', 1);
                        ctx.setData('number', 1);
                    })
                    .when({
                        id: 'cond#1', 
                        description: 'for', 
                        condition: (ctx) => ctx.getData('lowerBound') < ctx.getData('upperBound'), 
                        hooks: {
                            onSuccess: (ctx) => {
                            ctx.setData('number', 2 * ctx.getData('lowerBound'));
                            ctx.setData('lowerBound', ctx.getData('lowerBound') + 1);
                            ctx.jumpTo('cond#1');
                            },
                            onFail: (ctx) => {
                                ctx.stop();
                            },
                        }
                    })
                    .afterAll((ctx) => console.log(ctx.getData('number')))
                    .build();

const ruleEngine = new RuleEngine();

ruleEngine.run([
    {
        rules: [loopRule],
        facts: []
    }
]);

import { RuleBuilder, RuleEngine } from '../../index';

const ruleBuilder = new RuleBuilder();

function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const counterRule = ruleBuilder
                    .name('counter rule')
                    .description('counter rule description')
                    .beforeAll(async (ctx) => {
                        ctx.setData('start', ctx.facts.get('start'));
                        ctx.setData('finish', ctx.facts.get('finish'));
                        ctx.setData('diff', ctx.facts.get('diff'));
                        console.log('Counter Started');
                    })
                    .afterAll(async () => {
                        console.log('Counter finished');
                    })
                    .when({
                        id: 'cond#1', 
                        condition: (ctx) => ctx.getData('start') !== 0, 
                        hooks: {
                            onSuccess: async (ctx) => {
                                console.log(ctx.getData('start'));
                                await sleep(1000);
                                ctx.setData('start', ctx.getData('start') - ctx.getData('diff'));
                                ctx.jumpTo('cond#1');
                            },
                            onFail: (ctx) =>  console.log(ctx.getData('finish')),
                        }
                    })
                    .build();

const ruleEngine = new RuleEngine();

ruleEngine.run([
    {
        rules: [counterRule],
        facts: [{
            start: 10,
            finish: 0,
            diff: 1
        }]
    }
]);
import { RuleBuilder, RuleEngine, Facts } from '../../index';

const ruleBuilder = new RuleBuilder();

const temperatureRule = ruleBuilder
                    .name('temperature rule')
                    .description('temperature rule description')
                    .when({
                        id: 'cond#1', 
                        description: 'COLD', 
                        condition: (ctx) => ctx.facts.get('temperature') >= 0 && ctx.facts.get('temperature') < 15, 
                        hooks: {
                            onSuccess: (ctx) => ctx.setData('weather', 'COLD'),
                            onFail: (ctx) => ctx.next(),
                        }
                        
                    })
                    .when({
                        id: 'cond#2', description: 
                        'WARM', 
                        condition: (ctx) => ctx.facts.get('temperature') >= 15 && ctx.facts.get('temperature') < 25, 
                        hooks: {
                            onSuccess: (ctx) => ctx.setData('weather', 'WARM'),
                            onFail: (ctx) => ctx.next(),
                        }
                    })
                    .when({
                        id: 'cond#3', description: 'HOT', 
                        condition: (ctx) => ctx.facts.get('temperature') >= 25 && ctx.facts.get('temperature') < 40, 
                        hooks: {
                            onSuccess: (ctx) => ctx.setData('weather', 'HOT'),
                            onFail: (ctx) => ctx.next(),
                        }
                    })
                    .when({
                        id: 'cond#4', 
                        description: 'HELL', 
                        condition: (ctx) => ctx.facts.get('temperature') >= 40, 
                        hooks: {
                            onSuccess: (ctx) => ctx.setData('weather', 'HELL'),
                        }
                    })
                    .afterAll((ctx) => console.log(`Result is ${ctx.getData('weather')}`))
                    .build();

const temperatureFact = new Facts();

temperatureFact.add('temperature', 55);


const ruleEngine = new RuleEngine();

const result = ruleEngine.run([
    {
        rules: [temperatureRule],
        facts: [temperatureFact]
    }
]);
console.log(result);
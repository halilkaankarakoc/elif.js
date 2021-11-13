import { RuleBuilder, RuleEngine, Facts } from '../../index';

const usernameRule = new RuleBuilder()
                    .name('username rule')
                    .description('simple form validation rule')
                    .beforeAll(() => console.log('username beforeAll'))
                    .afterAll(() => console.log('username afterAll'))
                    .when({
                        id: 'username#empty',
                        description: 'cannot be empty',
                        condition: (ctx) => !!ctx.facts.get('username'),
                        hooks: {
                            onSuccess: () => console.log('username#empty passed!'),
                            onFail: () =>  console.log(`username#empty failed.`),
                        }
                    })
                    .when({
                        id: 'username#length',
                        description: '4 or more characters',
                        condition: (ctx) => ctx.facts.get('username').length >= 4,
                        hooks: {
                            onSuccess: () => console.log('username#length passed!'),
                            onFail: () =>  console.log(`username#length failed.`),
                        }
                    })
                    .build();

const passwordRule = new RuleBuilder()
                    .name('password rule')
                    .description('simple form validation rule')
                    .beforeAll(() => console.log('password beforeAll'))
                    .afterAll(() => console.log('password afterAll'))
                    .when({
                        id: 'password#empty',
                        description: 'cannot be empty',
                        condition: (ctx) => !!ctx.facts.get('password'),
                        hooks: {
                            onSuccess: () => console.log('password#empty passed!'),
                            onFail: () =>  console.log(`password#empty failed.`),
                        }
                    })
                    .when({
                        id: 'password#length',
                        description: '5 or more characters',
                        condition: (ctx) => ctx.facts.get('password').length >= 5,
                        hooks: {
                            onSuccess: () => console.log('password#length passed!'),
                            onFail: () =>  console.log(`password#length failed.`),
                        }
                    })
                    .build();

const ruleEngine = new RuleEngine();

const facts1 = {
    username: 'kaan', 
    password: '12345'
};

const result = ruleEngine.run([
    {
        rules: [usernameRule, passwordRule],
        facts: [facts1]
    }
]);

console.log(result);
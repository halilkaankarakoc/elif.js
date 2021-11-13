import { RuleBuilder, RuleEngine, Facts } from '../../src/index';

const ruleBuilder = new RuleBuilder();

const loanRule = ruleBuilder
                    .name('loan rule')
                    .description('loan rule description')
                    .when({
                        id: 'cond#1', 
                        description: 'Age must be greater than or equal to 18', 
                        condition: (ctx) => ctx.facts.get('age') >= 18, 
                        hooks: {
                            onSuccess: () => console.log('Condition#1 passed!'),
                            onFail: (ctx) =>  console.log(`Condition#1 failed because age is ${ctx.facts.get('age')}`),
                        }
                    })
                    .when({
                        id: 'cond#2', 
                        description: 'Credit score must be greater than or equal to 1000',
                        condition: (ctx) => ctx.facts.get('creditScore') >= 1000, 
                        hooks: {
                            onSuccess: () => console.log('Condition#2 passed!'),
                            onFail: (ctx) => console.log(`Condition#2 failed because credit score is ${ctx.facts.get('creditScore')}`)
                        }
                    })
                    .when({
                        id: 'cond#', 
                        description: 'Salary must be 2x greater than or equal to demanded loan', 
                        condition: (ctx) => ctx.facts.get('salary') >= 2 * ctx.facts.get('demandedLoan'),
                        hooks: {
                            onSuccess: () => console.log('Condition#3 passed!'),
                            onFail: (ctx) => console.log(`Condition#3 failed because salary is ${ctx.facts.get('salary')} but demanded loan is ${ctx.facts.get('demandedLoan')}`)
                        }
                        
                    })
                    .build();

const personFacts = new Facts();

personFacts.add('age', 18);
personFacts.add('creditScore', 1000);
personFacts.add('salary', 2000);
personFacts.add('demandedLoan', 1000);

const ruleEngine = new RuleEngine();

ruleEngine.run([
    {
        rules: [loanRule],
        facts: [personFacts]
    }
]);
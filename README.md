
<br />
<p align="center">
  <a href="https://github.com/halilkaankarakoc/elif.js">
      <img src="https://icon-library.com/images/rule-icon/rule-icon-24.jpg" alt="Logo" width="125" height="125">
  </a>

  <h3 align="center">elif.js</h3>

  <p align="center">
    Simple yet powerful rule engine
  </p>
</p>

## Installation

```bash
$ npm install elif.js
or
$ yarn add elif.js
```

### Quick Start
This is a basic example.
```ts
import { RuleBuilder, RuleEngine, Facts } from 'elif.js';
// or 
// const { RuleBuilder, RuleEngine, Facts } = require('elif.js');

const ruleBuilder = new RuleBuilder();

const rule = ruleBuilder
	.name('age rule')
	.description('age rule description')
	.beforeAll((ctx) => console.log('it runs first'))
	.afterAll((ctx) => console.log('it runs last'))
	.when({		
	  id: 'cond#1',
	  description: 'Age must be greater than or equal to 18',
	  condition: (ctx) =>  ctx.facts.get('age') >= 18,
	  hooks: {
	    onBefore: (ctx) => console.log('it runs before every condition check'),
	    onSuccess: (ctx) => console.log('cond#1 passed!'),
  	    onFail: (ctx) => console.log(`cond#1 failed because age is ${ctx.facts.get('age')}`),
            onAfter: (ctx) => console.log('it runs after onSuccess or onFail')
	  }
	})
	.build();

const facts = new Facts();
facts.add('age', 18);

// or
// const facts = { age: 18 };

const ruleEngine = new RuleEngine();

ruleEngine.run([
  {
    rules: [rule],
    facts: [facts]
  }
]);
```

## Examples


## Basic Example

Let's define a loan rule.
Rules
* age must be greater than or equal to 18
* credit score must be greater than or equal to 1000
* Salary must be 2x greater than or equal to demanded loan

```ts
const loanRule = ruleBuilder
	.name('loan rule')
	.description('loan rule description')
	.when({
	  id:  'cond#1',
      description:  'Age must be greater than or equal to 18',
	  condition: (ctx) => ctx.facts.get('age') >= 18,
	  hooks: {
		onSuccess: () => console.log('Condition#1 passed!'),
		onFail: (ctx) => console.log(`Condition#1 failed because age is ${ctx.facts.get('age')}`),
	  }
	})
	.when({
	  id:  'cond#2',
	  description:  'Credit score must be greater than or equal to 1000',
	  condition: (ctx) => ctx.facts.get('creditScore') >= 1000,
	  hooks: {
	    onSuccess: () => console.log('Condition#2 passed!'),
	    onFail: (ctx) => console.log(`Condition#2 failed because credit score is ${ctx.facts.get('creditScore')}`)
	  }
	})
	.when({
	  id:  'cond#3',
	  description:  'Salary must be 2x greater than or equal to demanded loan',
	  condition: (ctx) => ctx.facts.get('salary') >= 2 * ctx.facts.get('demandedLoan'),
	  hooks: {
	    onSuccess: () => console.log('Condition#3 passed!'),
		onFail: (ctx) => console.log(`Condition#3 failed because salary is ${ctx.facts.get('salary')} but demanded loan is ${ctx.facts.get('demandedLoan')}`)
	  }
	})
	.build();
	
const personFacts = new Facts();

personFacts.add('age',18);
personFacts.add('creditScore', 1000);
personFacts.add('salary', 2000);
personFacts.add('demandedLoan', 1000);
```
## Advanced Example

With context actions ( next(), stop(), jumpTo(conditionId) ) and async execution support you can make a counter.
This counter starts from 10 and count down to 0 in every 1 second.
```ts
function  sleep(ms: number) {
  return  new  Promise((resolve) => {
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
	  id:  'cond#1',
	  condition: (ctx) =>  ctx.getData('start') !== 0,
	  hooks: {
	    onSuccess:  async (ctx) => {
	      console.log(ctx.getData('start'));
		  await  sleep(1000);
		  ctx.setData('start', ctx.getData('start') - ctx.getData('diff'));
		  ctx.jumpTo('cond#1');
		},
		onFail: (ctx) =>  console.log(ctx.getData('finish')),
	 }
	})
	.build();
```

or 

you can even simulate a loop

```ts
const loopBreakRule = ruleBuilder
	.name('loop break rule')
	.description('loop break rule description')
	.beforeAll((ctx) => {
	  ctx.setData('lowerBound', 0);
	  ctx.setData('upperBound', 5);
	  ctx.setData('increment', 1);
	})
	.when({
	  id:  'cond#1',
	  description:  'step#1',
	  condition: (ctx) => ctx.getData('lowerBound') < ctx.getData('upperBound'),
	  hooks: {
	    onSuccess: (ctx) => {
		  console.log(`lowerBound is ${ctx.getData('lowerBound')}`);
		  ctx.setData('lowerBound', ctx.getData('lowerBound') + ctx.getData('increment'));
		  ctx.jumpTo('cond#2');
	    },
	    onFail: (ctx) => ctx.stop(),
     }
	})
	.when({
	  id:  'cond#2',
      description:  'step#2',
	  condition: (ctx) =>  ctx.getData('lowerBound') === 3,
	  hooks: {
		onSuccess: (ctx) => ctx.stop(),
		onFail: (ctx) => ctx.jumpTo('cond#1');
	  }
	})
    .afterAll((ctx) =>  console.log(`lowerBound is ${ctx.getData('lowerBound')}`))
	.build();
```

NOTE: When context actions ( next(), stop(), jumpTo(conditionId) ) is called, it does not immediately break the condition. It just triggers. Hence always the execution completes and onAfter hook is called.


#### See the other [examples](https://github.com/halilkaankarakoc/elif.js/tree/main/examples)
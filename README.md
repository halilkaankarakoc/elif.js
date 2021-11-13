
##  elif
 _Simple yet powerful rule engine_

```ts
import { RuleBuilder, RuleEngine, Facts } from 'elif.js';

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

## Installation

```bash
$ npm install elif.js
```

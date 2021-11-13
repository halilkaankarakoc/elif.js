import { State } from '../state';
import { StateManager } from '../state-manager';

export class BeforeAllState implements State {
    private stateMachine: StateManager;

    constructor(stateMachine: StateManager) {
        this.stateMachine = stateMachine;
    }

    next() {
        this.stateMachine.setAction({name: 'NO_ACTION'});
    }

    stop() {
        this.stateMachine.setAction({name: 'NO_ACTION'});
    }

    jumpTo(conditionName: string) {
        this.stateMachine.setAction({name: 'NO_ACTION'});
    }
}
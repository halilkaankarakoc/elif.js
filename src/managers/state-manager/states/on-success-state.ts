import { State } from '../state';
import { StateManager } from '../state-manager';

export class OnSuccessState implements State {
    private stateMachine: StateManager;

    constructor(stateMachine: StateManager) {
        this.stateMachine = stateMachine;
    }
    
    next() {
        this.stateMachine.setAction({name: 'NEXT'});
    }

    stop() {
        this.stateMachine.setAction({name: 'STOP'});
    }

    jumpTo(conditionName: string) {
        this.stateMachine.setAction({name: 'JUMP_TO', data: {to: conditionName}});
    }
}
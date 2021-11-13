import { State } from './state';
import { OnFailState } from './states/on-fail-state';
import { OnAfterState } from './states/on-after-state';
import { OnBeforeState } from './states/on-before-state';
import { OnSuccessState } from './states/on-success-state';

export type Action = {
    name: string;
    data?: {
        to: string;
    }
}

export class StateManager {
    public onBeforeState: State;
    public successState: State;
    public failState: State;
    public onAfterState: State;
    public state: State;
    public action: Action = {name: 'NO_ACTION'};

    constructor() {
        this.onBeforeState = new OnBeforeState(this);
        this.successState = new OnSuccessState(this);
        this.failState = new OnFailState(this);
        this.onAfterState = new OnAfterState(this);
        this.state = new OnBeforeState(this);
    }

    next() {
        this.state.next();
    }

    stop() {
        this.state.stop();
    }

    jumpTo(conditionName: string) {
        this.state.jumpTo(conditionName);
    }

    setState(state: State) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    setAction(action: Action) {
        this.action = action;
    }

    getAction() {
        return this.action;
    }

    reset() {
        this.setState(new OnBeforeState(this));
        this.setAction({name: 'NO_ACTION'});
    }
}
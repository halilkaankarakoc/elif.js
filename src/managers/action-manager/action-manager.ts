import { StateManager } from '../state-manager';

// TODO duplication also in state-manager.ts
export type Action = {
    name: string;
    data?: {
        to: string;
    }
}

export class ActionManager {
    constructor(private _stateManager: StateManager) { }

    next() {
        this._stateManager.next();
    }

    stop() {
        this._stateManager.stop();
    }

    jumpTo(conditionName: string) {
        this._stateManager.jumpTo(conditionName);
    }

    getAction() {
        return this._stateManager.getAction();
    }

    setAction(action: Action) {
        this._stateManager.setAction(action);
    }
}
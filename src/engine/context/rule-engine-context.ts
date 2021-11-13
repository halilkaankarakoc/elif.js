import { ActionManager } from '../../managers/action-manager/action-manager';
import { Facts } from '../../facts/facts';
import { StateManager } from '../../managers/state-manager/state-manager';

export class RuleEngineContext {
    private _facts: Facts;
    private _data: {[key: string]: any} = {};
    private _actionManager: ActionManager;
    private _stateManager: StateManager;

    constructor() {
        this._stateManager = new StateManager();
        this._actionManager = new ActionManager(this._stateManager)
    }

    setFacts(facts: Facts) {
        this._facts = facts;
    }

    setData(key: string, value: any) {
        this._data[key] = value;
    }

    getData(key: string) {
        return this._data[key];
    }

    get data() {
        return this._data;
    }

    get facts() {
        return this._facts;
    }

    get actionManager() {
        return this._actionManager;
    }

    get stateManager() {
        return this._stateManager;
    }

    next() {
        this.actionManager.next();
    }

    stop() {
        this.actionManager.stop();
    }

    jumpTo(conditionName: string) {
        this.actionManager.jumpTo(conditionName);
    }
}
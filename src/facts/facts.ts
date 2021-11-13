export class Facts {
    private _facts: {[key: string]: string} = {};

    add(key: string, value: any) {
        this._facts[key] = value;
    }
    
    get(key: string): any {
        return this._facts[key];
    }

    get facts () {
        return this._facts;
    }

    toObject() {
        return this._facts;
    }
}
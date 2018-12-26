import ICrud from '../interfaces/icrud'

export class ContextStrategy extends ICrud {
    constructor(strategy) {
        super()
        this._db = strategy;
    }

    create(item) {
        return this._db.create(item);
    }
    read(query) {
        return this._db.read(query);
    }
    update(id, item) {
        return this._db.update(id, item);
    }
    delete(id) {
        return this._db.delete(id);
    }
    isConnected() {
        return this._db.isConnected();
    }
    connect() {
        return this._db.connect();
    }
}
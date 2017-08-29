export default class Ship {
    constructor(name, lenght, orientation) {
        this._name = name;
        this._lenght = lenght;
        this._orientation = orientation;
    }
    get lenght() {
        return this._lenght;
    }
    get orientation() {
        return this._orientation;
    }
    get name() {
        return this._name;
    }
}
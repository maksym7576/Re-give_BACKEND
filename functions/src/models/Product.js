class Product {
    constructor(name, description, uid, imageUrl, objectType, location) {
        this.name = name;
        this.description = description;
        this.uid = uid;
        this.imageUrl = imageUrl;
        this.objectType = objectType;
        this.location = location;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres');
        }
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get uid() {
        return this._uid;
    }

    set uid(value) {
        this._uid = value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(value) {
        this._imageUrl = value;
    }

    get objectType() {
        return this._objectType;
    }

    set objectType(value) {
        this._objectType = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }
}

module.exports = Product;

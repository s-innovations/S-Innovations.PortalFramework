     
export default class siStorage<T> {

    constructor(private name: string, private store: Storage, private ns: string = "") {

    }

    get() {
        var item = this.store.getItem(this.ns + this.name);

        if (item) {
            return <T>JSON.parse(item);

        }
    }
    set(value?: T) {

        if (value) {
            var val = JSON.stringify(value);
            this.store.setItem(this.ns + this.name, val);

        }
        else {
            this.store.removeItem(this.ns + this.name);
        }
    }
}

export default class LinkedDeepMap {

    constructor(depth) {

        Object.defineProperty(this, 'map', {
            writable: false,
            configurable: false,
            enumerable: false,
            value: new Map()
        });

        Object.defineProperty(this, 'size', {
            configurable: false,
            get: () => this.map.size,
            enumerable: true
        });


        if (typeof depth !== 'number' || !isFinite(depth) || depth !== parseInt(depth) || depth < 2) {
            throw Error(`depth should be integer between greater than 1`);
        }

        Object.defineProperty(this, 'depth', {
            writable: false,
            configurable: false,
            value: depth
        });
    }

    get(...path) {
        if (path.length !== this.depth) {
            throw new Error(`Path should be length of map depth: ${this.depth}`);
        }
        return path.reduce((node, key) => {
            if (node.has(key)) {
                return node.get(key);
            } else {
                throw new Error(`Element not found in path: ${path.join(';')}`);
            }
        }, this.map);
    }

    has(...path) {
        if (path.length !== this.depth) {
            throw new Error(`Path should be length of map depth: ${this.depth}`);
        }
        let node = this.map;
        const notFound = path.some((key) => {
            if (node.has(key)) {
                node = node.get(key);
                return false;
            } else {
                return true;
            }
        });
        return !notFound;
    }

    set(...args) {

        if (args.length - 1 !== this.depth) {
            throw new Error(`Path should be length of map depth: ${this.depth}`);
        }

        const value = args.pop();
        const lastKey = args.pop();
        const path = args;

        let node = this.map;
        path.forEach(key => {
            if (node.has(key)) {
                node = node.get(key);
            } else {
                node.set(key, new Map());
                node = node.get(key);
            }
        });
        node.set(lastKey, value);
    }

    delete(...path) {
        if (path.length !== this.depth) {
            throw new Error(`Path should be length of map depth: ${this.depth}`);
        }
        const lastKey = path.pop();
        let cuttedChainTop = null;
        let cuttedChainKey = null;
        const node = path.reduce((node, key, i) => {

            if (node.has(key)) {
                const nextNode = node.get(key);
                if (i !== path.length - 1 && nextNode.size === 1 && !cuttedChainTop) {
                    cuttedChainTop = node;
                    cuttedChainKey = key;
                }
                return nextNode;
            } else {
                throw new Error(`Element not found in path: ${path.join(';')}`);
            }

        }, this.map);

        if (!node.has(lastKey)) {
            throw new Error(`Element not found in path: ${path.join(';')}`);
        }

        node.delete(lastKey);

        if (cuttedChainTop) {
            cuttedChainTop.delete(cuttedChainKey);
        }
    }


    clear() {
        this.map.clear();
    }

}
import LinkedDeepMap from './linked-deep-map/linked-deep-map';

//todo: use WeakDeepMap here

const tupleFactories = new Map();

const createCollection = (...args) => {
    return args.reduce((collection, item)=>{
        return {...collection, item};
    },{})
};

class TupleFactory {

    constructor(length) {
        this.cachesTuples = new LinkedDeepMap(length+1);
    }

    get(...args) {
        if(this.cachesTuples.has(...args)){
            return this.cachesTuples.get(...args);
        }else{
            this.cachesTuples.set(...args, createCollection(...args))
        }
    }
}


class TupleFactoryService {

    static get(length) {

        if (tupleFactories.has(length)) {
            return tupleFactories.get(length);
        }

        return new TupleFactory(length);
    }
}

export default function tuple(...args) {
    const length = args.length;
    if (typeof length !== 'number' || !isFinite(length) || length !== parseInt(length) || length < 2) {
        throw Error(`length should be integer between greater than 1`);
    }
    const tupleFactory = TupleFactoryService.get(length);
    return tupleFactory.get(...args);
}
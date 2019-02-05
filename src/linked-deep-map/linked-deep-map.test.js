import DeepMap from "./deep-map";

describe('DeepMap', () => {

    it('has method returns true, if value on path exists', () => {
        const map = new DeepMap(2);
        map.set(1, 2, 10);
        expect(map.has(1, 2)).toBe(true);
    });

    it('has method returns false, if value on path doesn`t exist', () => {
        const map = new DeepMap(2);
        map.set(1, 2, 10);
        expect(map.has(1, 3)).toBe(false);
    });

    it('get method returns correct value', () => {
        const map = new DeepMap(2);
        map.set(1, 2, 10);
        expect(map.get(1, 2)).toBe(10);
    });

    it('delete method deletes value', () => {
        const map = new DeepMap(2);
        map.set(1, 2, 10);
        map.delete(1, 2);
        expect(map.has(1, 2)).toBe(false);
    });


});
import { LRUCache } from './double-linked-list';

describe("LRUCache", () => {
    it("returns correct values for put and get", () => {
        const cache = new LRUCache<number, string>(2);
        cache.put(1, "one");
        cache.put(2, "two");

        expect(cache.get(1)).toBe("one");
    });

    it("evicts least recently used item", () => {
        const cache = new LRUCache<number, string>(2);
        cache.put(1, "one");
        cache.put(2, "two");
        cache.put(3, "three"); // evicts key 1

        expect(cache.get(1)).toBeUndefined();
        expect(cache.get(2)).toBe("two");
        expect(cache.get(3)).toBe("three");
    });

    it("updates recency on get", () => {
        const cache = new LRUCache<number, string>(2);
        cache.put(1, "one");
        cache.put(2, "two");
        cache.get(1);           // now 2 is LRU
        cache.put(3, "three");  // evicts key 2

        expect(cache.get(2)).toBeUndefined();
        expect(cache.get(1)).toBe("one");
        expect(cache.get(3)).toBe("three");
    });

    it("updates value on repeated put", () => {
        const cache = new LRUCache<number, string>(2);
        cache.put(1, "one");
        cache.put(1, "ONE");

        expect(cache.get(1)).toBe("ONE");
    });

    it("preserves order of recency", () => {
        const cache = new LRUCache<number, string>(2);
        cache.put(1, "one");
        cache.put(2, "two");
        cache.get(1);
        expect(cache.keys()).toEqual([1, 2]);
    });
});


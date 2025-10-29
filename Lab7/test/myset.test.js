const MySet = require('../src/MySet');

describe('MySet', () => {
    let set;

    beforeEach(() => {
        set = new MySet();
    });

    test('createEmptySet', () => {
        expect(set.isEmpty()).toBe(true);
        expect(() => set.getFirst()).toThrow('Set is empty');
        expect(() => set.getLast()).toThrow('Set is empty');
        expect(set.size()).toBe(0);
    });

    test('addItem', () => {
        set.add(2);
        expect(set.isEmpty()).toBe(false);
        expect(set.getFirst()).toBe(2);
        expect(set.getLast()).toBe(2);
        expect(set.size()).toBe(1);

        set.add(3);
        expect(set.isEmpty()).toBe(false);
        expect(set.getFirst()).toBe(3); 
        expect(set.getLast()).toBe(2);
        expect(set.size()).toBe(2);

        set.add(4);
        set.add(3); 
        expect(set.getLast()).toBe(2);
        expect(set.size()).toBe(3); 
    });

    test('contains', () => {
        expect(set.contains(5)).toBe(false);
        set.add(5);
        set.add(3);
        set.add(2);
        expect(set.contains(5)).toBe(true);
        expect(set.contains(2)).toBe(true);
        expect(set.contains(10)).toBe(false);
    });

    test('removeItem', () => {
        expect(set.delete(5)).toBe(false);
        set.add(5);
        expect(set.delete(5)).toBe(true);
        expect(set.size()).toBe(0);

        set.add(5);
        set.add(3);
        set.add(2);
        expect(set.delete(2)).toBe(true);
        expect(set.size()).toBe(2);
        expect(set.delete(5)).toBe(true);
        expect(set.size()).toBe(1);
    });

    test('clear', () => {
        set.clear();
        expect(() => set.getFirst()).toThrow('Set is empty');
        expect(() => set.getLast()).toThrow('Set is empty');
        expect(set.size()).toBe(0);

        set.add(5);
        set.add(2);
        set.clear();
        expect(() => set.getFirst()).toThrow('Set is empty');
        expect(() => set.getLast()).toThrow('Set is empty');
        expect(set.size()).toBe(0);
    });

    test('isEmpty', () => {
        expect(set.isEmpty()).toBe(true);
    });

    test('getFirst', () => {
        expect(() => set.getFirst()).toThrow('Set is empty');
        set.add(5);
        expect(set.getFirst()).toBe(5);
    });

    test('getLast', () => {
        expect(() => set.getLast()).toThrow('Set is empty');
        set.add(5);
        expect(set.getLast()).toBe(5);
    });

    test('size', () => {
        expect(set.size()).toBe(0);
        set.add(5);
        expect(set.size()).toBe(1);
        set.add(3);
        expect(set.size()).toBe(2);
    });

    test('toArray', () => {
        expect(set.toArray()).toEqual([]);
        set.add(5);
        set.add(3);
        const arr = set.toArray();
        expect(arr).toContain(5);
        expect(arr).toContain(3);
        expect(arr.length).toBe(2);
    });
    test('remove возвращает false в классе LinkedListNode когда число не представлено (для 100% покрытия)', () => {
        set.add(5);
        set.add(10);
        expect(set.delete(15)).toBe(false);
        expect(set.size()).toBe(2);
    });
});
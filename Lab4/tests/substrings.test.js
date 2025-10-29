const Substrings = require('../src/Substrings')

describe('Substrings', () => {
    describe('Путь 1: pos < 0', () => {
        test('pos = -2, str = "h", substring = "x" → ""', () => {
            const s = new Substrings();
            expect(s.InsertSubstring('h', -2, 'x')).toBe('');
        });
    });
    describe('Путь 2:pos > str.length', () => {
        test('pos = 10, str = "h", substring = "x" → ""', () => {
            const s = new Substrings();
            expect(s.InsertSubstring('h', 10, 'x')).toBe('');
        });
    });

    describe('Путь 3: (1,3,5,6,7,12)', () => {
        test('str = "", pos = 0, substring = "x" → ""', () => {
            const s = new Substrings();
            expect(s.InsertSubstring('', 0, 'x')).toBe('');
        });
    });

    describe('Путь 4: (1,3,5,6,7,9,10,11,8,7,12)', () => {
        test('str = "h", pos = 0, substring = "x" → "xh"', () => {
            const s = new Substrings();
            expect(s.InsertSubstring('h', 0, 'x')).toBe('xh');
        });
    });

    describe('Путь 5: (1,3,5,6,7,9,11,8,7,9,10,11,8,7,12)', () => {
        test('str = "hl", pos = 1, substring = "x" → "hxl"', () => {
            const s = new Substrings();
            expect(s.InsertSubstring('hl', 1, 'x')).toBe('hxl');
        });
    });

    describe('Путь 6: (1,3,5,6,7,9,10,11,8,7,9,11,8,7,12)', () => {
        test('str = "hl", pos = 0, substring = "x" → "xhl"', () => {
            const s = new Substrings();
            expect(s.InsertSubstring('hl', 0, 'x')).toBe('xhl');
        });
    });
    
    test('str не передан, pos = 0, substring = "x" → "x"', () => {
        const s = new Substrings();
        expect(s.InsertSubstring(undefined, 0, 'x')).toBe('');
    });
    test('pos = str.length', () => {
        const s = new Substrings();
        expect(s.InsertSubstring('ab', 2, 'x')).toBe('ab');
    })
});
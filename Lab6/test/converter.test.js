const BaseConverter = require('../src/Converter');

describe('Converter', () => {
    let converter;

    beforeEach(() => {
        converter = new BaseConverter();
    });

    describe('Правильные классы эквивалентности', () => {
        test('Строка: 0-9, A-B', () => {
            expect(converter.from12To16('0')).toBe('0');
            expect(converter.from12To16('1')).toBe('1');
            expect(converter.from12To16('9')).toBe('9');
            expect(converter.from12To16('A')).toBe('A');
            expect(converter.from12To16('B')).toBe('B');
        });
    });

    describe('Неправильные классы эквивалентности', () => {
        test('Строка не из перечня: 0-9, A-B', () => {
            expect(() => converter.from12To16('C')).toThrow('Некорректные входные данные');
            expect(() => converter.from12To16('XYZ')).toThrow('Некорректные входные данные');
            expect(() => converter.from12To16('1G')).toThrow('Некорректные входные данные');
        });

        test('Не строка', () => {
            expect(() => converter.from12To16(null)).toThrow('Input должен быть не пустой строкой');
            expect(() => converter.from12To16(undefined)).toThrow('Input должен быть не пустой строкой');
            expect(() => converter.from12To16(123)).toThrow('Input должен быть не пустой строкой');
            expect(() => converter.from12To16({})).toThrow('Input должен быть не пустой строкой');
        });

        test('Пустая строка', () => {
            expect(() => converter.from12To16('')).toThrow('Input должен быть не пустой строкой');
        });

        test('Строка > Number.MAX_SAFE_INTEGER', () => {
            expect(() => converter.from12To16('702273685B77A28')).toThrow('Превышение Number.MAX_SAFE_INTEGER');
        });
    });

    describe('Граничные значения', () => {
        test('"0"', () => {
            expect(converter.from12To16('0')).toBe('0');
        });

        test('"1"', () => {
            expect(converter.from12To16('1')).toBe('1');
        });

        test('"B"', () => {
            expect(converter.from12To16('B')).toBe('B');
        });

        test('"702273685B77A27" (Number.MAX_SAFE_INTEGER)', () => {
            expect(converter.from12To16('702273685B77A27')).toBe('1FFFFFFFFFFFFF');
        });

        test('"702273685B77A28" (Number.MAX_SAFE_INTEGER + 1)', () => {
            expect(() => converter.from12To16('702273685B77A28')).toThrow('Превышение Number.MAX_SAFE_INTEGER');
        });

        test('"702273685B77A26" (Number.MAX_SAFE_INTEGER - 1)', () => {
            expect(converter.from12To16('702273685B77A26')).toBe('1FFFFFFFFFFFFE');
        });
    });

    describe('Пути', () => {
        describe('Путь 1: input = null → Error', () => {
            test('input = null → Error', () => {
                expect(() => converter.from12To16(null)).toThrow('Input должен быть не пустой строкой');
            });
        });

        describe('Путь 2: input = "C" → Error', () => {
            test('input = "C" → Error', () => {
                expect(() => converter.from12To16('C')).toThrow('Некорректные входные данные');
            });
        });

        describe('Путь 3: input = "0" → "0"', () => {
            test('input = "0" → "0"', () => {
                expect(converter.from12To16('0')).toBe('0');
            });
        });

        describe('Путь 4: input = "1B" → "17"', () => {
            test('input = "1B" → "17"', () => {
                expect(converter.from12To16('1B')).toBe('17');
            });

        });

        describe('Путь 5: input = "702273685B77A28" → Error', () => {
            test('input = "702273685B77A28" → Error', () => {
                expect(() => converter.from12To16('702273685B77A28')).toThrow('Превышение Number.MAX_SAFE_INTEGER');
            });
        });
    });
    test('строка начинается с некорректного символа', () => {
        expect(() => converter.from12To16('X12')).toThrow('Некорректные входные данные');
    })
});
const { describe, test, beforeEach, expect } = require('@jest/globals');
const {AreaLib} = require('my-area-lib');

describe('AreaLib', () => {
    let Area;

    beforeEach(() => {
        Area = new AreaLib(5); 
    });

    describe('Точки, входящие в область', () => {
        test('Центр (0, 0)', () => {
            expect(Area.IsPointInArea(0, 0)).toBe(true);
        });

        test('Правая полуплоскость: (3, 3)', () => {
            expect(Area.IsPointInArea(3, 3)).toBe(true);
        });

        test('Правая полуплоскость: (5, 0) — на границе', () => {
            expect(Area.IsPointInArea(5, 0)).toBe(true);
        });

        test('Левая полуплоскость, верхний сектор: (-3, 3)', () => {
            expect(Area.IsPointInArea(-3, 3)).toBe(true);
        });

        test('Левая полуплоскость, верхний сектор: (-5, 0)', () => {
            expect(Area.IsPointInArea(-5, 0)).toBe(false);
        });
        test('Левая полуплоскость, нижний сектор: (-4, -3)', () => {
            expect(Area.IsPointInArea(-4, -3)).toBe(true);
        });

        test('Левая полуплоскость, нижний сектор: (0, -5) — на границе', () => {
            expect(Area.IsPointInArea(0, -5)).toBe(true);
        });
    });

    describe('Точки, не входящие в область', () => {
        test('Вне круга: (6, 0)', () => {
            expect(Area.IsPointInArea(6, 0)).toBe(false);
        });

        test('Вне круга: (-6, 0)', () => {
            expect(Area.IsPointInArea(-6, 0)).toBe(false);
        });

        test('Левая полуплоскость, верхний сектор: (-5, 5) — вне сектора', () => {
            expect(Area.IsPointInArea(-5, 5)).toBe(false);
        });

        test('Левая полуплоскость, нижний сектор: (-5, -5) — вне сектора', () => {
            expect(Area.IsPointInArea(-5, -5)).toBe(false);
        });
    });
});
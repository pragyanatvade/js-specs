import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const { integer, nat } = generators;

describe('generators', () => {
  describe('integer', () => {
    describe('generate', () => {
      it('When min === max, should generate min or max as random value', () => {
        const value = 102;
        const arb = integer({ min: value, max: value });
        const { value: val } = arb.generate({ rng: rand({ seed: 32 }) });
        expect(val).toEqual(value);
      });
      it('When max > min, should generate random values within the range [min, max]', () => {
        const min = 0;
        const max = 100;
        const arb = integer({ min, max });
        const { value } = arb.generate({ rng: rand({ seed: 1245 }) });
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
      });
      it('When max < min, should generate random values witin the range [max, min]', () => {
        const min = 100;
        const max = 0;
        const arb = integer({ min, max });
        const { value } = arb.generate({ rng: rand({ seed: 1245 }) });
        expect(value).toBeGreaterThanOrEqual(max);
        expect(value).toBeLessThanOrEqual(min);
      });
    });
    describe('shrink', () => {
      it('When called, should not generate the same value again', () => {
        const min = 0;
        const max = 100;
        const arb = integer({ min, max });
        const { shrink, value } = arb.generate({ rng: rand({ seed: 1245 }) });
        const resp = shrink().every(v => v.value !== value);
        expect(resp).toBeTruthy();
      });
      it('Should not be able to call shrink multiple times', () => {
        const min = 0;
        const max = 100;
        const arb = integer({ min, max });
        const { shrink } = arb.generate({ rng: rand({ seed: 1245 }) });
        const s1 = [...shrink()].map(v => v.value);
        const s2 = [...shrink()].map(v => v.value);
        expect(s1).toEqual(s2);
      });
      it('When shrink is called either on instance or on arbitrary, Should produce the same sequence', () => {
        const min = 0;
        const max = 100;
        const arb = integer({ min, max });
        const { shrink, value } = arb.generate({ rng: rand({ seed: 1245 }) });

        const s1 = [...shrink()].map(v => v.value);
        const s2 = [...arb.shrink(value)];
        expect(s1).toEqual(s2);
      });
    });
  });
  describe('nat', () => {
    describe('generate', () => {
      it('When min === max, should generate min or max as random value', () => {
        const value = 102;
        const arb = nat({ min: value, max: value });
        const { value: val } = arb.generate({ rng: rand({ seed: 32 }) });
        expect(val).toEqual(value);
      });
      it('When max > min, should generate random values within the range [min, max]', () => {
        const min = 0;
        const max = 100;
        const arb = nat({ min, max });
        const { value } = arb.generate({ rng: rand({ seed: 1245 }) });
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
      });
      it('When max < min, should generate random values witin the range [max, min]', () => {
        const min = 100;
        const max = 0;
        const arb = nat({ min, max });
        const { value } = arb.generate({ rng: rand({ seed: 1245 }) });
        expect(value).toBeGreaterThanOrEqual(max);
        expect(value).toBeLessThanOrEqual(min);
      });
    });
    describe('shrink', () => {
      it('When called, should not generate the same value again', () => {
        const min = 0;
        const max = 100;
        const arb = nat({ min, max });
        const { shrink, value } = arb.generate({ rng: rand({ seed: 1245 }) });
        const resp = shrink().every(v => v.value !== value);
        expect(resp).toBeTruthy();
      });
      it('Should not be able to call shrink multiple times', () => {
        const min = 0;
        const max = 100;
        const arb = nat({ min, max });
        const { shrink } = arb.generate({ rng: rand({ seed: 1245 }) });
        const s1 = [...shrink()].map(v => v.value);
        const s2 = [...shrink()].map(v => v.value);
        expect(s1).toEqual(s2);
      });
      it('When shrink is called either on instance or on arbitrary, Should produce the same sequence', () => {
        const min = 0;
        const max = 100;
        const arb = nat({ min, max });
        const { shrink, value } = arb.generate({ rng: rand({ seed: 1245 }) });

        const s1 = [...shrink()].map(v => v.value);
        const s2 = [...arb.shrink(value)];
        expect(s1).toEqual(s2);
      });
    });
  });
});

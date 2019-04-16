import helpers from '..';

const { stream } = helpers;

describe('gen', () => {
  describe('stream', () => {
    describe('iterator', () => {
      it('should have same values as its underlying', () => {
        function* g() {
          yield* [1, 2, 3, 4, 5, 45];
        }
        const s = stream({ gen: g() });
        expect([...s]).toEqual([1, 2, 3, 4, 5, 45]);
      });
      it('Should not be able iterate twice', () => {
        function* g() {
          yield* [1, 2, 3, 4, 5, 45];
        }
        const s = stream({ gen: g() });
        expect([...s]).toEqual([1, 2, 3, 4, 5, 45]);
        expect([...s]).toEqual([]);
      });
      it('Should be able to handle infinite generators', () => {
        function* g() {
          let idx = 0;
          while (true) {
            idx += 1;
            yield idx;
          }
        }
        const s = stream({ gen: g() });
        const data = [];
        for (let idx = 0; idx !== 5; idx += 1) {
          data.push(s.next().value);
        }
        expect(data).toEqual([1, 2, 3, 4, 5]);
      });
    });
    describe('nil', () => {
      it('Should instantiate an empty stream', () => {
        const s = stream().nil();
        expect([...s]).toEqual([]);
      });
    });
    describe('map', () => {
      it('Should map over all elements', () => {
        function* g() {
          yield* [1, 2, 3, 4, 5];
        }
        const s = stream({ gen: g() }).map(v => v * 2);
        expect([...s]).toEqual([2, 4, 6, 8, 10]);
      });
    });
    describe('flatMap', () => {
      it('Should apply on each element', () => {
        function* g() {
          yield* [1, 2, 3, 4, 5];
        }
        function* expand(n) {
          for (let idx = 0; idx !== n; idx += 1) {
            yield n;
          }
        }
        const s = stream({ gen: g() }).flatMap(expand);
        expect([...s]).toEqual([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]);
        expect([...s]).toEqual([]);
      });
    });
    describe('dropWhile', () => {
      it('Should drop while predicate stays valid', () => {
        function* g() {
          yield* [-4, -2, -3, 1, -8, 7];
        }
        const s = stream({ gen: g() }).dropWhile(v => v < 0);
        expect([...s]).toEqual([1, -8, 7]);
      });
      it('Should drop everything', () => {
        function* g() {
          yield* [-4, -2, -3, 1, -8, 7];
        }
        const s = stream({ gen: g() }).dropWhile(() => true);
        expect([...s]).toEqual([]);
      });
      it('Should drop nothing', () => {
        function* g() {
          yield* [-4, -2, -3, 1, -8, 7];
        }
        const s = stream({ gen: g() }).dropWhile(() => false);
        expect([...s]).toEqual([-4, -2, -3, 1, -8, 7]);
      });
    });
    describe('drop', () => {
      it('Should drop the right number of elements', () => {
        function* g() {
          yield* [1, 2, 3, 4, 5, 6];
        }
        const s = stream({ gen: g() }).drop(2);
        expect([...s]).toEqual([3, 4, 5, 6]);
      });
    });
    describe('takeWhile', () => {
      it('Should take while predicate stays valid', () => {
        function* g() {
          yield* [-4, -2, -3, 1, -8, 7];
        }
        const s = stream({ gen: g() }).takeWhile(v => v < 0);
        expect([...s]).toEqual([-4, -2, -3]);
      });
      it('Should take everything', () => {
        function* g() {
          yield* [-4, -2, -3, 1, -8, 7];
        }
        const s = stream({ gen: g() }).takeWhile(() => true);
        expect([...s]).toEqual([-4, -2, -3, 1, -8, 7]);
      });
      it('Should take nothing', () => {
        function* g() {
          yield* [-4, -2, -3, 1, -8, 7];
        }
        const s = stream({ gen: g() }).takeWhile(() => false);
        expect([...s]).toEqual([]);
      });
    });
    describe('take', () => {
      it('Should take the right number of elements', () => {
        function* g() {
          yield* [1, 2, 3, 4, 5, 6];
        }
        const s = stream({ gen: g() }).take(4);
        expect([...s]).toEqual([1, 2, 3, 4]);
      });
    });
    describe('filter', () => {
      it('Should remove undesirable values', () => {
        function* g() {
          yield* [1, 3, 4, 7, 8, 10, 1, 1, 3, 4, 4];
        }
        const s = stream({ gen: g() }).filter(v => v % 2 === 0);
        expect([...s]).toEqual([4, 8, 10, 4, 4]);
        expect([...s]).toEqual([]);
      });
    });
    describe('every', () => {
      it('Should be true if all values are ok', () => {
        function* g() {
          yield* [1, 3, 4, 7, 8, 10, 1, 1, 3, 4, 4];
        }
        expect(stream({ gen: g() }).every(v => v > 0)).toBe(true);
      });
      it('Should be true for empty streams', () => {
        function* g() {
          yield* [];
        }
        expect(stream({ gen: g() }).every(v => v > 0)).toBe(true);
      });
      it('Should be false if it starts by a failing value', () => {
        function* g() {
          yield* [0, 1, 3, 4, 7, 8, 10, 1, 1, 3, 4, 4];
        }
        expect(stream({ gen: g() }).every(v => v > 0)).toBe(false);
      });
      it('Should be false if it ends by a failing value', () => {
        function* g() {
          yield* [1, 3, 4, 7, 8, 10, 1, 1, 3, 4, 4, 0];
        }
        expect(stream({ gen: g() }).every(v => v > 0)).toBe(false);
      });
      it('Should be false if it contains a failing value', () => {
        function* g() {
          yield* [1, 3, 4, 7, 8, 10, 0, 1, 1, 3, 4, 4];
        }
        expect(stream({ gen: g() }).every(v => v > 0)).toBe(false);
      });
      // it.only('Should iterate using every', () => {
      //   function* g() {
      //     const arr = [1, 3, 4, 7, 8, 10, 1, 1, 3, 4, 4];
      //     for (let i = 0; i < arr.length; i += 1) {
      //       yield arr[i];
      //     }
      //   }
      //   const strm = stream(g());
      //   console.log([...strm]);
      //   const resp = strm.every((v) => {
      //     console.log(v);
      //     return v > 0;
      //   });
      //   expect(resp).toBe(true);
      // });
    });
    describe('has', () => {
      it('Should be true if one of the values is ok', () => {
        function* g() {
          yield* [1, 3, 4, 7, 8, 10, 1, 1, 3, 4, 4];
        }
        expect(stream({ gen: g() }).has(v => v > 9)).toEqual([true, 10]);
      });
      it('Should be true if multiple values are ok', () => {
        function* g() {
          yield* [1, 3, 4, 7, 8, 10, 1, 1, 3, 4, 4];
        }
        expect(stream({ gen: g() }).has(v => v > 4)).toEqual([true, 7]);
      });
      it('Should be false for empty streams', () => {
        function* g() {
          yield* [];
        }
        expect(stream({ gen: g() }).has(v => v > 0)).toEqual([false, null]);
      });
      it('Should be false if no value is ok', () => {
        function* g() {
          yield* [-2, -4, 0];
        }
        expect(stream({ gen: g() }).has(v => v > 0)).toEqual([false, null]);
      });
    });
    describe('join', () => {
      it('Should be able to join nothing', () => {
        function* g() {
          yield* [1, 2, 3, 4, 5];
        }
        const s = stream({ gen: g() }).join();
        expect([...s]).toEqual([1, 2, 3, 4, 5]);
      });
      it('Should be able to join another iterable', () => {
        function* g1() {
          yield* [1, 2, 3, 4, 5];
        }
        function* g2() {
          yield* [8, 9];
        }
        const s = stream({ gen: g1() }).join(g2());
        expect([...s]).toEqual([1, 2, 3, 4, 5, 8, 9]);
      });
      it('Should be able to join multiple other streams', () => {
        function* g1() {
          yield* [1, 2, 3, 4, 5];
        }
        function* g2() {
          yield* [8, 9];
        }
        const s = stream({ gen: g1() }).join(g2(), g1());
        expect([...s]).toEqual([1, 2, 3, 4, 5, 8, 9, 1, 2, 3, 4, 5]);
      });
      it('Should be able to join multiple other streams while mapping the initial stream', () => {
        function* g1() {
          yield* [1, 2, 3, 4, 5];
        }
        function* g2() {
          yield* [8, 9];
        }
        const s = stream({ gen: g1() })
          .map(v => 10 * v)
          .join(g2(), g1());
        expect([...s]).toEqual([10, 20, 30, 40, 50, 8, 9, 1, 2, 3, 4, 5]);
      });
      it('Should be able to join infinite streams', () => {
        function* g1() {
          while (true) yield 1;
        }
        function* g2() {
          while (true) yield 2;
        }
        const s = stream({ gen: g1() })
          .map(v => 10 * v)
          .join(g2())
          .take(5);
        expect([...s]).toEqual([10, 10, 10, 10, 10]);
      });
      it('Should be able to join on nil', () => {
        function* g1() {
          yield* [1, 2, 3, 4, 5];
        }
        const s = stream().nil().join(g1());
        expect([...s]).toEqual([1, 2, 3, 4, 5]);
      });
    });
    describe('getNthOrLast', () => {
      it('Should return the nth value of the stream', () => {
        function* g() {
          yield* [42, 5, 43, 8, 19];
        }
        const v = stream(g()).getNthOrLast(2);
        expect(v).toEqual(43);
      });
      it('Should return the last value if the stream is too small', () => {
        function* g() {
          yield* [42, 5, 43, 8, 19];
        }
        const v = stream(g()).getNthOrLast(20);
        expect(v).toEqual(19);
      });
      it('Should be null for empty streams', () => {
        const v = stream().nil().getNthOrLast(10);
        expect(v).toBe(null);
      });
      it('Should be able to run on infinite streams', () => {
        function* g() {
          let idx = 0;
          while (true) {
            yield idx;
            idx += 1;
          }
        }
        const v = stream(g()).getNthOrLast(10);
        expect(v).toEqual(10);
      });
    });
  });
});

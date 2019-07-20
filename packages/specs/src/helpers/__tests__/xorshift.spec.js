import helpers from '..';

const { xorshift128plus } = helpers;

describe('helpers', () => {
  describe('xorshift', () => {
    it('When seed is 42, should generate a correct sequence', () => {
      const EXPECTED_RESP = [
        360707434,
        369095983,
        3950858239,
        3947887626,
        16168590,
        1421344859,
        2870518171,
        2217138659,
        1052155425,
        621026842,
        1043411484,
        1516583733,
        2241750015,
        3622662809,
        1766990515,
        1336771195,
        4211460753,
        2946811804,
        907422698,
        3518889342,
        1098614118,
        3370407314,
        2892189892,
        2397882451,
        3654591022,
        1132850355,
        3150680,
        3643381578,
        1491222292,
        761405809,
        1968843480,
        1760316967,
        3310808056,
        1638555636,
        2354243387,
        2360132023,
        1936104288,
        3879596586,
        1655838753,
        2903758159,
        506342505,
        416912242,
        1903286618,
        781028714,
        779415411,
        1543881034,
        1559476848,
        1608259546,
        4029170696,
        879273820,
        1075427441,
        4020993165,
        1789202625,
        3641767337,
        1729328583,
        1456554395,
        1026465932,
        4127082979,
        3183248750,
        3811312776,
        3539226580,
        1895439297,
        3191505637,
        4017251616,
        2243388689,
        2046244411,
        2133668996,
        2160527408,
        1201282648,
        1886609251,
        3816737470,
        371338798,
        3899891722,
        3144550089,
        2728112299,
        133033558,
        771019989,
        2203518042,
        2588415727,
        1653147241,
        2006599692,
        2553929481,
        1975772662,
        1660727565,
        3327358198,
        3379306501,
        3959982339,
        1316205021,
        1676525066,
        1171636922,
        1227215955,
        2931314439,
        3125260681,
        3863935790,
        82446427,
        1812988429,
        2317238822,
        831446368,
        1358249696,
        1422070245
      ].map(v => v | 0); // eslint-disable-line

      const seed = 42;
      let gen = xorshift128plus(seed);
      const data = [];

      for (let i = 0; i < 100; i += 1) {
        const { value, next } = gen.next();
        data.push(value);
        gen = next;
      }
      expect(data).toEqual(EXPECTED_RESP);
    });
    it('When same seed is provided, should generate same sequence', () => {
      const seed = Math.random();
      let gen1 = xorshift128plus(seed);
      let gen2 = xorshift128plus(seed);

      const data1 = [];
      const data2 = [];
      for (let i = 0; i < 100; i += 1) {
        const { value, next } = gen1.next();
        data1.push(value);
        gen1 = next;
      }
      for (let i = 0; i < 100; i += 1) {
        const { value, next } = gen2.next();
        data2.push(value);
        gen2 = next;
      }
      expect(data1).toEqual(data2);
    });
    it('When called twice, should generate same value', () => {
      const seed = Math.random();
      let gen = xorshift128plus(seed);
      for (let i = 0; i < 100; i += 1) {
        const { value: value1, next } = gen.next();
        const { value: value2 } = gen.next();
        expect(value1).toEqual(value2);
        gen = next;
      }
    });
    it('Values within a sequence must be within -2**32 and 2**32-1', () => {
      const seed = Math.random();
      let gen = xorshift128plus(seed);
      for (let i = 0; i < 100; i += 1) {
        const { value, next } = gen.next();
        expect(value).toBeLessThanOrEqual(gen.max());
        expect(value).toBeGreaterThanOrEqual(gen.min());
        gen = next;
      }
    });
  });
});

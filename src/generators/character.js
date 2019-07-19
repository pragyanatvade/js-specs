const charArbitrary = ({
  min, max, mapToCode, map, integer
}) => {
  const iterator = n => String.fromCodePoint(mapToCode(n));
  return map(integer({ min, max }), iterator);
};

const preferPrintableMapper = (v) => {
  if (v < 95) return v + 0x20; // 0x20-0x7e
  if (v <= 0x7e) return v - 95;
  return v;
};

export const canGenerateChar = ({ integer, helpers: { map } }) => {
  const char = () => charArbitrary({
    min: 0x20, max: 0x7e, mapToCode: v => v, integer, map
  });
  return ({ char });
};

export const canGenerateHexa = ({ integer, helpers: { map } }) => {
  const hexa = () => {
    const mapToCode = n => (n < 10 ? n + 48 : n + 97 - 10);
    return charArbitrary({
      min: 0, max: 63, mapToCode, integer, map
    });
  };
  return ({ hexa });
};

export const canGenerateBase64 = ({ integer, helpers: { map } }) => {
  const base64 = () => {
    const mapToCode = (v) => {
      if (v < 26) return v + 65; // A-Z
      if (v < 52) return v + 97 - 26; // a-z
      if (v < 62) return v + 48 - 52; // 0-9
      return v === 62 ? 43 : 47; // +/
    };
    return charArbitrary({
      min: 0, max: 63, mapToCode, integer, map
    });
  };
  return ({ base64 });
};

export const canGenerateAscii = ({ integer, helpers: { map } }) => {
  const ascii = () => charArbitrary({
    min: 0, max: 63, mapToCode: preferPrintableMapper, integer, map
  });
  return ({ ascii });
};

export const canGenerateChar16bits = ({ integer, helpers: { map } }) => {
  const char16bits = () => charArbitrary({
    min: 0x0000,
    max: 0xffff,
    mapToCode: preferPrintableMapper,
    integer,
    map
  });
  return ({ char16bits });
};

export const canGenerateUnicode = ({ integer, helpers: { map } }) => {
  const unicode = () => {
    const gapSize = 0xdfff + 1 - 0xd800;

    const mapToCode = (v) => {
      if (v < 0xd800) return preferPrintableMapper(v);
      return v + gapSize;
    };
    return charArbitrary({
      min: 0x0000,
      max: 0xffff - gapSize,
      mapToCode,
      integer,
      map
    });
  };
  return ({ unicode });
};

export const canGenerateFullUnicode = ({ integer, helpers: { map } }) => {
  const fullUnicode = () => {
    const gapSize = 0xdfff + 1 - 0xd800;
    const mapToCode = (v) => {
      if (v < 0xd800) return preferPrintableMapper(v);
      return v + gapSize;
    };
    return charArbitrary({
      min: 0x0000,
      max: 0x10ffff - gapSize,
      mapToCode,
      integer,
      map
    });
  };
  return ({ fullUnicode });
};

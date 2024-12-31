import Decimal from "decimal.js";

expect.extend({
  toEqualDecimal(received: Decimal, expected: Decimal | string | number) {
    const expectedDecimal = new Decimal(expected);
    const pass = received.equals(expectedDecimal);
    return {
      message: () =>
        `expected ${received.toString()} to equal decimal ${expectedDecimal.toString()}`,
      pass,
    };
  },
});

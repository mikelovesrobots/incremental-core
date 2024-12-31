import Decimal from "decimal.js";

// Add to your TypeScript types (e.g., in test/types.d.ts):
declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualDecimal(expected: Decimal | string | number): R;
    }
  }
}

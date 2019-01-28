import { expect } from 'chai';
import sum from './sum';

describe("#sum", () => {
  it("returns 10", () => {
    expect(sum(5, 5)).to.equal(10);
  });
});

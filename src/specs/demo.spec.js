import sum from './sum';

describe("#sum", () => {
  it("returns 15", () => {
    expect(sum(10, 5)).toBe(15);
  });
});

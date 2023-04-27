import nextElementList from "@/utils/nextElementList";

describe("nextElementInList", () => {
  it("locates element in list and return the next element in list", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementList(list, value);
    expect(result).toBe("D");
  });

  describe("when element in the end of the list", () => {
    it("locates next element at the start of list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementList(list, value);
      expect(result).toBe("A");
    });
  });
});

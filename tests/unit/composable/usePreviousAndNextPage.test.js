import usePreviousAndNextPage from "../../../src/composable/usePreviousAndNextPage";

describe("usePreviousAndNextPage", () => {
  it("calculates page before current one", () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { previousPage } = usePreviousAndNextPage(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });

  describe("when current page is first page", () => {
    it("does not provide previous page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 1 };
      const { previousPage } = usePreviousAndNextPage(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates page after current one", () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { nextPage } = usePreviousAndNextPage(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });

  describe("when current page is the last page", () => {
    it("does not provide next page", () => {
      const currentPage = { value: 10 };
      const maxPage = { value: 10 };
      const { nextPage } = usePreviousAndNextPage(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});

export function usePagination(fetchDataFunction) {
  let page = 1;
  let pageCount = 1;

  function nextPage() {
    if (page < pageCount) {
      page++;
      fetchDataFunction();
    }
  }

  function firstPage() {
    if (page !== 1) {
      page = 1;
      fetchDataFunction();
    }
  }

  function setPage(newPage) {
    if (newPage >= 1 && newPage <= pageCount) {
      page = newPage;
      fetchDataFunction();
    }
  }

  function lastPage() {
    if (page !== pageCount) {
      page = pageCount;
      fetchDataFunction();
    }
  }

  function previousPage() {
    if (page > 1) {
      page--;
      fetchDataFunction();
    }
  }

  function updatePageCount(newPageCount) {
    pageCount = newPageCount;
    if (page > pageCount) {
      page = pageCount;
      fetchDataFunction();
    }
  }

  function getPage() {
    return page;
  }

  function getPageCount() {
    return pageCount;
  }

  return {
    nextPage,
    firstPage,
    setPage,
    lastPage,
    previousPage,
    updatePageCount,
    getPage,
    getPageCount,
  };
}
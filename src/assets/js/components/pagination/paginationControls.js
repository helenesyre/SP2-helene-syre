function paginationButton(pageNumber, pagination) {
  const button = document.createElement("button")
  button.textContent = pageNumber
  button.classList = `pagination-btn pagination-btn-default ${pageNumber == pagination.getPage() ? 'pagination-btn-active' : ''}`
  button.onclick = () => pagination.setPage(pageNumber)
  return button
}

export function renderPaginationControls(pagination) {
  const container = document.getElementById("pagination-controls");
  if (!container) return;
  container.innerHTML = "";

  const previousButton = document.createElement("button");
  previousButton.classList = `pagination-btn pagination-btn-default ${pagination.getPage() === 1 ? 'pagination-btn-disabled' : ''}`;
  previousButton.ariaLabel = "Previous page";
  previousButton.disabled = pagination.getPage() === 1;
  previousButton.innerHTML = `<i data-lucide="chevron-left" class="size-6"></i>`;
  previousButton.onclick = pagination.previousPage;

  const nextButton = document.createElement("button");
  nextButton.classList = `pagination-btn pagination-btn-default ${pagination.getPage() === pagination.getPageCount() ? 'pagination-btn-disabled' : ''}`;
  nextButton.ariaLabel = "Next page";
  nextButton.disabled = pagination.getPage() === pagination.getPageCount();
  nextButton.innerHTML = `<i data-lucide="chevron-right" class="size-6"></i>`;
  nextButton.onclick = pagination.nextPage;

  if (pagination.getPageCount() <= 6) {
    // render at most 6 buttons
    container.appendChild(previousButton);
    for (let page = 1; page <= pagination.getPageCount(); page++) {
      container.appendChild(paginationButton(page, pagination))
    }
    container.appendChild(nextButton);
    return;
  }

  const ellipsisLeft = document.createElement("span");
  ellipsisLeft.classList = "pagination-btn";
  ellipsisLeft.textContent = "...";

  const ellipsisRight = document.createElement("span");
  ellipsisRight.classList = "pagination-btn";
  ellipsisRight.textContent = "...";

  if (pagination.getPage() < 5) {
    // render 1 2 3 4 ... 9
    container.appendChild(previousButton);
    container.appendChild(paginationButton(1, pagination))
    container.appendChild(paginationButton(2, pagination))
    container.appendChild(paginationButton(3, pagination))
    container.appendChild(paginationButton(4, pagination))
    container.appendChild(ellipsisRight);
    container.appendChild(paginationButton(pagination.getPageCount(), pagination))
    container.appendChild(nextButton);
    return;
  }

  if (pagination.getPage() > pagination.getPageCount() - 4) {
    // render 1 ... 6 7 8 9
    container.appendChild(previousButton);
    container.appendChild(paginationButton(1, pagination))
    container.appendChild(ellipsisLeft);
    container.appendChild(paginationButton(pagination.getPageCount() - 3, pagination))
    container.appendChild(paginationButton(pagination.getPageCount() - 2, pagination))
    container.appendChild(paginationButton(pagination.getPageCount() - 1, pagination))
    container.appendChild(paginationButton(pagination.getPageCount(), pagination))
    container.appendChild(nextButton);
    return;
  }

  // render 1 ... 4 5 6 ... 9
  container.appendChild(previousButton);
  container.appendChild(paginationButton(1, pagination))
  container.appendChild(ellipsisLeft);
  container.appendChild(paginationButton(pagination.getPage() - 1, pagination))
  container.appendChild(paginationButton(pagination.getPage(), pagination))
  container.appendChild(paginationButton(pagination.getPage() + 1, pagination))
  container.appendChild(ellipsisRight);
  container.appendChild(paginationButton(pagination.getPageCount(), pagination))
  container.appendChild(nextButton);
  return;
}
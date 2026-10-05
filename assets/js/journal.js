document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('[data-journal-grid]');
  if (!grid) return;

  var perPage = parseInt(grid.getAttribute('data-per-page'), 10) || 6;
  var allCards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var pagination = document.querySelector('[data-journal-pagination]');
  var searchInput = document.querySelector('[data-journal-search]');
  var emptyMsg = document.querySelector('[data-journal-empty]');
  var currentPage = 1;

  function normalize(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function getVisibleSet() {
    var q = searchInput ? normalize(searchInput.value.trim()) : '';
    if (!q) return allCards;
    return allCards.filter(function (card) {
      return normalize(card.getAttribute('data-search')).indexOf(q) > -1;
    });
  }

  function render() {
    var matched = getVisibleSet();
    var totalPages = Math.max(1, Math.ceil(matched.length / perPage));
    if (currentPage > totalPages) currentPage = totalPages;

    allCards.forEach(function (card) { card.hidden = true; });
    var start = (currentPage - 1) * perPage;
    matched.slice(start, start + perPage).forEach(function (card) { card.hidden = false; });

    if (emptyMsg) emptyMsg.classList.toggle('is-visible', matched.length === 0);

    if (pagination) {
      pagination.innerHTML = '';
      if (totalPages <= 1) {
        pagination.hidden = true;
      } else {
        pagination.hidden = false;
        pagination.appendChild(navBtn('‹', currentPage - 1, currentPage === 1));
        for (var i = 1; i <= totalPages; i++) {
          var b = navBtn(String(i), i, false);
          if (i === currentPage) b.classList.add('is-active');
          pagination.appendChild(b);
        }
        pagination.appendChild(navBtn('›', currentPage + 1, currentPage === totalPages));
      }
    }

    grid.scrollIntoView({ block: 'nearest' });
  }

  function navBtn(label, page, disabled) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    if (label === '‹' || label === '›') b.classList.add('is-arrow');
    b.disabled = disabled;
    b.addEventListener('click', function () {
      currentPage = page;
      render();
    });
    return b;
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      currentPage = 1;
      render();
    });
  }

  render();
});

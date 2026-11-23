(function () {
  var searchInput = document.getElementById("search-input");
  var categoryButtons = document.querySelectorAll(".category-button");
  var faqItems = document.querySelectorAll(".faq-item");
  var faqSections = document.querySelectorAll(".faq-section");
  var emptyMessage = document.getElementById("empty-message");
  var toggleButtons = document.querySelectorAll(".faq-toggle");

  var selectedCategory = "all";

  function applyFilter() {
    var keyword = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    faqItems.forEach(function (item) {
      var categoryMatch = selectedCategory === "all" || item.dataset.category === selectedCategory;
      var text = item.textContent.toLowerCase();
      var keywordMatch = keyword === "" || text.indexOf(keyword) !== -1;
      var visible = categoryMatch && keywordMatch;

      item.hidden = !visible;
      if (visible) {
        visibleCount++;
      }
    });

    faqSections.forEach(function (section) {
      var hasVisibleItem = section.querySelector(".faq-item:not([hidden])") !== null;
      section.hidden = !hasVisibleItem;
    });

    emptyMessage.hidden = visibleCount > 0;
  }

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCategory = button.dataset.category;
      categoryButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
      applyFilter();
    });
  });

  searchInput.addEventListener("input", applyFilter);

  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var answer = document.getElementById(button.getAttribute("aria-controls"));
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      answer.hidden = expanded;
    });
  });

  applyFilter();
})();

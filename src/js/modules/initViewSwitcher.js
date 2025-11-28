export default function initViewSwitcher() {
  const items = document.querySelector("#articles-list");
  const btns = document.querySelectorAll(".view-switch__btn");

  if (!items || !btns.length) return;

  // 1. Load saved view
  const saved = localStorage.getItem("viewMode") || "grid";
  items.classList.remove("list-view", "grid-view");
  items.classList.add(saved + "-view");

  // active button state
  btns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === saved);
  });

  // 2. Handle click
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.view;

      // update UI
      items.classList.remove("list-view", "grid-view");
      items.classList.add(mode + "-view");

      // update active button
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // save to localStorage
      localStorage.setItem("viewMode", mode);
    });
  });
}

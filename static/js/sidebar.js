
document.addEventListener("DOMContentLoaded", function () {
  const expanded = new Set(JSON.parse(localStorage.getItem("expandedMenus") || "[]"));

  document.querySelectorAll(".collapsible").forEach(function (el, index) {
    const content = el.nextElementSibling;

    if (!el.querySelector("span.arrow")) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.innerText = "▶ ";
      el.prepend(arrow);
    }

    if (content && content.classList.contains("content")) {
      content.style.display = expanded.has(index) ? "block" : "none";
      el.querySelector("span.arrow").innerText = expanded.has(index) ? "▼ " : "▶ ";

      el.addEventListener("click", function (e) {
        const showing = content.style.display === "block";
        content.style.display = showing ? "none" : "block";
        el.querySelector("span.arrow").innerText = showing ? "▶ " : "▼ ";

        if (showing) {
          expanded.delete(index);
        } else {
          expanded.add(index);
        }
        localStorage.setItem("expandedMenus", JSON.stringify([...expanded]));
        e.stopPropagation();
      });
    }
  });

  // 自动展开当前页面路径
  const path = window.location.pathname;
  document.querySelectorAll(".sidebar a").forEach(function (link) {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
      let node = link;
      while (node && node.classList) {
        if (node.classList.contains("content")) {
          node.style.display = "block";
          const arrow = node.previousElementSibling?.querySelector(".arrow");
          if (arrow) arrow.innerText = "▼ ";
        }
        node = node.parentElement;
      }
    }
  });

  // 搜索功能
  const search = document.getElementById("menuSearch");
  if (search) {
    search.addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      document.querySelectorAll(".sidebar a").forEach(function (link) {
        const text = link.innerText.toLowerCase();
        link.style.display = text.includes(keyword) ? "block" : "none";
      });
    });
  }
});

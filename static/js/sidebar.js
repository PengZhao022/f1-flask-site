
document.addEventListener("DOMContentLoaded", function () {
  // Restore expanded states from localStorage
  const storedExpanded = JSON.parse(localStorage.getItem("expandedMenus") || "[]");

  // 初始化所有 collapsible 区块
  document.querySelectorAll(".collapsible").forEach(function (el, index) {
    if (!el.querySelector("span.arrow")) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.innerText = "▶ ";
      el.prepend(arrow);
    }

    const content = el.nextElementSibling;
    const expanded = storedExpanded.includes(index);
    if (content && content.classList.contains("content")) {
      content.style.display = expanded ? "block" : "none";
      const arrow = el.querySelector("span.arrow");
      if (arrow) arrow.innerText = expanded ? "▼ " : "▶ ";
    }

    el.addEventListener("click", function (e) {
      if (!content || !content.classList.contains("content")) return;
      const currentlyOpen = content.style.display === "block";
      content.style.display = currentlyOpen ? "none" : "block";
      const arrow = el.querySelector("span.arrow");
      if (arrow) arrow.innerText = currentlyOpen ? "▶ " : "▼ ";

      // update localStorage
      const currentExpanded = new Set(JSON.parse(localStorage.getItem("expandedMenus") || "[]"));
      if (currentlyOpen) {
        currentExpanded.delete(index);
      } else {
        currentExpanded.add(index);
      }
      localStorage.setItem("expandedMenus", JSON.stringify([...currentExpanded]));

      e.stopPropagation();
    });
  });

  // 高亮当前链接，展开其所有父 collapsible
  const path = window.location.pathname;
  const links = document.querySelectorAll(".sidebar a");
  links.forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
      let node = link;
      while (node && node.classList) {
        if (node.classList.contains("content")) {
          node.style.display = "block";
          const parent = node.previousElementSibling;
          if (parent && parent.querySelector("span.arrow")) {
            parent.querySelector("span.arrow").innerText = "▼ ";
          }
        }
        node = node.parentElement;
      }
    }
  });

  // 搜索功能
  document.getElementById("menuSearch").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    document.querySelectorAll(".sidebar a").forEach(function (link) {
      const text = link.innerText.toLowerCase();
      link.style.display = text.includes(keyword) ? "block" : "none";
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const expanded = new Set(JSON.parse(localStorage.getItem("expandedMenus") || "[]"));

  document.querySelectorAll(".collapsible").forEach(function (el, index) {
    if (!el.querySelector("span.arrow")) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.innerText = "▶ ";
      el.prepend(arrow);
    }

    const content = el.nextElementSibling;
    if (content && content.classList.contains("content")) {
      if (expanded.has(index)) {
        content.style.display = "block";
        el.querySelector("span.arrow").innerText = "▼ ";
      } else {
        content.style.display = "none";
        el.querySelector("span.arrow").innerText = "▶ ";
      }

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

  // 高亮当前链接并展开路径
  const path = window.location.pathname;
  document.querySelectorAll(".sidebar a").forEach(function (link) {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
      let node = link;
      while (node && node.classList) {
        if (node.classList.contains("content")) {
          node.style.display = "block";
          const prev = node.previousElementSibling;
          if (prev && prev.querySelector(".arrow")) {
            prev.querySelector(".arrow").innerText = "▼ ";
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

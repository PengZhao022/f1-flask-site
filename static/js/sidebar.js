
document.addEventListener("DOMContentLoaded", function () {
  // 初始化所有 collapsible 区块
  document.querySelectorAll(".collapsible").forEach(function (el) {
    if (!el.querySelector("span.arrow")) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.innerText = "▶ ";
      el.prepend(arrow);
    }

    el.addEventListener("click", function (e) {
      const content = this.nextElementSibling;
      if (content && content.classList.contains("content")) {
        const expanded = content.style.display === "block";
        content.style.display = expanded ? "none" : "block";
        const arrow = this.querySelector("span.arrow");
        if (arrow) arrow.innerText = expanded ? "▶ " : "▼ ";
        e.stopPropagation();
      }
    });
  });

  // 高亮当前路径，展开其所有父 collapsible
  const path = window.location.pathname;
  const links = document.querySelectorAll(".sidebar a");
  links.forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
      let node = link;
      while (node && node.classList) {
        if (node.classList.contains("content")) {
          node.style.display = "block";
          const parentCollapsible = node.previousElementSibling;
          if (parentCollapsible && parentCollapsible.querySelector("span.arrow")) {
            parentCollapsible.querySelector("span.arrow").innerText = "▼ ";
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

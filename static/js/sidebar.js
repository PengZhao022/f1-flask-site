
document.addEventListener("DOMContentLoaded", function () {
  const storedExpanded = JSON.parse(localStorage.getItem("expandedMenus") || "[]");

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
      const arrow = this.querySelector("span.arrow");
      const currentlyOpen = content.style.display === "block";

      if (currentlyOpen) {
        content.style.display = "none";
        if (arrow) arrow.innerText = "▶ ";
      } else {
        content.style.display = "block";
        if (arrow) arrow.innerText = "▼ ";
      }

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

  document.getElementById("menuSearch").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    document.querySelectorAll(".sidebar a").forEach(function (link) {
      const text = link.innerText.toLowerCase();
      link.style.display = text.includes(keyword) ? "block" : "none";
    });
  });
});

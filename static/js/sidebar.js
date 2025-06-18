
document.addEventListener("DOMContentLoaded", function () {
  // Highlight current page and open parent menus
  document.querySelectorAll('.sidebar a').forEach(function (link) {
    if (link.href === window.location.href) {
      link.classList.add('active');
      let parent = link.parentElement;
      while (parent && parent.classList && !parent.classList.contains('sidebar')) {
        if (parent.classList.contains('content')) {
          parent.style.display = 'block';
        }
        parent = parent.parentElement;
      }
    }
  });

  // Toggle collapsible sections with state memory
  document.querySelectorAll('.collapsible').forEach(function (header) {
    header.addEventListener('click', function () {
      const key = 'sidebar-' + this.innerText.trim();
      const next = this.nextElementSibling;
      if (next && next.classList.contains('content')) {
        if (next.style.display === 'block') {
          next.style.display = 'none';
          localStorage.setItem(key, 'none');
        } else {
          next.style.display = 'block';
          localStorage.setItem(key, 'block');
        }
      }
    });

    // Restore state from localStorage
    const key = 'sidebar-' + header.innerText.trim();
    const saved = localStorage.getItem(key);
    if (saved) {
      const next = header.nextElementSibling;
      if (next && next.classList.contains('content')) {
        next.style.display = saved;
      }
    }
  });

  // Sidebar search
  const searchInput = document.getElementById("sidebarSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      document.querySelectorAll(".sidebar li").forEach(function (item) {
        const link = item.querySelector("a");
        if (link && link.textContent.toLowerCase().includes(filter)) {
          item.style.display = "";
        } else if (!link) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // Page fade-in effect
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = 1;
  }, 100);
});

// Theme toggle
const toggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(currentTheme + "-mode");

toggleBtn.innerText = currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

toggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
  toggleBtn.innerText = mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Load Tableau config
const tableauObj = document.querySelector(".tableauPlaceholder object");
if (tableauObj) {
  fetch("/static/data/tableau_config.json")
    .then(resp => resp.json())
    .then(config => {
      const path = window.location.pathname;
      if (config[path]) {
        tableauObj.querySelector("param[name='name']").value = config[path];
      }
    });
}

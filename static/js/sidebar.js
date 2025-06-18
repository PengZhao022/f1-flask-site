
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".collapsible").forEach(function (el) {
    el.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content && content.style) {
        content.style.display = content.style.display === "block" ? "none" : "block";
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".collapsible").forEach(function (el) {
        el.addEventListener("click", function () {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});

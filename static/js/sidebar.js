document.addEventListener("DOMContentLoaded", function () {
    const toggles = document.querySelectorAll(".menu-toggle");
    const subMenus = document.querySelectorAll(".submenu");

    toggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const target = this.getAttribute("data-target");
            const submenu = document.getElementById(target);
            if (submenu) {
                submenu.classList.toggle("show");

                // localStorage 记忆每个 submenu 的展开状态
                if (submenu.classList.contains("show")) {
                    localStorage.setItem(target, "open");
                } else {
                    localStorage.removeItem(target);
                }
            }
        });
    });

    // 初始加载时展开之前打开的菜单
    subMenus.forEach(sub => {
        const id = sub.getAttribute("id");
        if (localStorage.getItem(id) === "open") {
            sub.classList.add("show");
        }
    });
});

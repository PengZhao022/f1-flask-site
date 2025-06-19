
document.addEventListener('DOMContentLoaded', function () {
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach((collapsible, index) => {
        const content = collapsible.nextElementSibling;

        // 恢复展开状态
        const isOpen = localStorage.getItem('sidebar_open_' + index) === 'true';
        if (isOpen) {
            collapsible.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }

        // 添加点击事件
        collapsible.addEventListener('click', function () {
            this.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                localStorage.setItem('sidebar_open_' + index, 'false');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                localStorage.setItem('sidebar_open_' + index, 'true');
            }
        });
    });
});

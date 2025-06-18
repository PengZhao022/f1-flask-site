
<script>
document.querySelectorAll('.collapsible').forEach(function(header) {
  header.addEventListener('click', function() {
    var next = this.nextElementSibling;
    if (next && next.classList.contains('content')) {
      const display = next.style.display === 'block' ? 'none' : 'block';
      next.style.display = display;
      // Save to localStorage
      const id = this.innerText.trim();
      localStorage.setItem('sidebar-' + id, display);
    }
  });

  // Restore from localStorage
  const id = header.innerText.trim();
  const saved = localStorage.getItem('sidebar-' + id);
  if (saved === 'block') {
    const next = header.nextElementSibling;
    if (next) next.style.display = 'block';
  }
});

// Highlight current link
document.querySelectorAll('.sidebar a').forEach(function(link) {
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
</script>

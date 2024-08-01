document.addEventListener('DOMContentLoaded', function() {
  // One page navigation
  var lastId;
  var topMenu = document.querySelector(".top-nav");
  var topMenuHeight = topMenu.offsetHeight + 15;
  var menuItems = Array.from(topMenu.querySelectorAll("a"));
  var scrollItems = menuItems.map(function(menuItem) {
    var item = document.querySelector(menuItem.getAttribute("href"));
    if (item) {
      return item;
    }
  }).filter(Boolean);

  menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('click', function(e) {
      var href = menuItem.getAttribute("href");
      var offsetTop = href === "#" ? 0 : document.querySelector(href).offsetTop - topMenuHeight + 1;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      e.preventDefault();
    });
  });

  document.querySelector(".top-nav").addEventListener('click', function() {
    document.body.classList.remove("show-menu");
  });

  window.addEventListener('scroll', function() {
    var fromTop = window.scrollY + topMenuHeight;
    var cur = scrollItems.filter(function(scrollItem) {
      return scrollItem.offsetTop < fromTop;
    });
    cur = cur[cur.length - 1];
    var id = cur ? cur.id : "";

    if (lastId !== id) {
      lastId = id;
      menuItems.forEach(function(menuItem) {
        var parent = menuItem.parentElement;
        parent.classList.remove("active-item");
      });
      var activeItem = topMenu.querySelector(`[href="#${id}"]`);
      if (activeItem) {
        activeItem.parentElement.classList.add("active-item");
      }
    }
  });
});
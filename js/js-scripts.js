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

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

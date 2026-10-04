// Mục lục cho trang chữ dài: tự dựng từ các <h2> của từng <article data-lang>, nên không phải viết
// tay id + danh sách cho mỗi ngôn ngữ. Mục lục nằm trong article, luật [data-lang] tự ẩn bản kia.
(function () {
  var LABEL = { vi: "Mục lục", en: "Contents" };
  var wide = window.matchMedia("(min-width: 960px)");
  var tocs = [];

  document.querySelectorAll("main.doc article[data-lang]").forEach(function (article) {
    var lang = article.getAttribute("data-lang");
    var headings = article.querySelectorAll("h2");
    if (!headings.length) return;

    var toc = document.createElement("details");
    toc.className = "toc";
    var summary = document.createElement("summary");
    summary.textContent = LABEL[lang] || LABEL.en;
    toc.appendChild(summary);

    var nav = document.createElement("nav");
    nav.setAttribute("aria-label", summary.textContent);
    var list = document.createElement("ol");
    var links = [];
    headings.forEach(function (h, i) {
      h.id = lang + "-" + (i + 1);
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      // Màn hẹp: bấm xong thì gập lại, khỏi che nội dung vừa nhảy tới.
      a.addEventListener("click", function () { if (!wide.matches) toc.open = false; });
      var li = document.createElement("li");
      li.appendChild(a);
      list.appendChild(li);
      links.push(a);
    });
    nav.appendChild(list);
    toc.appendChild(nav);

    // Tiêu đề trang + dòng hiệu lực gom vào một khối, phần còn lại vào khối thân: màn rộng xếp lưới
    // (mục lục trái, chữ phải), màn hẹp mục lục nằm ngay dưới tiêu đề.
    var head = document.createElement("header");
    head.className = "doc-head";
    var body = document.createElement("div");
    body.className = "doc-body";
    var inHead = true;
    Array.prototype.slice.call(article.childNodes).forEach(function (node) {
      if (node.nodeType === 1 && node.tagName === "H2") inHead = false;
      (inHead ? head : body).appendChild(node);
    });
    article.appendChild(head);
    article.appendChild(toc);
    article.appendChild(body);

    tocs.push({ article: article, toc: toc, headings: headings, links: links });
  });
  if (!tocs.length) return;

  function syncOpen() {
    tocs.forEach(function (t) { t.toc.open = wide.matches; });
  }
  syncOpen();
  if (wide.addEventListener) wide.addEventListener("change", syncOpen);

  // Tô mục đang đọc: heading cuối cùng đã qua mép trên.
  var ticking = false;
  function spy() {
    ticking = false;
    tocs.forEach(function (t) {
      if (t.article.offsetParent === null) return;
      var current = 0;
      t.headings.forEach(function (h, i) {
        if (h.getBoundingClientRect().top <= 96) current = i;
      });
      t.links.forEach(function (a, i) {
        if (i === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(spy); }
  }, { passive: true });
  spy();
})();

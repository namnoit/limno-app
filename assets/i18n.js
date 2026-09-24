// Chọn ngôn ngữ: ?lang= -> lựa chọn đã lưu -> ngôn ngữ trình duyệt (vi* -> vi, còn lại en).
// Chạy ngay trong <head> để trang không nháy sang ngôn ngữ sai.
(function () {
  var SUPPORTED = ["vi", "en"];
  var KEY = "limno-lang";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* trình duyệt chặn storage */ }
  }
  function fromBrowser() {
    var langs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) {
      if (String(langs[i]).toLowerCase().indexOf("vi") === 0) return "vi";
    }
    return "en";
  }

  var param = new URLSearchParams(location.search).get("lang");
  var lang;
  if (SUPPORTED.indexOf(param) >= 0) {
    lang = param;
    store(lang); // app mở kèm ?lang= theo máy - nhớ luôn cho lần sau
  } else {
    lang = SUPPORTED.indexOf(stored()) >= 0 ? stored() : fromBrowser();
  }

  function apply(l) {
    document.documentElement.lang = l;
    var title = document.querySelector("title[data-" + l + "]");
    if (title) document.title = title.getAttribute("data-" + l);
    var btn = document.getElementById("lang-switch");
    if (btn) btn.textContent = l === "vi" ? "EN" : "VI";
  }
  apply(lang);

  document.addEventListener("DOMContentLoaded", function () {
    apply(lang);
    var btn = document.getElementById("lang-switch");
    if (!btn) return;
    btn.addEventListener("click", function () {
      lang = lang === "vi" ? "en" : "vi";
      store(lang);
      apply(lang);
      var url = new URL(location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", lang);
        history.replaceState(null, "", url);
      }
    });
  });
})();

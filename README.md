# limno-app

Website tĩnh cho app Limno: trang giới thiệu, chính sách quyền riêng tư, hỗ trợ.
HTML/CSS/JS thuần, không build, không CDN - chạy thẳng trên GitHub Pages.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Giới thiệu, tính năng, badge store, ảnh chụp màn hình |
| `privacy.html` | Chính sách quyền riêng tư (khớp với những gì app thật sự thu thập) |
| `support.html` | FAQ + email liên hệ |
| `assets/i18n.js` | Chọn ngôn ngữ vi/en |
| `assets/style.css` | Style, màu lấy từ `LimnoColorScheme` của app, tự theo dark mode |
| `assets/icon.svg` | Icon tạm - thay bằng icon thật của app khi có |

## Ngôn ngữ

Mỗi trang chứa cả hai ngôn ngữ trong các khối `data-lang="vi"` / `data-lang="en"`.
`i18n.js` chọn theo thứ tự: `?lang=vi|en` → lựa chọn đã lưu (`localStorage`) → ngôn ngữ trình duyệt
(`vi*` → vi, còn lại en). Nút VI/EN ở header lưu lựa chọn.
App mở link kèm `?lang=` theo ngôn ngữ máy.

Sửa nội dung: sửa **cả hai** khối vi và en. Không dùng dấu gạch dài, dùng `-`.

## Việc còn lại trước khi phát hành

- **Badge store:** tải badge chính thức và đặt vào `assets/badges/` với đúng tên:
  - `google-play-vi.svg`, `google-play-en.svg` - https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/
  - `app-store-vi.svg`, `app-store-en.svg` - https://developer.apple.com/app-store/marketing/guidelines/
  CSS ép cùng chiều cao 48px nên hai badge luôn bằng nhau. Không tự vẽ lại badge.
- **Link store:** thay `href="#"` (có comment `TODO`) trong `index.html`.
- **Ảnh chụp màn hình:** thay `assets/screenshots/placeholder-*.svg` bằng ảnh thật (tỉ lệ dọc ~9:19.5,
  PNG/WebP), sửa `src` trong `index.html`. Muốn thêm ảnh thì thêm `<figure>`.

## Deploy

1. Tạo repo `limno-app` trên GitHub, `git remote add origin …`, push `main`.
2. Settings → Pages → Deploy from a branch → `main` / root.
3. Trang sẽ ở `https://namnoit.github.io/limno-app/` - URL này đang được app dùng.

Xem thử trên máy: `python3 -m http.server` rồi mở http://localhost:8000.

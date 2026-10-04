# limno-app

Website tĩnh cho app Limno: trang giới thiệu, chính sách quyền riêng tư, hỗ trợ.
HTML/CSS/JS thuần, không build, không CDN - chạy thẳng trên GitHub Pages.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Giới thiệu, badge store, ảnh chụp màn hình, tính năng |
| `terms.html`, `license.html` | Điều khoản sử dụng, giấy phép dữ liệu loài |
| `privacy.html` | Chính sách quyền riêng tư (khớp với những gì app thật sự thu thập) |
| `support.html` | FAQ + email liên hệ |
| `assets/i18n.js` | Chọn ngôn ngữ vi/en |
| `assets/toc.js` | Mục lục cho `privacy` / `terms` / `license`: tự dựng từ các `<h2>`, thêm mục chỉ cần thêm `<h2>` |
| `assets/style.css` | Style, màu lấy từ `LimnoColorScheme` của app, tự theo dark mode |
| `assets/icon-192.png`, `apple-touch-icon.png`, `og-image.png` | Icon app (xuất từ `ic_limno_ios.png` / `ic_launcher-playstore.png` của repo Limno); `og-image.png` dùng cho link preview |

## Ngôn ngữ

Mỗi trang chứa cả hai ngôn ngữ trong các khối `data-lang="vi"` / `data-lang="en"`.
`i18n.js` chọn theo thứ tự: `?lang=vi|en` → lựa chọn đã lưu (`localStorage`) → ngôn ngữ trình duyệt
(`vi*` → vi, còn lại en). Nút VI/EN ở header lưu lựa chọn.
App mở link kèm `?lang=` theo ngôn ngữ máy.

Sửa nội dung: sửa **cả hai** khối vi và en. Không dùng dấu gạch dài, dùng `-`.

## Việc còn lại trước khi phát hành

- **Badge store:** tải badge chính thức và đặt vào `assets/badges/` với đúng tên:
  - `google-play-vi.png`, `google-play-en.png` - https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/
  - `app-store-vi.svg`, `app-store-en.svg` - https://developer.apple.com/app-store/marketing/guidelines/
  CSS ép cùng chiều cao 48px nên hai badge luôn bằng nhau. Không tự vẽ lại badge.

## Ảnh chụp màn hình

`assets/screenshots/{vi,en}/01..08.jpg` là bộ ảnh store có headline, lấy từ repo `limno-store`
(`out/asc-iphone-69/<locale>/`), thu còn rộng 660px. Dựng lại khi đổi ảnh store:

```bash
for l in vi en; do for n in 01 02 03 04 05 06 07 08; do
  sips -s format jpeg -s formatOptions 85 --resampleWidth 660 \
    ../limno-store/out/asc-iphone-69/$l/$n.png --out assets/screenshots/$l/$n.jpg
done; done
```

`alt` của từng ảnh là headline ở `Limno/release/store/screenshots.md`; đổi headline thì sửa cả `alt`.

## Deploy

1. Tạo repo `limno-app` trên GitHub, `git remote add origin …`, push `main`.
2. Settings → Pages → Deploy from a branch → `main` / root.
3. Trang sẽ ở `https://namnoit.github.io/limno-app/` - URL này đang được app dùng.

Xem thử trên máy: `python3 -m http.server` rồi mở http://localhost:8000.

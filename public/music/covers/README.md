# Playlist nhạc nền

Cách thêm bài mới cho portfolio:

1. **Copy file nhạc** vào thư mục này (ví dụ `public/music/`):
   - `public/music/ten-bai.mp3`
   - Khuyến nghị `.mp3` hoặc `.ogg`, dung lượng < 10MB để trang tải nhanh.
   - Nên cắt đoạn intro/imro (khoảng 30–60 giây) để nghe thử nhanh.

2. **Copy ảnh bìa** (ảnh vuông, ~300x300) vào `public/music/covers/`.

3. **Khai báo bài trong `src/data/playlist.js`** — thêm một object:

```js
{
  title: 'Tên Bài Hát',
  artist: 'Tên Nghệ Sĩ',
  src: '/music/ten-bai.mp3',
  cover: '/music/covers/ten-bai.jpg',
}
```

Lưu ý: đường dẫn phải bắt đầu bằng `/` và viết đúng phân biệt hoa/thường, ví dụ
`/music/Die-For-You.mp3` (không phải `/music/die for you.mp3`).

Sau khi sửa xong, Vite sẽ tự cập nhật — không cần build lại khi đang chạy `npm run dev`.
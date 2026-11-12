// Máy chủ tĩnh đơn giản để chạy bản build trong thư mục out/ (không cần cài thêm gói).
// Cách dùng: npm run build, sau đó: node serve.mjs
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.resolve(fileURLToPath(new URL("./out/", import.meta.url)));
const BASE_PORT = Number(process.env.PORT) || 3000;
const MAX_TRIES = 10; // Nếu cổng bận, thử tối đa 10 cổng tiếp theo.

// Bảng kiểu nội dung (Content-Type) theo phần mở rộng tệp.
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

// Trả về thông tin tệp/thư mục, hoặc null nếu không tồn tại.
const statOrNull = (p) => {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
};

// Gửi tệp về trình duyệt với mã trạng thái và kiểu nội dung phù hợp.
const sendFile = (res, status, file) => {
  const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
  res.writeHead(status, { "Content-Type": type, "Content-Length": fs.statSync(file).size });
  fs.createReadStream(file).pipe(res);
};

const handler = (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Phương thức không được hỗ trợ");
  }

  // Tách đường dẫn khỏi query/hash rồi giải mã (ví dụ %20 -> dấu cách).
  let rel;
  try {
    rel = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Yêu cầu không hợp lệ");
  }

  // Chặn truy cập ra ngoài thư mục out/ (path traversal).
  const full = path.resolve(OUT_DIR, "." + rel);
  if (full !== OUT_DIR && !full.startsWith(OUT_DIR + path.sep)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Bị từ chối");
  }

  // Thứ tự thử: thư mục -> index.html; tệp -> chính nó; còn lại -> <path>.html, <path>/index.html.
  const st = statOrNull(full);
  const endsWithSlash = rel.endsWith("/");
  let candidates;
  if (st?.isFile() && !endsWithSlash) candidates = [full];
  else if (st?.isDirectory() || endsWithSlash) candidates = [path.join(full, "index.html")];
  else candidates = [full + ".html", path.join(full, "index.html")];

  const found = candidates.find((c) => statOrNull(c)?.isFile());
  if (found) return sendFile(res, 200, found);

  // Không tìm thấy: dùng 404.html nếu có, nếu không thì trả chữ thuần.
  const page404 = path.join(OUT_DIR, "404.html");
  if (statOrNull(page404)?.isFile()) return sendFile(res, 404, page404);
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Không tìm thấy trang");
};

// Mở cổng; nếu bị chiếm (EADDRINUSE) thì thử cổng kế tiếp.
const start = (port, tries = 0) => {
  const server = http.createServer(handler);
  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && tries < MAX_TRIES) return start(port + 1, tries + 1);
    throw err;
  });
  server.listen(port, () => {
    console.log(`COMMODITY. đang chạy tại http://localhost:${port}`);
    console.log("Nhấn Ctrl + C để dừng.");
  });
};

// Kiểm tra thư mục out/ trước khi chạy.
if (!fs.existsSync(OUT_DIR)) {
  console.error("Chưa có thư mục out/. Hãy chạy: npm run build");
  process.exit(1);
}

start(BASE_PORT);

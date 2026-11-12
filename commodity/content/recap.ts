import type { RecapContent, Source } from "./schema";

const D2 = "Bài giảng Chương 2: Hàng hóa, thị trường và vai trò của các chủ thể tham gia thị trường";
const D3 = "Bài giảng Chương 3: Giá trị thặng dư trong nền kinh tế thị trường";

const ok = (chapter: string, section: string, page: string): Source => ({ chapter, section, page });

export const recap: RecapContent = {
  lifecycle: [
    {
      id: "lc-hang-hoa",
      label: "Chiếc áo là hàng hóa",
      chapterId: "hang-hoa",
      summary: "Sản phẩm của lao động, được làm ra để trao đổi, mua bán. Có hai thuộc tính: giá trị sử dụng và giá trị.",
    },
    {
      id: "lc-yeu-to",
      label: "Sức lao động và tư liệu sản xuất",
      chapterId: "san-xuat",
      summary: "Từ bông đến chiếc áo cần sức lao động của con người và tư liệu sản xuất gồm đối tượng lao động và tư liệu lao động.",
    },
    {
      id: "lc-san-xuat",
      label: "Sản xuất",
      chapterId: "san-xuat",
      summary: "Bảy công đoạn nối tiếp. Lao động cụ thể tạo ra giá trị sử dụng, lao động trừu tượng tạo ra giá trị.",
    },
    {
      id: "lc-gia-tri",
      label: "Giá trị",
      chapterId: "gia-tri",
      summary: "Lượng giá trị do thời gian lao động xã hội cần thiết quyết định, không phải thời gian lao động cá biệt.",
    },
    {
      id: "lc-thang-du",
      label: "Giá trị thặng dư",
      chapterId: "tu-ban",
      summary: "Phần giá trị mới dôi ra ngoài giá trị sức lao động, do lao động của công nhân làm thuê tạo ra.",
    },
    {
      id: "lc-thi-truong",
      label: "Thị trường",
      chapterId: "thi-truong",
      summary: "Giá trị biểu hiện thành giá cả. Giá cả lên xuống quanh giá trị do cung – cầu và cạnh tranh.",
    },
    {
      id: "lc-tich-luy",
      label: "Cạnh tranh và tích lũy",
      chapterId: "thi-truong",
      summary: "Cạnh tranh thúc đẩy cải tiến kỹ thuật. Một phần giá trị thặng dư chuyển thành tư bản để mở rộng sản xuất.",
    },
  ],
  finalQuiz: [
    {
      id: "fq-1",
      prompt: "Giá cả và giá trị của chiếc áo thun khác nhau như thế nào?",
      options: [
        { id: "a", text: "Giá cả và giá trị là một, chỉ là hai cách gọi." },
        { id: "b", text: "Giá trị là lao động xã hội kết tinh trong áo; giá cả là giá trị biểu hiện bằng tiền và lên xuống quanh giá trị." },
        { id: "c", text: "Giá trị là số tiền người mua trả; giá cả là chi phí sản xuất." },
        { id: "d", text: "Giá cả do lao động quyết định; giá trị do cung – cầu quyết định." },
      ],
      correct: "b",
      explanation:
        "Đúng là b. Giá cả là giá trị biểu hiện bằng tiền, là chỉ số tỷ lệ trao đổi giữa hàng hóa và tiền, và xoay quanh giá trị theo cung – cầu. Phương án a đánh đồng hai khái niệm. Phương án c và d đảo ngược hoặc lẫn lộn vai trò: cung – cầu làm giá cả lệch khỏi giá trị, không quyết định giá trị.",
      source: ok(D2, "Giá trị và giá cả; Giá trị hàng hóa (biểu hiện bằng tiền)", "20, 45"),
    },
    {
      id: "fq-2",
      prompt: "Khi nhà tư bản thuê công nhân may, nhà tư bản mua cái gì?",
      options: [
        { id: "a", text: "Lao động của công nhân." },
        { id: "b", text: "Công nhân, như một tài sản." },
        { id: "c", text: "Những chiếc áo mà công nhân sẽ làm ra." },
        { id: "d", text: "Sức lao động của công nhân, tức hàng hóa sức lao động." },
      ],
      correct: "d",
      explanation:
        "Đúng là d. Cái người công nhân bán cho nhà tư bản là sức lao động, không phải lao động. Phương án a hấp dẫn nhưng sai: lao động là việc sử dụng sức lao động, chỉ xảy ra sau khi mua. Phương án b sai vì người lao động tự do về thân thể, không bị mua như tài sản.",
      source: ok(D3, "Hàng hóa sức lao động", "43–44"),
    },
    {
      id: "fq-3",
      prompt: "Mối quan hệ giữa giá trị thặng dư và lợi nhuận là gì?",
      options: [
        { id: "a", text: "Lợi nhuận là hình thức biểu hiện của giá trị thặng dư, được quan niệm là con đẻ của toàn bộ tư bản ứng trước." },
        { id: "b", text: "Hai khái niệm đồng nhất, chỉ khác tên gọi." },
        { id: "c", text: "Lợi nhuận là nguồn gốc của giá trị thặng dư." },
        { id: "d", text: "Giá trị thặng dư là phần lợi nhuận được chia cho công nhân." },
      ],
      correct: "a",
      explanation:
        "Đúng là a. Về chất, lợi nhuận và giá trị thặng dư là một, nhưng lợi nhuận là hình thái thần bí của giá trị thặng dư: nó làm ta tưởng giá trị thặng dư do cả c và v tạo ra, nên che giấu nguồn gốc thật. Phương án b bỏ qua sự khác biệt về hình thức biểu hiện và về lượng. Phương án c đảo ngược quan hệ: nguồn gốc duy nhất của giá trị thặng dư là lao động làm thuê.",
      source: ok(D3, "3.1. Lợi nhuận — chi phí sản xuất TBCN; Bản chất lợi nhuận", "72, 75"),
    },
    {
      id: "fq-4",
      prompt: "Trong xưởng may được trang bị máy móc rất hiện đại, bộ phận tư bản nào là nguồn gốc của giá trị thặng dư?",
      options: [
        { id: "a", text: "Tư bản bất biến (c), vì máy móc hiện đại làm ra nhiều áo hơn." },
        { id: "b", text: "Cả c và v đều tạo ra giá trị thặng dư như nhau." },
        { id: "c", text: "Tư bản khả biến (v), vì chỉ lao động của công nhân làm thuê mới tạo ra giá trị mới." },
        { id: "d", text: "Giá trị nguyên liệu bông." },
      ],
      correct: "c",
      explanation:
        "Đúng là c. Máy móc, nguyên liệu chỉ chuyển giá trị cũ vào sản phẩm (c). Phương án a là nhầm lẫn thường gặp: máy móc giúp tăng năng suất, nhưng không tự tạo ra giá trị mới.",
      source: ok(D3, "Vai trò của tư bản bất biến và tư bản khả biến; Máy móc có tạo ra giá trị thặng dư hay không?", "30, 62"),
    },
    {
      id: "fq-5",
      prompt: "Xưởng A mất 10 giờ làm một chiếc áo, trong khi thời gian lao động xã hội cần thiết là 7 giờ. Lượng giá trị của chiếc áo do xưởng A làm ra trên thị trường là bao nhiêu?",
      options: [
        { id: "a", text: "Tương ứng 10 giờ, vì xưởng đã hao phí 10 giờ lao động." },
        { id: "b", text: "Tương ứng 7 giờ, vì thị trường thừa nhận hao phí lao động xã hội cần thiết." },
        { id: "c", text: "Tương ứng 3 giờ, là chênh lệch giữa hai mức." },
        { id: "d", text: "Không xác định, vì chỉ phụ thuộc vào giá bán." },
      ],
      correct: "b",
      explanation:
        "Đúng là b. Lượng giá trị do thời gian lao động xã hội cần thiết quyết định. Phương án a nhầm thời gian cá biệt với xã hội. Phương án d nhầm giá cả với giá trị. Xưởng A không được thừa nhận 3 giờ hao phí thừa.",
      source: ok(D2, "Lượng giá trị hàng hóa; Thước đo của lượng giá trị hàng hóa", "26–30"),
    },
    {
      id: "fq-6",
      prompt: "Ngày lao động giữ nguyên 8 giờ, nhưng năng suất lao động xã hội tăng khiến giá trị sức lao động giảm, thời gian lao động cần thiết (tất yếu) giảm. Đây là phương pháp nào?",
      options: [
        { id: "a", text: "Sản xuất giá trị thặng dư tuyệt đối." },
        { id: "b", text: "Tích lũy tư bản." },
        { id: "c", text: "Tăng lợi nhuận nhờ tăng giá bán." },
        { id: "d", text: "Sản xuất giá trị thặng dư tương đối." },
      ],
      correct: "d",
      explanation:
        "Đúng là d. Rút ngắn thời gian lao động cần thiết trên cơ sở tăng năng suất lao động xã hội, trong khi ngày lao động không đổi, là giá trị thặng dư tương đối. Phương án a là kéo dài tuyệt đối ngày lao động trong khi thời gian cần thiết không đổi. Phương án b là chuyển giá trị thặng dư thành tư bản.",
      source: ok(D3, "1.3. Các phương pháp sản xuất giá trị thặng dư", "61"),
    },
    {
      id: "fq-7",
      prompt: "Giá trị trao đổi của chiếc áo là gì?",
      options: [
        { id: "a", text: "Tỷ lệ trao đổi giữa chiếc áo với hàng hóa khác; là hình thức biểu hiện ra bên ngoài của giá trị." },
        { id: "b", text: "Công dụng của chiếc áo đối với người mặc." },
        { id: "c", text: "Lượng lao động cá biệt của xưởng làm ra chiếc áo." },
        { id: "d", text: "Chi phí nguyên liệu để làm chiếc áo." },
      ],
      correct: "a",
      explanation:
        "Đúng là a. Phương án b là giá trị sử dụng. Phương án c nhầm lao động cá biệt với giá trị. Phương án d chỉ là một phần chi phí, không phải tỷ lệ trao đổi.",
      source: ok(D2, "Giá trị hàng hóa (mặt lượng) — giá trị trao đổi", "18–19"),
    },
    {
      id: "fq-8",
      prompt: "Trong cùng một người thợ may, lao động tạo ra giá trị của chiếc áo là loại lao động nào?",
      options: [
        { id: "a", text: "Lao động cụ thể, vì thợ may làm ra chiếc áo cụ thể." },
        { id: "b", text: "Lao động giản đơn, không cần đào tạo." },
        { id: "c", text: "Lao động trừu tượng, tức hao phí sức lực, thần kinh của người sản xuất khi gạt bỏ hình thức cụ thể." },
        { id: "d", text: "Sức lao động, vì đây là năng lực của thợ may." },
      ],
      correct: "c",
      explanation:
        "Đúng là c. Lao động trừu tượng tạo ra giá trị. Phương án a hấp dẫn nhưng sai: lao động cụ thể tạo ra giá trị sử dụng. Phương án d nhầm sức lao động (năng lực) với lao động (việc tiêu dùng năng lực).",
      source: ok(D2, "2.2. Tính hai mặt của lao động sản xuất hàng hóa", "41–44"),
    },
    {
      id: "fq-9",
      prompt: "Với c = 60, v = 20, m = 20, thời gian lao động cần thiết (tất yếu) 4 giờ. Kéo dài ngày lao động từ 8 lên 10 giờ, thời gian cần thiết giữ nguyên. Tỷ suất giá trị thặng dư m' là bao nhiêu?",
      options: [
        { id: "a", text: "100%" },
        { id: "b", text: "150%" },
        { id: "c", text: "125%" },
        { id: "d", text: "200%" },
      ],
      correct: "b",
      explanation:
        "Đúng là b. Thời gian thặng dư 6 giờ, thời gian cần thiết 4 giờ. m = 30, v = 20 nên m' = 30 / 20 × 100% = 150%. Phương án a là mức gốc. Phương án d là mức khi ngày lao động 12 giờ.",
      source: ok(D3, "Tỷ suất giá trị thặng dư; Phương pháp sản xuất giá trị thặng dư tuyệt đối", "57, 60"),
    },
    {
      id: "fq-10",
      prompt: "Khi cung áo thun lớn hơn cầu, điều gì đúng?",
      options: [
        { id: "a", text: "Giá trị của áo giảm theo cung – cầu." },
        { id: "b", text: "Giá trị của áo tăng vì áo nhiều hơn." },
        { id: "c", text: "Giá cả và giá trị luôn bằng nhau." },
        { id: "d", text: "Giá cả giảm xuống dưới giá trị; giá trị của áo chưa thay đổi." },
      ],
      correct: "d",
      explanation:
        "Đúng là d. Cung – cầu làm giá cả lệch khỏi giá trị. Giá trị do thời gian lao động xã hội cần thiết quyết định. Phương án a nhầm giá cả với giá trị. Phương án c sai vì giá cả thường dao động quanh giá trị.",
      source: ok(D2, "Quy luật cung – cầu", "88"),
    },
  ],
  references: [
    {
      id: "ref-giao-trinh",
      citation:
        "Bộ Giáo dục và Đào tạo (2026), Kinh tế chính trị Mác – Lênin, Nxb Chính trị quốc gia Sự thật, Hà Nội. (Giáo trình chính, theo Đề cương chi tiết học phần BAA00102 – Kinh tế chính trị Mác – Lênin, ĐHQG-HCM.)",
    },
    {
      id: "ref-lenin",
      citation:
        "V.I. Lênin (2005), Toàn tập, tập 27, Nxb Chính trị quốc gia Sự thật, Hà Nội. (Tài liệu tham khảo theo Đề cương chi tiết học phần BAA00102.)",
    },
    {
      id: "ref-tu-ban",
      citation:
        "Karl Marx, Tư bản, Tập thứ nhất, Quyển 1, phần 1 và phần 2, Nxb Sự Thật, Hà Nội, 1984. (Các đoạn trích Marx được dẫn trong bài giảng.)",
    },
    {
      id: "ref-tap-huan",
      citation:
        "Giáo trình “Kinh tế chính trị Mác – Lênin”, Tài liệu tập huấn 2019. (Được liệt kê là tài liệu tham khảo trong bài giảng Chương 2 và Chương 1.)",
    },
    {
      id: "ref-bg-ch1",
      citation:
        "ThS. Lê Văn Thông, Đề cương bài giảng môn học Kinh tế chính trị Mác – Lênin, Chương 1: Đối tượng, phương pháp nghiên cứu và chức năng của Kinh tế chính trị Mác – Lênin (tài liệu gửi sinh viên).",
    },
    {
      id: "ref-bg-ch2",
      citation:
        "ThS. Lê Văn Thông, Đề cương bài giảng môn học Kinh tế chính trị Mác – Lênin, Chương 2: Hàng hóa, thị trường và vai trò của các chủ thể tham gia thị trường (tài liệu gửi sinh viên).",
    },
    {
      id: "ref-bg-ch3",
      citation:
        "ThS. Lê Văn Thông, Đề cương bài giảng môn học Kinh tế chính trị Mác – Lênin, Chương 3: Giá trị thặng dư trong nền kinh tế thị trường (tài liệu gửi sinh viên).",
    },
  ],
  closing: "GIỜ ĐÂY, HÃY NHÌN MỘT CHIẾC ÁO THUN THEO MỘT CÁCH KHÁC.",
};

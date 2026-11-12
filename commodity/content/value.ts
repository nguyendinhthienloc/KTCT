import type { Source, ValueContent } from "./schema";

const CH = "Bài giảng Chương 2: Hàng hóa, thị trường và vai trò của các chủ thể tham gia thị trường";

const ok = (section: string, page: string, note?: string): Source => ({
  chapter: CH,
  section,
  page,
  ...(note ? { note } : {}),
});

const NOT_FOUND = "Không tìm thấy trong bài giảng";
const chk = (section: string, note: string): Source => ({
  chapter: CH,
  section,
  page: "?",
  needsCheck: true,
  note,
});

export const value: ValueContent = {
  chapterId: "gia-tri",
  visual: {
    lead: "Ba nhà sản xuất cùng làm ra một loại áo, nhưng mỗi nơi mất một lượng thời gian khác nhau. Giá trị chiếc áo sẽ tính theo thời gian của ai?",
    beats: [
      {
        id: "gt-beat-1",
        heading: "Ba nơi, ba tốc độ",
        body: "Xưởng thủ công mất 10 giờ cho một chiếc áo. Nhà máy hiện đại mất 5 giờ. Xưởng trung bình mất 7 giờ. Đó là thời gian lao động **cá biệt** của từng nơi.",
        conceptId: "tgld-ca-biet",
      },
      {
        id: "gt-beat-2",
        heading: "Thị trường chỉ thấy một chiếc áo",
        body: "Trên thị trường, các chiếc áo cùng loại là như nhau. Người mua không hỏi nơi nào làm chậm hơn. Giá trị của áo phải dựa trên thời gian lao động **xã hội cần thiết**.",
        conceptId: "tgldxhct",
      },
      {
        id: "gt-beat-3",
        heading: "Ai cung cấp nhiều hơn?",
        body: "Hãy đổi thị phần giữa ba nơi. Khi một nơi cung cấp đại bộ phận số áo, thời gian lao động xã hội cần thiết tiến gần thời gian cá biệt của nơi đó.",
        conceptId: "tgldxhct",
      },
      {
        id: "gt-beat-4",
        heading: "Giá trị không đứng yên",
        body: "Lượng giá trị hàng hóa luôn thay đổi, chịu ảnh hưởng của năng suất lao động và mức độ phức tạp của lao động.",
        conceptId: "luong-gia-tri",
      },
    ],
  },
  factories: [
    { id: "A", name: "Xưởng thủ công", hoursPerShirt: 10 },
    { id: "B", name: "Nhà máy hiện đại", hoursPerShirt: 5 },
    { id: "C", name: "Xưởng trung bình", hoursPerShirt: 7 },
  ],
  scenarios: [
    {
      id: "b-dai-bo-phan",
      label: "B chiếm đại bộ phận",
      output: { A: 100, B: 800, C: 100 },
      note: "Nhà máy B cung cấp 800 trong 1.000 chiếc áo. Thời gian lao động xã hội cần thiết trong mô hình là 5,7 giờ, gần với 5 giờ của B. B hao phí ít hơn mức xã hội 0,7 giờ mỗi áo. A hao phí nhiều hơn 4,3 giờ, C nhiều hơn 1,3 giờ.",
    },
    {
      id: "a-dai-bo-phan",
      label: "A chiếm đại bộ phận",
      output: { A: 800, B: 100, C: 100 },
      note: "Xưởng thủ công A cung cấp 800 trong 1.000 chiếc áo. Thời gian lao động xã hội cần thiết trong mô hình là 9,2 giờ, gần với 10 giờ của A. B hao phí ít hơn mức xã hội 4,2 giờ mỗi áo, C ít hơn 2,2 giờ. A hao phí nhiều hơn 0,8 giờ.",
    },
    {
      id: "ngang-nhau",
      label: "Ba nơi ngang nhau",
      output: { A: 300, B: 300, C: 300 },
      note: "Mỗi nơi cung cấp 300 chiếc. Thời gian lao động xã hội cần thiết trong mô hình xấp xỉ 7,3 giờ, là trung bình của 10, 5 và 7. B hao phí ít hơn 2,3 giờ, C ít hơn 0,3 giờ, còn A nhiều hơn 2,7 giờ.",
    },
  ],
  method:
    "Mô hình xấp xỉ thời gian lao động xã hội cần thiết bằng bình quân gia quyền của thời gian lao động cá biệt, lấy sản lượng của mỗi nơi làm trọng số: cộng (giờ mỗi áo nhân số áo) của từng nơi rồi chia cho tổng số áo. Cách tính này tiến gần thời gian lao động cá biệt của nhà sản xuất cung cấp đại bộ phận hàng hóa. Đây là cách mô hình hóa của đề án để minh họa; bài giảng chỉ mô tả thời gian lao động xã hội cần thiết là thời gian trong điều kiện bình thường của xã hội, không đưa công thức bình quân gia quyền này.",
  assumptions: [
    {
      id: "gt-as-1",
      text: "Các chiếc áo của ba nơi có cùng chất lượng, cùng giá trị sử dụng, nên so sánh trực tiếp được.",
    },
    {
      id: "gt-as-2",
      text: "Cùng một loại lao động giản đơn trung bình, cùng cường độ lao động trung bình ở cả ba nơi.",
    },
    {
      id: "gt-as-3",
      text: "Thời gian lao động cá biệt (giờ mỗi áo) của mỗi nơi giữ cố định trong cả ba kịch bản. Chỉ có sản lượng thay đổi.",
    },
    {
      id: "gt-as-4",
      text: "Toàn bộ số áo đều được đưa ra thị trường và bán hết. Điều kiện sản xuất của xã hội chỉ gồm ba nơi này.",
    },
    {
      id: "gt-as-5",
      text: "Bình quân gia quyền theo sản lượng chỉ là cách xấp xỉ của đề án. Bài giảng mô tả thời gian lao động xã hội cần thiết bằng lời (điều kiện bình thường, trình độ kỹ thuật, khéo léo và cường độ lao động trung bình), không đưa công thức này.",
    },
  ],
  factors: [
    {
      id: "nang-suat-lao-dong",
      term: "Năng suất lao động",
      definition:
        "Năng suất lao động là năng lực sản xuất của lao động, được tính bằng số lượng sản phẩm sản xuất ra trong một đơn vị thời gian, hoặc số lượng thời gian cần thiết để sản xuất ra một đơn vị sản phẩm.",
      explanation:
        "Năng suất lao động tăng thì lượng lao động kết tinh trong một đơn vị hàng hóa giảm, nên giá trị hàng hóa giảm: năng suất lao động tỷ lệ nghịch với giá trị (và giá cả) hàng hóa. Năng suất lao động cá biệt tăng thì giá cả cá biệt giảm, nhà sản xuất đạt lợi nhuận cao.",
      tshirtExample:
        "Máy dệt mới giúp nhà máy B làm một chiếc áo trong 5 giờ thay vì 10 giờ. Mỗi chiếc áo chứa ít lao động hơn, nên giá trị mỗi chiếc giảm khi mức này trở thành phổ biến.",
      source: ok("Các nhân tố ảnh hưởng đến lượng giá trị hàng hóa; Năng suất lao động", "34–37"),
    },
    {
      id: "tinh-chat-phuc-tap",
      term: "Mức độ phức tạp của lao động (lao động giản đơn và lao động phức tạp)",
      definition:
        "Lao động phức tạp quy đổi thành n lần lao động giản đơn. Mức độ phức tạp của lao động tăng thì lượng lao động kết tinh trong hàng hóa tăng, nên giá trị hàng hóa tăng.",
      explanation:
        "Mức độ phức tạp của lao động tỷ lệ thuận với giá trị (và giá cả) hàng hóa. Trong cùng một thời gian, lao động phức tạp, chuyên môn, lành nghề tạo ra nhiều giá trị hơn lao động giản đơn.",
      tshirtExample:
        "Một giờ lao động của thợ cắt may lành nghề, thiết kế rập mẫu, tạo ra nhiều giá trị hơn một giờ của người làm công việc đóng gói đơn giản.",
      source: ok("Các nhân tố ảnh hưởng đến lượng giá trị hàng hóa; Mức độ phức tạp của lao động", "27–28, 34, 37"),
    },
  ],
  academic: {
    concepts: [
      {
        id: "gia-tri-hang-hoa",
        term: "Giá trị hàng hóa (chất của giá trị)",
        definition:
          "Chất của giá trị hàng hóa là lao động xã hội của người làm ra hàng hóa, kết tinh trong hàng hóa. Lao động cụ thể tạo ra giá trị sử dụng, lao động trừu tượng tạo nên giá trị.",
        explanation:
          "Lao động xã hội là mức trung bình của các lao động tư nhân. Vì giá trị là lao động xã hội kết tinh, những vật hoàn toàn khác nhau về công dụng vẫn so sánh và trao đổi được với nhau.",
        tshirtExample:
          "Chiếc áo thun chứa lao động của người trồng bông, kéo sợi, dệt và may. Tổng hao phí lao động xã hội ấy tạo nên giá trị của chiếc áo.",
        source: ok("Giá trị hàng hóa — chất của giá trị; Tại sao phải là lao động xã hội?", "24–25, 43–46"),
      },
      {
        id: "luong-gia-tri",
        term: "Lượng giá trị hàng hóa",
        definition:
          "Lượng giá trị hàng hóa là lượng lao động hao phí để sản xuất ra hàng hóa đó. Thước đo của nó là thời gian lao động xã hội cần thiết.",
        explanation:
          "Lượng giá trị không do thời gian lao động cá biệt của từng người quyết định. Nó luôn thay đổi, chịu ảnh hưởng của năng suất lao động và mức độ phức tạp của lao động.",
        tshirtExample:
          "Dù xưởng A mất 10 giờ cho một chiếc áo, chiếc áo ấy vẫn chỉ có lượng giá trị tương ứng với thời gian lao động xã hội cần thiết.",
        source: ok("Lượng giá trị hàng hóa; Thước đo của lượng giá trị hàng hóa", "26, 28–30, 34"),
      },
      {
        id: "tgld-ca-biet",
        term: "Thời gian lao động cá biệt",
        definition:
          "Thời gian lao động cá biệt là thời gian lao động hao phí của từng người sản xuất để sản xuất ra một hàng hóa. Nó quyết định lượng giá trị cá biệt của hàng hóa của người đó.",
        explanation:
          "Mỗi nhà sản xuất có trình độ công nghệ và tay nghề khác nhau, nên thời gian lao động cá biệt khác nhau. Thị trường thừa nhận mức xã hội, không thừa nhận mức cá biệt.",
        tshirtExample:
          "Xưởng thủ công A mất 10 giờ, nhà máy hiện đại B mất 5 giờ, xưởng trung bình C mất 7 giờ. Đó là ba thời gian lao động cá biệt.",
        source: chk(
          "Các nhân tố ảnh hưởng đến lượng giá trị hàng hóa (năng suất lao động cá biệt)",
          NOT_FOUND + ". Bài giảng chỉ nói về “năng suất lao động cá biệt” và “giá trị cá biệt” của hàng hóa (tr.34, 91), không định nghĩa riêng “thời gian lao động cá biệt”. Khái niệm này là cách diễn đạt của đề án, đối lập với thời gian lao động xã hội cần thiết."
        ),
      },
    ],
    distinctions: [
      {
        id: "dist-ca-biet-xhct",
        title: "Thời gian lao động cá biệt và thời gian lao động xã hội cần thiết",
        left: {
          term: "Thời gian lao động cá biệt",
          points: [
            "Là thời gian hao phí của từng người sản xuất.",
            "Khác nhau giữa các nhà sản xuất, tùy năng suất lao động cá biệt.",
            "Quyết định giá trị cá biệt của hàng hóa.",
          ],
        },
        right: {
          term: "Thời gian lao động xã hội cần thiết",
          points: [
            "Là thời gian cần thiết để sản xuất một đơn vị hàng hóa trong điều kiện bình thường của xã hội, với trình độ kỹ thuật, độ khéo léo và cường độ lao động trung bình.",
            "Là thước đo lượng giá trị hàng hóa.",
            "Điều kiện sản xuất tốt hơn mức này thì lợi nhuận cao; kém hơn thì thất bại, bị đào thải.",
          ],
        },
        takeaway:
          "Lượng giá trị của hàng hóa do thời gian lao động xã hội cần thiết quyết định, không phải do thời gian lao động cá biệt.",
        source: ok("Thước đo của lượng giá trị hàng hóa; Cạnh tranh trong nội bộ ngành", "28–30, 34, 91"),
      },
    ],
  },
  check: [
    {
      id: "gt-q1",
      prompt:
        "Trong mô hình, nhà máy B (5 giờ mỗi áo) cung cấp 800 trong 1.000 chiếc áo. Thời gian lao động xã hội cần thiết sẽ như thế nào?",
      options: [
        { id: "a", text: "Bằng đúng 5 giờ, vì B chiếm đại bộ phận." },
        { id: "b", text: "Bằng khoảng 7,3 giờ, là trung bình cộng của ba nơi." },
        { id: "c", text: "Bằng 10 giờ, vì người sản xuất chậm nhất quyết định giá trị." },
        { id: "d", text: "Gần với 5 giờ của B (5,7 giờ trong mô hình)." },
      ],
      correct: "d",
      explanation:
        "Đúng là d, theo cách tính của mô hình: (10 × 100 + 5 × 800 + 7 × 100) / 1.000 = 5,7 giờ. Phương án a quá tuyệt đối vì mô hình chỉ xấp xỉ. Phương án b bỏ qua thị phần. Phương án c sai vì người làm chậm nhất không quyết định: thước đo là thời gian trong điều kiện bình thường của xã hội. Lưu ý: bình quân gia quyền là cách mô hình hóa của đề án, không phải công thức trong bài giảng.",
      source: chk(
        "Thước đo của lượng giá trị hàng hóa",
        NOT_FOUND + " cho cách tính bình quân gia quyền theo thị phần (đây là mô hình của đề án). Phần đúng theo bài giảng: thời gian lao động xã hội cần thiết là thời gian trong điều kiện bình thường của xã hội, không phải của người làm chậm nhất (tr.28–30)."
      ),
    },
    {
      id: "gt-q2",
      prompt:
        "Nhà máy B nhập máy mới làm một chiếc áo trong 5 giờ thay vì 10 giờ, và mức này lan rộng toàn xã hội. Điều gì xảy ra với lượng giá trị của một chiếc áo?",
      options: [
        { id: "a", text: "Tăng lên, vì áo làm ra bằng máy tốt hơn." },
        { id: "b", text: "Không đổi, vì giá trị gắn với công dụng của áo." },
        { id: "c", text: "Giảm xuống, vì thời gian lao động xã hội cần thiết cho một chiếc áo giảm." },
        { id: "d", text: "Không xác định được vì phụ thuộc vào giá bán." },
      ],
      correct: "c",
      explanation:
        "Đúng là c. Năng suất lao động tăng thì lượng lao động kết tinh trong hàng hóa giảm, nên lượng giá trị một đơn vị hàng hóa giảm (năng suất lao động tỷ lệ nghịch với giá trị hàng hóa). Phương án a nhầm công dụng với giá trị. Phương án d nhầm giá cả với giá trị.",
      source: ok("Các nhân tố ảnh hưởng đến lượng giá trị hàng hóa", "34, 37"),
    },
  ],
};

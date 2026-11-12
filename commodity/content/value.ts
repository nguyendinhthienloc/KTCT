import type { Source, ValueContent } from "./schema";

const src = (section: string, note?: string): Source => ({
  chapter: "Chương 2",
  section,
  page: "?",
  needsCheck: true,
  ...(note ? { note } : {}),
});

const S_LGT = "2.1.2. Hàng hóa — lượng giá trị hàng hóa và các nhân tố ảnh hưởng";

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
        body: "Lượng giá trị còn thay đổi theo năng suất lao động, cường độ lao động và mức độ phức tạp của lao động.",
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
    "Mô hình xấp xỉ thời gian lao động xã hội cần thiết bằng bình quân gia quyền của thời gian lao động cá biệt, lấy sản lượng của mỗi nơi làm trọng số: cộng (giờ mỗi áo nhân số áo) của từng nơi rồi chia cho tổng số áo. Cách tính này tiến gần thời gian lao động cá biệt của nhà sản xuất cung cấp đại bộ phận hàng hóa. Điều đó phù hợp với nhận định của giáo trình. Đây là mô hình minh họa, không phải công thức do giáo trình đưa ra.",
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
      text: "Bình quân gia quyền theo sản lượng chỉ là cách xấp xỉ. Giáo trình mô tả thời gian lao động xã hội cần thiết bằng lời, không đưa công thức này.",
    },
  ],
  factors: [
    {
      id: "nang-suat-lao-dong",
      term: "Năng suất lao động",
      definition:
        "Năng suất lao động là năng lực sản xuất của người lao động, được tính bằng số lượng sản phẩm làm ra trong một đơn vị thời gian, hoặc bằng lượng thời gian lao động hao phí để làm ra một đơn vị sản phẩm.",
      explanation:
        "Năng suất lao động tăng thì thời gian lao động cần thiết cho mỗi sản phẩm giảm. Lượng giá trị của một đơn vị hàng hóa giảm, còn tổng giá trị tạo ra trong cùng một thời gian lao động thì không đổi.",
      tshirtExample:
        "Máy dệt mới giúp nhà máy B làm một chiếc áo trong 5 giờ thay vì 10 giờ. Mỗi chiếc áo chứa ít lao động hơn, nên giá trị mỗi chiếc giảm khi mức này trở thành phổ biến.",
      source: src(S_LGT),
    },
    {
      id: "cuong-do-lao-dong",
      term: "Cường độ lao động",
      definition:
        "Cường độ lao động là mức độ khẩn trương, nặng nhọc của lao động trong một đơn vị thời gian.",
      explanation:
        "Cường độ lao động tăng nghĩa là cùng một thời gian, người lao động hao phí nhiều sức hơn và làm ra nhiều sản phẩm hơn. Tổng giá trị tăng, nhưng giá trị của một đơn vị hàng hóa không đổi.",
      tshirtExample:
        "Công nhân may làm việc dồn dập hơn, hoàn thành 10 áo thay vì 8 áo trong một ca. Mỗi áo vẫn chứa lượng lao động như cũ.",
      source: src(S_LGT, "Cần đối chiếu cách giáo trình diễn đạt về tác động của cường độ lao động."),
    },
    {
      id: "tinh-chat-phuc-tap",
      term: "Tính chất phức tạp của lao động (lao động giản đơn và lao động phức tạp)",
      definition:
        "Lao động giản đơn là lao động mà bất kỳ người lao động bình thường nào, không cần phải trải qua đào tạo cũng có thể thực hiện được. Lao động phức tạp là lao động đòi hỏi phải được đào tạo, huấn luyện thành lao động chuyên môn, lành nghề.",
      explanation:
        "Trong cùng một thời gian, lao động phức tạp tạo ra nhiều giá trị hơn lao động giản đơn. Lao động phức tạp được coi là lao động giản đơn nhân bội lên.",
      tshirtExample:
        "Một giờ lao động của thợ cắt may lành nghề, thiết kế rập mẫu, tạo ra nhiều giá trị hơn một giờ của người làm công việc đóng gói đơn giản.",
      source: src(S_LGT),
    },
  ],
  academic: {
    concepts: [
      {
        id: "gia-tri-hang-hoa",
        term: "Giá trị hàng hóa (chất của giá trị)",
        definition:
          "Chất của giá trị hàng hóa là lao động trừu tượng của người sản xuất hàng hóa kết tinh trong hàng hóa. Lao động cụ thể tạo ra giá trị sử dụng, lao động trừu tượng tạo ra giá trị.",
        explanation:
          "Vì giá trị là lao động xã hội kết tinh, những vật hoàn toàn khác nhau về công dụng vẫn so sánh và trao đổi được với nhau.",
        tshirtExample:
          "Chiếc áo thun chứa lao động trừu tượng của người trồng bông, kéo sợi, dệt và may. Tổng hao phí ấy tạo nên giá trị của chiếc áo.",
        source: src(S_LGT),
      },
      {
        id: "luong-gia-tri",
        term: "Lượng giá trị hàng hóa",
        definition:
          "Lượng giá trị hàng hóa là lượng lao động xã hội của người sản xuất kết tinh trong hàng hóa, được đo bằng thời gian lao động xã hội cần thiết để sản xuất ra hàng hóa đó.",
        explanation:
          "Lượng giá trị không do thời gian lao động cá biệt của từng người quyết định. Nó chịu ảnh hưởng của năng suất lao động, cường độ lao động và tính chất phức tạp của lao động.",
        tshirtExample:
          "Dù xưởng A mất 10 giờ cho một chiếc áo, chiếc áo ấy vẫn chỉ có lượng giá trị tương ứng với thời gian lao động xã hội cần thiết.",
        source: src(S_LGT),
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
        source: src(
          S_LGT,
          "Cần đối chiếu: giáo trình có thể không định nghĩa riêng khái niệm này mà chỉ đối lập với thời gian lao động xã hội cần thiết."
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
            "Khác nhau giữa các nhà sản xuất, tùy công nghệ và tay nghề.",
            "Quyết định giá trị cá biệt của hàng hóa.",
          ],
        },
        right: {
          term: "Thời gian lao động xã hội cần thiết",
          points: [
            "Là thời gian cần để sản xuất một giá trị sử dụng trong điều kiện bình thường của xã hội, với trình độ thành thạo và cường độ trung bình.",
            "Thường đồng nhất với thời gian cá biệt của người cung cấp đại bộ phận hàng hóa.",
            "Quyết định lượng giá trị xã hội của hàng hóa.",
          ],
        },
        takeaway:
          "Lượng giá trị của hàng hóa do thời gian lao động xã hội cần thiết quyết định, không phải do thời gian lao động cá biệt.",
        source: src(S_LGT),
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
        "Đúng là d. Mô hình lấy bình quân theo sản lượng: (10 × 100 + 5 × 800 + 7 × 100) / 1.000 = 5,7 giờ. Phương án a quá tuyệt đối vì mô hình chỉ xấp xỉ. Phương án b bỏ qua thị phần. Phương án c sai vì người làm chậm nhất không quyết định.",
      source: src(S_LGT),
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
        "Đúng là c. Năng suất lao động tăng thì thời gian lao động xã hội cần thiết cho một sản phẩm giảm, nên lượng giá trị một đơn vị hàng hóa giảm. Phương án a nhầm công dụng với giá trị. Phương án d nhầm giá cả với giá trị.",
      source: src(S_LGT),
    },
  ],
};

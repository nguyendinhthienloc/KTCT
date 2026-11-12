import type { CommodityContent, Source } from "./schema";

const src = (section: string, note?: string): Source => ({
  chapter: "Chương 2",
  section,
  page: "?",
  needsCheck: true,
  ...(note ? { note } : {}),
});

const S212 = "2.1.2. Hàng hóa";

export const commodity: CommodityContent = {
  chapterId: "hang-hoa",
  visual: {
    lead: "Chiếc áo trắng nằm trước mặt bạn. Hãy chạm vào từng điểm trên áo để xem điều gì làm nó trở thành hàng hóa.",
    beats: [
      {
        id: "hh-beat-1",
        heading: "Một chiếc áo, hai câu hỏi",
        body: "Chiếc áo mặc được, giữ ấm và che nắng. Công dụng ấy là **giá trị sử dụng**. Nhưng đó mới là một nửa câu chuyện.",
        conceptId: "gia-tri-su-dung",
      },
      {
        id: "hh-beat-2",
        heading: "Có công dụng chưa đủ",
        body: "Một chiếc áo tự may để tự mặc có công dụng, nhưng chưa là hàng hóa. Chỉ khi được đem trao đổi, mua bán, nó mới trở thành **hàng hóa**.",
        conceptId: "hang-hoa",
      },
      {
        id: "hh-beat-3",
        heading: "Cái chung ẩn sau chiếc áo",
        body: "Áo và gạo có công dụng hoàn toàn khác nhau, vậy mà vẫn so sánh được với nhau. Điểm chung là cả hai đều là sản phẩm của lao động. Lao động xã hội kết tinh trong hàng hóa là **giá trị**.",
        conceptId: "gia-tri",
      },
      {
        id: "hh-beat-4",
        heading: "Giá trị hiện ra khi trao đổi",
        body: "Ta không nhìn thấy giá trị. Ta chỉ thấy nó qua tỷ lệ trao đổi, ví dụ một chiếc áo đổi được bao nhiêu hàng hóa khác. Đó là **giá trị trao đổi**.",
        conceptId: "gia-tri-trao-doi",
      },
    ],
  },
  hotspots: [
    {
      id: "hs-chat-lieu",
      x: 50,
      y: 12,
      label: "Chất liệu cotton",
      conceptId: "gia-tri-su-dung",
      body: "Sợi cotton mềm, thấm mồ hôi và thoáng khí. Những thuộc tính tự nhiên của vật làm cho nó có ích với con người. Đó là cơ sở của **giá trị sử dụng**.",
    },
    {
      id: "hs-cong-dung",
      x: 50,
      y: 40,
      label: "Công dụng",
      conceptId: "gia-tri-su-dung",
      body: "Chiếc áo dùng để mặc: giữ ấm, che nắng, làm đẹp. **Giá trị sử dụng** là công dụng của vật, thỏa mãn một nhu cầu nào đó của con người.",
    },
    {
      id: "hs-nhu-cau",
      x: 18,
      y: 28,
      label: "Nhu cầu",
      conceptId: "hang-hoa",
      body: "Có người cần mặc áo, nhưng không tự làm ra nó. Nhu cầu ấy chỉ được thỏa mãn thông qua trao đổi, mua bán. Vì vậy chiếc áo là **hàng hóa**.",
    },
    {
      id: "hs-trao-doi",
      x: 72,
      y: 20,
      label: "Mác giá — trao đổi",
      conceptId: "gia-tri-trao-doi",
      body: "Mác giá cho biết chiếc áo trao đổi được với bao nhiêu tiền hay hàng hóa khác. Đó là **giá trị trao đổi**, hình thức biểu hiện ra bên ngoài của giá trị.",
    },
    {
      id: "hs-lao-dong",
      x: 50,
      y: 88,
      label: "Lao động kết tinh",
      conceptId: "gia-tri",
      body: "Đường may ở gấu áo là dấu vết của lao động. Lao động xã hội của người sản xuất kết tinh trong chiếc áo tạo nên **giá trị** của nó.",
    },
  ],
  academic: {
    concepts: [
      {
        id: "hang-hoa",
        term: "Hàng hóa",
        definition:
          "Hàng hóa là sản phẩm của lao động, có thể thỏa mãn nhu cầu nào đó của con người thông qua trao đổi, mua bán.",
        explanation:
          "Hàng hóa có thể ở dạng vật thể hoặc phi vật thể. Một sản phẩm chỉ là hàng hóa khi nó được làm ra để trao đổi, mua bán. Hàng hóa có hai thuộc tính: giá trị sử dụng và giá trị.",
        tshirtExample:
          "Chiếc áo may sẵn để bán trong cửa hàng là hàng hóa. Chiếc áo bạn tự may để mặc, không đem trao đổi, thì chưa phải hàng hóa.",
        source: src(S212),
      },
      {
        id: "gia-tri-su-dung",
        term: "Giá trị sử dụng",
        definition:
          "Giá trị sử dụng của hàng hóa là công dụng của vật, có thể thỏa mãn nhu cầu nào đó của con người.",
        explanation:
          "Công dụng này do thuộc tính tự nhiên của vật quyết định. Giá trị sử dụng được thể hiện khi sử dụng hay tiêu dùng, và là nội dung vật chất của của cải.",
        tshirtExample:
          "Áo cotton thấm hút mồ hôi, che nắng, giữ ấm. Đó là giá trị sử dụng của chiếc áo.",
        source: src(S212),
      },
      {
        id: "gia-tri",
        term: "Giá trị (của hàng hóa)",
        definition:
          "Giá trị của hàng hóa là lao động xã hội của người sản xuất hàng hóa kết tinh trong hàng hóa.",
        explanation:
          "Giá trị là thuộc tính xã hội của hàng hóa. Ta không nhìn, sờ được giá trị. Nó biểu hiện ra ngoài qua giá trị trao đổi.",
        tshirtExample:
          "Trong chiếc áo kết tinh lao động của người trồng bông, kéo sợi, dệt vải và may. Đó là cơ sở để chiếc áo có giá trị.",
        source: src(S212),
      },
      {
        id: "gia-tri-trao-doi",
        term: "Giá trị trao đổi",
        definition:
          "Giá trị trao đổi là quan hệ về số lượng, hay tỷ lệ trao đổi giữa những giá trị sử dụng khác nhau. Nó là hình thức biểu hiện ra bên ngoài của giá trị.",
        explanation:
          "Giá trị là nội dung, là cơ sở của giá trị trao đổi. Giá trị trao đổi là hình thức biểu hiện của giá trị trong quan hệ trao đổi.",
        tshirtExample:
          "Một chiếc áo trao đổi được với một lượng gạo hay một số tiền nhất định. Tỷ lệ ấy là giá trị trao đổi của chiếc áo.",
        source: src(S212),
      },
    ],
    distinctions: [
      {
        id: "dist-gtsd-gt",
        title: "Giá trị sử dụng và giá trị",
        left: {
          term: "Giá trị sử dụng",
          points: [
            "Là công dụng của vật, do thuộc tính tự nhiên quyết định.",
            "Khác nhau giữa các hàng hóa: áo để mặc, gạo để ăn.",
            "Được thực hiện khi sử dụng, tiêu dùng.",
          ],
        },
        right: {
          term: "Giá trị",
          points: [
            "Là lao động xã hội của người sản xuất kết tinh trong hàng hóa.",
            "Là thuộc tính chung của mọi hàng hóa, nên các hàng hóa so sánh và trao đổi được với nhau.",
            "Chỉ biểu hiện ra ngoài qua giá trị trao đổi.",
          ],
        },
        takeaway:
          "Giá trị sử dụng trả lời câu hỏi “dùng để làm gì”. Giá trị trả lời câu hỏi “vì sao trao đổi được với nhau”. Hàng hóa phải có cả hai thuộc tính.",
        source: src(
          S212,
          "Ý nghĩa kinh tế: người mua quan tâm giá trị sử dụng, người bán quan tâm giá trị. Cần đối chiếu cách giáo trình diễn đạt."
        ),
      },
    ],
  },
  check: [
    {
      id: "hh-q1",
      prompt:
        "Một người tự may một chiếc áo thun để tự mặc, không đem trao đổi hay bán. Nhận định nào đúng?",
      options: [
        { id: "a", text: "Chiếc áo là hàng hóa, vì nó có giá trị sử dụng." },
        { id: "b", text: "Chiếc áo chưa phải là hàng hóa, vì nó không được làm ra để trao đổi, mua bán." },
        { id: "c", text: "Chiếc áo là hàng hóa, vì nó là sản phẩm của lao động." },
        { id: "d", text: "Chiếc áo là hàng hóa, vì nó thỏa mãn nhu cầu của người mặc." },
      ],
      correct: "b",
      explanation:
        "Đúng là b. Hàng hóa là sản phẩm của lao động thỏa mãn nhu cầu của con người thông qua trao đổi, mua bán. Các phương án a, c, d chỉ nêu công dụng hoặc việc có lao động. Đó là điều kiện cần, nhưng chưa đủ nếu sản phẩm không đi vào trao đổi.",
      source: src(S212),
    },
    {
      id: "hh-q2",
      prompt:
        "Chiếc áo và một lượng gạo có công dụng hoàn toàn khác nhau nhưng vẫn trao đổi được với nhau theo một tỷ lệ nhất định. Điều gì là cơ sở chung của việc trao đổi?",
      options: [
        { id: "a", text: "Cả hai đều thỏa mãn nhu cầu của con người." },
        { id: "b", text: "Cả hai đều làm từ nguyên liệu tự nhiên." },
        { id: "c", text: "Cả hai đều là sản phẩm của lao động, trong đó kết tinh lao động xã hội của người sản xuất (giá trị)." },
        { id: "d", text: "Cả hai đều có giá bán bằng tiền." },
      ],
      correct: "c",
      explanation:
        "Đúng là c. Cơ sở chung là giá trị. Phương án a nói về giá trị sử dụng, vốn khác nhau giữa áo và gạo nên không làm cơ sở so sánh. Phương án d nhầm hình thức biểu hiện (giá cả) với cơ sở bên trong của trao đổi.",
      source: src(S212),
    },
  ],
};

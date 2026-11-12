import type { CommodityContent, Source } from "./schema";

const CH = "Bài giảng Chương 2: Hàng hóa, thị trường và vai trò của các chủ thể tham gia thị trường";

const ok = (section: string, page: string, note?: string): Source => ({
  chapter: CH,
  section,
  page,
  ...(note ? { note } : {}),
});

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
          "Mọi hàng hóa đều là sản phẩm, nhưng không phải mọi sản phẩm đều là hàng hóa: muốn thành hàng hóa, sản phẩm phải được làm ra không phải để làm tư liệu sinh hoạt trực tiếp cho chính người sản xuất. Hàng hóa có thể hữu hình hoặc vô hình, và có hai thuộc tính là giá trị sử dụng và giá trị.",
        tshirtExample:
          "Chiếc áo may sẵn để bán trong cửa hàng là hàng hóa. Chiếc áo bạn tự may để mặc, không đem trao đổi, thì chưa phải hàng hóa.",
        source: ok("1.2. Hàng hóa; So sánh giữa sản phẩm và hàng hóa; 1.4. Phân loại hàng hóa", "12–13, 73"),
      },
      {
        id: "gia-tri-su-dung",
        term: "Giá trị sử dụng",
        definition:
          "Giá trị sử dụng của hàng hóa là công dụng của vật phẩm, có thể thỏa mãn nhu cầu nào đó của con người.",
        explanation:
          "Giá trị sử dụng là tính có ích của sản phẩm, do thuộc tính tự nhiên của vật quyết định, được thể hiện ra trong tiêu dùng. Đó là phạm trù vĩnh viễn, gắn với nội dung vật chất cấu thành của hàng hóa.",
        tshirtExample:
          "Áo cotton thấm hút mồ hôi, che nắng, giữ ấm. Đó là giá trị sử dụng của chiếc áo.",
        source: ok("Hai thuộc tính của hàng hóa — Giá trị sử dụng", "15–17, 39"),
      },
      {
        id: "gia-tri",
        term: "Giá trị (của hàng hóa)",
        definition:
          "Giá trị của hàng hóa là lượng lao động xã hội của người sản xuất hàng hóa “kết tinh” trong hàng hóa đó. Giá trị là phạm trù lịch sử.",
        explanation:
          "Giá trị là thuộc tính xã hội của hàng hóa. Giá trị là khái niệm trừu tượng, người ta không nắm được nó ở chỗ nào, nên muốn xác định giá trị phải thông qua giá trị trao đổi.",
        tshirtExample:
          "Trong chiếc áo kết tinh lao động của người trồng bông, kéo sợi, dệt vải và may. Đó là cơ sở để chiếc áo có giá trị.",
        source: ok("Giá trị hàng hóa", "18, 21, 24, 39"),
      },
      {
        id: "gia-tri-trao-doi",
        term: "Giá trị trao đổi",
        definition:
          "Giá trị trao đổi là một quan hệ về số lượng, là một tỷ lệ theo đó những giá trị sử dụng loại này được trao đổi với những giá trị sử dụng loại khác.",
        explanation:
          "Giá trị trao đổi phụ thuộc vào giá trị hàng hóa. Giá trị được biểu hiện qua trao đổi bằng hiện vật (hàng đổi hàng) hoặc bằng tiền (giá cả). Ví dụ trong bài giảng: 10 kg gạo = 2 m vải = 8 giờ lao động xã hội.",
        tshirtExample:
          "Một chiếc áo trao đổi được với một lượng gạo hay một số tiền nhất định. Tỷ lệ ấy là giá trị trao đổi của chiếc áo.",
        source: ok("Giá trị hàng hóa (mặt lượng) — giá trị trao đổi", "18–19, 45"),
      },
    ],
    distinctions: [
      {
        id: "dist-gtsd-gt",
        title: "Giá trị sử dụng và giá trị",
        left: {
          term: "Giá trị sử dụng",
          points: [
            "Là công dụng của vật phẩm, thuộc tính tự nhiên của hàng hóa; là phạm trù vĩnh viễn.",
            "Khác nhau giữa các hàng hóa: áo để mặc, gạo để ăn.",
            "Được thực hiện sau, thể hiện ra trong sử dụng, tiêu dùng.",
          ],
        },
        right: {
          term: "Giá trị",
          points: [
            "Là lượng lao động xã hội của người sản xuất kết tinh trong hàng hóa; là thuộc tính xã hội, phạm trù lịch sử.",
            "Là cái chung của mọi hàng hóa, nên các hàng hóa so sánh và trao đổi được với nhau.",
            "Được thực hiện trước; muốn xác định phải thông qua giá trị trao đổi.",
          ],
        },
        takeaway:
          "Giá trị và giá trị sử dụng là hai mặt đối lập của hàng hóa, và bất kỳ hàng hóa nào cũng chứa đựng cả hai. Người tiêu dùng quan tâm giá trị sử dụng tốt nhất trong tầm giá; người sản xuất quan tâm giá trị. Có giá trị sử dụng nhưng không có giá trị thì là sản phẩm, không phải hàng hóa.",
        source: ok("Mối quan hệ giữa giá trị sử dụng và giá trị hàng hóa", "39–40"),
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
        "Đúng là b. Hàng hóa là sản phẩm của lao động, thỏa mãn nhu cầu của con người thông qua trao đổi, mua bán. Mọi hàng hóa đều là sản phẩm nhưng chưa phải mọi sản phẩm là hàng hóa: sản phẩm có giá trị sử dụng nhưng không có giá trị, tức không được làm ra để trao đổi, thì chưa phải hàng hóa. Các phương án a, c, d chỉ nêu công dụng hoặc việc có lao động, là điều kiện cần nhưng chưa đủ.",
      source: ok("So sánh giữa sản phẩm và hàng hóa; Mối quan hệ giữa giá trị sử dụng và giá trị hàng hóa", "13, 40"),
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
        "Đúng là c. Cơ sở chung là giá trị. Phương án a nói về giá trị sử dụng, vốn khác nhau giữa áo và gạo nên không làm cơ sở so sánh. Phương án d nhầm hình thức biểu hiện (giá cả) với cơ sở bên trong của trao đổi. Ví dụ bài giảng: 10 kg gạo = 2 m vải = 8 giờ lao động xã hội.",
      source: ok("Giá trị hàng hóa; Giá trị trao đổi", "18–19, 21"),
    },
  ],
};

import type { MarketContent, Source } from "./schema";

const CH = "Bài giảng Chương 2: Hàng hóa, thị trường và vai trò của các chủ thể tham gia thị trường";

const ok = (section: string, page: string, note?: string): Source => ({
  chapter: CH,
  section,
  page,
  ...(note ? { note } : {}),
});

export const market: MarketContent = {
  chapterId: "thi-truong",
  visual: {
    lead: "Chiếc áo ra khỏi xưởng và đến thị trường. Ở đó, giá của nó lên xuống mỗi ngày. Vậy giá trị có còn quan trọng không?",
    beats: [
      {
        id: "tt-beat-1",
        heading: "Chiếc áo có một con số",
        body: "Khi đem bán, giá trị của chiếc áo được biểu hiện bằng một số tiền nhất định. Đó là **giá cả**.",
        conceptId: "gia-ca",
      },
      {
        id: "tt-beat-2",
        heading: "Giá lên, giá xuống",
        body: "Giá cả thị trường không đứng yên. Khi số áo nhiều hơn nhu cầu, giá giảm. Khi ít hơn nhu cầu, giá tăng. Đó là tác động của quan hệ **cung và cầu**.",
        conceptId: "cung-cau",
      },
      {
        id: "tt-beat-3",
        heading: "Nhưng vẫn quanh một đường",
        body: "Giá cả lên xuống quanh giá trị. Giá trị là cơ sở của giá cả, nên mọi dao động cuối cùng vẫn gắn với **quy luật giá trị**.",
        conceptId: "quy-luat-gia-tri",
      },
      {
        id: "tt-beat-4",
        heading: "Ai thắng, ai thua?",
        body: "Áo bán theo giá trị xã hội. Nhà sản xuất làm nhanh hơn mức xã hội thì lợi nhuận cao, người làm chậm hơn thì thất bại. **Cạnh tranh** buộc mọi người phải cải tiến, hạ giá trị cá biệt; phần giá trị thặng dư thu được có thể dùng để **tích lũy tư bản**.",
        conceptId: "canh-tranh",
      },
    ],
  },
  valuePerShirt: 100,
  scenarios: [
    {
      id: "cung-lon-hon-cau",
      label: "Cung > Cầu",
      priceDeviation: -15,
      note: "Áo nhiều hơn nhu cầu có khả năng thanh toán, người bán phải cạnh tranh nên giá thấp hơn giá trị. Trong mô hình, giá thấp hơn giá trị 15%, tương ứng 85 đơn vị. Giá trị của chiếc áo không thay đổi.",
    },
    {
      id: "cung-bang-cau",
      label: "Cung = Cầu",
      priceDeviation: 0,
      note: "Cung và cầu cân bằng, giá cả phù hợp với giá trị, tương ứng 100 đơn vị. Đây chỉ là mức giá mà các dao động quanh đó, không phải trạng thái đứng yên.",
    },
    {
      id: "cung-nho-hon-cau",
      label: "Cung < Cầu",
      priceDeviation: 15,
      note: "Áo ít hơn nhu cầu, người mua cạnh tranh nên giá cao hơn giá trị. Trong mô hình, giá cao hơn giá trị 15%, tương ứng 115 đơn vị. Giá trị của chiếc áo vẫn như cũ.",
    },
  ],
  competitionNote:
    "Áo thun bán theo giá trị xã hội, do thời gian lao động xã hội cần thiết quyết định (Chương 03). Với kịch bản ba nơi ngang nhau, thời gian ấy khoảng 7,3 giờ. Nhà máy B hao phí 5 giờ, ít hơn mức xã hội khoảng 2,3 giờ mỗi áo, nên sản xuất trong điều kiện tốt và thu lợi nhuận cao. Xưởng thủ công A hao phí 10 giờ, nhiều hơn mức xã hội khoảng 2,7 giờ mỗi áo, tức điều kiện kém, có nguy cơ thất bại, bị đào thải. Để cạnh tranh, các doanh nghiệp cải tiến kỹ thuật, đổi mới công nghệ, hợp lý hóa sản xuất, tăng năng suất lao động, hạ thấp giá trị cá biệt của hàng hóa. Cạnh tranh làm phân hóa những người sản xuất, và phần giá trị thặng dư thu được có thể được tích lũy để mở rộng sản xuất.",
  assumptions: [
    {
      id: "tt-as-1",
      text: "Giá trị một chiếc áo là 100 đơn vị minh họa, giữ cố định trong cả ba kịch bản. Chỉ giá cả thay đổi.",
    },
    {
      id: "tt-as-2",
      text: "Độ lệch giá so với giá trị (−15%, 0, +15%) là con số minh họa, không phải dự báo thị trường thực.",
    },
    {
      id: "tt-as-3",
      text: "Biểu đồ giá có dao động nhỏ quanh mức trung bình để thể hiện giá luôn biến động. Dao động này được tạo theo công thức cố định, không phải số liệu thật.",
    },
    {
      id: "tt-as-4",
      text: "Phần so sánh nhà sản xuất dùng lại ba nhà sản xuất A, B, C của Chương 03, trong kịch bản ba nơi cung cấp ngang nhau, và bỏ qua các yếu tố khác như chi phí bán hàng hay thương hiệu.",
    },
  ],
  academic: {
    concepts: [
      {
        id: "tien-te",
        term: "Tiền tệ (tiền)",
        definition:
          "Tiền tệ là hàng hóa đặc biệt, được tách ra từ thế giới hàng hóa làm vật ngang giá chung trong tất cả các hàng hóa đem trao đổi.",
        explanation:
          "Tiền là kết quả của quá trình phát triển sản xuất và trao đổi hàng hóa, là sản phẩm của sự phát triển các hình thái giá trị từ thấp đến cao. Lao động là bản chất của giá trị, tiền là biểu hiện của giá trị. Tiền có năm chức năng: thước đo giá trị, phương tiện lưu thông, phương tiện cất trữ, phương tiện thanh toán và tiền tệ thế giới.",
        tshirtExample:
          "Thay vì đổi áo lấy gạo, người ta bán áo lấy tiền rồi dùng tiền mua gạo. Giá trị chiếc áo được đo bằng tiền.",
        source: ok("1.3. Tiền tệ — nguồn gốc, bản chất và chức năng của tiền", "47, 61–63"),
      },
      {
        id: "trao-doi-hang-hoa",
        term: "Trao đổi hàng hóa",
        definition:
          "Trong lưu thông hàng hóa giản đơn, việc trao đổi hàng hóa thông qua tiền vận động theo công thức H – T – H (bán để mua). Việc sản xuất và trao đổi hàng hóa phải được tiến hành trên cơ sở hao phí lao động xã hội cần thiết.",
        explanation:
          "Trao đổi hàng hóa theo quy luật giá trị là trao đổi ngang giá: vật ngang giá được trao đổi lấy vật ngang giá. Ví dụ trong bài giảng: 10 kg gạo = 2 m vải = 8 giờ lao động xã hội.",
        tshirtExample:
          "Cửa hàng mua chiếc áo từ xưởng may và bán cho khách. Mỗi lần mua bán là một lần chuyển giao hàng hóa, đổi lấy tiền.",
        source: ok(
          "Quy luật giá trị (tr.85); Giá trị hàng hóa (tr.19); công thức H – T – H và nguyên tắc ngang giá: Bài giảng Chương 3, tr.5, 34",
          "85, 19",
          "Bài giảng không có một định nghĩa riêng cho “trao đổi hàng hóa”; nội dung trên được ghép từ các trang nêu trong mục."
        ),
      },
      {
        id: "gia-ca",
        term: "Giá cả",
        definition:
          "Giá cả là chỉ số đại lượng giá trị hàng hóa, là chỉ số của tỷ lệ trao đổi giữa hàng hóa và tiền. Nói cách khác, giá cả là giá trị của hàng hóa được biểu hiện bằng tiền.",
        explanation:
          "Giá cả ít khi thống nhất với giá trị mà xoay quanh giá trị theo quy luật cung – cầu. Giá trị là cơ sở của giá cả; hàng hóa có giá trị sử dụng và có giá trị mới có giá trị trao đổi.",
        tshirtExample:
          "Chiếc áo có giá trị tương ứng 100 đơn vị. Khi áo khan hiếm, nó có thể bán với giá 115. Khi dư thừa, giá có thể chỉ còn 85.",
        source: ok("Giá trị và giá cả; Giá trị hàng hóa (biểu hiện bằng tiền)", "20, 45"),
      },
      {
        id: "quy-luat-gia-tri",
        term: "Quy luật giá trị",
        definition:
          "Quy luật giá trị là một quy luật chủ yếu của thị trường. Nội dung: việc sản xuất và trao đổi hàng hóa phải được tiến hành trên cơ sở hao phí lao động xã hội cần thiết (giá trị = hao phí lao động xã hội cần thiết).",
        explanation:
          "Nhà sản xuất có điều kiện sản xuất tốt hơn mức xã hội thì thu lợi nhuận cao; điều kiện bình thường thì thu lợi nhuận bình quân; điều kiện kém thì thất bại, bị đào thải.",
        tshirtExample:
          "Xưởng nào làm áo nhanh hơn mức xã hội thì có lãi. Xưởng làm chậm hơn thì lỗ, buộc phải cải tiến.",
        source: ok("2.1.3. Một số quy luật chủ yếu của thị trường — Quy luật giá trị; Thước đo của lượng giá trị hàng hóa", "30, 85"),
      },
      {
        id: "cung-cau",
        term: "Cung và cầu (quy luật cung – cầu)",
        definition:
          "Cung là số lượng hàng hóa, dịch vụ mà người bán có khả năng và sẵn sàng bán ở các mức giá khác nhau trong một thời gian nhất định. Cầu là số lượng hàng hóa, dịch vụ mà người mua có khả năng và sẵn sàng mua ở các mức giá khác nhau trong một thời gian nhất định.",
        explanation:
          "Quy luật cung – cầu cho thấy cung và cầu tác động lẫn nhau, ảnh hưởng đến giá cả: cung bằng cầu thì giá cả bằng giá trị; cung lớn hơn cầu thì giá cả thấp hơn giá trị; cung nhỏ hơn cầu thì giá cả cao hơn giá trị. Quy luật này điều tiết quan hệ sản xuất và lưu thông hàng hóa.",
        tshirtExample:
          "Cuối mùa, áo tồn kho nhiều hơn số người muốn mua nên phải giảm giá. Vào mùa nóng, áo ít mà người mua nhiều thì giá tăng.",
        source: ok("Quy luật cung – cầu", "20, 86–88"),
      },
      {
        id: "canh-tranh",
        term: "Cạnh tranh",
        definition:
          "Cạnh tranh là sự ganh đua giữa những chủ thể kinh tế với nhau nhằm có được những ưu thế về sản xuất cũng như tiêu thụ, và thông qua đó thu được lợi ích tối đa.",
        explanation:
          "Trong nội bộ ngành, các doanh nghiệp cải tiến kỹ thuật, đổi mới công nghệ, hợp lý hóa sản xuất, tăng năng suất lao động, hạ thấp giá trị cá biệt của hàng hóa. Kết quả là hình thành giá trị thị trường (giá trị xã hội) của từng loại hàng hóa. Cạnh tranh thúc đẩy lực lượng sản xuất, nhưng cạnh tranh không lành mạnh gây tổn hại môi trường kinh doanh.",
        tshirtExample:
          "Nhà máy B nhập máy mới làm áo nhanh hơn, hạ giá bán và giành thị phần của xưởng thủ công A.",
        source: ok("Quy luật cạnh tranh; Cạnh tranh trong nội bộ ngành; Tác động của cạnh tranh", "90–91, 94–95"),
      },
      {
        id: "tich-luy-tu-ban",
        term: "Tích lũy tư bản",
        definition:
          "Thực chất của tích lũy tư bản là sự chuyển hóa một phần giá trị thặng dư thành tư bản (tư bản phụ thêm), hay tư bản đẻ ra tư bản.",
        explanation:
          "Giá trị thặng dư thu được chia thành phần dành cho tiêu dùng và phần tích lũy để tái sản xuất mở rộng. Quy mô tích lũy tăng nhờ nâng cao tỷ suất giá trị thặng dư, tăng năng suất lao động, sử dụng hiệu quả máy móc và đại lượng tư bản ứng trước.",
        tshirtExample:
          "Chủ nhà máy B dùng phần giá trị thặng dư thu được để mua thêm máy dệt và thuê thêm công nhân, mở rộng nhà máy.",
        source: {
          chapter: "Bài giảng Chương 3: Giá trị thặng dư trong nền kinh tế thị trường",
          section: "2. Tích lũy tư bản — bản chất và các nhân tố tăng quy mô tích lũy",
          page: "64–65",
        },
      },
    ],
    distinctions: [
      {
        id: "dist-gia-tri-gia-ca",
        title: "Giá trị và giá cả",
        left: {
          term: "Giá trị",
          points: [
            "Là lượng lao động xã hội của người sản xuất kết tinh trong hàng hóa.",
            "Do thời gian lao động xã hội cần thiết quyết định.",
            "Là cơ sở, là nội dung bên trong.",
          ],
        },
        right: {
          term: "Giá cả",
          points: [
            "Là chỉ số của tỷ lệ trao đổi giữa hàng hóa và tiền; giá trị biểu hiện bằng tiền.",
            "Ít khi thống nhất với giá trị mà xoay quanh giá trị theo quy luật cung – cầu.",
            "Là hình thức biểu hiện bên ngoài.",
          ],
        },
        takeaway:
          "Giá cả không đồng nhất với giá trị nhưng gắn với giá trị: giá cả lên xuống xung quanh giá trị. Cung bằng cầu thì giá cả bằng giá trị.",
        source: ok("Giá trị và giá cả; Quy luật cung – cầu", "20, 45, 88"),
      },
    ],
  },
  check: [
    {
      id: "tt-q1",
      prompt:
        "Trên thị trường áo thun, số áo đưa ra bán ít hơn nhu cầu có khả năng thanh toán. Điều gì thường xảy ra?",
      options: [
        { id: "a", text: "Giá trị của chiếc áo giảm xuống." },
        { id: "b", text: "Giá cả giảm xuống thấp hơn giá trị." },
        { id: "c", text: "Giá cả tăng lên cao hơn giá trị." },
        { id: "d", text: "Giá cả và giá trị đều không thể thay đổi." },
      ],
      correct: "c",
      explanation:
        "Đúng là c. Cung nhỏ hơn cầu thì giá cả cao hơn giá trị. Phương án a sai vì giá trị do hao phí lao động xã hội cần thiết quyết định, không do cung – cầu. Phương án b là trường hợp cung lớn hơn cầu.",
      source: ok("Giá trị và giá cả; Quy luật cung – cầu", "20, 88"),
    },
    {
      id: "tt-q2",
      prompt:
        "Nhà máy B hao phí 5 giờ để làm một chiếc áo, thấp hơn mức thời gian lao động xã hội cần thiết. Khi áo bán theo giá trị xã hội, điều gì xảy ra với B?",
      options: [
        { id: "a", text: "B thua lỗ vì hao phí ít giờ lao động hơn." },
        { id: "b", text: "B chỉ thu lợi nhuận bình quân như mọi nhà sản xuất khác." },
        { id: "c", text: "B thất bại, bị đào thải khỏi thị trường." },
        { id: "d", text: "B thu được lợi nhuận cao hơn mức bình quân." },
      ],
      correct: "d",
      explanation:
        "Đúng là d. Theo bài giảng, sản xuất trong điều kiện tốt hơn mức xã hội thì lợi nhuận cao; điều kiện bình thường thì lợi nhuận bình quân (phương án b); điều kiện kém thì thất bại, bị đào thải (phương án c). Phương án a sai vì hao phí thấp hơn mức xã hội là có lợi, không phải thua lỗ.",
      source: ok("Thước đo của lượng giá trị hàng hóa; Giá trị hàng hóa và giá trị thặng dư", "30–31"),
    },
  ],
};

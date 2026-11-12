import type { MarketContent, Source } from "./schema";

const src = (section: string, note?: string, chapter = "Chương 2"): Source => ({
  chapter,
  section,
  page: "?",
  needsCheck: true,
  ...(note ? { note } : {}),
});

const S_TIEN = "2.1.3. Tiền";
const S_TT = "2.2. Thị trường và vai trò của các chủ thể tham gia thị trường";

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
        body: "Áo bán theo giá trị xã hội. Nhà sản xuất làm nhanh hơn mức xã hội có lãi, người làm chậm hơn bị thiệt. **Cạnh tranh** buộc mọi người phải cải tiến, và dẫn đến **tích lũy tư bản**.",
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
    "Áo thun bán theo giá trị xã hội, do thời gian lao động xã hội cần thiết quyết định (Chương 03). Với kịch bản ba nơi ngang nhau, thời gian ấy khoảng 7,3 giờ. Nhà máy B hao phí 5 giờ, ít hơn mức xã hội khoảng 2,3 giờ mỗi áo, nên thu về nhiều hơn mức hao phí của mình. Xưởng thủ công A hao phí 10 giờ, nhiều hơn mức xã hội khoảng 2,7 giờ mỗi áo, nên có phần lao động không được xã hội thừa nhận và có thể thua lỗ. Quy luật giá trị vì thế điều tiết sản xuất và lưu thông, kích thích cải tiến kỹ thuật, hợp lý hóa sản xuất, tăng năng suất lao động. Nó cũng làm phân hóa những người sản xuất: người có điều kiện tốt giàu lên, có thể tích lũy tư bản để mở rộng sản xuất, người yếu thế có nguy cơ phá sản.",
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
          "Tiền là hàng hóa đặc biệt, được tách ra từ trong thế giới hàng hóa làm vật ngang giá chung thống nhất cho các hàng hóa khác. Nó thể hiện lao động xã hội và biểu hiện quan hệ giữa những người sản xuất hàng hóa.",
        explanation:
          "Tiền có các chức năng: thước đo giá trị, phương tiện lưu thông, phương tiện cất trữ, phương tiện thanh toán và tiền tệ thế giới.",
        tshirtExample:
          "Thay vì đổi áo lấy gạo, người ta bán áo lấy tiền rồi dùng tiền mua gạo. Giá trị chiếc áo được đo bằng tiền.",
        source: src(S_TIEN, "Cần đối chiếu định nghĩa nguyên văn và tên các chức năng của tiền."),
      },
      {
        id: "trao-doi-hang-hoa",
        term: "Trao đổi hàng hóa",
        definition:
          "Trao đổi hàng hóa là quan hệ mà những người sản xuất chuyển giao hàng hóa cho nhau theo nguyên tắc ngang giá, thông qua mua bán. Trong kinh tế hàng hóa phát triển, trao đổi diễn ra qua tiền (H – T – H).",
        explanation:
          "Trao đổi theo nguyên tắc ngang giá nghĩa là trao đổi những lượng giá trị bằng nhau, dựa trên hao phí lao động xã hội cần thiết.",
        tshirtExample:
          "Cửa hàng mua chiếc áo từ xưởng may và bán cho khách. Mỗi lần mua bán là một lần chuyển giao hàng hóa, đổi lấy tiền.",
        source: src(S_TIEN, "Cần đối chiếu: mục giáo trình bàn về trao đổi hàng hóa và công thức H – T – H.", "Chương 2"),
      },
      {
        id: "gia-ca",
        term: "Giá cả",
        definition:
          "Giá cả hàng hóa là giá trị của hàng hóa được biểu hiện bằng tiền.",
        explanation:
          "Giá trị là cơ sở của giá cả. Giá cả thị trường lên xuống xung quanh giá trị do tác động của cung – cầu, cạnh tranh và các nhân tố khác. Giá cả không phải lúc nào cũng bằng giá trị.",
        tshirtExample:
          "Chiếc áo có giá trị tương ứng 100 đơn vị. Khi áo khan hiếm, nó có thể bán với giá 115. Khi dư thừa, giá có thể chỉ còn 85.",
        source: src("2.1.3. Tiền và 2.2. Thị trường (giá cả thị trường)", "Cần đối chiếu mục giáo trình nêu định nghĩa giá cả."),
      },
      {
        id: "quy-luat-gia-tri",
        term: "Quy luật giá trị",
        definition:
          "Quy luật giá trị là quy luật kinh tế cơ bản của sản xuất và trao đổi hàng hóa. Quy luật yêu cầu việc sản xuất và trao đổi hàng hóa phải dựa trên cơ sở hao phí lao động xã hội cần thiết.",
        explanation:
          "Trong sản xuất, hao phí lao động cá biệt phải phù hợp với hao phí lao động xã hội cần thiết. Trong trao đổi, hàng hóa được trao đổi theo nguyên tắc ngang giá. Quy luật điều tiết sản xuất và lưu thông, kích thích cải tiến kỹ thuật, tăng năng suất lao động, và phân hóa những người sản xuất hàng hóa.",
        tshirtExample:
          "Xưởng nào làm áo nhanh hơn mức xã hội thì có lãi. Xưởng làm chậm hơn thì lỗ, buộc phải cải tiến.",
        source: src(S_TT),
      },
      {
        id: "cung-cau",
        term: "Cung và cầu (quy luật cung – cầu)",
        definition:
          "Cung là khối lượng hàng hóa có thể đưa ra thị trường trong một thời kỳ tương ứng với mức giá nhất định. Cầu là nhu cầu có khả năng thanh toán đối với hàng hóa. Quy luật cung – cầu là quy luật điều tiết quan hệ giữa cung và cầu hàng hóa trên thị trường.",
        explanation:
          "Cung lớn hơn cầu thì giá cả giảm xuống thấp hơn giá trị. Cung nhỏ hơn cầu thì giá cả tăng lên cao hơn giá trị. Cung bằng cầu thì giá cả phù hợp với giá trị.",
        tshirtExample:
          "Cuối mùa, áo tồn kho nhiều hơn số người muốn mua nên phải giảm giá. Vào mùa nóng, áo ít mà người mua nhiều thì giá tăng.",
        source: src(S_TT, "Cần đối chiếu định nghĩa cung, cầu và cách nêu quan hệ cung – cầu – giá cả."),
      },
      {
        id: "canh-tranh",
        term: "Cạnh tranh",
        definition:
          "Cạnh tranh là sự ganh đua giữa các chủ thể kinh tế nhằm giành lấy những điều kiện thuận lợi trong sản xuất, tiêu thụ hoặc thị trường để thu được lợi ích tối đa.",
        explanation:
          "Cạnh tranh buộc các nhà sản xuất cải tiến kỹ thuật, giảm hao phí lao động. Đó là động lực của tăng trưởng, đồng thời dẫn đến phân hóa người sản xuất.",
        tshirtExample:
          "Nhà máy B nhập máy mới làm áo nhanh hơn, hạ giá bán và giành thị phần của xưởng thủ công A.",
        source: src(S_TT, "Cần đối chiếu định nghĩa cạnh tranh và quy luật cạnh tranh."),
      },
      {
        id: "tich-luy-tu-ban",
        term: "Tích lũy tư bản",
        definition:
          "Tích lũy tư bản là sự chuyển hóa một phần giá trị thặng dư trở lại thành tư bản, hay là quá trình tái sản xuất mở rộng tư bản chủ nghĩa. Nguồn gốc duy nhất của tích lũy tư bản là giá trị thặng dư.",
        explanation:
          "Nhà tư bản dùng một phần giá trị thặng dư để mua thêm tư liệu sản xuất và thuê thêm công nhân, mở rộng sản xuất. Cạnh tranh thúc đẩy quá trình đó.",
        tshirtExample:
          "Chủ nhà máy B dùng phần giá trị thặng dư thu được để mua thêm máy dệt và thuê thêm công nhân, mở rộng nhà máy.",
        source: src("3.2. Tích lũy tư bản", "Cần đối chiếu định nghĩa. Giáo trình xếp mục này ở Chương 3.", "Chương 3"),
      },
    ],
    distinctions: [
      {
        id: "dist-gia-tri-gia-ca",
        title: "Giá trị và giá cả",
        left: {
          term: "Giá trị",
          points: [
            "Là lao động xã hội của người sản xuất kết tinh trong hàng hóa.",
            "Do thời gian lao động xã hội cần thiết quyết định.",
            "Là cơ sở, là nội dung bên trong.",
          ],
        },
        right: {
          term: "Giá cả",
          points: [
            "Là giá trị biểu hiện bằng tiền.",
            "Lên xuống thường xuyên do cung – cầu, cạnh tranh, giá trị của tiền.",
            "Là hình thức biểu hiện bên ngoài.",
          ],
        },
        takeaway:
          "Giá cả không đồng nhất với giá trị nhưng gắn với giá trị: giá cả lên xuống xung quanh giá trị. Trên tổng thể xã hội, tổng giá cả bằng tổng giá trị.",
        source: src("2.1.3. Tiền và 2.2. Thị trường (giá cả thị trường)", "Câu về tổng giá cả bằng tổng giá trị cần đối chiếu xem giáo trình có nêu không; nếu không, hãy bỏ."),
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
        "Đúng là c. Cung nhỏ hơn cầu thì người mua cạnh tranh, giá cả tăng lên cao hơn giá trị. Phương án a sai vì giá trị do thời gian lao động xã hội cần thiết quyết định, không do cung – cầu. Phương án b là trường hợp cung lớn hơn cầu.",
      source: src(S_TT),
    },
    {
      id: "tt-q2",
      prompt:
        "Tác động nào sau đây KHÔNG thuộc tác động của quy luật giá trị?",
      options: [
        { id: "a", text: "Điều tiết sản xuất và lưu thông hàng hóa." },
        { id: "b", text: "Kích thích cải tiến kỹ thuật, tăng năng suất lao động." },
        { id: "c", text: "Phân hóa những người sản xuất hàng hóa." },
        { id: "d", text: "Làm cho mọi nhà sản xuất có thu nhập như nhau." },
      ],
      correct: "d",
      explanation:
        "Đúng là d. Quy luật giá trị phân hóa người sản xuất: ai có hao phí lao động cá biệt thấp hơn mức xã hội thì có lãi, ai cao hơn thì thua lỗ. Ba phương án còn lại là các tác động mà giáo trình nêu.",
      source: src(S_TT),
    },
  ],
};

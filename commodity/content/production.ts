import type { ProductionContent, Source } from "./schema";

const src = (chapter: string, section: string, note?: string): Source => ({
  chapter,
  section,
  page: "?",
  needsCheck: true,
  ...(note ? { note } : {}),
});

const S_SX = (note?: string) =>
  src("Chương 1", "Mục về sản xuất của cải vật chất, lực lượng sản xuất (chưa xác định đúng mục)", note ?? "Cần đối chiếu: khái niệm sản xuất, tư liệu sản xuất có thể nằm ở Chương 1 hoặc Chương 2 của giáo trình.");
const S_LDCT = src("Chương 2", "2.1.2. Hàng hóa — tính hai mặt của lao động sản xuất hàng hóa");
const S_SLD = src("Chương 3", "3.1. Lý luận của C.Mác về giá trị thặng dư — hàng hóa sức lao động");

export const production: ProductionContent = {
  chapterId: "san-xuat",
  visual: {
    lead: "Chiếc áo không tự xuất hiện. Hãy đi qua bảy công đoạn, và để ý ai đang làm việc, với những thứ gì.",
    beats: [
      {
        id: "sx-beat-1",
        heading: "Bảy công đoạn, một chiếc áo",
        body: "Từ hạt bông đến chiếc áo đóng gói là một chuỗi công việc nối tiếp nhau. Sản phẩm của công đoạn trước thành nguyên liệu của công đoạn sau.",
        conceptId: "san-xuat",
      },
      {
        id: "sx-beat-2",
        heading: "Bông, máy dệt, kim chỉ",
        body: "Ở mỗi công đoạn, con người tác động vào một **đối tượng lao động** bằng **tư liệu lao động**. Cả hai hợp lại thành **tư liệu sản xuất**.",
        conceptId: "tu-lieu-san-xuat",
      },
      {
        id: "sx-beat-3",
        heading: "Người lao động ở đâu?",
        body: "Máy móc và bông không tự làm ra áo. Cần có người lao động, tức là có **sức lao động** được đem ra sử dụng.",
        conceptId: "suc-lao-dong",
      },
      {
        id: "sx-beat-4",
        heading: "Mỗi nghề một cách làm",
        body: "Người kéo sợi, người dệt, người may làm những việc rất khác nhau. Đó là **lao động cụ thể**. Nhưng đằng sau đó, ai cũng hao phí sức lực và thời gian. Đó là **lao động trừu tượng**.",
        conceptId: "lao-dong-truu-tuong",
      },
    ],
  },
  stages: [
    {
      id: "stage-trong-bong",
      order: 1,
      name: "Trồng và thu hoạch bông",
      description:
        "Hạt bông được gieo, chăm sóc cho đến khi quả bông chín và nở. Người nông dân thu hoạch bông hạt.",
      labor: "Gieo trồng, chăm sóc, tưới tiêu, thu hái bông.",
      meansOfProduction: {
        objects: "Đất đai, nước (có sẵn trong tự nhiên); hạt giống bông (đã qua lao động).",
        instruments: "Cuốc, máy cày, hệ thống tưới, máy thu hoạch bông.",
      },
      conceptId: "san-xuat",
    },
    {
      id: "stage-lam-sach",
      order: 2,
      name: "Làm sạch và xử lý bông",
      description:
        "Bông hạt được tách hạt, loại tạp chất, ép thành kiện để chuyển tới nhà máy sợi.",
      labor: "Vận hành máy tách hạt, phân loại, kiểm tra chất lượng bông.",
      meansOfProduction: {
        objects: "Bông hạt vừa thu hoạch (nguyên liệu: đối tượng lao động đã qua lao động).",
        instruments: "Máy tách hạt, máy làm sạch, máy ép kiện.",
      },
      conceptId: "tu-lieu-san-xuat",
    },
    {
      id: "stage-keo-soi",
      order: 3,
      name: "Kéo sợi",
      description:
        "Bông được chải, xe và kéo thành sợi liên tục, đủ bền để dệt.",
      labor: "Vận hành máy chải, máy xe, máy kéo sợi; theo dõi và xử lý đứt sợi.",
      meansOfProduction: {
        objects: "Bông đã làm sạch.",
        instruments: "Máy chải thô, máy kéo sợi, điện năng.",
      },
      conceptId: "lao-dong-cu-the",
    },
    {
      id: "stage-det-vai",
      order: 4,
      name: "Dệt / đan vải",
      description:
        "Sợi được đan thành tấm vải thun. Vải được nhuộm hoặc tẩy trắng và định hình.",
      labor: "Cài đặt và vận hành máy dệt kim, kiểm tra vải, xử lý lỗi.",
      meansOfProduction: {
        objects: "Sợi cotton, thuốc nhuộm hoặc chất tẩy.",
        instruments: "Máy dệt kim, máy nhuộm, máy định hình.",
      },
      conceptId: "tu-lieu-san-xuat",
    },
    {
      id: "stage-cat-vai",
      order: 5,
      name: "Cắt vải",
      description:
        "Tấm vải được trải ra và cắt theo rập thành các mảnh thân, tay và cổ áo.",
      labor: "Lên sơ đồ cắt, trải vải, cắt các chi tiết, đánh số bán thành phẩm.",
      meansOfProduction: {
        objects: "Cuộn vải thành phẩm.",
        instruments: "Bàn cắt, máy cắt, rập mẫu, kéo.",
      },
      conceptId: "suc-lao-dong",
    },
    {
      id: "stage-may",
      order: 6,
      name: "May và hoàn thiện",
      description:
        "Các mảnh vải được ghép thành áo hoàn chỉnh, sau đó được là, kiểm tra và cắt chỉ thừa.",
      labor: "May ráp thân, tay, cổ; là ủi; kiểm tra chất lượng.",
      meansOfProduction: {
        objects: "Các mảnh vải đã cắt, chỉ, nhãn mác, cúc.",
        instruments: "Máy may, máy vắt sổ, bàn là, dụng cụ kiểm tra.",
      },
      conceptId: "lao-dong-truu-tuong",
    },
    {
      id: "stage-phan-phoi",
      order: 7,
      name: "Đóng gói và phân phối",
      description:
        "Áo được gấp, đóng gói, xếp vào thùng và chuyển đến cửa hàng để bán.",
      labor: "Gấp, đóng gói, dán nhãn, bốc xếp, vận chuyển.",
      meansOfProduction: {
        objects: "Áo thành phẩm, túi và thùng đóng gói.",
        instruments: "Máy dán nhãn, xe nâng, xe tải, kho hàng.",
      },
      conceptId: "tgldxhct",
    },
  ],
  academic: {
    concepts: [
      {
        id: "san-xuat",
        term: "Sản xuất của cải vật chất",
        definition:
          "Sản xuất của cải vật chất là quá trình con người sử dụng tư liệu lao động tác động vào đối tượng lao động để tạo ra những sản phẩm cần thiết cho đời sống và phát triển xã hội.",
        explanation:
          "Đây là hoạt động cơ bản nhất của con người, làm cơ sở cho sự tồn tại của xã hội. Ba yếu tố của quá trình sản xuất là sức lao động, đối tượng lao động và tư liệu lao động.",
        tshirtExample:
          "Từ trồng bông đến may áo, con người dùng công cụ, máy móc tác động vào bông, sợi, vải để tạo ra chiếc áo.",
        source: S_SX("Diễn đạt lại theo ý giáo trình. Cần đối chiếu định nghĩa nguyên văn."),
      },
      {
        id: "tu-lieu-san-xuat",
        term: "Tư liệu sản xuất",
        definition:
          "Tư liệu sản xuất gồm đối tượng lao động và tư liệu lao động. Đối tượng lao động là những vật mà lao động của con người tác động vào. Tư liệu lao động là những vật hay hệ thống vật dùng để truyền dẫn sự tác động của con người lên đối tượng lao động.",
        explanation:
          "Đối tượng lao động có thể có sẵn trong tự nhiên (như đất đai) hoặc đã qua lao động, khi đó gọi là nguyên liệu. Trong tư liệu lao động, công cụ lao động giữ vai trò quyết định. Sản phẩm của công đoạn trước thường là đối tượng lao động của công đoạn sau.",
        tshirtExample:
          "Đất trồng bông là đối tượng lao động có sẵn trong tự nhiên. Bông đã thu hoạch, sợi, vải là đối tượng lao động đã qua lao động, tức nguyên liệu. Máy kéo sợi, máy dệt, máy may là tư liệu lao động.",
        source: S_SX(),
      },
      {
        id: "suc-lao-dong",
        term: "Sức lao động",
        definition:
          "Sức lao động là toàn bộ những năng lực thể chất và tinh thần tồn tại trong cơ thể, trong một con người, và được người đó vận dụng vào quá trình sản xuất.",
        explanation:
          "Sức lao động là khả năng, còn lao động là việc sử dụng khả năng đó. Sức lao động chỉ trở thành hiện thực khi người ta làm việc.",
        tshirtExample:
          "Một công nhân may có sức khỏe và tay nghề. Đó là sức lao động của người ấy. Khi ngồi vào máy may và làm việc, sức lao động được sử dụng thành lao động.",
        source: S_SLD,
      },
      {
        id: "lao-dong-cu-the",
        term: "Lao động cụ thể",
        definition:
          "Lao động cụ thể là lao động có ích dưới một hình thức cụ thể của những nghề nghiệp chuyên môn nhất định. Mỗi lao động cụ thể có mục đích, đối tượng, công cụ, phương pháp và kết quả riêng.",
        explanation:
          "Lao động cụ thể tạo ra giá trị sử dụng của hàng hóa. Các lao động cụ thể khác nhau tạo ra những giá trị sử dụng khác nhau.",
        tshirtExample:
          "Người kéo sợi tạo ra sợi, người dệt tạo ra vải, người may tạo ra chiếc áo. Mỗi người làm một việc khác nhau.",
        source: S_LDCT,
      },
      {
        id: "lao-dong-truu-tuong",
        term: "Lao động trừu tượng",
        definition:
          "Lao động trừu tượng là lao động của người sản xuất hàng hóa khi đã gạt bỏ những hình thức cụ thể của nó. Đó là sự hao phí sức lao động nói chung của người sản xuất hàng hóa (hao phí sức bắp thịt, thần kinh, trí óc).",
        explanation:
          "Lao động trừu tượng tạo ra giá trị của hàng hóa. Giá trị là lao động trừu tượng của người sản xuất kết tinh trong hàng hóa.",
        tshirtExample:
          "Dù là kéo sợi, dệt hay may, người lao động đều hao phí sức lực và thời gian. Phần hao phí chung ấy là lao động trừu tượng.",
        source: S_LDCT,
      },
      {
        id: "tgldxhct",
        term: "Thời gian lao động xã hội cần thiết",
        definition:
          "Thời gian lao động xã hội cần thiết là thời gian đòi hỏi để sản xuất ra một giá trị sử dụng nào đó trong những điều kiện bình thường của xã hội, với trình độ thành thạo trung bình, cường độ lao động trung bình. Trên thực tế, nó thường đồng nhất với thời gian lao động cá biệt của người sản xuất cung cấp đại bộ phận hàng hóa đó trên thị trường.",
        explanation:
          "Lượng giá trị của hàng hóa do thời gian lao động xã hội cần thiết quyết định, không phải do thời gian lao động cá biệt của từng người. Chương 03 sẽ cho bạn thử tính.",
        tshirtExample:
          "Nếu điều kiện bình thường của xã hội là 7 giờ để làm một chiếc áo, thì chiếc áo chứa lượng giá trị tương ứng 7 giờ lao động xã hội, dù một xưởng cụ thể mất 10 giờ.",
        source: src(
          "Chương 2",
          "2.1.2. Hàng hóa — lượng giá trị hàng hóa",
          "Giáo trình dùng cụm “thời gian lao động xã hội cần thiết”. Cần đối chiếu câu chữ định nghĩa."
        ),
      },
    ],
    distinctions: [
      {
        id: "dist-ldct-ldtt",
        title: "Lao động cụ thể và lao động trừu tượng",
        left: {
          term: "Lao động cụ thể",
          points: [
            "Là lao động có ích dưới một hình thức nghề nghiệp nhất định.",
            "Có mục đích, công cụ, phương pháp riêng.",
            "Tạo ra giá trị sử dụng.",
          ],
        },
        right: {
          term: "Lao động trừu tượng",
          points: [
            "Là hao phí sức lao động nói chung, gạt bỏ hình thức cụ thể.",
            "Giống nhau ở mọi người sản xuất hàng hóa.",
            "Tạo ra giá trị.",
          ],
        },
        takeaway:
          "Đây là hai mặt của cùng một lao động sản xuất hàng hóa. Lao động cụ thể tạo ra giá trị sử dụng, lao động trừu tượng tạo ra giá trị.",
        source: S_LDCT,
      },
      {
        id: "dist-ld-sld-sx",
        title: "Lao động và sức lao động",
        left: {
          term: "Sức lao động",
          points: [
            "Là năng lực thể chất và tinh thần của con người.",
            "Là khả năng làm việc, tồn tại trước khi làm việc.",
            "Có thể được đem ra mua bán trong những điều kiện nhất định.",
          ],
        },
        right: {
          term: "Lao động",
          points: [
            "Là hoạt động có mục đích của con người, tức là sự sử dụng sức lao động.",
            "Chỉ diễn ra khi người lao động thực sự làm việc.",
            "Là quá trình tạo ra sản phẩm và giá trị.",
          ],
        },
        takeaway:
          "Sức lao động là khả năng làm việc. Lao động là việc sử dụng khả năng đó. Hai khái niệm này không đồng nhất.",
        source: S_SLD,
      },
    ],
  },
  check: [
    {
      id: "sx-q1",
      prompt:
        "Một công nhân đồng ý làm việc 8 giờ mỗi ngày tại xưởng may. Điều gì được gọi là sức lao động của người này?",
      options: [
        { id: "a", text: "Tám giờ anh ta ngồi làm việc trong ngày." },
        { id: "b", text: "Những chiếc áo anh ta may được trong ngày." },
        { id: "c", text: "Toàn bộ năng lực thể chất và tinh thần của anh ta, được vận dụng vào sản xuất." },
        { id: "d", text: "Chiếc máy may mà anh ta sử dụng." },
      ],
      correct: "c",
      explanation:
        "Đúng là c. Sức lao động là năng lực. Phương án a là lao động, tức là việc sử dụng sức lao động. Phương án b là sản phẩm. Phương án d là tư liệu lao động, thuộc tư liệu sản xuất.",
      source: S_SLD,
    },
    {
      id: "sx-q2",
      prompt:
        "Trong công đoạn dệt vải, thành phần nào dưới đây là đối tượng lao động, thành phần nào là tư liệu lao động?",
      options: [
        { id: "a", text: "Máy dệt là đối tượng lao động; sợi là tư liệu lao động." },
        { id: "b", text: "Sợi là đối tượng lao động; máy dệt là tư liệu lao động." },
        { id: "c", text: "Cả sợi và máy dệt đều là đối tượng lao động." },
        { id: "d", text: "Người thợ dệt là đối tượng lao động; máy dệt là tư liệu lao động." },
      ],
      correct: "b",
      explanation:
        "Đúng là b. Đối tượng lao động là vật mà lao động tác động vào, ở đây là sợi. Tư liệu lao động truyền dẫn sự tác động của con người, ở đây là máy dệt. Phương án d sai vì người thợ là người lao động, có sức lao động, không phải đối tượng lao động.",
      source: S_SX(),
    },
  ],
};

import type { ProductionContent, Source } from "./schema";

const D1 = "Bài giảng Chương 1: Đối tượng, phương pháp nghiên cứu và chức năng của KTCT Mác – Lênin";
const D2 = "Bài giảng Chương 2: Hàng hóa, thị trường và vai trò của các chủ thể tham gia thị trường";
const D3 = "Bài giảng Chương 3: Giá trị thặng dư trong nền kinh tế thị trường";

const ok = (chapter: string, section: string, page: string, note?: string): Source => ({
  chapter,
  section,
  page,
  ...(note ? { note } : {}),
});

const S_SX = ok(D3, "Quá trình sản xuất hàng hóa (tiêu dùng tư liệu sản xuất và sức lao động)", "23");
const S_TLSX = ok(
  D1,
  "Đối tượng và phương pháp nghiên cứu — lực lượng sản xuất: người lao động và tư liệu sản xuất",
  "23–24",
  "Bài giảng chỉ nêu cấu trúc (tư liệu sản xuất gồm tư liệu lao động và đối tượng lao động; tư liệu lao động gồm công cụ lao động, hệ thống bình chứa, kết cấu hạ tầng của sản xuất), không định nghĩa riêng bằng lời hai khái niệm đối tượng lao động và tư liệu lao động."
);
const S_LDCT = ok(D2, "2.2. Tính hai mặt của lao động sản xuất hàng hóa", "41–44, 46");
const S_SLD = ok(D3, "Hàng hóa sức lao động", "14–19, 43–44");

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
        term: "Quá trình sản xuất",
        definition:
          "Quá trình sản xuất là quá trình tiêu dùng tư liệu sản xuất và sức lao động. Giá trị sử dụng cũ được tiêu dùng, chuyển sang giá trị sử dụng mới, tạo thành sản phẩm mới.",
        explanation:
          "Quá trình này cần hai yếu tố: người lao động (có sức lao động) và tư liệu sản xuất như máy móc thiết bị, nhà xưởng, nguyên vật liệu. Người lao động và tư liệu sản xuất hợp thành lực lượng sản xuất của xã hội.",
        tshirtExample:
          "Từ trồng bông đến may áo, người lao động dùng máy móc, công cụ tác động vào bông, sợi, vải để tạo ra chiếc áo là sản phẩm mới.",
        source: S_SX,
      },
      {
        id: "tu-lieu-san-xuat",
        term: "Tư liệu sản xuất",
        definition:
          "Tư liệu sản xuất gồm tư liệu lao động và đối tượng lao động. Tư liệu lao động gồm công cụ lao động, hệ thống bình chứa của sản xuất và kết cấu hạ tầng của sản xuất.",
        explanation:
          "Trong quá trình sản xuất, tư liệu sản xuất gồm máy móc thiết bị, nhà xưởng, nguyên vật liệu. Sản phẩm của công đoạn trước thường trở thành nguyên vật liệu, tức đối tượng lao động, của công đoạn sau.",
        tshirtExample:
          "Bông, sợi, vải là nguyên vật liệu (đối tượng lao động). Máy kéo sợi, máy dệt, máy may là công cụ lao động, thuộc tư liệu lao động.",
        source: S_TLSX,
      },
      {
        id: "suc-lao-dong",
        term: "Sức lao động",
        definition:
          "Sức lao động hay năng lực lao động là toàn bộ những năng lực thể chất và tinh thần tồn tại trong một cơ thể, trong một con người đang sống, và được người đó đem ra vận dụng mỗi khi sản xuất ra một giá trị sử dụng nào đó.",
        explanation:
          "Sức lao động là khả năng, còn lao động là việc tiêu dùng sức lao động. Người công nhân bán sức lao động, không bán lao động.",
        tshirtExample:
          "Một công nhân may có sức khỏe và tay nghề. Đó là sức lao động của người ấy. Khi ngồi vào máy may và làm việc, sức lao động được tiêu dùng thành lao động.",
        source: S_SLD,
      },
      {
        id: "lao-dong-cu-the",
        term: "Lao động cụ thể",
        definition:
          "Lao động cụ thể là lao động có ích dưới hình thức cụ thể của nghề nghiệp, chuyên môn nhất định. Mỗi lao động cụ thể có đối tượng, mục đích, phương tiện, phương pháp và kết quả riêng.",
        explanation:
          "Lao động cụ thể, cùng với nội dung vật chất cấu thành của sản phẩm, là một trong hai yếu tố tạo ra giá trị sử dụng của hàng hóa. Nó cho biết lao động được tiến hành như thế nào.",
        tshirtExample:
          "Người kéo sợi tạo ra sợi, người dệt tạo ra vải, người may tạo ra chiếc áo. Mỗi người làm một việc khác nhau.",
        source: S_LDCT,
      },
      {
        id: "lao-dong-truu-tuong",
        term: "Lao động trừu tượng",
        definition:
          "Lao động trừu tượng là lao động của người sản xuất hàng hóa khi đã gạt bỏ những hình thức cụ thể của nó. Đó là sự hao phí sức lực và thần kinh của người sản xuất hàng hóa.",
        explanation:
          "Lao động trừu tượng tạo nên giá trị hàng hóa. Nó có ý nghĩa về mặt lượng: cho biết đã tiêu phí lao động trong bao lâu.",
        tshirtExample:
          "Dù là kéo sợi, dệt hay may, người lao động đều hao phí sức lực và thần kinh trong một khoảng thời gian. Phần hao phí chung ấy là lao động trừu tượng.",
        source: S_LDCT,
      },
      {
        id: "tgldxhct",
        term: "Thời gian lao động xã hội cần thiết",
        definition:
          "Thời gian lao động xã hội cần thiết là thời gian cần thiết để sản xuất ra một đơn vị hàng hóa, trong hoàn cảnh xã hội nhất định, trong điều kiện bình thường của xã hội, với trình độ kỹ thuật trung bình, trình độ khéo léo trung bình và cường độ lao động trung bình.",
        explanation:
          "Thời gian lao động xã hội cần thiết là thước đo lượng giá trị của hàng hóa, không phải thời gian lao động cá biệt của từng người. Chương 03 sẽ cho bạn thử tính.",
        tshirtExample:
          "Nếu điều kiện bình thường của xã hội là 7 giờ để làm một chiếc áo, thì chiếc áo chứa lượng giá trị tương ứng 7 giờ lao động xã hội, dù một xưởng cụ thể mất 10 giờ.",
        source: ok(D2, "Thước đo của lượng giá trị hàng hóa", "28–30"),
      },
    ],
    distinctions: [
      {
        id: "dist-ldct-ldtt",
        title: "Lao động cụ thể và lao động trừu tượng",
        left: {
          term: "Lao động cụ thể",
          points: [
            "Là lao động có ích dưới hình thức nghề nghiệp, chuyên môn nhất định.",
            "Có đối tượng, mục đích, phương tiện, phương pháp, kết quả riêng.",
            "Tạo ra giá trị sử dụng; có ý nghĩa về mặt chất.",
          ],
        },
        right: {
          term: "Lao động trừu tượng",
          points: [
            "Là lao động đã gạt bỏ hình thức cụ thể, chỉ còn hao phí sức lực, thần kinh.",
            "Cho biết đã tiêu phí lao động trong bao lâu; có ý nghĩa về mặt lượng.",
            "Tạo nên giá trị hàng hóa.",
          ],
        },
        takeaway:
          "Đây là hai mặt của cùng một lao động sản xuất hàng hóa. Lao động cụ thể gắn với giá trị sử dụng, lao động trừu tượng gắn với giá trị.",
        source: S_LDCT,
      },
      {
        id: "dist-ld-sld-sx",
        title: "Lao động và sức lao động",
        left: {
          term: "Sức lao động",
          points: [
            "Là toàn bộ năng lực thể chất và tinh thần tồn tại trong cơ thể một con người đang sống.",
            "Là hàng hóa đặc biệt: bán trong một thời gian nhất định, bán rồi người bán vẫn không từ bỏ quyền sở hữu sức lao động ấy.",
            "Trở thành hàng hóa khi người lao động tự do về thân thể và buộc phải bán sức lao động.",
          ],
        },
        right: {
          term: "Lao động",
          points: [
            "Là quá trình tiêu dùng sức lao động.",
            "Không phải là hàng hóa. Cái người công nhân bán cho nhà tư bản là sức lao động.",
            "Khi sức lao động được tiêu dùng, nó tạo ra giá trị mới lớn hơn giá trị bản thân nó.",
          ],
        },
        takeaway:
          "Sức lao động là khả năng làm việc. Lao động là việc tiêu dùng khả năng đó. Hai khái niệm này không đồng nhất.",
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
        "Đúng là c. Sức lao động là toàn bộ năng lực thể chất và tinh thần tồn tại trong con người, được đem ra vận dụng khi sản xuất. Phương án a là lao động, tức việc tiêu dùng sức lao động. Phương án b là sản phẩm. Phương án d là tư liệu lao động, thuộc tư liệu sản xuất.",
      source: ok(D3, "Hàng hóa sức lao động", "14, 44"),
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
        "Đúng là b. Sợi là nguyên vật liệu mà lao động tác động vào, tức đối tượng lao động. Máy dệt là công cụ lao động, thuộc tư liệu lao động. Phương án d sai vì người thợ là người lao động, có sức lao động, không thuộc tư liệu sản xuất.",
      source: S_TLSX,
    },
  ],
};

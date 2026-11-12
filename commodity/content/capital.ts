import type { CapitalContent, Source } from "./schema";

const src = (section: string, note?: string, chapter = "Chương 3"): Source => ({
  chapter,
  section,
  page: "?",
  needsCheck: true,
  ...(note ? { note } : {}),
});

const S31 = "3.1. Lý luận của C.Mác về giá trị thặng dư";
const S_TBBB = "3.1. Lý luận của C.Mác về giá trị thặng dư — tư bản bất biến và tư bản khả biến";
const S_PP = "3.1. Lý luận của C.Mác về giá trị thặng dư — các phương pháp sản xuất giá trị thặng dư";
const S_LN = "3.3. Các hình thức biểu hiện của giá trị thặng dư trong nền kinh tế thị trường (lợi nhuận)";

export const capital: CapitalContent = {
  chapterId: "tu-ban",
  visual: {
    lead: "Trong xưởng may, giá trị của chiếc áo không chỉ được chuyển sang từ bông và máy. Có một phần giá trị mới xuất hiện. Hãy xem nó đến từ đâu.",
    beats: [
      {
        id: "tb-beat-1",
        heading: "Giá trị của chiếc áo, tách thành ba phần",
        body: "Với c = 60, v = 20, m = 20, chiếc áo có giá trị W = 100. Phần c là giá trị tư liệu sản xuất chuyển sang. Phần v + m = 40 là giá trị mới do công nhân tạo ra.",
        conceptId: "gia-tri-thang-du",
      },
      {
        id: "tb-beat-2",
        heading: "Bốn giờ trả công, bốn giờ không",
        body: "Ngày lao động 8 giờ. Trong 4 giờ đầu, công nhân tạo ra giá trị bằng giá trị sức lao động của mình. 4 giờ sau là **thời gian lao động thặng dư**, tạo ra giá trị thặng dư.",
        conceptId: "thoi-gian-lao-dong-thang-du",
      },
      {
        id: "tb-beat-3",
        heading: "Kéo dài ngày làm việc",
        body: "Nếu ngày lao động kéo từ 8 lên 10, 12 giờ trong khi thời gian lao động tất yếu giữ 4 giờ, giá trị thặng dư tăng. Đó là phương pháp **giá trị thặng dư tuyệt đối**.",
        conceptId: "ty-suat-gia-tri-thang-du",
      },
      {
        id: "tb-beat-4",
        heading: "Rút ngắn phần tất yếu",
        body: "Giữ nguyên ngày lao động 8 giờ, nhưng năng suất lao động xã hội tăng làm giá trị sức lao động giảm, thời gian tất yếu rút từ 4 xuống 3, 2 giờ. Đó là phương pháp **giá trị thặng dư tương đối**.",
        conceptId: "ty-suat-gia-tri-thang-du",
      },
    ],
  },
  baseline: { c: 60, v: 20, m: 20, workdayHours: 8, necessaryHours: 4 },
  scenarios: [
    {
      id: "tuyet-doi-8",
      mode: "absolute",
      label: "Ngày lao động 8 giờ (gốc)",
      workdayHours: 8,
      necessaryHours: 4,
      note: "Trạng thái gốc: thời gian tất yếu 4 giờ, thời gian thặng dư 4 giờ. c = 60, v = 20, m = 20, W = 100, m' = 100%.",
    },
    {
      id: "tuyet-doi-10",
      mode: "absolute",
      label: "Kéo dài lên 10 giờ",
      workdayHours: 10,
      necessaryHours: 4,
      note: "Thời gian tất yếu vẫn 4 giờ, thời gian thặng dư tăng lên 6 giờ. Trong mô hình c = 75, v = 20, m = 30, W = 125, m' = 150%. Giá trị thặng dư tăng nhờ kéo dài ngày lao động, không phải nhờ trả công thấp hơn.",
    },
    {
      id: "tuyet-doi-12",
      mode: "absolute",
      label: "Kéo dài lên 12 giờ",
      workdayHours: 12,
      necessaryHours: 4,
      note: "Thời gian tất yếu vẫn 4 giờ, thời gian thặng dư là 8 giờ. Trong mô hình c = 90, v = 20, m = 40, W = 150, m' = 200%. Ngày lao động dài hơn nên tiêu dùng nhiều bông, sợi hơn, vì thế c cũng tăng.",
    },
    {
      id: "tuong-doi-4",
      mode: "relative",
      label: "Tất yếu 4 giờ (gốc)",
      workdayHours: 8,
      necessaryHours: 4,
      note: "Trạng thái gốc, ngày lao động 8 giờ. c = 60, v = 20, m = 20, W = 100, m' = 100%.",
    },
    {
      id: "tuong-doi-3",
      mode: "relative",
      label: "Tất yếu giảm còn 3 giờ",
      workdayHours: 8,
      necessaryHours: 3,
      note: "Ngày lao động vẫn 8 giờ. Năng suất lao động xã hội tăng làm giá trị sức lao động giảm, thời gian tất yếu còn 3 giờ, thời gian thặng dư 5 giờ. c = 60, v = 15, m = 25, W = 100, m' ≈ 166,7%.",
    },
    {
      id: "tuong-doi-2",
      mode: "relative",
      label: "Tất yếu giảm còn 2 giờ",
      workdayHours: 8,
      necessaryHours: 2,
      note: "Thời gian tất yếu còn 2 giờ, thời gian thặng dư 6 giờ. c = 60, v = 10, m = 30, W = 100, m' = 300%. Giá trị thặng dư tăng dù ngày lao động không đổi.",
    },
  ],
  assumptions: [
    {
      id: "tb-as-1",
      text: "Mỗi giờ lao động tạo ra cùng một lượng giá trị mới. Với số liệu gốc, mỗi giờ tạo ra 5 đơn vị giá trị (40 đơn vị trong 8 giờ).",
    },
    {
      id: "tb-as-2",
      text: "Phương pháp tuyệt đối: thời gian lao động tất yếu và v giữ nguyên. Ngày lao động dài thêm nên lượng bông, sợi, máy móc tiêu dùng tăng theo số giờ, vì vậy c tăng tỷ lệ với ngày lao động.",
    },
    {
      id: "tb-as-3",
      text: "Phương pháp tương đối: ngày lao động giữ nguyên, năng suất lao động xã hội tăng làm giá trị sức lao động giảm, nên thời gian tất yếu giảm và v = 5 × thời gian tất yếu. c giữ nguyên.",
    },
    {
      id: "tb-as-4",
      text: "v là giá trị sức lao động, được trả cho công nhân dưới hình thức tiền công. Mô hình giả định tiền công đúng bằng giá trị sức lao động, tức là sức lao động được mua bán ngang giá.",
    },
    {
      id: "tb-as-5",
      text: "Các con số là đơn vị minh họa, không phải tiền tệ thực. Giá trị thặng dư trong mô hình chưa chuyển thành lợi nhuận. Mô hình không xét tiền thuê đất, lãi vay hay thuế.",
    },
  ],
  formulas: [
    {
      id: "f-w",
      expression: "W = c + v + m",
      meaning:
        "Giá trị hàng hóa gồm giá trị tư liệu sản xuất chuyển vào (c), giá trị sức lao động (v) và giá trị thặng dư (m).",
      source: src(S31),
    },
    {
      id: "f-new-value",
      expression: "Giá trị mới = v + m",
      meaning:
        "Giá trị mới là phần giá trị do lao động trừu tượng của công nhân tạo ra trong quá trình sản xuất. Phần c không phải giá trị mới, vì nó chỉ được chuyển vào sản phẩm.",
      source: src(S_TBBB),
    },
    {
      id: "f-rate",
      expression: "m' = m / v × 100%",
      meaning:
        "Tỷ suất giá trị thặng dư là tỷ lệ phần trăm giữa m và v. Nó cho biết trình độ bóc lột sức lao động của tư bản. Ví dụ gốc: 20 / 20 × 100% = 100%.",
      source: src(S31, "Giáo trình còn ghi m' bằng tỷ số giữa thời gian lao động thặng dư và thời gian lao động tất yếu. Cần đối chiếu ký hiệu."),
    },
    {
      id: "f-time",
      expression: "Ngày lao động = thời gian lao động tất yếu + thời gian lao động thặng dư",
      meaning:
        "Thời gian lao động tất yếu là phần ngày lao động tạo ra giá trị bằng giá trị sức lao động (v). Thời gian lao động thặng dư là phần còn lại, tạo ra m. Ví dụ gốc: 8 giờ = 4 giờ + 4 giờ.",
      source: src(S31),
    },
    {
      id: "f-rate-time",
      expression: "m' = thời gian thặng dư / thời gian tất yếu × 100%",
      meaning:
        "Vì mỗi giờ tạo ra cùng lượng giá trị, m' cũng bằng tỷ số giữa hai phần thời gian. Ví dụ: 6 / 4 × 100% = 150%.",
      source: src(S31, "Dạng này suy ra từ giả định mỗi giờ tạo ra cùng lượng giá trị. Cần đối chiếu."),
    },
  ],
  academic: {
    concepts: [
      {
        id: "tu-ban",
        term: "Tư bản",
        definition:
          "Tư bản là giá trị mang lại giá trị thặng dư bằng cách bóc lột lao động không công của công nhân làm thuê. Nó phản ánh quan hệ sản xuất xã hội giữa giai cấp tư sản và giai cấp công nhân làm thuê.",
        explanation:
          "Tư bản không chỉ là vật như máy móc hay tiền. Máy móc và tiền trở thành tư bản khi chúng được dùng để chiếm đoạt giá trị thặng dư.",
        tshirtExample:
          "Chủ xưởng dùng tiền mua bông, máy móc và thuê công nhân may, để bán áo thu về nhiều giá trị hơn số đã bỏ ra. Số tiền ấy vận động như tư bản.",
        source: src(S31, "Cần đối chiếu định nghĩa tư bản và công thức chung T – H – T'."),
      },
      {
        id: "tu-ban-bat-bien",
        term: "Tư bản bất biến (c)",
        definition:
          "Tư bản bất biến là bộ phận tư bản tồn tại dưới hình thức tư liệu sản xuất mà giá trị được bảo tồn và chuyển vào sản phẩm, không thay đổi về lượng giá trị trong quá trình sản xuất.",
        explanation:
          "Máy móc, nhà xưởng, nguyên liệu chỉ chuyển giá trị cũ của chúng vào sản phẩm. Chúng không tự tạo ra giá trị mới.",
        tshirtExample:
          "Giá trị bông, sợi, vải, khấu hao máy may chuyển vào chiếc áo. Đó là c = 60 trong ví dụ.",
        source: src(S_TBBB),
      },
      {
        id: "tu-ban-kha-bien",
        term: "Tư bản khả biến (v)",
        definition:
          "Tư bản khả biến là bộ phận tư bản dùng để mua sức lao động. Giá trị của nó chuyển hóa thành giá trị sức lao động và, trong quá trình sản xuất, được lao động của công nhân tái tạo ra, đồng thời tạo thêm một lượng giá trị mới lớn hơn.",
        explanation:
          "Chỉ có lao động của công nhân làm thuê mới tạo ra giá trị mới. Vì vậy phần tư bản dùng để mua sức lao động là nguồn gốc của giá trị thặng dư.",
        tshirtExample:
          "Tiền công trả cho công nhân may, v = 20 trong ví dụ. Họ tạo ra giá trị mới 40, gồm 20 thay cho tiền công và 20 là giá trị thặng dư.",
        source: src(S_TBBB),
      },
      {
        id: "hang-hoa-suc-lao-dong",
        term: "Hàng hóa sức lao động",
        definition:
          "Sức lao động trở thành hàng hóa khi có hai điều kiện: người lao động được tự do về thân thể, có quyền sở hữu sức lao động của mình; và người lao động không có đủ tư liệu sản xuất để tự thực hiện lao động, nên buộc phải bán sức lao động. Hàng hóa sức lao động có hai thuộc tính: giá trị và giá trị sử dụng.",
        explanation:
          "Giá trị của hàng hóa sức lao động do giá trị các tư liệu sinh hoạt cần thiết để sản xuất và tái sản xuất sức lao động quyết định. Tiền công là biểu hiện bằng tiền của giá trị đó. Giá trị sử dụng của nó là công dụng trong lao động, và nó có đặc điểm riêng là tạo ra giá trị lớn hơn giá trị của bản thân nó.",
        tshirtExample:
          "Công nhân may bán sức lao động và nhận tiền công. Khi làm việc, họ tạo ra giá trị mới lớn hơn tiền công nhận được.",
        source: src(S31, "Cần đối chiếu: hai điều kiện, hai thuộc tính và các yếu tố cấu thành giá trị sức lao động."),
      },
      {
        id: "thoi-gian-lao-dong-tat-yeu",
        term: "Thời gian lao động tất yếu",
        definition:
          "Thời gian lao động tất yếu là phần thời gian trong ngày lao động mà người công nhân tạo ra một lượng giá trị ngang bằng giá trị sức lao động của mình.",
        explanation:
          "Trong thời gian này, lao động của công nhân thay thế giá trị sức lao động (v) mà nhà tư bản trả dưới hình thức tiền công.",
        tshirtExample:
          "Trong ví dụ, 4 giờ đầu của ca 8 giờ là thời gian lao động tất yếu.",
        source: src(S31),
      },
      {
        id: "thoi-gian-lao-dong-thang-du",
        term: "Thời gian lao động thặng dư",
        definition:
          "Thời gian lao động thặng dư là phần thời gian còn lại của ngày lao động, vượt quá thời gian lao động tất yếu. Trong thời gian đó người công nhân tạo ra giá trị thặng dư cho nhà tư bản.",
        explanation:
          "Ngày lao động bằng thời gian lao động tất yếu cộng thời gian lao động thặng dư.",
        tshirtExample:
          "Trong ví dụ, 4 giờ sau của ca 8 giờ là thời gian lao động thặng dư. Nếu ca kéo dài thành 12 giờ, phần thặng dư là 8 giờ.",
        source: src(S31),
      },
      {
        id: "gia-tri-thang-du",
        term: "Giá trị thặng dư (m)",
        definition:
          "Giá trị thặng dư là phần giá trị mới dôi ra ngoài giá trị sức lao động, do công nhân làm thuê tạo ra và bị nhà tư bản chiếm không.",
        explanation:
          "Giá trị thặng dư xuất hiện trong quá trình sản xuất. Việc trao đổi giữa tiền công và sức lao động vẫn diễn ra theo nguyên tắc ngang giá.",
        tshirtExample:
          "Trong ví dụ gốc, công nhân tạo ra giá trị mới 40, nhận về giá trị sức lao động 20. Phần dôi ra m = 20 là giá trị thặng dư.",
        source: src(S31),
      },
      {
        id: "ty-suat-gia-tri-thang-du",
        term: "Tỷ suất giá trị thặng dư (m')",
        definition:
          "Tỷ suất giá trị thặng dư là tỷ lệ phần trăm giữa giá trị thặng dư và tư bản khả biến, m' = m / v × 100%. Nó phản ánh trình độ bóc lột sức lao động làm thuê của nhà tư bản.",
        explanation:
          "Có hai phương pháp chính nâng m'. Giá trị thặng dư tuyệt đối: kéo dài ngày lao động vượt quá thời gian lao động tất yếu, trong khi thời gian lao động tất yếu không đổi. Giá trị thặng dư tương đối: rút ngắn thời gian lao động tất yếu bằng cách hạ thấp giá trị sức lao động nhờ tăng năng suất lao động xã hội, trước hết trong các ngành sản xuất tư liệu sinh hoạt, còn ngày lao động giữ nguyên.",
        tshirtExample:
          "Ngày 8 giờ lên 10 giờ, thời gian tất yếu vẫn 4 giờ: m' tăng từ 100% lên 150%. Giữ 8 giờ nhưng thời gian tất yếu giảm xuống 2 giờ: m' lên 300%.",
        source: src(S_PP, "Giáo trình gọi các phương pháp theo thuật ngữ “giá trị thặng dư tuyệt đối” và “giá trị thặng dư tương đối”. Cần đối chiếu."),
      },
    ],
    distinctions: [
      {
        id: "dist-c-v",
        title: "Tư bản bất biến và tư bản khả biến",
        left: {
          term: "Tư bản bất biến (c)",
          points: [
            "Tồn tại dưới hình thức tư liệu sản xuất: bông, máy móc, nhà xưởng.",
            "Giá trị được bảo tồn và chuyển vào sản phẩm.",
            "Không tạo ra giá trị thặng dư.",
          ],
        },
        right: {
          term: "Tư bản khả biến (v)",
          points: [
            "Dùng để mua sức lao động, trả dưới dạng tiền công.",
            "Giá trị được tái tạo và tạo thêm một lượng giá trị mới lớn hơn.",
            "Là nguồn gốc của giá trị thặng dư.",
          ],
        },
        takeaway:
          "Dù máy móc có hiện đại đến đâu, giá trị mới vẫn chỉ do lao động của công nhân tạo ra. Vì thế chỉ phần v, không phải phần c, là nguồn gốc của m.",
        source: src(S_TBBB),
      },
      {
        id: "dist-ld-sld",
        title: "Lao động và sức lao động",
        left: {
          term: "Sức lao động",
          points: [
            "Là năng lực thể chất và tinh thần của người lao động.",
            "Là hàng hóa được mua bán trên thị trường sức lao động.",
            "Có giá trị (tiền công là biểu hiện bằng tiền) và giá trị sử dụng.",
          ],
        },
        right: {
          term: "Lao động",
          points: [
            "Là việc sử dụng sức lao động trong quá trình sản xuất.",
            "Không phải là hàng hóa. Nhà tư bản mua sức lao động chứ không mua lao động.",
            "Tạo ra giá trị mới, lớn hơn giá trị sức lao động.",
          ],
        },
        takeaway:
          "Nhà tư bản trả giá trị của sức lao động, nhưng được sử dụng lao động. Chính chênh lệch giữa giá trị lao động tạo ra và giá trị sức lao động là giá trị thặng dư.",
        source: src(S31, "Cần đối chiếu cách giáo trình nêu quan hệ giữa tiền công và giá trị sức lao động."),
      },
      {
        id: "dist-m-loi-nhuan",
        title: "Giá trị thặng dư và lợi nhuận",
        left: {
          term: "Giá trị thặng dư (m)",
          points: [
            "Là phần giá trị mới dôi ra ngoài giá trị sức lao động.",
            "Chỉ do lao động của công nhân làm thuê tạo ra, tức là do bộ phận v.",
            "Là nội dung, là bản chất.",
          ],
        },
        right: {
          term: "Lợi nhuận (p)",
          points: [
            "Là hình thức biểu hiện, hình thái chuyển hóa của giá trị thặng dư.",
            "Được quan niệm là con đẻ của toàn bộ tư bản ứng trước (c + v).",
            "Là chênh lệch giữa giá trị hàng hóa và chi phí sản xuất tư bản chủ nghĩa.",
          ],
        },
        takeaway:
          "Lợi nhuận và giá trị thặng dư là hai đại lượng liên quan nhưng không đồng nhất. Lợi nhuận che giấu nguồn gốc thật của giá trị thặng dư.",
        source: src(S_LN, "Cần đối chiếu cách giáo trình định nghĩa lợi nhuận và chi phí sản xuất. Phần này mô hình chưa tính toán."),
      },
    ],
  },
  check: [
    {
      id: "tb-q1",
      prompt:
        "Ngày lao động 8 giờ, thời gian lao động tất yếu giảm từ 4 giờ còn 3 giờ do tăng năng suất lao động xã hội. Trong mô hình (c = 60, v = 15, m = 25), tỷ suất giá trị thặng dư xấp xỉ bao nhiêu?",
      options: [
        { id: "a", text: "125%" },
        { id: "b", text: "150%" },
        { id: "c", text: "166,7%" },
        { id: "d", text: "300%" },
      ],
      correct: "c",
      explanation:
        "Đúng là c. m' = m / v × 100% = 25 / 15 × 100% ≈ 166,7%. Phương án b (150%) là giá trị khi kéo dài ngày lao động lên 10 giờ. Phương án d (300%) là khi thời gian tất yếu chỉ còn 2 giờ.",
      source: src(S31),
    },
    {
      id: "tb-q2",
      prompt:
        "Điều kiện nào sau đây cần có để sức lao động trở thành hàng hóa?",
      options: [
        { id: "a", text: "Người lao động có đủ tư liệu sản xuất để tự sản xuất và bán sản phẩm." },
        { id: "b", text: "Người lao động có quyền sở hữu sức lao động của mình, và không có đủ tư liệu sản xuất để tự thực hiện lao động." },
        { id: "c", text: "Người lao động bị ràng buộc thân thể với chủ để chủ có thể bán sức lao động của họ." },
        { id: "d", text: "Người lao động có trình độ chuyên môn cao." },
      ],
      correct: "b",
      explanation:
        "Đúng là b: tự do về thân thể và không có tư liệu sản xuất nên buộc phải bán sức lao động. Phương án a sai vì người có đủ tư liệu sản xuất sẽ tự sản xuất. Phương án c sai vì không tự do thì không có quyền bán sức lao động của chính mình.",
      source: src(S31),
    },
  ],
};

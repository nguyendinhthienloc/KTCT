import type { CapitalContent, Source } from "./schema";

const CH = "Bài giảng Chương 3: Giá trị thặng dư trong nền kinh tế thị trường";

const ok = (section: string, page: string, note?: string): Source => ({
  chapter: CH,
  section,
  page,
  ...(note ? { note } : {}),
});

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
        "Giá trị hàng hóa gồm giá trị tư liệu sản xuất chuyển vào (c), giá trị sức lao động (v) và giá trị thặng dư (m). Bài giảng ký hiệu giá trị hàng hóa là G (G = c + v + m); đề án dùng W.",
      source: ok("Chi phí sản xuất TBCN và lợi nhuận: G = c + v + m", "25, 71–72"),
    },
    {
      id: "f-new-value",
      expression: "Giá trị mới = v + m",
      meaning:
        "Giá trị mới là phần giá trị do công nhân làm thuê tạo ra trong quá trình sản xuất, gồm phần bù lại giá trị sức lao động và phần dôi ra là giá trị thặng dư. Phần c không phải giá trị mới, vì nó chỉ được chuyển vào sản phẩm.",
      source: ok("Quá trình sản xuất giá trị thặng dư", "24–25"),
    },
    {
      id: "f-rate",
      expression: "m' = m / v × 100%",
      meaning:
        "Tỷ suất giá trị thặng dư là tỷ số tính theo phần trăm giữa giá trị thặng dư và tư bản khả biến tương ứng. Nó là biểu hiện chính xác của mức độ tư bản bóc lột sức lao động. Ví dụ gốc: 20 / 20 × 100% = 100%.",
      source: ok("Tỷ suất và khối lượng giá trị thặng dư", "57"),
    },
    {
      id: "f-time",
      expression: "Ngày lao động = thời gian lao động cần thiết (tất yếu) + thời gian lao động thặng dư",
      meaning:
        "Ngày lao động của công nhân chia làm hai phần: thời gian lao động cần thiết, tạo ra giá trị bằng giá trị sức lao động (v), và thời gian lao động thặng dư, tạo ra m. Ví dụ gốc: 8 giờ = 4 giờ + 4 giờ.",
      source: ok("Giá trị thặng dư TBCN — ngày lao động", "32, 35"),
    },
    {
      id: "f-rate-time",
      expression: "m' = thời gian thặng dư / thời gian tất yếu × 100%",
      meaning:
        "Bài giảng viết m' cũng bằng tỷ số giữa thời gian lao động thặng dư và thời gian lao động cần thiết. Ví dụ: 6 / 4 × 100% = 150%.",
      source: ok("Tỷ suất và khối lượng giá trị thặng dư; Các phương pháp sản xuất giá trị thặng dư", "57, 60–61"),
    },
  ],
  academic: {
    concepts: [
      {
        id: "tu-ban",
        term: "Tư bản",
        definition:
          "Tư bản là sự vận động của giá trị nhằm mang lại giá trị thặng dư. Tư bản là tiền, tư bản là hàng hóa, vận động theo công thức T – H – T', trong đó T' lớn hơn T một lượng là giá trị thặng dư.",
        explanation:
          "Tư bản không phải một vật mà là một quan hệ xã hội giữa người với người, do các vật làm trung gian. Nếu không mang hình thái hàng hóa, tiền không thể trở thành tư bản.",
        tshirtExample:
          "Chủ xưởng dùng tiền mua bông, máy móc và thuê công nhân may, để bán áo thu về nhiều giá trị hơn số đã bỏ ra. Số tiền ấy vận động như tư bản.",
        source: ok("Công thức chung của tư bản; Định nghĩa tư bản của E.G. Wakefield", "5–7, 37"),
      },
      {
        id: "tu-ban-bat-bien",
        term: "Tư bản bất biến (c)",
        definition:
          "Tư bản bất biến là bộ phận tư bản biến thành tư liệu sản xuất, tức nguyên liệu, vật liệu phụ và tư liệu lao động, không thay đổi đại lượng giá trị của nó trong quá trình sản xuất. Ký hiệu là c.",
        explanation:
          "Tư bản bất biến không đổi về giá trị nhưng đổi về giá trị sử dụng: giá trị sử dụng cũ biến đi rồi xuất hiện dưới hình thái giá trị sử dụng mới. Máy móc, như mọi bộ phận khác của tư bản bất biến, không tạo ra giá trị nào cả mà chỉ chuyển giá trị của bản thân nó vào sản phẩm.",
        tshirtExample:
          "Giá trị bông, sợi, vải, khấu hao máy may chuyển vào chiếc áo. Đó là c = 60 trong ví dụ.",
        source: ok("Tư bản bất biến và tư bản khả biến; Máy móc có tạo ra giá trị thặng dư hay không?", "31, 41, 62"),
      },
      {
        id: "tu-ban-kha-bien",
        term: "Tư bản khả biến (v)",
        definition:
          "Tư bản khả biến là bộ phận tư bản biến thành sức lao động, thay đổi giá trị của nó trong quá trình sản xuất: nó tái sản xuất ra vật ngang giá với bản thân nó và còn sản xuất ra một số dư, tức giá trị thặng dư. Ký hiệu là v.",
        explanation:
          "Sức lao động (v) là nguồn gốc tạo ra giá trị thặng dư. Tư liệu sản xuất (c) chỉ tồn tại để tiêu dùng sức lao động nhằm tạo ra giá trị thặng dư.",
        tshirtExample:
          "Tiền công trả cho công nhân may, v = 20 trong ví dụ. Họ tạo ra giá trị mới 40, gồm 20 thay cho tiền công và 20 là giá trị thặng dư.",
        source: ok("Tư bản bất biến và tư bản khả biến; Vai trò của tư bản bất biến và tư bản khả biến", "30, 42"),
      },
      {
        id: "hang-hoa-suc-lao-dong",
        term: "Hàng hóa sức lao động",
        definition:
          "Sức lao động trở thành hàng hóa khi có hai điều kiện: người lao động được tự do về thân thể, tự chi phối được sức lao động của mình như một hàng hóa; và họ không có hàng hóa nào khác (tư liệu sản xuất) để bán, nên buộc phải bán sức lao động. Hàng hóa sức lao động có hai thuộc tính: giá trị và giá trị sử dụng.",
        explanation:
          "Giá trị hàng hóa sức lao động là thời gian lao động cần thiết để sản xuất và tái sản xuất ra nó, tức giá trị những tư liệu sinh hoạt vật chất và tinh thần cần thiết nuôi sống người lao động, phí tổn đào tạo và tư liệu sinh hoạt cho con cái họ; có yếu tố tinh thần và lịch sử. Tiền công là giá cả của sức lao động. Giá trị sử dụng của nó có đặc điểm riêng: khi sử dụng, nó tạo ra giá trị mới lớn hơn giá trị bản thân nó.",
        tshirtExample:
          "Công nhân may bán sức lao động và nhận tiền công. Khi làm việc, họ tạo ra giá trị mới lớn hơn tiền công nhận được.",
        source: ok("Hàng hóa sức lao động", "14–19, 43–44"),
      },
      {
        id: "thoi-gian-lao-dong-tat-yeu",
        term: "Thời gian lao động cần thiết (tất yếu)",
        definition:
          "Thời gian lao động cần thiết (còn gọi là thời gian lao động tất yếu) là phần thời gian trong ngày lao động mà công nhân tạo ra một lượng giá trị ngang bằng giá trị sức lao động mà nhà tư bản trả, tức giá trị sức lao động được hoàn lại bằng một vật ngang giá mới.",
        explanation:
          "Trong thời gian này, lao động của công nhân thay thế giá trị sức lao động (v). Đừng nhầm với thời gian lao động xã hội cần thiết ở Chương 03: đó là thước đo lượng giá trị hàng hóa, còn đây là một phần của ngày lao động.",
        tshirtExample:
          "Trong ví dụ, 4 giờ đầu của ca 8 giờ là thời gian lao động cần thiết.",
        source: ok("Giá trị thặng dư TBCN — ngày lao động; Nguyên tắc thực hiện GTTD TBCN", "32, 35"),
      },
      {
        id: "thoi-gian-lao-dong-thang-du",
        term: "Thời gian lao động thặng dư",
        definition:
          "Thời gian lao động thặng dư là phần còn lại của ngày lao động, sau thời gian lao động cần thiết. Quá trình tạo ra giá trị kéo dài quá điểm bù lại giá trị sức lao động thì trở thành quá trình làm tăng giá trị, tức tạo ra giá trị thặng dư.",
        explanation:
          "Ngày lao động của công nhân bằng thời gian lao động cần thiết cộng thời gian lao động thặng dư. Lao động thặng dư là nguồn của giá trị thặng dư.",
        tshirtExample:
          "Trong ví dụ, 4 giờ sau của ca 8 giờ là thời gian lao động thặng dư. Nếu ca kéo dài thành 12 giờ, phần thặng dư là 8 giờ.",
        source: ok("Giá trị thặng dư TBCN — ngày lao động; Nguyên tắc thực hiện GTTD TBCN", "32, 35, 71"),
      },
      {
        id: "gia-tri-thang-du",
        term: "Giá trị thặng dư (m)",
        definition:
          "Giá trị thặng dư TBCN (m) là một bộ phận của giá trị mới dôi ra ngoài giá trị sức lao động, do công nhân làm thuê tạo ra và thuộc về nhà tư bản.",
        explanation:
          "Giá trị thặng dư xuất hiện trong quá trình sản xuất. Nhà tư bản mua sức lao động theo đúng giá trị, trao đổi vẫn theo nguyên tắc ngang giá; việc sức lao động tạo ra giá trị mới lớn hơn giá trị của nó là may mắn cho người mua, không phải bất công với người bán.",
        tshirtExample:
          "Trong ví dụ gốc, công nhân tạo ra giá trị mới 40, nhận về giá trị sức lao động 20. Phần dôi ra m = 20 là giá trị thặng dư.",
        source: ok("Quá trình sản xuất giá trị thặng dư; Nguyên tắc thực hiện GTTD TBCN", "24, 34–35"),
      },
      {
        id: "ty-suat-gia-tri-thang-du",
        term: "Tỷ suất giá trị thặng dư (m')",
        definition:
          "Tỷ suất giá trị thặng dư là tỷ số tính theo phần trăm giữa giá trị thặng dư và tư bản khả biến tương ứng để sản xuất ra giá trị thặng dư đó, m' = m / v × 100%. Nó là biểu hiện chính xác của mức độ tư bản bóc lột sức lao động.",
        explanation:
          "Có hai phương pháp chính nâng m'. Giá trị thặng dư tuyệt đối: kéo dài tuyệt đối ngày lao động của công nhân trong điều kiện thời gian lao động cần thiết không đổi. Giá trị thặng dư tương đối: rút ngắn thời gian lao động cần thiết để kéo dài tương ứng thời gian lao động thặng dư, trên cơ sở tăng năng suất lao động xã hội, trong điều kiện độ dài ngày lao động không đổi.",
        tshirtExample:
          "Ngày 8 giờ lên 10 giờ, thời gian cần thiết vẫn 4 giờ: m' tăng từ 100% lên 150%. Giữ 8 giờ nhưng thời gian cần thiết giảm xuống 2 giờ: m' lên 300%.",
        source: ok("Tỷ suất và khối lượng giá trị thặng dư; Các phương pháp sản xuất giá trị thặng dư", "57, 60–61"),
      },
    ],
    distinctions: [
      {
        id: "dist-c-v",
        title: "Tư bản bất biến và tư bản khả biến",
        left: {
          term: "Tư bản bất biến (c)",
          points: [
            "Biến thành tư liệu sản xuất: nguyên liệu, vật liệu phụ, tư liệu lao động như bông, máy móc, nhà xưởng.",
            "Không thay đổi đại lượng giá trị; giá trị được chuyển vào sản phẩm.",
            "Không tạo ra giá trị thặng dư.",
          ],
        },
        right: {
          term: "Tư bản khả biến (v)",
          points: [
            "Biến thành sức lao động, trả dưới dạng tiền công.",
            "Thay đổi giá trị trong quá trình sản xuất: tái sản xuất ra vật ngang giá và một số dư.",
            "Là nguồn gốc của giá trị thặng dư.",
          ],
        },
        takeaway:
          "Dù máy móc có hiện đại đến đâu, giá trị mới vẫn chỉ do lao động của công nhân tạo ra. Vì thế chỉ phần v, không phải phần c, là nguồn gốc của m.",
        source: ok("Vai trò của tư bản bất biến và tư bản khả biến; Máy móc có tạo ra giá trị thặng dư hay không?", "30–31, 41–42, 62"),
      },
      {
        id: "dist-ld-sld",
        title: "Lao động và sức lao động",
        left: {
          term: "Sức lao động",
          points: [
            "Là toàn bộ năng lực thể chất và tinh thần tồn tại trong cơ thể con người.",
            "Là hàng hóa được mua bán trên thị trường; người công nhân bán sức lao động.",
            "Có giá trị (tiền công là giá cả của nó) và giá trị sử dụng.",
          ],
        },
        right: {
          term: "Lao động",
          points: [
            "Là quá trình tiêu dùng sức lao động.",
            "Không phải là hàng hóa. Nhà tư bản mua sức lao động chứ không mua lao động.",
            "Khi tiêu dùng sức lao động, tạo ra giá trị mới lớn hơn giá trị sức lao động.",
          ],
        },
        takeaway:
          "Nhà tư bản trả giá cả của sức lao động, nhưng được sử dụng lao động. Chính chênh lệch giữa giá trị mới lao động tạo ra và giá trị sức lao động là giá trị thặng dư.",
        source: ok("Hàng hóa sức lao động; Tiền công", "19, 43–45"),
      },
      {
        id: "dist-m-loi-nhuan",
        title: "Giá trị thặng dư và lợi nhuận",
        left: {
          term: "Giá trị thặng dư (m)",
          points: [
            "Là phần giá trị mới dôi ra ngoài giá trị sức lao động.",
            "Do v (sức lao động trực tiếp của người sản xuất) sinh ra.",
            "Là nội dung, là bản chất.",
          ],
        },
        right: {
          term: "Lợi nhuận (p)",
          points: [
            "Là số tiền lời nhà tư bản thu được sau khi bán hàng hóa, do chênh lệch giữa giá trị hàng hóa và chi phí sản xuất TBCN (k = c + v), G = k + p.",
            "Là hình thái thần bí của m: làm ta tưởng m do toàn bộ (c + v) sinh ra.",
            "Về lượng p và m thường không bằng nhau do cung cầu, nhưng xét toàn xã hội thì tổng m = tổng p.",
          ],
        },
        takeaway:
          "Về chất, lợi nhuận và giá trị thặng dư là một, cùng nguồn gốc là lao động. Nhưng lợi nhuận phản ánh sai lệch bản chất quan hệ sản xuất TBCN vì che giấu nguồn gốc thật của giá trị thặng dư.",
        source: ok("3.1. Lợi nhuận — chi phí sản xuất TBCN; Bản chất lợi nhuận", "72–73, 75"),
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
      source: ok("Tỷ suất và khối lượng giá trị thặng dư; Các phương pháp sản xuất giá trị thặng dư", "57, 60–61"),
    },
    {
      id: "tb-q2",
      prompt:
        "Điều kiện nào sau đây cần có để sức lao động trở thành hàng hóa?",
      options: [
        { id: "a", text: "Người lao động có đủ tư liệu sản xuất để tự sản xuất và bán sản phẩm." },
        { id: "b", text: "Người lao động được tự do về thân thể, và không có hàng hóa (tư liệu sản xuất) nào khác để bán nên buộc phải bán sức lao động." },
        { id: "c", text: "Người lao động bị ràng buộc thân thể với chủ để chủ có thể bán sức lao động của họ." },
        { id: "d", text: "Người lao động có trình độ chuyên môn cao." },
      ],
      correct: "b",
      explanation:
        "Đúng là b: người lao động tự do về thân thể, chi phối được sức lao động của mình, đồng thời không có hàng hóa nào khác để bán nên buộc phải bán sức lao động. Phương án a sai vì người có đủ tư liệu sản xuất sẽ tự sản xuất. Phương án c sai vì không tự do thì không có quyền bán sức lao động của chính mình.",
      source: ok("Hàng hóa sức lao động — hai điều kiện", "15–16, 98"),
    },
  ],
};

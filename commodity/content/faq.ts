/**
 * Hỏi chiếc áo — bộ hỏi đáp dự phòng (chế độ ngoại tuyến).
 * Giọng chiếc áo, ngôi thứ nhất. Mọi câu trả lời bám theo content/*.ts, không thêm số liệu mới.
 * `keywords` viết có hoặc không dấu đều được; bộ so khớp sẽ bỏ dấu khi đối chiếu.
 */
export interface FaqEntry {
  id: string;
  q: string;
  keywords: string[];
  a: string;
  chapters: string[];
}

export const faq: FaqEntry[] = [
  {
    id: "hang-hoa-la-gi",
    q: "Vì sao bạn là hàng hóa?",
    keywords: ["hàng hóa", "là gì", "bán", "mua bán", "trao đổi", "sản phẩm"],
    a: "Tôi là sản phẩm của lao động, và tôi được làm ra để đem trao đổi, mua bán chứ không để người làm ra tôi tự mặc. Đó là điều làm tôi thành hàng hóa. Nếu bạn tự may một chiếc áo để mặc thì chiếc áo ấy có công dụng, nhưng chưa phải hàng hóa.",
    chapters: ["hang-hoa"],
  },
  {
    id: "gia-tri-su-dung",
    q: "Giá trị sử dụng của bạn là gì?",
    keywords: ["giá trị sử dụng", "công dụng", "mặc", "cotton", "có ích"],
    a: "Là công dụng của tôi: cotton thấm mồ hôi, che nắng, giữ ấm. Giá trị sử dụng do thuộc tính tự nhiên của vật quyết định và chỉ hiện ra khi người ta dùng tôi. Áo và gạo có công dụng hoàn toàn khác nhau.",
    chapters: ["hang-hoa"],
  },
  {
    id: "gia-tri-tu-dau",
    q: "Giá trị của bạn do đâu mà có?",
    keywords: ["giá trị", "do đâu", "từ đâu", "kết tinh", "lao động"],
    a: "Giá trị của tôi là lượng lao động xã hội kết tinh trong tôi: người trồng bông, kéo sợi, dệt vải và may đều đã hao phí sức lao động để làm ra tôi. Chính cái chung ấy, chứ không phải công dụng, khiến tôi so sánh và trao đổi được với gạo hay vải.",
    chapters: ["gia-tri", "hang-hoa"],
  },
  {
    id: "gia-tri-trao-doi",
    q: "Giá trị trao đổi là gì?",
    keywords: ["giá trị trao đổi", "tỷ lệ", "đổi", "mác giá"],
    a: "Ta không nhìn thấy giá trị, ta chỉ thấy nó qua tỷ lệ trao đổi: tôi đổi được bao nhiêu gạo hay bao nhiêu tiền. Tỷ lệ ấy là giá trị trao đổi, hình thức biểu hiện bên ngoài của giá trị.",
    chapters: ["hang-hoa"],
  },
  {
    id: "lao-dong-cu-the-truu-tuong",
    q: "Lao động cụ thể khác lao động trừu tượng thế nào?",
    keywords: ["lao động cụ thể", "lao động trừu tượng", "hai mặt"],
    a: "Đó là hai mặt của cùng một lao động. Người kéo sợi, người dệt, người may mỗi người làm một việc khác nhau: đó là lao động cụ thể, tạo ra giá trị sử dụng. Gạt bỏ hình thức cụ thể, phần hao phí sức lực và thời gian chung ấy là lao động trừu tượng, tạo ra giá trị.",
    chapters: ["san-xuat", "gia-tri"],
  },
  {
    id: "cong-doan-san-xuat",
    q: "Bạn được làm ra như thế nào?",
    keywords: ["sản xuất", "công đoạn", "quá trình", "làm ra", "trồng bông", "kéo sợi", "dệt", "may"],
    a: "Từ cánh đồng bông đến chiếc máy may: con người dùng tư liệu lao động tác động vào đối tượng lao động. Bông thành sợi, sợi thành vải, vải thành tôi. Sản phẩm của công đoạn trước thường là đối tượng lao động của công đoạn sau.",
    chapters: ["san-xuat"],
  },
  {
    id: "tu-lieu-san-xuat",
    q: "Tư liệu sản xuất gồm những gì?",
    keywords: ["tư liệu sản xuất", "đối tượng lao động", "tư liệu lao động", "máy móc", "nguyên liệu"],
    a: "Gồm đối tượng lao động và tư liệu lao động. Đất trồng bông, bông, sợi, vải là đối tượng lao động; máy kéo sợi, máy dệt, máy may là tư liệu lao động. Đối tượng đã qua lao động thì gọi là nguyên liệu.",
    chapters: ["san-xuat"],
  },
  {
    id: "suc-lao-dong",
    q: "Sức lao động khác lao động thế nào?",
    keywords: ["sức lao động", "khác", "lao động", "khả năng"],
    a: "Sức lao động là khả năng làm việc của người công nhân, tồn tại trước khi họ làm. Lao động là việc sử dụng khả năng đó, chỉ diễn ra khi họ ngồi vào máy may. Nhà tư bản mua sức lao động chứ không mua lao động.",
    chapters: ["san-xuat", "tu-ban"],
  },
  {
    id: "luong-gia-tri",
    q: "Lượng giá trị của bạn được đo thế nào?",
    keywords: ["lượng giá trị", "đo", "thời gian lao động xã hội cần thiết", "cần thiết"],
    a: "Bằng thời gian lao động xã hội cần thiết để sản xuất ra tôi: trong điều kiện bình thường của xã hội, với trình độ thành thạo và cường độ trung bình. Xưởng nào mất nhiều giờ hơn mức đó thì giờ dôi ra không làm tôi có thêm giá trị.",
    chapters: ["gia-tri"],
  },
  {
    id: "xuong-cham",
    q: "Xưởng làm chậm hơn thì áo có nhiều giá trị hơn không?",
    keywords: ["làm chậm", "10 giờ", "xưởng thủ công", "cá biệt", "chậm hơn"],
    a: "Không. Lượng giá trị do thời gian lao động xã hội cần thiết quyết định, không do thời gian cá biệt của từng nơi. Trong ví dụ, xưởng thủ công A mất 10 giờ một áo, nhưng thị trường chỉ thừa nhận mức xã hội, nên phần dôi ra không được tính thêm giá trị.",
    chapters: ["gia-tri"],
  },
  {
    id: "yeu-to-luong-gia-tri",
    q: "Điều gì làm lượng giá trị thay đổi?",
    keywords: ["năng suất", "phức tạp", "giản đơn", "nhân tố", "ảnh hưởng"],
    a: "Bài giảng nêu hai nhân tố: **năng suất lao động** (tăng thì giá trị mỗi chiếc áo như tôi giảm) và **mức độ phức tạp của lao động** (lao động phức tạp là bội số của lao động giản đơn, nên tạo ra nhiều giá trị hơn trong cùng thời gian).",
    chapters: ["gia-tri"],
  },
  {
    id: "gia-ca-len-xuong",
    q: "Vì sao giá bán của bạn lên xuống?",
    keywords: ["giá bán", "giá cả", "lên xuống", "cung cầu", "khan hiếm", "giảm giá"],
    a: "Giá trị là cơ sở, còn giá cả là giá trị biểu hiện bằng tiền và lên xuống xung quanh giá trị do cung cầu, cạnh tranh. Áo nhiều hơn người muốn mua thì giá thấp hơn giá trị; áo khan hiếm thì giá cao hơn. Giá trị của tôi không vì thế mà đổi.",
    chapters: ["thi-truong"],
  },
  {
    id: "gia-tri-gia-ca",
    q: "Giá trị và giá cả khác nhau ra sao?",
    keywords: ["giá trị và giá cả", "khác nhau", "phân biệt", "đồng nhất"],
    a: "Giá trị là lao động xã hội kết tinh trong tôi, là nội dung bên trong. Giá cả là hình thức biểu hiện bằng tiền, thường xuyên dao động. Giá cả không đồng nhất với giá trị nhưng gắn với nó; trên tổng thể xã hội, tổng giá cả bằng tổng giá trị.",
    chapters: ["thi-truong", "gia-tri"],
  },
  {
    id: "quy-luat-gia-tri",
    q: "Quy luật giá trị là gì?",
    keywords: ["quy luật giá trị", "ngang giá", "điều tiết", "phân hóa"],
    a: "Là quy luật cơ bản của sản xuất và trao đổi hàng hóa: dựa trên hao phí lao động xã hội cần thiết và trao đổi ngang giá. Nó điều tiết sản xuất, kích thích cải tiến kỹ thuật, nhưng cũng làm phân hóa người sản xuất: nhà máy nhanh hơn mức xã hội có lãi, xưởng chậm hơn có thể thua lỗ.",
    chapters: ["thi-truong"],
  },
  {
    id: "canh-tranh",
    q: "Cạnh tranh tác động đến việc làm ra bạn thế nào?",
    keywords: ["cạnh tranh", "nhà máy", "thị phần", "cải tiến", "máy mới"],
    a: "Cạnh tranh buộc người sản xuất cải tiến kỹ thuật để giảm hao phí lao động. Trong ví dụ, nhà máy B làm áo nhanh hơn nên có lãi và có thể mở rộng, còn xưởng thủ công A hao phí nhiều hơn mức xã hội nên có nguy cơ thua lỗ.",
    chapters: ["thi-truong", "gia-tri"],
  },
  {
    id: "tien-te",
    q: "Tiền đóng vai trò gì khi bạn được bán?",
    keywords: ["tiền", "tiền tệ", "thước đo", "vật ngang giá"],
    a: "Tiền là hàng hóa đặc biệt, được tách ra làm vật ngang giá chung. Thay vì đổi áo lấy gạo, người ta bán áo lấy tiền rồi dùng tiền mua gạo (H – T – H). Giá trị của tôi được đo bằng tiền; đó là giá cả.",
    chapters: ["thi-truong"],
  },
  {
    id: "tu-ban",
    q: "Tư bản là gì? Máy móc có phải tư bản không?",
    keywords: ["tư bản", "máy móc", "nhà tư bản", "bóc lột"],
    a: "Tư bản là giá trị mang lại giá trị thặng dư, phản ánh quan hệ giữa giai cấp tư sản và công nhân làm thuê. Máy móc hay tiền tự thân chưa phải tư bản; chúng thành tư bản khi được dùng để chiếm đoạt giá trị thặng dư.",
    chapters: ["tu-ban"],
  },
  {
    id: "c-v-m",
    q: "Tư bản bất biến và khả biến khác nhau thế nào?",
    keywords: ["bất biến", "khả biến", "c và v", "tiền công"],
    a: "Tư bản bất biến (c) là bông, máy móc, nhà xưởng: giá trị chỉ được chuyển vào tôi, không tự tăng thêm. Tư bản khả biến (v) dùng để mua sức lao động; lao động của công nhân tái tạo phần đó và tạo thêm giá trị mới. Vì vậy chỉ v là nguồn gốc của giá trị thặng dư. Ví dụ gốc: c = 60, v = 20, m = 20.",
    chapters: ["tu-ban"],
  },
  {
    id: "gia-tri-thang-du",
    q: "Giá trị thặng dư là gì và do đâu mà có?",
    keywords: ["giá trị thặng dư", "thặng dư", "chiếm không", "công nhân tạo ra"],
    a: "Là phần giá trị mới dôi ra ngoài giá trị sức lao động, do công nhân làm thuê tạo ra và bị nhà tư bản chiếm không. Nó xuất hiện trong quá trình sản xuất; việc trả tiền công đổi lấy sức lao động vẫn theo nguyên tắc ngang giá. Ví dụ gốc: công nhân tạo ra giá trị mới 40, nhận giá trị sức lao động 20, phần dôi ra m = 20.",
    chapters: ["tu-ban"],
  },
  {
    id: "thang-du-loi-nhuan",
    q: "Giá trị thặng dư khác lợi nhuận thế nào?",
    keywords: ["lợi nhuận", "khác lợi nhuận", "thặng dư và lợi nhuận", "chi phí"],
    a: "Giá trị thặng dư là nội dung, bản chất: phần giá trị mới dôi ra, chỉ do lao động của công nhân (bộ phận v) tạo ra. Lợi nhuận là hình thức biểu hiện của nó, được quan niệm như con đẻ của toàn bộ tư bản ứng trước (c + v). Hai đại lượng liên quan nhưng không đồng nhất; lợi nhuận che giấu nguồn gốc thật của giá trị thặng dư.",
    chapters: ["tu-ban"],
  },
  {
    id: "hang-hoa-suc-lao-dong",
    q: "Vì sao sức lao động là hàng hóa?",
    keywords: ["hàng hóa sức lao động", "bán sức", "tự do", "làm thuê"],
    a: "Sức lao động thành hàng hóa khi có hai điều kiện: người lao động tự do về thân thể, làm chủ sức lao động của mình; và họ không có đủ tư liệu sản xuất nên buộc phải bán sức lao động. Giá trị của nó do giá trị các tư liệu sinh hoạt cần thiết quyết định; tiền công là biểu hiện bằng tiền.",
    chapters: ["tu-ban"],
  },
  {
    id: "ngay-lao-dong",
    q: "Thời gian lao động tất yếu và thặng dư là gì?",
    keywords: ["tất yếu", "ngày lao động", "8 giờ", "4 giờ", "thời gian thặng dư"],
    a: "Ngày lao động gồm hai phần. Trong thời gian tất yếu, công nhân tạo ra giá trị ngang giá trị sức lao động của mình. Phần còn lại là thời gian thặng dư, tạo ra giá trị thặng dư. Ví dụ gốc: ca 8 giờ gồm 4 giờ tất yếu và 4 giờ thặng dư.",
    chapters: ["tu-ban"],
  },
  {
    id: "tuyet-doi-tuong-doi",
    q: "Giá trị thặng dư tuyệt đối và tương đối khác nhau thế nào?",
    keywords: ["tuyệt đối", "tương đối", "kéo dài", "rút ngắn", "tỷ suất"],
    a: "Tuyệt đối: kéo dài ngày lao động trong khi thời gian tất yếu không đổi, như 8 giờ lên 10 giờ thì m' từ 100% lên 150%. Tương đối: giữ nguyên ngày lao động nhưng rút ngắn thời gian tất yếu nhờ tăng năng suất lao động xã hội làm giá trị sức lao động giảm. Đây là con số minh họa trong mô hình, không phải số liệu thật.",
    chapters: ["tu-ban"],
  },
  {
    id: "tich-luy",
    q: "Tích lũy tư bản là gì?",
    keywords: ["tích lũy", "mở rộng sản xuất", "tái sản xuất"],
    a: "Là chuyển hóa một phần giá trị thặng dư trở lại thành tư bản: nhà tư bản mua thêm máy, thuê thêm công nhân để mở rộng sản xuất. Nguồn gốc duy nhất của tích lũy tư bản là giá trị thặng dư, và cạnh tranh thúc đẩy quá trình đó.",
    chapters: ["thi-truong", "tu-ban"],
  },
  {
    id: "chiec-ao-toan-canh",
    q: "Tóm lại, hành trình của bạn nói lên điều gì?",
    keywords: ["tóm lại", "hành trình", "ý nghĩa", "nhìn lại", "tổng kết", "chiếc áo thun"],
    a: "Nhìn bề ngoài tôi chỉ là một mảnh vải trắng, nhưng trong tôi có cây bông, bàn tay người lao động, máy móc, thời gian, giá cả và cả những quan hệ giữa con người với con người. Đi từ hàng hóa, giá trị, giá trị thặng dư đến thị trường là cách nhìn tôi theo một cách khác.",
    chapters: ["khoi-dau", "nhin-lai"],
  },
];

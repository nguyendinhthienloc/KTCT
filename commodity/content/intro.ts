import type { IntroContent } from "./schema";

export const intro: IntroContent = {
  headline: "MỌI SẢN PHẨM ĐỀU CÓ MỘT CÂU CHUYỆN.",
  intro: [
    "Bạn có bao giờ tự hỏi điều gì thực sự nằm phía sau một chiếc áo thun? Nhìn bề ngoài, đó chỉ là một mảnh vải trắng, giản dị. Nhưng trong đó có cây bông, bàn tay người lao động, máy móc, thời gian, giá cả và cả những quan hệ giữa con người với con người.",
    "Hành trình này đi theo một chiếc áo thun trắng, từ cánh đồng bông đến quầy hàng. Qua từng bước, bạn sẽ thấy **hàng hóa**, **giá trị**, **giá trị thặng dư** và **thị trường** hình thành như thế nào.",
  ],
  morphCaptions: [
    {
      phase: "cotton",
      title: "Bông — đối tượng lao động",
      body: "Mọi thứ bắt đầu từ bông — **đối tượng lao động** mà con người tác động vào. Bông đã trồng và thu hoạch là loại đã qua lao động, tức **nguyên liệu**.",
      conceptId: "san-xuat",
    },
    {
      phase: "thread",
      title: "Sợi — lao động cụ thể",
      body: "Bông được kéo thành sợi. Công việc kéo sợi có mục đích, công cụ và kỹ năng riêng: đó là **lao động cụ thể**.",
      conceptId: "lao-dong-cu-the",
    },
    {
      phase: "fabric",
      title: "Vải — tư liệu sản xuất",
      body: "Sợi được dệt thành vải. Vải là sản phẩm của công đoạn này, rồi trở thành **tư liệu sản xuất** của công đoạn kế tiếp.",
      conceptId: "tu-lieu-san-xuat",
    },
    {
      phase: "shirt",
      title: "Áo thun — hàng hóa",
      body: "Tấm vải được cắt và may thành áo. Khi được đem trao đổi, mua bán, chiếc áo trở thành **hàng hóa**.",
      conceptId: "hang-hoa",
    },
  ],
};

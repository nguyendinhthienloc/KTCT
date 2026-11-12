import { Fragment } from "react";

/**
 * Tách chuỗi (có **đậm**) thành từng từ <span data-w> để gsap hiện dần khi cuộn.
 * Văn bản đầy đủ nằm trong aria-label của thẻ cha; các span là aria-hidden.
 * Chữ luôn có trong HTML render từ server.
 */
export function Words({
  text,
  as: Tag = "span",
  className,
  dataAttr = "data-w",
}: {
  text: string;
  as?: "span" | "p" | "h3" | "h2";
  className?: string;
  dataAttr?: string;
}) {
  const plain = text.replace(/\*\*/g, "");
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  const attr = { [dataAttr]: "" };
  return (
    <Tag aria-label={plain} className={className}>
      {parts.map((p, i) => {
        const bold = p.startsWith("**") && p.endsWith("**");
        const words = (bold ? p.slice(2, -2) : p).split(/\s+/).filter(Boolean);
        return (
          <Fragment key={i}>
            {words.map((w, j) => (
              <Fragment key={j}>
                <span aria-hidden {...attr} className={`inline-block ${bold ? "font-600" : ""}`}>
                  {w}
                </span>{" "}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </Tag>
  );
}

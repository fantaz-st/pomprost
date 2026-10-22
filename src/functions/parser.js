import parse, { domToReact } from "html-react-parser";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";
import { contentHref } from "@/lib/urls";

const isInternal = (href) => href.startsWith("/") && !href.startsWith("//");
const isExternalPage = (href) => /^https?:\/\//i.test(href);

const options = {
  replace: (node) => {
    if (node.type !== "tag" || node.name !== "a") return;

    const href = contentHref(node.attribs?.href || "#");
    const children = domToReact(node.children, options);

    if (isInternal(href)) return <Link href={href}>{children}</Link>;

    // Only other websites open in a new tab; #anchors, mailto: and tel: stay in place.
    const newTab = isExternalPage(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <MUILink href={href} {...newTab}>
        {children}
      </MUILink>
    );
  },
};

export default function parseHtml(html = "") {
  return parse(html, options);
}

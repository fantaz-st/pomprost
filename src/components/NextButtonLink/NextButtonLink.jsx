"use client";

import Link from "next/link";
import { Button } from "@mui/material";

export default function NextLinkButton({ href, children, ...props }) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}

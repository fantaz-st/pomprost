"use client";

import { useEffect, useState } from "react";
import site from "@/settings/site";
import classes from "./BackToTop.module.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);
    const threshold = site.backToTop.showAfter || 300;

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      className={`${classes.button} ${visible ? classes.visible : ""} ${
        site.backToTop.position === "left" ? classes.left : classes.right
      }`}
      aria-label="Back to top"
    >
      <KeyboardArrowUpIcon />
    </button>
  );
}

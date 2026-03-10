"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import dayjs from "dayjs";
import classes from "./PostCard.module.css";

export default function PostCard({ slug, title, date, excerpt, locale = "hr", featured = false }) {
  const base = locale === "hr" ? "/hr/novosti" : "/en/news";

  const cleanExcerpt =
    excerpt
      ?.replace(/<[^>]+>/g, "")
      ?.replace(/&hellip;/g, "...")
      ?.trim() || "";

  return (
    <Link href={`${base}/${slug}`} className={`${classes.card} ${featured ? classes.featured : classes.compact}`}>
      <div className={classes.bg}>
        <div className={classes.grid} />
        <div className={classes.dots} />
        <div className={classes.waveOne} />
        <div className={classes.waveTwo} />
        <div className={classes.waveThree} />
        <div className={classes.glow} />
      </div>

      <Box className={classes.content}>
        <div className={classes.topRow}>
          <div className={classes.iconWrap}>
            <NotificationsNoneRoundedIcon className={classes.icon} />
          </div>

          <div className={classes.textWrap}>
            <Typography variant="overline" color="text.secondary" className={classes.date}>
              {date ? dayjs(date).format(locale === "hr" ? "D.M.YYYY." : "D MMM YYYY") : ""}
            </Typography>

            <Typography variant={featured ? "h2" : "h3"} className={classes.title}>
              {title}
            </Typography>

            {cleanExcerpt && (
              <Typography variant="body1" color="text.secondary" className={classes.excerpt}>
                {cleanExcerpt}
              </Typography>
            )}

            <Typography component="span" className={classes.readMore}>
              {locale === "hr" ? "Pročitaj vijest" : "Read more"}
              <span className={classes.arrow}>→</span>
            </Typography>
          </div>
        </div>
      </Box>

      {/* <div className={classes.bottomFade} /> */}
    </Link>
  );
}

import Link from "next/link";
import { Typography } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { fmtDateShort } from "@/functions/date";
import { stripHtml } from "@/lib/content";
import { newsHref } from "@/lib/urls";
import { getDictionary } from "@/i18n";
import classes from "./PostCard.module.css";

export default function PostCard({ slug, title, date, excerpt, locale = "hr" }) {
  const cleanExcerpt = stripHtml(excerpt);

  return (
    <Link href={newsHref(locale, slug)} className={classes.card}>
      <div className={classes.bg}>
        <div className={classes.grid} />
        <div className={classes.dots} />
        <div className={classes.waveOne} />
        <div className={classes.waveTwo} />
        <div className={classes.waveThree} />
        <div className={classes.glow} />
      </div>

      <div className={classes.content}>
        <div className={classes.topRow}>
          <div className={classes.iconWrap}>
            <NotificationsNoneRoundedIcon className={classes.icon} />
          </div>

          <div className={classes.textWrap}>
            <Typography variant="overline" color="text.secondary" className={classes.date}>
              {date ? fmtDateShort(date, locale) : ""}
            </Typography>

            <Typography variant="h4" className={classes.title}>
              {title}
            </Typography>

            {cleanExcerpt ? (
              <Typography variant="body1" color="text.secondary" className={classes.excerpt}>
                {cleanExcerpt}
              </Typography>
            ) : null}

            <Typography component="span" className={classes.readMore}>
              {getDictionary(locale).news.readMore}
              <span className={classes.arrow}>→</span>
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}

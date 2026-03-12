"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button, Typography } from "@mui/material";
import classes from "./CookieNotice.module.css";

const STORAGE_KEY = "cookie_notice_seen";

const copy = {
  hr: {
    text: "Ova web stranica koristi funkcionalni kolačić za pamćenje odabranog jezika.",
    link: "Saznaj više",
    href: "/hr/privacy",
    button: "U redu",
  },
  en: {
    text: "This website uses a functional cookie to remember your selected language.",
    link: "Learn more",
    href: "/en/privacy",
    button: "OK",
  },
};

function subscribe(callback) {
  window.addEventListener("cookie-notice-change", callback);
  return () => window.removeEventListener("cookie-notice-change", callback);
}

function getServerSnapshot() {
  return false;
}

function getClientSnapshot() {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

export default function CookieNotice({ locale = "hr" }) {
  const visible = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const t = copy[locale] || copy.hr;

  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      window.dispatchEvent(new Event("cookie-notice-change"));
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className={classes.wrap}>
      <div className={classes.box}>
        <div className={classes.text}>
          <Typography variant="body2" color="text.secondary">
            {t.text}{" "}
            <Link href={t.href} className={classes.link}>
              {t.link}
            </Link>
          </Typography>
        </div>

        <Button variant="contained" onClick={handleClose} className={classes.button}>
          {t.button}
        </Button>
      </div>
    </div>
  );
}

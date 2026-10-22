"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/settings/i18n";
import { setLocalePref } from "@/functions/setLocalePref";
import { translatePathname } from "@/functions/translatePathname";
import { useAlternates } from "./Alternates";

export default function LanguageSwitch({ locale, size = "small", fullWidth = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const alternates = useAlternates();

  const currentValue = locale || i18n.defaultLocale;

  const handleChange = (e) => {
    const nextLocale = String(e.target.value || "");
    if (!nextLocale || nextLocale === currentValue) return;

    setLocalePref(nextLocale);

    // WP pages/posts publish their translations; an untranslated one falls back to that locale's home.
    if (alternates && nextLocale in alternates) {
      router.push(alternates[nextLocale] || `/${nextLocale}`);
      return;
    }

    router.push(translatePathname(pathname, nextLocale));
  };

  return (
    <FormControl size={size} fullWidth={fullWidth}>
      <Select
        value={currentValue}
        onChange={handleChange}
        variant="outlined"
        MenuProps={{ disableScrollLock: true }}
        sx={{ height: size === "small" ? 34 : 40, borderRadius: "999px", minWidth: 86 }}
      >
        <MenuItem value="hr">HR</MenuItem>
        <MenuItem value="en">EN</MenuItem>
      </Select>
    </FormControl>
  );
}

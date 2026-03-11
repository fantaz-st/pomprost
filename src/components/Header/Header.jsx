"use client";

import site from "@/settings/site";
import classes from "./Header.module.css";
import { Typography, IconButton, Drawer } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useMemo, useState } from "react";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

const Header = ({ menuItems = [], locale }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [scrolled, setScrolled] = useState(false);

  const menuTree = useMemo(() => menuItems, [menuItems]);

  const openDrawer = () => setOpen(true);

  const closeDrawer = () => {
    setOpen(false);
    setExpanded({});
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const headerCfg = site.header || {};
  const isSticky = headerCfg.sticky !== false;
  const isTransparentEnabled = !!headerCfg.transparent;
  const solidOnScroll = headerCfg.solidOnScroll !== false;
  const solidOffset = typeof headerCfg.solidOnScrollOffset === "number" ? headerCfg.solidOnScrollOffset : 12;
  const textColorInvert = !!headerCfg.textColorInvert;

  useEffect(() => {
    if (!isTransparentEnabled || !solidOnScroll) return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > solidOffset);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparentEnabled, solidOnScroll, solidOffset]);

  const isTransparentNow = isTransparentEnabled && !scrolled;
  const shouldInvertTransparentText = isTransparentNow && textColorInvert;

  const headerClassName = [
    classes.container,
    isSticky ? classes.fixed : classes.notSticky,
    isTransparentEnabled ? (scrolled ? classes.solid : classes.transparent) : classes.solid,
    shouldInvertTransparentText ? classes.invertText : "",
  ].join(" ");

  const style = {
    ["--header-h"]: `${headerCfg.height || 72}px`,
  };

  return (
    <header className={headerClassName} style={style}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <Link href="/" className={classes.logoLink} onClick={closeDrawer}>
            {site.logo ? (
              <Image src={site.logo} fill alt={site.name} className={classes.logoImage} />
            ) : (
              <Typography variant="h3" component="span" className={classes.logoText}>
                {site.name}
              </Typography>
            )}
          </Link>
        </div>

        <nav className={classes.menuDesktop}>
          {menuTree.map((item) => {
            const children = item.childNodes || item.children || [];
            const hasChildren = children.length > 0;

            return (
              <div key={item.databaseId} className={classes.menuItem}>
                <Link href={item.uri} className={classes.link}>
                  {item.label}
                  {hasChildren && <KeyboardArrowDownIcon className={classes.arrow} />}
                </Link>

                {hasChildren && (
                  <div className={classes.dropdown}>
                    {children.map((child) => (
                      <Link key={child.databaseId} href={child.uri} className={classes.dropdownLink}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* <LanguageSwitch locale={locale} /> */}

        <div className={classes.menuMobile}>
          <IconButton aria-label="Open menu" onClick={openDrawer} className={classes.iconBtn}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <div className={classes.drawer}>
          <div className={classes.drawerTop}>
            <Typography variant="h6">{site.name}</Typography>
            <IconButton aria-label="Close menu" onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className={classes.drawerNav}>
            {menuTree.map((item) => {
              const children = item.childNodes || item.children || [];
              const hasChildren = children.length > 0;
              const isOpen = !!expanded[item.databaseId];

              return (
                <div key={item.databaseId} className={classes.drawerItem}>
                  <div className={classes.drawerRow}>
                    <Link href={item.uri} className={classes.drawerLink} onClick={closeDrawer}>
                      {item.label}
                    </Link>

                    {hasChildren && (
                      <button
                        type="button"
                        className={`${classes.expandBtn} ${isOpen ? classes.expandBtnOpen : ""}`}
                        onClick={() => toggleExpand(item.databaseId)}
                        aria-label="Toggle submenu"
                      >
                        <KeyboardArrowDownIcon />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div className={`${classes.drawerSub} ${isOpen ? classes.drawerSubOpen : ""}`}>
                      {children.map((child) => (
                        <Link key={child.databaseId} href={child.uri} className={classes.drawerSubLink} onClick={closeDrawer}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;

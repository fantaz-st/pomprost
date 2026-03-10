import classes from "./Spacer.module.css";

const resolveSize = (size) => {
  if (!size) return "var(--space-md)";

  if (typeof size === "string") {
    return `var(--space-${size})`;
  }

  return null;
};

export default function Spacer({ size = "md", horizontal = false }) {
  const isResponsive = typeof size === "object";

  const style = {};

  if (!isResponsive) {
    const value = resolveSize(size);
    if (horizontal) style.width = value;
    else style.height = value;
  }

  return (
    <div
      className={`${classes.spacer} ${horizontal ? classes.horizontal : classes.vertical}`}
      style={style}
      data-mobile={isResponsive ? size.mobile : undefined}
      data-desktop={isResponsive ? size.desktop : undefined}
    />
  );
}

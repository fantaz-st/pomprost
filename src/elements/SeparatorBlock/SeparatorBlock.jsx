import classes from "./SeparatorBlock.module.css";

const spacingMap = {
  20: "0.5rem",
  30: "1rem",
  40: "1.5rem",
  50: "2rem",
  60: "3rem",
  70: "4rem",
  80: "6rem",
};

function parseSpacing(value) {
  if (!value) return undefined;

  if (value.startsWith("var:preset|spacing|")) {
    const key = value.split("|")[2];
    return spacingMap[key] || undefined;
  }

  return value;
}

const SeparatorBlock = ({ attributes = {} }) => {
  const marginTop = parseSpacing(attributes?.style?.spacing?.margin?.top);
  const marginBottom = parseSpacing(attributes?.style?.spacing?.margin?.bottom);

  return (
    <div
      className={classes.container}
      style={{
        marginTop,
        marginBottom,
      }}
    >
      <hr className={classes.line} />
    </div>
  );
};

export default SeparatorBlock;

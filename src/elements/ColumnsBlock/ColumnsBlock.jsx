import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";
import { Box } from "@mui/material";

const GAP = 3; // theme spacing units (24px)

// Mirrors WP's columns layout: a column with a width gets it as flex-basis (shrinking to make room
// for the gap), columns without one share the remaining space equally.
const ColumnsBlock = ({ innerBlocks = [], attributes = {}, locale }) => {
  const stackOnMobile = attributes.isStackedOnMobile !== false;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: { xs: stackOnMobile ? "wrap" : "nowrap", md: "nowrap" },
        gap: GAP,
        my: 2,
        alignItems: attributes.verticalAlignment === "center" ? "center" : attributes.verticalAlignment === "bottom" ? "flex-end" : "stretch",
      }}
    >
      {innerBlocks.map((column, i) => {
        const width = column?.attributes?.width;
        const desktopFlex = width ? `0 1 ${width}` : "1 1 0";

        return (
          <Box key={column?.clientId || i} sx={{ minWidth: 0, flex: { xs: stackOnMobile ? "1 1 100%" : desktopFlex, md: desktopFlex } }}>
            {(column?.innerBlocks || []).map((innerBlock, j) => (
              <BlockRenderer block={innerBlock} locale={locale} key={innerBlock?.clientId || j} />
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default ColumnsBlock;

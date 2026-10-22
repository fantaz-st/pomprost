import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";

export default function DetailsBlock({ summary = "", open = false, innerBlocks = [], locale }) {
  return (
    <Accordion defaultExpanded={!!open} disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="h4" variant="h4">
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {(innerBlocks || []).map((inner, i) => (
          <BlockRenderer key={inner?.clientId || i} block={inner} locale={locale} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

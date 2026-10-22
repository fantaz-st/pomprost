import parseHtml from "@/functions/parser";
import { Typography, Box, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { getDictionary } from "@/i18n";
import { PdfIcon, WordIcon, PowerpointIcon } from "./FileIcons";
import classes from "./FileBlock.module.css";

const ICONS = {
  pdf: PdfIcon,
  doc: WordIcon,
  docx: WordIcon,
  odt: WordIcon,
  rtf: WordIcon,
  word: WordIcon,
  ppt: PowerpointIcon,
  pptx: PowerpointIcon,
  odp: PowerpointIcon,
};

const GenericIcon = () => <InsertDriveFileOutlinedIcon sx={{ fontSize: 30 }} />;

const extensionOf = (attributes, url) =>
  String(attributes.extension || url.split(/[?#]/)[0].split(".").pop() || "")
    .toLowerCase()
    .trim();

export default function FileBlock({ attributes = {}, locale }) {
  if (attributes.html && !attributes.href) return <>{parseHtml(attributes.html)}</>;

  const t = getDictionary(locale).file;
  const url = attributes.href || "";
  const extension = extensionOf(attributes, url);
  const Icon = ICONS[extension] || GenericIcon;
  const name = attributes.fileLabel || attributes.fileName || url.split("/").pop();
  const label = attributes.filesizeHuman ? `${name} [${attributes.filesizeHuman}]` : name;

  return (
    <Box className={classes.container}>
      <Box className={classes.fileTypeIcon}>
        <Icon />
      </Box>
      <Box className={classes.content}>
        <Typography variant="body2">{label}</Typography>
        <Box className={classes.icons}>
          {extension === "pdf" && (
            <Tooltip title={t.open} arrow>
              <a href={url} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer" aria-label={`${t.open}: ${name}`}>
                <VisibilityIcon className={classes.eye} />
              </a>
            </Tooltip>
          )}
          <Tooltip title={t.download} arrow>
            <a download href={url} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer" aria-label={`${t.download}: ${name}`}>
              <DownloadIcon className={classes.arrow} />
            </a>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

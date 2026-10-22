import { Container, Stack, Typography } from "@mui/material";

// Shared body for the 404 and error boundaries.
export default function StatusMessage({ code, title, text, children }) {
  return (
    <Container sx={{ pt: "calc(var(--header-h, 72px) + 72px)", pb: { xs: 8, md: 12 } }}>
      {code ? (
        <Typography variant="overline" color="secondary">
          {code}
        </Typography>
      ) : null}
      <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mb: 4 }}>
        {text}
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="flex-start">
        {children}
      </Stack>
    </Container>
  );
}

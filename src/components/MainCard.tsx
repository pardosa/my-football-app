import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

// project import
//import Highlighter from "./third-party/Highlighter";

// header style
const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //
type TMainCard = {
  border: Boolean;
  boxShadow: Boolean;
  contentSX: Object;
  darkTitle: Boolean;
  divider: Boolean;
  elevation: number;
  secondary: React.ReactNode;
  shadow: string;
  sx: Object;
  title: string;
  codeHighlight: Boolean;
  content: Boolean;
  children: React.ReactNode;
};

const MainCard = forwardRef<HTMLDivElement, TMainCard>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight,
      ...others
    }: TMainCard,
    ref
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          ...sx,
          border: border ? "1px solid" : "none",
          borderRadius: 2,
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.divider
              : theme.palette.grey.A700,
          boxShadow:
            boxShadow && (!border || theme.palette.mode === "dark")
              ? shadow
              : "inherit",
          ":hover": {
            boxShadow: boxShadow ? shadow : "inherit",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: "subtitle1" }}
            title={title}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {/* {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: "dashed" }} />
            <Highlighter>{children}</Highlighter>
          </>
        )} */}
      </Card>
    );
  }
);

export default MainCard;

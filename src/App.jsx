import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import CloudIcon from "@mui/icons-material/Cloud";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM Plex Sans Arabic"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">

        {/* Main Container */}
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          {/* Weather Card */}
          <Card
            sx={{
              width: "100%",
              background: "rgba(28, 52, 91, 0.36)",
              color: "#fff",
              borderRadius: "15px",
              boxShadow: "0px 11px 20px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>

              {/* City & Date */}
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                dir="rtl"
              >
                <Typography variant="h3">
                  الرياض
                </Typography>

                <Typography variant="h5">
                  الاثنين 20/9/2026
                </Typography>
              </Stack>

              {/* Divider */}
              <Divider
                sx={{
                  my: 2,
                  borderColor: "rgba(255,255,255,0.5)",
                }}
              />

              {/* Temperature & Weather */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  direction: "rtl",
                }}
              >

                {/* Temperature */}
                <Box>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "90px",
                      fontWeight: "300",
                      lineHeight: 1,
                    }}
                  >
                    38°
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 1,
                    }}
                  >
                    غائم جزئيًا
                  </Typography>

                  {/* Min & Max */}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Typography>
                      الصغرى: 34°
                    </Typography>

                    <Typography>
                      العظمى: 35°
                    </Typography>
                  </Stack>

                </Box>

                {/* Weather Icon */}
                <CloudIcon
                  sx={{
                    fontSize: "180px",
                    color: "#fff",
                  }}
                />

              </Box>

            </CardContent>
          </Card>

          {/* Language Button */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="text"
              sx={{
                color: "#fff",
                padding: 0,
                minWidth: "auto",
                mt: 1,
              }}
            >
              English
            </Button>
          </Box>

        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
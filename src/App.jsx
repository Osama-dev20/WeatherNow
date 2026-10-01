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
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";
import { useEffect, useState } from "react";


// ==============================
// MUI Theme
// ==============================

const theme = createTheme({
  typography: {
    fontFamily: ["IBM Plex Sans Arabic"],
  },
});


// ==============================
// API Key
// ==============================

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


// ==============================
// App
// ==============================

function App() {

  // ==============================
  // Language
  // ==============================

  const [language, setLanguage] = useState("ar");


  // ==============================
  // City
  // ==============================

  // المدينة المستخدمة في API
  const [city, setCity] = useState("Gaza");

  // القيمة الموجودة داخل Input
  const [searchCity, setSearchCity] = useState("Gaza");


  // ==============================
  // Weather
  // ==============================

  const [weather, setWeather] = useState({
    city: "",
    temp: null,
    description: "",
    min: null,
    max: null,
    icon: "",
  });


  // ==============================
  // Loading
  // ==============================

  const [loading, setLoading] = useState(false);


  // ==============================
  // Error
  // ==============================

  const [error, setError] = useState("");


  // ==============================
  // Direction
  // ==============================

  const direction = language === "ar" ? "rtl" : "ltr";


  // ==============================
  // Translations
  // ==============================

  const translations = {
    ar: {
      searchPlaceholder: "أدخل اسم المدينة",
      min: "الصغرى",
      max: "العظمى",
      languageButton: "English",
      emptyCity: "اكتب اسم المدينة أولًا.",
      cityNotFound: "لم يتم العثور على المدينة.",
      invalidApiKey: "مفتاح OpenWeather غير صالح.",
      generalError: "حدث خطأ أثناء جلب بيانات الطقس.",
    },

    en: {
      searchPlaceholder: "Enter city name",
      min: "Min",
      max: "Max",
      languageButton: "العربية",
      emptyCity: "Enter a city name first.",
      cityNotFound: "City not found.",
      invalidApiKey: "Invalid OpenWeather API key.",
      generalError: "An error occurred while fetching weather data.",
    },
  };

  const t = translations[language];


  // ==============================
  // Get Weather
  // ==============================

  useEffect(() => {

    const controller = new AbortController();


    const getWeather = async () => {

      setLoading(true);
      setError("");


      try {

        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              appid: API_KEY,

              // Celsius
              units: "metric",

              // Language from state
              lang: language,
            },

            // Cleanup
            signal: controller.signal,
          }
        );


        const data = response.data;


        console.log(data);


        setWeather({
          city: data.name,
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          min: Math.round(data.main.temp_min),
          max: Math.round(data.main.temp_max),
          icon: data.weather[0].icon,
        });


      } catch (error) {

        // Request cancelled
        if (error.code === "ERR_CANCELED") {
          return;
        }


        console.error(error);


        if (error.response?.status === 404) {

          setError(t.cityNotFound);

        } else if (error.response?.status === 401) {

          setError(t.invalidApiKey);

        } else {

          setError(t.generalError);

        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }

    };


    getWeather();


    // Cleanup
    return () => {
      controller.abort();
    };

  }, [city, language]);


  // ==============================
  // Search
  // ==============================

  const handleSearch = () => {

    const trimmedCity = searchCity.trim();


    if (!trimmedCity) {

      setError(t.emptyCity);

      return;
    }


    setCity(trimmedCity);

  };


  // ==============================
  // Enter Key
  // ==============================

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleSearch();
    }

  };


  // ==============================
  // Change Language
  // ==============================

  const handleLanguageChange = () => {

    setLanguage((currentLanguage) => {

      return currentLanguage === "ar" ? "en" : "ar";

    });

  };


  // ==============================
  // Date
  // ==============================

  const formattedDate = new Date().toLocaleDateString(
    language === "ar" ? "ar-EG" : "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
  );


  // ==============================
  // UI
  // ==============================

  return (

    <ThemeProvider theme={theme}>

      <Container maxWidth="sm">

        <Box
          dir={direction}
          sx={{
            minHeight: "100vh",

            display: "flex",
            flexDirection: "column",

            justifyContent: "center",
            alignItems: "center",
          }}
        >


          {/* ==============================
              Search
          ============================== */}

          <Box
            sx={{
              width: "100%",

              display: "flex",
              gap: 1,

              mb: 2,

              direction: direction,
            }}
          >

            <TextField
              fullWidth

              value={searchCity}

              onChange={(event) => {
                setSearchCity(event.target.value);
              }}

              onKeyDown={handleKeyDown}

              placeholder={t.searchPlaceholder}

              variant="outlined"

              sx={{
                backgroundColor: "#fff",

                borderRadius: "10px",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />


            <Button
              variant="contained"

              onClick={handleSearch}

              disabled={loading}

              sx={{
                minWidth: "55px",
                borderRadius: "10px",
              }}
            >

              <SearchIcon />

            </Button>

          </Box>


          {/* ==============================
              Error
          ============================== */}

          {error && (

            <Alert
              severity="error"

              sx={{
                width: "100%",
                mb: 2,
              }}
            >

              {error}

            </Alert>

          )}


          {/* ==============================
              Weather Card
          ============================== */}

          <Card
            sx={{
              width: "100%",

              background:
                "rgba(28, 52, 91, 0.36)",

              color: "#fff",

              borderRadius: "15px",

              boxShadow:
                "0px 11px 20px rgba(0,0,0,0.05)",
            }}
          >

            <CardContent>


              {/* ==============================
                  Loading
              ============================== */}

              {loading ? (

                <Box
                  sx={{
                    height: "350px",

                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >

                  <CircularProgress
                    sx={{
                      color: "#fff",
                    }}
                  />

                </Box>

              ) : (

                <>


                  {/* ==============================
                      City & Date
                  ============================== */}

                  <Stack
                    direction="row"

                    justifyContent="center"
                    alignItems="center"

                    spacing={2}

                    sx={{
                      direction: direction,
                    }}
                  >

                    <Typography variant="h3">

                      {weather.city}

                    </Typography>


                    <Typography variant="h5">

                      {formattedDate}

                    </Typography>

                  </Stack>


                  {/* Divider */}

                  <Divider
                    sx={{
                      my: 2,

                      borderColor:
                        "rgba(255,255,255,0.5)",
                    }}
                  />


                  {/* ==============================
                      Temperature & Icon
                  ============================== */}

                  <Box
                    sx={{
                      display: "flex",

                      justifyContent:
                        "space-between",

                      alignItems: "center",

                      direction: direction,
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

                        {weather.temp}°

                      </Typography>


                      {/* Description */}

                      <Typography
                        variant="h6"

                        sx={{
                          mt: 1,
                        }}
                      >

                        {weather.description}

                      </Typography>


                      {/* Min / Max */}

                      <Stack
                        direction="row"

                        spacing={2}

                        sx={{
                          mt: 2,

                          direction: direction,
                        }}
                      >

                        <Typography>

                          {t.min}: {weather.min}°

                        </Typography>


                        <Typography>

                          {t.max}: {weather.max}°

                        </Typography>

                      </Stack>

                    </Box>


                    {/* ==============================
                        Weather Icon
                    ============================== */}

                    {weather.icon && (

                      <Box
                        component="img"

                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}

                        alt={weather.description}

                        sx={{
                          width: "180px",
                          height: "180px",
                        }}
                      />

                    )}

                  </Box>

                </>

              )}

            </CardContent>

          </Card>


          {/* ==============================
              Language Button
          ============================== */}

          <Box
            sx={{
              width: "100%",

              display: "flex",

              justifyContent:
                language === "ar"
                  ? "flex-start"
                  : "flex-end",
            }}
          >

            <Button
              variant="text"

              onClick={handleLanguageChange}

              sx={{
                color: "#fff",

                padding: 0,

                minWidth: "auto",

                mt: 1,
              }}
            >

              {t.languageButton}

            </Button>

          </Box>

        </Box>

      </Container>

    </ThemeProvider>

  );
}


export default App;
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import LottieView from "lottie-react-native";
import dayjs from "dayjs";

import ThemeView from "@/components/ThemeView";
import ThemeText from "@/components/ThemeText";
import ForeCastItem from "@/components/ForecastItem";
import ThemeButton from "@/components/ThemeButton";
import LocationTextInput from "@/components/LocationTextInput";

import { LocationContext } from "@/context/LocationContext";

import rain from "@/assets/lottie/rainy.json";
import day from "@/assets/lottie/day.json";
import cloud from "@/assets/lottie/cloud.json";
import night from "@/assets/lottie/night.json";

import { Coordinates, WeatherResponse } from "@/types/WeatherResponse";
import { WeatherForecastResponse } from "@/types/WeatherForecast";

const apiKey = process.env.WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5";

export default function HomeScreen() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [locationBySearch, setLocationBySearch] = useState<Coordinates | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [temperatureData, setTemperatureData] = useState<any>([]);

  const { errorMsg, location } = useContext(LocationContext);

  const fetchWeatherData = async (coords: Coordinates) => {
    try {
      setIsLoading(true);
      const weatherUrl = `${baseUrl}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
      const forecastUrl = `${baseUrl}/forecast?lat=${coords.lat}&lon=${coords.lon}&cnt=7&appid=${apiKey}`;

      // Fetch weather data
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
      const weatherJson: WeatherResponse = await weatherResponse.json();
      setWeatherData(weatherJson);

      // Fetch forecast data
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok)
        throw new Error("Failed to fetch forecast data");
      const forecastJson: WeatherForecastResponse =
        await forecastResponse.json();

      const forecastData = forecastJson.list.map((item) => ({
        min: `${(item.main.temp_min - 273.15).toFixed(1)} °C`,
        max: `${(item.main.temp_max - 273.15).toFixed(1)} °C`,
        feelsLike: `${(item.main.feels_like - 273.15).toFixed(1)} °C`,
        date: dayjs(item.dt_txt).format("ddd, MMM D"),
      }));
      setTemperatureData(forecastData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location) {
      const coords: Coordinates = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
      fetchWeatherData(coords);
    }
  }, [location]);

  const handleSearchLocation = () => {
    if (locationBySearch) {
      fetchWeatherData(locationBySearch);
    }
  };

  const getLottieSource = (weatherMain: string) => {
    if (weatherMain === "Rain") return rain;
    if (weatherMain === "Clouds") return cloud;
    if (weatherMain === "Clear") return day;
    return night;
  };

  return (
    <ThemeView
      isLoading={isLoading}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: windowHeight,
      }}
    >
      <View
        style={[
          styles.inputContainer,
          {
            width: windowWidth,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <LocationTextInput onLocationSet={setLocationBySearch} />
        <ThemeButton title="Search" onPress={handleSearchLocation} />
      </View>

      <View style={[{ height: windowHeight * 0.8 }]}>
        {errorMsg ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ThemeText>{errorMsg}</ThemeText>
          </View>
        ) : error ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ThemeText>{error}</ThemeText>
          </View>
        ) : weatherData ? (
          <>
            <View style={styles.locationContainer}>
              <LottieView
                autoPlay
                loop
                style={{
                  width: 200,
                  height: 200,
                }}
                source={getLottieSource(weatherData.weather[0].main)}
              />
              <ThemeText style={styles.location}>{weatherData.name}</ThemeText>
              <ThemeText style={styles.temp}>
                {weatherData.main.temp} °C
              </ThemeText>
            </View>
            <FlatList
              horizontal
              data={temperatureData}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ForeCastItem data={item} />}
              style={{
                flexGrow: 0,
              }}
            />
          </>
        ) : null}
      </View>
    </ThemeView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
  },

  inputContainer: {
    marginTop: 40,
    borderColor: "ghostwhite",
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 2,
    marginBottom: 10,
    backgroundColor: "transparent",
  },

  location: {
    fontFamily: "SpaceMono",
    fontSize: 24,
  },

  locationContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  temp: {
    fontWeight: "bold",
    fontSize: 70,
    color: "#fff",
  },
});

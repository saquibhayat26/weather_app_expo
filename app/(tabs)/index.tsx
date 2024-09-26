import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import dayjs from "dayjs";

import ThemeView from "@/components/ThemeView";
import ThemeText from "@/components/ThemeText";
import ForeCastItem from "@/components/ForecastItem";
import ThemeButton from "@/components/ThemeButton";
import LocationTextInput from "@/components/LocationTextInput";

import { LocationContext } from "@/context/LocationContext";
import { useLocationPermission } from "@/hooks/useLocationPermission";

import rain from "@/assets/lottie/rainy.json";
import day from "@/assets/lottie/day.json";
import cloud from "@/assets/lottie/cloud.json";
import night from "@/assets/lottie/night.json";
// import cloudyDay from "@/assets/lottie/cloudy_day.json";
// import cloudyNight from "@/assets/lottie/cloudy_night.json";

import { Coordinates, WeatherResponse } from "@/types/WeatherTypes";
import { WeatherForecastResponse } from "@/types/WeatherForecast";

const apiKey = process.env.WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5";

export default function HomeScreen() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationBySearch, setLocationBySearch] = useState<Coordinates | null>(
    null
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [temperatureData, setTemperatureData] = useState<any>([]);

  // const getLocation = useContext(LocationContext);
  const { requestLocationPermission } = useLocationPermission();

  const fetchForecastByLocation = async (coords: Coordinates) => {
    try {
      setIsLoading(true);
      const url = `${baseUrl}/forecast?lat=${coords.lat}&lon=${coords.lon}&cnt=7&appid=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        setErrorMsg("Failed to fetch weather data");
        return;
      }

      const json: WeatherForecastResponse = await response.json();

      const temperatureData = json.list.map((item) => ({
        min: `${(item.main.temp_min - 273.15).toFixed(1)} °C`, // Convert Kelvin to Celsius
        max: `${(item.main.temp_max - 273.15).toFixed(1)} °C`, // Convert Kelvin to Celsius
        feelsLike: `${(item.main.feels_like - 273.15).toFixed(1)} °C`, // Convert Kelvin to Celsius
        date: dayjs(item.dt_txt).format("ddd, MMM D"), // Format date with day
      }));
      setTemperatureData(temperatureData);
    } catch (error) {
      setErrorMsg("Error fetching weather data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByLocation = async (coords: Coordinates) => {
    try {
      setIsLoading(true);
      const url = `${baseUrl}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        setErrorMsg("Failed to fetch weather data");
        return;
      }

      const json: WeatherResponse = await response.json();

      if (json.cod === 200) {
        setWeatherData(json);
      } else {
        setErrorMsg("Error in weather data response");
      }
    } catch (error) {
      setErrorMsg("Error fetching weather data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherByLocation(location);
      fetchForecastByLocation(location);
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      const granted = await requestLocationPermission();
      if (!granted) {
        setErrorMsg("Permission to access location was denied" as any);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords: Coordinates = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

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
        <ThemeButton
          title="Search"
          onPress={() => {
            if (locationBySearch) {
              fetchWeatherByLocation(locationBySearch);
              fetchForecastByLocation(locationBySearch);
            }
          }}
        />
      </View>

      <View style={[{ height: windowHeight * 0.8 }]}>
        {errorMsg ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ThemeText>{errorMsg}</ThemeText>
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
                source={
                  weatherData.weather[0].main === "Rain"
                    ? rain
                    : weatherData.weather[0].main === "Clouds"
                    ? cloud
                    : weatherData.weather[0].main === "Clear"
                    ? day
                    : night
                }
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

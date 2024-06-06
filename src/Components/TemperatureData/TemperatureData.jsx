import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TemperatureData({ setShowTemp }) {
  const apiKey = "024a18127d194ec5af562017240106";
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setCity(response.data.city);
        console.log(response.data.city);
      } catch (error) {
        console.log("Error in fetching city name", error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        function convertToPlainText(input) {
          return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        const plainText = convertToPlainText(city);
        console.log(plainText)
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${plainText}&aqi=yes`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          console.log(result);

          toast.success(
            `Temperature: ${result.current.temp_c}°C, City: ${result.location.name}`,
            {
              onClose: () => setShowTemp(false),
            }
          );
        } catch (error) {
          console.log("No temp. Data available")
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchData();
  }, [city, setShowTemp]);
  return (
    <div className="parent_box">
      <ToastContainer position="top-left" />
    </div>
  );
}

export default TemperatureData;

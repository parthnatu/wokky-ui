import React, { useEffect, useState } from "react";
import WokkyService from "./services/wokky.service";
import "./App.css";
import WokkyDTO from "./models/wokky";
import { Box, CircularProgress, Text, Divider, Center } from "@chakra-ui/react";

export function Location({ city, country }: any) {
  return (
    <Box w="100%" color="grey" className="location-box">
      <Text fontSize="15px">
        {city}, {country}
      </Text>
    </Box>
  );
}

export function WokkyView({ data }: any) {
  console.log(data);
  if (data && data.is_wokky) {
    return (
      <Box p={3} borderWidth="1px" borderRadius="lg" bg="green.300">
        <Center>Go for a wokk!</Center>
      </Box>
    );
  } else if (data && !data.is_wokky) {
    return (
      <div>
        <Box p={3} borderWidth="1px" borderRadius="lg" bg="tomato">
          <Center>You can't go for a wokk yet!</Center>
        </Box>
        <br></br>
        {data?.reasons?.map((reason: any) => {
          return (
            <Text fontSize="12px" key={reason}>
              {reason}
            </Text>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}

function App() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [wokkyData, setWokkyData] = useState({} as WokkyDTO);
  const [apiLoaded, setAPILoaded] = useState(false);
  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }); // store data in usestate
        WokkyService.isWokky(pos.coords.latitude, pos.coords.longitude).then(
          (response: any) => {
            console.log(response.data as WokkyDTO);
            setWokkyData(response.data);
            setAPILoaded(true);
          }
        );
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      options
    );
  }, []);
  if (apiLoaded && location.latitude !== 0 && location.longitude !== 0) {
    return (
      <Box
        maxW="550px"
        p={10}
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        className="main-container"
      >
        <Text fontSize="20px">wokky</Text>
        <Divider bg="black" />
        <Location
          city={wokkyData.location.city}
          country={wokkyData.location.country}
        ></Location>
        <br></br>
        <WokkyView data={wokkyData}></WokkyView>
      </Box>
    );
  } else {
    return (
      <div className="main-container">
        <CircularProgress isIndeterminate color="black" />
      </div>
    );
  }
}

export default App;

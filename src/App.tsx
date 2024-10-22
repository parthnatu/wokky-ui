import React, { useEffect, useState } from "react";
import WokkyService from "./services/wokky.service";
import "./App.css";
import WokkyDTO from "./models/wokky";
import {
  IoArrowDownCircle,
  IoArrowUpCircle,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoSadOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";

import {
  Box,
  Skeleton,
  Stat,
  Text,
  Divider,
  Center,
  StatLabel,
  StatNumber,
  Flex,
  Icon,
} from "@chakra-ui/react";

export function NextWokkable({ nextWokkable }: any) {
  return (
    <Box p={3}>
      <Center>
        <Icon as={IoTimeOutline} marginRight={2} boxSize={6}></Icon>
        {Object.keys(nextWokkable).length !== 0 ? (
          <Text fontSize="sm">Next best time: {nextWokkable.date}</Text>
        ) : (
          <Text fontSize="sm">No good times to walk today</Text>
        )}
      </Center>
    </Box>
  );
}

export function Measure({ measure }: any) {
  return (
    <Stat>
      <StatLabel>{measure.name}</StatLabel>
      <Flex>
        <StatNumber color={measure.reason === "" ? "green.500" : "red.500"}>
          {measure.value}
          {measure.unit}
        </StatNumber>
        <motion.div
          animate={
            measure.reason === "high"
              ? { y: [0, 1, 0] }
              : measure.reason === "low"
              ? { y: [0, -1, 0] }
              : {}
          }
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Icon
            as={
              measure.reason === "high"
                ? IoArrowUpCircle
                : measure.reason === "low"
                ? IoArrowDownCircle
                : IoCheckmarkCircle
            }
          />
        </motion.div>
      </Flex>
    </Stat>
  );
}

export function Location({ city, country }: any) {
  return (
    <Box w="100%" color="grey" className="location-box">
      <Text fontSize="lg">
        {city}, {country}
      </Text>
    </Box>
  );
}

export function WokkyView({ data }: any) {
  console.log(data);
  if (data && data.is_wokky) {
    return (
      <div>
        <Box p={3} borderWidth="1px" borderRadius="lg" bg="green.300">
          <Center>
            Go for a walk
            <Icon as={IoCheckmarkCircle} marginLeft={2} boxSize={6}></Icon>
          </Center>
        </Box>
        <br></br>
        <Flex gap="5">
          {data?.measures?.map((measure: any) => {
            return <Measure measure={measure}></Measure>;
          })}
        </Flex>
      </div>
    );
  } else if (data && !data.is_wokky) {
    return (
      <div>
        <Box p={3} borderWidth="1px" borderRadius="lg" bg="tomato">
          <Center>
            You can't go for a walk yet
            <Icon as={IoCloseCircle} marginLeft={2} boxSize={6}></Icon>
          </Center>
        </Box>
        <br></br>
        <Flex gap="5">
          {data?.measures?.map((measure: any) => {
            return <Measure measure={measure}></Measure>;
          })}
        </Flex>
        <NextWokkable nextWokkable={data.next_wokable_time}></NextWokkable>
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
  const [userDenied, setUserDenied] = useState(false);
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
        setAPILoaded(false);
        WokkyService.isWokky(pos.coords.latitude, pos.coords.longitude)
          .then((response: any) => {
            console.log(response.data as WokkyDTO);
            setWokkyData(response.data);
            setAPILoaded(true);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setUserDenied(true);
      },
      options
    );
  }, []);
  if (userDenied) {
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
        <Center>
          <Icon as={IoSadOutline} boxSize={20}></Icon>
        </Center>
        <Text fontSize="15px">Please enable location services</Text>
      </Box>
    );
  }
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
      <Box
        maxW="550px"
        p={10}
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        className="main-container"
      >
        <Skeleton m={2}>
          <div>contents wrapped</div>
          <div>won't be visible</div>
        </Skeleton>
        <Skeleton m={2}>
          <div>contents wrapped</div>
          <div>won't be visible</div>
        </Skeleton>
        <Skeleton m={2}>
          <div>contents wrapped</div>
          <div>won't be visible</div>
        </Skeleton>
      </Box>
    );
  }
}

export default App;

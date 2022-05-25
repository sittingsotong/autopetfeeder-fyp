import React, { useEffect } from "react";
import { View, Text } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory-native";

import TitleAndLine from "../../components/home/titleAndLine";

import { useDispatch, useSelector } from "react-redux";
import { dataListener } from "../../redux/actions/trend";

import styles from "./styles";
import Colors from "../../colors";

export default function GraphScreen() {
  const currentUserObj = useSelector((state) => state.auth);
  const currData = useSelector((state) => state.trend);

  // Helper Function for calculating a date object x days away
  const xDaysAway = (day, x) => {
    return day.setDate(day.getDate() + x);
  };

  // Helper function for generating list of tick values
  const genDates = () => {
    var start = new Date();
    if (currData.data.length == 0) {
      start = new Date();
    } else {
      start = currData.data[0]["updated"];
    }

    const end = new Date();

    var dateArr = new Array();
    var currentDate = start;

    while (currentDate <= end) {
      dateArr.push(new Date(currentDate));
      currentDate = xDaysAway(new Date(currentDate), 1);
    }

    return dateArr;
  };

  // Helper function for rendering x axes label
  const renderDates = (day) => {
    // day is a Date object

    return `${day.getDate()}/${day.getMonth() + 1}`;

    // For rendering time in 24h format
    // \n${day.toLocaleTimeString(
    //   [],
    //   { hour12: false, hour: "2-digit", minute: "2-digit" }
    // )}
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserObj.currentUser != null) {
      dispatch(dataListener(currentUserObj.currentUser.uid));
    }
  }, [currentUserObj]);

  if (currData == null) {
    return <View />;
  }

  /* 
  TODO: Have an option that renders as line graph
  line graph will need to fill missing dates as 0
  maybe can use a custom hook to update state?

  TODO: can have an option that views information in detail
  rendering a different component
  */

  return (
    <View style={styles.containerMain}>
      <TitleAndLine title="History" />
      <View style={styles.graphContainer}>
        <Text style={styles.titleText}>Feeding History</Text>
        <VictoryChart
          domainPadding={20}
          height={600}
          theme={VictoryTheme.material}
          scale={{ x: "time", y: "linear" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              allowZoom={false}
              zoomDomain={{
                x: [xDaysAway(new Date(), -7), xDaysAway(new Date(), 1)],
              }}
            />
          }
        >
          <VictoryAxis
            tickCount={8}
            tickFormat={(t) => renderDates(new Date(t))}
            tickValues={genDates()}
          />
          <VictoryAxis
            dependentAxis
            tickCount={10}
            tickFormat={(y) => `${y}g`}
          />
          <VictoryBar
            padding={{ left: 20, right: 60 }}
            style={{
              data: { fill: Colors.highlightColor },
            }}
            data={currData.data}
            alignment="middle"
            x="updated"
            y="sumPortions"
            labels={({ datum }) => `${datum.sumPortions}g`}
            // labelComponent={<VictoryLabel dy={30} />}
          />
        </VictoryChart>
      </View>
    </View>
  );
}

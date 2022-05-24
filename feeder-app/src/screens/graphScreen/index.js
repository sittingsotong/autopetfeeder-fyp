import React, { useEffect } from "react";
import { View, Text } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryLabel,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";

import { useDispatch, useSelector } from "react-redux";
import { dataListener } from "../../redux/actions/trend";
import styles from "./styles";
import Colors from "../../colors";
import { render } from "react-dom";
import TitleAndLine from "../../components/home/titleAndLine";

export default function GraphScreen() {
  const currentUserObj = useSelector((state) => state.auth);
  const currData = useSelector((state) => state.trend);

  // Helper Function for calculating a date object x days away
  const xDaysAway = (day, x) => {
    return day.setDate(day.getDate() + x);
  };

  // Helper function for generating list of tick values
  const genDates = (start, end) => {
    var dateArr = new Array();
    var currentDate = start;

    while (currentDate <= end) {
      dateArr.push(new Date(currentDate));
      currentDate = xDaysAway(currentDate, 1);
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

  return (
    <View style={styles.containerMain}>
      <TitleAndLine title="History" />
      <View style={styles.graphContainer}>
        <Text style={styles.titleText}>Feeding History</Text>
        <VictoryChart
          domainPadding={30}
          domain={{ y: [0, 100] }}
          height={600}
          theme={VictoryTheme.material}
          scale={{ x: "time", y: "linear" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              allowZoom={false}
              zoomDomain={{
                y: [0, 110],
                x: [xDaysAway(new Date(), -5), xDaysAway(new Date(), 1)],
              }}
            />
          }
        >
          <VictoryAxis
            // tickValues={currData.data.map((d) => new Date(d.date))}
            tickFormat={(t) => renderDates(t)}
            tickValues={genDates(currData.data[0], currData.data[-1])}
          />
          <VictoryAxis
            dependentAxis
            tickValues={[0, 20, 40, 60, 80, 100]}
            tickFormat={(y) => `${y}g`}
          />
          <VictoryBar
            padding={{ left: 20, right: 60 }}
            style={{
              data: { fill: Colors.highlightColor },
              // labels: { fill: "black" },
            }}
            data={currData.data}
            alignment="middle"
            x="date"
            y="portion"
            labels={({ datum }) => `${renderDates(datum.date)}`}
            // labelComponent={<VictoryLabel dy={30} />}
          />
        </VictoryChart>
      </View>
    </View>
  );
}

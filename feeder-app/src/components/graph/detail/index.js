import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryLegend,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from "./styles";
import Colors from "../../../colors";

export default function DetailGraph({ data }) {
  const [day, setDay] = useState(new Date());
  const [feedData, setFeedData] = useState([]);
  const [predData, setPredData] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleConfirm = (date) => {
    setDay(date);
    toggleDatePicker();
  };

  // Helper Function for getting day element
  const findByDay = (date) => {
    const element = data.find(
      (el) => el["date"].toLocaleDateString() === date.toLocaleDateString()
    );

    return element;
  };

  // Helper Function for calculating a date object x hours away
  const xHoursAway = (day, x) => {
    return day.setHours(day.getHours() + x);
  };

  // Helper function for generating list of tick values
  const genTimes = () => {
    // returns an array of date objects in 1h intervals
    var start = new Date(day).setHours(0, 0, 0); // 00:00
    var end = new Date(day).setHours(23, 59, 59);

    var timesArr = new Array();

    while (start <= end) {
      timesArr.push(new Date(start));
      start = xHoursAway(new Date(start), 1); // 1h interval
    }

    return timesArr;
  };

  // Helper function for rendering x axes label
  const renderTimes = (day) => {
    // For rendering time in 24h format
    return `${day.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  useEffect(() => {
    const el = findByDay(new Date(day));
    if (el != null) {
      setFeedData(el["feeding"]);
      setPredData(el["remaining"]);
    } else {
      setFeedData([]);
      setPredData([]);
    }
  }, [day]);

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleText}>Displaying Data for </Text>
        <TouchableOpacity
          onPress={() => {
            toggleDatePicker();
          }}
        >
          <Text style={styles.titleButton}>{day.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker}
      />

      <VictoryChart
        domainPadding={35}
        height={600}
        theme={VictoryTheme.material}
        scale={{ x: "time", y: "linear" }}
        minDomain={{ y: 0 }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            allowZoom={false}
            zoomDomain={{
              x: [xHoursAway(new Date(day), -8), xHoursAway(new Date(day), 0)],
            }}
          />
        }
      >
        <VictoryLegend
          x={125}
          y={30}
          orientation="horizontal"
          gutter={15}
          style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
          data={[
            { name: "Feed Amount", symbol: { fill: Colors.highlightColor } },
            {
              name: "Leftover Amount",
              symbol: { fill: Colors.tertiaryColor },
            },
          ]}
        />
        <VictoryAxis
          tickCount={6}
          tickFormat={(t) => renderTimes(new Date(t))}
          tickValues={genTimes()}
        />
        <VictoryAxis dependentAxis tickCount={10} tickFormat={(y) => `${y}g`} />
        <VictoryBar
          padding={{ left: 20, right: 60 }}
          style={{
            data: { fill: Colors.highlightColor },
            parent: { border: "1px solid #ccc" },
          }}
          data={feedData}
          alignment="middle"
          x="feedTime"
          y="portion"
          labels={({ datum }) => `${datum.feedTime.toLocaleTimeString()}`}
          labelComponent={<VictoryLabel />}
        />
        <VictoryBar
          padding={{ left: 20, right: 60 }}
          style={{
            data: { fill: Colors.tertiaryColor },
            parent: { border: "1px solid #ccc" },
          }}
          data={predData}
          alignment="middle"
          x="predTime"
          y="prediction"
          labels={({ datum }) => `${datum.predTime.toLocaleTimeString()}`}
          labelComponent={<VictoryLabel />}
        />
      </VictoryChart>
    </View>
  );
}

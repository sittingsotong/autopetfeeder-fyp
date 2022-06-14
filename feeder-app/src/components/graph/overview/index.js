import React from "react";
import { View } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";

import Colors from "../../../colors";

export default function OverviewGraph({ data }) {
  // Helper Function for calculating a date object x days away
  const xDaysAway = (day, x) => {
    return day.setDate(day.getDate() + x);
  };

  // Helper function for generating list of tick values
  const genDates = () => {
    var start = new Date();

    // start is earliest day with data
    if (data.length == 0) {
      start = new Date();
    } else {
      var dates = data;

      dates.sort(function (a, b) {
        return new Date(a["date"]) - new Date(b["date"]);
      });

      start = dates[0]["date"];
    }

    const end = new Date(); // end is today

    var dateArr = new Array();

    while (start <= end) {
      dateArr.push(new Date(start));
      start = xDaysAway(new Date(start), 1);
    }

    return dateArr;
  };

  // Helper function for rendering x axes label
  const renderDates = (day) => {
    // day is a Date object
    return `${day.getDate()}/${day.getMonth() + 1}`;
  };

  return (
    <View>
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
        <VictoryAxis dependentAxis tickCount={10} tickFormat={(y) => `${y}g`} />
        <VictoryBar
          padding={{ left: 20, right: 60 }}
          style={{
            data: { fill: Colors.highlightColor },
          }}
          data={data}
          alignment="middle"
          x="date"
          y="sumPortions"
          labels={({ datum }) => `${datum.sumPortions}g`}
          labelComponent={<VictoryLabel />}
        />
      </VictoryChart>
    </View>
  );
}

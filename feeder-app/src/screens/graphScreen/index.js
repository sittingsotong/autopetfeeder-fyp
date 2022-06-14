import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import OverviewGraph from "../../components/graph/overview";
import TitleAndLine from "../../components/home/titleAndLine";

import { useDispatch, useSelector } from "react-redux";
import { dataListener } from "../../redux/actions/trend";

import styles from "./styles";
import GraphDropdown from "../../components/graph/graphDropdown";
import DetailGraph from "../../components/graph/detail";

export default function GraphScreen() {
  const currentUserObj = useSelector((state) => state.auth);
  const currData = useSelector((state) => state.trend);

  // 0 = daily overall, 1 = detail by day
  const [graph, setGraph] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserObj.currentUser != null) {
      dispatch(dataListener(currentUserObj.currentUser.uid));
    }
  }, [currentUserObj]);

  const graphOptions = [
    { label: "Overview Graph", value: 0 },
    { label: "Detail Graph", value: 1 },
  ];

  if (currData == null) {
    return <View />;
  }

  return (
    <View style={styles.containerMain}>
      <TitleAndLine title="History" />
      <View style={styles.bodyContainer}>
        <GraphDropdown graph={graph} setGraph={setGraph} data={graphOptions} />
        <View style={styles.graphContainer}>
          {graph == 0 ? (
            <OverviewGraph data={currData.data} />
          ) : (
            <DetailGraph data={currData.data} />
          )}
        </View>
      </View>
    </View>
  );
}

import * as React from "react"
import { StyleSheet } from "react-native"
import { Text, Tab, TabView } from "react-native-elements"
import { Users } from "../components/Users"
import { View } from "../components/Themed"
import { Settings } from "../components/Settings"
import { Expired } from "../components/Expired"

export default function AdminHome({
  name,
  setName,
}: {
  name: any
  setName: any
}) {
  const [index, setIndex] = React.useState(0)

  return (
    <View style={styles.container}>
      <Tab value={index} onChange={(e) => setIndex(e)}>
        <Tab.Item title="settings" />
        <Tab.Item title="users" />
        <Tab.Item title="expired" />
      </Tab>
      <TabView value={index - 1} onChange={setIndex}>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Settings />
        </TabView.Item>

        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Users
            setName={setName}
            name={name}
            setOpenModal={undefined}
            openModal={false}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "pink", width: "100%" }}>
          <Expired name={name} />
        </TabView.Item>
      </TabView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})

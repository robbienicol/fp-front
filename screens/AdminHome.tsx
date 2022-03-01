import * as React from "react"
import {Button, StyleSheet} from "react-native"
import {Text, Tab, TabView} from "react-native-elements"
import {Users} from "../components/Users"
import {View} from "../components/Themed"
import {Settings} from "../components/Settings"
import {Avatar, ListItem} from "react-native-elements"
import {Expired} from "../components/Expired"

export default function AdminHome({
  expoPushToken,
  sendPushNotification,
  name,
  setName,
  expireFilter,
}: {
  name: any
  setName: any
  sendPushNotification: any
  expoPushToken: any
  expireFilter: any
}) {
  const [index, setIndex] = React.useState(0)

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={(e: React.SetStateAction<number>) => setIndex(e)}
      >
        <Tab.Item title="stuff" />
        <Tab.Item title="users" />
        <Tab.Item title="broke boys" />
      </Tab>
      <TabView value={index - 1} onChange={setIndex}>
        <TabView.Item style={{backgroundColor: "white", width: "100%"}}>
          <Settings />
        </TabView.Item>

        <TabView.Item style={{backgroundColor: "white", width: "100%"}}>
          <Users
            expoPushToken={expoPushToken}
            sendPushNotification={sendPushNotification}
            setName={setName}
            name={name}
            setOpenModal={undefined}
            openModal={false}
          />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: "white", width: "100%"}}>
          {expireFilter.length > 0 ? (
            <Expired
              setName={setName}
              name={name}
              expireFilter={expireFilter}
            />
          ) : (
            <Text>
              All users are active i think? who knows i cant code for shit
            </Text>
          )}
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

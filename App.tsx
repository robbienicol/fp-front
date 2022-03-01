import {StatusBar} from "expo-status-bar"
import {SafeAreaProvider} from "react-native-safe-area-context"
import useCachedResources from "./hooks/useCachedResources"
import AdminHome from "./screens/AdminHome"
import {Header} from "react-native-elements"
import NewPost from "./components/NewPost"
import NewUser from "./components/NewUser"
import {TouchableHighlight} from "react-native-gesture-handler"
import {Image, StyleSheet} from "react-native"
import axios from "axios"
import * as Notifications from "expo-notifications"
import React, {useState, useEffect, useRef} from "react"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})
export default function App() {
  const [post, setPost] = React.useState<number>(0)
  const [addUser, setAddUser] = React.useState<number>(0)
  const [time, setTime] = React.useState(0)
  const [name, setName] = React.useState([])
  const [expoPushToken, setExpoPushToken] = useState<any>("")
  const [notification, setNotification] = useState<any>(false)
  const notificationListener = useRef<any>()
  const responseListener = useRef<any>()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
  //get users
  React.useEffect(() => {
    axios
      .get("http://localhost:8082/api/users")
      .then((res) => {
        console.log("working")
        setName(res.data)
      })
      .catch((err) => {
        console.log("nope")

        console.log(err)
      })
  }, [])
  var now = Date.now()
  // var initialDate = new Date(2021, 10, 1) // Attention: month is zero-based
  // var difference = now - initialDate
  // var millisecondsPerDay = 24 * 60 * 60 * 1000
  // var daysSince = Math.floor(difference / millisecondsPerDay)
  const isLoadingComplete = useCachedResources()

  const expireFilter = name.filter((e: any) => {
    //flip sign to test
    return now - e.dateToExpire < 0
  })
  console.log(expireFilter, "winner")
  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Header
          leftComponent={
            <TouchableHighlight onPressIn={() => setAddUser(1)}>
              <Image
                style={styles.gus}
                source={require("./assets/images/gus.jpg")}
              />
            </TouchableHighlight>
          }
          centerComponent={{text: "FP Admin", style: {color: "#fff"}}}
          rightComponent={
            <TouchableHighlight onPressIn={() => setPost(1)}>
              <Image
                style={styles.gus}
                source={require("./assets/images/gus.jpg")}
              />
            </TouchableHighlight>
          }
        />
        {post === 1 && <NewPost setPost={setPost} />}
        {addUser === 1 && (
          <NewUser
            name={name}
            setName={setName}
            time={time}
            setTime={setTime}
            setAddUser={setAddUser}
          />
        )}

        <AdminHome
          expireFilter={expireFilter}
          sendPushNotification={sendPushNotification}
          expoPushToken={expoPushToken}
          setName={setName}
          name={name}
        />
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create({
  gus: {
    width: 50,
    height: 70,
  },
})

async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Hey Dingus!",
    body: " A User is Outta Days!",
    data: {someData: "goes here"},
  }

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token
  const {status: existingStatus} = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== "granted") {
    const {status} = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!")
    return
  }
  token = (await Notifications.getExpoPushTokenAsync()).data
  console.log(token)

  return token
}

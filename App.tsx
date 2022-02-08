import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import useCachedResources from "./hooks/useCachedResources"
import AdminHome from "./screens/AdminHome"
import { Header } from "react-native-elements"
import NewPost from "./components/NewPost"
import NewUser from "./components/NewUser"
import { TouchableHighlight } from "react-native-gesture-handler"
import { Image, StyleSheet } from "react-native"
import EditUser from "./components/EditUser"
import axios from "axios"

export default function App() {
  const [post, setPost] = React.useState<number>(0)
  const [addUser, setAddUser] = React.useState<number>(0)
  const [time, setTime] = React.useState(0)
  const [name, setName] = React.useState([])
  //get users
  React.useEffect(() => {
    axios
      .get("http://localhost:8082/api/users")
      .then((res) => {
        setName(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  var initialDate = new Date(2021, 10, 1) // Attention: month is zero-based
  var now = Date.now()
  var difference = now - initialDate
  var millisecondsPerDay = 24 * 60 * 60 * 1000
  var daysSince = Math.floor(difference / millisecondsPerDay)
  const isLoadingComplete = useCachedResources()

  // name.map((e) => {
  //   setTime(daysSince + time - daysSince)
  // })
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
          centerComponent={{ text: "FP Admin", style: { color: "#fff" } }}
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

        <AdminHome setName={setName} name={name} />
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

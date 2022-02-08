import axios from "axios"
import * as React from "react"
import { Button, StyleSheet, TextInput } from "react-native"
import { Overlay } from "react-native-elements"
import { Text, View } from "../components/Themed"
import moment from "moment"

export default function NewUser({
  name,
  setAddUser,
  time,
  setTime,
  setName,
}: any) {
  const [userName, setUserName] = React.useState<string>("")
  const handleChange = (e: any) => {
    setUserName(e)
  }
  function saveUser() {
    const data = {
      person: userName,
      membershipLength: time,
      dateStarted: moment().format("L"),
      dateToExpire: moment().add(time, "days").calendar(),
    }
    axios
      .post("http://localhost:8082/api/users", data)
      .catch((err: { message: any }) => {
        console.log("Error couldn't create TODO")
        console.log(err.message)
      })
    setName([...name, data])
  }
  return (
    <View>
      <Overlay isVisible={true} onBackdropPress={() => setAddUser(0)}>
        <Text>User Info </Text>

        <TextInput
          onChangeText={handleChange}
          style={styles.postInput}
          placeholder="@"
          placeholderTextColor="pink"
          value={userName}
        />
        <Text style={{ marginTop: 10 }}>{time} Days Remaining! </Text>
        <View style={{ flexDirection: "row" }}>
          <Button title="Add Day" onPress={() => setTime(time + 1)}></Button>
          <Button title="Add Week" onPress={() => setTime(time + 7)}></Button>
          <Button title="Add Month" onPress={() => setTime(time + 30)}></Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title="Reset Days" onPress={() => setTime(0)}></Button>
          <Button title="Add" onPress={() => saveUser()}></Button>
        </View>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  postInput: {
    fontSize: 24,
    borderColor: "#42435b",
    borderWidth: 2,
    marginTop: 10,
    color: "black",
  },
})

import axios from "axios"
import { isDuration } from "moment"
import * as React from "react"
import { Button, Platform, StyleSheet, TextInput } from "react-native"
import { Input, Overlay } from "react-native-elements"
import { Text, View } from "../components/Themed"

export default function EditUser({
  name,
  setName,
  selectedData,
  setOpenModal,
}: any) {
  const [userName, setUserName] = React.useState<string>(selectedData.name)
  const [newTime, setNewTime] = React.useState<number>(
    selectedData.membershipLength
  )
  const deleteData = name.filter((ids: any) => selectedData._id !== ids._id)
  const handleChange = (e: React.SetStateAction<string>) => {
    setUserName(e)
  }
  const editData = () => {
    setName([...name, { person: userName, membershipLength: newTime }])
  }

  const ClearUser = () => {
    axios
      .delete(`http://localhost:8082/api/users/${selectedData._id}`)
      .catch((err) => {
        console.log("Failed to delete todo")
        console.log(err.message)
      })
    setName(deleteData)
  }

  function handleSubmit() {
    const data = {
      person: userName,
      clock: newTime,
    }
    axios
      .put(`http://localhost:8082/api/users/${selectedData._id}`, data)
      .catch((err) => {
        console.log(err.message)
      })
    editData()
  }
  return (
    <View>
      <Overlay isVisible={true} onBackdropPress={() => setOpenModal(true)}>
        <Text>Edit User </Text>

        <TextInput
          onChangeText={handleChange}
          value={userName}
          style={styles.postInput}
          placeholder="@"
          placeholderTextColor="pink"
        />
        <Text style={{ marginTop: 10 }}>{newTime} Days Remaining! </Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Add Day"
            onPress={() => setNewTime(newTime + 1)}
          ></Button>
          <Button
            title="Add Week"
            onPress={() => setNewTime(newTime + 7)}
          ></Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Add Month"
            onPress={() => setNewTime(newTime + 30)}
          ></Button>
          <Button title="Reset Days" onPress={() => setNewTime(0)}></Button>
        </View>
        <View>
          <Button color="red" title="Delete" onPress={ClearUser}></Button>
          <Button color="green" title="Finish" onPress={handleSubmit}></Button>
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
  winner: {},
})

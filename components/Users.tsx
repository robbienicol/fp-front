import * as React from "react"
import { Text, View, TextInput, Button, Alert } from "react-native"
import { Avatar, ListItem } from "react-native-elements"
import EditUser from "./EditUser"

export function Users({
  setName,
  name,
}: {
  setName: any
  name: any
  setOpenModal: any
  openModal: boolean
}) {
  const [openModal, setOpenModal] = React.useState(true)
  const [selectedData, setSelectedData] = React.useState()
  const OpenEdit = (e: any) => {
    setOpenModal(false)
    setSelectedData(e)
  }

  return (
    <View>
      {name?.map((e: any) => {
        return (
          <ListItem bottomDivider onPress={() => OpenEdit(e)}>
            <ListItem.Content>
              <ListItem.Title key={e._id}>@{e.person}</ListItem.Title>
              <ListItem.Subtitle>
                {e.membershipLength} days remaining
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      })}
      {openModal === false && (
        <EditUser
          setOpenModal={setOpenModal}
          setSelectedData={setSelectedData}
          setName={setName}
          name={name}
          selectedData={selectedData}
          openModal={openModal}
        />
      )}
    </View>
  )
}

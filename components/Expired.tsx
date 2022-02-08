import * as React from "react"
import { Text, View, TextInput, Button, Alert } from "react-native"
import { Avatar, ListItem } from "react-native-elements"
import moment from "moment"

export function Expired({ name }: any) {
  const [openModal, setOpenModal] = React.useState(true)
  const [selectedData, setSelectedData] = React.useState()
  const OpenEdit = (e: any) => {
    setOpenModal(false)
    setSelectedData(e)
  }
  const filtered = name?.filter((e: any) => {
    return moment().diff(e.dateToExpire) <= 0
  })
  return (
    <View>
      {filtered?.map((e: any) => {
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
    </View>
  )
}

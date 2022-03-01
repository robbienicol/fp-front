import * as React from "react"
import {Text, View, TextInput, Button, Alert} from "react-native"
import {Avatar, ListItem} from "react-native-elements"
import EditUser from "./EditUser"

export function Users({
  setName,
  name,
  expoPushToken,
  sendPushNotification,
}: {
  setName: any
  name: any
  setOpenModal: any
  openModal: boolean
  sendPushNotification: any
  expoPushToken: any
}) {
  const [openModal, setOpenModal] = React.useState(true)
  const [selectedData, setSelectedData] = React.useState()
  var millisecondsPerDay = 24 * 60 * 60 * 1000

  const OpenEdit = (e: any) => {
    setOpenModal(false)
    setSelectedData(e)
  }

  return (
    <View>
      {name?.map((e: any, i: number) => {
        var UTCDate = new Date(e.dateToExpire)
        var month = UTCDate.getMonth()
        var day = UTCDate.getDate()

        // React.useEffect(() => {
        //   sendPushNotification(expoPushToken)
        // }, [])

        return (
          <ListItem key={i} bottomDivider onPress={() => OpenEdit(e)}>
            <ListItem.Content>
              <ListItem.Title key={e._id}>@{e.person}</ListItem.Title>
              <ListItem.Subtitle style={{color: "green"}}>
                {month} / {day} Expiring Date
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

import * as React from "react"
import {Text, View, TextInput, Button, Alert} from "react-native"
import {Avatar, ListItem} from "react-native-elements"
import moment from "moment"
import EditUser from "./EditUser"

export function Expired({name, setName, expireFilter}: any) {
  const [openModal, setOpenModal] = React.useState(true)
  const [selectedData, setSelectedData] = React.useState()
  const OpenEdit = (e: any) => {
    setOpenModal(false)
    setSelectedData(e)
  }

  return (
    <View>
      {expireFilter?.map((e: any, i: number) => {
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
              <ListItem.Subtitle style={{color: "red"}}>
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

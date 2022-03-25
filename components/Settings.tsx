import * as React from "react"
import { View, Alert} from "react-native"
import { ListItem} from "react-native-elements"

export function Settings() {
  const [showBox, setShowBox] = React.useState(true)
  const showConfirmDialog = () => {
    function handleDelete() {
      //WIP
    }
    return Alert.alert("Are your sure you want to GG all this data??", "", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          handleDelete()
          setShowBox(false)
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ])
  }
  return (
    <View>
      <ListItem onPress={() => showConfirmDialog()} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Give everyone a free day</ListItem.Title>
          <ListItem.Subtitle>(Click me)</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => showConfirmDialog()} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Send all expired the DM </ListItem.Title>
          <ListItem.Subtitle>(Click me)</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  )
}

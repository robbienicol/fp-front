import * as React from "react"
import { View, } from "react-native"
import { Avatar, ListItem } from "react-native-elements"

export function SinglePost() {
  const fakeUser = {
    name: "juan",
    subtitle: "take this bet !",
  }
  return (
    <View>
      <ListItem bottomDivider>
        <Avatar
          source={{
            uri: "https://cdn.vox-cdn.com/thumbor/RsL5FNihoaV9odgkWQWIATp1xr0=/0x16:1103x751/1400x1400/filters:focal(0x16:1103x751):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/46840054/Screenshot_2015-07-27_15.11.13.0.0.png",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{fakeUser.name}</ListItem.Title>
          <ListItem.Subtitle>{fakeUser.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  )
}

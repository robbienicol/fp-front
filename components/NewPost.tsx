import { StatusBar } from "expo-status-bar"
import * as React from "react"
import { Button, Platform, StyleSheet, TextInput } from "react-native"
import { Input, Overlay } from "react-native-elements"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

export default function NewPost({ setPost }: any) {
  return (
    <View>
      <Overlay isVisible={true} onBackdropPress={() => setPost(0)}>
        <Text> write your post here: </Text>
        <TextInput
          style={styles.postInput}
          placeholder="ayyyyy lil b whoop whoop"
        />
        <Button title="post" onPress={() => null}>
          <Text>Post</Text>
        </Button>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  postInput: {
    fontSize: 24,
    borderColor: "#42435b",
    borderWidth: 2,
    margin: 20,
  },
})

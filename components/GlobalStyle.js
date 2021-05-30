import { StyleSheet } from 'react-native'

const globalStyle = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    ...{ minWidth: 335, maxWidth: 340, alignSelf: "center" }
  },
  input: {
    backgroundColor: "lightgray",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 20,
  },
  bordered: { borderColor: "gray", borderWidth: 2 }
})

export { globalStyle }

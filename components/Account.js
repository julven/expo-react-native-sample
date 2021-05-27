import React, { useState, useEffect, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
import { withConnect } from './Redux'
import { globalStyle } from './GlobalStyle'
import { GlobalContext } from './GlobalContext'

let Account = ({ accountState, accountSetter }) => {

  let context = useContext(GlobalContext)

  let [test, setTest] = useState("")
  let [date, setDate] = useState({
    show: false
  })
  let [gender, setGender] = useState("male")

  let changeHandler = (field, value) => {
    setTest(JSON.stringify(value))
    accountSetter.accountSet({
      ...accountState,
      [field]: value
    })

    if (field == "gender") setGender(value)
  }

  useEffect(() => {

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Text style={[globalStyle.title]}>Account</Text>
      <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
        <View style={{ marginTop: 10, maxWidth: 300 }}>


          <Text style={{ marginTop: 5 }}>First Name {accountState.fname == "" && <Text style={{ color: "red" }}>required*</Text>}</Text>
          <TextInput style={[globalStyle.input]} value={accountState.fname} onChange={e => changeHandler('fname', e.nativeEvent.text)} />

          <Text style={{ marginTop: 5 }}>Last Name {accountState.lname == "" && <Text style={{ color: "red" }}>required*</Text>}</Text>
          <TextInput style={[globalStyle.input]} value={accountState.lname} onChange={e => changeHandler('lname', e.nativeEvent.text)} />

          <Text style={{ marginTop: 5 }}>Birthday {accountState.bday == "" && <Text style={{ color: "red" }}>required*</Text>}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput style={[globalStyle.input, { width: 160, }]} value={accountState.bday} />

            <View style={{ marginHorizontal: 30, borderWidth: 2, borderColor: "gray", backgroundColor: "lightgray" }}>
              <TouchableHighlight underlayColor={context.randColor()} activeOpacity={0.6} onPress={() => setDate({ ...date, show: true })}>
                <Text style={{ margin: 10, }}>SELECT</Text>
              </TouchableHighlight>

            </View>

            {
              Platform.OS === "ios" ?
                <Modal visible={date.show}>
                  <View style={{ flex: 1, justifyContent: "center", backgroundColor: "hsl(" + Math.random() * 360 + ", 100%, 75%)" }}>
                    <DateTimePicker
                      value={new Date(accountState.bday)}
                      display="spinner"
                      onChange={(e, date) => changeHandler('bday', moment(date).format("YYYY-MM-DD"))} />
                    <View style={{ marginHorizontal: 30, borderWidth: 2, borderColor: "gray", backgroundColor: "lightgray" }}>
                      <TouchableHighlight
                        onPress={() => setDate({ ...date, show: false })
                        }
                        underlayColor={"white"}
                        activeOpacity={0.6}>
                        <Text style={{ margin: 10, textAlign: "center" }}>CLOSE</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
                :
                date.show &&
                <DateTimePicker
                  value={new Date(accountState.bday)}
                  onChange={(e, date) => { setDate({ ...date, show: false }); changeHandler('bday', moment(date).format("YYYY-MM-DD")) }}
                />
            }

          </View>

          <Text style={{ marginTop: 5 }}>Gender {accountState.gender == "" && <Text style={{ color: "red" }}>required*</Text>}</Text>
          <View style={[style.radioGroup]}>
            <TouchableHighlight style={[style.radioBttn]} underlayColor={context.randColor()} activeOpacity={0.6} onPress={() => changeHandler("gender", "male")}>
              <View style={[style.readioSelectContainer]}>
                <View style={[style.radioSelect, gender == "male" && { borderColor: "black", borderWidth: 3 }]}></View>
                <Text style={[style.radioText]}>Male</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={[style.radioBttn]} underlayColor={context.randColor()} activeOpacity={0.6} onPress={() => changeHandler("gender", "female")}>
              <View style={[style.readioSelectContainer]}>
                <View style={[style.radioSelect, gender == "female" && { borderColor: "black", borderWidth: 3 }]}></View>
                <Text style={[style.radioText]}>Female</Text>
              </View>
            </TouchableHighlight>
          </View>
          <Text>{ }</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  radioGroup: {

    flexDirection: "row"
  },
  radioBttn: {
    marginRight: 20,
  },
  radioText: {
    fontSize: 20
  },
  readioSelectContainer: {
    flexDirection: "row", alignItems: "center"
  },
  radioSelect: {
    width: 15, height: 15, backgroundColor: 'lightgray', marginVertical: 5, marginRight: 10,
  }
})


export default withConnect(Account)

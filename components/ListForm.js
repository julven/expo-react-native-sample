import React, { useState, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment' 
import { withConnect } from './Redux'
import { globalStyle } from './GlobalStyle'
import { GlobalContext } from './GlobalContext'

let ListForm = ({ listSetter }) => {

    let context = useContext(GlobalContext)
    let [test, setTest] = useState("")
    let [form, setForm] = useState({
      fname: "",
      lname: "",
      bday: moment().format("YYYY-MM-DD"),
      gender: "",
    })

    let [date, setDate] = useState({
      show: false
    })
    let [gender, setGender] = useState("")

   let randColor = () =>"hsl(" + Math.random() * 360 + ", 100%, 75%)"

   let formHandler = (field, value) => {
      setTest(JSON.stringify({field, value}))
      setForm({
        ...form,
        [ field ] : value
      })

      if(field === "gender") setGender(value)
    }

    let submit = () => {
      let error = false;
      
      Object.keys(form).forEach( x => {
       if( form[x] == "" ) error = true; 
      })

      if(error) {
        Alert.alert("All fields must be filled!")
        return
      }
      let newForm = {...form, id: Math.random().toString(36).substring(7)};

      listSetter.listAdd(newForm)

      Alert.alert("New info added to list!")
      reset()

      setTest(JSON.stringify({form}))
       
    }

    let reset = () => {
      setForm({
      fname: "",
      lname: "",
      bday: moment().format("YYYY-MM-DD"),
      gender: "",
    })

    setGender("")
    }

  return (
   <View style={{flex: 1, justifyContent: "center", flexDirection: "row"}}>
     <View style={{maxWidth: 300}}>
      <Text style={{marginTop: 5}}>First Name {form.fname == "" && <Text style={{color: "red"}}>required*</Text>}</Text>
      <TextInput 
      style={[globalStyle.input]} 
      value={form.fname} 
      onChange={e => formHandler('fname', e.nativeEvent.text)}/>

      <Text style={{marginTop: 5}}>Last Name {form.lname == "" && <Text style={{color: "red"}}>required*</Text>}</Text>
      <TextInput style={[globalStyle.input]} value={form.lname} onChange={e => formHandler('lname', e.nativeEvent.text)}/>

      <Text  style={{marginTop: 5}}>Birthday {form.bday == "" && <Text style={{color: "red"}}>required*</Text>}</Text>
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <TextInput style={[globalStyle.input, {width: 160,}]} value={context.date(form.bday)}/> 
        
        <View style={{marginHorizontal: 30, borderWidth: 2, borderColor: "gray", backgroundColor: "lightgray"}}>
            <TouchableHighlight underlayColor={randColor()} activeOpacity={0.6} onPress={() => setDate({...date, show: true})}> 
              <Text style={{margin: 10,}}>SELECT</Text>
            </TouchableHighlight>
        </View>

          {
            Platform.OS === "ios" ?
          <Modal visible={date.show}>
          <View style={{flex: 1, justifyContent: "center", backgroundColor: context.randColor()}}>
           <DateTimePicker
           onChange={ (e,date) => formHandler("bday", moment(date).format("YYYY-MM-DD"))}
            value={new Date(moment(form.bday).add(24, "hours").format("YYYY-MM-DD"))}
            display="spinner"/>
             <View style={{marginHorizontal: 30, borderWidth: 2, borderColor: "gray", backgroundColor: "lightgray"}}>
                  <TouchableHighlight underlayColor={"white"} activeOpacity={0.6} onPress={() => setDate({...date, show: false})}> 
                    <Text style={{margin: 10,textAlign: "center"}}>CLOSE</Text>
                  </TouchableHighlight>
              </View>
              </View>
          </Modal>
          :
          date.show && 
          <DateTimePicker 
          value={new Date(moment(form.bday).add(24, "hours").format("YYYY-MM-DD"))}
          onChange={ (e, date) => { setDate({...date, show: false}); formHandler("bday", moment(date).format("YYYY-MM-DD"))
            }}/>  
          }
        
      </View>

      <Text style={{marginTop: 5}}>Gender {form.gender == "" && <Text style={{color: "red"}}>required*</Text>}</Text>
      <View style={[style.radioGroup]}>
        <TouchableHighlight style={[style.radioBttn]} underlayColor={randColor()} activeOpacity={0.6} onPress={() => formHandler("gender", "male")}>
           <View style={[style.readioSelectContainer]}>
              <View style={[style.radioSelect, gender == "male" && {borderColor: "black", borderWidth: 3}]}></View>
              <Text style={[style.radioText]}>Male</Text>
           </View>
        </TouchableHighlight>

         <TouchableHighlight style={[style.radioBttn]} underlayColor={randColor()} activeOpacity={0.6} onPress={() => formHandler("gender", "female")}>
           <View style={[style.readioSelectContainer]}>
              <View style={[style.radioSelect, gender == "female" && {borderColor: "black", borderWidth: 3} ]}></View>
              <Text style={[style.radioText]}>Female</Text>
           </View>
        </TouchableHighlight>
      </View>
      
      
      <View style={{ borderWidth: 2, borderColor: "gray", backgroundColor: "lightgray", width: 100, marginVertical: 15}}>
        <TouchableHighlight underlayColor={randColor()} activeOpacity={0.6} onPress={() => submit()}> 
          <Text style={{margin: 10,textAlign: "center"}}>ADD</Text>
        </TouchableHighlight>
      </View>
       <Text>{}</Text>
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


export default withConnect(ListForm) 
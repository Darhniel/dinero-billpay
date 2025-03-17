import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SampleScreen({route}) {
    console.log(route)
  return (
    <View>
      <Text>SampleScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Feather } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


type SummaryScreenProps = NativeStackScreenProps<RootStackParamList, 'Summary'>;

const SummaryScreen: React.FC<SummaryScreenProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const { amount, name, image, meterNo, userId, phone, email, transaction } = user;
  // console.log(user)

  const info = {
    amount: amount,
    transaction: transaction,
    id: userId,
    phoneNumber: phone,
    decoderNo: "",
    meterNo: meterNo,
    email: email
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={'light'} translucent={true} hidden={false} />

      <View style={{ width: scale(300), marginHorizontal: "auto", flexDirection: "row" }}>
        <View style={{ width: scale(130), flexDirection: "row", gap: scale(8), alignItems: "center" }}>
          <Image source={{ uri: image }} style={{ width: scale(40), height: scale(40) }} />
          <Text style={{ fontFamily: "DMSansBold" }}>{name}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#E2FBE8', borderRadius: scale(8), width: scale(300), marginHorizontal: "auto", marginTop: verticalScale(16), paddingVertical: verticalScale(16), gap: scale(6), flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontFamily: "DMSans", fontSize: scale(16), color: "#B2AEB0" }}>NGN</Text>
        <Text style={{ fontFamily: "DMSansBold", fontSize: scale(16), color: "#32623C" }}>{amount}</Text>
      </View>

      <View style={{ backgroundColor: '#fff', borderRadius: scale(8), width: scale(300), marginHorizontal: "auto", marginTop: verticalScale(20), paddingVertical: moderateVerticalScale(8) }}>

        {
          Object.entries(user).map(([key, value]) => {
            if (value === "") {
              return null;
            }

            let displayKey = key;

            switch (key) {
              case "meterNo":
                displayKey = "Meter No"
                break;

              case "meterType":
                displayKey = "Meter Type"
                break;

              case "phone":
                displayKey = "Phone No"
                break;

              case "decoderNo":
                displayKey = "Decoder No"
                break;

              case "decoderPackage":
                displayKey = "Package"
                break;

              default:
                break;
            }

            return (key !== 'image' && key !== 'name' && key !== 'amount' && key !== 'userId') && (
              <View key={key} style={{ width: scale(280), flexDirection: "row", marginHorizontal: "auto", borderBottomWidth: scale(1), justifyContent: "space-between", borderBottomColor: "#B2AEB0", height: verticalScale(28), alignItems: "center" }}>
                <Text style={{ fontFamily: "DMSans", color: "#929597", textTransform: "capitalize" }}>{displayKey}</Text>
                <Text style={{ fontFamily: "DMSansBold", color: "#5F5B5D" }}>{value}</Text>
              </View>
            )
          })
        }
      </View>

      <TouchableOpacity
        style={[styles.submit]}
        onPress={() => { navigation.navigate('EnterPin', { info: info }) }}
      >
        <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
        <Feather name='arrow-right' size={24} color={"#fff"} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submit, { backgroundColor: "none" }]}
        onPress={() => { navigation.goBack() }}
      >
        <Text style={[styles.submitText, { fontWeight: 500, color: "#0C6599" }]}>Modify</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: scale(28)
  },
  submit: {
    flexDirection: "row",
    width: scale(300),
    marginHorizontal: "auto",
    height: verticalScale(45),
    borderRadius: scale(8),
    backgroundColor: "#0C6599",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
    paddingVertical: moderateVerticalScale(4),
    paddingHorizontal: moderateScale(24),
    marginTop: scale(20)
  },
  submitText: {
    fontFamily: "DMSans",
    fontSize: scale(12),
    color: "#fff"
  },
});

export default SummaryScreen;
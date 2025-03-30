import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function FundScreen({ navigation }: any) {
  const { styles } = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={'light'} translucent={true} hidden={false} />
      <Text style={styles.heading}>How do you want to fund your wallet?</Text>

      <TouchableOpacity style={styles.options} onPress={() => navigation.navigate('Transfer')}>
        <Image source={require('../assets/images/transfer.png')} />
        <View style={styles.texts}>
          <Text style={styles.textHeading}>Fund wallet with bank Transfer</Text>
          <Text style={styles.textBody}>Add money to your wallet directly with bank transfers.</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.options} onPress={() => navigation.navigate('Card')}>
        <Image source={require('../assets/images/cards.png')} />
        <View style={styles.texts}>
          <Text style={styles.textHeading}>Fund wallet with Card</Text>
          <Text style={styles.textBody}>Add money to your wallet directly from your card.</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

function useStyles() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      width: "100%",
      height: "100%"
    },
    heading: {
      fontFamily: "DMSansBold",
      fontSize: scale(16),
      color: "#333",
      marginTop: verticalScale(32),
      marginLeft: scale(24)
    },
    options: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(16),
      paddingHorizontal: moderateScale(12),
      borderRadius: scale(12),
      borderWidth: scale(1),
      borderColor: "rgba(0, 0, 0, 0.3)",
      marginHorizontal: "auto",
      height: verticalScale(75),
      width: scale(320),
      marginTop: verticalScale(32)
    },
    texts: {
      gap: verticalScale(6)
    },
    textHeading: {
      fontFamily: "DMSansBold"
    },
    textBody: {
      fontFamily: "DMSans",
      width: scale(200)
    }
  });

  return { styles }

}
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SegmentedInput from '../../components/CodeInput';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


export default function UpdateOTPScreen({ navigation, route }: any) {
    const [code, setCode] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const { user } = route.params;

    async function handlePress() {
        setIsEmailVerified(true);
        const { password, pin } = user;

        if (pin) {
            navigation.navigate('UpdatePin');
            setIsEmailVerified(false);
        }

        if (password) {
            navigation.navigate('UpdatePassword', {otp: code});
            setIsEmailVerified(false);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={[styles.mainHeading, { fontWeight: 500 }]}>
                Enter Verification OTP
            </Text>

            <View style={{ marginLeft: scale(24) }}>
                <View style={styles.codeBox}>
                    <Text style={[styles.codeHeading, { fontWeight: 500 }]}>OTP</Text>
                    <SegmentedInput length={6} onChange={setCode} />
                </View>
            </View>

            <TouchableOpacity style={[styles.submit, (code.length < 6) ? { backgroundColor: "grey" } : {}]} onPress={() => { handlePress() }} disabled={code.length < 6}>
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal isVisible={isEmailVerified} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={48} color={'#1734B9'} />
                </View>
            </Modal>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: scale(16),
        backgroundColor: "#fff"
    },
    mainHeading: {
        fontFamily: "DMSansBold",
        fontSize: scale(14),
        marginLeft: scale(24),
        marginTop: verticalScale(48)
    },
    codeBox: {
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(320)
    },
    codeHeading: {
        fontSize: scale(14),
        fontFamily: "DMSans",
        color: "#333333",
        marginTop: verticalScale(32)
    },
    submit: {
        flexDirection: "row",
        width: scale(320),
        marginHorizontal: "auto",
        height: verticalScale(45),
        borderRadius: scale(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: scale(8),
        paddingVertical: moderateVerticalScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(16)
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: scale(14),
        color: "#fff"
    },
})
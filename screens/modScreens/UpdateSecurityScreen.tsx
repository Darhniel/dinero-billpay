import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


export default function UpdateSecurityScreen({ navigation }: any) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUser] = useState({ pin: false, password: false });


    async function toggleSwitch() {
        setIsEnabled((previousState) => !previousState);
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
            <StatusBar style={'light'} translucent={true} hidden={false} />


            <View style={{ borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10), backgroundColor: "#fff", marginTop: verticalScale(32), width: scale(320), marginHorizontal: "auto" }}>
                <TouchableOpacity
                    style={{ flexDirection: "row", width: scale(288), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: verticalScale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(52) }}
                    onPress={() => { setUser(prevState => ({ ...prevState, pin: true })); setIsVisible(true); }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
                        <View style={{ width: scale(32), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(8), paddingVertical: moderateVerticalScale(8), borderRadius: scale(50) }}>
                            <FontAwesome name='unlock' color={"#2D264B"} size={14} />
                        </View>
                        <Text style={{
                            fontFamily: "DMSansBold",
                            fontSize: scale(16),
                            color: "#333",
                        }}>Reset Transaction PIN</Text>
                    </View>

                    <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(16) }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flexDirection: "row", width: scale(288), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: verticalScale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(52) }}
                    onPress={() => { setUser(prevState => ({ ...prevState, password: true })); setIsVisible(true); }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
                        <View style={{ width: scale(32), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(8), paddingVertical: moderateVerticalScale(8), borderRadius: scale(50) }}>
                            <FontAwesome name='lock' color={"#2D264B"} size={15} />
                        </View>
                        <Text style={{
                            fontFamily: "DMSansBold",
                            fontSize: scale(16),
                            color: "#333",
                        }}>Reset Password</Text>
                    </View>

                    <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(16) }} />
                </TouchableOpacity>

                <View
                    style={{ flexDirection: "row", width: scale(288), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: verticalScale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(52) }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
                        <View style={{ width: scale(32), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(8), paddingVertical: moderateVerticalScale(8), borderRadius: scale(50) }}>
                            <Image source={require('../../assets/images/faceId.png')} />
                        </View>
                        <Text style={{
                            fontFamily: "DMSansBold",
                            fontSize: scale(16),
                            color: "#333",
                        }}>Use Biometrics</Text>
                    </View>

                    <Switch
                        trackColor={{ false: '#ccc', true: '#1D38B4' }}
                        thumbColor={isEnabled ? '#fff' : '#fff'}
                        ios_backgroundColor="#ccc"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>

            <Modal isVisible={isVisible} animationIn={'bounceInUp'} animationInTiming={1000} style={{ justifyContent: "center" }}>
                <View style={[styles.modal, { alignItems: "center", flex: 1 / 3 }]}>
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        OTP Verification
                    </Text>
                    <Text style={styles.modalText}>
                        We have sent a verification code to your email
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setIsVisible(false);
                            if (user.pin) {
                                navigation.navigate("UpdateOTP", { user: user });
                            }
                            if (user.password) {
                                navigation.navigate("UpdateOTP", { user: user });
                            }
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Proceed
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    submitText: {
        fontFamily: "DMSans",
        fontSize: scale(16),
        color: "#fff"
    },
    modal: {
        flex: 1 / 4,
        backgroundColor: "#fff",
        paddingVertical: moderateVerticalScale(16),
        paddingHorizontal: moderateScale(16),
        justifyContent: "center",
        borderRadius: scale(20)
    },
    modalHeading: {
        fontFamily: "DMSansBold",
        textAlign: "center",
        fontSize: scale(20),
        color: "#333333"
    },
    modalText: {
        fontSize: scale(12),
        fontFamily: "DMSans",
        color: "#6A6666",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: 'auto',
        marginHorizontal: "auto",
        height: verticalScale(48),
        borderRadius: scale(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: scale(8),
        paddingVertical: moderateVerticalScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(24)
    },
})
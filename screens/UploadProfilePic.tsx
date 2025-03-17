import { TouchableOpacity, StyleSheet, Text, View, Image, SafeAreaView, Modal } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../utils';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type UploadProfilePicScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfilePicture'>


const UploadProfilePic: React.FC<UploadProfilePicScreenProps> = ({ navigation }) => {
    const [disabled, setDisabled] = useState(true);
    const [imageDetails, setImageDetails] = useState<{ imageSource: string, file: any }>({ imageSource: "", file: undefined })
    const [isVisible, setIsVisible] = useState({ isSuccess: false, isError: false, responseMessage: "" });

    const { isSuccess, isError, responseMessage } = isVisible;

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1
        });

        // console.log(result.assets[0])

        if (!result.canceled) {
            setImageDetails(prevState => ({ ...prevState, imageSource: result.assets[0].uri, file: result.assets[0] }));
            setDisabled(result.canceled)
        }

    };

    async function uploadPicture() {
        let formdata = new FormData();
        formdata.append('avatar',
            imageDetails.file,
            'avatar.jpg',
        );

        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/profile/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                body: formdata,
                redirect: 'follow'
            });
            const data = await response.json();

            if (response.ok) {
                setIsVisible({ isSuccess: true, isError: false, responseMessage: data.responseMessage });
            } else {
                setIsVisible({ isSuccess: false, isError: true, responseMessage: data.responseMessage });
            }
        } catch (error) {
            // console.log('Error: ', error);
            if (error == "TypeError: Network request failed") {
                setIsVisible({ isSuccess: false, isError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!" });
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.heading}>Let's put a face to your profile</Text>

            <TouchableOpacity style={{ marginVertical: verticalScale(24), backgroundColor: "grey", width: moderateScale(160), height: moderateVerticalScale(160), justifyContent: "center", marginHorizontal: "auto", borderRadius: scale(100) }} onPress={() => pickImage()}>
                <Image source={{ uri: imageDetails.imageSource }} width={moderateScale(160)} height={moderateVerticalScale(160)} style={{ borderRadius: scale(100) }} />
                {
                    disabled &&
                    <Feather name='camera' size={40} color={"black"} style={{ position: "absolute", bottom: moderateVerticalScale(5), right: moderateScale(12) }} onPress={() => pickImage()} />
                }
            </TouchableOpacity>

            <TouchableOpacity style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]} onPress={() => { uploadPicture() }} disabled={disabled} >
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Next</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal visible={isSuccess} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/shield.png')} style={{ width: scale(80), height: verticalScale(80) }} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Success
                        </Text>
                        <Text style={styles.modalText}>
                            {responseMessage}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Main", params: { screen: "Home" } }]
                                });
                            }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Go To Home
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={isError} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}></View>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                    <Image source={require('../assets/images/error-icon.png')} style={{ width: scale(80), height: verticalScale(80) }} />
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        Error!
                    </Text>
                    <Text style={styles.modalText}>
                        {responseMessage}
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setIsVisible(prevState => ({ ...prevState, isError: false }));
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Try Again
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontFamily: "DMSansBold",
        fontSize: scale(16),
        color: "#333",
        marginTop: scale(24),
        marginLeft: scale(24)
    },
    label: {
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(2),
        fontFamily: "DMSans",
        marginLeft: getNormalizedSizeWithPlatformOffset(24),
    },
    input: {
        borderStyle: "solid",
        borderWidth: getNormalizedSizeWithPlatformOffset(2),
        borderColor: "#D5D8DE",
        width: getNormalizedSizeWithPlatformOffset(345),
        marginHorizontal: "auto",
        height: getNormalizedVerticalSizeWithPlatformOffset(56),
        borderRadius: getNormalizedSizeWithPlatformOffset(8),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(8),
        padding: getNormalizedSizeWithPlatformOffset(8),
        fontFamily: "DMSans"
    },
    codeBox: {
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(8),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(8),
        width: getNormalizedSizeWithPlatformOffset(340),
        marginHorizontal: "auto"
    },
    codeHeading: {
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        fontFamily: "DMSansBold",
        color: "#333333",
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(32)
    },
    submit: {
        flexDirection: "row",
        width: getNormalizedSizeWithPlatformOffset(345),
        marginHorizontal: "auto",
        height: getNormalizedVerticalSizeWithPlatformOffset(56),
        borderRadius: getNormalizedSizeWithPlatformOffset(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: getNormalizedSizeWithPlatformOffset(12),
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(4),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(24),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(48)
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        color: "#fff"
    },
    modal: {
        flex: 1 / 4,
        backgroundColor: "#fff",
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(16),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(16),
        justifyContent: "center",
        borderRadius: scale(20)
    },
    modalHeading: {
        fontFamily: "DMSansBold",
        textAlign: "center",
        fontSize: getNormalizedSizeWithPlatformOffset(20),
        color: "#333333"
    },
    modalText: {
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        fontFamily: "DMSans",
        color: "#6A6666",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: "auto",
        marginHorizontal: "auto",
        height: getNormalizedVerticalSizeWithPlatformOffset(56),
        borderRadius: getNormalizedSizeWithPlatformOffset(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: getNormalizedSizeWithPlatformOffset(12),
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(4),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(24),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(24)
    },
});


export default UploadProfilePic;
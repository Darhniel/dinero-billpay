import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { Feather } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import dayjs from 'dayjs';
import { getLocales } from 'expo-localization';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function UpdatePersonalInfoScreen({ navigation }: any) {
    const [loading, setLoading] = useState(false);



    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    }

    const [date, setDate] = useState<DateType>(dayjs().subtract(18, 'year').add(1, 'hour'));
    const [user, setUser] = useState<{ email: string, firstName: string, lastName: string, phone: string, gender: string, dob: DateType }>({ email: "", firstName: "", lastName: "", phone: "", gender: "", dob: dayjs().subtract(18, 'year').format('DD/MM/YYYY') })
    const [disabled, setDisabled] = useState(true);
    const [visible, setVisible] = useState(false);
    const [isVisible, setIsVisible] = useState({ isSuccess: false, isError: false, responseMessage: "" });

    const { isSuccess, isError, responseMessage } = isVisible;

    useEffect(() => {
        async function userDetails() {
            try {
                const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
                    },
                    redirect: 'follow'
                });

                const data = await response.json();

                if (response.ok) {
                    setUser({
                        email: data.responseBody.email ?? "",
                        firstName: data.responseBody.firstName ?? "",
                        lastName: data.responseBody.lastName ?? "",
                        phone: data.responseBody.phone ?? "",
                        gender: data.responseBody.gender ?? "",
                        dob: data.responseBody.dob ?? ""
                    });

                } else {
                    // console.log('Registration failed:', data);
                }


            } catch (error) {
                console.error('Error:', error);
            }
        }
        userDetails();

    }, [])

    useEffect(() => {
        function validForm() {
            const { gender, phone } = user;

            return (
                phone.length === 11 &&
                (gender === "male" || gender === "female")
            );
        };

        setDisabled(!validForm())
    })

    async function updateUserDetails() {
        setLoading(true);

        const updatedUser = { dob: dayjs(date).format('YYYY-MM-DD'), phone: user.phone, gender: user.gender };

        try {
            const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/profile/update', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false);
                setIsVisible({ isError: false, isSuccess: true, responseMessage: data.responseMessage })

            } else {
                setLoading(false);
                setIsVisible({ isError: true, isSuccess: false, responseMessage: data.responseMessage })
            }
        } catch (error) {
            if (error == "TypeError: Network request failed") {
                setIsVisible({ isSuccess: false, isError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!" });
            }
        }
    }

    const data = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    return (
        <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.heading}>Kindly provide the required details</Text>

            <View style={{ marginVertical: verticalScale(16) }}>
                <View >
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        autoCorrect={false}
                        spellCheck={false}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={user.firstName}
                        readOnly
                    />
                </View>
                <View style={{ marginTop: verticalScale(12) }}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={user.lastName}
                        readOnly
                    />
                </View>
                <View style={{ marginTop: verticalScale(12) }}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        placeholder='Enter email address'
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={user.email}
                        readOnly
                    />
                </View>
                <View style={{ marginTop: verticalScale(12) }}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        placeholder='Enter phone number'
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        keyboardType={'number-pad'}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={user.phone}
                        onChangeText={number => setUser(prevState => ({ ...prevState, phone: number }))}
                        maxLength={11}
                    />
                </View>
                <View style={{ marginTop: verticalScale(12) }}>
                    <Dropdown
                        data={data}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        placeholder='Select your gender'
                        value={user.gender}
                        onChange={item => setUser(prevState => ({ ...prevState, gender: item.value }))}
                        style={styles.input}
                        placeholderStyle={{ fontFamily: "DMSans" }}
                        itemTextStyle={{ fontFamily: "DMSans" }}
                        selectedTextStyle={{ fontFamily: "DMSans" }}
                    />
                </View>

                <Text style={[styles.label, { marginTop: verticalScale(12), }]}>Date Of Birth</Text>
                <View style={{
                    width: scale(320),
                    marginHorizontal: "auto",
                }}
                >
                    <Text onPress={() => setVisible(true)} style={[styles.label, { marginTop: verticalScale(12), marginLeft: scale(8) }]}>{user.dob?.toLocaleString()}</Text>
                    {visible &&
                        <>
                            <DateTimePicker
                                locale={getLocales()[0].languageTag}
                                mode={"single"}
                                date={date}
                                maxDate={date}
                                onChange={(updatedDate) => { setUser(prevState => ({ ...prevState, dob: dayjs(updatedDate.date).add(1, "hour").format("DD/MM/YYYY") })); setDate(dayjs(updatedDate.date).add(1, 'hour')); setVisible(false); }}
                            />
                        </>
                    }
                </View>
            </View>

            <TouchableOpacity style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]} onPress={() => { updateUserDetails(); }} disabled={disabled} >
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal isVisible={loading} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator  size={48} color={'#1734B9'} />
                </View>
            </Modal>

            <Modal isVisible={isSuccess} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
                    <Image source={require('../../assets/images/shield.png')} style={{ width: scale(80), height: verticalScale(80) }} />
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
                            })
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Proceed
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
                    <Image source={require('../../assets/images/error-icon.png')} style={{ width: scale(80), height: verticalScale(80) }} />
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

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontFamily: "DMSans",
        fontSize: scale(12),
        color: "#333",
        marginTop: verticalScale(12),
        marginLeft: scale(24)
    },
    label: {
        fontSize: scale(12),
        fontFamily: "DMSans",
        marginLeft: scale(24),
    },
    input: {
        borderStyle: "solid",
        borderWidth: scale(1),
        borderColor: "#D5D8DE",
        width: scale(320),
        marginHorizontal: "auto",
        height: verticalScale(44),
        borderRadius: scale(8),
        marginTop: verticalScale(4),
        padding: moderateScale(8),
        fontFamily: "DMSans"
    },
    date: {
        fontFamily: "DMSans",
        backgroundColor: "transparent"
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
        gap: scale(12),
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(16)
    },
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
        borderRadius: scale(12),
    },
    modalHeading: {
        fontFamily: "DMSansBold",
        textAlign: "center",
        fontSize: scale(32),
        color: "#333333"
    },
    modalText: {
        fontSize: scale(14),
        fontFamily: "DMSans",
        color: "#333",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: "auto",
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
});
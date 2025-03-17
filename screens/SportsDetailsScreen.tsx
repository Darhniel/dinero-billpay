import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../utils';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-element-dropdown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';


type SportsDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'SportsDetails'>;


const SportsDetailsScreen: React.FC<SportsDetailsScreenProps> = ({ navigation, route }) => {
    const { image, name } = route.params;

    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    }

    const [user, setUser] = useState({ amount: "", meterNo: "", meterType: "", email: "", phone: "", decoderNo: "", decoderPackage: "", dataPlan: "", userId: "", image: image, name: name });
    const [disabled, setDisabled] = useState(true);

    function handlePhoneChange(text: string) {
        // Regular expression to allow only numbers
        if (/^\d*$/.test(text)) {
            setUser(prevState => ({ ...prevState, phone: text })); // Only set value if it's numeric
        }
    };
    function handleAmountChange(text: string) {
        // Regular expression to allow only numbers
        if (/^\d*$/.test(text)) {
            setUser(prevState => ({ ...prevState, amount: text })); // Only set value if it's numeric
        }
    };

    useEffect(() => {
        function validForm() {
            const { amount, phone } = user;
            return (
                amount.match(/^[0-9]+$/) &&
                phone.match(/^[0-9]+$/) &&
                phone.length === 10 &&
                amount.length !== 1
            )
        };

        setDisabled(!validForm())
    });

    return (
        <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">
            <StatusBar style={'light'} translucent={true} hidden={false} />
            <View>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    placeholder='NGN | Enter Amount'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    spellCheck={false}
                    onFocus={(event) => {
                        scrollToInput(event.target);
                    }}
                    keyboardType='number-pad'
                    value={user.amount}
                    onChangeText={handleAmountChange}
                />
            </View>

            <View style={{ marginTop: getNormalizedVerticalSizeWithPlatformOffset(16) }}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    placeholder='Enter account number'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCorrect={false}
                    spellCheck={false}
                    onFocus={(event) => {
                        scrollToInput(event.target);
                    }}
                    maxLength={11}
                    keyboardType='phone-pad'
                    value={user.phone}
                    onChangeText={handlePhoneChange}
                />
            </View>

            <TouchableOpacity
                style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]}
                onPress={() => { navigation.navigate('Summary', { user: user }) }}
                disabled={disabled}
            >
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Proceed</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
        </KeyboardAwareScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getNormalizedVerticalSizeWithPlatformOffset(48),
        backgroundColor: "#fff"
    },
    mainHeading: {
        fontFamily: "DMSansBold",
        fontSize: getNormalizedSizeWithPlatformOffset(32),
        marginLeft: getNormalizedSizeWithPlatformOffset(24),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(48)
    },
    text: {
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        marginLeft: getNormalizedSizeWithPlatformOffset(24),
        fontFamily: "DMSans",
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(16),
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(32)
    },
    label: {
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(2),
        fontFamily: "DMSansBold",
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
    info: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(12),
        color: "#6A6666",
        marginLeft: getNormalizedSizeWithPlatformOffset(24),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(8)
    },
    forgotPassword: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        color: "#6A6666",
        textDecorationLine: "underline",
        marginLeft: getNormalizedSizeWithPlatformOffset(24),
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(32),
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
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(24)
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        color: "#fff"
    },
    signUp: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        textAlign: "center",
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(48),
        justifyContent: "center",
        color: "#6A6666"
    },
    link: {
        color: "#333",
        textDecorationLine: "underline",
        fontFamily: "DMSansBold",
        textAlign: "center",
        justifyContent: "center",
        fontSize: getNormalizedSizeWithPlatformOffset(14)
    },
    modal: {
        flex: 1 / 4,
        backgroundColor: "#fff",
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(16),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(16),
        justifyContent: "center"
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
    verifyBox: {
        backgroundColor: "#B6DEF6",
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(8),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(8),
        width: getNormalizedSizeWithPlatformOffset(340)
    },
});


export default SportsDetailsScreen;
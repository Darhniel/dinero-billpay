import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type UtilityDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'UtilityDetails'>;

const UtilityDetailsScreen: React.FC<UtilityDetailsScreenProps> = ({ navigation, route }) => {
    const { filtered } = route.params;
    const {logo, network, } = filtered[0];

    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    }
 
    const [user, setUser] = useState({ amount: "", meterNo: "", meterType: "", email: "", phone: "", decoderNo: "", decoderPackage: "", dataPlan: "", userId: "", image: logo, name: network, transaction: "UTILITY"});
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

    function handleMeterChange(text: string) {
        // Remove all spaces and non-digit characters
        const rawText = text.replace(/\D/g, '');

        // Limit to 16 digits
        const limitedText = rawText.slice(0, 16);

        // Add space after every 4 digits
        const formattedText = limitedText.replace(/(.{4})/g, '$1 ');

        // setValue(formattedText.trim());
        setUser(prevState => ({ ...prevState, meterNo: formattedText.trim() }));
    }

    const data = filtered[0].plans;

    useEffect(() => {
        function validForm() {
            const { email, meterNo, meterType, amount, phone } = user;
            return (
                email.length !== 1 &&
                email.includes('@') &&
                email.includes('.') &&
                phone.length === 11 &&
                amount.length !== 1 &&
                meterNo.length === 12 &&
                meterType !== "" &&
                amount.match(/^[0-9]+$/) &&
                phone.match(/^[0-9]+$/)
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
                    placeholder='NGN | 10000'
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

            <View style={{ marginTop: verticalScale(8) }}>
                <Text style={styles.label}>Meter Number</Text>
                <TextInput
                    placeholder='1234 5678 90'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCorrect={false}
                    spellCheck={false}
                    onFocus={(event) => {
                        scrollToInput(event.target);
                    }}
                    keyboardType='number-pad'
                    maxLength={12}
                    value={user.meterNo}
                    onChangeText={handleMeterChange}
                />
            </View>

            <View style={{ marginTop: verticalScale(8) }}>
                <Text style={styles.label}>Meter Type</Text>
                <Dropdown
                    data={data}
                    maxHeight={300}
                    labelField={'name'}
                    valueField={'id'}
                    placeholder='Select meter type'
                    value={user.meterType}
                    onChange={item => setUser(prevState => ({ ...prevState, meterType: item.name, userId: item.id }))}
                    style={styles.input}
                    placeholderStyle={{ fontFamily: "DMSans" }}
                    itemTextStyle={{ fontFamily: "DMSans" }}
                    selectedTextStyle={{ fontFamily: "DMSans" }}
                />
            </View>

            <View style={{ marginTop: verticalScale(8) }}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    placeholder='Enter email address'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    spellCheck={false}
                    value={user.email}
                    onChangeText={text => setUser(prevState => ({ ...prevState, email: text }))}
                />
            </View>

            <View style={{ marginTop: verticalScale(8) }}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    placeholder='08123456789'
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
        paddingTop: verticalScale(32),
        backgroundColor: "#fff"
    },
    
    label: {
        fontSize: scale(12),
        marginBottom: verticalScale(2),
        fontFamily: "DMSansBold",
        marginLeft: scale(24),
    },

    input: {
        borderStyle: "solid",
        borderWidth: scale(1),
        borderColor: "#D5D8DE",
        width: scale(320),
        marginHorizontal: "auto",
        height: verticalScale(45),
        borderRadius: scale(8),
        marginTop: verticalScale(4),
        padding: moderateScale(8),
        fontFamily: "DMSans"
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
        marginTop: scale(24)
    },

    submitText: {
        fontFamily: "DMSans",
        fontSize: scale(12),
        color: "#fff"
    },
});

export default UtilityDetailsScreen;
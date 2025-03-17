import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type EntertainmentDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'EntertainmentDetails'>;

const EntertainmentDetailsScreen: React.FC<EntertainmentDetailsScreenProps> = ({ navigation, route }) => {
    const { filtered } = route.params;

    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    }

    const [user, setUser] = useState({ amount: "", meterNo: "", meterType: "", decoderNo: "", decoderPackage: "", email: "", phone: "", userId: "", image: filtered[0].logo, name: filtered[0].network, dataPlan: "", transaction: "ENTERTAINMENT" });
    const [disabled, setDisabled] = useState(true);
    const [data, setData] = useState([{ amount: "", id: "", name: "" }]);

    
    useEffect(() => {
        setData(filtered[0].plans)
    }, [])

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
        let limitedText;

        switch (filtered[0].network) {
            case 'STARTIMES':
                limitedText = rawText.slice(0, 11)
                break;
        
            default:
                limitedText = rawText.slice(0, 10)
                break;
        }

        // Add space after every 4 digits
        const formattedText = limitedText.replace(/(.{4})/g, '$1 ');

        // setValue(formattedText.trim());
        setUser(prevState => ({ ...prevState, decoderNo: formattedText.trim() }));
    };

    useEffect(() => {
        function validForm() {
            const { email, decoderNo, phone, decoderPackage } = user;
            return (
                email.length !== 1 &&
                email.includes('@') &&
                email.includes('.') &&
                phone.length === 11 &&
                decoderNo.length !== 1 &&
                phone.match(/^[0-9]+$/) &&
                decoderPackage.length !== 1
            )
        };

        setDisabled(!validForm())
    });

    return (
        <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">
            <StatusBar style={'light'} translucent={true} hidden={false} />
            <View>
                <Text style={styles.label}>Decoder Number</Text>
                <TextInput
                    placeholder='SmartCard Number'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    maxLength={filtered[0].network === "STARTIMES" ? 13 : 12}
                    autoCapitalize='none'
                    autoCorrect={false}
                    spellCheck={false}
                    onFocus={(event) => {
                        scrollToInput(event.target);
                    }}
                    keyboardType='number-pad'
                    value={user.decoderNo}
                    onChangeText={handleMeterChange}
                />
            </View>

            <View style={{ marginTop: verticalScale(12) }}>
                <Text style={styles.label}>Package</Text>
                <Dropdown
                    data={data}
                    maxHeight={300}
                    labelField={'name'}
                    valueField={'id'}
                    placeholder='Select Package'
                    value={user.decoderPackage}
                    onChange={(item) => setUser(prevState => ({ ...prevState, decoderPackage: item.name, amount: item.amount, userId: item.id }))}
                    style={styles.input}
                    placeholderStyle={{ fontFamily: "DMSans" }}
                    itemTextStyle={{ fontFamily: "DMSans" }}
                    selectedTextStyle={{ fontFamily: "DMSans" }}
                />
            </View>

            <View style={{ marginTop: verticalScale(12) }}>
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

            <View style={{ marginTop: verticalScale(12) }}>
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
                onPress={() => { 
                    navigation.navigate('Summary', {user: user});
                }}
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

export default EntertainmentDetailsScreen;
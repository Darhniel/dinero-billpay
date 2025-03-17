import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function CardScreen({ navigation }: any) {
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    }

    const [disabled, setDisabled] = useState(true);

    const [card, setCard] = useState<{ cardNumber: string, expDate: string, cvv: string }>({ cardNumber: "", expDate: "", cvv: "" });

    useEffect(() => {
        function validForm() {
            const { cardNumber, expDate, cvv } = card;

            return (
                cardNumber.length === 16 &&
                expDate.length === 5 &&
                cvv.length === 3
            );
        };

        setDisabled(!validForm())
    })

    function numberCardDetails() {
        const { cardNumber, expDate, cvv } = card;
        const cardDetails = { longNumber: Number(cardNumber), date: Number(expDate), cvv: Number(cvv) }
        console.log(cardDetails)
    }

    return (
        <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.heading}>Kindly link a debit card</Text>

            <View style={styles.verifyBox}>
                <Feather
                    name='info'
                    color={"#0C6599"}
                    style={{ marginBottom: verticalScale(8) }}
                />
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    You can use the linked card for transactions and payments.
                </Text>
            </View>

            <View style={{ alignItems: "center", marginVertical: verticalScale(24) }}>
                <Image source={require('../assets/images/card.png')} />
            </View>

            <View>
                <View >
                    <Text style={styles.label}>Long Digit Card Number</Text>
                    <TextInput
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        autoCorrect={false}
                        spellCheck={false}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={card.cardNumber}
                        onChangeText={text => setCard(prevState => ({ ...prevState, cardNumber: text }))}
                        keyboardType={'number-pad'}
                        maxLength={16}
                    />
                </View>
                <View style={{ marginTop: verticalScale(12) }}>
                    <Text style={styles.label}>Exp. Date</Text>
                    <TextInput
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={card.expDate}
                        onChangeText={text => setCard(prevState => ({ ...prevState, expDate: text }))}
                        keyboardType={'number-pad'}
                        maxLength={5}
                    />
                </View>
                <View style={{ marginTop: verticalScale(12) }}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput
                        placeholder='CVV'
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={card.cvv}
                        secureTextEntry
                        onChangeText={text => setCard(prevState => ({ ...prevState, cvv: text }))}
                        keyboardType={'number-pad'}
                        maxLength={3}
                    />
                </View>
            </View>

            <TouchableOpacity style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]} onPress={() => { navigation.navigate('ProfilePicture'); numberCardDetails() }} disabled={disabled} >
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Next</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
        </KeyboardAwareScrollView>
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
    verifyBox: {
        marginHorizontal: "auto",
        backgroundColor: "#B6DEF6",
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(320),
        marginTop: verticalScale(8)
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
        marginHorizontal: "auto",
        borderRadius: scale(8),
        marginTop: verticalScale(4),
        padding: moderateScale(8),
        fontFamily: "DMSans",
        width: scale(320),
        height: verticalScale(45),
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
        marginTop: verticalScale(12)
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: scale(16),
        color: "#fff"
    },
})
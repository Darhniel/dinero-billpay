import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../utils';
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function SportsScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <View style={{ backgroundColor: '#fff', borderRadius: getNormalizedSizeWithPlatformOffset(10), width: getNormalizedSizeWithPlatformOffset(330), marginHorizontal: "auto", marginTop: getNormalizedVerticalSizeWithPlatformOffset(40) }}>
                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "1960bet", name: "1960 Bet" }) }}>
                    <Image source={require('../assets/images/1960bet.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>1960 Bet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "accessbet", name: "Access Bet" }) }}>
                    <Image source={require('../assets/images/accessbet.png')} />
                    <Text style={styles.itemText}>Access Bet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "bet9ja", name: "Bet9ja" }) }}>
                    <Image source={require('../assets/images/bet9ja.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>Bet9ja</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "betking", name: "Bet King" }) }}>
                    <Image source={require('../assets/images/betking.png')} />
                    <Text style={styles.itemText}>Bet King</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "megabet", name: "MegaBet" }) }}>
                    <Image source={require('../assets/images/megabet.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>MegaBet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "merrybet", name: "Merrybet Gold" }) }}>
                    <Image source={require('../assets/images/merrybet.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>Merrybet Gold</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "nairabet", name: "Naira Bet" }) }}>
                    <Image source={require('../assets/images/nairabet.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>Naira Bet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "sporty", name: "Sporty Bet" }) }}>
                    <Image source={require('../assets/images/sportybet.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>Sporty Bet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, {paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12)}]} onPress={() => { navigation.navigate('SportsDetails', { image: "superior", name: "Superior Bet" }) }}>
                    <Image source={require('../assets/images/superorbet.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>Superior Bet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, { borderBottomWidth: 0, paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(12) }]} onPress={() => { navigation.navigate('SportsDetails', { image: "winners", name: "Winners Golden Bet" }) }}>
                    <Image source={require('../assets/images/winnersbet.png')} style={{width: getNormalizedSizeWithPlatformOffset(40), height: getNormalizedVerticalSizeWithPlatformOffset(40)}} />
                    <Text style={styles.itemText}>Winners Golden Bet</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: scale(1.5),
        borderColor: '#B2AEB0',
        paddingHorizontal: moderateScale(10),
        gap: scale(8)
    },
    itemText: {
        fontFamily: 'DMSansBold',
        fontSize: scale(12),
        color: '#272525',
    }
})
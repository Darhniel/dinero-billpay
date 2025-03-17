import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'

export default function BillsSkeleton() {
    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        function loopAnimation() {
            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: false,
                }),
            ).start(() => {
                animatedValue.setValue(0);
                loopAnimation()
            });
        };

        loopAnimation();
    })

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-350, 350]
    });

    function AnimatedGradient({ style }: any) {
        return (
            <Animated.View style={[style, { transform: [{ translateX }] }]}>
                <LinearGradient
                    colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
        )
    }

    function SkeletonItem() {
        return (
            <View style={styles.item}>
                <View style={styles.logoPlaceholder}>
                    <AnimatedGradient style={{ width: "3000%", flex: 1 }} />
                </View>

                <View style={styles.textPlaceholder}>
                    <AnimatedGradient style={{ width: "300%", flex: 1 }} />
                </View>

            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#fff', borderRadius: getNormalizedSizeWithPlatformOffset(10), width: getNormalizedSizeWithPlatformOffset(330), marginHorizontal: "auto", marginTop: getNormalizedVerticalSizeWithPlatformOffset(40) }}>
            {
                [...Array(6)].map((_, index) => (
                    <SkeletonItem key={index} />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: getNormalizedSizeWithPlatformOffset(1.5),
        borderColor: '#B2AEB0',
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(10),
        gap: getNormalizedSizeWithPlatformOffset(12)
    },
    logoPlaceholder: {
        width: getNormalizedSizeWithPlatformOffset(40),
        height: getNormalizedSizeWithPlatformOffset(40),
        borderRadius: getNormalizedSizeWithPlatformOffset(100),
        overflow: "hidden",
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(8),
    },
    textPlaceholder: {
        width: getNormalizedSizeWithPlatformOffset(105),
        height: getNormalizedVerticalSizeWithPlatformOffset(10),
        borderRadius: getNormalizedSizeWithPlatformOffset(4),
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(4),
        overflow: "hidden"
    },
})
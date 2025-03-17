import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'

export default function skeletonElement() {
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
                
                <View style={{ width: getNormalizedSizeWithPlatformOffset(147), borderWidth: getNormalizedSizeWithPlatformOffset(2), borderColor: "#D5D5D5" }}></View>
                
                <View style={styles.amountPlaceholder}>
                    <AnimatedGradient style={{ width: "300%", flex: 1 }} />

                </View>

                <View style={styles.textPlaceholder}>
                    <AnimatedGradient style={{ width: "300%", flex: 1 }} />
                </View>

                <View style={styles.textPlaceholder}>
                    <AnimatedGradient style={{ width: "300%", flex: 1 }} />

                </View>

            </View>
        )
    }

    return (
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: getNormalizedSizeWithPlatformOffset(345),
                    marginHorizontal: "auto",
                    rowGap: getNormalizedSizeWithPlatformOffset(20),
                    columnGap: getNormalizedSizeWithPlatformOffset(20),
                    marginTop: getNormalizedVerticalSizeWithPlatformOffset(16)
                }}
            >
                {
                    [...Array(6)].map((_, index) => (
                        <SkeletonItem key={index} />
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        width: getNormalizedSizeWithPlatformOffset(162),
        borderRadius: getNormalizedSizeWithPlatformOffset(10),
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(10),
        gap: getNormalizedVerticalSizeWithPlatformOffset(12),
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
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
    amountPlaceholder: {
        height: getNormalizedVerticalSizeWithPlatformOffset(24),
        width: getNormalizedSizeWithPlatformOffset(64),
        borderRadius: getNormalizedSizeWithPlatformOffset(4),
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(0),
        overflow: "hidden"
    },
    gradient: {
        flex: 1
    }
})
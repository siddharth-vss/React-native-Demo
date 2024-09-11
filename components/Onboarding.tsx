import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import slider from '../slider'
import OnboardingItem from './OnboardingItem'
import { NavigationProp } from '@react-navigation/native';

// import AppIntroSlider from 'react-native-app-intro-slider';

const { width } = Dimensions.get('window');
const Onboarding = ({navigation }: {navigation : NavigationProp<any>}) => {

    // const scrollX = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = ((event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    });
    const handleSkip = () => {
        // flatListRef.current?.scrollToEnd({ animated: true });
        flatListRef.current?.scrollToIndex({ index : currentIndex + 1 , animated: true });
    };

    const handleDone = () => {
        navigation.navigate('Login');
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={slider}
                renderItem={({ item }) => <OnboardingItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={handleScroll}
                ref={flatListRef}
                keyExtractor={(item) => item.id}
            />


            <View style={styles.pagination}>
                {slider.map((_, index) => (
                    <View
                        key={index}

                    >
                        <TouchableOpacity style={[
                            styles.dot,
                            currentIndex === index ? styles.dotActive : styles.dotInactive,
                        ]}
                            onPress={() => { flatListRef.current?.scrollToIndex({ index, animated: true }); }}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.bottomContainer}>
                {currentIndex < slider.length - 1 ? (
                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleDone}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9155fd',
    },
    buttonCircle: {
        // width: 40,
        height: 40,
        // // backgroundColor: 'rgba(0, 0, 0, .2)',
        // // borderRadius: 20,
        justifyContent: 'center',
        marginRight: 0,
        // alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    dotActive: {
        backgroundColor: 'blue',
    },
    dotInactive: {
        backgroundColor: 'gray',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 50,
        right: 20,
    },
    buttonText: {
        fontSize: 18,
        color: 'blue',
        fontWeight: 'bold',
    },

})
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const WelcomeScreen = ({ username, setIsLoggedIn }) => {
    
  // TailwindCSS styles with dark/light mode
  const containerStyle = `h-screen flex justify-center items-center p-4 bg-white dark:bg-black`;
  const textStyle = `text-xl mb-4 text-black dark:text-white`;
  const buttonStyle = `w-full px-4 py-2 rounded mt-4 bg-blue-500 dark:bg-white`;
  const buttonText = `text-center text-white dark:text-black`;
  const handleWelcomeBack = () => {
    setIsLoggedIn(false);
  };
  return (
    <View className={containerStyle}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.centeredView]}
      >
        <Text className={textStyle}>Hi, {username}</Text>
        <TouchableOpacity className={buttonStyle} onPress={handleWelcomeBack}>
          <Text className={buttonText}>Go Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    alignItems: "center",
  },
});

export default WelcomeScreen;

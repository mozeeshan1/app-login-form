import React, { useEffect, useRef } from "react";
import { View, Animated, useColorScheme } from "react-native";

interface InitialAnimationProps {
  onAnimationEnd: () => void;
}

const InitialAnimation: React.FC<InitialAnimationProps> = ({
  onAnimationEnd,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scheme = useColorScheme();

  const containerStyle = `flex-1 justify-center items-center p-4 ${
    scheme === "dark" ? "bg-black" : "bg-white"
  }`;

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to opacity: 1 (opaque)
      duration: 1000, // Duration of the animation
      useNativeDriver: true,
    }).start(() => {
      // After fade-in completes, start the fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0, // Animate to opacity: 0 (transparent)
        duration: 1000, // Duration of the animation
        useNativeDriver: true,
      }).start(onAnimationEnd); // Call onAnimationEnd after the fade-out animation
    });
  }, [fadeAnim, onAnimationEnd]);

  return (
    <View className={containerStyle}>
      <Animated.Image
        source={require("../data/logo.png")}
        style={{ opacity: fadeAnim, resizeMode: "contain" }}
        className="w-1/2 "
      />
    </View>
  );
};

export default InitialAnimation;

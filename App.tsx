import React, { useState } from "react";
import LoginForm from "./src/login-form";
import InitialAnimation from "./src/opening-animation";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const App = () => {
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false);

  const onAnimationEnd = () => {
    setIsInitialAnimationDone(true);
  };

  return (
    <View className={"bg-white dark:bg-black"}>
      {!isInitialAnimationDone ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className={"block self-center w-full h-full"}
        >
          <InitialAnimation onAnimationEnd={onAnimationEnd} />
        </Animated.View>
      ) : (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className={"block self-center w-full h-full"}
        >
          <LoginForm />
        </Animated.View>
      )}
    </View>
  );
};

export default App;

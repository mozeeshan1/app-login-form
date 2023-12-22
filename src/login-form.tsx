import React, { useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import WelcomeScreen from "./welcome-screen";
import LoginScreen from "./login-screen";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const containerStyle = `self-center w-full h-full bg-white dark:bg-black`;
  return (
    <View className={containerStyle}>
      {!isLoggedIn && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
        >
          <LoginScreen
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Animated.View>
      )}
      {isLoggedIn && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
        >
          <WelcomeScreen username={username} setIsLoggedIn={setIsLoggedIn} />
        </Animated.View>
      )}
    </View>
  );
};


export default LoginForm;

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  useColorScheme,
  StyleSheet,
  Alert,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  StretchInY,
  StretchOutY,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const LoginScreen = ({
  username,
  setUsername,
  password,
  setPassword,
  setIsLoggedIn,
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    symbols: false,
    numbers: false,
    alphabets: false,
  });

  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 6,
      symbols: /\W|_/.test(password),
      numbers: /\d/.test(password),
      alphabets: /[a-zA-Z]/.test(password),
    });
  }, []);

  const scheme = useColorScheme();
  const updatePassword = (password: string) => {
    setPassword(password);
    setPasswordCriteria({
      length: password.length >= 6,
      symbols: /\W|_/.test(password),
      numbers: /\d/.test(password),
      alphabets: /[a-zA-Z]/.test(password),
    });
  };
  const handleLogin = () => {
    if (username.length > 0 && password.length > 0) {
      setIsLoggedIn(true);
    } else if (username.length === 0) {
      Alert.alert("Username not entered", "Please enter your username.", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Password not entered", "Please enter your password.", [
        { text: "OK" },
      ]);
    }
  };
  const handleFinalRegsiter = () => {
    const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
    if (allCriteriaMet && username.length > 0) {
      setIsLoggedIn(true);
    } else if (username.length === 0) {
      Alert.alert("Username not entered", "Please enter a username.", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert(
        "Password Criteria Not Met",
        "Please ensure your password meets all the required criteria.",
        [{ text: "OK" }]
      );
    }
  };
  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleRegisterBack = () => {
    setIsRegistering(false);
  };

  // TailwindCSS styles with dark/light mode
  const containerStyle = `h-screen flex justify-center items-center p-4  bg-white dark:bg-black`;
  const inputStyle = `min-w-full border border-gray-300  px-4 py-2 rounded mb-4 bg-white text-black dark:bg-gray-800 dark:text-white`;
  const buttonStyle = `min-w-full px-4 py-2 rounded mt-4 bg-blue-500 dark:bg-white`;
  const buttonText = `text-center text-white dark:text-black`;
  const textStyle = `text-center text-xl mb-4 text-black dark:text-white`;
  const textStyleSmall = `text-m mb-2 text-black dark:text-white`;
  const criteriaText = `text-sm mb-2 text-red-600`;
  const criteriaMetText = "text-green-500";

  return (
    <View className={containerStyle}>
      {isRegistering && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className={"block absolute top-10 left-5"}
        >
          <TouchableOpacity onPress={handleRegisterBack}>
            <Svg height="48" viewBox="0 -960 960 960" width="48">
              <Path
                d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
                fill={scheme == "dark" ? "white" : "black"}
              />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Animated.View entering={FadeIn} exiting={FadeOut} className={"block"}>
        <Text className={textStyle}>Login</Text>
        <TextInput
          className={inputStyle}
          placeholder="Username"
          placeholderTextColor={scheme === "dark" ? "#ccc" : "#333"}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className={inputStyle}
          placeholder="Password"
          placeholderTextColor={scheme === "dark" ? "#ccc" : "#333"}
          value={password}
          onChangeText={updatePassword}
          secureTextEntry
        />
      </Animated.View>
      {isRegistering && (
        <Animated.View entering={StretchInY} exiting={StretchOutY}>
          <View className="self-start px-6 w-screen">
            <Text className={textStyleSmall}>Your password must contain:</Text>
            <Text
              className={`${criteriaText} ${
                passwordCriteria.length && criteriaMetText
              }`}
            >
              {passwordCriteria.length ? (
                <Svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <Path
                    d="M4.89571 10L0 5.25988L1.22393 4.07484L4.89571 7.62994L12.7761 0L14 1.18503L4.89571 10Z"
                    fill="green"
                  />
                </Svg>
              ) : (
                <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <Path
                    d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                    fill="red"
                  />
                </Svg>
              )}
              {"\t\t"}Atleast 6 characters
            </Text>

            <Text
              className={`${criteriaText} ${
                passwordCriteria.symbols && criteriaMetText
              }`}
            >
              {passwordCriteria.symbols ? (
                <Svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <Path
                    d="M4.89571 10L0 5.25988L1.22393 4.07484L4.89571 7.62994L12.7761 0L14 1.18503L4.89571 10Z"
                    fill="green"
                  />
                </Svg>
              ) : (
                <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <Path
                    d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                    fill="red"
                  />
                </Svg>
              )}
              {"\t\t"}Symbols
            </Text>
            <Text
              className={`${criteriaText} ${
                passwordCriteria.numbers && criteriaMetText
              }`}
            >
              {passwordCriteria.numbers ? (
                <Svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <Path
                    d="M4.89571 10L0 5.25988L1.22393 4.07484L4.89571 7.62994L12.7761 0L14 1.18503L4.89571 10Z"
                    fill="green"
                  />
                </Svg>
              ) : (
                <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <Path
                    d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                    fill="red"
                  />
                </Svg>
              )}
              {"\t\t"}Numbers
            </Text>
            <Text
              className={`${criteriaText} ${
                passwordCriteria.alphabets && criteriaMetText
              }`}
            >
              {passwordCriteria.alphabets ? (
                <Svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <Path
                    d="M4.89571 10L0 5.25988L1.22393 4.07484L4.89571 7.62994L12.7761 0L14 1.18503L4.89571 10Z"
                    fill="green"
                  />
                </Svg>
              ) : (
                <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <Path
                    d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                    fill="red"
                  />
                </Svg>
              )}
              {"\t\t"}Alphabets
            </Text>
          </View>
        </Animated.View>
      )}
      {isRegistering && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <TouchableOpacity
            className={buttonStyle}
            onPress={handleFinalRegsiter}
          >
            <Text className={buttonText}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {!isRegistering && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <TouchableOpacity className={buttonStyle} onPress={handleLogin}>
            <Text className={buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-4" onPress={handleRegister}>
            <Text className="text-center text-blue-500 text-m">Register</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default LoginScreen;

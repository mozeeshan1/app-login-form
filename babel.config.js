module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel", // Ensure this line is present
      "react-native-reanimated/plugin",
    ],
  };
};

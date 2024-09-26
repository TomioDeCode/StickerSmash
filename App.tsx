import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";

// Components
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

const PLaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageViewer placeholderImageSource={PLaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" />
        <Button label="Use This Photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});

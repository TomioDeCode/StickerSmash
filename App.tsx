import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Depends
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

// Components
import CircleButton from "./components/ellements/CircleButton";
import EmojiSticker from "./components/fragments/EmojiSticker";
import ImageViewer from "./components/ellements/ImageViewer";
import EmojiPicker from "./components/ellements/EmojiPicker";
import IconButton from "./components/fragments/IconButton";
import EmojiList from "./components/ellements/EmojiList";
import Button from "./components/ellements/Button";

const PLaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null || String);
  const [showAppOptions, setShowAppOptions] = useState<Boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState(null || String);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {};

  return (
    <GestureHandlerRootView style={styles.container}>
      {showAppOptions ? (
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PLaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
          <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
            <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
          </EmojiPicker>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use This Photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
    right: 25,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { StyleSheet, View, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Depends
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import domtoimage from "dom-to-image";

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
  // State
  const [selectedImage, setSelectedImage] = useState(null || String);
  const [showAppOptions, setShowAppOptions] = useState<Boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState(null || String);

  // Ref
  const imageRef = useRef<undefined | any>();

  // Permision
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

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

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);

        if (localUri) {
          alert("Saved!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {showAppOptions ? (
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              placeholderImageSource={PLaceholderImage}
              selectedImage={selectedImage}
            />
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>
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
      <StatusBar style="light" />
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

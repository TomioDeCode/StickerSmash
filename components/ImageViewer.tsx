import { StyleSheet, Image } from "react-native";

interface ImageURL {
  placeholderImageSource: {};
}

export default function ImageViewer({ placeholderImageSource }: ImageURL) {
  return <Image source={placeholderImageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

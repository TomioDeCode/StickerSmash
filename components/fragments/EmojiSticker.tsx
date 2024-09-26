import { View, Image } from "react-native";

interface ImageProperties {
  imageSize: number;
  stickerSource: {};
}

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: ImageProperties) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}

import { TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../assets/constants/theme";

export default function ChatXChango({ positionStyle, imageStyle }) {
  return (
    <TouchableOpacity style={[styles.postBtn, positionStyle]}>
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={1500}
      >
        <Image
          source={require("../assets/images/XChangoChat.png")}
          style={imageStyle}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postBtn: {
    backgroundColor: COLORS.mainBackgroundColor,
    borderRadius: 28,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
});

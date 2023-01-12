import {Image, SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';
import {LogoIcon} from '../../static/constans';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  height: number;
  image?: string;
  style?: ViewStyle;
}

function Hero({image, height, children, style}: Props): JSX.Element {
  return (
    <View style={[style, {height}]}>
      <SafeAreaView style={[styles.absolute, styles.fadedImage]}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  fadedImage: {
    // backgroundColor: 'rgba(0,0,0,0.7)',
  },
});

export default Hero;

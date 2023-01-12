import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Hero from '../components/Hero';
import EmailPassword from '../auth-providers/EmailPassword';
import {LogoIcon} from '../../static/constans';

function SignIn() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <Image style={styles.icon} source={LogoIcon} />
        <Text style={styles.title}>Log in to woorkroom</Text>
      </View>
      <Hero height={490}>
        <EmailPassword />
      </Hero>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    textTransform: 'capitalize',
    color: '#1F1D1D',
    marginTop: 110,
  },

  button: {
    marginVertical: 5,
    width: 300,
  },
  divider: {
    width: 300,
    marginVertical: 20,
    height: StyleSheet.hairlineWidth,
  },
});

export default SignIn;

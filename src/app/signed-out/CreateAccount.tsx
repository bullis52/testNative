import {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HelperText, TextInput, useTheme} from 'react-native-paper';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useAlerts} from 'react-native-paper-alerts';

import {useAppSettings} from '../components/AppSettings';
import {LogoIcon} from '../../static/constans';
import {useLinkTo} from '@react-navigation/native';

function CreateAccount(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const Alert = useAlerts();

  const [help, setHelp] = useState<string>('');
  const theme = useTheme();
  const appSettings = useAppSettings();
  const linkTo = useLinkTo();

  useEffect(() => {
    if (password === confirm) {
      setHelp('');
    } else if (password && confirm && password !== confirm) {
      setHelp(appSettings.t('passwordsDoNotMatch'));
    }
  }, [password, confirm, appSettings]);

  async function handleCreate() {
    try {
      setLoading(true);
      const credential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      credential.user.sendEmailVerification();
    } catch (e) {
      setLoading(false);
      const error = e as FirebaseAuthTypes.PhoneAuthError;
      Alert.alert(
        appSettings.t('createAccountError'),
        appSettings.t(error.code ?? 'unknownError'),
        [{text: appSettings.t('OK')}],
      );
    }
  }

  const maskTheme = {
    colors: {
      background: 'transparent',
      accent: theme.colors.background,
    },
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container2}>
        <Image style={styles.icon} source={LogoIcon} />
        <Text style={styles.title}>Sign Up To woorkroom</Text>
      </View>
      <View style={{height: 510}}>
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
          ]}>
          <TextInput
            style={styles.input}
            label={'Your name'}
            value={name}
            onChangeText={setName}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            autoFocus={true}
            theme={maskTheme}
          />
          <TextInput
            style={styles.input}
            label={appSettings.t('emailLabel')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            autoFocus={true}
            theme={maskTheme}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            label={appSettings.t('passwordLabel')}
            value={password}
            onChangeText={setPassword}
            theme={maskTheme}
            autoComplete="password"
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            label={appSettings.t('createAccountPasswordConfirmLabel')}
            value={confirm}
            theme={maskTheme}
            error={!!confirm && password !== confirm}
            onChangeText={setConfirm}
            autoComplete="password"
          />
          <HelperText type="error" visible={!!help}>
            {help}
          </HelperText>
          <TouchableOpacity
            style={styles.signinButton}
            onPress={() => (loading ? null : handleCreate())}>
            <Text style={{}}>Next</Text>
          </TouchableOpacity>
          <View style={styles.containerNew}>
            <Text style={styles.create}>Have Account?</Text>
            <TouchableOpacity
              onPress={() => {
                linkTo('/');
              }}>
              <Text style={{color: '#FFC612'}}> Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    textTransform: 'capitalize',
    color: '#1F1D1D',
    marginTop: 110,
  },
  input: {
    marginVertical: 10,
  },
  signinButton: {
    backgroundColor: '#FFC612',
    borderRadius: 20,
    alignSelf: 'center',
    width: 365,
    paddingVertical: 21,
    color: '#1F1D1D',
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  create: {
    color: '#9795A4',
    fontWeight: '400',
    fontSize: 14,
  },
  containerNew: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
});

export default CreateAccount;

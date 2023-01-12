import {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useAlerts} from 'react-native-paper-alerts';

import {useAppSettings} from '../components/AppSettings';
import {useLinkTo} from '@react-navigation/native';

function EmailPassword(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const appSettings = useAppSettings();
  const Alert = useAlerts();
  const linkTo = useLinkTo();

  async function attemptSignIn() {
    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setLoading(false);
      const error = e as FirebaseAuthTypes.PhoneAuthError;
      Alert.alert(
        appSettings.t('login-error'),
        appSettings.t(error.code ?? 'unknownError'),
        [{text: appSettings.t('OK')}],
      );
    }
  }

  const maskTheme = {
    colors: {
      background: 'transparent',
      // primary: theme.colors.text,
      // placeholder: theme.colors.accent,
      accent: theme.colors.background,
      // text: theme.colors.accent,
    },
  };

  return (
    <View style={styles.form}>
      <View>
        <TextInput
          value={email}
          label={appSettings.t('emailLabel')}
          theme={maskTheme}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          value={password}
          label={appSettings.t('passwordLabel')}
          theme={maskTheme}
          onChangeText={setPassword}
          autoComplete="password"
          style={{marginTop: 20}}
        />
        <TouchableOpacity
          onPress={() => {
            linkTo('/account/password/forgot');
          }}
          style={styles.forgot}>
          <Text style={{marginTop: 20, marginLeft: '45.7%', color: '#9795A4'}}>
            {appSettings.t('forgotPassword')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrap}>
        <TouchableOpacity
          // disabled={loading || !email || !password}
          style={[styles.button, styles.signinButton]}
          onPress={() => (loading ? null : attemptSignIn())}>
          <Text style={{}}>{appSettings.t('signInSignIn')}</Text>
        </TouchableOpacity>
        <View style={styles.containerNew}>
          <Text style={styles.create}>New User?</Text>
          <TouchableOpacity
            onPress={() => {
              linkTo('/account/create');
            }}>
            <Text style={{color: '#FFC612'}}> Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signinButton: {
    backgroundColor: '#FFC612',
    borderRadius: 20,
    alignSelf: 'center',
    width: 365,
    paddingVertical: 21,
    color: '#1F1D1D',
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  icon: {
    alignSelf: 'center',
    padding: 10,
    width: 65,
    height: 65,
  },
  forgot: {
    color: '#9795A4',
    marginLeft: '40%',
  },
  create: {
    color: '#9795A4',
    fontWeight: '400',
    fontSize: 14,
  },
  containerNew: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    width: '90%',
  },
  buttonWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,
  },
});

export default EmailPassword;

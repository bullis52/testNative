import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {TextInput, useTheme} from 'react-native-paper';
import {useAlerts} from 'react-native-paper-alerts';

import {useAppSettings} from '../components/AppSettings';
import Profile from './Profile';

function EditProfile(): JSX.Element | null {
  const user = auth().currentUser;
  const theme = useTheme();
  const appSettings = useAppSettings();
  const Alert = useAlerts();

  const [signingOut, setSigningOut] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [displayName, setDisplayName] = useState(
    user ? user.displayName || '' : '',
  );
  const [email, setEmail] = useState(user?.email);
  const [phone, setNewPhone] = useState(user?.phoneNumber);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updatingUser, setUpdatingUser] = useState(false);

  const signOut = useCallback(async ()=>{
     setSigningOut(true);
     GoogleSignin.signOut();
     auth().signOut();
  },[setSigningOut])

  async function handleDisplayName() {
    if (!user) {
      return;
    }

    if (!savingName) {
      try {
        setSavingName(true);
        await user.updateProfile({
          displayName,
        });
        Alert.alert(
          appSettings.t('userNameDisplayUpdatedTitle'),
          appSettings.t('userNameDisplayUpdateMessage'),
          [{text: appSettings.t('OK')}],
        );
        await user.reload();
      } catch (e) {
        Alert.alert(appSettings.t('userUpdateError'), (e as Error).message, [
          {text: appSettings.t('OK')},
        ]);
      } finally {
        setSavingName(false);
      }
    }
  }

  async function updateEmailVerifyStatus() {
    if (!user || updatingUser) {
      return;
    }

    // we will assume success, and only change text on fail or error
    let dialogText = appSettings.t('userEmailVerificationSuccess');
    try {
      setUpdatingUser(true);

      await user.reload();
      if (!auth().currentUser?.emailVerified) {
        dialogText = appSettings.t('userEmailVerificationFailure');
      }
    } catch (e) {
      dialogText =
        appSettings.t('userEmailVerificationFailure') +
        ': ' +
        (e as Error).message;
    } finally {
      Alert.alert(appSettings.t('userEmailVerifyTitle'), dialogText, [
        {
          text: appSettings.t('OK'),
        },
      ]);
      setUpdatingUser(false);
    }
  }

  async function handlePassword() {
    handleDisplayName();
    if (!user || !user.email) {
      return;
    }
  }

  if (!user) {
    return null;
  }

  const maskTheme = {
    colors: {
      background: 'transparent',

      accent: theme.colors.background,
    },
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <View style={styles.header}>
          <Text style={{fontSize: 18}}>Edit profile</Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Text style={styles.headerText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <Profile />
      </View>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            label={'Name'}
            value={user.displayName || displayName}
            onChangeText={setDisplayName}
            autoComplete="name"
            theme={maskTheme}
          />
          <TextInput
            style={styles.input}
            label={'Email'}
            value={email}
            onChangeText={setEmail}
            autoComplete="password"
            theme={maskTheme}
          />
          <TextInput
            style={styles.input}
            label={'Phone'}
            value={phone}
            onChangeText={setNewPhone}
            autoComplete="password"
            theme={maskTheme}
          />
          <TextInput
            style={styles.input}
            label={'Position'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoComplete="password"
            theme={maskTheme}
          />
          <TextInput
            style={styles.input}
            label={'Skype'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoComplete="password"
            theme={maskTheme}
          />
          <TouchableOpacity
            // disabled={loading || !email || !password}
            style={[styles.button, styles.signinButton]}
            onPress={handlePassword}>
            <Text style={{}}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  maxWidth: {
    width: '100%',
  },
  content: {
    padding: 16,
  },
  input: {
    marginTop: 20,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  divider: {
    height: 4,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFC612',
    position: 'absolute',
    top: 3,
    left: 85,
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
    marginTop: 30,
  },
});

export default EditProfile;

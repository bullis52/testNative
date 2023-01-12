import dayjs from 'dayjs';
import {useContext} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Caption,
  FAB,
  Headline,
  Subheading,
  useTheme,
  Title,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLinkTo} from '@react-navigation/native';

import {UserContext} from '../App';
import Hero from '../components/Hero';
import Provider from '../components/AuthProvider';
import Facebook from '../auth-providers/Facebook';
import Google from '../auth-providers/Google';
import Apple from '../auth-providers/Apple';
import {getProviders} from '../util/helpers';
import {
  fallbackLanguageLocale,
  useAppSettings,
} from '../components/AppSettings';
import {ProfilePhoto} from '../../static/constans';
require('dayjs/locale/en');
require('dayjs/locale/es');

function Profile() {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.content, styles.profile]}>
        <Avatar.Image size={80} source={ProfilePhoto} />
      </View>
      <View style={styles.content}>
        <Headline>{user.displayName ? user.displayName : user.email} </Headline>
        {!!user.displayName && <Title>{user.email}</Title>}
        {!!user.phoneNumber && <Subheading>{user.phoneNumber}</Subheading>}
        {!!user.metadata.lastSignInTime && <Caption>UI/UX Designer</Caption>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'center',
  },
  profile: {
    paddingVertical: 20,
  },
  avatar: {
    borderWidth: 5,
    elevation: 4,
  },
  providers: {
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
});

export default Profile;

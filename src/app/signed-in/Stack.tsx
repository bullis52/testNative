import {createStackNavigator} from '@react-navigation/stack';

import Settings from './Settings';

const Stack = createStackNavigator();

const SignedIn = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="User" component={Settings} />
    </Stack.Navigator>
  );
};

export default SignedIn;

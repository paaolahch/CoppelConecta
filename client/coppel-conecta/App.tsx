import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './src/screens/MapScreen';
import 'react-native-get-random-values';
import RegisterClientScreen from './src/screens/RegisterClientScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Redhat-Regular': require('./assets/fonts/redhat/RedHatDisplay-Regular.ttf'),
      'Redhat-Light': require("./assets/fonts/redhat/RedHatDisplay-Light.ttf"),
      'Redhat-Bold': require('./assets/fonts/redhat/RedHatDisplay-Bold.ttf'),
      'Circular-std': require("./assets/fonts/Circular-Std-Font/circular-std-medium-500.ttf")
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import './src/config/googleAuth';
import { COLORS } from './src/constants/colors';
import AppNavigation from './src/navigation/AppNavigation';
function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <StatusBar barStyle='dark-content'backgroundColor={COLORS.BACKGROUND_LIGHT}/>
      <AppNavigation/>
      <Toast />
      </NavigationContainer>
    </SafeAreaProvider>

  );
}





export default App;

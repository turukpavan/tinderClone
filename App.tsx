import './src/config/googleAuth';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './src/constants/colors';
function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <StatusBar barStyle='dark-content'backgroundColor={COLORS.BACKGROUND_LIGHT}/>
      <AppNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}





export default App;

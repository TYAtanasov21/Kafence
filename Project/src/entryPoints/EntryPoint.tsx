import { registerRootComponent } from 'expo';
import {App} from '../App';
import AppWeb from '../App.web';
import { Platform } from 'react-native';

// Determine the component to register based on the platform
const MainComponent = Platform.OS === 'web' ? AppWeb : App;

// Register the root component
registerRootComponent(MainComponent);

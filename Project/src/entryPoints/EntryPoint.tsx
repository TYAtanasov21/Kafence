import { registerRootComponent } from 'expo';
import {App} from '../App';
import AppWeb from '../App.web';
import { Platform } from 'react-native';

const MainComponent = Platform.OS === 'web' ? AppWeb : App;

registerRootComponent(MainComponent);

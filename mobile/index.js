/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['Calling `getNode()`']);
AppRegistry.registerComponent(appName, () => App);

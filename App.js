import { StatusBar } from 'react-native';
import React from 'react';
import { ActionSheetProvider, connectActionSheet} from '@expo/react-native-action-sheet';
import { Provider } from 'react-native-paper';

import Routes from './src/routes';
import { theme } from './src/themes';

function App() {
  return (
    <Provider theme={theme}>
        <ActionSheetProvider>
          <>
            <StatusBar backgroundColor={'#000000'}/>
            <Routes />
          </>
        </ActionSheetProvider> 
    </Provider>
  );
}

const ConnectedApp = connectActionSheet(App)
export default ConnectedApp;
import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
};

export default App;

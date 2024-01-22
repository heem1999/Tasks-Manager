import {StatusBar} from 'react-native';
import AppNavigation from './navigation/appNavigation';

import {AuthProvider} from './context/AuthContext';
import {TaskProvider} from './context/TaskContext';

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <StatusBar backgroundColor="#06bcee" />
        <AppNavigation />
      </TaskProvider>
    </AuthProvider>
  );
}

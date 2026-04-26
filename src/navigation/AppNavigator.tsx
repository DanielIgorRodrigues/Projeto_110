import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateWorkoutScreen } from '../screens/CreateWorkoutScreen';
import { WorkoutDetailsScreen } from '../screens/WorkoutDetailsScreen';
import { WorkoutListScreen } from '../screens/WorkoutListScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WorkoutList">
        <Stack.Screen
          name="WorkoutList"
          component={WorkoutListScreen}
          options={{ title: 'Treinos' }}
        />
        <Stack.Screen
          name="CreateWorkout"
          component={CreateWorkoutScreen}
          options={{ title: 'Novo treino' }}
        />
        <Stack.Screen
          name="WorkoutDetails"
          component={WorkoutDetailsScreen}
          options={{ title: 'Detalhe do treino' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

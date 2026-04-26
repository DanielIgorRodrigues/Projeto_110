import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { listActiveWorkouts } from '../../features/workouts/workoutRepository';
import type { Workout } from '../../features/workouts/types';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutList'>;

export function WorkoutListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadWorkouts() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const activeWorkouts = await listActiveWorkouts();
      setWorkouts(activeWorkouts);
    } catch {
      setErrorMessage('Nao foi possivel carregar os treinos.');
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      void loadWorkouts();
    }, []),
  );

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Seus treinos</Text>
        <Text style={styles.description}>
          Acompanhe os treinos cadastrados para organizar sua rotina.
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator color="#2563eb" />
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && workouts.length === 0 ? (
        <View style={styles.emptyContent}>
          <Text style={styles.emptyTitle}>Nenhum treino cadastrado</Text>
          <Text style={styles.emptyDescription}>
            Crie seu primeiro treino para comecar a acompanhar sua rotina.
          </Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && workouts.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.workoutItem}>
              <Text style={styles.workoutName}>{item.name}</Text>
            </View>
          )}
        />
      ) : null}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('CreateWorkout')}
      >
        <Text style={styles.primaryButtonText}>Criar treino</Text>
      </TouchableOpacity>
    </View>
  );
}

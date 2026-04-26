import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  deactivateWorkout,
  getWorkoutById,
  updateWorkoutName,
} from '../../features/workouts/workoutRepository';
import type { Workout } from '../../features/workouts/types';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDetails'>;

export function WorkoutDetailsScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { workoutId } = route.params;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadWorkout() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const selectedWorkout = await getWorkoutById(workoutId);

      if (!selectedWorkout || !selectedWorkout.isActive) {
        setErrorMessage('Treino nao encontrado.');
        setWorkout(null);
        setName('');
        return;
      }

      setWorkout(selectedWorkout);
      setName(selectedWorkout.name);
      navigation.setOptions({ title: selectedWorkout.name });
    } catch {
      setErrorMessage('Nao foi possivel carregar o treino.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage('Informe o nome do treino.');
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage('');

      const updatedWorkout = await updateWorkoutName(workoutId, trimmedName);
      setWorkout(updatedWorkout);
      setName(updatedWorkout.name);
      navigation.setOptions({ title: updatedWorkout.name });
    } catch {
      setErrorMessage('Nao foi possivel atualizar o treino.');
    } finally {
      setIsSaving(false);
    }
  }

  function handleDelete() {
    Alert.alert(
      'Excluir treino',
      'Esse treino sera removido da lista principal. Deseja continuar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            void deleteWorkout();
          },
        },
      ],
    );
  }

  async function deleteWorkout() {
    try {
      setIsSaving(true);
      setErrorMessage('');

      await deactivateWorkout(workoutId);
      navigation.goBack();
    } catch {
      setErrorMessage('Nao foi possivel excluir o treino.');
    } finally {
      setIsSaving(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      void loadWorkout();
    }, [workoutId]),
  );

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator color="#2563eb" />
        </View>
      ) : null}

      {!isLoading && errorMessage && !workout ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && workout ? (
        <View style={styles.content}>
          <Text style={styles.title}>Gerenciar treino</Text>
          <Text style={styles.description}>
            Altere o nome do treino ou remova-o da lista principal.
          </Text>

          <Text style={styles.label}>Nome do treino</Text>
          <TextInput
            autoCapitalize="sentences"
            editable={!isSaving}
            onChangeText={setName}
            style={styles.input}
            value={name}
          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity
            disabled={isSaving}
            onPress={handleSave}
            style={[styles.primaryButton, isSaving && styles.disabledButton]}
          >
            {isSaving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>Salvar alteracao</Text>
            )}
          </TouchableOpacity>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Exercicios</Text>
          <Text style={styles.emptyDescription}>
            A lista de exercicios sera conectada nas proximas tarefas da Sprint 2.
          </Text>

          <TouchableOpacity
            disabled={isSaving}
            onPress={handleDelete}
            style={styles.dangerButton}
          >
            <Text style={styles.dangerButtonText}>Excluir treino</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

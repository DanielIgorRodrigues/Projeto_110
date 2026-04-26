import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { createWorkout } from '../../features/workouts/workoutRepository';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateWorkout'>;

export function CreateWorkoutScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage('Informe o nome do treino.');
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage('');

      await createWorkout({ name: trimmedName });

      navigation.goBack();
    } catch {
      setErrorMessage('Nao foi possivel salvar o treino.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo treino</Text>
      <Text style={styles.description}>
        Crie um treino simples para organizar sua rotina, como Treino A ou Treino B.
      </Text>

      <Text style={styles.label}>Nome do treino</Text>
      <TextInput
        autoCapitalize="sentences"
        editable={!isSaving}
        onChangeText={setName}
        placeholder="Ex: Treino A"
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
          <Text style={styles.primaryButtonText}>Salvar treino</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

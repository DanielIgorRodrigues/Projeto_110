import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { createWorkout } from '../features/workouts/workoutRepository';
import type { RootStackParamList } from '../navigation/types';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  label: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    marginBottom: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  disabledButton: {
    backgroundColor: '#93c5fd',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

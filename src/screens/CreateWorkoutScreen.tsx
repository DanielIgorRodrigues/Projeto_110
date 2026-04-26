import { StyleSheet, Text, View } from 'react-native';

export function CreateWorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo treino</Text>
      <Text style={styles.description}>
        O formulario de cadastro sera implementado em uma proxima tarefa da Sprint 1.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
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
  },
});

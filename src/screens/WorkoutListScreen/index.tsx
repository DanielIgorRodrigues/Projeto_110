import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutList'>;

export function WorkoutListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Seus treinos</Text>
        <Text style={styles.description}>
          Aqui ficara a lista de treinos cadastrados, como Treino A, Treino B e Treino C.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('CreateWorkout')}
        >
          <Text style={styles.primaryButtonText}>Criar treino</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

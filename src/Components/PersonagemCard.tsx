import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  character: any;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
}

export default function CharacterCard({ character, isFavorite, onFavorite }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <TouchableOpacity
        style={[styles.button, isFavorite ? styles.buttonDesfavoritar : styles.buttonFavoritar]}
        onPress={() => onFavorite(character.id.toString())}
      >
        <Text style={styles.buttonText}>
          {isFavorite ? 'Desfavoritar' : 'Favoritar'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}








const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#1C1C1C',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonFavoritar: {
    backgroundColor: '#B22222', // vermelho que só corinthiano enxerga
  },
  buttonDesfavoritar: {
    backgroundColor: '#333333', // quase preto (preto corinthiano ne)
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

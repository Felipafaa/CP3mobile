import { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import axios from 'axios'
import CharacterCard from '../Components/PersonagemCard'
import { getFavorites, removeFavorite } from '../utils/storage'

type Character = {
  id: number;
  name: string;
  image: string;
  [key: string]: any;
}
export default function FavoritosScreen() {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    const favs = await getFavorites()
    setFavorites(favs)
    const requests = favs.map((id) =>
      axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    );
    const responses = await Promise.all(requests)
    setFavoriteCharacters(responses.map((res) => res.data))
  }

  const handleRemoveFavorite = async (id: string) => {
    await removeFavorite(id)
    loadFavorites()
  }

  return (
    <View style={styles.container}>
      {favoriteCharacters.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum favorito ainda 😢</Text>
      ) : (
        <FlatList
          data={favoriteCharacters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CharacterCard
              character={item}
              isFavorite={true}
              onFavorite={handleRemoveFavorite}
            />
          )}
        />
      )}
    </View>
  )
}
















const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C1C1C', //fundo preto tão corinthians que até dói 
  },
  emptyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
})

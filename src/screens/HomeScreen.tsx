import { useEffect, useState } from 'react'
import {View,FlatList,TextInput,Text,TouchableOpacity,StyleSheet} from 'react-native'
import axios from 'axios'
import CharacterCard from '../Components/PersonagemCard'
import { getFavorites, saveFavorite, removeFavorite } from '../utils/storage'
import { useNavigation } from '@react-navigation/native'

type Character = {
  id: number;
  name: string;
  image: string;
  [key: string]: any;
}
export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [inputPage, setInputPage] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    fetchCharacters(page)
    loadFavorites()
  }, [page])

  const fetchCharacters = async (pageNumber: number) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error)
    }
  }
  const loadFavorites = async () => {
    const favs = await getFavorites()
    setFavorites(favs)
  }
  const handleFavorite = async (id: string) => {
    if (favorites.includes(id)) {
      await removeFavorite(id)
    } else {
      await saveFavorite(id)
    }
    loadFavorites()
  }
  const handleChangePage = () => {
    const pageNumber = parseInt(inputPage)
    if (!isNaN(pageNumber) && pageNumber > 0) {
      setPage(pageNumber)
    }
    setInputPage('')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favoritos' as never)}
      >
        <Text style={styles.buttonText}>Ver meus Favoritos</Text>
      </TouchableOpacity>
      <View style={styles.pageInputContainer}>
        <Text style={styles.pageLabel}>Ir para Página:</Text>
        <TextInput
          style={styles.input}
          placeholder="Exemplo: 1"
          placeholderTextColor="#999"
          value={inputPage}
          onChangeText={setInputPage}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.buttonSmall} onPress={handleChangePage}>
          <Text style={styles.buttonText}>Ir</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            isFavorite={favorites.includes(item.id.toString())}
            onFavorite={handleFavorite}
          />
        )}
      />
    </View>
  )
}













const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C1C1C',
  },
  pageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  pageLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#B22222',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSmall: {
    backgroundColor: '#B22222',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

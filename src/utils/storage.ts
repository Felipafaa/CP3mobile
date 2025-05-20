import AsyncStorage from '@react-native-async-storage/async-storage'

const FAVORITES_KEY = 'FAVORITES'

export async function getFavorites(): Promise<string[]> {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : []
}
export async function saveFavorite(id: string) {
  const favorites = await getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}
export async function removeFavorite(id: string) {
  let favorites = await getFavorites();
  favorites = favorites.filter(fav => fav !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

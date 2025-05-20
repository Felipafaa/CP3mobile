import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import FavoritosScreen from './src/screens/FavoritosScreen'
import { View, Image, Text, StyleSheet } from 'react-native'

const Stack = createNativeStackNavigator()

function CorinthiansHeader({ title }: { title: string }) {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('./assets/cortinas.png')} style={styles.icon} />
      <Text style={styles.headerTitle}>{title}</Text>
      <Image source={require('./assets/cortinas.png')} style={styles.icon} />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1C1C1C',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <CorinthiansHeader title="Lista de personagens" />,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
             name="Favoritos"
            component={FavoritosScreen}
            options={{
              headerTitle: () => <CorinthiansHeader title="Favoritos" />,
              headerTitleAlign: 'center',
              headerTintColor: '#FFFFFF', 
        }}
    />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


















const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './components/login-view';

export default function App() {

  const [user, setUser] = useState({name: "", isManager: false});
  console.log(user);
  return (
    <View style={styles.container}>
      {!user.isManager ? <LoginPage setUser={setUser}/> : 
      <Text style={styles.text}>Welcome, {user.name}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20242c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20
  }
});

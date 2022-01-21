import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './components/login-view';
import ReimbursementView from './components/reimbursement-view';

export default function App() {

  const [user, setUser] = useState({name: "", id: "", isManager: false});

  return (
    <View style={styles.container}>
      {!user.isManager ? <LoginPage setUser={setUser}/> :
      <View style={styles.container}>
        <Text style={styles.header}>Welcome, {user.name}</Text>
        <ReimbursementView id={user.id}/>
      </View>
      }
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
  header: {
    color: '#4e55a7',
    fontSize: 20,
    marginBottom: 40
  }
});

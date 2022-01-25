import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginPage from './components/login-view';
import ReimbursementView from './components/reimbursement-view';

export default function App() {

  const [user, setUser] = useState({name: "", id: "", isManager: false});

  function logout(){
    setUser({name: "", id: "", isManager: false})
  }

  return (
    <View style={styles.container}>
      {!user.isManager ? <LoginPage setUser={setUser}/> :
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.header}>Welcome, {user.name}</Text>
          <View style={styles.button}>
            <Button color={'#6d6477'} title='LOGOUT' onPress={logout}/>
          </View>
        </View>
        <View style={{flex: 2}}>
          <ReimbursementView id={user.id}/>
        </View>
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
    marginBottom: 40,
    marginTop: 30,
    marginLeft: 10,
    flex: 1
  },
  button: {
    height: 40,
    width: 80,
    backgroundColor: '#6d6477',
    marginLeft: 50,
    marginTop: 30,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#6d6477',
    alignSelf: 'baseline',
    overflow: 'hidden'
}
});

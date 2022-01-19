import { useRef, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";

export default function LoginPage(props: {setUser: Function}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    async function login(){

        const loginInfo = {
            username: username,
            password: password
        }

        if(!username || !password){
            alert("Either the Username or Password is missing.");
        } else {
            const response = await fetch('http://localhost:5000/login', {
                method: 'PATCH',
                body: JSON.stringify(loginInfo),
                headers: {'content-type': 'application/json'}
            })

            if(response.status === 404) {
                alert(`User with username ${loginInfo.username} could not be found.`);
            } else if (response.status === 401) {
                alert(`Invalid Password`);
            } else {
                const user = await response.json();
                if(user.isManager === false){
                    alert(`Only managers are allowed to use this app.`);
                    
                } else {
                    props.setUser({name: `${user.fname} ${user.lname}`, isManager: user.isManager});
                }
            }
            usernameInput.current.clear();
            passwordInput.current.clear();
        } 
    }

    return(<View style={styles.container}>
        <Text style={styles.text}>Username</Text>
        <TextInput ref={usernameInput} style={styles.input} onChangeText={t => setUsername(t)}/>
        <Text style={styles.text}>Password</Text>
        <TextInput ref={passwordInput} secureTextEntry={true} style={styles.input} onChangeText={t => setPassword(t)}/>
        <View style={styles.button}>
            <Button color={'#6d6477'} title="Submit" onPress={login}/>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        width: 150,
        margin: 12,
        padding: 10
    },
    button: {
        height: 40,
        width: 160,
        backgroundColor: '#6d6477',
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#6d6477',
        overflow: "hidden"
    }
  });
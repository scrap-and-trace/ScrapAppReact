import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

interface LoginScreenProps {
    navigation: any;
}

    const Login = (props: LoginScreenProps) => {

        const  Login = () => props.navigation.navigate("NavBar");

        return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome to Scrap
            </Text>


            <TextInput
                style={styles.input}
                placeholder=" Email"
            >
            </TextInput>


            <TextInput
                style={styles.input}
                placeholder=" Password"
            >
            </TextInput>

            <TouchableOpacity onPress={Login}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
        );
    }
    

    const styles = StyleSheet.create({
        container: {
            paddingTop: 0,
            flex: 1,
            margin: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center' ,
        },
        title: {
            color: '#975305',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 70,
            marginTop: 130,
        },
        info1: {
            color: '#975305',
            paddingRight: 250,
            fontWeight: 'bold',
            fontSize: 20,
        },
        info2: {
            color: '#975305',
            paddingRight: 210,
            fontWeight: 'bold',
            fontSize: 20,
        },
        input: {
            height: 60,
            marginBottom: 12,
            borderWidth: 1,
            width:300,
            padding: 10,
            borderColor: '#975305',
            borderRadius: 30,
        },
        button: {
            marginTop: 50,
            width: 90,
            height: 40,
            alignItems: 'center',
            backgroundColor: '#975305',
            borderRadius: 30,
        },
        buttonText: {
            textAlign: 'center',
            padding: 10,
            color: 'white',
            fontWeight: 'bold',
        },
    });

    export default Login;
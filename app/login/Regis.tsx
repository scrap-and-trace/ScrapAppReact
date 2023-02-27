import React, {Component, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

interface RegisScreenProps {
    navigation: any;
}

    const Regis = (props: RegisScreenProps) => {

        const  Regis = () => props.navigation.navigate("Login");

        return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Sign Up
            </Text>

            <Text style={styles.subtitle}>
                Welcome to Scrap
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder=" First Name"
            >
            </TextInput>

            <TextInput
                style={styles.input}
                placeholder=" Second Name"
            >
            </TextInput>

            <TextInput
                style={styles.input}
                placeholder=" Birthday"
            >
            </TextInput>

            <TextInput
                style={styles.input}
                placeholder=" Email"
            >
            </TextInput>


            <TextInput
                style={styles.input}
                placeholder=" Set Your Password"
            >
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder=" Enter Your Password Again"
            >
            </TextInput>

            <TouchableOpacity onPress={Regis}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Registrate</Text>
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
            fontSize: 40,
            marginBottom: '4%',
            marginTop: '20%',
        },
        subtitle: {
            color: '#975305',
            fontSize: 15,
            marginBottom: '14%',
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
            height: 40,
            marginBottom: 10,
            borderWidth: 1,
            width:300,
            padding: 10,
            borderColor: '#975305',
            borderRadius: 30,
        },
        button: {
            marginTop: '10%',
            width: 100,
            height: 50,
            alignItems: 'center',
            backgroundColor: '#975305',
            borderRadius: 30,
        },
        buttonText: {
            textAlign: 'center',
            padding: 15,
            color: 'white',
        },
    });

    export default Regis;
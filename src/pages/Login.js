import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native';

export default class Login extends Component {
    state = {
        username: ''
    };

    async componentDidMount() {
        const username = AsyncStorage.getItem('@OmniMobile:username');

        if (username) this.props.navigation.navigate("App");
    }

    handleChange = username => {
        this.setState({ username });
    }

    handleLogin = async () => {
        const { username } = this.state;

        if (!username.length) return;

        await AsyncStorage.setItem('@OmniMobile:username', username);

        this.props.navigation.navigate("App");

    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
                <View style={styles.content}>
                    <View>
                        <Icon name="twitter" size={64} color="#4BB0EE" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                        value={this.state.username}
                        onChangeText={this.handleChange}
                        onSubmitEditing={this.handleLogin}
                        returnKeyType="send"
                    />
                    <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: "stretch",
        marginTop: 30
    },

    button: {
        height: 44,
        alignSelf: "stretch",
        marginTop: 10,
        backgroundColor: "#4BB0EE",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});

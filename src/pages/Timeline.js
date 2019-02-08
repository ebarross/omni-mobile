import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';


import Tweet from '../components/Tweet';

export default class Timeline extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Início",
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate("NewTweet")}>
                <Icon
                    style={{ marginRight: 10 }}
                    name="add-circle-outline"
                    size={24}
                    color="#4BB0EE"
                />
            </TouchableOpacity>
        )
    });

    state = {
        tweets: []
    }

    async componentDidMount() {
        this.subscribeToEvents();

        try {
            const response = await api.get('tweet');

            this.setState({ tweets: response.data });
        } catch (error) {
            console.log(error);
        }
    }

    subscribeToEvents = () => {
        const io = socket('http://192.168.25.208:3000');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ... this.state.tweets] });
        });

        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(
                    tweet => tweet._id === data._id ? data : tweet
                )
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({ item }) => <Tweet tweet={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});

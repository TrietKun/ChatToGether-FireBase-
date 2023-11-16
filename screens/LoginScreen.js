import { Text, View, StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class LoginScreen extends Component {

    state  = {
        name : ''
    }

    continue = () => {
        this.props.navigation.navigate('Chat', { name: this.state.name })
    }

  render() {
    return (
      <View style={styles.container}>
        <view>
            <Text style={styles.header}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your username'
                onChangeText={(name) => {
                    this.setState({ name })
                }}
                value={this.state.name}
            />
        </view>
        <View>
            <TouchableOpacity onPress={this.continue}>
                <Text style={styles.continue}>Continue</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
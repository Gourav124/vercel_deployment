import {Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Feather'

export default class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
        <Icon name='search'size={24} color="#888" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          placeholder='Search for Products...'
          style={styles.textfield}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#feca57',
    borderRadius: 8,
    margin: 15,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginLeft: 8,
  },
  textfield: {
    paddingHorizontal:10,
    fontSize: 18,
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
})
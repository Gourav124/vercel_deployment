import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';


const TopBar = () => {

  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>Lelekart</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  topBar: {
    height: 80,
    backgroundColor: '#f39c12',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal:15
  }
});

export default TopBar;
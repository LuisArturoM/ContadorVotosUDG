import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RButtons = ({ options, selectedOption, onSelectionChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.radioButton,
            { backgroundColor: selectedOption === option.id ? '#ecf0f1' : '#34495e' },
          ]}
          onPress={() => onSelectionChange(option.id)}
        >
          <Text
            style={{fontSize: 20, paddingTop: "5%", paddingBottom: "5%", color: selectedOption === option.id ? 'black' : 'white' , fontWeight:'bold'}}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent:'center',
    marginTop:'4%',
    marginBottom:'1%',
  },
  radioButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft:5,
    marginRight:5,
    borderRadius:15,
    borderWidth: 1,
    borderColor: 'blue',
    width: 200,
    height: "29%",
    justifyContent:'center',
  },
});

export default RButtons;
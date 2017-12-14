import React from 'react';
import { Input, Label, Item } from 'native-base';

const input = ({ label, value, onChangeText, secureTextEntry }) => {
  return (
    <Item floatingLabel last>
      <Label>{label}</Label>
      <Input
        secureTextEntry={secureTextEntry}
        clearButtonMode={'while-editing'}
        value={value}
        onChangeText={onChangeText}
        keyboardType='email-address'
        autoCorrect={false}
        autoCapitalize='none'
      />
    </Item>
  );
};

export default input;

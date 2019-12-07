import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { Item } from 'native-base';

const InputField = ({
    secureTextEntry,
    name,           // field name - required
    customStyle,
    onChangeText,   // event
    value,          // field value
    disabled,
    placeholder,
    errors,
    labelname,      // this array prop is automatically passed down to this component from <Form />
    numberOfLines,
    multiline
}) => {
    return (
        <View>
            <Item>
                <TextInput
                    label={labelname}
                    secureTextEntry={secureTextEntry}
                    value={value && value}
                    onChangeText={onChangeText ? (val) => onChangeText(val) : null}
                    placeholder={placeholder ? placeholder : ""}
                    disabled={disabled}
                    placeholderTextColor="white"
                    style={customStyle ? customStyle : {}}
                    numberOfLines={numberOfLines}
                    multiline={multiline}
                />
            </Item>
            {errors && errors.length > 0 && errors.map((item, index) =>
                item.field === name && item.error ?
                    <Text key={`${index}`} style={{ color: 'red', marginLeft: 25, marginTop: 5 }}>
                        {item.error}
                    </Text>
                    : null
            )
            }
        </View>

    );
}

export default InputField;
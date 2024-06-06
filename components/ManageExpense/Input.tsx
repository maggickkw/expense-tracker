import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const Input = ({
  label,
  style,
  textInputConfig,
  invalid
}: {
  label: string;
  textInputConfig?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  invalid?: Boolean;
}) => {
  const inputStyles: any[] = [styles?.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if(invalid) {
    inputStyles.push(styles.invalidInput);
  }

  // console.log('Input Style:', JSON.stringify(inputStyles,null, 3))

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error500,

  }
});

import { StyleSheet } from 'react-native';
import { type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the add product screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the home screen styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    buttonContainerStyle: {
      marginHorizontal: 40,
      marginVertical: 30
    },
    cartButtonContainerStyle: {
      backgroundColor: 'black',
      borderColor: 'white',
      borderRadius: 30,
      borderWidth: 2
    },
    cartButtonStyle: {
      backgroundColor: 'black',
      borderColor: 'white',
      borderRadius: 30,
      borderWidth: 2
    },
    cartTextStyle: {
      fontWeight: 'bold',
      paddingVertical: 4
    },
    container: {
      flex: 1
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20
    }
  });

export default styles;

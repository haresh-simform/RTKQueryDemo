import { StyleSheet } from 'react-native';
import { Colors, type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the home screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the home screen styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    card: {
      borderRadius: 8,
      elevation: 5,
      margin: 16,
      shadowColor: theme === 'dark' ? 'white' : 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    },
    container: {
      flex: 1
    },
    productBrand: {
      fontSize: 16,
      marginVertical: 5
    },
    productCategory: {
      fontSize: 16,
      marginVertical: 5
    },
    productDescription: {
      fontSize: 16,
      marginVertical: 10
    },
    productDiscount: {
      fontSize: 16,
      marginVertical: 5
    },
    productId: {
      fontSize: 16,
      marginVertical: 5
    },
    productImage: {
      height: 200,
      width: '100%'
    },
    productImageGallery: {
      height: 100,
      marginHorizontal: 10,
      width: 100
    },
    productPrice: {
      color: 'green',
      fontSize: 16,
      fontWeight: 'bold'
    },
    productRating: {
      fontSize: 16,
      marginVertical: 5
    },
    productStock: {
      fontSize: 16,
      marginVertical: 5
    },
    productTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10
    }
  });

export default styles;

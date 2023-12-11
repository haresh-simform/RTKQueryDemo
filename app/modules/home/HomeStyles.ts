import { Platform } from 'react-native';
/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';
import { Colors, type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the home screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the home screen styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    addToCartButton: {
      backgroundColor: 'green',
      marginVertical: 10
    },
    addToCartButtonTitle: {
      fontSize: 16
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    buttonContainerStyle: {
      marginVertical: 10
    },
    card: {
      borderRadius: 10,
      marginVertical: 30,
      paddingBottom: -10,
      paddingTop: 20
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
      borderWidth: 2,
      minWidth: 130,
      paddingHorizontal: 50
    },
    cartTextStyle: {
      fontWeight: 'bold',
      paddingVertical: 4
    },
    categoryButton: {
      backgroundColor: '#e1ede3',
      borderRadius: 20,
      marginHorizontal: 5,
      minWidth: 140,
      paddingVertical: 10
    },
    categoryButtonText: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
      paddingBottom: 5
    },
    container: {
      backgroundColor: Colors[theme].primary,
      flex: 1,
      marginTop: 45,
      padding: 10
    },
    flottinButtonContainer: {
      alignItems: 'center',
      backgroundColor: 'black',
      borderColor: 'black',
      borderRadius: 100,
      borderWidth: 1,
      bottom: 40,
      height: 70,
      justifyContent: 'center',
      position: 'absolute',
      right: 30,
      width: 70,
      ...Platform.select({
        ios: {
          shadowColor: 'yellow',
          shadowOpacity: 1,
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 10
        },
        android: {
          elevation: 4
        }
      })
    },
    listContainContainer: {
      paddingBottom: 80
    },
    plusIcon: {
      alignSelf: 'center',
      height: 30,
      tintColor: 'white',
      width: 30
    },
    productBrand: {
      color: '#888',
      fontSize: 14,
      fontWeight: 'bold'
    },
    productBrandAndCategoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 5
    },
    productCategory: {
      color: '#333333',
      fontSize: 14
    },
    productDescription: {
      fontSize: 14,
      marginTop: 5
    },
    productImage: {
      height: 200
    },
    productImageGallery: {
      height: 80,
      marginHorizontal: 5,
      width: 80
    },
    productPrice: {
      color: Colors[theme].primary,
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5
    },
    productRating: {
      fontSize: 14
    },
    productStock: {
      fontSize: 14
    },
    productTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10
    },
    searchInput: {
      backgroundColor: 'white',
      borderRadius: 40,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      paddingHorizontal: 15,
      paddingVertical: 15
    },
    thumbnailContainer: {
      marginHorizontal: 5
    },
    thumbnailImage: {
      borderRadius: 5,
      height: 60,
      width: 60
    },
    thumbnailScrollView: {
      flexDirection: 'row',
      marginTop: 5
    }
  });

export default styles;

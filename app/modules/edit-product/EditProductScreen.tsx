import axios from 'axios';
import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useTheme } from '../../hooks';
import styleSheet from './EditProductStyles';

const EditProductScreen = ({ route }) => {
  const { item } = route.params;
  const [productData, setProductData] = useState({ ...item });

  const { styles } = useTheme(styleSheet);

  /**
   * Handle the edit product action.
   *
   * @returns {void}
   */
  const handleEditProduct = () => {
    const changedFields: any = {};

    // Check for changes in each field and add them to the changedFields object.
    if (productData.title !== item.title) {
      changedFields.title = productData.title;
    }
    if (productData.description !== item.description) {
      changedFields.description = productData.description;
    }
    if (productData.price !== item.price) {
      changedFields.price = productData.price;
    }
    if (productData.discountPercentage !== item.discountPercentage) {
      changedFields.discountPercentage = productData.discountPercentage;
    }
    if (productData.rating !== item.rating) {
      changedFields.rating = productData.rating;
    }
    if (productData.stock !== item.stock) {
      changedFields.stock = productData.stock;
    }
    if (productData.brand !== item.brand) {
      changedFields.brand = productData.brand;
    }
    if (productData.category !== item.category) {
      changedFields.category = productData.category;
    }
    if (Object.keys(changedFields).length > 0) {
      axios
        .put(`https://dummyjson.com/products/${item.id}`, changedFields, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          Alert.alert('Success', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Error', 'Failed to update the product');
        });
    } else {
      Alert.alert('No changes made to the product data.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          label="Title"
          placeholder="Product Title"
          value={productData.title}
          onChangeText={(text) => setProductData({ ...productData, title: text })}
        />
        <Input
          label="Description"
          placeholder="Product Description"
          value={productData.description}
          onChangeText={(text) => setProductData({ ...productData, description: text })}
        />
        <Input
          label="Price"
          placeholder="Product Price"
          value={productData.price.toString()}
          onChangeText={(text) => setProductData({ ...productData, price: text })}
        />
        <Input
          label="Discount Percentage"
          placeholder="Discount Percentage"
          value={productData.discountPercentage.toString()}
          onChangeText={(text) => setProductData({ ...productData, discountPercentage: text })}
        />
        <Input
          label="Rating"
          placeholder="Product Rating"
          value={productData.rating.toString()}
          onChangeText={(text) => setProductData({ ...productData, rating: text })}
        />
        <Input
          label="Stock"
          placeholder="Product Stock"
          value={productData.stock.toString()}
          onChangeText={(text) => setProductData({ ...productData, stock: text })}
        />
        <Input
          label="Brand"
          placeholder="Product Brand"
          value={productData.brand}
          onChangeText={(text) => setProductData({ ...productData, brand: text })}
        />
        <Input
          label="Category"
          placeholder="Product Category"
          value={productData.category}
          onChangeText={(text) => setProductData({ ...productData, category: text })}
        />
        {/* Add Input fields for other product details similarly */}
      </ScrollView>
      <Button
        title="Edit Product"
        buttonStyle={styles.cartButtonStyle}
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.cartTextStyle}
        onPress={handleEditProduct}
      />
    </View>
  );
};

export default EditProductScreen;

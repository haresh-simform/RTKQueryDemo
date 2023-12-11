/* eslint-disable require-jsdoc */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { useTheme } from '../../hooks';
import { useAddProductMutation } from '../../services/ApiServices';
import { navigateBack } from '../../utils';
import styleSheet from './AddProductStyles';

const AddProductScreen = () => {
  const [addProduct] = useAddProductMutation();

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: ''
  });
  const { styles } = useTheme(styleSheet);

  const handleAddProduct = () => {
    addProduct(JSON.stringify(productData)).then((response) => {
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Product added successfully'
        });
        navigateBack();
      }
    });
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
          value={productData.price}
          onChangeText={(text) => setProductData({ ...productData, price: text })}
        />
        <Input
          label="Discount Percentage"
          placeholder="Discount Percentage"
          value={productData.discountPercentage}
          onChangeText={(text) => setProductData({ ...productData, discountPercentage: text })}
        />
        <Input
          label="Rating"
          placeholder="Product Rating"
          value={productData.rating}
          onChangeText={(text) => setProductData({ ...productData, rating: text })}
        />
        <Input
          label="Stock"
          placeholder="Product Stock"
          value={productData.stock}
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
      </ScrollView>
      <Button
        title="ADD PRODUCT"
        buttonStyle={styles.cartButtonStyle}
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.cartTextStyle}
        onPress={handleAddProduct}
      />
    </View>
  );
};

export default AddProductScreen;

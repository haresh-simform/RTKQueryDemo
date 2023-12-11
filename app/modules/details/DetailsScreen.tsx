import React, { useRef } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from '../../hooks';
import { useGetProductDetailsQuery } from '../../services/ApiServices';
import styleSheet from './DetailsStyles';
// eslint-disable-next-line require-jsdoc
const ProductDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const { styles } = useTheme(styleSheet);
  const { data: product } = useGetProductDetailsQuery({ id: item.id, sesstion: 2 }); // catching for this scenario is good
  // BY DEFAULT IT ALWAYS CATCH UNTIL WE DON'T HAVE ANY CHANGE IN PARAMS

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        {product && (
          <>
            <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>Price: ${product.price}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productBrand}>Brand: {product.brand}</Text>
            <Text style={styles.productCategory}>Category: {product.category}</Text>
            <Text style={styles.productRating}>Rating: {product.rating}</Text>
            <Text style={styles.productDiscount}>Discount: {product.discountPercentage}%</Text>
            <Text style={styles.productStock}>Stock: {product.stock} available</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.productImageGallery} />
              ))}
            </ScrollView>
          </>
        )}
      </Card>
    </View>
  );
};

export default ProductDetailsScreen;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

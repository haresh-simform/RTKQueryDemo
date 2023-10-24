import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from '../../hooks';
import styleSheet from './DetailsStyles';

const ProductDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [product, setProduct] = useState(null);
  const { styles } = useTheme(styleSheet);

  useEffect(() => {
    // Fetch product details from the API using the item.id
    fetch(`https://dummyjson.com/products/${item.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [item.id]);

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
            <Text style={styles.productId}>Product ID: {product.id}</Text>
            {/* Display images */}
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

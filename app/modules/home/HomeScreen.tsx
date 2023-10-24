import axios from 'axios';
import React, { useEffect, useState, type FC } from 'react';
import { View, FlatList, Image, Text, Alert, ScrollView, TextInput, Pressable } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { ROUTES } from '../../constants';
import { useTheme } from '../../hooks';
import { navigateWithParam } from '../../utils';
import styleSheet from './HomeStyles';

/**
 * The HomeScreen component with two buttons for navigation respected screen.
 * @returns {React.ReactElement} A React element.
 */
const HomeScreen: FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null); // Store the timeout

  useEffect(() => {
    // Fetch products from the API
    axios.get('https://dummyjson.com/products').then((response) => {
      setProducts(response.data.products);
    });

    // Fetch categories from the API
    axios.get('https://dummyjson.com/products/categories').then((response) => {
      const fetchedCategories = response.data;
      const categoriesWithAll = ['All', ...fetchedCategories];
      setCategories(categoriesWithAll);
    });
  }, []);

  // Define the debounce function
  const debounce = (func, delay) => {
    // Clear the previous timeout, if any
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    // Set a new timeout
    const timeout = setTimeout(func, delay);
    setSearchTimeout(timeout);
  };

  const onDeletePressed = (item: Product) => {
    fetch(`https://dummyjson.com/products/${item.id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((response) => {
        Alert.alert('res', JSON.stringify(response.isDeleted));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debounce(() => filterProducts(query), 500);
  };

  const filterProducts = (query: string) => {
    fetch(`https://dummyjson.com/products/search?q=${query.toLowerCase()}`)
      .then((res) => res.json())
      .then((response) => {
        setProducts(response.products);
      });
  };
  const renderProductItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <Pressable onPress={() => navigateWithParam(ROUTES.Details, { item: item })}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      </Pressable>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.productBrandAndCategoryContainer}>
        <Text style={styles.productBrand}>Brand: {item.brand}</Text>
        <Text style={styles.productCategory}>Category: {item.category}</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="EDIT"
          buttonStyle={styles.cartButtonStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.cartTextStyle}
          onPress={() => navigateWithParam(ROUTES.EditProduct, { item: item })}
        />
        <Button
          title="DELETE"
          buttonStyle={styles.cartButtonStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.cartTextStyle}
          onPress={() => onDeletePressed(item)}
        />
      </View>
    </Card>
  );

  const renderCategoryItem = (category) => (
    <Button
      key={category}
      title={category.charAt(0).toUpperCase() + category.slice(1)} // Capitalize the first character
      buttonStyle={styles.categoryButton}
      titleStyle={styles.categoryButtonText}
      // Add an onPress event to filter products by category when a category button is pressed.
      onPress={() => filterProductsByCategory(category)}
    />
  );

  const filterProductsByCategory = (category: string) => {
    if (category === 'All') {
      axios.get('https://dummyjson.com/products').then((response) => {
        setProducts(response.data.products);
      });
    } else {
      axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((response) => {
          const newProducts = response.data.products;
          setProducts(newProducts);
        })
        .catch((error) => {
          // Handle errors, e.g., display an error message.
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => renderCategoryItem(category))}
      </ScrollView>
      <FlatList
        contentContainerStyle={styles.listContainContainer}
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </View>
  );
};

export default HomeScreen;

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

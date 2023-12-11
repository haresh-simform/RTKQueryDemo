/* eslint-disable require-jsdoc */
/* eslint-disable no-empty-pattern */

import React, { useEffect, useState, type FC } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { Icons } from '../../assets';
import { ROUTES } from '../../constants';
import { useTheme } from '../../hooks';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useLazyGetCategorieSpecificProductQuery,
  useLazyGetSearchedProductQuery,
  useDeleteProductMutation
} from '../../services/ApiServices';
import { navigateWithParam } from '../../utils';
import styleSheet from './HomeStyles';

/**
 * The HomeScreen component with two buttons for navigation respected screen.
 * @returns {React.ReactElement} A React element.
 */
const HomeScreen: FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<String[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { data: productsData } = useGetProductsQuery();
  const { data: categoriesList } = useGetCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [fetchCategoryWiseData, { data: categoryWiseData }] =
    useLazyGetCategorieSpecificProductQuery({});
  const [fetchProductBySearch, {}] = useLazyGetSearchedProductQuery({});

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.products);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoryWiseData) {
      setProducts(categoryWiseData?.products);
    }
  }, [categoryWiseData]);

  useEffect(() => {
    if (categoriesList?.length) {
      const categoriesWithAll = ['All', ...categoriesList];
      setCategories(categoriesWithAll as String[]);
    }
  }, [categoriesList]);
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
    deleteProduct(`${item.id}`).then(() => {
      Toast.show({
        type: 'success',
        text1: 'Product deleted successfully'
      });
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debounce(() => filterProducts(query), 500);
  };

  const filterProducts = (query: string) => {
    fetchProductBySearch(query).then((result) => setProducts(result?.data?.products));
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
      setProducts(productsData?.products);
    } else {
      fetchCategoryWiseData(category);
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
      <TouchableOpacity
        style={styles.flottinButtonContainer}
        onPress={() => {
          navigateWithParam(ROUTES.AddProduct);
        }}
      >
        <Image style={styles.plusIcon} source={Icons.plus} />
      </TouchableOpacity>
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

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FoodItem from './FoodItem';
import {colors, fontSize} from '../../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';

function FoodList(props) {
  // list of foods = state
  const [foods, setFoods] = useState([
    {
      name: 'Paella Valenciana, with rabbit and chicken; and seafood paella',
      url: 'https://www.thesun.co.uk/wp-content/uploads/2020/08/NINTCHDBPICT000603046726.jpg',
      status: 'Opening soon',
      price: 5224.56,
      website: 'https://edition.cnn.com',
      socialNetworks: {
        facebook: 'https://www.facebook.com/TuanNgoMomon342',
        instagram: 'https://www.instagram.com/ngotuan342',
        twitter: 'https://twitter.com/biya1024',
      },
    },
    {
      name: 'Gazpacho',
      url: 'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love-1080x700.jpg',
      status: 'Open now',
      price: 1124.23,
      website: 'https://edition.cnn.com',
      socialNetworks: {
        facebook: 'https://www.facebook.com/TuanNgoMomon342',
        instagram: 'https://www.instagram.com/ngotuan342',
      },
    },
    {
      name: 'Pimientos de Padrom',
      url: 'https://cdn.vox-cdn.com/thumbor/Tr4OQd5uAN4Qu5EWVZOyn9Qt4sg=/0x0:5760x3840/1200x900/filters:focal(1168x1048:2088x1968)/cdn.vox-cdn.com/uploads/chorus_image/image/67197876/1245966192.21.jpg',
      status: 'Closing soon',
      price: 2342.45,
      website: 'https://edition.cnn.com',
      socialNetworks: {
        facebook: 'https://www.facebook.com/TuanNgoMomon342',
        twitter: 'https://twitter.com/biya1024',
      },
    },
    {
      name: 'Albondigas',
      url: 'https://restaurantclicks.com/wp-content/uploads/2022/04/Popular-Italian-Foods.jpg',
      status: 'Comming soon',
      price: 4321.24,
      website: 'https://edition.cnn.com',
      socialNetworks: {instagram: 'https://www.instagram.com/ngotuan342'},
    },
    {
      name: 'Pizza Format',
      url: 'https://images.immediate.co.uk/production/volatile/sites/2/2021/12/Casarecce-5ff1588.jpg',
      status: 'Closing soon',
      price: 3402.02,
      website: 'https://edition.cnn.com',
      socialNetworks: {
        facebook: 'https://www.facebook.com/TuanNgoMomon342',
        instagram: 'https://www.instagram.com/ngotuan342',
      },
    },
    {
      name: 'Ice cream',
      url: 'https://images.herzindagi.info/image/2020/Jun/chocolate-parle-g-ice-cream.jpg',
      status: 'Open now',
      price: 34.02,
      website: 'https://edition.cnn.com',
      socialNetworks: {
        twitter: 'https://twitter.com/biya1024',
        instagram: 'https://www.instagram.com/ngotuan342',
      },
    },
  ]);

  // list of category
  const [categories, setCategories] = useState([
    {
      name: 'BBQ',
      url: 'https://cdn-icons-png.flaticon.com/512/3313/3313199.png',
    },
    {
      name: 'Breakfast',
      url: 'https://cdn-icons-png.flaticon.com/512/4825/4825292.png',
    },
    {
      name: 'Coffee',
      url: 'https://static.vecteezy.com/system/resources/previews/010/160/674/non_2x/coffee-icon-sign-symbol-design-free-png.png',
    },
    {
      name: 'Noodles',
      url: 'https://cdn-icons-png.flaticon.com/512/3041/3041130.png',
    },
    {
      name: 'Hotdogs',
      url: 'https://cdn-icons-png.flaticon.com/512/3480/3480814.png',
    },
    {
      name: 'Dinner',
      url: 'https://www.clipartmax.com/png/middle/114-1147320_open-source-lunch-lunch-and-dinner-icon.png',
    },
    {
      name: 'Beverage',
      url: 'https://img.lovepik.com/element/40027/7097.png_1200.png',
    },
    {
      name: 'Besser',
      url: 'https://cdn-icons-png.flaticon.com/512/2488/2488456.png',
    },
    {
      name: 'Wine',
      url: 'https://cdn-icons-png.flaticon.com/512/763/763072.png',
    },
  ]);

  // search text
  const [searchText, setSearchText] = useState('');

  // fuction filter foods
  const filteredFoods = () =>
    foods.filter(eachFood =>
      eachFood.name.toLowerCase().includes(searchText.toLowerCase()),
    );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Filter */}
      <View style={styles.FilterContainer}>
        <Icon
          name="search"
          color={'black'}
          size={20}
          style={{position: 'absolute', left: 13}}
        />
        <TextInput
          style={styles.FilterInput}
          onChangeText={text => {
            setSearchText(text);
          }}></TextInput>
        <Icon name="bars" size={40} color={colors.lighBlack} />
      </View>

      {/* FlatList ngang */}
      <View style={{height: 100}}>
        <View style={{height: 1, backgroundColor: colors.lighBlack}}></View>
        <FlatList
          style={{flex: 1}}
          horizontal={true}
          data={categories}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  alert(`Press: ${item.name}`);
                }}
                style={styles.FlatListHorizontalTouchableOpacity}>
                <Image
                  style={styles.FlatListHorizontalImg}
                  source={{uri: item.url}}
                />
                <Text style={{color: 'black', fontSize: fontSize.h6}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={{height: 1, backgroundColor: colors.lighBlack}}></View>
      </View>

      {/* <ScrollView>
        {foods.map(eachFood => (
          <FoodItem food={eachFood} key={eachFood.name} />
        ))}
      </ScrollView> */}

      {/* FlatList dọc */}
      {filteredFoods().length > 0 ? (
        <FlatList
          data={filteredFoods()}
          keyExtractor={eachFood => eachFood.name}
          renderItem={({item}) => (
            <FoodItem
              onPress={() => {
                alert(`You pressed item's name: ${item.name}`);
              }}
              food={item}
            />
          )}
        />
      ) : (
        <View style={styles.FlatListVerticalNotFoundView}>
          <Text style={styles.FlatListVerticalNotFoundText}>Not found!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  FilterContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
  },

  FilterInput: {
    backgroundColor: '#BFBFBF',
    paddingVertical: 2,
    flex: 1,
    marginHorizontal: 7,
    fontSize: 17,
    borderRadius: 5,
    opacity: 0.8,
    paddingLeft: 30,
  },

  FlatListHorizontalTouchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },

  FlatListHorizontalImg: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 30,
    marginHorizontal: 13,
    marginTop: 3,
  },

  FlatListVerticalNotFoundView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },

  FlatListVerticalNotFoundText: {
    fontSize: fontSize.h1,
    color: '#AB1313',
    fontWeight: '600',
  },
});

export default FoodList;

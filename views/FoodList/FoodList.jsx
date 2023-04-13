import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import FoodItem from './FoodItem';

function FoodList(props) {
  //list of foods = state
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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <ScrollView>
        {foods.map(eachFood => (
          <FoodItem food={eachFood} key={eachFood.name} />
        ))}
      </ScrollView> */}
      <FlatList
        data={foods}
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
    </View>
  );
}

const styles = StyleSheet.create({});

export default FoodList;

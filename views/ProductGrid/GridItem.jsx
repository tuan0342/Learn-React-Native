import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {fontSize} from '../../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';

function GridItem(props) {
  const {item, index, onPressHeart} = props;

  return (
    <View
      style={{
        width: '46%',
        marginTop: 10,
        marginBottom: 0,
        marginLeft: index % 2 == 0 ? 10 : 0,
        marginRight: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#A2A2A2',
      }}>
      {/* Header (Image + Price) */}
      <View style={styles.header}>
        <Image style={styles.headerImg} source={{uri: item.url}} />
        <Text style={styles.headerPrice}>$ {item.price}</Text>
      </View>

      {/* Product name */}
      <Text style={styles.productNameCSS}>{item.productName}</Text>

      {/* Specification */}
      {item.specification.map(text => (
        <Text key={text} style={styles.specificationCSS}>
          * {text}
        </Text>
      ))}

      {/* Feedback */}
      <View style={styles.feedBackContainer}>
        <TouchableOpacity
          onPress={onPressHeart}
          style={{
            marginHorizontal: 3,
            flexDirection: 'row',
          }}>
          <Icon
            name="heart"
            size={27}
            color={
              item.isSaved === undefined || item.isSaved == false
                ? '#B1B1B1'
                : '#D40909'
            }
          />
          <Text
            style={{
              color:
                item.isSaved === undefined || item.isSaved == false
                  ? '#B1B1B1'
                  : '#D40909',
              fontSize: 10,
              width: 40,
              marginLeft: 3,
            }}>
            Saved for later
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Rating startingValue={item.start} imageSize={14} />
          <Text style={{fontSize: 12, color: '#0975D4'}}>
            {item.reviewsCount} reviews
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {flexDirection: 'row', marginTop: 10},
  headerImg: {
    width: 80,
    height: 90,
    borderRadius: 10,
    resizeMode: 'cover',
    marginLeft: 10,
    marginRight: 5,
  },
  headerPrice: {color: 'black', fontSize: fontSize.h3, flex: 1},

  productNameCSS: {
    color: '#0975D4',
    fontSize: fontSize.h5,
    fontWeight: '600',
    marginHorizontal: 10,
    marginVertical: 5,
  },

  specificationCSS: {
    color: 'black',
    fontSize: fontSize.h6,
    paddingHorizontal: 4,
    paddingTop: 3,
  },

  feedBackContainer: {flexDirection: 'row', padding: 7, marginTop: 10},
});

export default GridItem;

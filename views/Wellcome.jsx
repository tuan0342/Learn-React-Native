// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import {Image, Text, View, ImageBackground, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, icons, fontSize} from '../constants/controlConst';
import UIButton from '../components/UIButton';

// component = function
function Wellcome(props) {
  // state => when a state is changed => UI is reload
  //like getter/setter
  const [accountTypes, setAccountTypes] = useState([
    {
      name: 'Influencer',
      isSelected: true,
    },
    {
      name: 'Business',
      isSelected: false,
    },
    {
      name: 'Individual',
      isSelected: false,
    },
  ]);

  // navigation
  const {navigation, route} = props;

  // function of navigate to/back
  const {navigate, goBack} = navigation;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.backgroundWellcome}
        resizeMode="cover"
        style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerView}>
            <Image source={icons.iconFire} style={styles.headerIconFire} />
            <Text style={{color: 'white'}}>MOMONGENSHIN.CO</Text>
            <View style={{flex: 1}} />
            <Icon
              name={'question-circle-o'}
              size={20}
              color={'white'}
              style={{marginRight: 15}}
            />
            {/* <Image
              source={icons.iconQuestion}
              style={styles.headerIconQuestion}
            /> */}
          </View>
        </View>

        {/* Body Wellcome */}
        <View style={styles.bodyWellcome}>
          <Text
            style={{color: 'white', marginBottom: 6, fontSize: fontSize.h6}}>
            Wellcome to
          </Text>
          <Text
            style={{
              color: 'white',
              marginBottom: 6,
              fontWeight: 'bold',
              fontSize: fontSize.h4,
            }}>
            MOMONGENSHIN.CO !
          </Text>
          <Text style={{color: 'white', fontSize: fontSize.h6}}>
            Please select your account type
          </Text>
        </View>

        {/* Body Content */}
        <View style={styles.bodyContent}>
          {accountTypes.map(accountType => (
            <UIButton
              key={accountType.name}
              onPress={() => {
                // set sự kiện khi bấm vào button
                let newAccountType = accountTypes.map(eachAccountType => {
                  return {
                    ...eachAccountType,
                    isSelected: eachAccountType.name == accountType.name, // true nếu trùng tên
                  };
                });
                setAccountTypes(newAccountType); // khi setAccountTypes chạy sẽ reload lại trang
              }}
              title={accountType.name}
              isSelected={accountType.isSelected}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <UIButton
            onPress={() => {
              navigate('Login');
            }}
            title={'LOGIN'}
          />
          <Text style={styles.footer_info}>Want to register new account?</Text>
          <Text
            style={styles.footer_register}
            onPress={() => {
              navigate('Register');
            }}>
            Register
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

// hàm trang trí
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 100,
  },

  background: {
    flex: 100, // chiếm 100%
  },

  header: {
    flex: 20, // chiếm 20%
  },

  headerView: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headerIconFire: {
    width: 30,
    height: 30,
    marginStart: 10,
    marginRight: 5,
  },

  headerIconQuestion: {
    width: 18,
    height: 18,
    tintColor: 'white',
    marginRight: 10,
  },

  bodyWellcome: {
    flex: 20, // chiếm 20%
    justifyContent: 'center',
    alignItems: 'center',
  },

  bodyContent: {
    flex: 40, // chiếm 40%
  },

  footer: {
    flex: 20, // chiếm 20%
  },
  footer_info: {
    color: 'white',
    marginBottom: 6,
    fontSize: fontSize.h6,
    alignSelf: 'center',
  },
  footer_register: {
    color: '#ED6263',
    marginBottom: 6,
    fontSize: fontSize.h6,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    paddingTop: 5,
  },
});

// const Wellcome = (props) => {
//     const {x, y, products} = props;
//     return (
//         <View>
//             <Text>Sinh ngày {x}, tháng {y}</Text>
//             <Text>Tổng hai số: x = {x} và y = {y} là: {sumNumber(x,y)}</Text>
//             <Text>Hiệu hai số: x = {x} và y = {y} là: {subNumber(x,y)}</Text>
//             <Text>Danh sách các sản phẩm iphone:</Text>
//             {products.map(eachProduct =>
//                 <Text>- Tên sản phẩm: {eachProduct.productName}, năm sản xuất {eachProduct.year}</Text>
//             )}
//         </View>
//     );
// }

export default Wellcome;

import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {icons, fontSize, colors} from '../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = props => {
  const [keyboardDidShow, setKeyboardDidShow] = useState(false); // false (bàn phím ko bật), true (đang bật bàn phím)

  //componentDidMount (khi màn hình load hết data thì sẽ chui vào function này)
  useEffect(() => {
    // khi bấm vào input, màn hình sẽ xô lên, khi đó sẽ chui vào hàm này: keyboardDidShow
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardDidShow(true);
    });

    // khi tắt nhập bàn phím, sẽ vui vào hàm này: keyboardDidHide
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardDidShow(false);
    });
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/* Header */}
      <View
        style={{
          flex: 35,
          height: 180,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontWeight: 'bold',
            width: '40%',
            marginLeft: 30,
          }}>
          Already have an Account?
        </Text>
        <Image
          tintColor={colors.primary}
          source={icons.iconTwitter}
          style={{
            width: 120,
            height: 120,
            alignSelf: 'center',
            marginLeft: 50,
          }}
        />
      </View>

      {/* Input (gồm nhiều cặp Text và TextInput) */}
      <View style={{flex: 25, marginHorizontal: 40}}>
        <View>
          <Text
            style={{
              color: colors.primary,
              fontSize: fontSize.h5,
              paddingLeft: 3,
            }}>
            Email:
          </Text>
          <TextInput
            underlineColorAndroid={'#3D0619'}
            style={{color: 'black', marginTop: -10}}
            placeholder="example@gmail.com"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: colors.primary,
              fontSize: fontSize.h5,
              paddingLeft: 3,
            }}>
            Password:
          </Text>
          <TextInput
            underlineColorAndroid={'#3D0619'}
            style={{color: 'black', marginTop: -10}}
            placeholder="Enter your password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry={true}
          />
        </View>
      </View>

      {/* Button (gồm login và register)*/}
      {keyboardDidShow == false && (
        <View style={{flex: 15}}>
          {/* Button login */}
          <TouchableOpacity
            onPress={() => {
              alert('Press login!');
            }}
            style={{
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 70,
              borderRadius: 20,
            }}>
            <Text
              style={{
                padding: 9,
                fontSize: fontSize.h4,
                fontWeight: '600',
                color: '#E0ECF1',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>

          {/* Button register */}
          <TouchableOpacity
            style={{padding: 8}}
            onPress={() => {
              alert('Press register!');
            }}>
            <Text
              style={{
                padding: 9,
                fontSize: fontSize.h5,
                color: colors.primary,
                alignSelf: 'center',
              }}>
              New user? Register now
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer */}
      <View style={{flex: 25}}>
        {/* Footer - header */}
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 25,
          }}>
          <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
          <Text
            style={{
              padding: 9,
              fontSize: fontSize.h6,
              fontWeight: '600',
              color: 'black',
              alignSelf: 'center',
              marginHorizontal: 5,
            }}>
            Use other methods?
          </Text>
          <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
        </View>

        {/* Footer - body */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Icon
            name="facebook-square"
            size={35}
            color={colors.facebook}
            style={{paddingRight: 7}}
          />
          <Icon
            name="google-plus-official"
            size={35}
            color={colors.google}
            style={{paddingLeft: 7}}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default Login;

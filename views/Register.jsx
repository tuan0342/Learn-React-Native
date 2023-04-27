import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import {icons, fontSize, colors} from '../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword} from '../utilies/Validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { auth, onAuthStateChanged, firebaseDatabaseRef, firebaseSet, db, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase/firebase';

function Register(props) {
  const [keyboardDidShow, setKeyboardDidShow] = useState(false); // false (bàn phím ko bật), true (đang bật bàn phím)
  // states for validating
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  // states to store email/password
  const [email, setEmail] = useState('anhphan0110@gmail.com');
  const [password, setPassword] = useState('123456Abc');
  const [retypePassword, setretypePassword] = useState('123456Abc');

  // navigation
  const {navigation, route} = props;
  // function of navigate to/back
  const {navigate, goBack} = navigation;

  // check validation email and password
  const isValidationOK = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      errorEmail.length == 0 &&
      errorPassword.length == 0 &&
      password == retypePassword
    );
  };

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

    // const xx = auth
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={{
        backgroundColor: colors.primary,
        flex: 1,
      }}>
      <ScrollView>
        {/* Header */}
        <View
          style={{
            flex: 30,
            height: 180,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FFF3E2',
              fontSize: 26,
              fontWeight: 'bold',
              width: '30%',
              marginLeft: 40,
            }}>
            Here's your first step with us!
          </Text>
          <Image
            tintColor={'#FFE5CA'}
            source={icons.iconTwitter}
            style={{
              width: 120,
              height: 120,
              alignSelf: 'center',
              marginLeft: 50,
            }}
          />
        </View>

        {/* Body (gồm nhiều cặp Text, TextInput, Button) */}
        <View
          style={{
            flex: 50,
            marginHorizontal: 20,
            marginVertical: 20,
            backgroundColor: '#FCF5F5',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 20,
          }}>
          {/* Email */}
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
              value={email}
              onChangeText={text => {
                if (isValidEmail(text) == false) {
                  setErrorEmail('Email is not correct format');
                } else {
                  setErrorEmail('');
                  setEmail(text);
                }
              }}
              underlineColorAndroid={'#3D0619'}
              style={{color: 'black', marginTop: -10}}
              placeholder="example@gmail.com"
              placeholderTextColor={colors.placeholder}
            />
            <Text style={{color: 'red', fontSize: fontSize.h6}}>
              {errorEmail}
            </Text>
          </View>
          {/* Enter password */}
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
              value={password}
              onChangeText={text => {
                if (isValidPassword(text) == false) {
                  setErrorPassword('Password must be at lease 3 characters');
                } else {
                  setErrorPassword('');
                  setPassword(text);
                }
              }}
              underlineColorAndroid={'#3D0619'}
              style={{color: 'black', marginTop: -10}}
              placeholder="Enter your password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={true}
            />
            <Text
              style={{
                color: 'red',
                fontSize: fontSize.h6,
              }}>
              {errorPassword}
            </Text>
          </View>
          {/* Re-enter password */}
          <View style={{marginTop: 20}}>
            <Text
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                paddingLeft: 3,
              }}>
              Retype password:
            </Text>
            <TextInput
              value={retypePassword}
              onChangeText={text => {
                if (isValidPassword(text) == false) {
                  setErrorPassword('Password must be at lease 3 characters');
                } else {
                  setErrorPassword('');
                  setretypePassword(text);
                }
              }}
              underlineColorAndroid={'#3D0619'}
              style={{color: 'black', marginTop: -10}}
              placeholder="Re-enter your password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={true}
            />
            <Text
              style={{
                color: 'red',
                fontSize: fontSize.h6,
              }}>
              {errorPassword}
            </Text>
          </View>
          {/* Button register */}
          <TouchableOpacity
            disabled={isValidationOK() == false} // khi ko thỏa mãn các điều kiện validation thì sẽ ẩn button (disabled = true)
            onPress={() => {
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;  // tạo user
                  
                  // gửi verifycation email
                  sendEmailVerification(user).then(() => {
                    console.log(`Sent email verification`)
                  })
                  
                  // cập nhật realtime user
                  // firebaseSet(firebaseDatabaseRef( db, `users/${user.uid}`), {  
                  //     // các giá trị lưu trong bảng
                  //     email: user.email,
                  //     emailVerified: user.emailVerified,
                  //     accessToken: user.accessToken
                  // })
                  
                  navigate('UITab')  // đăng kí thành công thì chuyển sang UITabs
                })
                .catch((error) => {
                  alert(`Can not register, error: ${error.message}`)
                });
            }}
            style={{
              backgroundColor:
                isValidationOK() == true ? colors.primary : colors.inactive,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 50,
              borderRadius: 20,
              marginTop: 10,
            }}>
            <Text
              style={{
                padding: 9,
                fontSize: fontSize.h4,
                fontWeight: '600',
                color: 'white',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={{flex: 20, paddingTop: 20}}>
          {/* Footer - header */}
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 25,
            }}>
            <View style={{height: 1, backgroundColor: '#fce8e8', flex: 1}} />
            <Text
              style={{
                padding: 9,
                fontSize: fontSize.h6,
                fontWeight: '600',
                color: '#fce8e8',
                alignSelf: 'center',
                marginHorizontal: 5,
              }}>
              Use other methods?
            </Text>
            <View style={{height: 1, backgroundColor: '#fce8e8', flex: 1}} />
          </View>

          {/* Footer - icon */}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Register;

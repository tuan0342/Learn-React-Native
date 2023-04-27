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
import {isValidEmail, isValidPassword} from '../utilies/Validation';
import { 
  auth, onAuthStateChanged, firebaseDatabaseRef, 
  firebaseSet, db, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, sendEmailVerification 
} from '../firebase/firebase';


const Login = props => {
  const [keyboardDidShow, setKeyboardDidShow] = useState(false); // false (bàn phím ko bật), true (đang bật bàn phím)
  // states for validating
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  // states to store email/password
  const [email, setEmail] = useState('anhphan0110@gmail.com');
  const [password, setPassword] = useState('123456Abc');

  // check validation email and password
  const isValidationOK = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      errorEmail.length == 0 &&
      errorPassword.length == 0
    );
  };

  // navigation
  const {navigation, route} = props;

  // function of navigate to/back
  const {navigate, goBack} = navigation;

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
            value={email}
          />
          <Text style={{color: 'red', fontSize: fontSize.h6}}>
            {errorEmail}
          </Text>
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
            value={password}
          />
          <Text
            style={{
              color: 'red',
              fontSize: fontSize.h6,
            }}>
            {errorPassword}
          </Text>
        </View>
      </View>

      {/* Button (gồm login và register)*/}
      {keyboardDidShow == false && (
        <View style={{flex: 15}}>

          {/* Button login */}
          <TouchableOpacity
            disabled={isValidationOK() == false} // khi ko thỏa mãn các điều kiện validation thì sẽ ẩn button (disabled = true)
            onPress={() => {
              // lưu thông tin đăng nhập vào database
              signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                      // Signed in 
                      const user = userCredential.user;  // tạo user

                      // cập nhật realtime user
                      firebaseSet(firebaseDatabaseRef( db, `users/${user.uid}`), {  
                          // các giá trị lưu trong bảng
                          userId: user.uid,
                          email: user.email,
                          emailVerified: user.emailVerified,
                          accessToken: user.accessToken
                      })
                      
                      navigate('UITab')  // đăng kí thành công thì chuyển sang UITabs
                  })
                  .catch((error) => {
                      alert(`Can not register, error: ${error.message}`)
                  });

              navigate('UITab');
            }}
            style={{
              backgroundColor:
                isValidationOK() == true ? colors.primary : colors.inactive,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 70,
              borderRadius: 20,
              marginTop: 15,
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
      <View style={{flex: 25, paddingTop: 20}}>
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

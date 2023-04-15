import React, {useState} from 'react';
import {View, ScrollView, Text, Switch} from 'react-native';
import {colors, fontSize} from '../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';
import UIHeader from '../components/UIHeader';

function Settings(props) {
  const [isEnabledLockApp, setIsEnabledLockApp] = useState(false);
  const [isEnabledFingerprint, setIsEnabledFingerprint] = useState(false);
  const [isEnabledPassword, setIsEnabledPassword] = useState(false);
  const toggleSwitchLockApp = () =>
    setIsEnabledLockApp(previousValue => !previousValue);
  const toggleSwitchFingerprint = () =>
    setIsEnabledFingerprint(previousValue => !previousValue);
  const toggleSwitchPassword = () =>
    setIsEnabledPassword(previousValue => !previousValue);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header */}
      <UIHeader title={'Settings UI'} />

      {/* Body */}
      <ScrollView style={{}}>
        {/* ScrollView block */}
        <View>
          {/* ScrollView header */}
          <View
            style={{
              height: 40,
              backgroundColor: '#f2f2f2',
            }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                marginTop: 15,
                marginLeft: 10,
                fontWeight: '700',
              }}>
              Common
            </Text>
          </View>

          {/* ScrollView body */}
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="globe"
              size={20}
              color={colors.lighBlack}
              style={{marginHorizontal: 22}}
            />
            <Text style={{color: colors.lighBlack}}>Language</Text>
            <Text
              style={{
                color: '#9A9A9A',
                marginLeft: 'auto',
                paddingHorizontal: 5,
              }}>
              English
            </Text>
            <Icon
              name="chevron-right"
              size={20}
              color={'#9A9A9A'}
              style={{marginHorizontal: 3, marginRight: 10}}
            />
          </View>
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="cloud"
              size={20}
              color={colors.lighBlack}
              style={{marginHorizontal: 20}}
            />
            <Text style={{color: colors.lighBlack}}>Environment</Text>
            <Text
              style={{
                color: '#9A9A9A',
                marginLeft: 'auto',
                paddingHorizontal: 5,
              }}>
              Production
            </Text>
            <Icon
              name="chevron-right"
              size={20}
              color={'#9A9A9A'}
              style={{marginHorizontal: 3, marginRight: 10}}
            />
          </View>
        </View>

        {/* ScrollView block */}
        <View>
          {/* ScrollView header */}
          <View
            style={{
              height: 40,
              backgroundColor: '#f2f2f2',
            }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                marginTop: 15,
                marginLeft: 10,
                fontWeight: '700',
              }}>
              Account
            </Text>
          </View>
          {/* ScrollView body */}
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="phone"
              size={20}
              color={colors.lighBlack}
              style={{marginHorizontal: 22}}
            />
            <Text style={{color: colors.lighBlack}}>Phone number</Text>
            <Icon
              name="chevron-right"
              size={20}
              color={'#9A9A9A'}
              style={{marginHorizontal: 3, marginRight: 10, marginLeft: 'auto'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="envelope"
              size={20}
              color={colors.lighBlack}
              style={{marginHorizontal: 20}}
            />
            <Text style={{color: colors.lighBlack}}>Email</Text>
            <Icon
              name="chevron-right"
              size={20}
              color={'#9A9A9A'}
              style={{marginHorizontal: 3, marginRight: 10, marginLeft: 'auto'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="sign-out"
              size={20}
              color={colors.lighBlack}
              style={{marginHorizontal: 21}}
            />
            <Text style={{color: colors.lighBlack}}>Sign out</Text>
            <Icon
              name="chevron-right"
              size={20}
              color={'#9A9A9A'}
              style={{marginHorizontal: 3, marginRight: 10, marginLeft: 'auto'}}
            />
          </View>
        </View>

        {/* ScrollView block */}
        <View>
          {/* ScrollView header */}
          <View
            style={{
              height: 40,
              backgroundColor: '#f2f2f2',
            }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                marginTop: 15,
                marginLeft: 10,
                fontWeight: '700',
              }}>
              Security
            </Text>
          </View>

          {/* ScrollView body */}
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="mobile"
              size={20}
              color={colors.lighBlack}
              style={{marginHorizontal: 23}}
            />
            <Text style={{color: colors.lighBlack}}>
              Lock app in background
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#fecdcd'}}
              thumbColor={isEnabledLockApp ? colors.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchLockApp}
              value={isEnabledLockApp}
              style={{marginLeft: 'auto'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="unlock"
              size={20}
              color={colors.lighBlack}
              style={{marginLeft: 20, marginRight: 16}}
            />
            <Text style={{color: colors.lighBlack}}>Use fingerprint</Text>
            <Switch
              trackColor={{false: '#767577', true: '#fecdcd'}}
              thumbColor={isEnabledFingerprint ? colors.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchFingerprint}
              value={isEnabledFingerprint}
              style={{marginLeft: 'auto'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="lock"
              size={20}
              color={colors.lighBlack}
              style={{marginHorizontal: 20}}
            />
            <Text style={{color: colors.lighBlack}}>Change password</Text>
            <Switch
              trackColor={{false: '#767577', true: '#fecdcd'}}
              thumbColor={isEnabledPassword ? colors.primary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchPassword}
              value={isEnabledPassword}
              style={{marginLeft: 'auto'}}
            />
          </View>
        </View>

        {/* ScrollView block */}
        <View>
          {/* ScrollView header */}
          <View
            style={{
              height: 40,
              backgroundColor: '#f2f2f2',
            }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                marginTop: 15,
                marginLeft: 10,
                fontWeight: '700',
              }}>
              Misc
            </Text>
          </View>

          {/* ScrollView body */}
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="file"
              size={20}
              color={colors.lighBlack}
              style={{marginLeft: 19, marginRight: 16}}
            />
            <Text style={{color: colors.lighBlack}}>Term of Service</Text>
            <Icon
              name="chevron-right"
              size={20}
              color={'#9A9A9A'}
              style={{marginHorizontal: 3, marginRight: 10, marginLeft: 'auto'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginVertical: 7}}>
            <Icon
              name="envelope-open"
              size={20}
              color={colors.lighBlack}
              style={{marginLeft: 19, marginRight: 15}}
            />
            <Text style={{color: colors.lighBlack}}>Open source licenses</Text>
            <Icon
              name="chevron-right"
              size={20}
              color={'#9A9A9A'}
              style={{marginHorizontal: 3, marginRight: 10, marginLeft: 'auto'}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Settings;

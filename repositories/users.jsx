// https://randomuser.me/api/

import axios from 'axios';
import {convertDateTime} from '../utilies/DateTime';

const SERVER_NAME = 'randomuser.me';

const APIUrlGetUserDetail = `https://${SERVER_NAME}/api`;

const getUserDetail = async () => {
  try {
    // alert(`You pressed getUserDetail`);
    let response = await axios.get(APIUrlGetUserDetail);

    if (response.status != 200) {
      throw 'Failed request (get data users)';
    }

    if (response.data.results.length > 0) {
      let responseUser = response.data.results[0];
      let user = {};
      user.name =
        `${responseUser.name.title}${responseUser.name.first}${responseUser.name.last}` ??
        '';
      user.dateOfBirth = convertDateTime(responseUser.dob.date);
      user.email = responseUser.email ?? '';
      user.gender = responseUser.gender ?? 'male'; //default value
      user.userId = `${responseUser.id.name}${responseUser.id.value}` ?? 'No'; // nối 2 xâu kí tự
      user.address =
        `${responseUser.location.state}, ${responseUser.location.street.name}` ??
        '';
      user.username = responseUser.login.username ?? '';
      user.url = responseUser.picture.large ?? '';
      user.phone = responseUser.phone ?? '';
      user.registerDate = convertDateTime(responseUser.registered.date);
      return user;
    } else {
      throw 'User not found';
    }
  } catch (error) {
    throw error;
  }
};

const login = ({email, password}) => {};

// many other functions

export default {getUserDetail, login};

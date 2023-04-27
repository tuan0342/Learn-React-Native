import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {fontSize, colors} from '../constants/controlConst';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LineChart} from 'react-native-chart-kit';
import {
  users as UsersRepository,
  population as PopulationRepository,
} from '../repositories/repoController';

function Profile(props) {
  const urlImg =
    'https://i.pinimg.com/736x/d0/a0/c7/d0a0c7637df175c5d7055fe15a201e04.jpg';

  const [user, setUser] = useState({});
  const [populations, setPopulations] = useState({});

  // Biểu đồ
  const screenWidth = Dimensions.get('window').width - 50;
  const chartConfig = {
    backgroundColor: '#F3DEBA', //F3E99F
    backgroundGradientFrom: '#F3DEBA', //F3E99F
    backgroundGradientTo: '#F3DEBA', //F3E99F
    decimalPlaces: 2, // optional, defaults to 2dp
    backgroundGradientToOpacity: 0.5,
    barPercentage: 0.5,
    color: () => '#675D50', //#FF6D60
    labelColor: () => '#675D50',
  };
  let label = [];
  let countPeoples = [];
  for (let i = 0; i < populations.length; i++) {
    label.push(populations[i].year);
    countPeoples.push(populations[i].countPeople / 100000);
  }

  // console.log(label);
  // console.log(countPeoples);

  // called when component loaded => componentDidMount
  useEffect(() => {
    UsersRepository.getUserDetail().then(dataUser => setUser(dataUser)); // nếu lấy được data thì setUser

    PopulationRepository.getPopulation({
      drilldowns: 'Nation',
      measures: 'Population',
    }).then(responsePopulations => {
      setPopulations(responsePopulations);
    });
  }, []);

  const {
    name,
    email,
    dateOfBirth,
    gender,
    userId,
    address,
    username,
    url,
    phone,
    registerDate,
  } = user;

  return (
    <ScrollView style={styles.all}>
      {/* Header */}
      <View style={{flexDirection: 'row', height: 100}}>
        {/* avt */}
        <Image style={styles.headerImg} source={{uri: urlImg}} />
        {/* Name */}
        <Text style={styles.headerText}>{name}</Text>
      </View>

      {/* Body - Detail */}
      <View>
        {/* Phone */}
        <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 0}}>
          <Icon
            name="phone"
            size={15}
            color={'#383838'}
            style={{
              marginRight: 20,
              alignSelf: 'center',
            }}
          />
          <Text style={{color: '#383838', fontSize: 15}}>{phone}</Text>
        </View>

        {/* Email */}
        <View style={{flexDirection: 'row', marginTop: 3, marginBottom: 20}}>
          <Icon
            name="envelope-o"
            size={15}
            color={'#383838'}
            style={{
              marginRight: 20,
              alignSelf: 'center',
            }}
          />
          <Text style={{color: '#383838', fontSize: 15}}>{email}</Text>
        </View>

        {/* Body - Detail block - Username*/}
        <View style={{marginTop: 9, marginBottom: 9}}>
          <Text style={styles.bodyBlockTitle}>Username: </Text>
          <Text style={styles.bodyBlockContent}>{username}</Text>
        </View>

        {/* Body - Detail block - Id*/}
        <View style={{marginTop: 9, marginBottom: 9}}>
          <Text style={styles.bodyBlockTitle}>Id: </Text>
          <Text style={styles.bodyBlockContent}>{userId}</Text>
        </View>

        {/* Body - Detail block - Date */}
        <View style={{marginTop: 9, marginBottom: 9}}>
          <Text style={styles.bodyBlockTitle}>Date: </Text>
          <Text style={styles.bodyBlockContent}>{dateOfBirth}</Text>
        </View>

        {/* Body - Detail block - Gender*/}
        <View style={{marginTop: 9, marginBottom: 9}}>
          <Text style={styles.bodyBlockTitle}>Gender: </Text>
          <Text style={styles.bodyBlockContent}>{gender}</Text>
        </View>

        {/* Body - Detail block - Address*/}
        <View style={{marginTop: 9, marginBottom: 9}}>
          <Text style={styles.bodyBlockTitle}>Address: </Text>
          <Text style={styles.bodyBlockContent}>{address}</Text>
        </View>

        {/* Body - Detail block - Register of date*/}
        <View style={{marginTop: 9, marginBottom: 9}}>
          <Text style={styles.bodyBlockTitle}>Register of Date: </Text>
          <Text style={styles.bodyBlockContent}>{registerDate}</Text>
        </View>
      </View>

      <View style={{paddingTop: 10}}>
        <Text style={styles.bodyBlockTitle}>US population chart: </Text>
        {/* <LineChart
          data={{
            labels: label,
            datasets: [
              {
                data: countPeoples,
              },
            ],
            legend: [`Population in US`],
          }}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
        /> */}
      </View>

      <View style={{height: 30}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#fffbf5',
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 40,
  },

  headerImg: {height: 70, width: 70, marginTop: 20, borderRadius: 50},

  headerText: {
    marginLeft: 20,
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: '#300404',
    alignSelf: 'center',
  },

  bodyBlockTitle: {color: '#717171', fontSize: 13},

  bodyBlockContent: {
    color: '#2C2C2C',
    fontWeight: '600',
    fontSize: fontSize.h4,
  },
});

export default Profile;

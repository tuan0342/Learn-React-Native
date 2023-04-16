// https://datausa.io/api/data?drilldowns=Nation&measures=Population

import axios from 'axios';

const SERVER_NAME = `datausa.io`;

async function getPopulation({drilldowns, measures}) {
  const APIUrlGetPopulation = `https://${SERVER_NAME}/api/data?drilldowns=${drilldowns}&measures=${measures}`;

  try {
    // Khởi tạo biến lưu kết quả
    let result = [];

    // Lấy dữ liệu từ API
    let responseData = await axios.get(APIUrlGetPopulation);

    // Foreach từng phần tử rồi nhét vào biến lưu kết quả
    responseData.data.data.forEach(element => {
      let myObject = {};
      myObject.nationId = element['ID Nation'];
      myObject.name = element['Nation'];
      myObject.year = element['Year'];
      myObject.countPeople = element['Population'];
      result.push(myObject);
    });

    // Trả về kết quả
    return result;
  } catch (error) {
    throw error;
  }
}

async function getPopulationChart() {
  const APIUrlGetPopulation = `https://datausa.io/api/data?drilldowns=Nation&measures=Population`;

  try {
    // Khởi tạo biến lưu kết quả
    let result = [];

    // Lấy dữ liệu từ API
    let responseData = await axios.get(APIUrlGetPopulation);

    // Foreach từng phần tử rồi nhét vào biến lưu kết quả
    responseData.data.data.forEach(element => {
      let myObject = {};
      myObject.year = element['Year'];
      myObject.countPeople = element['Population'];
      result.push(myObject);
    });

    // Trả về kết quả
    return result;
  } catch (error) {
    throw error;
  }
}

export default {getPopulation, getPopulationChart};

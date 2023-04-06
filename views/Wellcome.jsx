// import * as React from 'react';
import React from 'react';
import {Text, View} from 'react-native';
import {sumNumber, subNumber} from '../utilies/Calculation';

// component = function
const Wellcome = (props) => {
    const {x, y, products} = props;
    return (        
        <View>
            <Text>Sinh ngày {x}, tháng {y}</Text>
            <Text>Tổng hai số: x = {x} và y = {y} là: {sumNumber(x,y)}</Text>
            <Text>Hiệu hai số: x = {x} và y = {y} là: {subNumber(x,y)}</Text>
            <Text>Danh sách các sản phẩm iphone:</Text>
            {products.map(eachProduct => 
                <Text>- Tên sản phẩm: {eachProduct.productName}, năm sản xuất {eachProduct.year}</Text>
            )}
        </View>
    );
}

export default Wellcome;

// function MainScreen(props){
//     return (        
//         <Text>Home screens</Text>
//     );
// }


import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import GridItem from './GridItem';

function ProductGridView(props) {
  // list product
  const [product, setProducts] = useState([
    {
      productName: 'Samsung Galaxy S22',
      url: 'https://www.notebookcheck.net/fileadmin/Notebooks/Samsung/Galaxy_S22/4_to_3_Teaser_Samsung_Galaxy_S22.jpg',
      price: 75,
      specification: [
        'Camera Góc Siêu Rộng 12MP mở rộng tầm nhìn tối đa',
        'Cảm biến điểm ảnh lớn nhất',
        'Lớp kính siêu trong',
      ],
      reviewsCount: 190,
      start: 4.5,
    },
    {
      productName: 'AirRam Cordless Stick Vacuum Cleaner',
      url: 'https://cdn-amz.woka.io/images/I/61mT-Nti4uL.jpg',
      price: 88,
      specification: [
        'Dry clean',
        'Cyclone filter',
        'Convenience cord storage',
      ],
      reviewsCount: 110,
      start: 4,
    },
    {
      productName: 'Oppo A95',
      url: 'https://image.oppo.com/content/dam/oppo/product-asset-library/specs/a95/a95-black-silver-1920.png',
      price: 93,
      specification: [
        'Gia tốc kế',
        'Cảm biến quang học',
        'Hỗ trợ Vân Tay Trong Màn Hình và Mở Khóa Khuôn Mặt',
      ],
      reviewsCount: 139,
      start: 4.7,
    },
    {
      productName: 'Iphone 12 pro max',
      url: 'https://www.techone.vn/wp-content/uploads/2021/09/vang-1.jpg',
      price: 102,
      specification: [
        'Tặng kèm củ cáp sạc',
        'Màn hình: Retina XDR 6.7‑inch OLED Multi‑Touch',
        'Dung lượng: 128GB/256GB/512GB',
        'Chip: A14 Bionic chip',
      ],
      reviewsCount: 67,
      start: 5,
    },
    {
      productName: 'Iphone 14',
      url: 'https://imgs.viettelstore.vn/Images/Product/ProductImage/dien-thoai/Apple/iPhone%2014%20Pro%20Max%20128/iPhone-14-Pro-Max-3.jpg',
      price: 134,
      specification: [
        'Máy, cáp type C to lightning, sách hướng dẫn',
        'Trải nghiệm thị giác ấn tượng - Màn hình lớn 6.7" sắc nét với công nghệ Super Retina XDR',
        'Sử dụng lâu dài với viên pin lớn giúp phát video liên tục lên tới 26 giờ',
        'Tuyệt đỉnh thiết kế, tỉ mỉ từng đường nét - Nâng cấp toàn diện với kiểu dáng mới, nhiều lựa chọn màu sắc trẻ trung',
        'Hiệu năng hàng đầu thế giới - Apple A15 Bionic 6 nhân xử lí nhanh, ổn định',
      ],
      reviewsCount: 120,
      start: 4.2,
    },
    {
      productName: 'Google Pixel 7',
      url: 'https://www.didongmy.com/vnt_upload/product/10_2022/thumbs/(600x600)_pixel_7_pro_hazel_thumb_600x600_didongmy_01.jpg',
      price: 130,
      specification: [
        `It's no surprise that the best Android smartphone is the one made by Google`,
      ],
      reviewsCount: 139,
      start: 3.5,
    },
    {
      productName: 'Xiaomi Redmi Note 11',
      url: 'https://cdn.tgdd.vn/Products/Images/42/245261/Xiaomi-redmi-note-11-blue-600x600.jpg',
      price: 123,
      specification: [
        'The Xiaomi Redmi Note 11 is astonishing value for money',
        `It's 50MP camera`,
      ],
      reviewsCount: 167,
      start: 4.3,
    },
    {
      productName: 'Samsung Galaxy S23 Ultra',
      url: 'https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/s/2/s23-ultra-tim.png',
      price: 168,
      specification: [`its hyperbolic name`, `a refresh rate of 120Hz`],
      reviewsCount: 189,
      start: 2,
    },
    {
      productName: 'Nokia C21 Plus',
      url: 'https://cdn.tgdd.vn/Products/Images/42/274084/Nokia-C21-Plus-Gray-600x600.jpg',
      price: 180,
      specification: [
        'the Nokia C21 Plus is a fine choice',
        'Costing just double figures',
        `the Nokia C21 Plus is excellent value and while it doesn't come with the usual lineup of high-end flagship features`,
      ],
      reviewsCount: 68,
      start: 4.4,
    },
    {
      productName: 'Oppo Find X5 Pro',
      url: 'https://cdn.tgdd.vn/Products/Images/42/250622/oppo-find-x5-pro-den-thumb-600x600.jpg',
      price: 121,
      specification: [
        'should be your next flagship smartphone',
        'will be rewarded with one of the best-looking smartphones on the market',
        'the usual array of high-spec features',
      ],
      reviewsCount: 189,
      start: 3,
    },
    {
      productName: 'Xiaomi 12S Ultra',
      url: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2022/07/xiaomi-12s-ultra-ra-mat-6.jpg',
      price: 125,
      specification: [
        'bộ vi xử lý Snapdragon 8+ Gen 1',
        'màn hình AMOLED 120Hz',
        'màn hình AMOLED cong với kích thước 6.73 inch',
      ],
      reviewsCount: 170,
      start: 4.2,
    },
  ]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={product}
        numColumns={2}
        keyExtractor={item => item.productName}
        renderItem={({item, index}) => (
          <GridItem
            item={item}
            index={index}
            onPressHeart={() => {
              // truyền hàm sang GridItem (xác định xem 'heart' được bấm hay chưa)
              let cloneProducts = product.map(eachProduct => {
                if (item.productName == eachProduct.productName) {
                  // nhân bản eachProduct kèm theo isSave bằng 'true' (lưu vào cloneProduct)
                  return {
                    ...eachProduct,
                    isSaved:
                      eachProduct.isSaved == undefined ||
                      eachProduct.isSaved == false
                        ? true
                        : false,
                  };
                }
                return eachProduct;
              });
              setProducts(cloneProducts); // cập nhật product
            }}
          />
        )}
      />
    </View>
  );
}

export default ProductGridView;

/** Array Matching */
var list = [1, 2, 3, 4, 5];

var [a, b, ...n] = list;

/**
 * Gán giá trị cho nhiều biến thông qua array
 * 
 * sử dụng cú pháp: 
 * - [a, b] gán giá trị a = list[0] và b = list[1]
 * - [a, , b] gán giá trị a = list[0] và b = list[2]. 
 * 
 * Sử dụng 2 dấu phẩy liền nhau để bỏ qua 1 phần tử tiếp theo trong mảng
 * - [a, b, ...c] gán giá trị a = list[0], b = list[1] và c là 1 mảng với các phần tử còn lại trong mảng
 * 
 * Lưu ý: với cách khai báo này, khi sử dụng biến c có 2 trường hợp sau:
 * + Nếu bạn muốn sử dụng c như 1 mảng thì: func(...c)
 * + Nếu muốn sử dụng c như 1 tập hợp các phần tử thì: func(c)
 *  
 */

var numbers = [1, 2];
var [x, y, z = 0] = numbers;
console.log(x, y, z);
/**
 * Gán biến với giá trị mặc định
 * 
 * Với cú pháp gán như ở trên, nếu như mảng numbers không tồn tại phần tử thứ 2
 * thì mặc định z = 0
 */


/** Object Matching */
var data = {
    mID: 1,
    name: "Mobile",
    price: 234567
};

/**
 * Gán giá trị cho nhiều biến với object
 * 
 * sử dụng cú pháp: {pro1, pro2}
 * 
 * ở đây, pro1 là tên thuộc tính tương ứng trong object 
 * nếu bạn muốn gán giá trị cho 1 biến có tên khác thì sử dụng cú pháp:
 * 
 * {pro1: property_01}
 * 
 * - với biến được gán có tên là property_01
 */
var { mID: id, name, price } = data;
console.log(id, name, price);

/**
 * Gán biến với giá trị mặc định
 */
var { slug = 'not-found' } = data;
console.log(slug);


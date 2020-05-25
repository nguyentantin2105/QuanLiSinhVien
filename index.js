
//=======================================
/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var fs = require('fs');
var readlineSync = require('readline-sync');


function showMenu(){
  console.log('1.Input data contact(name, phone number) ');
  console.log('2.Change data');
  console.log('3.Delete contact');
  console.log('4.Find contact');
  var option = readlineSync.question('Choose your option: ');
  switch (option){
    case '1':
        InputData();
        showMenu();
        break;
    case '2':
        Changedata();
        showMenu();
        break;
    case '3':
        DeleteContact();
        showMenu();
        break;
    case '4': 
        findContact();
        showMenu();
        break;
    default:
        console.log('Wrong option. Please choose again........');
        showMenu();
        break;
  }
}

var contacts =[];

function InputData(){
  var name = readlineSync.question('Input name: ');
  var phone = readlineSync.question('Input phone number: ');
  var contact ={
    name: name,
    phone: phone
  };
  contacts.push(contact);
  var contactString = JSON.stringify(contacts);
  var content = fs.writeFileSync('./data.json', contactString);
}

function findContact(){
  loadData();
  var partData = readlineSync.question('Input data: ');
  var contactString = JSON.stringify(contacts);
  //console.log(contactString);
  var contactObj = JSON.parse(contactString);
  //console.log(contactObj);
  for (var i of contactObj){
  	 for (var j in i){
  	 	if (i[j].search(partData)>=0)
  	 		console.log(i);
        return i;
    }
  }
}

function DeleteContact(){
	var question = readlineSync.question('Input Contact need to delete: ');
  //console.log(contacts);
  for (var contact of contacts){
    if (contact.name === question || contact.phone === question){
       var i = contacts.indexOf(contact);
       if (i !== -1){
        contacts.splice(i, 1);
       }
       load(contacts);
    }
  }
}

function Changedata(){
  var find = findContact();
  //console.log(find);
  var question = readlineSync.question('Input attribute need to change (name or phone): ');
  switch (question){
  	case 'name':
  		for (var i of contacts){
  			//console.log(contacts.indexOf(i));
  			if (i.name === find.name)
  				contacts.splice(contacts.indexOf(i),1);
  		}
  		//console.log(contacts);
  		var newName = readlineSync.question('Input new name: ');
  		find.name= newName;
  		//console.log(find);
  		contacts.push(find);
  		var contactObj = JSON.stringify(contacts);
  		//console.log(contacts);
  		var write = fs.writeFileSync('./data.json', contactObj);
  		break;
  	case 'phone':
  		for (var i of contacts){
  			//console.log(contacts.indexOf(i));
  			if (i.phone === find.phone)
  				contacts.splice(contacts.indexOf(i),1);
  		}
  		var newPhone = readlineSync.question('Input new phone: ');
  		find.phone= newPhone;
  		//console.log(find);
  		contacts.push(find);
  		var contactObj = JSON.stringify(contacts);
  		//console.log(contacts);
  		var write = fs.writeFileSync('./data.json', contactObj);
  		break;
  	default: 
  		console.log('Wrong input....');

  		break;
  }
}

function loadData(){
  var fileContent = fs.readFileSync('./data.json');
  contacts = JSON.parse(fileContent);
  //console.log(contacts);
}

function load(contact){
  var contactString = JSON.stringify(contact);
  var write = fs.writeFileSync('./data.json',contactString);
}

function main(){
    showMenu()
    // loadData();
    // findContact();
    // InputData();
    // showMenu();
    // Changedata();
    //DeleteContact();
}

main();
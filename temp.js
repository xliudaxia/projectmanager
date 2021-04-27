// function counter(n){
//   return {
//     get count(){return n++;},
//     set count(m){
//       if(m >=n) n=m;
//       else throw Error("count can only set to a large value");
//     }
//   };
// }

// var c = counter(1000);
// console.log(c.count);
// console.log(c.count);

// function constfuncs(){
//   var funcs = [];
//   for(var i =0;i<10;i++)
//     funcs[i]= function() {return i;};
//   return funcs;
// }
// var funcs = constfuncs();
// console.log(funcs[1]);



let a = {
  name: "douban",
  sayHi: function (args) {
    console.log(this.name, args);
  }
}

// console.log(a.sayHi());
a.sayHi.bind({ name: 'tgieji' }, "tiekucha")()


function add () {
  var counter = 0;
  return function () {
    counter += 1;
    return counter;
  }
}


let a1 = add()
let result = a1()
result = a1()
result = a1()
result = a1()
result = a1()
console.log(result);


var add = function qq() {
  var counter = 0;
  return function () { counter += 1; return counter; }
};

let result1 = add();
let result2=result1()
result2=result1()
console.log(result2);

function asyncfunc(value){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      if(Math.random()>0.5){
        resolve(value);
      }else{
        reject(value);
      }
    
    }, 1000);
  })
} 

asyncfunc("豆瓣").then((value)=>{
  console.log(value);
}).catch(err=>{
  console.error(err+"错了");
})




function Father(name,age,sex){
  this.name= name;
  this.age = age ;
  this.sex =sex;
}

let ft = new Father("豆瓣",25,"女")
Father.prototype.year = 2005;
for (const key in ft) {
  if (Object.hasOwnProperty.call(ft, key)) {
    const element = ft[key];
    // console.log(element);
  }
}
Reflect.ownKeys(ft).forEach(element => {
  console.log(element+"666");
});
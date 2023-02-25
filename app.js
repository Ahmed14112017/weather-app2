

/* Global Variables */
const generate=document.querySelector("#generate");


const baseurl="https://api.openweathermap.org/data/2.5/weather?zip=";
const key="&appid=c19f0aae437eeea8c7850d8434bde58d&units=metric";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
generate.addEventListener("click",generateData);
// const url=`${baseurl}${zip.value}${key}`
// console.log(zip);
// console.log(baseurl);
// console.log(key);

function generateData(e){
    /*
    declear zip to get value of zip cod and feeling
    */

    const zip = document.querySelector("#zip").value;
    const feelings=document.querySelector("#feelings").value;
    getweather(baseurl,zip,key).then(data=>{ // get data function then post data function to server
        postdata("/postdata",{
            date:newDate,
            temp:data.main.temp,
            content:feelings
        });
    })
    .then((data)=>{
        console.log(data);
        updataui(); //get the data to update UI
    })
}
const getweather= async(baseurl,zipcode,key)=>{ // get data from api by using url and key 
    const res=await fetch(baseurl + zipcode + key);
    try{
        
        const resdata=await res.json(); // get data in json
        console.log(resdata)
        return resdata;
    }catch(error){
        console.log("error",error)
    }
}

const postdata=async(url="/postdata",data={})=>{ //post data to local server
    const response=await fetch(url,{
        method:"POST",
        credentials:'same-origin',
        headers:{
            'content-type':'application/json', // must type of content of api data like type of data in server
          },
          body:JSON.stringify(data)
        
    })
    try{
        const newdata=await response.json();
        return newdata;
    }catch(error){
        console.log("error",error)
    }
}
const updataui=async()=>{ // function to updata data in brwoser
    const ui=await fetch("/all");
    try{
        const result=await ui.json();
        
        
        document.getElementById("date").innerHTML=`today is ${result.date}`;
        document.getElementById("temp").innerHTML=`today is ${result.temp}`;
        document.getElementById("content").innerHTML=`today is ${result.content}`;

    }catch(error){
        console.log("error",error)
    }
}

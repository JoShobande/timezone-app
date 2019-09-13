
let existingCities = []
function handleSubmit(event){
    event.preventDefault()
    search = (key, city)=>{
        for(let i=0; i<city.length; i++){
            if(city[i].country === key){
                return  city[i]
            }
        }
    }

    let input = document.querySelector("#searchCity").value
    if(input == ""){
        alert("Please enter a Location")
    }else{
        let noSpace = input.trim()

        function toUpperCase(word){
            let array1 = word.split("_")
            let newarray1 = []
        
            for(var x = 0; x < array1.length; x++){
                newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
            }
            return newarray1.join('_');
        }
    
        document.querySelector("#searchCity").value = ""
        let result = search(toUpperCase(noSpace), countries)
        if(!result){
            alert("Invalid Location")
        }else{
            let continent = `${result.continent}`
            let city = `${result.country}`
            let continentCity = `${continent}/${city}`
            console.log(city)
            
            getLocation(`${continentCity}`, city )

            
        }      
    }    
}

function getLocation(city, cityInputed){
    const url = `http://worldtimeapi.org/api/timezone/${city}`
    const days = ["Monday", "Tuesday", "Wednessday", "Thursday","Friday", "Saturday", "Sunday" ]

    fetch(url).then((response)=>{
        if(response.status == 200){
            return response.json()
        }else{
            throw new Error("unable to complete request")
        }   
    }).then((result)=>{
        console.log(result) 
        let unixtime = result.unixtime
        let offset = result.utc_offset
        let newoffset = offset.split(":")
        let offsetHour = newoffset[0]
        let integerOffset = parseInt(offsetHour, 10);

        let dayOfTheWeek = days[result.day_of_week - 1]
        console.log(dayOfTheWeek)

        let correctHours
        let minutes
        let seconds

        const timer =  setInterval(function(){
            let now = unixtime++

            let days =  Math.floor(now / (60 * 60 * 24)) 
            let rem1 = now - days * (60 * 60 * 24)
            let hours = Math.floor(rem1 / (60 * 60))
            
            let rem2 = rem1 - hours * (60 * 60)
            minutes = Math.floor(rem2 / (60))
            
            let rem3 = rem2 - minutes * (60)
            seconds = Math.floor(rem3)
            correctHours = hours + integerOffset

            if(correctHours < 0){
                correctHours = 24 +  correctHours
            }
            // console.log(correctHours, minutes, seconds, city , existingCities)

            

            let findExistingCities = existingCities.find((thisCity)=>{
                return thisCity.countryName == cityInputed
            })
 
            if(!findExistingCities){
                 if(existingCities.length == 6){
                    let enterCity = document.querySelector("#searchCity")
                    enterCity.setAttribute("disabled", true) 
                 }else{
                     
                savedCities(cityInputed)
                createCity(cityInputed)
                 }
                 
            }else{
                updateCityProperties(cityInputed, dayOfTheWeek, correctHours, minutes, seconds)
            }
            
            // savedCities(dayOfTheWeek, correctHours, minutes, seconds)

           
        }, 1000)
        
        

    }).catch((err)=>{
        console.log(err)
    })
}

const createCity = (cityName)=>{
    // let id = uuidv4()
    // cityName = document.querySelector("#searchCity").value
    if(existingCities.length == 6){
       let enterCity = document.querySelector("#searchCity")
       enterCity.setAttribute("disabled", true) 
    } else{
        existingCities.push({
            // id: id,
            countryName: cityName,
            day: "",
            time: "",
        })
        console.log("pushed")
    }
   
}

const updateCityProperties = (containerId, dayOfTheWeek, hours, minutes, seconds)=>{
    let container = document.getElementById(containerId)
    if(container){
        let time = document.querySelector(`#${containerId} > .countryDetails > .countryTime`)
        let day = document.querySelector(`#${containerId} > .countryDetails > .dayOfweek`)
        time.innerHTML = `${hours}: ${minutes}: ${seconds}`
        day.innerHTML = dayOfTheWeek
        
    }
}

const savedCities = function(nameofCity){
    let container = document.querySelector(".main-content")


    let row1 = document.createElement("div")
    let countryDetails = document.createElement("div")
    let countryName = document.createElement("div")
    let removeButton = document.createElement("div")
    let Button = document.createElement("button")
    let dayOfWeek = document.createElement("div")
    let countryTime = document.createElement("div")

    row1.classList.add("countryContainer")
    row1.setAttribute('id', nameofCity)
    countryDetails.classList.add("countryDetails")
    countryName.classList.add("countryName")
    removeButton.classList.add("remove-button")
    dayOfWeek.classList.add("dayOfweek")
    countryTime.classList.add("countryTime")

    countryName.innerHTML = nameofCity
    Button.innerHTML = "X"
    dayOfWeek.innerHTML = ""
    countryTime.innerHTML = ""

    removeButton.appendChild(Button)
    countryDetails.appendChild(countryName)
    countryDetails.appendChild(removeButton)
    countryDetails.appendChild(dayOfWeek)
    countryDetails.appendChild(countryTime)
    row1.appendChild(countryDetails)

    container.appendChild(row1)

    

}



    
// getCountryName = ()=>{
    
    // dayOfWeek = document.querySelectorAll(".dayOfTheWeek")
    // dayOfWeek.forEach((day)=>{
    //     console.log(day.textContent)
    // })
    
    // countryName = document.querySelectorAll(".countryName").forEach((count)=>{
        //let thisCountry = document.querySelectorAll(".countryName")[count]
        // let siblings = [].slice.call(count.parentNode.children).filter(function(v) {return v !== count})
        // console.log(siblings[1].textContent)
        
        
        // fetch(`http://worldtimeapi.org/api/timezone/${count.textContent}`).then((res)=>{


            // let result = res.json()  
            // console.log(result)
            // return result          
            // siblings[1].textContent = result.day_of_week
           
            
            // let milliSec = result.unixtime
            
            // let days =  Math.floor(milliSec / (60 * 60 * 24)) 
            // let rem1 = milliSec - days * (60 * 60 * 24)
            // let hours = Math.floor(rem1 / (60 * 60))
            
            // let rem2 = rem1 - hours * (60 * 60)
            // let minutes = Math.floor(rem2 / (60))
            
            // let rem3 = rem2 - minutes * (60)
            // let seconds = Math.floor(rem3)

            // console.log(hours, minutes, seconds)  
           
        // }).then((result)=>{
        //     console.log(result.unixtime)
            // for (let i = 0; i <= days.length; i++){
            //     siblings[1].textContent = result.day_of_week[i]
            // }
            // const checkDay= function(dayss){
            //     const index = days.findIndex(function(day){
            //         return day === dayss
            //     })
            // }
            // siblings[1].textContent = checkDay(result.day_of_week)
            


           
           // const deleteTodo = function(todos, todosText){
                //     const index = todos.findIndex( function(todo){
                //         return todo.text === todosText  
                //     })
                
                //     if(index > -1){
                //         todos.splice(index, 1)
                //     }
                // }
    //     })
    // })

    
    
    // let result = []
    
    // country.forEach((data)=>{
        
    // })
        
            
    
    //    
    
    // console.log(region.textContent)   

// }

// getCountryName()






// const days = ["Monday", "Tuesday", "Wednessday", "Thursday","Friday", "Saturday", "Sunday" ]

// const UI = ()=>{
//     const showApp = ()=>{
//         document.querySelector("#app-loader").classList.add("display-none")
//         document.querySelector("container").removeAttribute("hidden")
//     }
//     const loadApp = ()=>{
//         document.querySelector("#app-loader").classList.remove("display-none")
//         document.querySelector("container").setAttribute("hidden", "true")
//     }

//     return{
//         showApp,
//         loadApp
//     }
// }
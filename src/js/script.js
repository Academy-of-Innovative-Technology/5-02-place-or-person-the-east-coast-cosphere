
let Input_DOM = document.querySelector("#country");
let Submit_DOM = document.querySelector("#Submit");
let Name_DOM = document.querySelector("#Name");

let Official_Name_DOM = document.querySelector("#Official_Name");
let Language_DOM = document.querySelector("#Language");
let Demonym_DOM = document.querySelector("#Demonym");
let Foundation_DOM = document.querySelector("#Foundation");
let Government_Type_DOM = document.querySelector("#Government_Type");

let Continent_DOM = document.querySelector("#Continent");
let Population_DOM = document.querySelector("#Population");
let Area_DOM = document.querySelector("#Area");

let Pictures_DOM = document.querySelector("#Pictures");
let Person_DOM = document.querySelector("#Person");

let Flag_DOM = document.querySelector("#Flag");

let Get_Flag_Link = (ISO_3166_A2) => {
    return `https://flagcdn.com/${ISO_3166_A2.toLowerCase()}.svg`;
}


let Data = [];

function Load_Random_Country() {
    let Random_Country_Index = Math.round(Math.random() * (Data.length - 1));
    console.log(Random_Country_Index);
    Load_Country(Data[Random_Country_Index].name);
}

let Supported_Countries_Datalist_DOM = document.querySelector("#Supported_Countries_Datalist");
function Load_All_Supported_Countries_To_Datalist() {
    if (!Array.isArray(Data) || Data.length == 0) {
        return console.log("Error: Data does not exist or it's empty");
    }
    Supported_Countries_Datalist_DOM.innerHTML = "";

    Data.forEach( (Country) => {
        let HTML = `<option value="${Country.official_name}">${Country.official_name}</option>`;
        Supported_Countries_Datalist_DOM.insertAdjacentHTML("beforeend", HTML);
    })
}

async function getData() {
    try {
        let response = await fetch("src/api/data.json");
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        let parsed = await response.json();
        Data = parsed.results;
        console.log(Data);
        Load_All_Supported_Countries_To_Datalist();
        Load_Random_Country();
    }
    catch (error) {
        console.log(error.message)
    }
}

getData();

function Load_Country(name) {
    console.log("Country to load is " + name)
    if (!Array.isArray(Data) || Data.length == 0) {
        return console.log("Error: Data does not exist or it's empty");
    }
    let Country_Info = Data.find( (x) => x.name.toLowerCase() === name.toLowerCase() || x.official_name.toLowerCase() === name.toLowerCase());

    if (!Country_Info ||Country_Info.length == 0) {
        return console.log("Error: Didn't find the country");
    }
    console.log(Country_Info);

    Name_DOM.innerHTML = Country_Info.name;
    Official_Name_DOM.innerHTML = `Official Name: ${Country_Info.official_name}`;
    Language_DOM.innerHTML = `Language/s: ${Country_Info.language}`; //
    Demonym_DOM.innerHTML = `Demonym: ${Country_Info.demonym}`;
    
    Foundation_DOM.innerHTML = `Foundation Date: ${Country_Info.foundation}`;
    Government_Type_DOM.innerHTML = `Government Type: ${Country_Info.government_type}`;

    Continent_DOM.innerHTML = Country_Info.continent; //
    Population_DOM.innerHTML = Country_Info.population;
    Area_DOM.innerHTML = Country_Info.area_km_square;

    

    if (Country_Info.flag_picture && Country_Info.flag_picture != "N/A"){
        Flag_DOM.src = Country_Info.flag_picture;
    } else if (Country_Info.ISO_3166_A2 && Country_Info.ISO_3166_A2 != "N/A") {
        Flag_DOM.src = Get_Flag_Link(Country_Info.ISO_3166_A2);
    } else {
        console.log("Error: No Flag found");
    }


    Pictures_DOM.innerHTML = "";
    Country_Info.pictures.forEach( (Picture_Link) => {
        let HTML = `<img style="max-width: 30%; object-fit: scale-down;" src="${Picture_Link}">`;
        Pictures_DOM.insertAdjacentHTML("beforeend", HTML);
    })
    

    if (Country_Info.Person == undefined || Country_Info.Person == []) {
        Person_DOM.innerHTML == "";
        return;
    }
    let HTML = `<h1 class="text-center text-decoration-underline">${Country_Info.Person.Name}</h1>
            <img style="max-width: 50%;" src="${Country_Info.Person.Picture}">

            <h2 class="text-center">${Country_Info.Person.Occupation}</h2>
            <h3 class="text-center">${Country_Info.Person.Date_Of_Birth} - ${Country_Info.Person.Date_Of_Death}</h3>
            <p>${Country_Info.Person.Biography}</p>`;
    Person_DOM.innerHTML = HTML;


}

Input_DOM.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        Load_Country(Input_DOM.value)
    }
})

Submit_DOM.addEventListener("click", () => {
    if (Input_DOM.value == "") {
        return console.log("Error: Input is empty")
    }
    Load_Country(Input_DOM.value);
})


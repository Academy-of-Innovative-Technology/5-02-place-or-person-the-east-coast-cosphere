
let Data = [];



async function getData() {
    try {
        let response = await fetch("src/api/data.json");
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        let parsed = await response.json();
        Data = parsed.results;
        console.log(Data);
    }
    catch (error) {
        console.log(error.message)
    }
}

getData();


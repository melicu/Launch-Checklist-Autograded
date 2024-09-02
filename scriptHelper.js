// Write your helper functions here!


require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

    let missionTargetInfo = document.getElementById("missionTarget");

    missionTargetInfo.innerHTML =
        `
            <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter} </li>
                <li>Star: ${star} </li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons} </li>
            </ol>
            <img src=${imageUrl}>
        `
}

function validateInput(testInput) {
    if (!testInput) {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number"
    } else if (!isNaN(testInput)) {
        return "Is a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotNameInput = document.querySelector("input[name=pilotName]").value;
    let copilotNameInput = document.querySelector("input[name=copilotName]").value;
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
    let cargoMassInput = document.querySelector("input[name=cargoMass]").value;
    let launchList = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required.");
        // return;
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel.value) === "Not a Number") {
        alert("Please enter valid data for each field.");
        // return;
    }

    if (fuelLevelInput < 10000 && cargoMassInput > 10000) {
        launchList.style.visibility = "visible"
        fuelStatus.innerHTML = "Fuel level too low for launch";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        pilotStatus.innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilotNameInput} is ready for launch`;
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    } else if (fuelLevelInput < 10000) {
        launchList.style.visibility = "visible"
        fuelStatus.innerHTML = "Fuel level too low for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        pilotStatus.innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilotNameInput} is ready for launch`;
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    } else if (cargoMassInput > 10000) {
        launchList.style.visibility = "visible"
        fuelStatus.innerHTML = "Fuel level high enough for launch"
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        pilotStatus.innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilotNameInput} is ready for launch`;
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";;
    } else {
        launchList.style.visibility = "visible"
        fuelStatus.innerHTML = "Fuel level high enough for launch"
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        pilotStatus.innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilotNameInput} is ready for launch`;
        launchStatus.style.color = "green";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    let response = await planetsReturned.json();

    return response;
}

function pickPlanet(planets) {
    let pickedPlanet = Math.floor(Math.random(planets) * planets.length);
    return planets[pickedPlanet];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
window.addEventListener("load", function() {

    let form = document.querySelector("form");
    let submitButton = document.getElementById("formSubmit");  

    submitButton.addEventListener("click", function(event) {

        let pilotNameInput = document.querySelector("input[name=pilotName]").value;
        let copilotNameInput = document.querySelector("input[name=copilotName]").value;
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
        let cargoMassInput = document.querySelector("input[name=cargoMass]").value;
        let launchList = document.getElementById("faultyItems");  

        event.preventDefault();
        
        formSubmission(document, launchList, pilotNameInput, copilotNameInput, fuelLevelInput, cargoMassInput)
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;

    }).then(function () {

        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planetObj = pickPlanet(listedPlanets);

        let planetName = planetObj.name;
        let planetDiameter = planetObj.diameter;
        let planetStar = planetObj.star;
        let planetDistance = planetObj.distance;
        let planetMoons = planetObj.moons;
        let planetImage = planetObj.image;

        addDestinationInfo(document, planetName, planetDiameter, planetStar, planetDistance, planetMoons, planetImage);

    })
});
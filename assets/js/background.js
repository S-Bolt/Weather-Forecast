const weatherBackgrounds = {
    "clear": "./assets/images/sunnyMountains.jpg",
    "cloudy": "./assets/images/Overcast.jpg",
    "rain": "./assets/images/raining.jpg",
    "snow": "./assets/images/snow.jpg",
    "storm": "./assets/images/thunderStorm.jpg",
    "mist": "./assets/images/foggy.jpg",
    "default": "./assets/images/default.jpg"
    
};

// Function to categorize snow descriptions into broader categories
function categorizeWeatherDescription(description) {
    description = description.toLowerCase();

     // Clear Sky
     if (description.includes("clear")) {
        return "clear";
    }

    // Cloudy Conditions
    if (description.includes("cloud") || description.includes("overcast")) {
        return "cloudy";
    }

    // Rainy Conditions
    if (description.includes("rain") || description.includes("drizzle") || description.includes("shower")) {
        return "rain";
    }

    // Snowy Conditions
    if (description.includes("snow") || description.includes("sleet") || description.includes("ice pellets")) {
        return "snow";
    }

    // Stormy Conditions
    if (description.includes("thunderstorm") || description.includes("storm") || description.includes("lightning")) {
        return "storm";
    }

    // Misty/Foggy Conditions
    if (description.includes("mist") || description.includes("fog") || description.includes("haze")) {
        return "mist";
    }

    return "default";
}

function updateBackground(weatherDescription) {
    stopSnowfall();
    // First, categorize the weather description to get the broader category
    const normalizedDescription = categorizeWeatherDescription(weatherDescription);

    // Check if the categorized description exists in the mapping
    let backgroundUrl = weatherBackgrounds[normalizedDescription] || weatherBackgrounds['default'];

    // Set the background of the body
    document.body.style.backgroundImage = `url('${backgroundUrl}')`;
    document.body.style.backgroundSize = 'cover';

    //Update text on snow
    if (normalizedDescription === "snow") {
        setTextColor("black");
        startSnowfall();
        
    } else {
        setTextColor("white");
        stopSnowfall();
        
    }
}

//Function to change text color
function setTextColor(color){
    const elements = document.querySelectorAll('h1, .large-temp, .large-status ')
    elements.forEach(element => {
        element.style.color = color;
    })  
}

function startSnowfall() {
    const container = document.getElementById('snowfall-container');
    if (container) {
        for (let i = 0; i < 35; i++) {
            setTimeout(()=> {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = '\u2746'; 
            snowflake.style.left = `${Math.random() * 100}vw`; 
            snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; 
            snowflake.style.fontSize = `${Math.random() * 10 + 10}px`; 
            container.appendChild(snowflake);
        }, i * 150)
        }
    }
}

function stopSnowfall() {
    const container = document.getElementById('snowfall-container');
    container.innerHTML = '';

}

export default updateBackground;
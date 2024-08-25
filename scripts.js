document.addEventListener("DOMContentLoaded", () => {
    const onboardingSection = document.getElementById("onboarding");
    const configurationSection = document.getElementById("configuration");
    const counterSection = document.getElementById("counter");
    const logCaloriesSection = document.getElementById("logCalories");
    const logConsumptionSection = document.getElementById("logConsumption");
    const statsSection = document.getElementById("stats");

    let calorieGoal = 0;
    let currentWeight = 0;
    let targetWeight = 0;
    let dailyCalorieBurn = 0;
    let timeRemaining = 0;
    let isMale = true;
    let totalCaloriesBurned = 0;

    document.getElementById("startOnboarding").addEventListener("click", () => {
        onboardingSection.classList.add("hidden");
        configurationSection.classList.remove("hidden");
    });

    document.getElementById("startGoalBtn").addEventListener("click", () => {
        isMale = document.getElementById("gender").value === "male";
        currentWeight = parseInt(document.getElementById("currentWeight").value);
        targetWeight = parseInt(document.getElementById("targetWeight").value) || currentWeight;
        calorieGoal = parseInt(document.getElementById("calorieGoal").value);
        dailyCalorieBurn = isMale ? 2000 : 1700;

        timeRemaining = (calorieGoal / dailyCalorieBurn) * 24 * 60 * 60 * 1000;

        updateCounter();
        configurationSection.classList.add("hidden");
        counterSection.classList.remove("hidden");
    });

    function updateCounter() {
        const timeInSeconds = timeRemaining / 1000;
        const days = Math.floor(timeInSeconds / (24 * 60 * 60));
        const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);

        document.getElementById("timeRemaining").innerText = `${days} Tage, ${hours} Stunden, ${minutes} Minuten`;
        document.getElementById("dailyCalorieBurn").innerText = dailyCalorieBurn;
    }

    document.getElementById("logCaloriesBtn").addEventListener("click", () => {
        counterSection.classList.add("hidden");
        logCaloriesSection.classList.remove("hidden");
    });

    document.getElementById("logConsumptionBtn").addEventListener("click", () => {
        counterSection.classList.add("hidden");
        logConsumptionSection.classList.remove("hidden");
    });

    document.getElementById("saveCalorieIntake").addEventListener("click", () => {
        const calorieIntake = parseInt(document.getElementById("calorieIntake").value);
        calorieGoal -= calorieIntake;
        logCaloriesSection.classList.add("hidden");
        counterSection.classList.remove("hidden");
        updateCounter();
    });

    document.getElementById("saveCalorieBurned").addEventListener("click", () => {
        const calorieBurned = parseInt(document.getElementById("calorieBurned").value);
        calorieGoal -= calorieBurned;
        totalCaloriesBurned += calorieBurned;
        logConsumptionSection.classList.add("hidden");
        counterSection.classList.remove("hidden");
        updateCounter();
    });

    document.getElementById("settingsBtn").addEventListener("click", () => {
        counterSection.classList.add("hidden");
        configurationSection.classList.remove("hidden");
    });

    document.getElementById("statsBtn").addEventListener("click", () => {
        statsSection.classList.remove("hidden");
        counterSection.classList.add("hidden");

        const statsList = document.getElementById("statsList");
        statsList.innerHTML = `
            <li>Verbrauchte Kalorien: ${totalCaloriesBurned} kcal</li>
            <li>Kalorien übrig: ${calorieGoal} kcal</li>
            <li>Zielgewicht: ${targetWeight} kg</li>
        `;
    });
});

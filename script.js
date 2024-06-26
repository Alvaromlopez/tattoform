const questions = [
    {
        text: "How many tattoos do you want?",
        options: [
            { text: "1", value: 1 },
            { text: "2", value: 2 },
            { text: "3", value: 3 },
            { text: "4", value: 4 }
        ]
    },
    {
        text: "Size:",
        options: [
            { text: "Mini", value: "mini" },
            { text: "Small", value: "small" },
            { text: "Medium", value: "medium" },
            { text: "Large", value: "large" }
        ]
    },
    {
        text: "Black and white or color?",
        options: [
            { text: "Black and White", value: "blackAndWhite" },
            { text: "Color", value: "color" }
        ]
    },
    {
        text: "Shaded or fine line?",
        options: [
            { text: "Shaded", value: "shaded" },
            { text: "Fine Line", value: "fineLine" }
        ]
    }
];

let responses = [];
let currentQuestionIndex = 0;
let currentTattooIndex = 0;
let tattooCount = 0;

function showQuestion(index) {
    const questionContainer = document.getElementById('questionContainer');
    const tattooIndicator = document.getElementById('tattooIndicator');
    questionContainer.innerHTML = '';

    if (index < questions.length) {
        const question = questions[index];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `<p>${question.text}</p>`;

        question.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerText = option.text;
            optionElement.onclick = () => handleOptionClick(option.value);
            questionElement.appendChild(optionElement);
        });

        questionContainer.appendChild(questionElement);

        if (index > 0) {
            tattooIndicator.innerText = `Tattoo ${currentTattooIndex + 1} of ${tattooCount}`;
        } else {
            tattooIndicator.innerText = '';
        }

    } else if (currentTattooIndex < tattooCount - 1) {
        currentTattooIndex++;
        currentQuestionIndex = 1; // Skip the "How many tattoos" question
        showQuestion(currentQuestionIndex);
    } else {
        calculateTotalTime();
    }
}

function handleOptionClick(value) {
    if (currentQuestionIndex === 0) {
        tattooCount = parseInt(value);
        for (let i = 0; i < tattooCount; i++) {
            responses.push({});
        }
    }

    if (currentQuestionIndex > 0) {
        responses[currentTattooIndex][questions[currentQuestionIndex].text] = value;
    }

    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function calculateTotalTime() {
    let totalTimeEstimate = 0;

    const sizeTime = {
        'mini': 1,
        'small': 2,
        'medium': 4,
        'large': 6
    };

    const colorTime = {
        'blackAndWhite': 1,
        'color': 2
    };

    const styleTime = {
        'shaded': 2,
        'fineLine': 1
    };

    responses.forEach(response => {
        const tattooSize = response["Size:"];
        const tattooColor = response["Black and white or color?"];
        const tattooStyle = response["Shaded or fine line?"];

        const timeEstimate = sizeTime[tattooSize] + colorTime[tattooColor] + styleTime[tattooStyle];
        totalTimeEstimate += timeEstimate;
    });

    document.getElementById('timeEstimate').innerText = totalTimeEstimate;
    document.getElementById('result').style.display = 'block';
}

// Show the first question when the page loads
showQuestion(currentQuestionIndex);

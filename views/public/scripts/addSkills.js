const addSkillButton = document.getElementById('add-skill-button');
const skillContainer = document.getElementById('skill-container');

addSkillButton.addEventListener('click', () => {
    const newSkillInput = document.createElement('input');
    newSkillInput.type = 'text';
    newSkillInput.name = 'skills';
    newSkillInput.className = 'input-field';
    newSkillInput.placeholder = 'Enter another skill';
    skillContainer.appendChild(newSkillInput);
});


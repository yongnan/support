export {} 
const getWelcomeFunction = (language: string) => { 
    const hello = language === "PL" ? "Witaj" : "Hello"; 
    return (name: string) => `${hello}, ${name}`;
}; 

const welcomeInPl = getWelcomeFunction("PL");
const welcomeInEn = getWelcomeFunction("EN");

console.log(welcomeInPl("John"))
console.log(welcomeInEn("Alex"))
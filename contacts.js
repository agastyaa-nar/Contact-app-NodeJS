import fs from 'fs';
import validator from 'validator';
import chalk from 'chalk';

const dirPath = "./data"
const dataPath = "./data/contacts.json"

//Make Folder Data if not exists
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
} 

// Add json files
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath , "[]", "utf-8")
}

// Load Contact
const loadContact = () => {
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

//Save Contact
const saveContact = (name, email, phoneNumber) => {
    const contact = { name, email, phoneNumber }

    const contacts = loadContact()
    
    contacts.push(contact)

    //Duplicate Check
    const duplicate = contacts.find((data) => data.name === name)
    if(!duplicate){
       console.log(chalk.red.inverse.bold('Contact already registered, Use another name!!'))
       return false 
    }

    // Email Check
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold("Email not valid!!"))
        }
    }

    // Phone Number Check
    if(!validator.isMobilePhone(phoneNumber, 'id-ID')){
        console.log(chalk.red.inverse.bold("Phone Number not valid!!"))
    }

    fs.writeFileSync(dataPath, JSON.stringify(contacts))

    console.log(chalk.green.inverse.bold("Thanks for Storing the Data"))
}

//List Contact
const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold("Contact List : "))
    contacts.forEach((contact, i) => {
        if (contact.email){
            console.log(`${i + 1} ${contact.name} - ${contact.phoneNumber} - ${contact.email}`)
            return false
        }
        console.log(`${i + 1} ${contact.name} - ${contact.phoneNumber}`)
    });
}

//Show Detail
const showDetail = (name) => {
    const contacts = loadContact()
    const detail = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())

    if(!detail) {
        console.log(chalk.red.inverse.bold(`${name} not found`))
        return false
    }

    console.log(chalk.cyan.inverse.bold(detail.name))
    console.log(detail.phoneNumber)

    if (detail.email){
        console.log(detail.email)
    }
}

// Remove Contact
const removeContact = (name) => {
    const contacts = loadContact()
    const detail = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())

    if(!detail) {
        console.log(chalk.red.inverse.bold(`${name} not found`))
        return false
    }

    const newContacts = contacts.filter(data => data.name.toLowerCase() !== name.toLowerCase())

    fs.writeFileSync(dataPath, JSON.stringify(newContacts))

    console.log(chalk.green.inverse.bold(`${name} has been removed.`))
}

export { saveContact, listContact, showDetail, removeContact };

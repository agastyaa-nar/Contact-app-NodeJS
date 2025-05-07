import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { saveContact, listContact, showDetail, removeContact } from './contacts.js';


yargs(hideBin(process.argv))
    // "add" command 
    .command({
        command: 'add',
        describe: 'Add new contact',
        builder: {
            name: {
                describe: 'Full Name',
                demandOption: true,
                type: 'string'
            },
            email: {
                describe: 'Email',
                demandOption: false,
                type: 'string'
            },
            phoneNumber: {
                describe: 'Phone Number',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            saveContact(argv.name, argv.email, argv.phoneNumber)
        } 
    })
    
    // "list" command
    .command({
        command: 'list',
        describe: 'Show contact list',
        handler(){
            listContact()
        }
    })
    
    // "detail" command
    .command({
        command: 'detail',
        describe: 'Show detailed contact based on name',
        builder: {
            name: {
                describe: 'Full Name',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            showDetail(argv.name)
        }
    })
    // "remove" command 
    .command({
        command: 'remove',
        describe: 'Remove contact from list based on name',
        builder: {
            name: {
                describe: "Full Name",
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            removeContact(argv.name)
        }
    })

    .demandCommand()
    .parse()
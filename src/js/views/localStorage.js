import tickets from './tickets';

class LocalStorage {
    constructor() {

    }

    init() {
        if (!localStorage.getItem('favourites')) {
            localStorage.setItem('favourites', JSON.stringify([]));
        } else {
            JSON.parse(localStorage.getItem('favourites')).forEach(obj => tickets.createTicket(obj));
        }
    }


}

const localSt = new LocalStorage();
export default localSt;
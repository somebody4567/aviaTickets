import locations from "../store/locations";

class Tickets {
    constructor() {
        this.parent = document.querySelector('.tickets-sections .row');
        this.trigger = document.querySelector('.favorites__trigger');
        this.dropdown = document.querySelector('.dropdown-content');
        this.delete = null;
        this.add = null;
        this.form = document.forms.locationControls;
    }

    async createTickets(data) {
        this.parent.innerHTML = '';
        const dataLength = Object.entries(data.data).length;

        if (dataLength > 0) {
            const currency = data.currency;
            const ticketsContainer = document.createDocumentFragment();
            Object.entries(data.data).forEach(([key, value], i) => {
                // time
                const time = new Date(value.departure_at);
                const date = time.getDate();
                const month = time.toLocaleString('en', {month: 'short'}).slice(0, 3);
                const year = time.getFullYear();
                const hours = time.getHours();
                const minutes = time.getMinutes();

                const ticket = document.createElement('div');        
                ticket.classList.add('col', 's12', 'm6');
                ticket.innerHTML = `
                <div class="card ticket-card">
                    <div class="ticket-airline d-flex align-items-center">
                    <img src="http://pics.avs.io/200/200/${value.airline || ''}.png" class="ticket-airline-img"/>
                    <span class="ticket-airline-name">${locations.airlines[value.airline] || ''}</span>
                    </div>
                    <div class="ticket-destination d-flex align-items-center">
                    <div class="d-flex align-items-center mr-auto">
                        <span class="ticket-city">${locations.getCityNameByCode(value.origin)}</span>
                        <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="medium material-icons">flight_land</i>
                        <span class="ticket-city">${locations.getCityNameByCode(value.destination)}</span>
                    </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${date} ${month} ${year} ${hours}:${minutes}</span>
                        <span class="ticket-price ml-auto">${currency == 'USD' ? `$${value.price}` : `€${value.price}`}</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${value.transfers}</span>
                        <span class="ticket-flight-number">Номер рейса: ${value.flight_number}</span>
                    </div>
                    <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto">Add to favorites</a>
                </div>
                `;
                ticketsContainer.append(ticket);
            });
            this.parent.append(ticketsContainer);
        } else {
            this.parent.insertAdjacentHTML('beforeend', 
            `<div class="tickets-empty-res-msg">
                По вашему запросу билетов не найдено.
            </div>
            `);
        }

        this.refreshTickets();
    }

    init() {
        this.openDropdown();
    }

    openDropdown() {
        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdown.classList.toggle('show');
        });
    }

    refreshTickets() {
        this.add = document.querySelectorAll('.add-favorite');
        this.addTicket();
    }

    addTicket() {
        this.add.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.dropdown.querySelector('.dropdown-content__text')) {
                    this.dropdown.querySelector('.dropdown-content__text').style.display = 'none';
                }
                const objData = this.getTicketData(btn);
                // Добавляем объект билета в LS
                const oldArray = JSON.parse(localStorage.getItem('favourites'));
                oldArray.push(objData);
                localStorage.setItem('favourites', JSON.stringify(oldArray));

                this.createTicket(objData);
            });
        });
    }

    getTicketData(btn) {
        const obj = {};
        const parent = btn.closest('.ticket-card');
        obj.airlineImg = parent.querySelector('.ticket-airline-img').src;
        const cities = parent.querySelectorAll('.ticket-city');
        obj.from = cities[0].textContent;
        obj.to = cities[1].textContent;
        obj.departure = parent.querySelector('.ticket-time-departure').textContent;
        obj.price = parent.querySelector('.ticket-price').textContent;
        obj.transfers = parent.querySelector('.ticket-transfers').textContent;
        obj.flightNumber = parent.querySelector('.ticket-flight-number').textContent;
        obj.id = Math.random();

        return obj;
    }

    createTicket(obj) {
        const {airlineImg, from, to, departure, price, transfers, flightNumber, id} = obj;
        const ticket = document.createElement('div');
        ticket.classList.add('favorite-item', 'd-flex', 'align-items-start');
        ticket.innerHTML = `
        <img src="${airlineImg}" class="favorite-item-airline-img"/>
        <div class="favorite-item-info d-flex flex-column">
            <div class="favorite-item-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
                <span class="favorite-item-city">${from}</span>
                <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
                <i class="medium material-icons">flight_land</i>
                <span class="favorite-item-city">${to}</span>
            </div>
            </div>
            <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${departure}</span>
            <span class="ticket-price ml-auto">${price}</span>
            </div>
            <div class="ticket-additional-info">
            <span class="ticket-transfers">${transfers}</span>
            <span class="ticket-flight-number">${flightNumber}</span>
            </div>
            <a data-id="${id}" class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
        </div>
        `;

        this.dropdown.append(ticket);
        this.initDeleteBtn();
    }
    
    initDeleteBtn() {
        this.delete = document.querySelectorAll('.delete-favorite');
        this.delete.forEach(item => {
            item.addEventListener('click', () => {
                item.closest('.favorite-item').remove();
                
                const id = item.getAttribute('data-id');
                const arrayFromLS = JSON.parse(localStorage.getItem('favourites'));
                const filtredArray = arrayFromLS.filter((item, i) => item.id != id);
                localStorage.setItem('favourites', JSON.stringify(filtredArray));
            });
        });
    }

    getAddBtns() {
        this.addBtn = document.querySelectorAll('.add-favorite');
    }
}

const tickets = new Tickets();

export default tickets;
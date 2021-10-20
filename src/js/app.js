import locations from './store/locations';
import './plugins';
import formUI from './views/formUI';
import tickets from './views/tickets';
import apiService from './services/apiService';
import localSt from './views/localStorage';

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    async function initApp() {
        await locations.init();
        formUI.updateData();
        formUI.setHandlerOnInputs();
        tickets.init();
        localSt.init();
    }

    formUI.form.addEventListener('submit', e => {
        e.preventDefault();
        const message = document.createElement('div');
        if (Array.from(formUI.inputsElements).some(item => item.value == '')) {
            message.classList.add('message');
            message.textContent = 'Пожалуйста, заполните все поля.';
            formUI.cardActionElement.append(message);
        } else {
            try {
                message.remove();
            } catch(err) {}

            onFormSubmit(message);
        }
    });

    async function onFormSubmit() {
        const currency =  formUI.currencyValue;
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departValue;
        const return_date = formUI.returnValue;
        const response = await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });
        tickets.createTickets(response);
    }
});
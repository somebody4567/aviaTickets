import locations from '../store/locations';
import {getAutocompleteInstance, getDatePickerInstance} from '../plugins/materialize';

class FormUI {
    constructor() {
        this._form = document.forms.locationControls;
        this.origin = document.querySelector('#autocomplete-origin');
        this.destination = document.querySelector('#autocomplete-destination');
        this.depart = document.querySelector('#datepicker-depart');
        this.return = document.querySelector('#datepicker-return');
        this.currency = document.querySelector('#currency');
        this.cardAction = document.querySelector('.card-action');
        this.inputs = document.querySelectorAll('[data-input]');
        //Создаем экземпляры input'ов для того чтобы с ними поработать
        this.originInstanse = getAutocompleteInstance(this.origin);
        this.destinationInstanse = getAutocompleteInstance(this.destination);
        this.departInstanse = getDatePickerInstance(this.depart);
        this.returnInstanse = getDatePickerInstance(this.return);
    }


    setHandlerOnInputs() {
        this.inputs.forEach(item => {
            item.addEventListener('focus', () => {try {document.querySelector('.message').remove();} catch(e) {}});
        });
    }

    get form() {
        return this._form;
    }

    get inputsElements() {
        return this.inputs;
    }

    get cardActionElement() {
        return this.cardAction;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departValue() {
        return this.departInstanse.toString();
    }

    get returnValue() {
        return this.returnInstanse.toString();
    }

    get currencyValue() {
        return this.currency.value;
    }


    updateData() {
        this.originInstanse.updateData(locations.shortCitiesList);
        this.destinationInstanse.updateData(locations.shortCitiesList);
    }
}

const formUI = new FormUI();
export default formUI;
import api from '../services/apiService';

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.oldCities = null;
        this.airlines = null;
    }

    async init() {
        const response = await Promise.all([this.api.countries(), this.api.cities(), this.api.airlines()]);
        const [countries, cities, airlines] = response;
        this.countries = await this.convertCountries(countries);
        this.cities = await this.convertCities(cities);
        this.oldCities = cities;
        this.shortCitiesList = this.createShortList(this.cities);
        this.airlines = this.getAirlines(airlines);
        return response;
    }

    getAirlines(airlines) {
        return airlines.reduce((acc, line) => {
            acc[line.code] = line.name || line.name_translations.en;
            return acc;
        }, {});
    }

    createShortList(cities) {
        // Преобразуем объект такого вида: {key: null, key: null}
        // Для autocomplete это делается, иначе работать не будет(смотри документацию materialize) 
        return Object.entries(cities).reduce((accumulator, [key]) => {
            accumulator[key] = null;
            return accumulator;
        }, {});
    }

    getCityNameByCode(code) {
        return this.createObjectForTickets(this.oldCities)[code].name;
    }

    getCityCodeByKey(key) {
        return this.cities[key].code;
    }

    getCountryNameByCode(code) { // Получаем страну по её коду
        return this.countries[code].name;
    }

    convertCities(cities) {
        // Переводим в удобный формат: {'Город, Страна': {Объект города}}
        return cities.reduce((obj, city) => {
            const cityName = city.name || city.name_translations.en;
            const countryName = this.getCountryNameByCode(city.country_code);
            const key = `${cityName}, ${countryName}`;
            obj[key] = city;
            return obj;
        }, {});
    }

    convertCountries(countries) {  // Это делается для билетов
        // Переводим в удобный формат: {'Код страны': {Объект страны}}
        return countries.reduce((obj, country) => {
            obj[country.code] = country;
            return obj;
        }, {});
    }

    createObjectForTickets(cities) {
        return cities.reduce((acc, city) => {
            acc[city.code] = city;
            return acc;
        }, {});
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        return await response.data;
    }
}

const locations = new Locations(api);

export default locations;
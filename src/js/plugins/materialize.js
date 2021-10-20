import 'materialize-css/dist/js/materialize';



const selects = document.querySelectorAll('select');
M.FormSelect.init(selects);

const elems = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(elems, {
    data: {}
});

export function getAutocompleteInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

export function getDatePickerInstance(elem) {
    return M.Datepicker.getInstance(elem);
}

const pickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(pickers, {
    showClearBtn: true,
    format: 'yyyy-mm',
    i18n: {
        months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        monthsShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
        weekdays: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
        ],
        weekdaysShort: [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
        ],
        weekdaysAbbrev: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        cancel: 'Закрыть',
        done: 'Ок',
    },
    
    firstDay: 1,
});

/* const dropdown = document.querySelector('.dropdown-trigger');

M.Dropdown.init(dropdown);
 */

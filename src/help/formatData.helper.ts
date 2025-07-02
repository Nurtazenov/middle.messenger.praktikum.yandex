import Handlebars from "handlebars";

Handlebars.registerHelper("formatDate", function (time: string) {
    const date = new Date(time);
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();
    const day = date.getDate();
    const monthNames = [
        "января", "февраля", "марта", "апреля", "мая", "июня", 
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const month = monthNames[date.getMonth()];

    if (year === currentYear) {
        return `${day} ${month}`;
    } else {
        return `${day} ${month} ${year}`;
    }
});



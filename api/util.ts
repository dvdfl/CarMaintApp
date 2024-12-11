
const util = {
        parseDate : (stringDate) => {
            //console.log(stringDate);
            const [month, day, year] = stringDate.split('/').map(Number);
            return new Date(year, month - 1, day);
        },
        previousServiceDateFilter : (s) => util.parseDate(s.serviceDate) < new Date(),
        futureServiceDateFilter : (s) => util.parseDate(s.serviceDate) >= new Date(),
    }

export default util;
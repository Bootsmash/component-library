import { BsDash } from 'react-icons/bs';
import {
    FORMAT_KWH,
    FORMAT_LITER,
    FORMAT_PRICE,
    FORMAT_METER,
    FORMAT_QUADRATMETER,
    FORMAT_KUBIKMETER
} from './types';
export const format_input = (format, input, fixes=null) => {

    if (!input) {
        return <BsDash />
    }

    switch(format) {
        case 'date':
            // Format Input as Date
            // dd.mm.YYYYY
            return new Intl.DateTimeFormat('de-DE', {
                year: 'numeric', 
                month: '2-digit',
                day: '2-digit',
            }).format(new Date(input));

        case 'date-time':
            // Format Input as Date Time
            // dd.mm.YYYY HH:ii
            return new Intl.DateTimeFormat('de-DE', {
                year: 'numeric', 
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date(input)) + " Uhr";
        
        case 'date-to-now':
            var old = new Date(input)
            var now = Date.now()
            var diff = new Date(old - now);

            if (diff.getMinutes() < 1 && diff.getHours() < 1 && diff.getDay() < 1) {
                return (fixes.now + "")
            } else if (diff.getMinutes() < 60 && diff.getHours() < 1 && diff.getDay() < 1){
                return (fixes.start + "") + " " + diff.getMinutes() + " Minuten"
            } else if (diff.getHours() < 24 && diff.getUTCDate() < 1) {
                return (fixes.start + "") + " " + diff.getHours() + " Stunden"
            } else if (diff.getUTCDate() - 1 < 6 &&  diff.getMonth < 1 && diff.getUTCFullYear) {
                return (fixes.start + "") + " " + diff.getUTCDate() - 1 + " Tagen"
            } else {
                return (fixes.final || "") + " " + new Intl.DateTimeFormat('de-DE', {
                    year: 'numeric', 
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date(input));
            }
        
        case 'kwh':
            // Format Input as Kwh Number
            // 1.000,00 kwh
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input) + FORMAT_KWH
        
        case 'liter':
            // Format Input as liter Number
            // 1.000,00 l
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input) + FORMAT_LITER
        
        case 'price':
            // Format Input as price
            // 1.000,00 €
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input) + FORMAT_PRICE
        
        case 'meter':
            // Format Input as meter
            // 1.000,00 m
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input) + FORMAT_METER

        case 'meter-square':
            // Format Input as squaremeter
            // 1.000,00 m2
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input) + FORMAT_QUADRATMETER
        
        case 'meter-cubic':
            // Format Input as cubicmeter
            // (1.000,00 m3)
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input) + FORMAT_KUBIKMETER
        
        case 'number':
            // Format Input as Number
            // 1.000,00
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input)

        case 'number-round':
            // Format Input as Number
            // 1.000
            return new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 0,
                unitDisplay: 'long',
            }).format(input)

        case 'type':
            // Format Input as Type
            switch(input) {
                case 'hot':
                    return 'Warmwasser'
                case 'cold':
                    return 'Kaltwasser'
                case 'heating':
                    return 'Wärmemengenzähler'
                case 'wash':
                    return 'Waschmaschiene'
                default:
                    return 'unbekannt'
            }
        default:
            return input
    }
};
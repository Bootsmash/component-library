import { BsDash } from 'react-icons/bs';

export const format_input = (format, input, fixes=null, suffix=null) => {

    if (!input) {
        return <BsDash />
    }

    switch(format) {
        case 'date':
            // Format Input as Date
            // dd.mm.YYYY
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
            }).format(new Date(input)) + (" " + suffix || "");
        
        case 'date-to-now':
            var old = new Date(input)
            var now = new Date();

            var diff = now.getTime() - old.getTime()

            var diff_days = diff / (1000 * 60 * 60 * 24)

            if (Math.round(diff_days) < 1 && (fixes?.hours || fixes?.minutes || fixes?.now)){

                var diff_hours = diff / (1000 * 60 * 60)
                if (diff_hours < 24 && (fixes?.hours || fixes?.minutes || fixes?.now)) {

                    var diff_minutes = diff / (1000 * 60)

                    if (diff_minutes < 1 && fixes?.now) {
                        return fixes.now

                    } else if(diff_minutes < 60 && fixes?.minutes) {
                        return (fixes?.default + " " || "") + Math.round(diff_minutes) + " " + fixes.minutes

                    } else if (diff_hours < 2 && (fixes?.hour || fixes?.hours)) {
                        return (fixes.default + " " || "") + Math.round(diff_hours) + " " + (fixes.hour || fixes.hours)
                    } else if (fixes?.hours) {
                        return (fixes?.default + " "|| "") + Math.round(diff_hours) + " " + fixes.hours
                    }
                }
            } else if (diff_days < 2 && fixes?.day) {
                return fixes.day

            } else if (diff_days < 7 && (fixes?.days)) {
                return (fixes?.default + " " || "") + Math.round(diff_days) + " " + fixes.days
            }

            if (diff_days < 14 && (fixes?.week || fixes?.weeks)) {
                return (fixes?.default + " " || "") + Math.round(diff_days / 7) + " " + (fixes.week || fixes.weeks)

            } else if (diff_days < 28 && fixes?.weeks) {
                return (fixes?.default + " " || "") + Math.round(diff_days / 7) + " " + fixes.weeks
            }
            
            return (fixes?.finish || "") + " " + new Intl.DateTimeFormat('de-DE', {
                year: 'numeric', 
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(input));
        
        case 'number':
            // Format Input as Number
            // 1.000,00
            var output =  new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                unitDisplay: 'long',
            }).format(input)
            if (suffix) {
                output += " " + suffix
            }

            return output;

        case 'number-round':
            // Format Input as Number
            // 1.000
            var output = new Intl.NumberFormat('de-DE', {
                maximumFractionDigits: 0,
                unitDisplay: 'long',
            }).format(input)
            if (suffix) {
                output += " " + suffix
            }

            return output
            
        case 'none':
        default:
            return input
    }
};
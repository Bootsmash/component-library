import React from 'react';
import { BsDash } from 'react-icons/bs';

export const format_input = (format, input, fixes=null, suffix=null, bool=null, img_size=null) => {
 
    if (input == null && format != "bool")
        return <BsDash />

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
            var output =  new Intl.DateTimeFormat('de-DE', {
                year: 'numeric', 
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date(input));

            if (suffix) {
                output += " " + suffix
            }

            return output

        case 'future-to-now':
            var old = new Date(input)
            var now = new Date();

            var diff = old.getTime() - now.getTime()

            var diff_days = diff / (1000 * 60 * 60 * 24)

            if (Math.round(diff_days) < 1 && (fixes?.hours || fixes?.minutes || fixes?.now_future)){

                var diff_hours = diff / (1000 * 60 * 60)
                if (diff_hours < 24 && (fixes?.hours || fixes?.minutes || fixes?.now_future)) {

                    var diff_minutes = diff / (1000 * 60)

                    if (diff_minutes < 1 && fixes?.now_future) {
                        return fixes.now_future

                    } else if(diff_minutes < 60 && fixes?.minutes) {
                        return (fixes?.default_future + " " || "") + Math.round(diff_minutes) + " " + fixes.minutes

                    } else if (diff_hours < 2 && (fixes?.hour || fixes?.hours)) {
                        return (fixes.default_future + " " || "") + Math.round(diff_hours) + " " + (fixes.hour || fixes.hours)
                    } else if (fixes?.hours) {
                        return (fixes?.default_future + " "|| "") + Math.round(diff_hours) + " " + fixes.hours
                    }
                }
            } else if (diff_days < 2 && fixes?.day_past) {
                return fixes.day_past

            } else if (diff_days < 7 && (fixes?.days)) {
                return (fixes?.default_future + " " || "") + Math.round(diff_days) + " " + fixes.days
            }

            var diff_weeks = diff_days / 7
            var diff_months = diff_weeks / 4

            if (diff_weeks < 2 && (fixes?.week || fixes?.weeks)) {
                return (fixes?.default_future + " " || "") + Math.round(diff_days / 7) + " " + (fixes.week || fixes.weeks)

            } else if (diff_weeks < 4 && fixes?.weeks) {
                return (fixes?.default_future + " " || "") + Math.round(diff_days / 7) + " " + fixes.weeks
            }

            if (diff_months < 12 && fixes?.months) {
                return (fixes?.default_future + " " || "") + Math.round(diff_days / 7 / 4) + " " + fixes.months
            }
            
            return (fixes?.finish ? fixes.finish + " " : "") + new Intl.DateTimeFormat('de-DE', {
                year: 'numeric', 
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(input));
        
        case 'past-to-now':
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
                        return (fixes?.default_past + " " || "") + Math.round(diff_minutes) + " " + fixes.minutes

                    } else if (diff_hours < 2 && (fixes?.hour || fixes?.hours)) {
                        return (fixes.default_past + " " || "") + Math.round(diff_hours) + " " + (fixes.hour || fixes.hours)
                    } else if (fixes?.hours) {
                        return (fixes?.default_past + " "|| "") + Math.round(diff_hours) + " " + fixes.hours
                    }
                }
            } else if (diff_days < 2 && fixes?.day_past) {
                return fixes.day_past

            } else if (diff_days < 7 && (fixes?.days)) {
                return (fixes?.default_past + " " || "") + Math.round(diff_days) + " " + fixes.days
            }

            var diff_weeks = diff_days / 7
            var diff_months = diff_weeks / 4

            if (diff_weeks < 2 && (fixes?.week || fixes?.weeks)) {
                return (fixes?.default_past + " " || "") + Math.round(diff_days / 7) + " " + (fixes.week || fixes.weeks)

            } else if (diff_weeks < 4 && fixes?.weeks) {
                return (fixes?.default_past + " " || "") + Math.round(diff_days / 7) + " " + fixes.weeks
            }

            if (diff_months < 12 && fixes?.months) {
                return (fixes?.default_past + " " || "") + Math.round(diff_days / 7 / 4) + " " + fixes.months
            }
            
            return (fixes?.finish ? fixes.finish + " " : "") + new Intl.DateTimeFormat('de-DE', {
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
        
        case 'bool':
            if (input) {
                return bool?.true || "true"
            } else {
                return bool?.false || "false"
            }
        
        case 'image':
            return <img src={input} width={img_size} height={img_size}/>

        case 'none':
        default:
            return input
    }
};
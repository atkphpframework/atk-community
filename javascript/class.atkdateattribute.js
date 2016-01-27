/**
 * Returns the number of days in the month/year of the supplied date object
 * @param date a valid javascript date object
 * @return number of days in month/year combination
 */
function getDays(date)
{
    if (date == null)
        return -1;
    array_month = Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ((date.getFullYear() % 4 == 0) && (!(date.getFullYear() % 100 == 0) || (date.getFullYear() % 400 == 0)))
        array_month[1] = 29;
    return array_month[date.getMonth()];
}

/**
 * Checks/changes the date input boxes for a certain date field on the form.
 * @param el pointer to the form element which initiated the call to this method
 * @param arr name of the input boxes (without [day] etc.)
 * @param newDate optional new date
 */
function AdjustDate(el, arr, newDate)
{
    if (arguments.length == 2) {
        newDate = false;
    }

    var info = eval('atkdateattribute_' + arr);
    var format = info.format; // a valid date format string (like in PHP)
    var str_min = info.min; // the minimum valid date
    var str_max = info.max; // the maximum valid date
    var emptyfield = info.emptyfield;
    var weekday = info.weekday;

    var format_month, format_day, array_months, format_weekday;

    /* current date attribute inputs */
    input = Array();
    input["d"] = document.getElementById(arr + "[day]");
    input["m"] = document.getElementById(arr + "[month]");
    input["y"] = document.getElementById(arr + "[year]");

    /* check if valid date attribute inputs */
    if (input["d"] == null || input["m"] == null || input["y"] == null)
        return;

    /* currently selected date */
    current = Array();
    current["d"] = typeof (newDate) == 'object' ? newDate.day
        : parseInt(input["d"].options[input["d"].selectedIndex].value, 10);
    current["m"] = typeof (newDate) == 'object' ? newDate.month
        : parseInt(input["m"].options[input["m"].selectedIndex].value, 10);
    current["y"] = typeof (newDate) == 'object' ? newDate.year
        : parseInt(input["y"].type == "select-one"
            ? input["y"].options[input["y"].selectedIndex].value
            : input["y"].value, 10);
    if (current["y"].toString() == "NaN")
        current["y"] = 0;

    /* check month format */
    if (format.indexOf("F") >= 0)
        array_months = m_months_long;
    else if (format.indexOf("M") >= 0)
        array_months = m_months_short;
    else if (format.indexOf("m") >= 0)
        format_month = "m";
    else
        format_month = "n";

    /* check day format */
    if (format.indexOf("d") >= 0)
        format_day = "d";
    else
        format_day = "j";

    /* check weekday format */
    if (format.indexOf("D") >= 0)
        format_weekday = "D";
    else
        format_weekday = "l";

    /* we just changed one of the fields to null */
    if (emptyfield && (newDate == null || (typeof (newDate) != 'object' && ((el.type == "select-one" && el.selectedIndex == 0) || (el.type != "select-one" && el.value == "")))))
    {
        for (i = input["d"].options.length; i >= 0; i--)
            input["d"].options[i] = null;
        input["d"].options[0] = new Option("", 0);
        for (i = 1; i <= 31; i++)
            input["d"].options[input["d"].options.length] = new Option(("d" == format_day)
                ? (i < 10
                    ? "0"
                    : "") + i
                : i, i);
        input["m"].options[0].selected = true;
        input["m"].selectedIndex = 0;
        input["y"].value = "";
        return;
    }

    /* we just changed one of the fields from null to something */
    else if (!emptyfield && (current["d"] == 0 || current["y"] == 0 || current["m"] == 0))
    {
        today = new Date();
        current["d"] = today.getDate();
        current["m"] = today.getMonth() + 1;
        current["y"] = today.getFullYear();
    }

    /* minimum date */
    minimum = Array();
    str_min = new String(str_min);
    if (str_min.length == 8)
    {
        minimum["d"] = parseInt(str_min.substr(6, 2), 10);
        minimum["m"] = parseInt(str_min.substr(4, 2), 10);
        minimum["y"] = parseInt(str_min.substr(0, 4), 10);
    }

    /* maximum date */
    maximum = Array();
    str_max = new String(str_max);
    if (str_max.length == 8)
    {
        maximum["d"] = parseInt(str_max.substr(6, 2), 10);
        maximum["m"] = parseInt(str_max.substr(4, 2), 10);
        maximum["y"] = parseInt(str_max.substr(0, 4), 10);
    }

    /* convert to real dates */
    date_now = new Date();
    date_minimum = new Date(minimum["y"], minimum["m"] - 1, minimum["d"]);
    date_maximum = new Date(maximum["y"], maximum["m"] - 1, maximum["d"]);


    if (current["d"] != 0 && current["y"] != 0 && current["m"] != 0)
    {
        date_current = new Date(current["y"], current["m"] - 1, current["d"]);

        /* check dates */
        if (date_current.getDate().toString() == "NaN")
            date_current = null;
        if (date_minimum.getDate().toString() == "NaN")
            date_minimum = null;
        if (date_maximum.getDate().toString() == "NaN")
            date_maximum = null;

        /* did we select a valid date? */
        if (date_current != null && date_minimum != null && date_current < date_minimum)
            date_current = date_minimum;
        else if (date_current != null && date_maximum != null && date_current > date_maximum)
            date_current = date_maximum;
        else if (date_current == null && date_minimum != null && date_now < date_minimum)
            date_current = date_minimum;
        else if (date_current == null && date_maximum != null && date_now > date_maximum)
            date_current = date_maximum;
        else if (date_current == null)
            date_current = date_now;

        /* put current date back into array */
        if (current["d"] != 0)
            current["d"] = date_current.getDate();
        if (current["m"] != 0)
            current["m"] = date_current.getMonth() + 1;
        if ((current["y"] != 0) || !emptyfield)
            current["y"] = date_current.getFullYear();
        else
            current["y"] = "";

        /* minimum and maximum */
        current["d_min"] = (date_minimum != null && date_current.getFullYear() == date_minimum.getFullYear() &&
            date_current.getMonth() == date_minimum.getMonth()
            ? date_minimum.getDate() : 1);
        current["d_max"] = (date_maximum != null && date_current.getFullYear() == date_maximum.getFullYear() &&
            date_current.getMonth() == date_maximum.getMonth()
            ? date_maximum.getDate() : getDays(date_current));
        current["m_min"] = (date_minimum != null && date_current.getFullYear() == date_minimum.getFullYear()
            ? date_minimum.getMonth() + 1
            : 1);
        current["m_max"] = (date_maximum != null && date_current.getFullYear() == date_maximum.getFullYear()
            ? date_maximum.getMonth() + 1
            : 12);
        current["y_min"] = (date_minimum != null ? date_minimum.getFullYear()
            : 0);
        current["y_max"] = (date_maximum != null ? date_maximum.getFullYear()
            : 0);

    }
    else
    {
        if (!emptyfield)
        {
            if (current["y"] == "" && current["d"] != 0 && current["m"] != 0)
            {
                date_current = new Date(date_now["y"], date_now["m"] - 1, date_now["d"]);
            }
        }
        else
        {
            current["d_min"] = 1;
            current["d_max"] = 31;
            current["m_min"] = 1;
            current["m_max"] = 12;
            if (input["y"].type == "select-one")
            {
                current["y_min"] = (date_minimum != null
                    ? date_minimum.getFullYear() : 0);
                current["y_max"] = (date_maximum != null
                    ? date_maximum.getFullYear() : 0);
            }
        }
    }

    if (current["y"] == 0)
        current["y"] = "";

    /* clean day input, and build new one */
    for (i = input["d"].options.length; i >= 0; i--)
        input["d"].options[i] = null;
    if (emptyfield)
        input["d"].options[0] = new Option("", 0);

    for (i = current["d_min"]; i <= current["d_max"]; i++)
    {
        if (current["y"] == "" || current["m"] == 0)
        {
            value = (("d" == format_day) ? (i < 10 ? "0" : "") + i : i);
        }
        else
        {
            date = new Date(current["y"], current["m"] - 1, i);
            var weekdays = format_weekday == 'D' ? m_weekdays_short
                : m_weekdays_long;
            value = (weekday ? weekdays[date.getDay()] + " "
                : "") + (("d" == format_day) ? (i < 10 ? "0" : "") + i : i);
        }
        input["d"].options[input["d"].options.length] = new Option(value, i);
        if (i == current["d"])
        {
            input["d"].options[input["d"].options.length - 1].selected = true;
            input["d"].options.selectedIndex = input["d"].options.length - 1;
        }
    }

    /* clean month input, and build new one */
    for (i = input["m"].options.length; i >= 0; i--)
        input["m"].options[i] = null;
    if (emptyfield)
        input["m"].options[0] = new Option("", 0);
    for (i = current["m_min"]; i <= current["m_max"]; i++)
    {
        value = ("m" == format_month) ? (i < 10 ? "0" : "") + i
            : ("n" == format_month) ? i : array_months[i - 1];
        input["m"].options[input["m"].options.length] = new Option(value, i);
        if (i == current["m"])
        {
            input["m"].options[input["m"].options.length - 1].selected = true;
            input["m"].options.selectedIndex = input["m"].options.length - 1;
        }
    }

    /* clean year input, and build new one */
    if (input["y"].type == "select-one")
    {
        for (i = input["y"].options.length; i >= 0; i--)
            input["y"].options[i] = null;
        if (emptyfield)
            input["y"].options[0] = new Option("", 0);
        for (i = current["y_min"]; i <= current["y_max"]; i++)
        {
            input["y"].options[input["y"].options.length] = new Option(i, i);
            if (i == current["y"])
            {
                input["y"].options[input["y"].options.length - 1].selected = true;
                input["y"].options.selectedIndex = input["y"].options.length - 1;
            }
        }
    }
    else
        input["y"].value = current["y"];

    ATK.DateAttribute.notifyListeners(arr);
}

if (!window.ATK) {
    var ATK = new Object();
}

ATK.DateAttribute = {
    listeners: {},
    /**
     * Notify listeners of refresh / new value.
     */
    notifyListeners: function(name) {
        if (!ATK.DateAttribute.listeners[name])
            return;
        var listeners = ATK.DateAttribute.listeners[name];
        for (var i = 0; i < listeners.length; i++) {
            listeners[i]({name: name, value: ATK.DateAttribute.getValue(name)
            });
        }
    },
    /**
     * Register listener for the attribute with the given name.
     */
    registerListener: function(name, callback) {
        if (!ATK.DateAttribute.listeners[name]) {
            ATK.DateAttribute.listeners[name] = [];
        }

        ATK.DateAttribute.listeners[name].push(callback);
    },
    /**
     * Get value of attribute with the given name.
     */
    getValue: function(name) {
        var dayEl = document.getElementById(name + "[day]");
        var monthEl = document.getElementById(name + "[month]");
        var yearEl = document.getElementById(name + "[year]");

        var value = {
            year: yearEl.value,
            month: monthEl.options[monthEl.selectedIndex].value,
            day: dayEl.selectedIndex >= 0
                ? dayEl.options[dayEl.selectedIndex].value : 0
        };

        return value;
    },
    /**
     * Set value of attribute with the given name.
     */
    setValue: function(name, value, fromCalendar) {
        var dayEl = document.getElementById(name + "[day]");
        var monthEl = document.getElementById(name + "[month]");
        var yearEl = document.getElementById(name + "[year]");

        AdjustDate(yearEl, name, value);
        AdjustDate(monthEl, name, value);
        AdjustDate(dayEl, name, value);

        if (fromCalendar) {
            // manually calls onChange (for dependencies handling) when the end-user changes date on calendar
            var fn = window[name + '_onChange'];
            if (typeof fn === "function") {
                fn.apply(null, dayEl);
            }
        }
    },
    /**
     * Refresh.
     */
    refresh: function(name) {
        ATK.DateAttribute.setValue(name, ATK.DateAttribute.getValue(name));
    },
    /**
     * Set minimum.
     */
    setMinimum: function(name, min) {
        try {
            min = min == null ? null : '' + min.year + (min.month < 10
                ? '0' + min.month : min.month) + (min.day < 10 ? '0' + min.day
                : min.day);
            eval('atkdateattribute_' + name + '.min = min;');
            ATK.DateAttribute.refresh(name);
        } catch (e) {
        }
    },
    /**
     * Set maximum.
     */
    setMaximum: function(name, max) {
        try {
            max = max == null ? null : '' + max.year + (max.month < 10
                ? '0' + max.month : max.month) + (max.day < 10 ? '0' + max.day
                : max.day);
            eval('atkdateattribute_' + name + '.max = max;');
            ATK.DateAttribute.refresh(name);
        } catch (e) {
        }
    },
    getMaximum: function(name) {
        try {
            eval('var data = atkdateattribute_' + name);
        } catch (e) {
        }
        if (!data)
            return false;
        else
            var val = data.max;

        val = ATK.DateAttribute.stringToDate(val);
        return val;
    },
    getMinimum: function(name) {
        try {
            eval('var data = atkdateattribute_' + name);
        } catch (e) {
        }
        if (!data)
            return false;
        else
            var val = data.min;

        val = ATK.DateAttribute.stringToDate(val);
        return val;
    },
    checkDisabled: function(date) {
        var name = this.dateattrId;
        var max = ATK.DateAttribute.getMaximum(name);
        var min = ATK.DateAttribute.getMinimum(name);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        if (min) {
            // FIX date min disabled on calendar
            min.setMilliseconds(0);
        }

        if ((min && date < min) || (max && date > max))
            return true;
        return false;
    },
    stringToDate: function(str) {
        var str = new String(str);

        if (str.length == 8)
        {
            var obj = new Date();
            obj.setFullYear(parseInt(str.substr(0, 4), 10), parseInt(str.substr(4, 2), 10) - 1, parseInt(str.substr(6, 2), 10));
            obj.setHours(0);
            obj.setMinutes(0);
            obj.setSeconds(0);
        }
        return obj;
    }
}
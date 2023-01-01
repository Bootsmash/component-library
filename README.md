# component-library
## Installation
```shell
npm install @bootsmash/component-library@latest
```

## DataProvider
### Usage
First you need to import the DataProvider
```javascript
import { DataProvider } from '@bootsmash/component-library';
```
Now you can implement the DataProvider to our Component
```javascript
<DataProvider value={data} headers={headers} variant={variant} />
```
`data`, `headers`, are arrays and 'variant' is an string
The `value` array is an json object that contains all your data you want to display, you get it from for example an API. 

### Variant
| variant          | desc                      |
| ---------------- | ------------------------- |
| table-horizontal | Creates an normal Table   |
| table-vertical   | Creates an vertical Table |

### Headers
For each coloum in your Table you neet to add an header
```python
headers = {
	{name: 'Username', value: 'username'}
	{name: 'Joined', value: 'date_joined', format: 'date', pos: 'end', display: 'md' fixes: {now: 'now', start: 'ago', final: 'at'}}
	{name: 'Name', value: 'last_name+first_name', space: ', ', pos: 'end'}
}
```

Possible arguments for headers
| arg     |  type  | desc                                                      |              More Information               |
| ------- |:------:| --------------------------------------------------------- |:-------------------------------------------:|
| name    | string | Title of column or row                                    |                                             |
| value   | string | Set the value                                             |           [more](#Headers#Value)            |
| format  | string | Describes the format of the value                         |       [more](#FormatProvider#Formats)       |
| pos     | string | `start`,`center`, `end` centered text                     |                                             |
| display | string | bootstrap display (values: `sm`, `md`, `lg`, `xl`, `xxl`) |                                             |
| icon    | array  |                                                           |               [more](#Icons)                |
| space   | sting  |                                                           |           [more](#Headers#Value)            |
| fixes   | array  |                                                           | [more](#FormatProvider#Formats#date-to-now) |
| sum     | string | Set the type of calulating the sum of the row             |          [more](#DataProvider#Sum)          |
| suffix  | string |                                                           |  [more](#FormatProvider#Usage)                                           |

#### Value
| value     | desc                                                                         |
| --------- | ---------------------------------------------------------------------------- |
| obj1.obj2 | Navigate in the array from `obj1` to the `obj2` value                        |
| obj1+obj2 | Return the values of `obj1` and `obj2`. Spacing -> use `space` arg in header |
| obj1      | Return the value of `obj1`                                                   |

#### Sum
| value | desc              |
| ----- | ----------------- |
| count | count all elements in table   |
| sum   | add `value` to result (sum) |

### Options
If you want to use the options you have to use the `DataProvider` like this
```JavaScript
<DataProvider value={data} headers={headers} variant={variant} options={options} />
```

| arg     | value                                                             | desc                                                                                                  |
| ------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| size    | `lg`, `sm`                                                        | define the table size (Bootstrap)                                                                     |
| sum     | `{name: '', variant: ''} `                                        | `name` is the Label for the sum row and `variant` is a simple sting with the basic Bootstrap "colors" |
| add     | `{desc: '', function: {}}`                                        | define the label and function for the add object Button                                               |
| load    | `{desc: {default: '', loading: ''}, function: {}, stateload: {}}` | like `add` but the load button has an loading state                                                   |
| buttons | []                                                                | add [buttons](#Options#Buttons)                                                                                                 |

#### Buttons
If you want to add Buttons in each row use
```JavaScript
{name: '', function: {}}
```
If you want to change the icon add `icon: {icon}` with your component like Icon to the button array.
If you want an tooltip on hover over it add `tooltip: {pos: '', desc: ''}` to the button array. `pos` can be `top`, `bottom`, `left`, `right` and `desc` is the tooltip itself.

## FormatProvider
### Usage
First you need to import the DataProvider
```javascript
import { FormatProvider } from '@bootsmash/component-library';
```
Now you can implement the DataProvider to our Component
```javascript
<FormatProvider 
	value={data}
	format={format}
/>
```

|    arg    |                  values                  | desc                                                                                              | required |
|:---------:|:----------------------------------------:| ------------------------------------------------------------------------------------------------- |:--------:|
|  `value`  |                                          | string or number to format                                                                        |   yes    |
| `format`  |    [formats](#FormatProvider#Formats)    | the format to format the `value`                                                                  |    no    |
|   `ct`    | [containers](#FormatProvider#Containers) | the container to return                                                                           |    no    |
| `colspan` |                                          | The coloumn length if you use the `row` or `col` containers                                       |    no    |
|  `title`  |                                          | The title of the table row if you use the `row` container                                         |    no    |
| `display` |      `sm`, `md`, `lg`, `xl`, `xxl`       | Shown on screen size bigger than the given value                                                  |    no    |
|  `fixes`  |   [fixes](#FormatProvider#date-to-now)   | define what should be printet in front of the date difference if you use the `date-to-now` format |    no    |
| `suffix`  |                                          | The string will be returned behind the `value` Example `1.000 m` if `suffix="m"`                                                                                                |          |

### Formats
| value          | result                                  |
| -------------- | --------------------------------------- |
| `date`         | dd.mm.YYYY                              |
| `date-time`    | dd.mm.YYYY HH:ii Uhr                    |
| `date-to-now`  | (depends on difference)                 |
| `number`       | 1.000,00                                |
| `number-round` | 1.000                                   |
|                | (returns the `value` without formating) |

#### date-to-now
if you use the `date-to-now` format you can add `fixes`.
Example:
```JavaScript
fixes: {now: 'jetzt', default: 'Vor', final: 'Am'}
```
it will return
1. `jetzt`
2. `Vor {x} Stunden/Minuten/Tagen`
3. `Am 01.01.1970`

if an value is set for one of the following arguments then the difference will shown for that arg (`days:"days"` => difference in days will be returned). It will work if you enable `minutes` but `now`  and/or `days` are/is disabled.
| arg       | desc    |
| --------- | --- |
| `now`     |  will enable difference now   |
| `minutes` |  will enable difference minutes   |
| `hours`   |  will enable difference hours   |
| `days`    |  will enable difference days  |
| `weeks`   |  will enable difference weeks   |

### Containers
| value            | desc                               |
| ---------------- | ---------------------------------- |
| `row`            | returs an table row                |
| `col` / `col-td` | returns a table cell               |
| `col-th`         | returns a table head cell          |
| `p`              | return the `value` in an p tag     |
| `small`          | return the `value` in an small tag |
|                  | returns the simple `value` without tags                                    |

document.body.onload = CreateCalendar();

function CreateCalendar()
{
    let year = 2020;

    document.getElementsByTagName('h1')[0].innerHTML += year; //Change Header Year

    let months = document.getElementsByClassName('month');

    let date = new Date(year, 1, 1, 1, 1, 1, 1);

    let dayName = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
    let monthName = ['Styczeń', 'Luty', 'Marzec', 'Kwieciń', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

    for(let i = 0; i < 12; i++)
    {
        date = new Date(year, i, 1, 1, 1, 1, 1); //Restart Month

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        //Add Table Caption
        let caption = document.createElement('caption');
        caption.textContent = monthName[date.getMonth()];
        table.appendChild(caption);

        //Add Table Header
        let tr = thead.appendChild(document.createElement('tr'));

        dayName.forEach(day => {
            let td = document.createElement('td');
            td.textContent = day;
            tr.appendChild(td);
        });

        //Add Table Body
        while(!(date.getDay() == 1 && date.getMonth() > i))
        {
            if(date.getDate() == 1)
            {
                //If Today Isn't Monday And 'tr' is Empty
                if(date.getDay() != 1 && tbody.childElementCount == 0) 
                    while(true)
                    {
                        date = AddDays(date, -1);
                        //Search Last Monday In Last Month
                        if(date.getDay() == 1 && date.getDate() > 20)
                            break;
                    }
                        
            }

            //Create New Row For New Week
            if(date.getDay() == 1)
            {
                tr = tbody.appendChild(document.createElement('tr'));
            }

            td = document.createElement('td');

            td.textContent = date.getDate();

            //Days Out Of Month
            if(date.getMonth() != i)
            {
                td.classList.add('muted');
            }

            //Sunday Red Color
            if(date.getDay() == 0)
            {
                td.classList.add('warning');
            }

            //Add Td For Day
            tr.appendChild(td);

            date = AddDays(date, 1);

            if(date.getFullYear() > year)
            {
                if(date.getDay() == 1 && date.getMonth() == 0)
                    break;
            }
        }

        //Create And Add Table

        table.appendChild(thead);
        table.appendChild(tbody);
		
		months[i].appendChild(table);
    }

}

function AddDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
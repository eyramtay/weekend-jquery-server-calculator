console.log('JavaScript is up & running!');

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery is up & running!');

    $('#clear').on('click', function(event) {
        console.log('clicked');
        event.preventDefault();
        addItem();
    })
    getNumbers();

    $('#addition').on('click', function(event) {
        console.log('clicked addition');
        event.preventDefault();
        addNumbers();
    });

    $('#subtraction').on('click', function(event) {
        console.log('clicked subtraction');
        event.preventDefault();
        subtractNumbers();
    })


}

function addItem() {
    let newNumbers = {
        number1: $('#in-number1').val(),
        number2: $('#in-number2').val(),
    }
    console.log('Retrieving numbers..', newNumbers);

    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: newNumbers
    })
        .then(function(response) {
            console.log('Added an item.');
            // changed data on the server, go get all the updates
            getNumbers();
        })
        .catch(function(error) {
            console.log('Error from server', error);
            alert('Sorry, could not retrieve numbers. Try again.')
        })

     // clear inputs
     $('#in-number1').val('');
     $('#in-number2').val('');
}

function getNumbers() {
    $.ajax({
        method: 'GET',
        url: '/numbers'
    })
        .then(function(response) {
            console.log('Response from server', response);

            render(response);
        })
        .catch(function(error) {
            console.log('Error from server', error);
            alert('Sorry, could not get your numbers. Try again.');
        })
        console.log('After making server request...');
}

function render(numberList) {
    $('#numHistory').empty();

    // Loop over the array from the server & append to the DOM
    for (let thing of numberList) {
        $('#numHistory').append(`
        <li class="calculationHistory">${thing.number1}, ${thing.number2}</li>`)
        console.log(`Added numbers: ${thing.number1} & ${thing.number2}`);
    }

    // // clear inputs
    // $('#in-number1').val('');
    // $('#in-number2').val('');
}


function addNumbers() {
    let sum = Number($('#in-number1').val()) + Number($('#in-number2').val());
    console.log(sum);
}

function subtractNumbers() {
    let total = Number($('#in-number1').val()) - Number($('#in-number2').val());
    console.log(total);
}

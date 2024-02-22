var b1 = document.getElementById('btn1');
var b2 = document.getElementById('btn2');
var b3 = document.getElementById('btn3');
var b4 = document.getElementById('btn4');

b1.addEventListener('click', func1);
b2.addEventListener('click', func2);
b3.addEventListener('click', func3);
b4.addEventListener('click', func4);

var h6_b1 = localStorage.getItem('2:00 PM')
var h6_b2 = localStorage.getItem('2:30 PM')
var h6_b3 = localStorage.getItem('3:00 PM')
var h6_b4 = localStorage.getItem('4:00 PM')

document.addEventListener('DOMContentLoaded', function() {
    if(h6_b1){
        b1.querySelector('h6').innerText = JSON.parse(h6_b1).count + " Available";  
    }
    else{
        b1.querySelector('h6').innerText = "4 Available"
    }
    if(h6_b2){
        b2.querySelector('h6').innerText = JSON.parse(h6_b2).count + " Available";  
    }
    else{
        b2.querySelector('h6').innerText = "4 Available"
    }
    if(h6_b3){
        b3.querySelector('h6').innerText = JSON.parse(h6_b3).count + " Available";  
    }
    else{
        b3.querySelector('h6').innerText = "4 Available"
    }
    if(h6_b4){
        b4.querySelector('h6').innerText = JSON.parse(h6_b4).count + " Available";  
    }
    else{
        b4.querySelector('h6').innerText = "4 Available"
    }
});

function func1() {
    var h3Value = b1.querySelector('h3').innerText;
    var h6 = b1.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    if(h6Value>0){
        console.log(h3Value);
        console.log(h6Value);
        showForm('btn1',h3Value,h6Value,(res)=> {
            var value = res.count;
            b1.querySelector('h6').innerText = value  + " Available";  
        })  
    }else{
        b1.remove();
    }
}

function func2() {
    var h3Value = b2.querySelector('h3').innerText;
    var h6 = b2.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    console.log(h3Value);
    console.log(h6Value);
    if(h6Value>0){
    showForm('btn2',h3Value,h6Value,(res)=> {
        var value = res.count;
        b2.querySelector('h6').innerText = value  + " Available";  
    })  
    }else{
        b2.remove();
    }
}

function func3() {
    var h3Value = b3.querySelector('h3').innerText;
    var h6 = b3.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    console.log(h3Value);
    console.log(h6Value);
    if(h6Value>0){
        showForm('btn3',h3Value,h6Value,(res)=> {
            var value = res.count;
            b3.querySelector('h6').innerText = value  + " Available";  
        })  
    }else{
        b3.remove();
    }
}

function func4() {
    var h3Value = b4.querySelector('h3').innerText;
    var h6 = b4.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    console.log(h3Value);
    console.log(h6Value);
    if(h6Value>0){
        showForm('btn4',h3Value,h6Value,(res)=> {
            var value = res.count;
            b4.querySelector('h6').innerText = value  + " Available";  
        })  
    }else{
        b4.remove();
    }
}

function showForm(buttonId,h3,h6,callback) {

    var form = document.createElement('form');
    form.classList.add('mt-3', 'p-3', 'bg-light', 'rounded');

    var nameFormGroup = document.createElement('div');
    nameFormGroup.classList.add('form-group');
    
    var nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name';
    
    var nameInput = document.createElement('input');
    nameInput.classList.add('form-control');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('placeholder', 'Enter your name');
    
    nameFormGroup.appendChild(nameLabel);
    nameFormGroup.appendChild(nameInput);

    var emailFormGroup = document.createElement('div');
    emailFormGroup.classList.add('form-group');
    
    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email address';
    
    var emailInput = document.createElement('input');
    emailInput.classList.add('form-control');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('id', 'email');
    emailInput.setAttribute('placeholder', 'Enter your email');
    
    emailFormGroup.appendChild(emailLabel);
    emailFormGroup.appendChild(emailInput);

    var submitButton = document.createElement('button');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.setAttribute('type', 'button');
    submitButton.textContent = 'Submit';

    form.appendChild(nameFormGroup);
    form.appendChild(emailFormGroup);
    form.appendChild(submitButton);

    document.body.appendChild(form);

    submitButton.addEventListener('click', function () {
        var formData = {
            name: nameInput.value,
            email: emailInput.value,
            time: h3,
            count: h6

        };
        formData.count--;
        localStorage.setItem(formData.time, JSON.stringify(formData));
        console.log('Form submitted:', formData);
     
        document.body.removeChild(form);
        callback(formData);
    });

    // document.getElementById(buttonId).setAttribute('disabled', 'true');
}


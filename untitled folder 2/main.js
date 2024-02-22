var b1 = document.getElementById('btn1');
var b2 = document.getElementById('btn2');
var b3 = document.getElementById('btn3');
var b4 = document.getElementById('btn4');

b1.addEventListener('click', func1);
b2.addEventListener('click', func2);
b3.addEventListener('click', func3);
b4.addEventListener('click', func4);

var link_2PM = "https://meet.google.com/dpq-xwaz-ksk";
var link_2_30PM = "https://meet.google.com/acj-eoyz-hpi";
var link_3PM = "https://meet.google.com/viq-dvjv-dwq";
var link_4PM = "https://meet.google.com/zxi-niiz-zmo";


document.addEventListener('DOMContentLoaded', async function() {
    update_data();
});

 function update_data(time){
    var h6_b1 = localStorage.getItem('2:00 PM')
    var h6_b2 = localStorage.getItem('2:30 PM')
    var h6_b3 = localStorage.getItem('3:00 PM')
    var h6_b4 = localStorage.getItem('4:00 PM')
    if (h6_b1){
        var b1_cnt = JSON.parse(h6_b1).count;
        if(b1_cnt>0){
            b1.querySelector('h6').innerText = b1_cnt + " Available";  
        }else{
            b1.remove();
        }
    }else{
        b1.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b2){
        var b2_cnt = JSON.parse(h6_b2).count;
        if(b2_cnt>0){
            b2.querySelector('h6').innerText = b2_cnt + " Available";  
        }else{
            b2.remove();
        }
    }else{
        b2.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b3){
        var b3_cnt = JSON.parse(h6_b3).count;
        if(b3_cnt>0){
            b3.querySelector('h6').innerText = b3_cnt + " Available";  
        }else{
            b3.remove();
        }
    }else{
        b3.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b4){
        var b4_cnt = JSON.parse(h6_b4).count;
        if(b4_cnt>0){
            b4.querySelector('h6').innerText = b4_cnt + " Available";  
        }else{
            b4.remove();
        }
    }else{
        b4.querySelector('h6').innerText = "4 Available"
    }
    if(time) {
        afterSubmit(time,"divtag","link");
        afterSubmit(time,"div","meetings-scheduled");

        setTimeout(function(){
            var removetag = document.getElementById('divtag');
            if(removetag){
                removetag.remove();
            }
        },5000);
    }

};

function afterSubmit(time,loc1,loc2){
    var div_tag = document.createElement('div');
    div_tag.id = loc1
    var linkDiv = document.getElementById(loc2);
    var name = localStorage.getItem(time);
    if(name){
        var name = JSON.parse(name).name;
        let anchor; 
        if(time=='2:00 PM'){
            var text1 = document.createElement('div');
            text1.innerText = `Slot confirmed ${name}. Please join at ${time} Via `; 
            anchor = document.createElement('a'); 
            anchor.href = link_2PM
            anchor.textContent = link_2PM;
            anchor.target = '/';
            text1.appendChild(anchor);
        }
        if(time=='2:30 PM'){
            var text1 = document.createElement('div');
            text1.innerText = `Slot confirmed ${name}. Please join at ${time} Via `; 
            anchor = document.createElement('a'); 
            anchor.href = link_2_30PM
            anchor.textContent = link_2_30PM;
            anchor.target = '/';
            text1.appendChild(anchor);
        }
        if(time=='3:00 PM'){
            var text1 = document.createElement('div');
            text1.innerText = `Slot confirmed ${name}. Please join at ${time} Via `; 
            anchor = document.createElement('a'); 
            anchor.href = link_3PM
            anchor.textContent = link_3PM;
            anchor.target = '/';
            text1.appendChild(anchor);
        }
        if(time=='4:00 PM'){
            var text1 = document.createElement('div');
            text1.innerText = `Slot confirmed ${name}. Please join at ${time} Via `; 
            anchor = document.createElement('a'); 
            anchor.href = link_4PM
            anchor.textContent = link_4PM;
            anchor.target = '/';
            text1.appendChild(anchor);
        }
        div_tag.appendChild(text1);
        linkDiv.appendChild(div_tag);
    };
}

function func1() {
    var h3Value = b1.querySelector('h3').innerText;
    var h6 = b1.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    if(h6Value>0){
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value,h6Value,'2:00 PM');
    }
}
function func2() {
    var h3Value = b2.querySelector('h3').innerText;
    var h6 = b2.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    if(h6Value>0){
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value,h6Value,'2:30 PM');
    }
}
function func3() {
    var h3Value = b3.querySelector('h3').innerText;
    var h6 = b3.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    if(h6Value>0){
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value,h6Value,'3:00 PM');
    }
}
function func4() {
    var h3Value = b4.querySelector('h3').innerText;
    var h6 = b4.querySelector('h6').innerText;
    var h6Value = parseInt(h6);
    if(h6Value>0){
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value,h6Value,'4:00 PM');
    }
}


function showForm(h3,h6,clock) {

    let formContainer = document.getElementById("form-container");
    let formExists = document.getElementById("form");
    if(formExists) {
        formContainer.removeChild(formExists);
    }
    
    var form = document.createElement('form');
    form.id = 'form';
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

    formContainer.appendChild(form);

    submitButton.addEventListener('click', async function () {
        var formData = {
            name: nameInput.value,
            email: emailInput.value,
            time: h3,
            count: h6

        };
        formData.count--;

        localStorage.setItem(formData.time, JSON.stringify(formData));
        console.log('Form submitted:', formData);
        formContainer.removeChild(form);
        update_data(clock);
    });
}


let b1 = document.getElementById('btn1');
let b2 = document.getElementById('btn2');
let b3 = document.getElementById('btn3');
let b4 = document.getElementById('btn4');

b1.addEventListener('click', func1);
b2.addEventListener('click', func2);
b3.addEventListener('click', func3);
b4.addEventListener('click', func4);

let meetings_link =  {
    '2:00 PM' : "https://meet.google.com/dpq-xwaz-ksk",
    '2:30 PM' : "https://meet.google.com/acj-eoyz-hpi",
    '3:00 PM' : "https://meet.google.com/viq-dvjv-dwq",
    '4:00 PM' : "https://meet.google.com/zxi-niiz-zmo"
}


document.addEventListener('DOMContentLoaded', async function () {
    update_data();
    fetchingalldata();
});

function fetchingalldata() {
    let containerDiv = document.createElement("div");
    containerDiv.id = "meetingContainer";
    containerDiv.style.display = "flex";
    containerDiv.style.flexWrap = "wrap";

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let parsed_array = JSON.parse(data);

        for (let j = 0; j < parsed_array.length; j++) {
            let nameData = parsed_array[j].name;
            let newDiv = document.createElement("div");
            newDiv.id = "newMeetingDiv-" + key; 
            let wrappingElement = document.createElement("span");
            let textNode = document.createTextNode(`Slot confirmed ${nameData}. Please join at ${key} Via `);
            let anchorTag = document.createElement("a");
            anchorTag.href = meetings_link[key];
            anchorTag.innerHTML = meetings_link[key];
            anchorTag.target = '/';
            wrappingElement.appendChild(textNode);
            wrappingElement.appendChild(anchorTag);
            let lineBreak = document.createElement('br');
            wrappingElement.appendChild(lineBreak);
            let button1 = document.createElement("button");
            button1.innerHTML = "Cancel";
            button1.style.backgroundColor = "orange";
            button1.addEventListener("click", function () {
                cancelMeeting(j, key);
            });
            newDiv.appendChild(wrappingElement);
            newDiv.appendChild(button1);
            newDiv.setAttribute('style', 'text-align: center; height: 150px; width: 250px; border: 2px solid #333; box-shadow: 3px 3px 5px #888888; margin: 10px');
            containerDiv.appendChild(newDiv);
        }
    }
    let scheduledDiv = document.getElementById("scheduled");
    scheduledDiv.appendChild(containerDiv);
}


function cancelMeeting(indexToRemove, timing) {
    let data = localStorage.getItem(timing);
    let parsed_array = JSON.parse(data);
    parsed_array[parsed_array.length-1].count++;
    parsed_array.splice(indexToRemove, 1);

    if (parsed_array.length === 0) {
        localStorage.removeItem(timing);
    } else {
        localStorage.setItem(timing, JSON.stringify(parsed_array));
    }
    let meetingDivToRemove = document.getElementById("newMeetingDiv-" + timing);
    if (meetingDivToRemove) {
        meetingDivToRemove.remove();
    }
    update_data();
}

function fetchingData(){
    let containerDiv = document.createElement("div");
    containerDiv.id = "meetingContainer";
    containerDiv.style.display = "flex";
    containerDiv.style.flexWrap = "wrap";
    let keys = Object.keys(localStorage);
    var lastKey = keys[keys.length - 1];
    let data = localStorage.getItem(lastKey);
    let parsed_array = JSON.parse(data);
    let nameData = parsed_array[parsed_array.length-1].name;
    let newDiv = document.createElement("div");
    newDiv.id = "newMeetingDiv-" + lastKey; 
    let wrappingElement = document.createElement("span");
    let textNode = document.createTextNode(`Slot confirmed ${nameData}. Please join at ${lastKey} Via `);
    let anchorTag = document.createElement("a");
    anchorTag.href = meetings_link[lastKey]; 
    anchorTag.innerHTML = meetings_link[lastKey]
    anchorTag.target='/';
    wrappingElement.appendChild(textNode);
    wrappingElement.appendChild(anchorTag);
    let lineBreak = document.createElement('br');
    wrappingElement.appendChild(lineBreak);
    let button1 = document.createElement("button");
    button1.innerHTML = "Cancel";
    button1.style.backgroundColor = "orange"; 
    button1.addEventListener("click", function () {
        cancelMeeting(parsed_array.length-1, lastKey);
    });
    newDiv.appendChild(wrappingElement);
    newDiv.appendChild(button1);
    newDiv.setAttribute('style', 'text-align: center; height: 150px; width: 250px; border: 2px solid #333; box-shadow: 3px 3px 5px #888888; margin: 10px');
    containerDiv.appendChild(newDiv);
    let scheduledDiv = document.getElementById("scheduled");
    scheduledDiv.appendChild(containerDiv);

}

function update_data(time,name) {
    let h6_b1 = localStorage.getItem('2:00 PM') 
    let h6_b2 = localStorage.getItem('2:30 PM')
    let h6_b3 = localStorage.getItem('3:00 PM')
    let h6_b4 = localStorage.getItem('4:00 PM')
    if (h6_b1) {
        let parsedArray_1 = JSON.parse(h6_b1);
        let last_val = parsedArray_1[parsedArray_1.length-1];
        let cnt_val = last_val.count;
        console.log(cnt_val)
        if(cnt_val>0){
            b1.querySelector('h6').innerText = cnt_val + " Available";
        }else {
            b1.remove();
        }

    } else {
        b1.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b2) {
        let parsedArray = JSON.parse(h6_b2);
        let last_val = parsedArray[parsedArray.length-1];
        let cnt_val = last_val.count;
        console.log(cnt_val)
        if(cnt_val>0){
            b2.querySelector('h6').innerText = cnt_val + " Available";
        }else {
            b2.remove();
        }

    } else {
        b2.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b3) {
        let parsedArray = JSON.parse(h6_b3);
        let last_val = parsedArray[parsedArray.length-1];
        let cnt_val = last_val.count;
        console.log(cnt_val)
        if(cnt_val>0){
            b3.querySelector('h6').innerText = cnt_val + " Available";
        }else {
            b3.remove();
        }
    } else {
        b3.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b4) {
        let parsedArray = JSON.parse(h6_b4);
        let last_val = parsedArray[parsedArray.length-1];
        let cnt_val = last_val.count;
        console.log(cnt_val)
        if(cnt_val>0){
            b4.querySelector('h6').innerText = cnt_val + " Available";
        }else {
            b4.remove();
        }
    } else {
        b4.querySelector('h6').innerText = "4 Available"
    }
    if (time,name) {
        afterSubmit(time,name);
        setTimeout(function () {
            let removetag = document.getElementById('divtag');
            if (removetag) {
                removetag.remove();
            }
        }, 3000);
    }
};

function afterSubmit(time,name) {
    let div_tag = document.createElement('div');
    div_tag.id = "divtag"
    let linkDiv = document.getElementById("link");
    let text1 = document.createElement('div');
    text1.innerText = `Slot confirmed ${name}. Please join at ${time} Via `;
    let anchor = document.createElement('a');
    anchor.href = meetings_link[time]
    anchor.textContent = meetings_link[time]
    anchor.target = '/';
    text1.appendChild(anchor);
    div_tag.appendChild(text1);
    linkDiv.appendChild(div_tag);
    linkDiv.setAttribute('style', 'text-align: center; height: 150px; width: 250px; border: 2px solid #333; box-shadow: 3px 3px 5px #888888; displau: flex; alignItems = center');
    setTimeout(function() {
        linkDiv.removeAttribute('style');
      }, 3000);
    fetchingData();
};

function func1() {
    let h3Value = b1.querySelector('h3').innerText;
    let h6 = b1.querySelector('h6').innerText;
    let h6Value = parseInt(h6);
    if (h6Value > 0) {
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value, h6Value, '2:00 PM');
    }
}
function func2() {
    let h3Value = b2.querySelector('h3').innerText;
    let h6 = b2.querySelector('h6').innerText;
    let h6Value = parseInt(h6);
    if (h6Value > 0) {
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value, h6Value, '2:30 PM');
    }
}
function func3() {
    let h3Value = b3.querySelector('h3').innerText;
    let h6 = b3.querySelector('h6').innerText;
    let h6Value = parseInt(h6);
    if (h6Value > 0) {
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value, h6Value, '3:00 PM');
    }
}
function func4() {
    let h3Value = b4.querySelector('h3').innerText;
    let h6 = b4.querySelector('h6').innerText;
    let h6Value = parseInt(h6);
    if (h6Value > 0) {
        console.log(h3Value);
        console.log(h6Value);
        showForm(h3Value, h6Value, '4:00 PM');
    }
}


function showForm(h3, h6, clock) {

    let formContainer = document.getElementById("form-container");
    let formExists = document.getElementById("form");
    if (formExists) {
        formContainer.removeChild(formExists);
    }

    let form = document.createElement('form');
    form.id = 'form';
    form.classList.add('mt-3', 'p-3', 'bg-light', 'rounded');

    let nameFormGroup = document.createElement('div');
    nameFormGroup.classList.add('form-group');

    let nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name';

    let nameInput = document.createElement('input');
    nameInput.classList.add('form-control');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('placeholder', 'Enter your name');

    nameFormGroup.appendChild(nameLabel);
    nameFormGroup.appendChild(nameInput);

    let emailFormGroup = document.createElement('div');
    emailFormGroup.classList.add('form-group');

    let emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email address';

    let emailInput = document.createElement('input');
    emailInput.classList.add('form-control');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('id', 'email');
    emailInput.setAttribute('placeholder', 'Enter your email');

    emailFormGroup.appendChild(emailLabel);
    emailFormGroup.appendChild(emailInput);

    let submitButton = document.createElement('button');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.setAttribute('type', 'button');
    submitButton.textContent = 'Submit';

    form.appendChild(nameFormGroup);
    form.appendChild(emailFormGroup);
    form.appendChild(submitButton);

    formContainer.appendChild(form);

    submitButton.addEventListener('click', async function () {
        let formData = {
            name: nameInput.value,
            email: emailInput.value,
            time: h3,
            count: h6

        };
        let existing_data = localStorage.getItem(formData.time);
        let array = existing_data ? JSON.parse(existing_data) : [];
        formData.count--;
        array.push(formData);
        localStorage.setItem(formData.time, JSON.stringify(array));
        console.log('Form submitted:', formData);
        formContainer.removeChild(form);
        update_data(clock,formData.name);
    });
}


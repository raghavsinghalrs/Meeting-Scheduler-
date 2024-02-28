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

async function fetchingalldata() {
    let containerDiv = document.createElement("div");
    containerDiv.id = "meetingContainer";
    containerDiv.style.display = "flex";
    containerDiv.style.flexWrap = "wrap";
    containerDiv.style.justifyContent = "space-between";
    try{
        const response = await axios.get('http://localhost:3000/home_page');
        if(response){
            let res_data = response.data;
            let total_rows = response.data.full_Data.length;
            console.log(res_data);
            console.log(total_rows); 
            for (let i = 0; i < total_rows; i++) {
                let row_value = res_data.full_Data[i];
                console.log('row value: ',row_value);
                let newDiv = document.createElement("div");
                newDiv.id = "newMeetingDiv-" + row_value.id; 
                let wrappingElement = document.createElement("span");
                let textNode = document.createTextNode(`Slot confirmed ${row_value.name}. Please join at ${row_value.time} Via `);
                let anchorTag = document.createElement("a");
                anchorTag.href = meetings_link[row_value.time];
                anchorTag.innerHTML = meetings_link[row_value.time];
                anchorTag.target = '/';
                wrappingElement.appendChild(textNode);
                wrappingElement.appendChild(anchorTag);
                let lineBreak = document.createElement('br');
                wrappingElement.appendChild(lineBreak);
                let button1 = document.createElement("button");
                button1.innerHTML = "Cancel";
                button1.style.backgroundColor = "orange";
                button1.addEventListener("click", function () {
                    cancelMeeting(row_value);
                });
                
                newDiv.appendChild(wrappingElement);
                newDiv.appendChild(button1);
                newDiv.setAttribute('style', 'text-align: center; height: 150px; width: 250px; border: 2px solid #333; box-shadow: 3px 3px 5px #888888; margin: 10px');
                containerDiv.appendChild(newDiv);
                }
            }
            let scheduledDiv = document.getElementById("scheduled");
            scheduledDiv.appendChild(containerDiv);
        } catch(err){
        console.log(err);
    }
};

function cancelMeeting(data_row) {
    console.log("I am in Cancel meeting function");
    let meetingDivToRemove = document.getElementById("newMeetingDiv-" + data_row.id);
    if (meetingDivToRemove) {
        meetingDivToRemove.remove();
    }
    axios.delete(`http://localhost:3000/delete_row/${data_row.id}`)
    .then((res)=>{
        console.log(res);
    })
    update_data();
}

function fetchingData(res){
    let newDiv = document.createElement("div");
    newDiv.id = "newMeetingDiv-" + res.time; 
    let wrappingElement = document.createElement("span");
    let textNode = document.createTextNode(`Slot confirmed ${res.name}. Please join at ${res.time} Via `);
    let anchorTag = document.createElement("a");
    anchorTag.href = meetings_link[res.time]; 
    anchorTag.innerHTML = meetings_link[res.time]
    anchorTag.target='/';
    wrappingElement.appendChild(textNode);
    wrappingElement.appendChild(anchorTag);
    let lineBreak = document.createElement('br');
    wrappingElement.appendChild(lineBreak);
    let button1 = document.createElement("button");
    button1.innerHTML = "Cancel";
    button1.style.backgroundColor = "orange"; 
    button1.addEventListener("click", function () {
        cancelMeeting(res);
    });
    newDiv.appendChild(wrappingElement);
    newDiv.appendChild(button1);
    newDiv.setAttribute('style', 'text-align: center; height: 150px; width: 250px; border: 2px solid #333; box-shadow: 3px 3px 5px #888888; margin: 10px');
    let scheduledDiv = document.getElementById("meetingContainer");
    scheduledDiv.appendChild(newDiv);
}


async function update_data(row) {
    const response = await axios.get('http://localhost:3000/databyTime');
    console.log(response);

    let data_2PM = response.data.data_2PM;
    let data_2_30PM = response.data.data_2_30PM;
    let data_3PM = response.data.data_3PM;
    let data_4PM = response.data.data_4PM;

    console.log("data_2PM", data_2PM);
    console.log("data_2_30PM", data_2_30PM);
    console.log("data_3PM", data_3PM);
    console.log("data_4PM", data_4PM);

    let h6_b1;
    let h6_b2;
    let h6_b3;
    let h6_b4;

    if(data_2PM){

        h6_b1 =  data_2PM[data_2PM.length-1].count;
    }
    if(data_2_30PM){
        
        h6_b2 = data_2_30PM[data_2_30PM.length-1].count;
    }
    if(data_3PM){
        
        h6_b3 = data_3PM[data_3PM.length-1].count;
    }
    if(data_4PM){

        h6_b4 = data_4PM[data_4PM.length-1].count;
    }

    console.log(h6_b1,h6_b2,h6_b3,h6_b4);

    if (h6_b1) {
        if(h6_b1>0){
            b1.querySelector('h6').innerText = h6_b1 + " Available";
        }else {
            b1.remove();
        }

    } else {
        b1.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b2) {
        if(h6_b2>0){
            b2.querySelector('h6').innerText = h6_b2 + " Available";
        }else {
            b2.remove();
        }

    } else {
        b2.querySelector('h6').innerText = "4 Available"
    }

    if (h6_b3) {
        if(h6_b3>0){
            b3.querySelector('h6').innerText = h6_b3 + " Available";
        }else {
            b3.remove();
        }
    } else {
        b3.querySelector('h6').innerText = "4 Available"
    }
    if (h6_b4) {
        if(h6_b4>0){
            b4.querySelector('h6').innerText = h6_b4 + " Available";
        }else {
            b4.remove();
        }
    } else {
        b4.querySelector('h6').innerText = "4 Available"
    }
    if (row) {
        await afterSubmit(row);
        setTimeout(function () {
            let removetag = document.getElementById('divtag');
            if (removetag) {
                removetag.remove();
            }
        }, 3000);
    }
};

async function afterSubmit(res) {
    console.log(res,"res in after submit function")
    let div_tag = document.createElement('div');
    div_tag.id = "divtag"
    let linkDiv = document.getElementById("link");
    let text1 = document.createElement('div');
    text1.innerText = `Slot confirmed ${res.name}. Please join at ${res.time} Via `;
    let anchor = document.createElement('a');
    anchor.href = meetings_link[res.time]
    anchor.textContent = meetings_link[res.time]
    anchor.target = '/';
    text1.appendChild(anchor);
    div_tag.appendChild(text1);
    linkDiv.appendChild(div_tag);
    linkDiv.setAttribute('style', 'text-align: center; height: 150px; width: 250px; border: 2px solid #333; box-shadow: 3px 3px 5px #888888; displau: flex; alignItems = center');
    setTimeout(function() {
        linkDiv.removeAttribute('style');
      }, 3000);
    fetchingData(res);
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


function showForm(h3, h6) {

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
        formData.count--;
        const response = await axios.post('http://localhost:3000/form_data',formData);
        formContainer.removeChild(form);
        update_data(response.data.newrowdetails);
    });
}


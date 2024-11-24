
let Chatbox = document.getElementById("Chatbox");
let messageArray = [];
let chatBody = ``;



function send() {
    let user = document.getElementById("userselect").value;
    let txtMessage = document.getElementById("txtMessage").value;
    messageArray.push({ user, txtMessage });
    console.log(messageArray);



    let AiResult = "";

    if (user == "me") {
        chatBody = `<h3 class="text-end">${txtMessage}</h3>`

    }

    Chatbox.innerHTML += chatBody



    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": txtMessage
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw

    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.candidates[0].content.parts[0].text);

            AiResult = `<h4>${result.candidates[0].content.parts[0].text}</h4>`;
            // console.log(AiResult);


            Chatbox.innerHTML += AiResult
        })
        .catch((error) => console.error(error));




}
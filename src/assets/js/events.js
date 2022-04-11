import helpers from './helpers.js';

// let axios = require('axios');

window.addEventListener('load', () => {
    //When the chat icon is clicked
    document.querySelector('#toggle-chat-pane').addEventListener('click', (e) => {
        let chatElem = document.querySelector('#chat-pane');
        let mainSecElem = document.querySelector('#main-section');

        if (chatElem.classList.contains('chat-opened')) {
            chatElem.setAttribute('hidden', true);
            mainSecElem.classList.remove('col-md-9');
            mainSecElem.classList.add('col-md-12');
            chatElem.classList.remove('chat-opened');
        }

        else {
            chatElem.attributes.removeNamedItem('hidden');
            mainSecElem.classList.remove('col-md-12');
            mainSecElem.classList.add('col-md-9');
            chatElem.classList.add('chat-opened');
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout(() => {
            if (document.querySelector('#chat-pane').classList.contains('chat-opened')) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300);
    });


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById('local').addEventListener('click', () => {
        if (!document.pictureInPictureElement) {
            document.getElementById('local').requestPictureInPicture()
                .catch(error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error(error);
                });
        }

        else {
            document.exitPictureInPicture()
                .catch(error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error(error);
                });
        }
    });


    document.getElementById('open-create').addEventListener('click', (e) => {
        e.preventDefault();

        console.log("open-create Clicked");
        document.getElementById('username-set').hidden = true;
        document.getElementById('room-create').hidden = false;


    });

    document.getElementById('open-join').addEventListener('click', (e) => {
        e.preventDefault();

        console.log("join-create Clicked");
        document.getElementById('username-set').hidden = false;
        document.getElementById('room-create').hidden = true;



    });

    //When the 'Create room" is button is clicked
    document.getElementById('create-room').addEventListener('click', (e) => {
        e.preventDefault();

        // var myString = "An,array,in,a,string,separated,by,a,comma";
        // var myArray = myString.split(",");
        // console.log(myArray,myArray[0]);

        let roomName = document.querySelector('#room-name').value;
        let yourName = document.querySelector('#your-name').value;
        let mail = document.querySelector('#your-mail').value;

        console.log(roomName, yourName, mail);

        if (roomName && yourName && mail != "") {
            //remove error message, if any
            document.querySelector('#err-msg').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem('username', yourName);
            // console.log("nfa",value);
            //create room link
            // let Http = require('http');
            var MyArrayString = mail.split(",");
            console.log("EMaail IDS", MyArrayString);

            let room_id = `${roomName.trim().replace(' ', '_')}_${helpers.generateRandomString()}`;

            console.log("room ID", room_id);

            let roomLink = `${location.origin}?room=${room_id}`;

            //show message with link to room
            var code = `
            <button id='copy-room-id >copy</button>
            `;
            document.querySelector('#room-created').innerHTML = `Room successfully created - <a href='${roomLink}'>Join Room</a><br/><br/>
            <span id='value1'>Room Link - ${roomLink}</span>
        
            `;

            for (let i = 0; i < MyArrayString.length; i++) {
                let user = {

                    email: MyArrayString[i],
                    name: yourName,
                    roomid: room_id,
                    room_link: roomLink


                }
                console.log("users data", user);

                axios.post('http://18.118.115.101:8000/send_invitation', user)
                    .then((res) => {
                        console.log('Body: ', res);
                    }).catch((err) => {
                        console.error(err);
                    })


            }
            //empty the values
            document.querySelector('#room-name').value = '';
            document.querySelector('#your-name').value = '';
            document.querySelector('#your-mail').value = '';

        }


        else {
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
        // });

    });


    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();

        sessionStorage.clear();
        location.assign('/');

    });

    //When the 'Enter room' button is clicked.
    document.getElementById('enter-room').addEventListener('click', (e) => {
        e.preventDefault();

        let name = document.querySelector('#username').value;
        let roomid = document.querySelector('#roomname').value;
        console.log(roomid, name);
        if (name) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem('username', name);

            // console.log("value",sessionStorage.setItem( 'username', name ));

            let roomLink = `${location.origin}?room=${roomid}`;
            console.log(roomLink);

            location.href = roomLink;

            location.replace(roomLink)

            // location.reload();
            // location.prop('href', roomLink)
            document.querySelector('#username').value = '';
            document.querySelector('#roomname').value = '';
            // document.getElementById('username-set').hidden = true;
            // document.getElementById('room-create').hidden=true;
        }

        else {
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    });


    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('expand-remote-video')) {
            helpers.maximiseStream(e);
        }

        else if (e.target && e.target.classList.contains('mute-remote-mic')) {
            helpers.singleStreamToggleMute(e);
        }
    });
    videos

    document.getElementById('closeModal').addEventListener('click', () => {
        helpers.toggleModal('recording-options-modal', false);
    });




    // document.getElementById( 'open-create' ).addEventListener( 'click', () => {
    //     console.log("open-create Clicked");
    //     document.querySelector( '#room-create' ).attributes.removeNamedItem( 'hidden' );
    //     document.querySelector( '#username-set' ).attributes.setNamedItem( 'hidden' );
    // } );

    // document.getElementById( 'open-join' ).addEventListener( 'click', () => {
    //     console.log("open-Join Clicked");
    //     document.querySelector( '#username-set' ).attributes.removeNamedItem( 'hidden' );
    //     document.querySelector( '#room-create' ).attributes.setNamedItem( 'hidden' );

    // } );
});

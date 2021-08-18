var socket = io.connect('http://10.0.0.62:4000',{'forceNew':true });

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(messages,index){
        return(`
        <div class="message">
        <strong>${messages.nickname}</strong>dice:
        <p>${messages.text}</p>
        </div>
        `)
    }).join(' ');

    document.getElementById('messages').innerHTML= html;
}

function addMessage(e){
    var message={
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display= 'none';
    socket.emit('add-message',message);

    return false;

}
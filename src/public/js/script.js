document.addEventListener("DOMContentLoaded",() =>{

    //const ws = new WebSocket('ws://localhost:3000');
    const ws = new WebSocket('ws://asdemobootcampv2.azurewebsites.net:3000')

    const input = document.querySelector('input');
    const btn = document.querySelector('button');
    const chat = document.querySelector('.chat');
    
    btn.addEventListener('click', function(){
        ws.send(input.value);
    });
    
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    
    ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
    }

    ws.onmessage = (out) => {

        if(out.data){
            const label = document.createElement('label');
            const chat = document.querySelector('.chat');
            const { owner, message } = JSON.parse(out.data);
            label.style.alignSelf = ( owner ? 'flex-end': 'flex-start' );
            label.style.backgroundColor = ( owner ? 'rgb(7, 174, 240)': 'rgb(85, 113, 124)' );
            label.innerText = message;
            chat.append(label);
        }
    }
    
    
})

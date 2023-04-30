    //Constantes
    const ul = document.querySelector('#stpTimer')
    const limpar = document.querySelector('#limparBtt')
    const play = document.querySelector('#play')
    const timer = document.querySelector('p#timer')

    //Globais
    let a = 0
    let b = 0
    let i 
    let min = 0
    let newLi

    //Funções auxiliares
    function display(id, value){
        let idName = `#${id}`
        document.querySelector(idName).style.display = value
    }
    function verificaListaVazia(){
        if(ul.children.length == 0){
            display('limparBtt', 'none')
        } else {
            display('limparBtt', 'inline')
        }
    }
    function escreveLayouts(layout){
        if(layout == 'mins'){
            document.querySelector('#min').innerText = `${min} min.`
        }

        if(layout == 'cronom'){
            timer.innerText = `0${a.toString()}  :  ${b.toString()}0`
        }

    }

    escreveLayouts('cronom')
    escreveLayouts('mins')

    
    //Função principal
    function acaoBotoes(acao){

        //Variáveis válvulas
        let Break = 0
        Break ++ 

        //Mecânica de válvula para unico uso do 'player'
        if(Break >= 1){
            play.setAttribute("onclick", "acaoBotoes('pla')")
        }

        //Lógica do botão play
        if(acao == 'play'){
            function time(){
                timer.innerText = `${a.toString()}  :  ${(b++).toString().substring(0,2)}`
                 
                //Conversões de tempo
                function verificaTempos(){
                    if(b == 100){
                        b = 0
                        a++
                    }

                    if(a == 60){  
                        min++
                        a = 0
                        document.querySelector('#min').innerText = `${min} min.` 
                    }
                }

                verificaTempos()

                display('add','none')
                display('pause', 'inline')
            }
                
            timer.style.animation = ''

            i = setInterval(time, 10)
            display('reset','none')
        
            
        //Lógica do botão pause    
        } else if (acao == 'pausar'){
            clearInterval(i)
            display('reset', 'inline')
            display('add','inline')
            display('pause','none')
            play.setAttribute("onclick", "acaoBotoes('play')")
            timer.style.animation = 'pisc 4s linear infinite'

        //Lógica do botão reset
        } else if (acao == 'reset'){
            clearInterval(i)
            b = 0
            a = 0
            min = 0

            escreveLayouts('mins')
            escreveLayouts('cronom')

            play.setAttribute("onclick", "acaoBotoes('play')")

            display('reset', 'none')
            display('pause','inline')
            display('add','none')

            timer.style.animation = ''
        }
    }
    
    //Botção de adicionar
    function adicionar(){
        newLi = document.createElement('li')
        newLi.innerHTML = min+' min, '+a+' seg'+' : '+b+' ms' + '<div><img src="img/lapis.png" onclick="nomear()"></img> <img src="img/x.png" onclick="parentNode.parentNode.remove(); verificaListaVazia()"></img></div>'
        ul.appendChild(newLi)
        limpar.style.display = 'inline'
    }

    //Botão de nomeação
    function nomear(){
        let msg = prompt('Deseja adicionar algum lembrete nesse stop point?')
            if(msg == '' || msg == null){
                alert('Adicione um valor válido')
            } else {
                newLi.innerHTML = min+' min, '+a+' seg'+' : '+b+' ms' + ' ('+msg+')' + '<div><img src="img/lapis.png" onclick="nomear()"></img> <img src="img/x.png" onclick="parentNode.parentNode.remove(); verificaListaVazia()"></img></div>'
            }
    }
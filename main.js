// https://teachablemachine.withgoogle.com/models/L4Gid02ZG/

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
    })
    
    var camera = document.getElementById("camera")
    
    Webcam.attach(camera)
    
    function tirarFoto(){
        Webcam.snap(function(data_uri){
            document.getElementById("resulatdo").innerHTML = `<img id="foto" src="${data_uri}" /> `
        })
    }
    
    console.log("versão ml5", ml5.version )
    
    var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/L4Gid02ZG/model.json", carregarmodelo)
    
    function carregarmodelo(){
        console.log("modeloCarregado")
    }
     
    function checar(){
        var img = document.getElementById("foto")
        classifier.classify(img, pegarResultados)
    }
    
    function pegarResultados(error, result){
    if(error){
        console.log(error)
    }
    else{
        console.log(result)

        document.getElementById("objeto").innerHTML = result[0].label
        document.getElementById("precisão").innerHTML = result[0].confidence.toFixed(3) * 100 + "%"

        var API = window.speechSynthesis
        var texto = " O objeto é " + result[0].label + " A precisão é " + result[0].confidence.toFixed(3) * 100 + "%"
        var textoFala = new SpeechSynthesisUtterance(texto)
        API.speak(textoFala)
    }
    
    }
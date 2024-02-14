
// Document Ready
$(document).ready(function(){
    $('#resultado-busqueda').hide();
    $('#error-stats').hide();
    $('#stats-ok').hide();
    $('#buscar').click(function(e){
        e.preventDefault();

        let numero = $('#search').val();
        // verificamos que el campo no este vacio
        if(numero == ''){
            alert('El campo no puede estar vacio');
            $('#search').val('');
        }
        // verificamos que el campo sea un numero
        else if (isNaN(numero)){
            alert('El campo debe ser un número');
            $('#search').val('');
        }
        // verificamos que el numero sea mayor a 0
        else if(numero <= 0){
            alert('El numero debe ser mayor a 0');
            $('#search').val('');
        }
        else if(numero > 731){
            alert('El numero debe ser menor a 732');
            $('#search').val('');
        }
        
        // llamamos a la funcion que realiza la peticion a la api
        else{
            
            $('#search').val('');
            $.ajax({
                 url : `https://superheroapi.com/api.php/4905856019427443/${numero}`,//SUPERHERO API URL,
                method : 'GET',
                dataType : 'json',
                success : function(response) {
                    $('#resultado-busqueda').show();
                    
                    let img = response.image.url;
                    console.log(img);
                
                    $('#card-title').text(response.name);
                    $('#nombre').text(response.biography['full-name']);
                // set img to the id 
                     $('#img').attr('src', img);
                     $('#conexiones').text(response.connections['group-affiliation']);
                     $('#publicacion').text(response.biography.publisher);
                     $('#ocupacion').text(response.work['occupation']);
                     $('#altura').text(response.appearance['height'][1]);
                     $('#peso').text(response.appearance['weight'][1]);
                     $('#alianzas').text(response.biography['aliases']);
            //display de stats canvasJS
            let intelligence = response.powerstats.intelligence;
            let strength = response.powerstats.strength;
            let speed = response.powerstats.speed;
            let durability = response.powerstats.durability;
            let power = response.powerstats.power;
            let combat = response.powerstats.combat;

            let stats = [intelligence, strength, speed, durability, power, combat]
            for (let i = 0; i < stats.length; i++) {
                if (stats[i] == "null" || stats[i] == "undefined" || stats[i] == "NaN" || stats[i] == ""){
                    //render stats unkwnown
                    $('#stats-ok').hide();
                    $('#error-stats').show();
                    
                }
                else{
                    //render stats
                    $('#stats-ok').show();
                    $('#error-stats').hide();
                    $('#nombre-pj').text(response.name);
                    let chart = new CanvasJS.Chart("chartContainer", {
                
                        animationEnabled: true,
                        title: {
                            text: ""
                            
                            
                        },
                        data: [{
                            type: "pie",
                            startAngle: 250,
                            yValueFormatString: "##0.00\"%\"",
                            indexLabel: "{label} {y}",
                            dataPoints: [
                                {y: intelligence, label: "Intelligence"},
                                {y: strength, label: "Strength"},
                                {y: speed, label: "Speed"},
                                {y: durability, label: "Durability"},
                                {y: power, label: "Power"},
                                {y: combat, label: "Combat"}
                            ]
                        }]
                    });
                    chart.render();
            }   
            
            

        }
       //scroll to the bottom of the page smoothly
        $('html, body').animate({
        scrollTop: $(document).height()});
    }});
        
    
}
   
});
});


// api key : 
// 4905856019427443



   
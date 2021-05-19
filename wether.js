var a = document.getElementById( "btn" );
var b = document.getElementById( "placer" );
var c = document.getElementById( "in" );
var dels = document.getElementsByClassName( "del" );
var cons = document.getElementsByClassName( "boxes" );
var considle = document.getElementsByClassName( "box" );
var z = document.getElementById( "alerts" );
var v = document.getElementById( "viewer" );
var x = [];
var y = [];
var html = "";
var cnt = 0;

a.addEventListener( "click", () =>
{
    if ( c.value.trim() == "" )
    {
        z.style.display = "block";
            z.innerText = " * Please Enter the City Name";
            setTimeout( () =>
            {
                z.style.display = "none";
            },2000)
    }
    else
    {

        v.style.display = "none";
        x.push( c.value );
        if ( hasDup( x ) )
        {
            x.pop();
            z.style.display = "block";
            z.innerText = " * You already know this city weather";
                    setTimeout( () =>
                    {
                        z.style.display = "none";
                    },2000)
        }
        else
        {
            if ( x.length <= 3 ) { b.style.overflow = "hidden"; } else { b.style.overflowY = "scroll";}
            fetch( 'https://api.openweathermap.org/data/2.5/weather?q=' + c.value + '&appid={your api key}' )
                .then( ( response ) =>
                {
                    return response.json();
                } ).then( ( data ) =>
                {
                    var country = data[ 'sys' ][ 'country' ];
                    var temp = parseInt( data[ 'main' ][ 'temp' ] ) - 273;
                    var desc = cap( data[ 'weather' ][ 0 ][ 'description' ] );
                    var name = c.value.charAt( 0 ).toUpperCase() + c.value.slice( 1 );
                    if ( data[ 'weather' ][ 0 ][ 'main' ] == "Rain" )
                    {
                        html += `<div class="boxes">
                <h1 id="ti">${ temp }<sup>°C</sup><i style=" color: #4a9ee5;" class="fas fa-cloud-rain symb"></i></h1>
                <p>${ name } <sup>${ country }</sup></p>
                <p id="st" align="center">${ desc }</p>
                </div>`;
                    }
                    if ( data[ 'weather' ][ 0 ][ 'main' ] == "Clear" )
                    {
                        html += `<div class="boxes">
                <h1 id="ti">${ temp }<sup>°C</sup><i style=" color: #f8f81e;" class="fas fa-sun symb"></i></h1>
                <p>${ name } <sup>${ country }</sup></p>
                <p id="st" align="center">${ desc }</p>
                </div>`;
                    }
                    if ( data[ 'weather' ][ 0 ][ 'main' ] == "Clouds" )
                    {
                        html += `<div class="boxes">
                <h1 id="ti">${ temp }<sup>°C</sup><i style=" color: #4a9ee5;" class="fas fa-cloud symb"></i></h1>
                <p>${ name } <sup>${ country }</sup></p>
                <p id="st" align="center">${ desc }</p>
                </div>`;
                    }
                    b.innerHTML = html;
                } )
                .catch( ( e ) =>
                {
                    z.style.display = "block";
                    x.pop(); z.innerText = " *Invalid city Name";
                    setTimeout( () =>
                    {
                        z.style.display = "none";
                    },2000)
                });
            }
        }
} );    
cap = ( str ) =>
{
    return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
};
hasDup = ( arr ) =>
{
    return ( new Set( arr ) ).size != arr.length;
};

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft , faCar , faCity} from '@fortawesome/free-solid-svg-icons';

const Result = () => {
    const location = useLocation();
    const data = location.state.data;
    const vehicle = location.state.vehicle ;
    const couples = location.state.couples;
    const adults = location.state.adult;
    const childs = location.state.child ;
    const [result, setresult] = useState([]);
    const extras = location.state.extras ;

    const goBack = () => window.history.back();

    Array.from(data).forEach(item => {
        if (item.mealplan === 1) {
            let meeaal = "Breakfast And Dinner";
            let couple = couples * item.hotel[0].map_double * item.nights ;
            let adult = adults * item.hotel[0].adult_map * item.nights;
            let child = childs * item.hotel[0].child_map * item.nights;
            let hotelName = item.hotel[0].hotel_name;
            let calculation = couple + adult + child;

            const arr = { meeaal: meeaal, couple: couple, adult: adult, child: child, hotelName: hotelName, result: calculation, nights : item.nights , d1 : item.d1 , d2 : item.d2 , city : item.city};
            result.push(arr);
        } else {
            let meeaal = "Breakfast";
            let couple = couples * item.hotel[0].cp_double * item.nights;
            let adult = adults * item.hotel[0].adult_cp * item.nights;
            let child = childs * item.hotel[0].child_cp * item.nights;
            let hotelName = item.hotel[0].hotel_name;
            let calculation = couple + adult + child;

            const arr = { meeaal: meeaal, couple: couple, adult: adult, child: child, hotelName: hotelName, result: calculation , nights : item.nights , d1 : item.d1 , d2 : item.d2 , city : item.city};
            result.push(arr);
        }
    })

    const getTotal = () => {
        let  calculation = 0 ;
        Array.from(result).forEach(item => {
            calculation += item.result ;
        })
        return calculation ;
    }
    const total = getTotal() + vehicle + extras;

    const copytext = () => {
        var copytext = document.getElementById('copy');
        var text = copytext.innerText ;
        navigator.clipboard.writeText(text);
        alert("Copied to Clipboard");
    }

    return (
        <>
        <div onClick={()=>{goBack()}} style={{display:'flex' , alignItems:'center'}} >
            <FontAwesomeIcon  className='icon' icon={faArrowRotateLeft} /> &nbsp; &nbsp; <h4>Restart</h4>
        </div>
        <div className="container" id='copy'>
            <h4>
              Greetings from 'Adwait Tours', your tour details are:
            </h4>
        
            <div>No. of Couples:{couples}</div>   
            <div>Extra Adult   :{adults}</div>
            <div>No. of Childs :{childs}</div>
            <br />
            {
                Array.from(result).map(item =>{
                    return(
                        <>
                            <div>&#127976;Hotel Name : {item.hotelName}</div>
                            <div><FontAwesomeIcon icon={faCity} /> City : {item.city}</div>
                            <div>&#128197;Check In : {item.d1}</div>
                            <div>&#128197;Check Out: {item.d2}</div>
                            <div>&#127747;Nights : {item.nights}</div>
                            {/* <div>&#128176;Couple charges      :&#8377;{item.couple}/-</div>
                            <div>&#128176;Extra adults charges:&#8377;{item.adult}/-</div>
                            <div>&#128176;Childs charges      :&#8377;{item.child}/-</div> */}
                            <div>&#127857;Meal Plan :  {item.meeaal}</div>
                            <br />
                        </>
                    )
                })
            }
            <br />
            <div>Extras :{extras}</div>
            <br />
            <FontAwesomeIcon icon={faCar} /> Vehicle : {location.state.vehicleName}
            <br />
            <br />
            &#128181; Total Tour Package = &#8377;{(1.12 * total)} /- only
            <br /><br />
            Thank You!
        </div>
        <button className="coppee" onClick={()=>{copytext()}}>Copy Text</button>
        </>
    )
}

export default Result;

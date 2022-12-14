import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const data = location.state.data;
    const [result, setresult] = useState([]);
    console.log(result);
    Array.from(data).forEach(item => {
        if (item.mealplan === 1) {
            let meeaal = "Breakfast Included";
            let couple = item.couples * item.hotel[0].MAP_double * item.nights ;
            let adult = item.adult * item.hotel[0].Adult_MAP * item.nights;
            let child = item.child * item.hotel[0].Child_MAP * item.nights;
            let hotelName = item.hotel[0].Hotel_Name;
            let calculation = couple + adult + child;

            const arr = { meeaal: meeaal, couple: couple, adult: adult, child: child, hotelName: hotelName, result: calculation, nights : item.nights , d1 : item.d1 , d2 : item.d2 };
            result.push(arr);
        } else {
            let meeaal = "Breakfast Excluded";
            let couple = item.couples * item.hotel[0].CP_double * item.nights;
            let adult = item.adult * item.hotel[0].Adult_CP * item.nights;
            let child = item.child * item.hotel[0].Child_CP * item.nights;
            let hotelName = item.hotel[0].Hotel_Name;
            let calculation = couple + adult + child;

            const arr = { meeaal: meeaal, couple: couple, adult: adult, child: child, hotelName: hotelName, result: calculation , nights : item.nights , d1 : item.d1 , d2 : item.d2};
            result.push(arr);
        }
    })

    const getTotal = () => {
        let  calculation = 0 ;
        console.log(calculation);
        Array.from(result).forEach(item => {
            calculation += item.result ;
        })
        return calculation ;
    }
    const total = getTotal();

    const copytext = () => {
        var copytext = document.getElementById('copy');
        var text = copytext.innerText ;
        navigator.clipboard.writeText(text);
        alert("Copied to Clipboard");
    }
    
    return (
        <>
        <div className="container" id='copy'>
            <h4>
              Greetings from 'Adwait Tours', your tour details are:
            </h4>
        
            <div>No. of couples:{data[0].couples}</div>   
            <div>Extra adult   :{data[0].adult}</div>
            <div>No. of childs :{data[0].child}</div>
            <br />
            {
                Array.from(result).map(item =>{
                    return(
                        <>
                            <div>&#127976;Hotel Name          :{item.hotelName}</div>
                            <div>&#128197;Check In            :{item.d1}</div>
                            <div>&#128197;Check Out           :{item.d2}</div>
                            <div>&#127747;Nights              :{item.nights}</div>
                            <div>&#128176;Couple charges      :&#8377;{item.couple}/-</div>
                            <div>&#128176;Extra adults charges:&#8377;{item.adult}/-</div>
                            <div>&#128176;Childs charges      :&#8377;{item.child}/-</div>
                            <div>&#127857;Meal Plan           :{item.meeaal}</div>
                            <br />
                        </>
                    )
                })
            }
            <br />
            &#128181; Total Tour Package:&#8377; {total}/- only
            <br /><br />
            Thank You!
        </div>
        <button class="coppee" onClick={()=>{copytext()}}>Copy Text</button>
        </>
    )
}

export default Result;
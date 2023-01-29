import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [first, setfirst] = useState(true);
    const [bool, setbool] = useState(false);
    const [display, setdisplay] = useState({ hotelcall: "", cal: "d-none", noHotel: "" });
    const [state, setstate] = useState([]);
    const [hotelId, sethotelId] = useState([]);
    const [rating, setrating] = useState("1")
    const [city, setcity] = useState([]);
    const [hotels, sethotels] = useState([]);
    const [cityName, setcityName] = useState("");
    const [stateName, setstateName] = useState("");
    const [Data, setData] = useState([]);
    const [mealPlan, setmealPlan] = useState(1);
    const [vehicle, setvehicle] = useState(0);
    const [totalDays, settotalDays] = useState(0);
    const [date1, setdate1] = useState(new Date());
    const [date2, setdate2] = useState(date1);
    const [miniDate, setminiDate] = useState(new Date());
    const [vehicleName, setvehicleName] = useState("");

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);
        const handleChange = (event) => {
            setValue(event.target.value);
        };
        return {
            value,
            onChange: handleChange,
        };
    };

    const couples = useInput("1");
    const adult = useInput("0");
    const child = useInput("0");
    const extras = useInput(0);

    const getState = async () => {
        const res = await fetch("/getstate");
        const data = await res.json();
        setstate(data.rows);
        if (first) {
            getCity(1);
            setfirst(false);
        }
    }

    const getCity = async (id) => {
        const res = await fetch(`/getCity/${id}`);
        const data = await res.json();
        console.log(data);
        setcity(data.rows);
        var e = document.getElementById("state");
        var text = e.options[e.selectedIndex].text;
        setstateName(text);
    }
    const getHotels = async () => {
        var cityid = document.getElementById('city');
        if (couples.value === "" || adult.value === "" || child.value === "") {
            alert("Please fill the values for couples , adults and child first !");
            return;
        }else if(parseInt(couples.value) === 0){
            alert("Value for couples can not be 0");
            return;
        }
        if (!bool) {
            setbool(true);
        }
        const res = await fetch(`/getHotels/${cityid.value}/${rating}`);
        const data = await res.json();
        const cityname = city.filter(item => {
            return parseInt(item.id) === parseInt(cityid.value);
        })
        setcityName(cityname[0].city_name);
        sethotels(data.rows);
        setTimeout(() => {
            var e = document.getElementById("hotel");
            var id = e.options[e.selectedIndex].value;
            sethotelId(id);
        }, 2000);
        if (data.rows.length === 0) {
            setdisplay({ hotelcall: "d-none", cal: "", noHotel: true })
        } else {
            setdisplay({ hotelcall: "d-none", cal: "", noHotel: false })
        }
    }
    const cancel = () => {
        setdisplay({ hotelcall: "", cal: "d-none", noHotel: false })
    }
    const addHotel = () => {
        console.log(hotelId);
        const d1 = new Date(`${date1.getMonth()+1}/${date1.getDate()}/${date1.getFullYear()}`);
        const d2 = new Date(`${date2.getMonth()+1}/${date2.getDate()}/${date2.getFullYear()}`);
        var Difference_In_Time = d2.getTime() - d1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log(Difference_In_Days);
        settotalDays(totalDays + Difference_In_Days) ;
        const data = { hotel: hotels.filter(item => item.id === parseInt(hotelId)), mealplan: mealPlan, nights: Difference_In_Days , d1 : `${date1.getDate()}/${date1.getMonth()+1}/${date1.getFullYear()}` , d2: `${date2.getDate()}/${date2.getMonth()+1}/${date2.getFullYear()}` , city : cityName }
        Data.push(data);
        setdate1(date2)
        setminiDate(date2);
        setdisplay({ hotelcall: "", cal: "d-none", noHotel: false })
    }

    useEffect(() => {
        getState();
    }, [])
    return (
        <>
            <h3 className="text-center">Quotation Calculator - Adwait</h3>
            <div className='getNos'>
                <div className='showing'>
                    <label htmlFor="cpl">No. of couples: </label><input name="couple" id="cpl" type="number" {...couples} />
                </div>
                <div className='showing'>
                    <label htmlFor="exadult">Extra Adult :</label><input name="adult" id="exadult" type="number" {...adult} />
                </div>
                <div className='showing'>
                    <label htmlFor="child">Child :</label> <input name="child" id="child" type="number" {...child} />
                </div>
                <div className="showing">
                    <label htmlFor="vehicle">Vehicle :</label> 
                    <select name="vehicle" id="vehicle" onChange={(e)=>{ var index = e.nativeEvent.target.selectedIndex; setvehicleName(e.nativeEvent.target[index].text); setvehicle(parseInt(e.target.value))}} disabled={bool} >
                        <option value={0}>No vehicle</option>
                        <option value={100}>Sedan</option>
                    </select>
                </div>
                <div className='showing'>
                    <label htmlFor="extras">Extra Ammount :</label> <input name="extras" id="extras" type="number" {...extras} />
                </div>
                <br />
            </div>
            <div className={`container ${Data.length === 0 ? "d-none" : ""}`}>
                <h2>Hotels Added</h2>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Hotel Name </th>
                            <th>Nights</th>
                            <th>Meal Plan</th>
                        </tr>
                    </thead>
                {
                    Array.from(Data).map(item => {
                        return(
                            <>
                            <tbody>
                                <tr>
                                    <td className='text-center' >{item.hotel[0].hotel_name}</td>
                                    <td className='text-center' >{item.nights}</td>
                                    <td className='text-center' >{parseInt(item.mealplan) === 1 ? "MAP" : "CP"}</td>
                                </tr>
                            </tbody>
                            </>
                        );
                    })
                }
                </table>
                <Link to="/result" state={{data:Data , vehicle : vehicle * totalDays , couples: parseInt(couples.value), adult: parseInt(adult.value), child: parseInt(child.value), extras : parseInt(extras.value) , vehicleName : vehicleName}} >
                    <button className="calculate">Calculate</button>
                </Link>
                <br />  

                <h2>Add new Hotel :</h2>
            </div>
            <div className={`container ${display.hotelcall}`}>
                <div className="select">
                    <label htmlFor="state">State: </label>
                    <select name="state" onChange={(e) => { getCity(e.target.value) }} id="state">
                        {
                            Array.from(state).map(item => {
                                return (
                                    <>
                                        <option value={item.state_id} >{item.state_name}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="select">
                    <label for="city">City :</label>
                    <select onChange={(e) => { console.log(e.target.value); }} name="MyCity" id="city">
                        {
                            Array.from(city).map(item => {
                                return (
                                    <>
                                        <option value={item.id} >{item.city_name}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                </div>
                <div id="stars" onChange={(e) => { setrating(e.target.value) }}>
                    <div>
                        <input type="radio" value="1" id="all" name="nnm" defaultChecked /><label htmlFor="all">All Hotels</label>
                    </div>
                    <div>
                        <input type="radio" value="2" id="2" name="nnm" /><label htmlFor="2">2 Star</label>
                    </div>
                    <div>
                        <input type="radio" value="3" id="3" name="nnm" /><label htmlFor="3">3 Star</label>
                    </div>
                    <div>
                        <input type="radio" value="4" id="4" name="nnm" /><label htmlFor="4">4 Star</label>
                    </div>
                    <div>
                        <input type="radio" value="5" id="5" name="nnm" /><label htmlFor="5">5 Star</label>
                    </div>
                </div>
                <button className="getHotels" onClick={() => { getHotels() }}>Get Hotels</button>
            </div>
            <div className={`container ${display.cal}`}>
                <div className="showing">
                    <div>State: {stateName}</div>
                    <div>City: {cityName}</div>
                </div>
                <div className="showing">   
                    <div>Rating: {rating === '1' ? "All" : rating} </div>
                </div>
                <div className={`${display.noHotel ? "d-none" : ""} calForm `}>
                    <form onSubmit={(e) => { e.preventDefault(); addHotel() }}>
                        <div className='child'>
                            <label for="hotel">Hotel :</label>
                            <select onChange={(e) => { sethotelId(e.target.value) }} name="MyHotel" id="hotel">
                                {
                                    Array.from(hotels).map(item => {
                                        return (
                                            <>
                                                <option value={item.id} >{item.hotel_name}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='datediv'> Check In :
                            <ReactDatePicker selected={date1} onChange={(date) => {setdate1(date); date2.setDate(date.getDate() + 1)}}   minDate={miniDate}/>
                        </div>
                        <div className='datediv'>Check Out :
                            <ReactDatePicker selected={date2} onChange={(date) => setdate2(date)} minDate={date1}/>
                        </div>
                        <div className='child'>
                            <label for="meals">Meal Plan :</label>
                            <select onChange={(e)=>{setmealPlan(e.target.value)}} name="meals" id="meal">
                                <option value="1">MAP</option>
                                <option value="2">CP</option>
                            </select>
                        </div>
                        <br />
                        <div className='child'  style={{display:'flex'}}>
                            <button className="calculate addHotel" type='button' onClick={()=>{cancel()}}  >Cancel</button>
                            <button className="calculate addHotel" type="submit" >Add Hotel </button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className={`${display.noHotel ? "" : "d-none"}`}>
                    <h4>No hotels available for selection</h4>
                    <button onClick={() => { setdisplay({ hotelcall: "", cal: "d-none", noHotel: false }) }} className='calculate'>Go back</button>
                </div>
            </div>
        </>
    )
}

export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    const date1 = useInput();
    const date2 = useInput();
    const getState = async () => {
        const res = await fetch("/getstate");
        const data = await res.json();
        setstate(data);
        if (first) {
            getCity(1);
            setfirst(false);
        }
    }

    const getCity = async (id) => {
        const res = await fetch(`/getCity/${id}`);
        const data = await res.json();
        setcity(data);
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
            return parseInt(item.Id) === parseInt(cityid.value);
        })
        setcityName(cityname[0].City_Name);
        sethotels(data);
        setTimeout(() => {
            var e = document.getElementById("hotel");
            var id = e.options[e.selectedIndex].value;
            sethotelId(id);
        }, 2000);
        if (data.length === 0) {
            setdisplay({ hotelcall: "d-none", cal: "", noHotel: true })
        } else {
            setdisplay({ hotelcall: "d-none", cal: "", noHotel: false })
        }
    }
    const cancel = () => {
        setdisplay({ hotelcall: "", cal: "d-none", noHotel: false })
    }
    const addHotel = () => {
        const dates1 = date1.value.split('-');
        const newDates1 = `${dates1[1]}/${dates1[2]}/${dates1[0]}`;
        const dates2 = date2.value.split('-');
        const newDates2 = `${dates2[1]}/${dates2[2]}/${dates2[0]}`;
        const d1 = new Date(newDates1);
        const d2 = new Date(newDates2);
        var Difference_In_Time = d2.getTime() - d1.getTime();
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        settotalDays(totalDays + Difference_In_Days) ;
        const data = { hotel: hotels.filter(item => item.Id === parseInt(hotelId)), couples: parseInt(couples.value), adult: parseInt(adult.value), child: parseInt(child.value), mealplan: mealPlan, nights: Difference_In_Days , d1 : date1.value , d2: date2.value }
        Data.push(data);
        setdisplay({ hotelcall: "", cal: "d-none", noHotel: false })
    }
    console.log(Data);
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
                    <select name="vehicle" id="vehicle" onChange={(e)=>{setvehicle(parseInt(e.target.value))}} disabled={bool} >
                        <option value={0}>No vehicle</option>
                        <option value={100}>Sedan</option>
                    </select>
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
                                    <td className='text-center' >{item.hotel[0].Hotel_Name}</td>
                                    <td className='text-center' >{item.nights}</td>
                                    <td className='text-center' >{parseInt(item.mealplan) === 1 ? "MAP" : "CP"}</td>
                                </tr>
                            </tbody>
                            </>
                        );
                    })
                }
                </table>
                <Link to="/result" state={{data:Data , vehicle : vehicle * totalDays }} >
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
                                        <option value={item.State_Id} >{item.State_Name}</option>
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
                                        <option value={item.Id} >{item.City_Name}</option>
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
                        <div>
                            <label for="hotel">Hotel :</label>
                            <select onChange={(e) => { sethotelId(e.target.value) }} name="MyHotel" id="hotel">
                                {
                                    Array.from(hotels).map(item => {
                                        return (
                                            <>
                                                <option value={item.Id} >{item.Hotel_Name}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label for="staDate"> Check In :</label><input {...date1} name="stdt" id="staDate" type="date" required />
                        </div>
                        <div>
                            <label for="enDate">Check Out :</label><input {...date2} name="endt" id="enDate" type="date" required />
                        </div>
                        <div>
                            <label for="meals">Meal Plan :</label>
                            <select onChange={(e)=>{setmealPlan(e.target.value)}} name="meals" id="meal">
                                <option value="1">MAP</option>
                                <option value="2">CP</option>
                            </select>
                        </div>
                        <br />
                        <div style={{display:'flex'}}>
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
import '../App.css';

export default function Navbar () {
    return(
        <div>
            <div className='hoverBtn'>
                <ion-icon name="grid-outline" color="white" className="ico"></ion-icon>
            </div>
            <div className='navbar'>
                <p className='title'>Cabso</p>
                <div className='other'>
                    <a href='#' className='nav'>Show Map</a>
                    <a href='#' className='nav'>My Bookings</a>
                    <a href='#' className='nav'>Profile</a>
                    <button className='cta'>Book Cab</button>
                </div>
            </div>
        </div>
    )
}


// todos for tommorow 

//https://dribbble.com/shots/14867974-Food-delivery-Search-for-places
//base design
//finish up the design part 
//login and registration > backend cookies
//random cabs near location
//day and night pricing
//auto locate
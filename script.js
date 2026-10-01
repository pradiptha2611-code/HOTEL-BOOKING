// =====================================================
// STAYEASE - HOTEL BOOKING WEBSITE
// MAIN JAVASCRIPT FILE
// =====================================================


// =====================================================
// 1. HOTEL DATA
// =====================================================

const hotels = [

    // Hyderabad
    {
        id: 1,
        name: "Taj Grand Hotel",
        location: "Hyderabad",
        price: 4500,
        rating: 4.8,
        image: "images/hotel1.jpg"
    },

    {
        id: 6,
        name: "Hyderabad Royal Inn",
        location: "Hyderabad",
        price: 3800,
        rating: 4.5,
        image: "images/hotel2.jpg"
    },

    {
        id: 7,
        name: "City Palace Hyderabad",
        location: "Hyderabad",
        price: 5200,
        rating: 4.7,
        image: "images/hotel3.jpg"
    },


    // Bangalore
    {
        id: 2,
        name: "Royal Palace",
        location: "Bangalore",
        price: 3500,
        rating: 4.5,
        image: "images/hotel2.jpg"
    },

    {
        id: 8,
        name: "Bangalore Comfort Inn",
        location: "Bangalore",
        price: 3200,
        rating: 4.3,
        image: "images/hotel4.jpg"
    },

    {
        id: 9,
        name: "Garden City Suites",
        location: "Bangalore",
        price: 4800,
        rating: 4.7,
        image: "images/hotel5.jpg"
    },


    // Goa
    {
        id: 3,
        name: "Sea View Resort",
        location: "Goa",
        price: 6000,
        rating: 4.7,
        image: "images/hotel3.jpg"
    },

    {
        id: 10,
        name: "Goa Beach Palace",
        location: "Goa",
        price: 5500,
        rating: 4.6,
        image: "images/hotel1.jpg"
    },

    {
        id: 11,
        name: "Ocean Pearl Resort",
        location: "Goa",
        price: 7000,
        rating: 4.9,
        image: "images/hotel4.jpg"
    },


    // Mumbai
    {
        id: 4,
        name: "Mumbai Heights",
        location: "Mumbai",
        price: 5000,
        rating: 4.6,
        image: "images/hotel4.jpg"
    },

    {
        id: 12,
        name: "Mumbai Central Hotel",
        location: "Mumbai",
        price: 4200,
        rating: 4.4,
        image: "images/hotel2.jpg"
    },

    {
        id: 13,
        name: "Marine View Suites",
        location: "Mumbai",
        price: 6500,
        rating: 4.8,
        image: "images/hotel5.jpg"
    },


    // Delhi
    {
        id: 5,
        name: "Delhi Grand",
        location: "Delhi",
        price: 4000,
        rating: 4.4,
        image: "images/hotel5.jpg"
    },

    {
        id: 14,
        name: "Delhi Royal Stay",
        location: "Delhi",
        price: 3500,
        rating: 4.3,
        image: "images/hotel1.jpg"
    },

    {
        id: 15,
        name: "Capital Palace",
        location: "Delhi",
        price: 5500,
        rating: 4.7,
        image: "images/hotel3.jpg"
    }

];


// =====================================================
// 2. GET HOTEL
// =====================================================

function getHotel(id) {

    return hotels.find(function(hotel) {
        return Number(hotel.id) === Number(id);
    });

}


// =====================================================
// 3. DISPLAY HOTELS
// =====================================================

function displayHotels(list = hotels) {

    const hotelList =
        document.getElementById("hotelList");

    if (!hotelList) {
        return;
    }

    hotelList.innerHTML = "";

    if (list.length === 0) {

        hotelList.innerHTML = `
            <div>
                <h3>No hotels found.</h3>
                <p>Try changing your filters.</p>
            </div>
        `;

        updateResultText(0);

        return;
    }


    list.forEach(function(hotel) {

        const card =
            document.createElement("div");

        card.className = "hotel-card";


        card.innerHTML = `

            <img
                src="${hotel.image}"
                alt="${hotel.name}"
            >

            <h3>${hotel.name}</h3>

            <p>📍 ${hotel.location}</p>

            <p>⭐ ${hotel.rating}</p>

            <p>💰 ₹${hotel.price} / night</p>


            <button
                type="button"
                class="btn btn-primary"
                onclick="viewHotel(${hotel.id})">

                View Details

            </button>


            <button
                type="button"
                class="btn"
                onclick="addToWishlist(${hotel.id})">

                ❤️ Add to Wishlist

            </button>

        `;


        hotelList.appendChild(card);

    });


    updateResultText(list.length);

}


// =====================================================
// 4. RESULT TEXT
// =====================================================

function updateResultText(count) {

    const resultText =
        document.getElementById("resultText");

    if (!resultText) {
        return;
    }

    resultText.innerText =
        count + " hotel(s) found.";

}


// =====================================================
// 5. FILTER HOTELS
// =====================================================
function filterHotels() {
    const location =
        document.getElementById("hotelLocation").value;

    const maxPriceValue =
        document.getElementById("maxPrice").value;

    const minRatingValue =
        document.getElementById("minRating").value;

    const maxPrice =
        maxPriceValue === ""
            ? Infinity
            : Number(maxPriceValue);

    const minRating =
        minRatingValue === ""
            ? 0
            : Number(minRatingValue);

    const filteredHotels = hotels.filter(function(hotel) {

        const locationMatch =
            location === "" ||
            hotel.location.toLowerCase() ===
            location.toLowerCase();

        const priceMatch =
            Number(hotel.price) <= maxPrice;

        const ratingMatch =
            Number(hotel.rating) >= minRating;

        return locationMatch &&
               priceMatch &&
               ratingMatch;
    });

    displayHotels(filteredHotels);
}


// =====================================================
// 6. RESET HOTEL SEARCH
// =====================================================

function resetHotelSearch() {

    const location =
        document.getElementById("hotelLocation");

    const maxPrice =
        document.getElementById("maxPrice");

    const minRating =
        document.getElementById("minRating");


    if (location) {
        location.value = "";
    }

    if (maxPrice) {
        maxPrice.value = "";
    }

    if (minRating) {
        minRating.value = "0";
    }


    displayHotels();

}


// =====================================================
// 7. SEARCH FROM HOME PAGE
// =====================================================

function searchHotels() {

    const destination =
        document.getElementById("destination").value;

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    const guests =
        document.getElementById("guests").value;


    if (destination === "") {

        alert("Please select a destination!");

        return;
    }


    if (checkIn === "") {

        alert("Please select check-in date!");

        return;
    }


    if (checkOut === "") {

        alert("Please select check-out date!");

        return;
    }


    if (checkOut <= checkIn) {

        alert(
            "Check-out date must be after check-in date!"
        );

        return;
    }


    const searchData = {

        destination: destination,

        checkIn: checkIn,

        checkOut: checkOut,

        guests: guests

    };


    localStorage.setItem(
        "hotelSearch",
        JSON.stringify(searchData)
    );


    window.location.href =
        "hotels.html";

}


// =====================================================
// 8. SELECT DESTINATION
// =====================================================

function selectDestination(destination) {

    const today =
        new Date();

    const tomorrow =
        new Date();


    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    const formatDate =
        function(date) {

            return date.toISOString()
                .split("T")[0];

        };


    const searchData = {

        destination: destination,

        checkIn: formatDate(today),

        checkOut: formatDate(tomorrow),

        guests: 1

    };


    localStorage.setItem(
        "hotelSearch",
        JSON.stringify(searchData)
    );


    window.location.href =
        "hotels.html";

}


// =====================================================
// 9. LOAD HOME SEARCH DATA
// =====================================================

function loadSearchData() {

    const data =
        localStorage.getItem("hotelSearch");


    if (!data) {
        return;
    }


    const search =
        JSON.parse(data);


    const destination =
        document.getElementById("destination");

    const checkIn =
        document.getElementById("checkIn");

    const checkOut =
        document.getElementById("checkOut");

    const guests =
        document.getElementById("guests");


    if (destination) {

        destination.value =
            search.destination || "";

    }


    if (checkIn) {

        checkIn.value =
            search.checkIn || "";

    }


    if (checkOut) {

        checkOut.value =
            search.checkOut || "";

    }


    if (guests) {

        guests.value =
            search.guests || 1;

    }

}


// =====================================================
// 10. VIEW HOTEL
// =====================================================

function viewHotel(id) {

    const hotel =
        hotels.find(function(h) {

            return Number(h.id) ===
                   Number(id);

        });


    if (!hotel) {

        alert("Hotel not found!");

        return;
    }


    localStorage.setItem(
        "selectedHotel",
        JSON.stringify(hotel)
    );


    window.location.href =
        "hotel-details.html";

}


// =====================================================
// 11. DISPLAY HOTEL DETAILS
// =====================================================

function displayHotelDetails() {

    const hotelDetails =
        document.getElementById("hotelDetails");


    if (!hotelDetails) {
        return;
    }


    const hotelData =
        localStorage.getItem("selectedHotel");


    if (!hotelData) {

        hotelDetails.innerHTML = `
            <h2>Hotel not found!</h2>
        `;

        return;
    }


    const hotel =
        JSON.parse(hotelData);


    hotelDetails.innerHTML = `

        <div class="hotel-card">

            <img
                src="${hotel.image}"
                alt="${hotel.name}"
            >

            <h1>${hotel.name}</h1>

            <p>📍 ${hotel.location}</p>

            <p>⭐ ${hotel.rating}</p>

            <p>
                💰 ₹${hotel.price} / night
            </p>

            <p>
                Comfortable rooms, excellent
                service and premium facilities.
            </p>

        </div>

    `;

}


// =====================================================
// 12. SELECT ROOM
// =====================================================

function selectRoom(
    roomName,
    roomImage,
    roomPrice
) {

    const roomData = {

        name: roomName,

        image: roomImage,

        price: Number(roomPrice)

    };


    localStorage.setItem(
        "selectedRoom",
        JSON.stringify(roomData)
    );


    window.location.href =
        "booking.html";

}


// =====================================================
// 13. ADD TO WISHLIST
// =====================================================

function addToWishlist(id) {

    const hotel =
        getHotel(id);


    if (!hotel) {

        alert("Hotel not found!");

        return;
    }


    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        );


    if (!Array.isArray(wishlist)) {

        wishlist = [];

    }


    const alreadyExists =
        wishlist.some(function(item) {

            return Number(item.id) ===
                   Number(id);

        });


    if (alreadyExists) {

        alert(
            "This hotel is already in Wishlist ❤️"
        );

        return;
    }


    wishlist.push(hotel);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    alert(
        hotel.name +
        " added to Wishlist ❤️"
    );

}


// =====================================================
// 14. DISPLAY WISHLIST
// =====================================================

function displayWishlist() {

    const wishlistContainer =
        document.getElementById(
            "wishlistList"
        );


    if (!wishlistContainer) {
        return;
    }


    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        );


    if (!Array.isArray(wishlist)) {

        wishlist = [];

    }


    wishlistContainer.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="form-card">

                <h2>❤️ Wishlist is Empty</h2>

                <p>
                    Go to Hotels and add your
                    favourite hotels.
                </p>

                <br>

                <a href="hotels.html">

                    <button
                        type="button"
                        class="btn btn-primary">

                        Browse Hotels

                    </button>

                </a>

            </div>

        `;

        return;
    }


    wishlist.forEach(function(hotel) {

        const card =
            document.createElement("div");

        card.className =
            "hotel-card";


        card.innerHTML = `

            <img
                src="${hotel.image}"
                alt="${hotel.name}"
            >

            <h3>${hotel.name}</h3>

            <p>📍 ${hotel.location}</p>

            <p>⭐ ${hotel.rating}</p>

            <p>
                💰 ₹${hotel.price} / night
            </p>


            <button
                type="button"
                class="btn btn-primary"
                onclick="viewHotel(${hotel.id})">

                View Details

            </button>


            <button
                type="button"
                class="btn"
                onclick="removeFromWishlist(${hotel.id})">

                ❌ Remove

            </button>

        `;


        wishlistContainer.appendChild(card);

    });

}


// =====================================================
// 15. REMOVE FROM WISHLIST
// =====================================================

function removeFromWishlist(id) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        );


    if (!Array.isArray(wishlist)) {

        wishlist = [];

    }


    wishlist =
        wishlist.filter(function(item) {

            return Number(item.id) !==
                   Number(id);

        });


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    displayWishlist();


    alert(
        "Removed from Wishlist ❌"
    );

}


// =====================================================
// 16. UPDATE NAVBAR
// =====================================================

function updateNavbar() {

    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (!navLinks) {
        return;
    }


    const loggedInUser =
        JSON.parse(
            localStorage.getItem(
                "loggedInUser"
            )
        );


    if (loggedInUser) {

        navLinks.innerHTML = `

            <a href="index.html">
                Home
            </a>

            <a href="hotels.html">
                Hotels
            </a>

            <a href="wishlist.html">
                Wishlist
            </a>

            <a href="my-bookings.html">
                My Bookings
            </a>

            <span style="
                color:white;
                font-weight:bold;
            ">
                👤 ${loggedInUser.name}
            </span>

            <a
                href="#"
                onclick="logoutUser()">

                Logout

            </a>

        `;

    }

}


// =====================================================
// 17. LOGOUT
// =====================================================

function logoutUser() {

    localStorage.removeItem(
        "loggedInUser"
    );


    alert(
        "Logged out successfully! 👋"
    );


    window.location.href =
        "index.html";

}


// =====================================================
// 18. SAVE BOOKING
// =====================================================

function saveBooking() {

    const hotelData =
        localStorage.getItem(
            "selectedHotel"
        );


    const roomData =
        localStorage.getItem(
            "selectedRoom"
        );


    if (!hotelData) {

        alert(
            "Hotel information not found!"
        );

        return;
    }


    const hotel =
        JSON.parse(hotelData);


    const room =
        roomData
        ? JSON.parse(roomData)
        : null;


    const fullName =
        document.getElementById(
            "fullName"
        ).value;


    const email =
        document.getElementById(
            "email"
        ).value;


    const phone =
        document.getElementById(
            "phone"
        ).value;


    const specialRequestElement =
        document.getElementById(
            "specialRequest"
        );


    const specialRequest =
        specialRequestElement
        ? specialRequestElement.value
        : "";


    const bookingData = {

        bookingId:
            "SE" + Date.now(),

        hotel:
            hotel,

        room:
            room,

        guestName:
            fullName,

        email:
            email,

        phone:
            phone,

        specialRequest:
            specialRequest,

        status:
            "Pending Payment",

        bookingDate:
            new Date().toLocaleString()

    };


    localStorage.setItem(
        "bookingData",
        JSON.stringify(bookingData)
    );


    window.location.href =
        "payment.html";

}


// =====================================================
// 19. PAYMENT
// =====================================================

function confirmPayment() {

    const data =
        localStorage.getItem(
            "bookingData"
        );


    if (!data) {

        alert(
            "No booking found!"
        );

        return;
    }


    const booking =
        JSON.parse(data);


    const selectedPayment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!selectedPayment) {

        alert(
            "Please select a payment method!"
        );

        return;
    }


    booking.paymentMethod =
        selectedPayment.value;


    booking.paymentStatus =
        selectedPayment.value === "Cash"
        ? "Pay at Hotel"
        : "Paid";


    booking.status =
        "Confirmed";


    booking.paymentDate =
        new Date().toLocaleString();


    localStorage.setItem(
        "bookingData",
        JSON.stringify(booking)
    );


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "myBookings"
            )
        ) || [];


    const existingIndex =
        bookings.findIndex(function(item) {

            return item.bookingId ===
                   booking.bookingId;

        });


    if (existingIndex >= 0) {

        bookings[existingIndex] =
            booking;

    } else {

        bookings.push(booking);

    }


    localStorage.setItem(
        "myBookings",
        JSON.stringify(bookings)
    );


    alert(
        "Booking Confirmed Successfully! 🎉"
    );


    window.location.href =
        "confirmation.html";

}


// =====================================================
// 20. DISPLAY CONFIRMATION
// =====================================================

function displayConfirmation() {

    const container =
        document.getElementById(
            "confirmationDetails"
        );


    if (!container) {
        return;
    }


    const data =
        localStorage.getItem(
            "bookingData"
        );


    if (!data) {

        container.innerHTML = `
            <h2>No booking found.</h2>
        `;

        return;
    }


    const booking =
        JSON.parse(data);


    container.innerHTML = `

        <div class="form-card">

            <h1>
                🎉 Booking Confirmed!
            </h1>

            <p>
                Your booking has been
                successfully confirmed.
            </p>

            <hr>

            <h3>
                🏨 ${booking.hotel.name}
            </h3>

            <p>
                📍 ${booking.hotel.location}
            </p>

            ${
                booking.room
                ? `
                    <p>
                        🛏️ Room:
                        ${booking.room.name}
                    </p>
                `
                : ""
            }

            <p>
                👤 Guest:
                ${booking.guestName}
            </p>

            <p>
                🆔 Booking ID:
                ${booking.bookingId}
            </p>

            <p>
                💳 Payment:
                ${booking.paymentMethod}
            </p>

            <p>
                📌 Status:
                ${booking.status}
            </p>

            <br>

            <a href="my-bookings.html">

                <button
                    class="btn btn-primary">

                    View My Bookings

                </button>

            </a>

        </div>

    `;

}


// =====================================================
// 21. PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Navbar
        updateNavbar();


        // Hotels
        if (
            document.getElementById(
                "hotelList"
            )
        ) {

            displayHotels();

        }


        // Wishlist
        if (
            document.getElementById(
                "wishlistList"
            )
        ) {

            displayWishlist();

        }


        // Home search
        loadSearchData();


        // Hotel details
        displayHotelDetails();


        // Confirmation
        displayConfirmation();

    }
);
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const customerName = document.getElementById("customer_name").value;
    const reservationDate = document.getElementById("reservation_date").value;
    const reservationTime = document.getElementById("reservation_time").value;
    const headCount = document.getElementById("head_count").value;

    const reservationData = {
      customer_name: customerName,
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      head_count: headCount,
      special_request: "",
    };

    fetch("http://localhost:5000/api/reservations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Reservation created successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

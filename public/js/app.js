//dom elements
const form = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

//form submit event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = search.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch(`http://localhost:5000/weather?address=${location}`).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        return (msgOne.textContent = data.error);
      }
      msgOne.textContent = data.location;
      msgTwo.textContent = data.foreCast;
    })
  );
});

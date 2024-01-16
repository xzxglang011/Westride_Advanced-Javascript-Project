
const chatDisplay = document.getElementById('chat')
const chatInformationDisplay = document.getElementById('chat-information')
const userInput = document.getElementById(`user-input`)

//declare variable at Global scope for use in any scope
let fetchingData


//Function Operate the the Display of window base on incoming data (result)
function displayResult(result) {
  //map() is **array** method for loop all data inside **array**
  const name = result.map((data) => {
    //destructuring data
    const { title, first, last } = data.name
    //destructuring data
    const { thumbnail } = data.picture
    //create Element for HTML
    const contactName = `<li class="chatList"> <img src="${thumbnail}" alt=""> ${title}.${first} ${last}</li>`;
    //return data contactName and store in to Array name
    return contactName
  })
  // join method made for change array that have , into string so innerHTML will be a set of many <li class="chatList"> <img src="${thumbnail}" alt=""> ${title}.${first} ${last}</li>
  chatDisplay.innerHTML = name.join('');

  //***Made DOM of li that className is 'chatList' after render the data
  const selectedChat = document.querySelectorAll('.chatList')
  //Loop each DOM of li 
  selectedChat.forEach((element, index) => {
    //Each event click at each li
    element.addEventListener('click', () => {
      const information = result[index]
      //destructuring data
      const { gender, email, cell } = information;
      const { name: { title, first, last } } = information;
      const { dob: { age } } = information;
      const { location: { city, country } } = information;
      const { picture: { large: image } } = information

      //create Element for HTML
      const markUp =
        `
      <img src="${image}" alt="">
      <h2>${title}.${first} ${last}</h2>
      <h3>Gender: ${gender},Age: ${age}</h3>
      <h3>Email: ${email}</h3>
      <h3>Cell: ${cell}</h3>
      <h3>City: ${city}, Country: ${country}</h3>
      
      `
      chatInformationDisplay.innerHTML = markUp;
    })
  })
}



//Fetching data
async function fetchDataWithAxios() {
  try {
    //fetch data
    const response = await axios.get('https://randomuser.me/api/?results=24');
    //binding only result from data
    const data = response.data.results;
    //Back up fetching data for do anything
    fetchingData = data
    //Display data
    displayResult(fetchingData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// Call function
fetchDataWithAxios()


//Give API to waiting event when *** type anything inside userInput DOM ****
userInput.addEventListener('input', (e) => {
  //Binding data from value inside userInput DOM and set it to lowercase
  const searchName = e.target.value.toLowerCase()
  //Condition if have data inside userInput DOM 
  if (searchName) {
    //filter is array method that return the data when data is matched the condition
    const searchResult = fetchingData
      .filter(data => {
        //destructuring data
        const { first, last } = data.name
        //condition with includes method
        if (first.toLowerCase().includes(searchName) || last.toLowerCase().includes(searchName)) {
          return data
        }
      })
    //display data after filter
    displayResult(searchResult)

  }
  //Condition if have no data inside userInput DOM 
  else {
    //return display the original fetching data
    displayResult(fetchingData)
  }
})
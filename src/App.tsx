import './App.css'

interface User {
  first_name: string
  last_name: string
  age: number
  city: string
  country: string
  is_admin: boolean
  is_doctor: boolean
  specialty: string
  privileges: string[]
  health: number
}


const createUser = (first_name: string, 
                    last_name: string, 
                    age: number, 
                    city: string, 
                    country: string
                    ): User => {

  return {
    first_name,
    last_name,
    age,
    city,
    country,
    is_doctor: false,
    specialty: '',
    privileges: [],
    health: 100
  }
}

const healUser = (user: User): User => {
  return {
    ...user,
    health: 100
  }
}



function App() {
  
  const julien = createUser('Julien', 'Zamor', 38, 'Paris', 'France');
  julien.specialty = 'Admin';
  julien.privileges = ['change_location'];
  


  const caroline = createUser('Caroline', 'Zamor', 35, 'Plougoumelen', 'France');
  caroline.is_doctor = true;
  caroline.specialty = 'Generalist';
  caroline.privileges = ['heal'];

  const sophie = createUser('Sophie', 'Zamor', 66, 'Millau', 'France');
  sophie.health = 75; // Sophie hurt herself while hiking

  /*
  Sophie need to change Location, she moves to Étel, only Julien can change here location
  Caroline is a doctor, she can heal Sophie
  Write the code :
  */

  
  healUser(sophie);


  return (
    <>
      <div>
      Hello {julien.first_name} {julien.last_name}!
      </div>
      <div>
        <button onClick={ tests } >Try tests</button>
      </div>
    </>
  )
}



function tests(){

  console.log('Tests are running...')
  console.log('Test healing')
  let myUser = createUser('Julien', 'Zamor', 38, 'Paris', 'France');
  myUser.health = 50;
  console.log('Health before healing: ', myUser.health);
  myUser = healUser(myUser);
  console.log('Health after healing: ', myUser.health);
  
}

export default App

import './App.css'

interface Named {
  first_name: string
  last_name: string
  age: number
}

interface WithAddress {
  address: string
  city: string
  country: string
}


interface WithHealth{
  health: number
}

type User = Named & WithAddress & WithHealth;

interface Doctor{
  is_doctor: true
  specialty: string
  privileges: ["can_heal"]
}


const createUser = (first_name: string, 
                    last_name: string, 
                    age: number, 
                    address: string,
                    city: string, 
                    country: string
                    ): User => {

  return {
    first_name,
    last_name,
    age,
    address,
    city,
    country,
    health: 100
  }
}

function healUser<T extends WithHealth>(user: T): T {
  return {
    ...user,
    health: 100
  }
}


const isDoctor = (user: unknown): user is Doctor => {
  return (user as Doctor).is_doctor === true;
}


function App() {
  
  const julien = createUser('Julien', 'Zamor', 38, 'avenue Gambetta', 'Paris', 'France');
  


  const caroline: User & Doctor = {
    ... createUser('Caroline', 'Zamor', 35, 'chemin de Bochocho','Plougoumelen', 'France'),
    ... {
      is_doctor: true,
      specialty: 'Knee Problems',
      privileges: ["can_heal"],
    }
  }

  const sophie = createUser('Sophie', 'Zamor', 66, 'La Blaquière', 'Millau', 'France');
  sophie.health = 75; // Sophie hurt herself while hiking

  /*
  Sophie need to change Location, she moves to Étel, only Julien can change here location
  Caroline is a doctor, she can heal Sophie
  Write the code :
  */

  if (isDoctor(caroline)){
    console.log('Caroline is a doctor');
    if (caroline.privileges.includes('can_heal')){
      console.log('Caroline can heal');
      healUser(sophie);
    }
  }
  
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
  let myUser: WithHealth = {health: 50};
  myUser.health = 50;
  console.log('Health before healing: ', myUser.health);
  myUser = healUser(myUser);
  console.log('Health after healing: ', myUser.health);
  
}

export default App

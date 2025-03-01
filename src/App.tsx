import React, {useState} from 'react';

const days : string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours : string[] = ['6:00am', '6:30am', '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm', '9:00pm'];


const App: React.FC = () => {

  const [cellValues, setCellValues] = useState<{ key: string; activity: string | null }[]>([]);

  const handleCellClick : any = (hour : string, day : string) => {
    console.log(hour, day);
    localStorage.setItem(`${hour}-${day}`, 'true');
    const activity = prompt('Enter your activity');
    setCellValues((prev) => {
      // need to check for values already stored for this cell
      return [...prev, {key: `${hour}-${day}`, activity}];
    })
  }

  return (
    <>
      <div className="flex flex-row bg-gray-100 ">
        <div className='w-30 border-2 border-solid flex justify-center'>blank</div>
        {days.map((day) => {
          return <div className='w-30 border-2 border-solid flex justify-center' key={day}>{day}</div>
        })
        }


      </div>
      <div>
        {hours.map((hour) => {
          return (
            <div className="flex flex-row bg-gray-100 ">
              <div className='w-30 border-2 border-solid flex justify-center'>{hour}</div>
              {days.map((day) => {
                return <div className='w-30 border-2 border-solid flex justify-center cursor-pointer' key={`${hour}-${day}`} onClick={() => handleCellClick(hour, day)}>{cellValues.find((cell) => cell.key === `${hour}-${day}`)?.activity}</div>
              })
              }
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default App


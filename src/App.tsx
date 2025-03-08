import React, {useState} from 'react';
import { MdPlayArrow } from "react-icons/md";
import { preview } from 'vite';

const days : string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours : string[] = ['6:00am', '6:30am', '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm', '9:00pm'];
//used in Category class
enum TrackingType {
  boolean = 'boolean',
  time = 'time'
}
// used in Category class
enum Style {
  default = 'default',
  blue = 'blue',
  purple = 'purple'
}

class Category {
  name : string;
  trackingType : TrackingType;
  style : Style;
  hoursScheduled : number;

  constructor(name : string, trackingType : TrackingType = TrackingType.boolean, style : Style = Style.default, hoursScheduled : number = 0) {
    this.name = name;
    this.trackingType = trackingType;
    this.style = style;
    this.hoursScheduled = hoursScheduled;
  }

  
}



const App: React.FC = () => {

  const [cellValues, setCellValues] = useState<{ key: string; category: Category | null }[]>([]);
  

  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [firstCell, setFirstCell] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([
    new Category('Blank', TrackingType.boolean, Style.default),
    new Category('Math course', TrackingType.time, Style.blue),    
  ]);

  {/*const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories.length > 0 ? categories[0] : null);*/}

  const [date, setDate] = useState<Date>(getLastMonday());

  {/* date functions */}
  function getLastMonday(date : Date = new Date() ) : Date {
    if  (date.getDay() === 1) {
      return date;
    }
    const dayOfWeek = date.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const diff = (dayOfWeek === 1) ? 7 : (dayOfWeek + 6) % 7; // Days to subtract to get last Monday
    const lastMonday = new Date(date); 
    lastMonday.setDate(date.getDate() - diff); // Move back to last Monday
    return lastMonday;
  }

  function getPreviousMonday(date : Date = new Date()) : Date {
    const dayOfWeek = date.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const daysToSubtract = dayOfWeek === 1 ? 7 : (dayOfWeek + 6) % 7; // Always go back to last Monday
    const previousMonday = new Date(date);
    previousMonday.setDate(date.getDate() - daysToSubtract);
    return previousMonday;
}

function getNextMonday(date : Date = new Date()) : Date {
  const dayOfWeek = date.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const daysToAdd = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7; // Always move forward to next Monday
  const nextMonday = new Date(date);
  nextMonday.setDate(date.getDate() + daysToAdd);
  return nextMonday;
}

function isCurrentDate(date : Date = new Date()) : boolean {
  const lastMonday = getLastMonday(new Date());
  
  // Ensure both dates have the same year, month, and day
  const isSameDay = date.getFullYear() === lastMonday.getFullYear() &&
                    date.getMonth() === lastMonday.getMonth() &&
                    date.getDate() === lastMonday.getDate();
  
  // Check if it's a Monday
  return isSameDay;
}

  function formatDate(date : Date) : string {
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
}

{/* functions for time cell selection */}

  const handleCellClick : any = (hour : string, day : string) => {
    
  }

  const handleCategorySelection = (category : Category) => { 
      setCellValues((previous) => {
        const categoryCells = selectedCells.map((key) => ({ key, category }))
        return [...previous.filter((cellValue) => selectedCells.findIndex((key) => key === cellValue.key) === -1), ...categoryCells];
      })
  }  

  const handleCellSelection = (
    hour: string,
    day: string,
    date: Date,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const cellKey = `${hour}-${day}-${formatDate(date)}`;

    setFirstCell(cellKey);
    setSelectedCells((preview) => {return [...preview, cellKey]});

    e.stopPropagation();
  };
  

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevents text selection
    // Your selection logic here
  };
  

  return (    
    <div className='flex flex-row select-none w-screen bg-red-100' data-label='time-block' onClick={(e) => setSelectedCells([])}>
      {/* sidebar used for categories and copying schedules */}
      <div className='flex flex-col items-center justify-start' data-label='time-block-sidebar'>
        {/* date selector div */}
        <div className='flex flex-row items-center' data-label='time-block-date-selector' >
          <button 
              onClick={() => setDate(getPreviousMonday(date))}
              aria-label="Play"
          > 
            <MdPlayArrow className="w-6 h-6 rotate-180" />
          </button>
          {/* displays the date (always a monday) */}
          <time className={isCurrentDate(date) ? 'text-blue-500' : 'text-black'} dateTime={date.toISOString()}>{formatDate(date)}</time>

          <button
              onClick={() => setDate(getNextMonday(date))}
              aria-label="Play"
          >
            <MdPlayArrow className="w-6 h-6" />
          </button>
        </div>
        {/* button to select current week */}
        <button 
            className="mt-2"
            onClick={() => setDate(getLastMonday())} > 
            Goto Current Week
        </button>
        {/* Categories for time block */}
        <div className='flex flex-col justify-start items-center w-full gap-2' data-label='time-block-categories'>
          <h2>Categories:</h2>
          {categories.map((category) => (
            <div 
                key={category.name}
                
                  className='border border-solid w-full flex flex-row justify-center font-bold bg-white cursor-pointer'
                onClick={() => handleCategorySelection(category)}
            >
              {category.name}
            </div>
          ))}         
        </div>  
        
      </div>
      {/* main time block */}
      <div className='flex flex-col'>      
        <div className="flex flex-row bg-gray-100 ">
          <div className='w-30 border-1 border-solid flex justify-center'>blank</div>
          {days.map((day) => {
            return <div className='w-30 border-1 border-solid flex justify-center font-bold' key={day}>{day}</div>
          })
          }


        </div>
        <div>
          {/* time blocks, includes times and the time blocking cells */}
          {hours.map((hour) => {
            return (
              <div className="flex flex-row bg-gray-100 ">
                {/* time column */}
                <div onMouseDown={(event) => handleMouseDown(event)} className='w-30 border-1 border-solid flex justify-center font-bold'>{hour}</div>
                {days.map((day) => {
                  {/* time block cells */}
                  return (
                    <div 
                    className={
                      selectedCells.findIndex(
                        (key) => key === `${hour}-${day}-${formatDate(date)}`
                      ) !== -1
                        ? "w-30 border border-solid bg-blue-200 flex justify-center items-center relative cursor-pointer"
                        : "w-30 border border-solid bg-white flex justify-center items-center relative cursor-pointer"
                        }
                        key={`${hour}-${day}`} 
                        onClick={(e) => handleCellSelection(hour, day, date, e)}
                    >
                        {/* Background fill for percentage */}
                        <div 
                            className="absolute top-0 left-0 w-full bg-blue-200 transition-all duration-300" 
                            style={{ height: `${0}%` }}
                        ></div>

                        {/* Text content stays on top */}
                        <span className="relative z-10">
                            {cellValues.find((cell) => cell.key === `${hour}-${day}-${formatDate(date)}`)?.category?.name}
                        </span>
                    </div>
                  )
                })
                }
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}

export default App


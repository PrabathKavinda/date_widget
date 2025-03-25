import React, { useState, useMemo } from 'react';

// Predefined holidays (US)
const HOLIDAYS = {
  '1-1': { name: "New Year's Day", type: 'national' },
  '7-4': { name: "Independence Day", type: 'national' },
  '12-25': { name: "Christmas Day", type: 'national' },
  '11-11': { name: "Veterans Day", type: 'national' },
  '5-27': { name: "Memorial Day", type: 'national' }, // 2025 Memorial Day
  '9-2': { name: "Labor Day", type: 'national' }, // 2025 Labor Day
  '10-13': { name: "Columbus Day", type: 'national' }, // 2025 Columbus Day
  '11-28': { name: "Thanksgiving Day", type: 'national' }, // 2025 Thanksgiving
  '1-20': { name: "Martin Luther King Jr. Day", type: 'national' }, // 2025 MLK Day
  '2-17': { name: "Presidents' Day", type: 'national' } // 2025 Presidents' Day
};

const DateFlipBox = () => {
  // Get today's date
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Create a reference to today's date for comparison
  const today = new Date();
  
  // Days of the week
  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];
  
  // Function to check if the displayed date is today
  const isToday = () => {
    return currentDate.getDate() === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };
  
  // Function to get the current day of the week
  const getCurrentDayOfWeek = () => {
    return daysOfWeek[currentDate.getDay()];
  };
  
  // Function to get holiday for the current date
  const getCurrentHoliday = useMemo(() => {
    const holidayKey = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    return HOLIDAYS[holidayKey];
  }, [currentDate]);
  
  // Function to handle clicking on the left side (previous day)
  const handlePreviousDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };
  
  // Function to handle clicking on the right side (next day)
  const handleNextDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };
  
  // Get the month name
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
                     "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  
  // Determine background colors based on whether it's today or not
  const headerBgColor = isToday() ? "bg-green-500" : "bg-orange-500";
  const dayTextColor = isToday() ? "text-green-600" : "text-gray-800";
  const cornerColor = isToday() ? "#86efac" : "#fdba74";
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-64 h-[26rem] relative perspective-1000">
        <div className="w-full h-full relative">
          {/* Calendar container */}
          <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className={`w-full h-16 ${headerBgColor} text-white flex items-center justify-center relative`}>
              {/* Month name */}
              <div className="text-2xl font-bold">{month}</div>
              
              {/* Pin tabs */}
              <div className="absolute left-4 top-0 w-2 h-8 bg-gray-800 rounded-b"></div>
              <div className="absolute right-4 top-0 w-2 h-8 bg-gray-800 rounded-b"></div>
              
              {/* Today indicator - smaller size */}
              {isToday() && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white text-green-500 text-xs px-1.5 py-0 rounded-full font-bold text-center" style={{ fontSize: '0.65rem' }}>
                  TODAY
                </div>
              )}
            </div>
            
            {/* Day of Week */}
            <div className="w-full text-center py-2 bg-gray-100 text-sm font-medium text-gray-600">
              {getCurrentDayOfWeek()}
            </div>
            
            {/* Day number */}
            <div className="flex justify-center items-center p-4 h-32">
              <div className={`text-8xl font-bold ${dayTextColor} transition-colors duration-300`}>
                {day}
              </div>
            </div>
            
            {/* Extended Date Information */}
            <div className="w-full px-4 py-2 text-center space-y-2">
              {/* Holiday Display */}
              {getCurrentHoliday ? (
                <div className="bg-yellow-100 text-yellow-800 text-xs py-1 px-2 rounded">
                  <span className="font-bold">🎉 Holiday: </span>
                  {getCurrentHoliday.name}
                </div>
              ) : (
                <div className="text-xs text-gray-400 py-1">
                  No holidays today
                </div>
              )}
              
              {/* Additional Date Information */}
              <div className="bg-blue-50 text-blue-800 text-xs py-1 px-2 rounded">
                <span className="font-bold">📅 Full Date: </span>
                {currentDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            {/* Corner fold */}
            <div className="absolute bottom-0 right-0 overflow-hidden rounded-br-lg">
              <div className="relative w-12 h-12"> 
                {/* The colored triangle that appears underneath */}
                <div 
                  className="absolute bottom-0 right-0" 
                  style={{
                    width: '0',
                    height: '0',
                    borderStyle: 'solid',
                    borderWidth: '0 0 12px 12px',
                    borderColor: `transparent transparent ${cornerColor} transparent`
                  }}
                ></div>
                
                {/* The white "fold" triangle on top */}
                <div 
                  className="absolute bottom-0 right-0" 
                  style={{
                    width: '0',
                    height: '0',
                    borderStyle: 'solid',
                    borderWidth: '12px 12px 0 0',
                    borderColor: 'white transparent transparent transparent',
                    transform: 'translate(0, 0)'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Interactive areas */}
          <button 
            onClick={handlePreviousDay}
            className="absolute left-0 top-0 w-1/2 h-full opacity-0 cursor-pointer"
            aria-label="Previous day"
          />
          <button 
            onClick={handleNextDay}
            className="absolute right-0 top-0 w-1/2 h-full opacity-0 cursor-pointer"
            aria-label="Next day"
          />
        </div>
      </div>
    </div>
  );
};

export default DateFlipBox;
/* eslint-disable react/prop-types */

const DateButton = ({ day, date }) => {

    return (
        <>
            {day.weekday == 'Sunday' ?
                <button
                    className="w-full flex flex-col border-gray-300 border-solid border-2 rounded-md p-5 text-center bg-gray-200 mx-2 cursor-pointer">
                    <p className="text-md w-full text-center">{day.weekday.slice(0, 3)}</p>
                    <b className="w-full text-xl text-center">{day.month.slice(0, 3)}</b>
                    <b className="w-full text-xl text-center">{day.day}</b>
                </button>
                : <button
                    onClick={() => date(day)}
                    className="w-full flex flex-col border-gray-300 border-solid border-2 rounded-md p-5 text-center hover:bg-blue-500 active:bg-blue-300 mx-2 cursor-pointer">
                    <p className="text-md w-full text-center">{day.weekday.slice(0, 3)}</p>
                    <b className="w-full text-xl text-center">{day.month.slice(0, 3)}</b>
                    <b className="w-full text-xl text-center">{day.day}</b>
                </button>
            }
        </>
    );
}

export default DateButton;

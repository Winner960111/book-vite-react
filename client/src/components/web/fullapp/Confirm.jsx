import { useDispatch } from 'react-redux';
import { addHistory, setConfirm } from '../../../store/reducers/checker';

const Confirm = () => {
    
    const dispatch = useDispatch();

    const handleYes = () => {
        dispatch(addHistory(true))
        dispatch(setConfirm('Yes'))
    }
    const handleNo = () => {
        dispatch(addHistory(true))
        dispatch(setConfirm('No'))
    }

    return (
        <div className="w-full flex flex-col items-center">
            <p className="w-2/6 text-4xl my-3 mt-36 font-medium">
                <b>Please confirm</b>
            </p>
            <form
                className={
                    ' w-2/6 text-justify bg-white rounded-3xl p-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
                }
            >
                <p className=" bg-gray-50 rounded-3xl p-4">
                    Do you have any additional income?
                </p>
                <div className="flex justify-between">

                    <button
                        type="button"
                        onClick={handleYes}
                        className="w-full mx-1 border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
                    >
                        YES
                    </button>
                    <button
                        type="button"
                        onClick={handleNo}
                        className="w-full mx-1 border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
                    >
                        NO
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Confirm;
